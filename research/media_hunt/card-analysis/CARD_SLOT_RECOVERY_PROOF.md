# Card / Card-Lock Recovery Proof

Date: 2026-09-03

## Status

- `card.df50fb38.png`: **RECONSTRUCTED_FROM_PERIOD_PIXELS**
- `card_lock.c211f00f.png`: **RECONSTRUCTED_FROM_PERIOD_PIXELS**
- Original hashed 2021 response bytes are still not recovered.

## Primary evidence

Official BNB Heroes YouTube video:

- Video ID: `WZwbq7Va0gg`
- Title: `BNB HEROES NFT minting function is tested and fully working!`
- Upload date: 2021-10-17
- Locally preserved at `research/media_hunt/youtube/deep/WZwbq7Va0gg.mp4`
- Preserved resolution: 1920x1080

The recovered 2021 bundle renders the Barracks/Town Inn slot assets from:

- module 174 -> `static/media/card_lock.c211f00f.png`
- module 175 -> `static/media/card.df50fb38.png`
- slot component renders each at 120 px in one recovered build variant.

## Geometry proof

At ~19.5-20.0 s in the official video, repeated vertical card slots were detected by edge/contour geometry.

Three repeated open-slot candidates were approximately:

- `(x=1445, y=316, w=227, h=330)`
- `(x=846, y=316, w=227, h=330)`
- `(x=1147, y=316, w=226, h=330)`

Their pairwise normalized grayscale correlations were 0.959-0.982 and SIFT good-match counts were 114-135, proving they are repeated instances of the same rendered asset rather than different hero art.

The observed aspect ratio (~0.688) and ~2x relation to the recovered runtime placeholder dimensions (459x654, ratio ~0.702) are consistent with a browser-scaled rendering of the legacy source image.

## Multi-frame clustering

Frames from 16-91 s were sampled every 0.5 s and card-like contours were normalized to 227x330. 356 candidates were clustered by normalized image correlation.

Major clusters:

- Cluster 0: 210 instances -> open slot artwork (`card`)
- Cluster 1: 51 instances -> locked slot artwork (`card_lock`), visually distinct silhouette/medallion center
- Cluster 2: 45 instances -> another capture/state of the open-slot artwork

Cluster 0 / Cluster 1 are visually and structurally distinct. The locked cluster appears in the same Town Inn grid context in which the recovered component switches between module 174 and 175 according to `unlock` state.

## Reconstruction method

1. Preserve all raw official-video frames unchanged.
2. Detect repeated slot rectangles from the 1080p official footage.
3. Normalize repeated instances to 227x330.
4. Align instances with ECC translation.
5. Median-stack many repeated captures to reduce YouTube compression noise.
6. Trim only the 1-pixel capture edge.
7. Lanczos upscale to the legacy runtime dimensions 459x654.
8. Apply a very mild unsharp pass; no content is generated or painted in.
9. Encode as RGBA.

Reconstructed research derivatives:

- `research/media_hunt/card-analysis/reconstructed/card.df50fb38.png`
  - SHA256: `cac62dc89c4e15b36fb738131ca99c04b90c1211bf9e2e175e655394fef8e100`
- `research/media_hunt/card-analysis/reconstructed/card_lock.c211f00f.png`
  - SHA256: `f68d9efe4d89f00ec1e5ef6857b046d9aaa69147c52ca11c6f9e1a8e24284103`

## Important provenance note

These files are NOT byte-identical originals. They are reconstruction derivatives made only from pixels visible in an official 2021 BNB Heroes 1080p video and legacy bundle geometry. Label them `RECONSTRUCTED_FROM_PERIOD_PIXELS` / `RECONSTRUCTED`, never `ORIGINAL_BYTES`.
