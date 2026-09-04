# BNB HEROES Revival — Continuation Task Ledger

Updated: 2026-09-04

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
- [x] Finalize this historical-state batch: `npm run forensics:all` PASS; curated runtime/proof batch committed and pushed as `31e5ad3`; fresh HTTPS preview browser certification passed Recruit (270 BNBH), Town Bank L2 (67 BNBH), direct `getUnlockLevelPrice(1)` RPC (`7494423654059697341` wei), and Zangrief (46% / 400 HP / 0.024 BNB / 400 XP). See `research/browser-regression/HISTORICAL_STATE_CERT_2026-09-04.md`.

## P1 — Final fidelity ceiling / closed 2026-09-04

- [x] Hero IDs 4/19/20/21 final public-evidence pass: recovered exact Character launch lineage and proved all four numeric templates already existed at deployment (`totalSupply=0`) and remained unchanged across four launch-week upgrades. This rejects post-deploy insertion/remap but yields no surviving literal-name bridge, so confidence intentionally remains ID4 `HIGH_COMPLETE_SET`, ID19 `HIGH_CLASS_ROSTER`, IDs20/21 `HIGH_STRUCTURAL`. See `contract-forensics/CHARACTER_LAUNCH_LINEAGE_20260904.md`.
- [x] Exact bytes for six missing hashed media (`fight`, `card`, `card_lock`, `recruit_card`, `rewards`, `You lose`) final public-source pass: exact filenames persist across 16-Nov -> 17-Nov -> 10-Dec builds; archive/search/storage paths currently available still contain no exact bytes. Keep the verified period-derived runtime reconstructions and their explicit provenance labels.
- [x] Historical Character implementation lineage through the preserved frontend capture: exact boundaries and ProxyAdmin upgrade transactions are now recovered for all four launch-week transitions (15-Nov, two on 16-Nov, 17-Nov). Target Hero template tuples are stable throughout; no behavior-changing remap affects the preserved 17-Nov runtime.
- [x] Restoration closeout rule: current branch is the highest-evidence public-source restoration. Final proof/docs checkpoint committed and pushed as `121b449`; `npm run forensics:all` PASS. Reopen archaeology only when a genuinely new artifact/source appears (e.g. surviving metadata body, `/cards/{id}.png` archive bytes, named NFT screenshot/token ID, private deployment backup). Do not invent replacements merely to make remaining confidence labels look complete.


## P0 — Exact 17-Nov gameplay behavior reopen (2026-09-04 afternoon)

- [x] Reopen former fidelity ceiling after exact-block contract checks exposed later-source contamination.
- [x] Verify Fight formula against exact 17-Nov state; retain verified chance/XP/BNB/HP math.
- [x] Correct delayed Town semantics + v3 save migration.
- [x] Correct Reserve cap 20 -> **10** and frozen bag HP semantics.
- [x] Remove later-era `stackedXp`; discard excess XP; allow Fight at XP cap.
- [x] Remove later-era XP-cap guard from Unlock; preserve XP across early unlock.
- [x] Verify stat scaling remains XP-thousand based.
- [x] Correct strict Claim boundary and verify 48h/20%/-2pp-per-day schedule.
- [x] Confirm historical Town Inn HP-regeneration bug.
- [x] Confirm 17-Nov real-Hero + countdown arrival semantics.
- [x] Engine unit tests PASS.
- [x] Local preservation-provider tests PASS.
- [x] Export exact-block **966/966** Market listings to `research/historical-world/MARKET_20211117_BLOCK12730607.json`; `taxFee=10`.
- [x] Pin 16-Nov block 12691137 / 17-Nov block 12730607 / 10-Dec block 13351244 implementation sets.
- [x] `npm run check:all` PASS for this batch. `forensics:all` reaches visual stage but current local-coder environment has no Python interpreter; no visual/media file is changed by this batch, so visual rerun remains an environment-only follow-up.
- [x] Write exact-gameplay audit + machine-readable version-lineage manifest.
- [ ] Curate/commit gameplay + proof + historical-world batch without mass-adding unrelated archaeology.
- [ ] Push restoration branch after PASS.
- [ ] Use #6179/#14480/#14185/#30998 for final literal-name bridge hunt for IDs 4/19/20/21.
- [x] Audit Market write/UI lineage: exact 17-Nov `/market` is maintenance-only; Buy/Cancel/Change Price are later-build UI and must not be backported. My Heroes `addListing` is the active target-era Market write.
- [x] Offline packaging audit: local runtime dependencies verified; Bitquery locally shimmed; add Node-only static server and smoke-test `/`, `/market`, `/prototype/`, `/gitbook/`, main JS/CSS.
