# Final hashed-media promotion provenance — updated 2026-09-04

This directory records the last six hashed media files that were unavailable as direct 2021 game-client bytes. Raw historical evidence is preserved separately. Runtime derivatives must never be described as byte-identical originals unless explicitly stated.

## `card.df50fb38.png` — RECONSTRUCTED_FROM_PERIOD_PIXELS
- Runtime dimensions: 459×654.
- Source: official BNB HEROES 2021 minting/gameplay video `WZwbq7Va0gg` recovered at 1920×1080.
- Corrected semantic mapping on 2026-09-04: the open/recruitable slot is the plain BNB HEROES card back, Cluster 2 (45 period occurrences), not the padlock Cluster 0.
- The period-video cluster was median stacked, edge-trimmed and resized to the exact runtime dimensions using the recovered transform documented in the card proof.
- See `../card-analysis/CARD_SLOT_RECOVERY_PROOF.md`.

## `card_lock.c211f00f.png` — RECONSTRUCTED_FROM_PERIOD_PIXELS
- Runtime dimensions: 459×654.
- Source: same official 2021 video.
- Corrected semantic mapping on 2026-09-04: Town-Inn-locked slots use the padlock artwork, Cluster 0 (210 occurrences). Recovered bundle control flow independently proves module 174 is rendered when `unlock === false` beside `Upgrade Town Inn`.
- The prior runtime had the padlock and question-mark meanings assigned to the wrong states; pre-correction bytes are preserved under `archive/pre-card-semantic-fix-20260904/`.

## `cards/unkown.png` — RECONSTRUCTED_FROM_PERIOD_PIXELS
- Runtime dimensions: 459×654.
- Recovered bundle uses this path for a Hero whose `arrivalTime` is still pending.
- Official footage shows the yellow question-mark card immediately after Recruit and until EXPEDITE / arrival completes. It is Cluster 1 (51 occurrences).
- This replaces the restoration-only `HERO ART LOST` placeholder for the pending-arrival state; it is not a generic missing-Hero-art substitute.

## `recruit_card.aa5e12c7.png` — FIRST_PARTY_PERIOD_ASSET_ADAPTED
- Runtime dimensions: 459×654.
- Source: first-party archived `BNBH-Card-Back.png`, 946×1385.
- The first-party card back independently matches official video frames with 195 RANSAC inliers at the strongest occurrence and repeatedly appears elsewhere in the same period video.
- The source is center-cropped only to the runtime aspect ratio then resized; no new illustration content was invented.
- This is period first-party artwork adapted to the hashed runtime geometry; direct `recruit_card.aa5e12c7.png` bytes were not recovered.

## `rewards.16b2db64.png` — RECONSTRUCTED_FROM_PERIOD_PIXELS
- Runtime dimensions: 512×512.
- Original bundle proves this image is rendered in the RESULT modal at width 500px beneath DOM text (`RESULT`, `ENEMY DEFEATED`, reward numbers).
- Period win RESULT evidence exists in `../matters-result/result-win-20211208.png` and the recovered `../video-diff/win/` frame set.
- 2026-09-04 audit found the previous promoted `win-diffart.png` accidentally contained the RESULT title, `ENEMY DEFEATED`, `REWARDS`, BNB/XP/HP labels and value boxes. The bundle renders those separately, causing visible duplicated text in runtime.
- Corrected runtime uses the period chest/glow aligned from the 8-Dec Matters RESULT screenshot. A second reviewer frame aligns to the same chest geometry with 174/183 SIFT inliers (95.1%), independently validating placement.
- The exact 2021 modal background and exact `reward-seperator` PNG were recovered from bundle CSS/JS. Only the separator's 16px occlusion footprint requires reconstruction beneath the DOM layer; the final DOM separator covers that footprint again at runtime.
- See `research/proofs/result-art-cleanup-20260904/PROOF.md`.

## `You lose.00f95b2b.png` — RECONSTRUCTED_FROM_PERIOD_PIXELS
- Runtime dimensions: 512×512.
- Original bundle proves loss condition (`Number(Q.rewards)==0`) renders this image at width 500px with DOM text `You LosE` above it.
- Recovered period lose-frame set is under `../video-diff/lose/`.
- 2026-09-04 audit found the prior promoted `lose-diffart.png` likewise contained title/separator/reward-row DOM pixels and visibly duplicated them in runtime.
- Corrected art uses the actual period Result Mage + orange glow above the reward separator. The lower Mage pixels hidden by reward-row DOM in the video are reconstructed from the first-party GitBook `Level 2 Skull Enemies.jpg`; SIFT against the period Result view validates the same artwork and target geometry (43/52 inliers at the stable fit before lower-patch use).
- The lower first-party patch is color-fit only from visible overlapping period Mage pixels and is explicitly a period-derived reconstruction, not original hashed bytes.
- Fresh HTTPS Preview QA on `f8f0e62` rejected the first art-only derivative because `read_image` exposed a rectangular orange-glow/alpha crop boundary across the Mage waist. That rejected intermediate is preserved at `archive/pre-result-seam-fix-20260904/You lose.00f95b2b.png` (SHA-256 `14074d97711e1ae44538295db5952174c9cfb889d2d05dea77e981a107be0b2d`).
- Final Lose reconstruction clips upper period pixels to the proven Mage support, crossfades to the first-party lower Mage through the separately-rendered separator region, and rebuilds only the glow as a smooth field from trusted period glow pixels. This removes the screenshot boundary without inventing new character geometry.
- See `research/proofs/result-art-cleanup-20260904/PROOF.md`.

## `fight.42bbd04e.png` — RECONSTRUCTED_FROM_PERIOD_PIXELS
- Runtime dimensions: 512×512.
- Direct original hashed bytes remain unrecovered after GitBook/legacy-host/URLScan/Common-Crawl and exact-filename archive searches.
- Period source: 2021-11-07 Home gameplay footage `VUt1ccH-dQ4-upgrades-1205-1245.mp4`, 1920×1080; exact source/frame geometry and scene state are documented in `research/proofs/fight-period-reconstruction-20260903/`.
- Foreground extraction was calibrated against four surviving original menu-icon alpha masks and validated leave-one-icon-out: mean IoU 0.9557, minimum IoU 0.9416.
- Candidate period reconstruction recomposes over the recovered Town background at mean MAE ~1.19 (foreground-support mean ~0.135), versus ~48.09 mean MAE for the superseded creative artwork.
- **Do not claim byte-identical original.** The correct provenance label is `RECONSTRUCTED_FROM_PERIOD_PIXELS`.
- Superseded creative runtime bytes are archived at `archive/pre-fight-period-recovery-20260903/fight.42bbd04e.png`.

## Runtime promotion hashes
- `card.df50fb38.png`: `0451318f5e6a9b7ca55705630a0f51bb104c9597d1585ee5e4e986a1800721be`
- `card_lock.c211f00f.png`: `cac62dc89c4e15b36fb738131ca99c04b90c1211bf9e2e175e655394fef8e100`
- `cards/unkown.png`: `f68d9efe4d89f00ec1e5ef6857b046d9aaa69147c52ca11c6f9e1a8e24284103`
- `recruit_card.aa5e12c7.png`: `12ddc8b41804baff0e78ede53833bd503fa24e3b130ec2d01203fca8cf65aae6`
- `rewards.16b2db64.png`: `8fc8ce881b9eabfecf7ff7f53fa441a8f48153e272d38b1a28229ad6e7c72f46`
- `You lose.00f95b2b.png`: `084806d7df4f1b51094d8de5babd9f3afca7760250e799554a2af5cdff3a3a02`
- `fight.42bbd04e.png`: `e53c1be329ff369acce7179659cd0066957653a096ea7823a731221b4f55edfa`

All previous runtime placeholders are preserved under `backups/`.
