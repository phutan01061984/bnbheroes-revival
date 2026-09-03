# BNB HEROES visual forensic regression

This suite quantifies visual fidelity against surviving 2021 period references. It is **not** a claim that reconstructed runtime assets are byte-identical originals.

Run:

```bash
npm run visual:forensics
```

Pipeline per case:
1. build/load canonical runtime candidate;
2. SIFT feature matching + RANSAC homography into the period-reference frame;
3. mask/ROI known UI or unobservable regions;
4. fit a bounded per-channel affine photometric correction for video grading;
5. measure raw/normalized MAE, grayscale correlation, edge precision/recall/F1, feature matches/inliers;
6. write aligned image, photometric fit, mask, overlay, heatmap and `metrics.json` under `results/`.

`BASELINE.json` records the certified 2026-09-03 restoration. Manifest thresholds intentionally allow small codec/feature nondeterminism but fail meaningful geometric/visual regressions.

Initial coverage:
- canonical all-Level-4 Town composite vs 21-Nov-2021 max-town period frame;
- all eight direct period upgrade previews for Town Level 2/3 vs active runtime previews;
- reconstructed Fight icon composited over its recovered Town background vs six-frame period median.

Generated `results/` and `generated/` images are evidence artifacts and can be regenerated; only manifest/baseline/docs need to be treated as durable regression configuration unless a specific result image is curated separately.
