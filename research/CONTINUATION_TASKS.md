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
- [x] `fight.42bbd04e.png`: direct hashed byte remains unrecovered, but the creative placeholder has been superseded by a validated **RECONSTRUCTED_FROM_PERIOD_PIXELS** runtime asset from 2021-11-07 Home footage. See `research/proofs/fight-period-reconstruction-20260903/`. Do not describe it as byte-identical original.
- [x] Reconstruct `towns/3-1.png` from first-party `Level-1.png` explicitly labeled “Level 1 Barracks”; map into 1920×1080 town coordinates through period screenshot homography. See `barracks-analysis/TOWN_3_1_PROOF.json`.
- [x] Recover/reconstruct `card`, `card_lock`, `recruit_card`, `rewards`, `You lose` from period evidence. Card/card_lock are median-stacked official-video pixels; recruit_card uses first-party 2021 BNBH Card Back; result art uses win/lose period-video differential reconstruction. See `card-analysis/CARD_SLOT_RECOVERY_PROOF.md` and `final-promotions/PROVENANCE.md`.

## P0 — Legacy-page access / archaeology

- [x] Recover GitBook public Space/revision/page IDs and enumerate public legacy storage objects; 189 documents + 20 assets archived locally.
- [x] Test/use `files.gitbook.com` rewrites; all publicly listable legacy Space assets enumerated (20 total).
- [x] Recover 189 historical page-body objects directly by public bucket prefix listing instead of guessed sibling paths.
- [x] Search web indexes for exact legacy page IDs/titles/filenames and old `bnbheroes.xyz` URLs; no stronger surviving runtime bytes found.
- [x] Try alternate public Memento/archive routes plus Wayback/Common Crawl/urlscan paths; useful captures recovered where available, remaining dead/rate-limited paths documented.
- [x] Search old `bnbheroes.xyz`/WordPress/media remnants and period mirrors; recovered first-party Barracks/media/video evidence and exhausted current public routes for runtime blockers.
- [x] Search cached copies/quotes and recover legacy page bodies where surviving. Hero Drop Rate/Recruitment/Town/Enemies and other page text are archived; absent direct bodies/assets were pursued through period mirrors/media.

## P1 — Video archaeology

- [x] Confirm first-party `keyframe-My-Video.mp4` is already locally recovered (6,568,989 bytes, 1920×900, ~12.96 s).
- [x] Confirm 13 extracted frames/contact sheet already exist.
- [x] Extract dense gameplay frames from 7 Nov and 17 Nov 2021 videos; use them to validate Archer and recover/validate Chapter-1 boss.
- [x] Perform SIFT/RANSAC frame-to-asset matching for Archer/Mage/Boss during recovery; proof captured in enemy reports/handoff.

## P1 — Hero ID mapping

- [x] Preserve 21/21 period hero artworks.
- [x] Strong anchors: heroNameId 14 = Arnulf; 18 = Elrik.
- [x] Parse official X captions/media and rarity lineup evidence; archive official “three new Heroes” video and CV comparisons.
- [x] Compare preserved contract template arrays/direct anchors and period named art/rank evidence; historical public RPC is pruned, so no unsupported direct-ID claims were added.
- [x] Map all 21 heroNameIds with explicit confidence policy: 14/18 DIRECT; remaining 19 HIGH_STRUCTURAL. See `research/hero-id-mapping/PROOF.md`.
- [x] Save `research/hero-id-mapping/PROOF.md` + `heroNameId-final.tsv`; promote all 21 period artworks byte-for-byte and add preservation regression checks.

## P1 — Runtime integration

- [x] Replace enemy placeholders only after mapping proof; enemies 1–7 now have evidence-backed period derivatives/reconstruction.
- [x] Keep raw recovered evidence immutable; derivatives go to runtime paths separately.
- [x] Integrate Barracks/card/result media and replace the Fight creative placeholder with the validated period-pixel reconstruction; direct Fight bytes remain unavailable.
- [x] Run `npm run check:all` after each integration batch — passes after final media promotion.
- [x] Browser smoke original routes/actions on public Vercel preview (native UI certification 2026-09-03). Fresh Hero-card commit preview smoke is tracked as the final deployment gate.

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
- [x] Record Hero-card completion commit `addeaef`, GitHub restoration branch, Vercel preview URL, and 21-card public-preview certification in handoff/browser report.

## Live checkpoint — Town upgrade media (2026-09-03)
- [x] Promote evidence-backed full-town Level 2 layers `towns/1-2` … `towns/4-2` from period gameplay pixels.
- [x] Promote evidence-backed full-town Level 3 layers `towns/1-3` … `towns/4-3` from period gameplay pixels; Bank L3 uses corrected stable transform-chain proof (53/59 inliers).
- [x] Preserve pre-promotion fallbacks under `archive/pre-town-layer-recovery-20260903/`.
- [x] Run `npm run check:all` after Town L2/L3 promotion — PASS.
- [x] Recover/validate/promote full-town Level 4 layers without using the rejected dark-overlay trial candidate.
- [x] Recover/validate/promote `townselect/*-4`.
- [x] Re-audit Fight icon provenance; period pixels were recovered and the creative runtime art has been superseded by validated `RECONSTRUCTED_FROM_PERIOD_PIXELS` media.
- [x] Re-run full checks, commit/push restoration branch, redeploy Vercel preview, and browser-smoke the new Town build. Final certification commits: `0935796` + handoff closeout `bc611f3`; restoration preview passed Town L1→L4, Fight/Result/Boss, Hero/Recruit and mobile 390×844.
- [x] Reconstruct/validate Level-4 preview candidates from canonical full-town candidates; round-trip IoU 0.914–0.954, with only off-canvas Level-3 fallback pixels.
- [x] Backup former L4 transparent fallbacks and promote all 4 full-town + all 4 Level-4 preview reconstruction candidates to runtime.
- [x] Add SHA-256 regression manifest/verifier for all 24 Town Level 2–4 runtime recovery assets.
- [x] Run full check after Level-4 promotion — PASS (preservation + engine + provider).

## P1 — Deep fidelity pass requested 2026-09-03

- [x] Housekeeping: synchronize stale fidelity/docs claims before new research (`a0577e8`).
- [x] Build automated visual-forensics regression suite with homography/photometric/edge metrics (`2c34a40`).
- [x] Recover independent Common Crawl provenance for the Dec-10 production build and prove six missing hashed media names persist unchanged across 16-Nov → 17-Nov → 10-Dec builds.
- [x] Extract Dec-10 development/testnet ↔ production contract address pairs and fingerprint current proxy-family bytecode.
- [x] Resolve the implementation/admin lineage relevant to the preserved frontend capture. Exact EIP-1967 implementations are pinned at block 12,730,607; Market's same-day transition is exact at block 12,724,583 with successful ProxyAdmin upgrade tx proof. Broader Nov-Dec rows remain representative snapshots rather than falsely claiming a complete event log.
- [x] Recover the exact historical Character/Oracle state aligned to the frontend capture and compare it to the simulator. Runtime now uses the 17-Nov RNG/rewards/chances/HP table and capture-time Oracle prices/unlock semantics instead of the later 2026 state.
- [x] Strengthen Hero numeric-ID proof with direct Character template arrays + independent 2021-12-06 literal-name stat fingerprints. 17/21 identities are unique period-stat joins; ID9=Lena / ID10=Sivalas correction is promoted and verified; IDs4/19/20/21 retain explicit non-direct confidence labels.
- [x] Re-check exact-byte media through genuinely new production/CC lineage. The six hashed filenames persist across 16-Nov → 17-Nov → 10-Dec builds, but their exact bytes still do not survive; current period-derived runtime assets remain explicitly labeled rather than misrepresented as originals.
- [ ] Finalize this historical-state batch: rerun `npm run forensics:all` after doc/verifier sync, commit/push only curated proof/runtime files, then browser-certify visible Recruit/Town/Unlock/Boss values on the fresh Vercel preview.
