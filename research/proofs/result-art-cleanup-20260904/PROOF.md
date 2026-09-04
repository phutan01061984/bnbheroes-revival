# RESULT artwork cleanup proof — 2026-09-04

## What was wrong

The 2026-09-03 restoration promoted `research/media_hunt/result-analysis/reconstructed/win-diffart.png` and `lose-diffart.png` directly into the two legacy hashed RESULT-art paths. Those files were useful differential-analysis intermediates, but they contained more than artwork: the captured RESULT title, win/lose heading, `REWARDS` separator, BNB/XP/HP rows, value boxes, and small modal fragments.

The recovered 17-Nov bundle renders all of those elements separately in DOM. Therefore the intermediate images caused visible duplicated text/rows in the restored runtime. Browser evidence under `research/browser-regression/2026-09-03-boss-result-win.png` shows the duplicated `ENEMY DEFEATED` and overlapping reward rows.

Superseded contaminated bytes are preserved, not deleted:

- `archive/pre-result-cleanup-20260904/rewards.16b2db64.png`
- `archive/pre-result-cleanup-20260904/You lose.00f95b2b.png`

## Bundle layer proof

The recovered bundle around the Result modal proves this layer order:

1. exact modal frame/background from `.modal .content` CSS;
2. DOM title `RESULT`;
3. DOM result heading (`You LosE` or `ENEMY DEFEATED`);
4. `result-bg` image: `rewards.16b2db64.png` or `You lose.00f95b2b.png`;
5. separate base64 `reward-seperator` image;
6. separate DOM BNB / XP / HP rows and value boxes.

The exact original 2021 modal background was recovered from the CSS base64 (694x822 RGBA). The exact original `reward-seperator` was recovered from the JS base64 (582x27 RGBA). This makes it possible to distinguish artwork from UI without guessing which text belongs to which layer.

## Win / treasure artwork

Primary period source:

- committed proof copy: `evidence/win-period-result.png`
- archaeology workspace source: `research/media_hunt/matters-result/result-win-20211208.png`

The period chest is aligned to the 512x512 legacy result-art geometry using SIFT/RANSAC:

- 372 good matches
- 325 inliers
- 87.37% inlier ratio

An independent reviewer Result frame was then aligned to the same chest geometry:

- 183 good matches
- 174 inliers
- 95.08% inlier ratio

This independently validates the chest scale/placement rather than deriving geometry from one screenshot.

The original `reward-seperator` fits the aligned period screenshot at approximately `(x=83, y=302, w=336, h=16)` with masked color correlation 0.9037. Because the separator is a separately rendered DOM layer, its thin occlusion footprint is removed from the art derivative. Pixels hidden by that layer cannot be claimed as exact original art; they are reconstructed only underneath the same separator that covers them again at runtime.

Corrected runtime:

- `static/media/rewards.16b2db64.png`
- SHA-256: `8fc8ce881b9eabfecf7ff7f53fa441a8f48153e272d38b1a28229ad6e7c72f46`
- provenance: **RECONSTRUCTED_FROM_PERIOD_PIXELS**, not original bytes.

## Lose artwork

Primary period Result source:

- committed proof copy: `evidence/lose-period-result.png`
- archaeology workspace source: `research/media_hunt/video-diff/lose/center-crops/f0088.png`

Period Result crop -> legacy 512 geometry:

- 79 good SIFT matches
- 71 inliers
- 89.87% inlier ratio

The visible upper Mage and orange glow are retained from the Result-period pixels through the separator boundary. Reward-row DOM obscures the lower Mage in every surviving Result capture, so the hidden lower body cannot be recovered directly from those screenshots.

A first-party period source contains the same full Mage artwork without Result-row occlusion:

- committed proof copy: `evidence/level2-skull-enemies-first-party.jpg`
- archaeology workspace source: `research/media_hunt/gitbook-legacy/files/-Mj8uZlLWRG4Pr0rcr-H__Level 2 Skull Enemies.jpg`
- documented independently as the Level-2 Red Skull Mage in `research/media_hunt/gitbook-legacy/segmentation/TIER2_MAPPING_PROOF.md`.

Feature matching against the visible Result Mage validates identity/geometry at the stable fit:

- 52 good matches
- 43 inliers
- 82.69% inlier ratio

Only the lower character pixels hidden by the Result DOM are patched from that first-party period image. Their color transform is fitted from the overlapping visible period Mage. This is explicitly reconstruction, not a claim that the derived file equals the missing hashed response.

### Browser-vision rejection sequence and final correction

The first art-only Lose derivative removed the duplicated DOM title/reward rows, but fresh HTTPS Preview QA on commit `f8f0e62` exposed a second, subtler reconstruction defect that the hash/geometry checks did not catch: the period upper-image layer retained a rectangular orange-glow/alpha boundary across the Mage waist. `read_image` on `research/browser-regression/2026-09-04-preview-f8f0e62-result-lose.png` rejected that version. Its SHA-256 `14074d97711e1ae44538295db5952174c9cfb889d2d05dea77e981a107be0b2d` is preserved at `archive/pre-result-seam-fix-20260904/You lose.00f95b2b.png`.

The next derivative (`084806d7...`) removed the rectangular seam, but real-browser QA on Preview commit `40fadde` exposed broad blue/gray sheet-background contamination inside the Mage silhouette. The runtime screenshot is `research/browser-regression/2026-09-04-preview-40fadde-result-lose-final.png`. That rejected derivative is preserved at `archive/pre-result-sheet-artifact-fix-20260904/You lose.00f95b2b.png`.

Preview commit `7c7789e` then passed My Heroes and Win RESULT, but the real 500×500 Lose `<img>` still exposed a residual baked modal/crop band at the old y~300 join. CDP measured the Result art at CSS rect `(650,239,500,500)` and the separately rendered reward separator at `(684.45,578.37,431.11,20)`, placing the real separator near source-image y~347 rather than over that old join. `read_image` therefore rejected SHA-256 `1ef7f840...`; those bytes are preserved at `archive/pre-result-browser-crop-fix-20260904/You lose.00f95b2b.png`.

The current reconstruction removes all three browser-observed failure modes without inventing character geometry:

1. visible upper Mage color remains aligned 2021 Result pixels;
2. structural character alpha comes from the independently matched first-party Mage, constrained to mapped Mage/staff geometry and filtered for **vertical continuity**, which rejects the thin horizontal rules in the source sheet;
3. orange glow alpha comes only from the warm-color residual in period Result pixels and is radially feathered, so modal/background colors cannot survive as an opaque rectangle;
4. lower Mage pixels remain first-party period art with the established color fit;
5. the former crop join receives only a narrow **RGB vertical interpolation inside already-proven opaque Mage/staff support**. No new silhouette or character geometry is drawn.

The current pre-HTTPS candidate is locally preserved as `research/read-image-audit-20260904/result-clean-candidates/final/clean17/lose-clean17.png` with neutral-modal simulation `clean17/lose-clean17-on-purple.png`. Final proof remains contingent on the fresh HTTPS Preview gate; the production alias must not be promoted until that browser screenshot is accepted.

Corrected runtime:

- `static/media/You lose.00f95b2b.png`
- SHA-256: `9f54476dc22af25fa45faccf82c510f699f6e3517222152562a402275ff0e107`
- provenance: **RECONSTRUCTED_FROM_PERIOD_PIXELS**, not original bytes.

## Regression boundary

The preservation verifier locks the current Result hashes and all three browser-rejected Lose intermediates in archive directories. A future edit must not silently re-promote any rejected derivative.

Machine-readable metrics and hashes are in `PROOF.json`.

Committed visual comparisons for quick review are `evidence/win-runtime-vs-period.jpg` and `evidence/lose-runtime-vs-period.jpg`.
