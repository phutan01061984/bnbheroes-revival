# BNB HEROES Revival — Continuation Task Ledger

Updated: 2026-09-03

Goal: recover the 2021 game as faithfully as possible. Prefer original bytes / period-original evidence. Reconstruct only after multiple source paths are exhausted. Keep wallet/mainnet transaction flow disabled.

## P0 — Media recovery

- [x] Read `AI_IDE_HANDOFF.md` fully and continue from checkpoint.
- [x] Run `npm run check:all` baseline — passes.
- [x] Confirm Tier-2 crop 1 matches original `/enemies/4.png` (Red Skull Archer) using SIFT/RANSAC. Result: 251 inliers; other crops 8/20.
- [x] Lock Tier-2 crop 2/3: middle=Mage via exact historical bot template match (0.9721); right=Assasin by exhaustive 3-item set after left=Archer proof. See `gitbook-legacy/segmentation/TIER2_MAPPING_PROOF.md`.
- [x] Lock Tier-1 left/middle/right mapping for Red Skull 1/2/3 using first-party sheet ordering + SIFT/RANSAC back to 4000x2070 source.
- [x] Produce/promote transparent production derivatives for enemies 1–6 from period-original GitBook sheets; raw sources preserved.
- [x] Recover Zangrief (enemy 7) from 17 Nov production boss video + higher-res 8 Dec period screenshot; transparent runtime reconstruction promoted. See `derivatives/enemies/ZANGRIEF_PROOF.md`.
- [x] `fight.42bbd04e.png`: direct byte remains unrecovered; runtime uses an explicitly documented creative reconstruction, normalized to 8-bit. Do not describe as original/period-derived.
- [x] Reconstruct `towns/3-1.png` from first-party `Level-1.png` explicitly labeled “Level 1 Barracks”; map into 1920×1080 town coordinates through period screenshot homography. See `barracks-analysis/TOWN_3_1_PROOF.json`.
- [x] Recover/reconstruct `card`, `card_lock`, `recruit_card`, `rewards`, `You lose` from period evidence. Card/card_lock are median-stacked official-video pixels; recruit_card uses first-party 2021 BNBH Card Back; result art uses win/lose period-video differential reconstruction. See `card-analysis/CARD_SLOT_RECOVERY_PROOF.md` and `final-promotions/PROVENANCE.md`.

## P0 — Legacy-page access / archaeology

- [x] Recover GitBook public Space/revision/page IDs and enumerate public legacy storage objects; 189 documents + 20 assets archived locally.
- [x] Test/use `files.gitbook.com` rewrites; all publicly listable legacy Space assets enumerated (20 total).
- [x] Recover 189 historical page-body objects directly by public bucket prefix listing instead of guessed sibling paths.
- [ ] Search web indexes for exact legacy page IDs, titles, filenames and old `bnbheroes.xyz` URLs.
- [ ] Try alternate Memento/archive gateways where legal/publicly accessible, rather than repeatedly hitting Wayback direct 429.
- [ ] Search archived/current mirrors for `bnbheroes.xyz` WordPress sitemap/feed/Elementor JSON/API remnants.
- [ ] Search for cached copies/quotes of Common Enemies, Bosses, Hero Wiki, Eastcliff Town Upgrade, Hero Recruitment.

## P1 — Video archaeology

- [x] Confirm first-party `keyframe-My-Video.mp4` is already locally recovered (6,568,989 bytes, 1920×900, ~12.96 s).
- [x] Confirm 13 extracted frames/contact sheet already exist.
- [x] Extract dense gameplay frames from 7 Nov and 17 Nov 2021 videos; use them to validate Archer and recover/validate Chapter-1 boss.
- [x] Perform SIFT/RANSAC frame-to-asset matching for Archer/Mage/Boss during recovery; proof captured in enemy reports/handoff.

## P1 — Hero ID mapping

- [x] Preserve 21/21 period hero artworks.
- [x] Strong anchors: heroNameId 14 = Arnulf; 18 = Elrik.
- [ ] Parse official X captions/media TSV for hero names/stat clues.
- [ ] Match on-chain stat tuples against named screenshots/guides.
- [ ] Map additional heroNameIds only when proof is sufficient.
- [ ] Save proof artifact before replacing `/cards/{id}.png`.

## P1 — Runtime integration

- [x] Replace enemy placeholders only after mapping proof; enemies 1–7 now have evidence-backed period derivatives/reconstruction.
- [x] Keep raw recovered evidence immutable; derivatives go to runtime paths separately.
- [x] Integrate Barracks/card/result media; Fight is integrated as clearly-labeled creative reconstruction because direct/period pixels remain unavailable.
- [x] Run `npm run check:all` after each integration batch — passes after final media promotion.
- [ ] Browser smoke test `/`, `/myheroes`, `/market`, `/battlelogs`, `/myreserve`, `/prototype/`, `/gitbook/`.

## P2 — Original UI playable adapter

- [x] Inventory original bundle Web3/game method calls needed per route. See `docs/ORIGINAL_UI_COMPATIBILITY.md`.
- [x] Build a mock/compatibility provider that maps original UI calls to local simulation engine (`preservation-provider.js`).
- [x] Keep real wallet signing/transactions disabled; provider tests assert `personal_sign`/raw transaction rejection and runtime has no BSC/Infura RPC endpoint.
- [x] Wire the 2021 React UI natively to the safe local provider: original auto-connect + Connect restored, static Web3 reads and original write handlers use the shared local engine/save; public Vercel browser regression passed 2026-09-03.
- [x] Recover the historically active Home Recruit handler from the original 16 Nov 2021 bundle and restore it into the 17 Nov shell; retain untouched 17 Nov disabled state as provenance evidence.
- [x] Restore Battle Logs without rewriting the React page: preserve Apollo UI and emulate retired Bitquery GraphQL from structured local Fight history.

## P2 — Documentation / deployment

- [x] Update `docs/MEDIA_RECOVERY.md` with new proof/mapping through 2026-09-03 final-media checkpoint.
- [x] Update `AI_IDE_HANDOFF.md` after major milestones (latest: 2026-09-03 final-media checkpoint).
- [x] Deploy a non-production Vercel preview after tests and browser-regression it before any production deployment. Preview certified 2026-09-03; production intentionally not promoted yet.
- [ ] Record commit/deployment IDs in handoff.
