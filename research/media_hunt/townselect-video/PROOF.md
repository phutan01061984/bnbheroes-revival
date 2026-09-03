# Town Upgrade preview (`/townselect/*-2.png`) recovery proof

Status: `RECONSTRUCTED_FROM_PERIOD_PIXELS` — not byte-identical original files.

The untouched 17-Nov-2021 bundle renders `/townselect/{building}-{nextLevel}.png` at exactly 250×250 inside `TOWN UPGRADE`. On the initial upgrade path it requests Level 2. Browser geometry on the restored original component independently confirms the image is 250×250 between 30×45 arrows.

## Period source and exact crop

Production gameplay `vpYV15hBOGs`, 17 Nov 2021, was recovered at 1920×1080 for 02:20–04:15. The modal preview occupies canonical capture crop `x=835, y=285, w=250, h=250`. Its exposed background pixels are BGR `[48,34,38]`, matching the live preserved modal BGR `[50,35,38]` modulo video/JPEG encoding.

Multiple stable frames were median-stacked per building to remove cursor/compression noise, then the flat modal background was alpha-matted. Re-compositing the derivatives onto the preserved modal background gives only ~0.7–1.1 mean absolute channel error (0–255) versus the period composites.

Mapping from the contemporaneous transcript/UI sequence:

| runtime | building | source interval relative to 02:20 segment | samples |
|---|---|---:|---:|
| `1-2.png` | Bank Level 2 | 21–31s | 21 |
| `4-2.png` | Training Grounds Level 2 | 36–58s | 45 |
| `3-2.png` | Barracks Level 2 | 63–74s | 23 |
| `2-2.png` | Town Inn Level 2 | 77–99s | 45 |

## Independent second-video validation

The recovered previews were SIFT/RANSAC-matched against a separate 1080p gameplay video `VUt1ccH-dQ4` (7 Nov period footage), in the segment where the reviewer cycles/upgrades the same buildings:

- Bank Level 2: **433 inliers**
- Town Inn Level 2: **210 inliers**
- Barracks Level 2: **478 inliers**
- Training Grounds Level 2: **223 inliers**

These are independent visual matches, not inferred labels. Level 3/4 preview files remain preservation fallbacks until period evidence for those exact states is recovered.

Raw videos/crops are research evidence and intentionally not all committed due size. Runtime derivatives and this proof are the small reproducible preservation output.

## Level 3 previews

Level 3 is recovered from separate 1080p period gameplay `VUt1ccH-dQ4` (7 Nov 2021). At ~19:49 the reviewer explicitly states that the upgrade process to Level 3 has already started. In the captured 20:05–20:45 sequence the current building level is therefore 2; the untouched 17-Nov bundle formula consequently requests `{building}-3.png` for the modal preview.

The four stable visual states follow the same building order used by the original component and the spoken walkthrough:

| runtime | building | stable interval relative to 20:05 | re-composite MAE (0–255) |
|---|---|---:|---:|
| `1-3.png` | Bank Level 3 | 6.2–8.8s | 1.448 |
| `2-3.png` | Town Inn Level 3 | 9.2–17.6s | 1.353 |
| `3-3.png` | Barracks Level 3 | 18.2–22.3s | 1.197 |
| `4-3.png` | Training Grounds Level 3 | 22.8–29.1s | 1.494 |

These are `RECONSTRUCTED_FROM_PERIOD_PIXELS`, not byte-identical originals. They are materially different from the Level 2 previews (per-building mean pixel differences 18.9–29.5), so they are not duplicated Level 2 art.
