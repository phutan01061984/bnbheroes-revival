# Town canonical geometry correction — 2026-09-03

The first Level-2/3 full-town recovery placed recovered period pixels in the 1920×1080 **video capture** coordinate system. The original runtime town canvas is instead mapped into those reviewer captures at approximately `x'=x`, `y'=0.907*y+98.6` because browser chrome reduces the web viewport height.

This directory records the correction used for runtime promotion:

- `GEOMETRY_PROOF.json`: per-building runtime→video transform fitted from original `towns/background.jpg` against the exact full-resolution period frames at 7.5, 13.5, 20.0 and 25.5 seconds of the recovered 2021-11-07 walkthrough segment.
- `ROUNDTRIP_VALIDATION.json`: corrected L2/L3 layers inverse-warped to canonical runtime and then re-warped to their former video coordinates; alpha IoU is 0.95456–0.99917 and overlap RGB MAE is 0.932–1.006.
- `PREVIEW_TO_CANONICAL_VALIDATION.json`: Level-3 period previews forward-warped through corrected preview→canonical-full homographies; alpha IoU is 0.99746–0.99893 and RGB MAE is 0.821–1.066.
- `TOWNSELECT_L4_CANONICAL_PROOF.json`: Level-4 previews regenerated from canonical Level-4 full-town layers using those corrected homographies. Level-3 pixels are used only where preview coordinates map outside the 1920×1080 observable runtime canvas.

The pre-fix reconstructed runtime files are preserved under `archive/pre-town-canonical-geometry-fix-20260903/`.
