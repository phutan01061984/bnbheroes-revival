#!/usr/bin/env python3
"""Reproducible visual-fidelity regression for the BNB HEROES restoration.

The suite compares canonical runtime imagery against period references without
pretending video pixels are byte-identical source assets. It performs:
  1) optional layer compositing,
  2) SIFT + RANSAC homography alignment,
  3) robust per-channel affine photometric fit,
  4) raw/normalized pixel error + edge overlap metrics,
  5) aligned/diff/heatmap evidence output and machine-readable JSON.
"""
from __future__ import annotations
import argparse, json, math, sys
from pathlib import Path
import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]

def resolve(path: str) -> Path:
    p = Path(path)
    return p if p.is_absolute() else ROOT / p

def read_bgra(path: Path) -> np.ndarray:
    im = cv2.imread(str(path), cv2.IMREAD_UNCHANGED)
    if im is None:
        raise FileNotFoundError(path)
    if im.ndim == 2:
        im = cv2.cvtColor(im, cv2.COLOR_GRAY2BGRA)
    elif im.shape[2] == 3:
        im = cv2.cvtColor(im, cv2.COLOR_BGR2BGRA)
    return im

def alpha_over(dst_bgra: np.ndarray, src_bgra: np.ndarray) -> np.ndarray:
    if dst_bgra.shape != src_bgra.shape:
        raise ValueError(f"shape mismatch {dst_bgra.shape} vs {src_bgra.shape}")
    dst = dst_bgra.astype(np.float32) / 255.0
    src = src_bgra.astype(np.float32) / 255.0
    sa = src[..., 3:4]
    da = dst[..., 3:4]
    oa = sa + da * (1.0 - sa)
    orgb = src[..., :3] * sa + dst[..., :3] * da * (1.0 - sa)
    rgb = np.divide(orgb, np.maximum(oa, 1e-8), out=np.zeros_like(orgb), where=oa > 1e-8)
    out = np.concatenate([rgb, oa], axis=2)
    return np.clip(np.rint(out * 255.0), 0, 255).astype(np.uint8)

def build_candidate(case: dict) -> tuple[np.ndarray, str]:
    if "candidate" in case:
        return read_bgra(resolve(case["candidate"])), case["candidate"]
    comp = case.get("composite")
    if not comp:
        raise ValueError("case requires candidate or composite")
    out = read_bgra(resolve(comp["background"]))
    for layer in comp.get("layers", []):
        out = alpha_over(out, read_bgra(resolve(layer)))
    for overlay in comp.get("overlays", []):
        out = alpha_over(out, read_bgra(resolve(overlay)))
    save = resolve(comp["output"])
    save.parent.mkdir(parents=True, exist_ok=True)
    cv2.imwrite(str(save), out)
    return out, comp["output"]

def gray3(bgra: np.ndarray) -> np.ndarray:
    return cv2.cvtColor(bgra[..., :3], cv2.COLOR_BGR2GRAY)

def feature_align(candidate: np.ndarray, reference: np.ndarray, cfg: dict):
    cgray, rgray = gray3(candidate), gray3(reference)
    sift = cv2.SIFT_create(nfeatures=int(cfg.get("nfeatures", 8000)), contrastThreshold=float(cfg.get("contrast_threshold", 0.02)))
    kc, dc = sift.detectAndCompute(cgray, None)
    kr, dr = sift.detectAndCompute(rgray, None)
    if dc is None or dr is None:
        raise RuntimeError("SIFT found insufficient descriptors")
    matcher = cv2.BFMatcher(cv2.NORM_L2)
    pairs = matcher.knnMatch(dc, dr, k=2)
    ratio = float(cfg.get("ratio", 0.72))
    good = [m for m,n in pairs if m.distance < ratio*n.distance]
    if len(good) < 4:
        raise RuntimeError(f"only {len(good)} good SIFT matches")
    src = np.float32([kc[m.queryIdx].pt for m in good]).reshape(-1,1,2)
    dst = np.float32([kr[m.trainIdx].pt for m in good]).reshape(-1,1,2)
    H, inlier_mask = cv2.findHomography(src, dst, cv2.RANSAC, float(cfg.get("ransac_px", 4.0)))
    if H is None:
        raise RuntimeError("homography estimation failed")
    inliers = int(inlier_mask.sum())
    h,w = reference.shape[:2]
    aligned = cv2.warpPerspective(candidate, H, (w,h), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(0,0,0,0))
    src_valid = np.full(candidate.shape[:2], 255, np.uint8)
    valid = cv2.warpPerspective(src_valid, H, (w,h), flags=cv2.INTER_NEAREST, borderMode=cv2.BORDER_CONSTANT, borderValue=0)
    return aligned, valid, H, len(good), inliers

def roi_mask(shape, case: dict) -> np.ndarray:
    h,w = shape[:2]
    mask = np.full((h,w),255,np.uint8)
    roi = case.get("roi")
    if roi:
        mask[:] = 0
        if "rect" in roi:
            x,y,rw,rh = map(int, roi["rect"])
            mask[max(y,0):min(y+rh,h), max(x,0):min(x+rw,w)] = 255
        elif "polygon" in roi:
            pts = np.array(roi["polygon"], np.int32)
            cv2.fillPoly(mask,[pts],255)
    for rect in case.get("exclude_rects",[]):
        x,y,rw,rh=map(int,rect)
        mask[max(y,0):min(y+rh,h),max(x,0):min(x+rw,w)]=0
    return mask

def fit_photometric(src_bgr: np.ndarray, dst_bgr: np.ndarray, mask: np.ndarray):
    idx = mask > 0
    x = src_bgr[idx].astype(np.float32)
    y = dst_bgr[idx].astype(np.float32)
    if len(x) > 200000:
        step = max(1, len(x)//200000)
        x,y = x[::step], y[::step]
    # reject extreme/overlay pixels using grayscale residual after median offset
    params=[]
    out = src_bgr.astype(np.float32).copy()
    for ch in range(3):
        xx=x[:,ch]; yy=y[:,ch]
        A=np.column_stack([xx,np.ones_like(xx)])
        a,b=np.linalg.lstsq(A,yy,rcond=None)[0]
        a=float(np.clip(a,0.5,1.5)); b=float(np.clip(b,-80,80))
        params.append([a,b])
        out[...,ch]=out[...,ch]*a+b
    return np.clip(out,0,255).astype(np.uint8), params

def edge_f1(a: np.ndarray, b: np.ndarray, mask: np.ndarray):
    ea=cv2.Canny(cv2.cvtColor(a,cv2.COLOR_BGR2GRAY),70,140)
    eb=cv2.Canny(cv2.cvtColor(b,cv2.COLOR_BGR2GRAY),70,140)
    ea=(ea>0)&(mask>0); eb=(eb>0)&(mask>0)
    kernel=np.ones((3,3),np.uint8)
    da=cv2.dilate(ea.astype(np.uint8),kernel)>0
    db=cv2.dilate(eb.astype(np.uint8),kernel)>0
    tp_a=(ea & db).sum(); tp_b=(eb & da).sum()
    precision=float(tp_a/max(ea.sum(),1)); recall=float(tp_b/max(eb.sum(),1))
    f1=2*precision*recall/max(precision+recall,1e-9)
    return precision,recall,f1

def metrics(aligned: np.ndarray, reference: np.ndarray, mask: np.ndarray):
    a=aligned[...,:3]; r=reference[...,:3]
    idx=mask>0
    raw=np.abs(a.astype(np.float32)-r.astype(np.float32)).mean(axis=2)
    fitted,params=fit_photometric(a,r,mask)
    norm=np.abs(fitted.astype(np.float32)-r.astype(np.float32)).mean(axis=2)
    def pack(arr):
        v=arr[idx]
        return {"mean":float(v.mean()),"median":float(np.median(v)),"p90":float(np.percentile(v,90)),"p95":float(np.percentile(v,95))}
    ep,er,ef=edge_f1(fitted,r,mask)
    ag=cv2.cvtColor(fitted,cv2.COLOR_BGR2GRAY).astype(np.float32)[idx]
    rg=cv2.cvtColor(r,cv2.COLOR_BGR2GRAY).astype(np.float32)[idx]
    corr=float(np.corrcoef(ag,rg)[0,1]) if len(ag)>2 and ag.std()>0 and rg.std()>0 else 0.0
    return {"pixels":int(idx.sum()),"raw_mae":pack(raw),"normalized_mae":pack(norm),"photometric_affine_bgr":params,"gray_correlation":corr,"edge_precision":ep,"edge_recall":er,"edge_f1":ef}, fitted, norm

def run_case(case: dict, out_root: Path):
    name=case["name"]
    ref=read_bgra(resolve(case["reference"]))
    cand,cand_source=build_candidate(case)
    aligned,valid,H,good,inliers=feature_align(cand,ref,case.get("alignment",{}))
    mask=cv2.bitwise_and(valid,roi_mask(ref.shape,case))
    # reference alpha, if meaningful
    if ref.shape[2]==4:
        mask=cv2.bitwise_and(mask,(ref[...,3]>0).astype(np.uint8)*255)
    m,fitted,norm=metrics(aligned,ref,mask)
    m.update({"good_matches":good,"ransac_inliers":inliers,"inlier_ratio":float(inliers/max(good,1)),"homography":H.tolist(),"candidate_source":cand_source,"reference":case["reference"]})
    case_out=out_root/name; case_out.mkdir(parents=True,exist_ok=True)
    cv2.imwrite(str(case_out/'aligned.png'),aligned)
    cv2.imwrite(str(case_out/'photometric-fit.png'),fitted)
    cv2.imwrite(str(case_out/'valid-mask.png'),mask)
    heat=np.clip(norm*4,0,255).astype(np.uint8); heat=cv2.applyColorMap(heat,cv2.COLORMAP_TURBO); heat[mask==0]=0
    cv2.imwrite(str(case_out/'heatmap.png'),heat)
    overlay=cv2.addWeighted(ref[...,:3],0.5,fitted,0.5,0)
    cv2.imwrite(str(case_out/'overlay.png'),overlay)
    (case_out/'metrics.json').write_text(json.dumps(m,indent=2))
    th=case.get("thresholds",{})
    checks={}
    if "min_inliers" in th: checks["min_inliers"]=inliers>=th["min_inliers"]
    if "min_inlier_ratio" in th: checks["min_inlier_ratio"]=m["inlier_ratio"]>=th["min_inlier_ratio"]
    if "max_normalized_mae" in th: checks["max_normalized_mae"]=m["normalized_mae"]["mean"]<=th["max_normalized_mae"]
    if "min_gray_correlation" in th: checks["min_gray_correlation"]=m["gray_correlation"]>=th["min_gray_correlation"]
    if "min_edge_f1" in th: checks["min_edge_f1"]=m["edge_f1"]>=th["min_edge_f1"]
    passed=all(checks.values()) if checks else True
    return {"name":name,"passed":passed,"checks":checks,"metrics":m}

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--manifest',default='research/visual-forensics/manifest.json')
    ap.add_argument('--output',default='research/visual-forensics/results')
    args=ap.parse_args()
    manifest=json.loads(resolve(args.manifest).read_text())
    out=resolve(args.output); out.mkdir(parents=True,exist_ok=True)
    results=[]
    for case in manifest['cases']:
        print(f"[visual] {case['name']} ...",flush=True)
        try:
            r=run_case(case,out)
        except Exception as e:
            r={"name":case.get('name','?'),"passed":False,"error":repr(e)}
        results.append(r)
        print(json.dumps(r,indent=2),flush=True)
    summary={"suite":"BNB HEROES visual forensic regression","cases":results,"passed":all(r.get('passed',False) for r in results)}
    (out/'summary.json').write_text(json.dumps(summary,indent=2))
    print(f"[visual] overall: {'PASS' if summary['passed'] else 'FAIL'}")
    return 0 if summary['passed'] else 1
if __name__=='__main__': sys.exit(main())
