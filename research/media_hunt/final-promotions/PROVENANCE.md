# Final hashed-media promotion provenance — 2026-09-03

This directory records the last six hashed media files that were unavailable as direct 2021 game-client bytes. Raw historical evidence is preserved separately. Runtime derivatives must never be described as byte-identical originals unless explicitly stated.

## `card.df50fb38.png` — RECONSTRUCTED_FROM_PERIOD_PIXELS
- Runtime dimensions: 459×654.
- Source: official BNB HEROES 2021 minting/gameplay video `WZwbq7Va0gg` recovered at 1920×1080.
- The same open-card slot appears repeatedly in the Town Inn grid. 210 detected occurrences were grouped into the dominant open-card cluster.
- The period-video cluster was median stacked, edge-trimmed and resized to the exact runtime dimensions.
- See `../card-analysis/CARD_SLOT_RECOVERY_PROOF.md`.

## `card_lock.c211f00f.png` — RECONSTRUCTED_FROM_PERIOD_PIXELS
- Runtime dimensions: 459×654.
- Source: same official 2021 video.
- 51 repeated locked-card occurrences form a separate visual cluster from the open card.
- Median stack promoted after exact runtime-size reconstruction.

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
- Win/lose median frames were compared; the central result-art component is the major changing connected component (approximately x=505..778, y=271..565 in the 1280×720 captured frame set).
- Runtime derivative uses those period pixels with a soft differential alpha mask on a 512×512 transparent canvas.

## `You lose.00f95b2b.png` — RECONSTRUCTED_FROM_PERIOD_PIXELS
- Runtime dimensions: 512×512.
- Original bundle proves loss condition (`Number(Q.rewards)==0`) renders this image at width 500px with DOM text `You LosE` above it.
- Recovered period lose-frame set is under `../video-diff/lose/`.
- Same differential extraction method as win is used, preserving the period loss artwork rather than inventing a replacement.

## `fight.42bbd04e.png` — RECONSTRUCTED_FROM_PERIOD_PIXELS
- Runtime dimensions: 512×512.
- Direct original hashed bytes remain unrecovered after GitBook/legacy-host/URLScan/Common-Crawl and exact-filename archive searches.
- Period source: 2021-11-07 Home gameplay footage `VUt1ccH-dQ4-upgrades-1205-1245.mp4`, 1920×1080; exact source/frame geometry and scene state are documented in `research/proofs/fight-period-reconstruction-20260903/`.
- Foreground extraction was calibrated against four surviving original menu-icon alpha masks and validated leave-one-icon-out: mean IoU 0.9557, minimum IoU 0.9416.
- Candidate period reconstruction recomposes over the recovered Town background at mean MAE ~1.19 (foreground-support mean ~0.135), versus ~48.09 mean MAE for the superseded creative artwork.
- **Do not claim byte-identical original.** The correct provenance label is `RECONSTRUCTED_FROM_PERIOD_PIXELS`.
- Superseded creative runtime bytes are archived at `archive/pre-fight-period-recovery-20260903/fight.42bbd04e.png`.

## Runtime promotion hashes
- `card.df50fb38.png`: `cac62dc89c4e15b36fb738131ca99c04b90c1211bf9e2e175e655394fef8e100`
- `card_lock.c211f00f.png`: `f68d9efe4d89f00ec1e5ef6857b046d9aaa69147c52ca11c6f9e1a8e24284103`
- `recruit_card.aa5e12c7.png`: `12ddc8b41804baff0e78ede53833bd503fa24e3b130ec2d01203fca8cf65aae6`
- `rewards.16b2db64.png`: `0ba35be2fa35911f90468a49ed2b019adf505a59497569b53e7e5dc84e8e8a9d`
- `You lose.00f95b2b.png`: `4f08df3827f4b41f42c4e078542f04ada3858be578fe9a0099f8083de89034b4`
- `fight.42bbd04e.png`: `e53c1be329ff369acce7179659cd0066957653a096ea7823a731221b4f55edfa`

All previous runtime placeholders are preserved under `backups/`.
