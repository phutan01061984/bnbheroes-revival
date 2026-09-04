### 2026-09-04 FINAL Production certification — restoration closeout
- Final runtime commit is `4a94061769122d26a94ee8f036768307fc2f0be2` (`Finalize clean Lose Result art`) on `restoration/native-ui-20260903`; it was pushed normally and local/remote heads matched exactly before deployment.
- `npm run forensics:all` **PASSED** on the exact final runtime: preservation verifier + engine/provider tests + all 10 visual-forensics cases.
- Clean detached-worktree Preview `https://bnbheroes-revival-ayxrt71xz-phu-tans-projects.vercel.app` (deployment `7EXAvr44FyBxWJNoLqtZv7vrdHi6`) passed all three final `read_image` browser gates: **My Heroes**, forced **Win RESULT**, and forced **Lose RESULT**. Only then was that already-tested deployment promoted.
- Production is now `https://bnbheroes-revival.vercel.app`, Vercel deployment `dpl_Ax8drGP62RaF8TuXHzyrc1LZA5gX`, immutable URL `https://bnbheroes-revival-24k8sh2uo-phu-tans-projects.vercel.app`, target `production`, status **Ready**. Promotion reused the tested deployment rather than rebuilding a different source state.
- Production byte check: `/static/media/You%20lose.00f95b2b.png` returned HTTP 200, 187246 bytes, SHA-256 **`0e2369ac0879584ff11584fe49a682736e60a416206b8d9197a491aeec096d9f`**, exactly matching the Preview-tested final art.
- Production browser smoke repeated the same three gates and all **PASSED**. My Heroes has the plain Recruit card back + Town-Inn padlocks; Win has one clean `ENEMY DEFEATED`/BNB/XP/HP set; Lose has continuous Mage/staff + soft glow with **no rectangular crop/alpha band** and clean separator/reward rows.
- Production QA save integrity: exact `bnbheroes-revival-v2` localStorage was backed up before mutation, restored after Win and again after Lose, final string equality returned `true`, and temporary session backup keys were removed. No intentional QA mutation remains in the user's Production save.
- Durable final report/evidence: `research/browser-regression/PRODUCTION_CERT_2026-09-04.md` plus compressed `evidence/2026-09-04-production-final-{myheroes,win,lose}.jpg`.
- **Closeout rule:** this recovery is finished at the current highest-evidence public-source ceiling. Do not rerun rejected Lose candidates, broad archive sweeps, or speculative remapping merely to make provenance labels look complete. Reopen only for a genuinely stronger historical artifact/source. Real wallet signing/raw mainnet transactions remain disabled.

### 2026-09-04 POST-RESTORATION Phase 2 — economy audit / visual sidecar
- The certified restoration has been frozen as annotated Git tag **`preservation-v1.0.0`** pointing to closeout commit `2ffd3ccb8374b2a887f1c90fab74aa8a6dfe6014`. Treat this tag as the immutable preservation-v1 baseline; post-restoration analysis must not rewrite it.
- New economy work is a **sidecar**, not a gameplay rewrite. `docs/ECONOMY_AUDIT_20211117.md` documents the restored money loop; `scripts/economy-model.mjs` deterministically computes all 21 Hero × 7 enemy combinations; `research/economy/MODEL_20211117.json` + `HERO_ENEMY_MATRIX_20211117.csv` hold machine-readable output; `/economy/` is the mobile-friendly interactive visual dashboard.
- A reproducible archive-RPC proof script `research/economy/snapshot-economy-state.mjs` generated `CHAIN_ECONOMY_STATE_20211117.json` directly at block **12,730,607**. Exact target-block economics include: BNBHPool **3270.931735792176651269 BNB**, 35,451 Hero NFTs, Core `dividePercent=70`, 48h first claim lock, Token `_BNBFee=11%`, `_liquidityFee=1%`, Token→Pool and Pool→Core address links exact.
- Same-block Oracle: Recruit **270.231622 BNBH = 0.300 BNB-equivalent**, Expedite **27.023162 BNBH = 0.030 BNB-equivalent**, all four Town buildings L1→L4 total **855.733469 BNBH = 0.950 BNB-equivalent**. Exact recruit rarity distribution is 42% Common / 30% Uncommon / 16% Rare / 9% Epic / 3% Legendary.
- Model insight (explicit stress-test, not historical realized ROI): recruit-weighted average Hero farming Zangrief at base Town produces ~**0.045077 BNB/day gross** under the exact restored HP/reward formulas, so the same-block 0.300-BNB-equivalent Recruit cost is ~**6.66 days gross simple mechanical payback**. At 10% of the 35,451 minted Heroes continuously active on Boss and **zero pool inflow**, theoretical gross liability is ~159.8 BNB/day and pool runway ~20.5d; at 100% it is ~1598 BNB/day / ~2.05d. These are capacity stress tests only because real token/game activity refills the pool.
- Funding architecture evidence is deliberately two-tiered: exact 17-Nov state proves fees/split/address links/pool balance; recovered late-Nov Solidity mirror corroborates the internal loop `game BNBH spend + trading fees -> token contract -> Pancake swap BNBH to BNB + liquidity -> BNBHPool -> claimRewards`. Do not describe every mirror-internal threshold as exact 17-Nov bytecode; `numTokensToSend()` specifically reverts on the exact 17-Nov Core.
- `npm run economy:test` regression-locks the main economics/model outputs. The economy sidecar contains no wallet/signing path and does not modify the restored 2021 React runtime.
- Deployment/browser certification for `/economy/` is the immediate continuation after this checkpoint; certify it on a clean Preview before adding it to the Production alias.

### 2026-09-04 clean19 Lose finalization — newest safety checkpoint
- Commit `1132eb0` / clean Preview `https://bnbheroes-revival-9uetl1d5o-phu-tans-projects.vercel.app` passed My Heroes and Win but its real forced-Lose screenshot was still rejected: hash `9f54476dc22af25fa45faccf82c510f699f6e3517222152562a402275ff0e107` retained a broad rectangular glow/alpha field. Rejected bytes are preserved at `archive/pre-result-browser-alpha-fix-20260904/You lose.00f95b2b.png`.
- Final selected bytes are now hash `0e2369ac0879584ff11584fe49a682736e60a416206b8d9197a491aeec096d9f`. Entire Mage+staff RGB comes from the first-party `Level 2 Skull Enemies.jpg`, warped with a SIFT/RANSAC partial-affine fit (21/34 inliers, scale ~0.8663) into the established Result geometry; warped silhouette agrees with the already-validated lower support at IoU ~0.9385. Row-wise sheet-background subtraction + vertical-continuity filtering removes the sheet's horizontal rule before warp. RGB is robustly color-fit from trusted visible 2021 Result Mage pixels. Glow is a smooth elliptical Gaussian field, not captured modal pixels; no upper/lower crop join remains.
- Before formal commit, those exact bytes were deployed to temporary HTTPS Preview `https://bnbheroes-revival-hx2arik4p-phu-tans-projects.vercel.app`. Deterministic forced Lose (`Math.random=()=>0` for the engine's `seed+chance>1000` rule) produced `research/browser-regression/2026-09-04-preview-clean19-result-lose.png`; `read_image` **PASSED** with no rectangular crop/alpha artifact. Compact proof comparison is refreshed at `research/proofs/result-art-cleanup-20260904/evidence/lose-runtime-vs-period.jpg`.
- This checkpoint is **completed/superseded** by the FINAL Production certification above: full forensics passed, commit `4a94061` was clean-preview tested, promoted, and Production-smoked successfully.

### 2026-09-04 HTTPS Lose-art crop/alpha correction — previous checkpoint
- Preview commit `7c7789e` (`https://bnbheroes-revival-bl3mfp13k-phu-tans-projects.vercel.app`) passed `read_image` on My Heroes and Win RESULT. A real forced-loss QA then rejected Lose hash `1ef7f8406e38bb1643e9df5c366fa672b18638c9a5082566405a2627be01324c`: a residual baked modal/crop band remained above the true DOM reward separator. QA localStorage was backed up and restored exactly after the test.
- CDP geometry on that real modal measured the Lose art at CSS `(650,239,500,500)` and the reward-separator image at `(684.45,578.37,431.11,20)`, placing the actual separator near source y~347. Therefore the old y~300 join could not legitimately rely on DOM occlusion. Rejected `1ef7f840...` bytes are archived at `archive/pre-result-browser-crop-fix-20260904/You lose.00f95b2b.png`.
- Candidate hash at that checkpoint was `9f54476dc22af25fa45faccf82c510f699f6e3517222152562a402275ff0e107`; the later real-browser rejection and clean19 replacement above supersede it.

### 2026-09-04 read_image Lose-art finalization — previous checkpoint
- Browser QA on clean Preview commit `40fadde` confirmed My Heroes card semantics and Win RESULT, but `read_image` rejected Lose hash `084806d7df4f1b51094d8de5babd9f3afca7760250e799554a2af5cdff3a3a02`: broad blue/gray source-sheet contamination remained inside the Mage silhouette. Screenshot: `research/browser-regression/2026-09-04-preview-40fadde-result-lose-final.png`. The rejected bytes are preserved at `archive/pre-result-sheet-artifact-fix-20260904/You lose.00f95b2b.png`.
- Final local Lose candidate is now runtime hash `1ef7f8406e38bb1643e9df5c366fa672b18638c9a5082566405a2627be01324c`. Method: visible upper Mage + orange glow come directly from the aligned period Result frame, with support derived by differencing against the exact recovered modal background; this layer stops above the separately-rendered reward separator. Only the lower Mage hidden by surviving reward-row DOM is taken from the first-party GitBook Level-2 Skull Mage, extracted below the separator where its source-sheet background is flat and color-fit from visible overlap. This removes both the earlier rectangular seam and the sheet-background contamination without generative artwork.
- Exact-modal simulation: `research/read-image-audit-20260904/result-clean-candidates/final/lose-clean7-on-modal.png`; compact comparison committed through `research/proofs/result-art-cleanup-20260904/evidence/lose-runtime-vs-period.jpg`. Provenance remains `RECONSTRUCTED_FROM_PERIOD_PIXELS`, never `ORIGINAL_BYTES`.
- Preservation verifier already PASSes the new runtime hash, both browser-rejected Lose archives, RESULT compact evidence, geometry and first-party identity thresholds. Immediate continuation from this checkpoint: run full `npm run forensics:all` -> curated commit/push only correction/proof/HANDOFF/archive (never mass-add the bulk untracked archaeology) -> clean Vercel Preview -> browser/read_image My Heroes + Win + Lose -> if all PASS promote that exact tested deployment to `bnbheroes-revival.vercel.app` -> write final production certification into HANDOFF/task ledger and push a docs-only closeout.

### 2026-09-04 read_image final-media correction — live safety checkpoint
- Repo-local Git identity is now fixed for future automation: `Phu Tan <176453793+phutan01061984@users.noreply.github.com>`. The former `revival@local` identity caused Vercel to block CLI/Git deployments. Content-equivalent correction commit `902fbe8` was metadata-only amended to `f8f0e62`; both commits have identical tree `ed0b7447d6148956779a89de9755b65e25d4ca18`. Remote `restoration/native-ui-20260903` is at `f8f0e620a628d924e629cf7cef21eb31cdf2be65`.
- Vercel CLI is authenticated to `phu-tans-projects`; clean commit `f8f0e62` deployed successfully as Preview `https://bnbheroes-revival-2xxmmgkqu-phu-tans-projects.vercel.app` (deployment `CoXtoD97JkS1bgjWmvVioe4Zrbtf`, Ready in ~10 s). Do not promote this exact preview to Production: browser vision found one remaining Lose-art seam described below.
- `read_image` + recovered 17-Nov bundle + official 2021 footage corrected the My Heroes card-state semantic error. Preview browser QA PASSED: recruitable slot shows the plain BNB HEROES card back; Town-Inn-locked slots show padlocks. Pending-arrival asset is the yellow question-mark `cards/unkown.png`. Compact proof is committed under `research/proofs/card-state-semantic-20260904/`.
- Win RESULT cleanup PASSED on the `f8f0e62` Preview. Browser screenshot `research/browser-regression/2026-09-04-preview-f8f0e62-result-win.png` shows a single DOM `ENEMY DEFEATED`/BNB/XP/HP set with period chest/glow underneath; the former duplicated screenshot text is gone.
- First Lose cleanup removed duplicated DOM content but was REJECTED by `read_image`: Preview screenshot `research/browser-regression/2026-09-04-preview-f8f0e62-result-lose.png` exposes a rectangular orange-glow/alpha boundary across the Mage waist. Therefore current committed Lose hash `14074d...` is not final and must not be promoted to Production.
- A cleaner Lose candidate is now selected locally at `research/read-image-audit-20260904/result-clean-candidates/final/lose-clean6-tests/lose-cross-a72.png`. Method: retain upper Mage from period-derived pixels only inside independently mapped Mage support; patch hidden lower Mage from the first-party GitBook Level-2 Skull Mage with the already-proven affine color fit; crossfade upper->lower across y~265..340; reconstruct only the orange glow as a smooth field from trusted period pixels above the DOM separator. Exact modal-background + exact reward-separator simulation `research/read-image-audit-20260904/result-clean-candidates/final/lose-clean6-a72-on-modal.png` has no rectangular seam/band and visually tracks the period Lose frame. Provenance remains `RECONSTRUCTED_FROM_PERIOD_PIXELS`, never `ORIGINAL_BYTES`.
- Immediate continuation: promote only this selected Lose candidate -> recompute SHA -> update Result proof/PROVENANCE/verifier + task ledger -> `npm run forensics:all` -> curated normal commit/push (no mass-add) -> new Vercel Preview -> browser/read_image My Heroes + Win + Lose -> only if all PASS promote the exact tested deployment to `bnbheroes-revival.vercel.app` -> final HANDOFF/browser-certification commit. Bulk archaeology remains untracked; never `git add .`, clean/reset/stash it.

# BNB HEROES Revival / Preservation — AI IDE Handoff

> **READ THIS FILE FIRST. DO NOT REDO THE FORENSIC RESEARCH FROM ZERO.**
>
> This repository contains a preservation-grade recovery of the original 2021 BNB HEROES web client plus a safe playable reconstruction and restored GitBook. The original project's real-money/wallet layer is intentionally disabled.

Last handoff update: **2026-09-04 20:14 ICT**
Working directory used during recovery: `/workspace/bnbheroes-revival`

---

## LIVE RECOVERY CHECKPOINT — 2026-09-04 15:05 ICT (SAVE THIS FIRST)

The previous "fidelity ceiling" was deliberately reopened because direct historical `eth_call`/state checks against the **exact 17-Nov-2021 implementation** exposed gameplay differences from the later 27-Nov Solidity mirror. **Do not revert these findings to the later source behavior.**

### Current working-tree batch — NOT YET COMMITTED at this checkpoint

Intentionally modified: `prototype/src/engine.js`, `preservation-provider.js`, `tests/engine.test.mjs`, `tests/provider.test.mjs`.

Validation after these edits: `npm run check:all` PASS (syntax + preservation + engine + provider). `npm run forensics:all` reaches the visual stage but this local-coder runtime currently has no Python interpreter, so `visual:forensics` cannot launch here. This batch changes no visual/media assets; record this as an environment limitation, not a visual PASS.

### Exact 17-Nov gameplay corrections already implemented locally

- Town upgrades: raw level increments immediately, but effective `getTownLevel`/bonuses/Inn capacity wait for the historical timer. Engine save model is now v3 with `townUpgradeEnds[4]`; v2 Town levels migrate as completed.
- Reserve cap is exactly **10**, not 20.
- Reserve freezes stamina/HP. Direct historical anchors: Hero #6640 bag HP 41; Hero #12208 bag HP 29. ABI nuance: `getHeroesInBag()` exposes paused HP while direct Character `getHero()` can still show underlying timestamp-derived HP while Core owns the NFT.
- Exact 17-Nov has **no stackedXp mechanic**; excess XP is discarded. Near-cap direct examples report +59/+39/+29 only. Fight remains possible at cap and can still award BNB with +0 XP.
- Unlock Level has **no XP-cap guard** in exact 17-Nov. Hero #90 unlocked L2 at XP1850; Hero #140 unlocked L3 at XP2100. XP remains unchanged across unlock. Full-XP + stacked-XP behavior belongs to later source.
- A/D/S scaling remains based on XP-thousands, not explicit unlocked level.
- Claim is strict `block.timestamp > unLockTime`; 48h first lock; 20% tax then -2 percentage points/day for 10 days.
- Town Inn HP bonus is historically broken in this snapshot: upgraded Inn still resolves at 86 sec/HP.
- Fight core chance/XP/BNB/HP formulas were directly cross-checked on exact historical Hero state and retained.
- Recruit arrival is 12h and 17-Nov returns the real Hero fields plus countdown; later fake/mystery-Hero arrival behavior is not authoritative here.

### New historical-world evidence

Full exact-block Market state is exported to `research/historical-world/MARKET_20211117_BLOCK12730607.json`:

- block **12,730,607**, 2021-11-17T19:08:02Z
- **966 / 966** active listings
- historical Market `taxFee = 10`
- literal-ID hunt anchors: ID4 token #6179; ID19 token #14480 (6300 BNBH); ID20 token #14185 (2800 BNBH; also #28100/#34814); ID21 token #30998 (6000 BNBH)

### Version boundaries pinned

| Build/snapshot | block | block time | Core impl | Character impl | Market impl | Oracle impl |
|---|---:|---|---|---|---|---|
| 16-Nov frontend | 12691137 | 2021-11-16 07:39:22Z | 0x986a1820498a636939a0b80eb8d12014e5d70b58 | 0xec411735c2bcb9224eded102cd39a47063308658 | 0x70cdcd313fc730049f8b351c6cd4d1533318d38a | 0xbd002cfa9a942c7f3a5771056d2f1482621ce07f |
| **17-Nov target** | **12730607** | **2021-11-17 19:08:02Z** | **0x986a1820498a636939a0b80eb8d12014e5d70b58** | **0x36bd26648ce81c1675dfa3bc640607a3ef0852f9** | **0xade9b8d6bf3c220e7d8c9b3ed7caccd4584473f1** | **0xbd002cfa9a942c7f3a5771056d2f1482621ce07f** |
| 10-Dec build | 13351244 | 2021-12-10 10:54:17Z | 0x8e701c08d88dd50623ef829bf4f68780f87cb524 | 0x3d833ffb8a19dda5e44fc34d5ab666fa24c6e9e6 | 0x3c72e11bd64bf0e2c0344b92a243bb9ca7e229aa | 0x247e23bace48bba978466675e663afaad082cb69 |

The honeyvig/hardhat mirror begins around 27-Nov and is reference/decoder material only. It compiles with Solidity 0.8.2 + OZ 4.3.3 + optimizer 200, but exact 17-Nov bytecode/state wins whenever behavior differs.

### Follow-up checkpoint — Market/UI + offline package (2026-09-04 15:16 ICT)

- Exact 17-Nov Market UI lineage is now closed: `/market` intentionally renders **"Sorry. We are in maintenance mode for a while."**. The ABI contains purchase/cancel/change selectors, but those active UI controls only appear in a later recovered build. Do not backport them into the 17-Nov target. Evidence: `research/contract-forensics/MARKET_UI_LINEAGE_20211117_20211210.md`.
- The 17-Nov My Heroes Sell flow remains active and calls `addListing`; the provider already supports the only target-era Market write the visible UI needs.
- Offline runtime audit is recorded in `research/OFFLINE_RUNTIME_AUDIT_20260904.md`. Runtime JS/CSS/vendor files are local; Battle Logs Bitquery is locally emulated; provider has no RPC endpoint.
- `npm start` now uses `node scripts/serve.mjs` (no Python dependency). Smoke test: `/`, `/market`, `/prototype/`, `/gitbook/`, exact main JS and CSS all returned HTTP 200.
- `npm run check:all` PASS after adding regression assertions for Market-maintenance/version boundary and offline runtime.
- Previous gameplay checkpoint is local commit **cea67cb**. GitHub push is still blocked in this shell by missing credentials and CDP bridge is unavailable; keep committing locally and update HANDOFF.

### Final Hero literal-bridge closeout — 2026-09-04 15:25 ICT

- Exact Market token anchors were used: ID4 #6179, ID19 #14480, ID20 #14185, ID21 #30998. Exact 17-Nov `tokenURI()` values point to first-party `metadata.bnbheroes.io/token/<id>.json`.
- Live metadata is dead; prior host-wide `.json` archive hunt plus fresh token-specific Wayback/Common-Crawl/web/code searches yielded no metadata body or literal token/name bridge. A final archive batch hit upstream 502; do not repeat saturated archive scans without a genuinely new source.
- Final mapping confidence therefore stays honest: ID4 `HIGH_COMPLETE_SET`, ID19 `HIGH_CLASS_ROSTER`, ID20/21 `HIGH_STRUCTURAL`. Runtime mapping is unchanged.
- Closeout proof: `research/hero-id-mapping/FINAL_LITERAL_BRIDGE_HUNT_20260904.md`.
- At this point the only unchecked continuation item is remote push. Local checkpoints are `cea67cb` (exact gameplay), `a4e5888` (Market/offline), and the current closeout HEAD (final literal bridge hunt + latest HANDOFF; do not hard-code its self-changing amend hash inside this file). Tracked working tree is clean. Shell GitHub auth and browser CDP are unavailable. Vercel has only `.vercel/anonymous.json` claim data, not an authenticated CLI user; no remote deploy was claimed as complete.

### Python restored + full forensic certification — 2026-09-04

- Local-coder container is Alpine 3.23 and Python had actually been removed. Reinstalled system packages: Python 3.12.14, NumPy 2.3.5, OpenCV 4.12.0.
- `npm run forensics:all` now completes successfully end-to-end: preservation verification PASS, engine/provider tests PASS, and `visual:forensics` overall PASS.
- Visual gate passed Town all-L4 vs period frame, all eight Townselect L2/L3 period-preview comparisons, and Fight period recomposition. This closes the previous environment-only visual-certification gap.
- Browser Host Bridge confirms the user is already authenticated to both GitHub and Vercel in the host Chrome profile. Next action is browser-assisted GitHub auth/push, then Vercel redeploy and HTTPS regression on the exact new branch head.

### Final remote + Vercel HTTPS certification — 2026-09-04

- GitHub remote branch is now synchronized: `origin/restoration/native-ui-20260903` = `955b673e46aa2a75bb619b235279f20cd44ad1f4` at certification time. `gh auth status` confirms account `phutan01061984`; local/remote were ahead=0, behind=0 before this report-only checkpoint.
- Vercel auto-deployed that branch commit as deployment `Fe43MPNxGZPq5wJeELUEomUvDhaZ`, status **Ready**, Preview, source `restoration/native-ui-20260903 @ 955b673`.
- Certified branch alias: `https://bnbheroes-revival-git-restoration-nati-89e999-phu-tans-projects.vercel.app/`. Immutable deployment domain: `https://bnbheroes-revival-62io5ev3a-phu-tans-projects.vercel.app/`.
- HTTPS browser smoke PASS: `/`, `/market`, `/myheroes`, `/fight/0`, `/battlelogs`, `/myreserve`, `/gitbook/`, `/prototype/`. Preview `/prototype/src/engine.js` contains the v3 restore path / exact-17-Nov corrections.
- `research/browser-regression/REPORT_2026-09-04_FINAL.md` records the checks; evidence JPEG is `research/browser-regression/evidence/2026-09-04-final-home-955b673.jpg`.
- Production `bnbheroes-revival.vercel.app` still pointed to old `main` at certification time. Only call production updated if a later Vercel promotion is explicitly completed and rechecked.

### Production promotion complete — 2026-09-04

- Vercel Preview `GJqBG8ddVAwJ2PW6sTHXKW258UyN` (source `49ab900`, branch `restoration/native-ui-20260903`) was promoted through the authenticated Vercel dashboard.
- Vercel created Production deployment `GQkhbNneDHk7ikCCKzGG6X5uzJhj`, status **Ready**, environment **Production**, source `restoration/native-ui-20260903 @ 49ab900`.
- Production alias is now **https://bnbheroes-revival.vercel.app/** and no `main` merge/force-push was performed.
- Production HTTPS smoke PASS: home renders the 2021 preservation UI/local wallet; `/prototype/src/engine.js` contains v3 + exact-17-Nov markers; `/market` renders the target-era maintenance message.
- The next Git commit after this note is documentation/HANDOFF only; production runtime remains the certified `49ab900` bytes unless explicitly promoted again.

### LIVE checkpoint — read_image card-state semantic correction discovered (2026-09-04)

- `read_image` audit found a real fidelity bug in the currently promoted card-slot reconstructions. Production `/myheroes` shows the Recruitable empty slot with a padlock, while Town-Inn-locked slots show yellow question marks.
- Exact 17-Nov bundle module mapping: module 175 `card.df50fb38.png` is rendered when `unlock=true` (Recruit slot); module 174 `card_lock.c211f00f.png` is rendered when `unlock=false` (Upgrade Town Inn slot). Pending-arrival Heroes are separately rendered as `./cards/unkown.png`.
- Official 2021 video `WZwbq7Va0gg` resolves the visuals: open Recruit slot = plain BNB HEROES card back; locked Town Inn slot = padlock; pending-arrival/EXPEDITE Hero = yellow question-mark card. Timeline observations: ~20s open+locks, ~45–50s first pending question mark, ~55–60s expedited Hero reveal, ~80–90s second pending question mark.
- Raw median clusters already preserved map as: cluster00 n=210 = padlock; cluster01 n=51 = question mark; cluster02 n=45 = plain BNB HEROES card back. The old `CARD_SLOT_RECOVERY_PROOF.md` mislabeled cluster00 as open and cluster01 as locked.
- Near-launch Zhihu/reviewer screenshot independently shows real Heroes followed by Town-Inn Upgrade slots using padlocks, corroborating `card_lock = padlock` beyond the Oct prototype video.
- Planned protected correction: backup current three paths; reuse existing period-derived padlock reconstruction for `card_lock`, existing question-mark reconstruction for `cards/unkown.png`, reconstruct `card` from cluster02 with the same trim/Lanczos pipeline; update proof/provenance/verifier; run `npm run forensics:all`; commit/push; browser/read_image certify preview before any production promotion.
- Do NOT call any of these byte-identical original. This is a semantic correction among verified period-pixel reconstructions.

### Immediate continuation if this session disappears

1. Do **not** reset/discard the exact-gameplay batch.
2. `npm run check:all` is already PASS. Visual suite is blocked only by missing Python in the current local-coder runtime and no visual assets changed.
3. Exact gameplay audit and version-lineage manifest are already written.
4. Commit only the curated gameplay/audit/world-state batch; never mass-add the huge unrelated untracked archaeology tree.
5. Push branch `restoration/native-ui-20260903`.
6. Then hunt literal-name evidence using #6179/#14480/#14185/#30998; audit Market writes and offline packaging.

---

## 1. What this project is now

There are three useful surfaces:

1. **`/` — Original 17 Nov 2021 frontend preservation**
   - Recovered HTML/CSS/React bundle from `play.bnbheroes.io`.
   - Uses the original 2021 component tree, routes, class names, layout, CSS, fonts and surviving assets.
   - The original 2021 auto-connect/Connect lifecycle is restored, but it resolves only to the local preservation EIP-1193 provider.
   - Real signing/raw transactions and live BSC/Infura RPC paths are blocked; gameplay writes are simulated locally through the recovered ABI/UI flow.
   - Recovered/reconstructed historical media carry explicit provenance labels; do not mislabel period-derived reconstruction as byte-identical original.

2. **`/prototype/` — Safe playable revival**
   - LocalStorage simulation.
   - No wallet signing or real funds.
   - Reimplements recovered recruitment, combat, town, XP, reserve and BNB claim rules.
   - Existing tests: `tests/engine.test.mjs`.

3. **`/gitbook/` — Restored GitBook**
   - Preservation reconstruction of the old documentation.
   - Marks on-chain confirmed / 2021 documented / reconstructed claims.

The former custom revival landing page is preserved as `revival-landing.html` after promotion of the original game UI to `/`.

---

## 2. First commands for any new AI / IDE

```bash
cd /workspace/bnbheroes-revival
npm run check:all
python3 -m http.server 8080 --directory .
```

Then open:

- `http://localhost:8080/`
- `http://localhost:8080/prototype/`
- `http://localhost:8080/gitbook/`

For the original SPA, direct-route refreshes require Vercel rewrites (defined in `vercel.json`) or a history-fallback server.

Before editing the recovered original client, compare against:

```bash
cd archive/original-20211117
sha256sum -c SHA256SUMS
```

**Never modify `archive/original-20211117/`.** It is the clean evidence baseline.

---

## 3. Automated preservation verifier

Run:

```bash
npm run verify:preservation
```

It checks:

- core recovered HTML/JS/CSS/assets exist;
- production bundle auto-connects only to the local preservation provider;
- real signing/raw transaction methods remain blocked and no live BSC/Infura RPC endpoint is active;
- every `static/media/*` file referenced by recovered JS/CSS exists;
- clean original archive still contains original 2021 auto-connect code (evidence only);
- playable revival and GitBook still exist.

Full regression command:

```bash
npm run check:all
```

This runs existing syntax checks, preservation verification and engine tests.

---

## 4. Clean original frontend baseline

Clean archive:

`archive/original-20211117/`

Recovered capture set:

- root HTML: archive capture around **2021-11-17 19:08:01 UTC**
- vendor JS: `static/js/2.04f79657.chunk.js`, around **2021-11-17 19:12:38 UTC**
- main JS: `static/js/main.5e2ca500.chunk.js`, around **2021-11-17 19:12:48 UTC**
- vendor CSS: `static/css/2.f4c56af9.chunk.css`
- main CSS: `static/css/main.433e3d53.chunk.css`, archived around **2021-11-16 07:41:33 UTC**

Baseline hashes are in:

`archive/original-20211117/SHA256SUMS`

Important known hashes:

- original `main.5e2ca500.chunk.js`: `c5e5b850aaa7cc49b769f09bd95161029d0874dd3f8553a8f399975a8cbfc4bb`
- original `main.433e3d53.chunk.css`: `ced75e42b93a67a7099c1db14fe42409de01a241ef94e753915e351fc494bb3f`

A later December build was also recovered under raw forensic working files at:

`research/play_forensics/recovered/original-build/`

That later build added API calls such as `https://bnbheroes.io/api/fight.php` and market behavior. Use it for behavioral comparison, **not** as the default visual baseline unless deliberately changing the preservation date.

---

## 5. Production safety patches vs original bundle

Production root uses a copy of the Nov-17 bundle at:

`static/js/main.5e2ca500.chunk.js`

Two intentional wallet changes were made to the minified bundle:

1. original auto-connect call:

```js
se().then((function(){}))
```

was replaced with a resolved no-op.

2. the routed `connect: se` handler was replaced with an alert saying wallet connection is disabled in preservation mode.

`preservation-shim.js` additionally:

- exposes `window.__BNBH_PRESERVATION__`;
- redirects the dead original GitBook link to `/gitbook/`;
- intercepts Home **Upgrade** and **Fight** actions that would otherwise require the old contract transaction layer;
- shows a small preservation badge linking to the safe playable revival and restored GitBook.

### Non-negotiable safety rule

Do **not** restore real wallet signing, seed/private-key handling, or mainnet transaction sending in this preservation build.

If a real-money relaunch is ever desired, build a **new audited economic/smart-contract layer** after a security review. Do not simply re-enable the historical contracts.

---

## 6. Original 2021 routes recovered from the React client

The Nov-17 bundle contains these routes:

- `/`
- `/myheroes`
- `/market`
- `/fight/:id`
- `/battlelogs`
- `/myreserve`

`vercel.json` rewrites these direct routes back to `index.html` so BrowserRouter works after refresh.

Original public asset path patterns used by the client include:

- `/backgrounds/myheroes-bg.jpg`
- `/backgrounds/market.jpg`
- `/backgrounds/village.jpg`
- `/backgrounds/battlelog-bg.jpg`
- `/towns/background.jpg`
- `/towns/objects.png`
- `/towns/{1..4}-{level}.png`
- `/townselect/{town}-{level}.png`
- `/cards/{heroNameId}.png`
- `/cards/unkown.png` (original spelling in source)
- `/enemies/{1..8}.png`

---

## 7. Historical UI assets: what is original and what is fallback

### Recovered original/surviving assets used in production

Examples:

- `backgrounds/village.jpg`
- `backgrounds/market.jpg`
- `backgrounds/myheroes-bg.jpg`
- `backgrounds/battlelog-bg.jpg`
- `towns/background.jpg` — 1920×1080
- `towns/objects.png` — 1920×1080
- `towns/1-1.png` — 1920×1080
- `towns/2-1.png` — 1920×1080
- `towns/4-1.png` — 1920×1080
- `static/media/Recruit.67f5fa05.png`
- `static/media/heroes.7105c3d9.png`
- `static/media/myreserve.31e6d624.png`
- `static/media/upgrade.032dc018.png`
- `static/media/Market.bf10d207.png`
- `static/media/battlelog.d20da706.png`
- `static/media/git book.8ce64c07.png`
- `static/media/GODOFWAR.edd836b7.TTF`
- `static/media/Hexa.f5c4a64d.png`
- `static/media/Ribbon.74c61692.png`
- BNB / BNBH HUD assets and info panels.

The hashed backgrounds that Wayback returned as failed/error payloads are replaced with the surviving public-path backgrounds of the same purpose:

- `static/media/Village.64091b0b.jpg` ← `backgrounds/village.jpg`
- `static/media/myheroes-bg.3c5effac.jpg` ← `backgrounds/myheroes-bg.jpg`

### Recovered/reconstructed assets whose original hashed bytes did not survive

The current runtime no longer uses the early neutral placeholders for Barracks, enemies, Hero cards, or RESULT art. Provenance is explicit:

- `static/media/fight.42bbd04e.png`
  - **RECONSTRUCTED_FROM_PERIOD_PIXELS** from 7-Nov-2021 Home footage; supervised leave-one-icon-out alpha validation mean IoU 0.9557 / min 0.9416, with period-frame recomposition mean MAE ~1.19. Direct hashed bytes remain unavailable; do not call it byte-identical original.
- `towns/3-1.png`
  - **PERIOD_RECONSTRUCTION** from first-party `Level-1.png` explicitly labeled `Level 1 Barracks`, positioned into the 1920×1080 town coordinate system via period screenshot homography.
- `static/media/card.df50fb38.png` / `card_lock.c211f00f.png`
  - **RECONSTRUCTED_FROM_PERIOD_PIXELS** by median stacking repeated card appearances in the official 2021 minting video.
- `static/media/recruit_card.aa5e12c7.png`
  - **FIRST_PARTY_PERIOD_ART_ADAPTED** from archived `BNBH-Card-Back.png`, independently matched to official video (195 RANSAC inliers).
- `static/media/rewards.16b2db64.png` / `You lose.00f95b2b.png`
  - **RECONSTRUCTED_FROM_PERIOD_PIXELS** from corresponding 2021 win/loss footage while preserving dynamic RESULT text as DOM.
- `/enemies/1.png` … `/enemies/6.png`
  - evidence-backed derivatives from first-party GitBook Level-1/Level-2 sheets; type mapping is documented in the enemy proof reports.
- `/enemies/7.png`
  - **PERIOD_RECONSTRUCTION** of Zangrief from 17-Nov production video plus higher-resolution 8-Dec period screenshot.
- `/cards/1.png` … `/cards/21.png`
  - **EXACT PERIOD ART BYTES** copied byte-for-byte from `archive/hero-art-20211118/` according to `research/hero-id-mapping/heroNameId-final.tsv`; IDs 14/18 are direct numeric anchors and the other 19 are explicitly high-confidence structural mappings.
- `/townselect/{1..4}-{2..4}.png`
  - **PERIOD-DERIVED RECONSTRUCTIONS** validated from 2021 gameplay/Town footage and canonical geometry proofs; all 12 used preview assets are active and preservation-hash locked. Level-4 off-canvas pixels retain explicitly documented Level-3 fallback only where period footage cannot observe the source area.

### Why we do not silently fake missing art

The goal is historical fidelity. It is better to show a labeled/neutral fallback than to let an AI-generated asset become indistinguishable from surviving 2021 evidence.

---

## 8. 21 surviving Hero artworks (important)

A high-value period source was found:

`https://thisisgamethailand.com/uncategorized/bnb-heroes-play-to-earn/`

Article date: **18 Nov 2021**.

All 21 linked hero PNGs were recovered and archived at:

`archive/hero-art-20211118/`

Hashes:

`archive/hero-art-20211118/SHA256SUMS`

Source notes:

`archive/hero-art-20211118/SOURCE.md`

The recovered article art list includes:

- Aelof Orstone
- Andin Olis
- Arnulf of Esplin
- Balen Fellwood
- Dayne
- Duke Duscair IV
- Elrik the Imbuer
- Esfel
- Helia Stormcall
- Jan (source filename; identity needs confirmation)
- Lady Ella of Tir
- `Layer-1` (source filename; identity needs confirmation)
- Lena
- Reis of the Knife
- Sir Asten
- Sir Bertrand
- Sivalas
- Thalas One-Eye
- Torlov
- Uriah the Sage
- Xegis Branfyre

### Numeric Hero mapping — completed with confidence labels

The article order is alphabetical/editorial and was **not** used directly as `/cards/1.png ... /cards/21.png` order.

Final runtime mapping is documented in:

- `research/hero-id-mapping/PROOF.md`
- `research/hero-id-mapping/heroNameId-final.tsv`

Confidence policy:

- IDs **14 = Arnulf of Esplin** and **18 = Elrik the Imbuer** are `DIRECT_ANCHOR` mappings.
- The other 18 legacy-roster IDs are `HIGH_STRUCTURAL`, derived from the exact ordered 18-Hero GitBook Drop Rate roster merged with the exact 21-ID contract rarity structure.
- ID **10 = Lena** is `HIGH_STRUCTURAL_NEW_INSERT`: official period evidence says exactly three Heroes were added; after direct inserted anchors 14/18, Lena is the only period artwork/name outside the old 18-Hero roster and ID10 is the only remaining inserted rarity position.

All 21 runtime card files are byte-identical to their mapped period artwork source. Preservation verification asserts this on every run.

---

## 9. Character contract snapshot already recovered

`research/chain-snapshot.json` contains a live historical-state snapshot from BSC reads.

Character state:

- name: `BNBHCharacter`
- symbol: `BHC`
- totalSupply: `309732`
- maxHeroesCount: `309732`
- max HP: `1000`
- HP recovery: 1 HP per `86` seconds
- base active character limit: `2`
- hero arrival time: `43200` seconds = 12 hours
- 21 templates

Arrays:

```text
heroTypes   = [1,2,1,2,1,2,1,2,1,1,2,3,3,3,3,4,4,4,5,5,5]
heroNames   = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
heroClasses = [1,1,1,1,1,2,3,3,2,2,2,4,5,1,2,4,4,3,4,5,5]
attacks     = [500,500,500,500,500,500,400,500,500,600,700,600,600,600,700,800,800,900,900,800,900]
armors      = [500,500,600,600,700,800,300,300,400,300,300,400,600,700,500,400,500,500,500,700,700]
speeds      = [500,600,400,500,300,300,800,800,600,600,600,700,500,400,500,700,600,500,700,600,500]
```

Known class mapping with strongest evidence:

- class 1 = Soldier
- class 3 = Rogue

Likely but weaker historical mapping retained in the playable reconstruction:

- class 2 ≈ Hunter
- class 4 ≈ Mage
- class 5 ≈ Knight

Rarity types:

1. Common
2. Uncommon
3. Rare
4. Epic
5. Legendary

The recovered early recruit random table is in `research/chain-snapshot.json`; the first 100 slots were approximately:

- Common 51
- Uncommon 28
- Rare 15
- Epic 6
- Legendary 0

This illustrates version drift versus some early public probability tables. Do not assert one probability table as timeless across all 2021 builds.

---

## 10. Original enemy table — recovered directly from frontend

Do not use the older “unknown enemies 0–4” assumption anymore. The later recovered frontend contains their actual display names.

| type | UI name | success | base BNB reward | XP | HP required |
|---:|---|---:|---:|---:|---:|
| 1 | Red Skull 1 | 70% | 0.00235125 | 100 | 200 |
| 2 | Red Skull 2 | 67% | 0.0028215 | 110 | 200 |
| 3 | Red Skull 3 | 63% | 0.00329175 | 120 | 200 |
| 4 | Red Skull Archer | 59% | 0.003762 | 130 | 200 |
| 5 | Red Skull Assasin | 55% | 0.00423225 | 150 | 200 |
| 6 | Red Skull Mage | 51% | 0.0047025 | 200 | 200 |
| 7 | Zangrief | 28% | 0.0172425 | 400 | 400 |
| 8 | Boss 2 placeholder | variable | 1 | 2000 | 500 |

Keep the original spelling `Assasin` when documenting exact UI text; use `[sic]` if needed in prose.

Zangrief description recovered from the client:

> Your squad spots ZANGRIEF at the stronghold gates charging towards them. Defeat Him in order to claim the stronghold once and for all!

The Solidity-derived combat model implemented in `prototype/src/engine.js` uses the recovered base chances/rewards and hero stats.

---

## 11. Stronghold / town data

Correct building index order:

0. Bank
1. Town Inn
2. Barracks
3. Training Grounds

Recovered arrays:

```text
baseTownTimes = [
  0,24,24,48,
  0,24,24,48,
  0,24,24,48,
  0,24,24,24
]

baseTownRatio = [
  0,3,6,16,
  0,5,12,27,
  0,30,60,90,
  0,30,60,140
]
```

Recovered/intended effects used by the revival:

- Bank: BNB reward bonus, +3%, +6%, +16% at levels represented by ratios.
- Town Inn: active Hero capacity; historical guide also described HP/recovery benefit. There is source/version ambiguity around the HP implementation.
- Barracks: XP bonus +30 / +60 / +90.
- Training Grounds: Attack/Armor/Speed +30 / +60 / +140.

Do not rename/reorder these buildings based on visual guesswork.

---

## 12. Oracle and economy snapshot

Historical Oracle snapshot previously recovered:

- `getCharacterPrice ≈ 6900.820431868 BNBH`
- `getExpeditePrice ≈ 690.082043 BNBH`
- `characterPriceInBNB = 0.3 BNB`
- `getTokenPrice ≈ 23002.734772893 BNBH per BNB`
- `basePriceToUnlockInBNB = 0.008 BNB`
- `unlockRate = 4`
- `isStarted = true`

Public 2021 model:

- players acquire/spend BNBH for recruitment/upgrades/unlocks/etc.;
- Oracle dynamically converts BNB-denominated targets into BNBH amounts;
- PvE/Boss rewards are denominated in BNB;
- public material said roughly 70% of in-game spending supported the BNB Rewards Pool while 30% was burned;
- live Core getter `dividePercent = 70` supports the 70-side parameter, but do not oversimplify that into an unverified mechanical statement that every BNBH spend was literally converted 70/30 into BNB cash at the same instant;
- reward claims had a 48-hour lock and a tax schedule that falls over time.

The original economic model did not create external cash flow. If BNB reward outflows exceed realized external revenue/reserve replenishment, sustainability depends on new inflows and token demand. A modern relaunch should cap rewards to realized revenue/reserve coverage rather than promise unlimited P2E yield.

---

## 13. Verified historical contract addresses

BNB Smart Chain / BSC:

- BNBH token: `0xD25631648E3Ad4863332319E8E0d6f2A8EC6f267`
- Game Core proxy: `0xde9fFb228C1789FEf3F08014498F2b16c57db855`
- Character proxy: `0x6DA72F24c56197Dcf6B8920baCb183F6ccca8b01`
- BNBHPool: `0xdE8c58d082d39D04DC2e5241a3a65911454674CD`
- Oracle: `0xD160bbDED5cFF79b126443EefCB28F3b67991140`
- Randoms: `0xB81Cd7e88feAda830E7C1095909db3F5336d8664`
- Burn address/contract used by project: `0x0f3d164083275Bd690Db61445878786b290aaE9B`

EIP-1967 implementations recovered:

- Core: `0x7e12cb515361e1fd2adac92018e70ac76019b07d`
- Character: `0x3d833ffb8a19dda5e44fc34d5ab666fa24c6e9e6`
- Oracle: `0x247e23bace48bba978466675e663afaad082cb69`

Live/historical getters previously read:

- `firstLockTime = 172800` sec = 48h
- `maxHeroCount = 20`
- `dividePercent = 70`
- `numTokensToSend = 10000000000000000000000000`

Token max supply: **100,000,000 BNBH**.

### Important false lead — do not repeat this research

Address:

`0x9051e0E33aF188e25D421e64661Fc254a6A0a425`

was investigated and is **NOT** the BNB HEROES game core. Its runtime exposed fee/liquidity BEP-20 style behavior such as Pancake router / swap-and-liquify functions. This false lead is documented in `docs/FORENSICS.md` and research files such as `research/9051_*`.

---

## 14. Recovered source/code mirrors

Useful historical mirrors in `mirrors/` include:

### `hardhat-proxy-bnbh-example`

Recovered Solidity resembling the production contracts:

- BNBHero Core
- Character / HeroLibrary
- BNBHPool interfaces
- Oracle
- Randoms
- Token
- proxy-era deployment examples

This is extremely useful for mechanics, but treat it as an historical source mirror, not automatically as the exact final mainnet source at every date.

### `130347665-BNBHeroes`

Third-party Dec-2021 Nim automation/bot with real production addresses and ABI usage.

It corroborates production calls such as fight/recruit/upgrade/expedite and Mage/Boss flow.

**Security warning:** this mirror contains old credential/private-key-style automation logic. Never expose, reuse, publish or operationalize secrets from it.

### `bnb-heroes-bot` / pathawee1993-style AutoIt bot

Contains many BMP UI fragments and two very valuable 1920×1080 full-screen captures. These were used for UI archaeology.

Useful local evidence paths include:

- `mirrors/bnb-heroes-bot/_imageAll/...`
- `research/play_forensics/confirmedTransaction1-full.png`
- `research/play_forensics/unlock-full.png`

### Unrelated repos

A repo named `mirrors/BNB-Heroes` with BCR/CD1/MVS gameplay was inspected and determined to be a different project. Do not use it as BNB HEROES 2021 evidence.

---

## 15. Official/community visual evidence already archived

Do not start by scraping X again. Existing evidence is under:

`assets/reference/x/`

including:

- `assets/reference/x/official/` — official BNB_HEROES media
- `assets/reference/x/retweets/`
- `assets/reference/x/videos/`
- `assets/reference/x/index.html`

Community captures:

`assets/reference/community/`

These include historical homepage/game screenshots from X, Imgur/PTT/Matters and other sources.

Raw forensic work under `research/play_forensics/` contains archive/Memgator/Common Crawl scans. Some files are very large (for example a decompressed Common Crawl neighborhood dump around 187 MB). **Do not commit raw bulk forensic dumps unless intentionally creating a separate research archive.**

---

## 16. Research paths that are already exhausted / low value

The following were already attempted sufficiently for current preservation work:

- Wayback exact lookup of many missing `/cards/*`, `/townselect/*`, `/enemies/*`, `fight.42bbd04e.png`, Barracks/town layers.
- Memgator multi-archive time maps.
- Common Crawl nearby record scans.
- source-map recovery for the recovered CRA builds (`*.js.map` / CSS maps were not archived).
- exact GitHub code search for missing hashed asset names.
- current `bnbheroes.io`/unrelated modern BNB Heroes sites — not authoritative for the 2021 game.

Only redo these if you have a **new archive source, new URL corpus, or a specific evidence hypothesis**.

---

## 17. Playable revival mechanics already implemented

`prototype/src/engine.js` / `prototype/src/app.js` include:

- deterministic recruitment using recovered random table;
- recruit cost via recovered Oracle snapshot;
- 12h hero arrival;
- expedite cost;
- active Hero capacity = base character limit + Town Inn level;
- HP max/recovery model;
- combat success/reward/XP/HP-loss model;
- building bonuses;
- reserve bag and capacity;
- BNB reward vault;
- 48h claim lock;
- withdrawal tax starting at 20%, reducing 2 percentage points per full day to 0%;
- XP cap overflow / `stackedXp` behavior;
- level unlock simulation;
- local Marketplace simulation;
- localStorage persistence.

The Marketplace UI is historically documented, but the original market settlement contract was not recovered with the same confidence as Core/Character. The revival market is deliberately local simulation.

Current tests cover state version, identities used by the reconstruction, capacity, recruitment, reserve, Town Inn, fight, BNB vault, XP/HP, tax schedule, claim, Marketplace, stacked XP, unlock and BNBH charge behavior.

---

## 18. Historical project failure / why wallet remains disabled

BNB HEROES later became associated with a Jan-2022 pool-drain/rug-pull event and severe token decline, reported by multiple crypto incident sources at the time.

Therefore:

- the preservation build is **museum/read-only/simulation-first**;
- do not reconnect historical proxy admins/owners/pools to user wallets;
- any future production relaunch should audit admin roles, proxy ownership, Oracle, Randoms, Pool, treasury and the historical drain path, then deploy a fresh audited stack.

---

## 19. Vercel deployment state — FINAL 2026-09-04

Vercel configuration:

- `vercel.json` contains SPA rewrites for the recovered BrowserRouter routes.
- `.vercel/output/` may contain anonymous/static output from previous work, but do not treat it as authoritative source.

Final Production is certified from the exact clean Preview that passed the final browser gates. The Vercel CLI is authenticated in this environment; **do not deploy/promote again unless runtime bytes are intentionally changed and re-certified**.

Current production URL:

- `https://bnbheroes-revival.vercel.app/`
- playable simulation: `https://bnbheroes-revival.vercel.app/prototype/`
- restored GitBook: `https://bnbheroes-revival.vercel.app/gitbook/`

Final Production provenance:

- runtime Git commit: `4a94061769122d26a94ee8f036768307fc2f0be2` (`Finalize clean Lose Result art`)
- clean tested Preview: `https://bnbheroes-revival-ayxrt71xz-phu-tans-projects.vercel.app`
- tested Preview deployment: `7EXAvr44FyBxWJNoLqtZv7vrdHi6`
- promoted Production deployment: `dpl_Ax8drGP62RaF8TuXHzyrc1LZA5gX`
- immutable Production URL: `https://bnbheroes-revival-24k8sh2uo-phu-tans-projects.vercel.app`
- Vercel target/status: **production / Ready**
- Production Lose asset: HTTP 200, 187246 bytes, SHA-256 `0e2369ac0879584ff11584fe49a682736e60a416206b8d9197a491aeec096d9f`, byte-identical to the Preview-tested final runtime asset
- Production My Heroes / forced Win / forced Lose browser + `read_image` gates: **PASS**
- final certification: `research/browser-regression/PRODUCTION_CERT_2026-09-04.md`

The older 2026-09-02 deployment provenance below is retained only as historical chronology; it is **not** the current Production authority.

Production provenance at the end of the 2026-09-02 recovery session:

- GitHub materialization workflow run: `Materialize production source #2` — **Success**
- materialized release commit: `97fcb8d734e29199978c8586a07b83738071180b` — `Materialize recovered 2021 preservation release`
- final runtime-assets fix commit: `a0069ba1b95b91efa05ea1f227b6658e18c97df7` — `Include historical assets in Vercel runtime`
- final Vercel deployment id: `dpl_8ZqRrZ17xGXNYi6QragVa4azWFSp`
- Vercel state: **READY / PROMOTED / production**

Browser regression performed against the production alias after the final deploy:

- `/` — recovered 17-Nov-2021 React client rendered; all 15 ordinary image assets loaded; preservation flag present; wallet disabled.
- `/myheroes` — direct refresh works; no broken images.
- `/market` — direct refresh works; no broken images.
- `/battlelogs` — direct refresh works; no broken images.
- `/myreserve` — direct refresh works; no broken images.
- `/prototype/` — safe simulation rendered with 23/23 image elements loading successfully after the final `assets/` Vercel fix.
- `/gitbook/` — restored GitBook rendered successfully.

Before any future runtime-changing production promotion, always run:

```bash
npm run check:all
```

Prefer deploying a clean detached-worktree Preview, certify the exact deployment, then promote that tested deployment. Do not replace this with an untested direct `--prod` deployment.

---

## 20. Remaining fidelity caveats — CLOSED unless genuinely new evidence appears

There is **no active restoration task remaining under the currently available public evidence**. The former Hero/Barracks/enemy/Fight/Result/browser/provider queues are completed and superseded by later evidence-backed recovery and Production certification.

Known non-direct provenance that must remain explicit rather than being treated as unfinished work:

1. Exact byte-identical originals for the six historically missing hashed media (`fight`, `card`, `card_lock`, `recruit_card`, `rewards`, `You lose`) were not recovered. The active period/first-party reconstructions are evidence-backed, regression-locked, and must continue to be labeled reconstructed/adapted where documented.
2. Hero IDs 4/19/20/21 still lack a surviving literal token-metadata/name bridge. Their current confidence labels are intentionally non-direct; all 21 period artworks are nevertheless mapped/promoted and the stronger 17/21 period-stat/direct evidence is preserved.
3. Some Town/enemy/Result visuals are period-derived reconstructions rather than byte-identical original files. Their proof/provenance files are the authority.
4. Real wallet signing/raw mainnet transactions remain intentionally disabled. The playable 2021 UI uses the local preservation provider/simulation and must stay safe by default.

Only reopen archaeology if a genuinely stronger artifact appears, such as surviving metadata JSON, exact old static-media bytes, a named NFT screenshot tied to a token ID, an original deployment backup, or another first-party period source that materially improves proof. Do **not** reopen broad Wayback/Common-Crawl sweeps or rejected Result-art candidates without such a lead.

---

## 21. What “finished” means for this repository

A preservation release is acceptable when:

- original recovered Nov-17 UI is the root experience;
- no wallet transaction can occur;
- all required web assets return HTTP 200;
- known missing art is clearly represented as fallback/reconstruction, not falsely called original;
- `/prototype/` remains a fully playable safe simulation;
- `/gitbook/` remains usable;
- `npm run check:all` passes;
- public deployment is browser-tested;
- this handoff remains updated with exact deployment URL and any new evidence.

It does **not** require pretending every lost PNG was recovered.

**Current status: all of the above release criteria are met by the final 2026-09-04 Production certification.**

---

## 22. Recommended prompt for the next AI IDE

Copy/paste this to the next AI:

> Read `/workspace/bnbheroes-revival/AI_IDE_HANDOFF.md` completely before changing anything. Treat the **FINAL Production certification — restoration closeout** block at the top as authoritative. Do not restart BNB HEROES archaeology, reconstruction, or deployment from zero. If the user requests a new change, first run the preservation checks, preserve `archive/original-20211117/`, keep wallet/mainnet signing disabled, and clearly distinguish recovered-original evidence from reconstruction. Reopen historical recovery only when a genuinely stronger artifact/source is available.

---

## 23. Quick file map

```text
/
├── index.html                     # production: recovered 17-Nov-2021 HTML, self-contained refs
├── preservation-shim.js           # safety + preservation navigation only
├── vercel.json                    # SPA rewrites / headers
├── static/                        # production recovered JS/CSS/media + documented fallbacks
├── backgrounds/                   # surviving original page backgrounds
├── towns/                         # L1 originals/recovered + evidence-backed period-pixel L2–L4 layers
├── townselect/                    # evidence-backed period-pixel upgrade previews for used Levels 2–4
├── cards/                         # all 21 period Hero artworks; ID mapping proof in research/hero-id-mapping/
├── enemies/                       # evidence-backed enemy 1–7 period derivatives/reconstructions
├── vendor/                        # Bootstrap 5.1.2 copied locally
├── prototype/                     # safe playable reconstruction
├── gitbook/                       # restored docs
├── archive/
│   ├── original-20211117/         # immutable recovered HTML/CSS/JS baseline + SHA256
│   └── hero-art-20211118/         # all 21 period hero PNGs + SHA256/source note
├── assets/reference/              # official/community historical screenshots/media
├── docs/FORENSICS.md              # contract/false-lead forensic notes
├── docs/WEB-ARCHAEOLOGY.md        # web recovery notes
├── research/chain-snapshot.json   # recovered on-chain state snapshot
├── research/play_forensics/       # raw web archaeology; may include huge untracked data
├── mirrors/                       # historical source/bot mirrors
├── scripts/verify-preservation.mjs
└── AI_IDE_HANDOFF.md              # THIS FILE
```

---

## 24. Rule for future edits

When adding anything historical, label it with one of these concepts in code/docs/provenance:

- **Recovered original** — byte/file/component directly recovered from 2021 source/archive.
- **On-chain confirmed** — read from historical/live contract state/source with address/method evidence.
- **2021 documented** — period article/guide/social media evidence.
- **Reconstructed** — inferred/recreated from period evidence.
- **Simulation** — new safe gameplay implementation, not claimed as original code.

This distinction is more important than making every screen look artificially “complete.”

---

# 2026-09-02 Late-session checkpoint: deep media recovery

This section is the authoritative continuation point for the next ChatGPT/AI-IDE session. Read this before re-doing any media archaeology.

## User intent at this checkpoint

User wants the 2021 BNB HEROES game revived as faithfully as possible. Priority order:
1. Recover original 2021 media/source first.
2. Only recreate/synthesize an asset after multiple original-source avenues are exhausted.
3. Keep the original 2021 React/CSS frontend as the visual baseline.
4. Keep real wallet / real-money transactions disabled for safety.
5. Continue integrating recovered media and mechanics until the old game UI is as complete/playable as possible.

## Current production / project baseline

- Working directory: `/workspace/bnbheroes-revival`
- Production domain: `https://bnbheroes-revival.vercel.app/`
- Production root currently uses the recovered **17 Nov 2021 React frontend build** (safe/preservation patched).
- Playable simulation remains at `/prototype/`.
- Restored GitBook remains at `/gitbook/`.
- Original 17 Nov 2021 bundle archive is under `archive/original-20211117/` with SHA-256 verification.
- 21 recovered Hero artworks are under `archive/hero-art-20211118/`.
- `npm run check:all` and engine tests had passed at prior production checkpoint.

## IMPORTANT correction about the earlier “94 URL resources”

The earlier 94 resource URLs + SHA-256 came from historical scans of **`bnbheroes.io` marketing/WordPress/Elementor**, not from `play.bnbheroes.io` game-client assets. This distinction matters. The actual game-client frontend was later recovered separately from archived `play.bnbheroes.io` HTML + JS/CSS bundles.

## Actual game frontend recovery status

Recovered build around **17 Nov 2021**:
- React main bundle: `main.5e2ca500.chunk.js`
- vendor bundle: `2.04f79657.chunk.js`
- main CSS: `main.433e3d53.chunk.css`
- vendor CSS: `2.f4c56af9.chunk.css`

Recovered later build around **10 Dec 2021**:
- `main.c3f63d85.chunk.js`
- `2.89c86d0d.chunk.js`
- `main.a8f26ba7.chunk.css`
- `2.f4c56af9.chunk.css`

Original root HTML from `play.bnbheroes.io` was recovered from Common Crawl. It confirmed a React build and exposed the hashed bundle names.

The 17 Nov build is currently used as the visual baseline because it is closest to the launch/open-beta period the user remembers.

## Newly recovered legacy-domain source: `bnbheroes.xyz`

A major discovery in the latest research is the older first-party domain:
- `bnbheroes.xyz`
- Wayback snapshots exist from **15 Oct 2021** onward.

This domain exposed legacy media that the `.io` site / `play.bnbheroes.io` archive did not preserve.

Notable filenames found from the old site:
- `BNBH-Card-Back.png`
- `Level-1.png`
- `Level-4.png`
- `menu-btn-00_Buttons_01.png`
- `Untitled-design-39.png`
- `Untitled-design-40.png`
- `Untitled-design-42.png`
- `Untitled-design-45.png`
- `Untitled-design-50.png`
- `keyframe-My-Video.mp4`

### Team image mapping (do NOT treat as gameplay assets)

The four team images requested by the user were identified from the legacy site HTML:
- `Untitled-design-39.png` → Matthew Leno — Project Leader
- `Untitled-design-45.png` → Chris Chua — Lead Game Developer
- `Untitled-design-40.png` → Flore Santos — Lead Artist
- `Untitled-design-42.png` → Vinnie Tan — Smart Contracts

They were shown to the user via temporary external viewing URLs. They are team/profile images and must NOT be reused as game art.

## First-party archived video now confirmed

Legacy first-party video:
- URL: `https://bnbheroes.xyz/wp-content/uploads/2021/10/keyframe-My-Video.mp4`
- Wayback first snapshot: **2021-10-15 17:51:37 GMT**
- another snapshot: **2021-11-08 10:19:31 GMT**
- archived original content length: **6,568,989 bytes**
- original last-modified shown by archive: **2021-10-13 19:20:31 GMT**

MemGator HEAD/proxy confirmed HTTP 200 and `content-type: video/mp4`.

This video still needs to be downloaded/extracted frame-by-frame if possible. It is a high-priority source for missing UI / media references.

## Major GitBook legacy-state breakthrough

The archived GitBook snapshot around **15 Oct 2021** contains serialized/compressed GitBook state. It was extracted to:
- `research/media_hunt/gitbook-legacy/initial-state.json`

Relevant legacy GitBook space:
- space ID: `-MiQ2_ADbmPLGvENAQw4`
- revision seen in initial state: `UWqoqKC3Sjj9Vsmd1z3Z`

The state exposed legacy Firebase/GitBook media metadata, including historical names, sizes, IDs, and URLs.

Although the old `firebasestorage.googleapis.com` URLs returned 404 directly, replacing the host with `files.gitbook.com` redirects to the still-live legacy bucket:
- `https://files.gitbook.com/v0/b/gitbook-legacy-files/...`

This is the key recovery path. Do NOT repeat the failed Firebase-only assumption.

## GitBook legacy media recovered in this checkpoint

Files are under:
- `research/media_hunt/gitbook-legacy/files/`

A download report is stored at:
- `research/media_hunt/gitbook-legacy/files/DOWNLOAD_REPORT.tsv`

Recovered metadata exposed **18 legacy assets**. Examples and verified dimensions:

- `FIGHT.png` → 1920×1080 PNG
- `FIGHT (1).png` → 1920×1080 PNG
- `Enemies.jpg` → 4000×2070 JPEG
- `a.jpg` → 4000×2070 JPEG
- `Level 1 Skull Enemies.jpg` → 1280×662 JPEG
- `Level 2 Skull Enemies.jpg` → 1280×461 JPEG
- `BNB HEROES.png` → 1920×1080 PNG
- `BNBH coin.png` → 2296×2296 PNG
- `$CROWN Tokenomics.png` → 1500×1500 PNG
- `HotC tokenomics.png` → 1920×1080 PNG
- `HotC transparent.png` → 2855×1293 PNG
- `Untitled design (34).png` → 500×500 PNG
- plus several `Copy of Copy of certificate...` and legacy promo images.

### Important note on apparent size mismatch

For some large files (`FIGHT.png`, `FIGHT (1).png`, `Enemies.jpg`) the bytes returned by `files.gitbook.com` were smaller than the historical `size` metadata, but ImageMagick still successfully decoded them at the expected dimensions. Treat them as recovered legacy copies, but retain metadata + provenance and do not silently claim byte-identical equality with the historical Firebase object unless SHA or exact size can be established.

## Legacy GitBook pages discovered from old site links/state

Old `bnbheroes.xyz`/GitBook references exposed page targets for:
- Common Enemies
- Bosses
- Hero Wiki
- Eastcliff Town Upgrade
- Hero Recruitment

Known page IDs captured in research attempts include:
- common enemies: `-MiQR4aAuYCML572KYiK`
- bosses: `-MiQRC6Gl363pDakiVxd`
- hero wiki: `-Mi_oiwrMg12G1-abNsZ`
- eastcliff town upgrade: `-Mi_CkHw0YULIQBBzR8B`
- hero recruitment: `-Mieci3472EOuTzxOyvg`

Direct reconstruction of sibling legacy `document.json` paths from the one surviving root `legacyURL` returned 404. Do not waste time repeating the same guessed-path variants unless a new batch/revision ID is found.

## Enemy identity is now locked from the ORIGINAL 17 Nov React bundle

Do not use earlier guessed names. The 17 Nov bundle explicitly defines:

1. type 1 → `Red Skull 1`
   - successRate 70
   - reward 0.003 BNB
   - XP 100
   - HP 200
2. type 2 → `Red Skull 2`
   - successRate 67
   - reward 0.0036 BNB
   - XP 110
   - HP 200
3. type 3 → `Red Skull 3`
   - successRate 63
   - reward 0.0042 BNB
   - XP 120
   - HP 200
4. type 4 → `Red Skull Archer`
   - successRate 59
   - reward 0.0048 BNB
   - XP 130
   - HP 200
5. type 5 → `Red Skull Assasin`
   - NOTE: original code spelling is **Assasin**
   - successRate 55
   - reward 0.0054 BNB
   - XP 150
   - HP 200
6. type 6 → `Red Skull Mage`
   - successRate 51
   - reward 0.006 BNB
   - XP 200
   - HP 200
7. type 7 → `Zangrief` (Boss of Chapter 1)
   - description in source: “Your squad spots ZANGRIEF at the stronghold gates charging towards them. Defeat Him in order to claim the stronghold once and for all!”
   - successRate 40
   - reward 0.024 BNB
   - XP 400
   - HP 400

Source location in de-minified 17 Nov bundle is around `research/play_forensics/recovered/build-20211117/main.pretty.js` lines ~7845–7910.

The Fight route renders:
- Chapter title: `Chapter 1: Enemy at the gates`
- Tier 1 = `te[0..2]`
- Tier 2 = `te[3..5]`
- Boss = `te[6]`
- enemy image path: `/enemies/<type>.png`

## Recovered enemy sheets and segmentation work

`Level 1 Skull Enemies.jpg` clearly contains **three Tier-1 Red Skull characters**.
`Level 2 Skull Enemies.jpg` clearly contains **three Tier-2 Red Skull characters**.

Segmentation output was created under:
- `research/media_hunt/gitbook-legacy/segmentation/tier1/1.png .. 3.png`
- `research/media_hunt/gitbook-legacy/segmentation/tier2/1.png .. 3.png`
- additional experiments under `research/media_hunt/gitbook-legacy/segmentation/`

The existing surviving game sprite:
- `/enemies/4.png`
- 300×407, transparent PNG
- corresponds to `Red Skull Archer` by source definition.

It is being used as the anchor to determine the left/middle/right order in the Tier-2 sheet.

Current matching experiments (PHASH/edge/alpha) have NOT yet produced a sufficiently rigorous mapping to promote all three Tier-2 crops as type 4/5/6. Do not state that mapping as certain yet.

Next AI should continue visual/template matching against `/enemies/4.png`, ideally with OpenCV or another robust feature matcher if available/installable, and also inspect the source sheets visually.

## X/Twitter archive already downloaded

Official historical X media is already stored under:
- `assets/reference/x/official/`
- videos under `assets/reference/x/videos/`
- retweets under `assets/reference/x/retweets/`

Manifest:
- `research/x_bnbheroes/media.tsv`

There are about 50 official media items and 2 videos plus retweeted media. Do NOT re-download the entire account unless seeking higher-quality/orig versions or text/caption metadata.

Useful official X items known from prior work:
- posts around Open Beta V2/V3
- dynamic success rate battle UI
- gameplay beta screenshots
- Hero rarity sheets
- result / enemy-defeated imagery
- Hero art for at least Arnulf and Elrik

`research/x_bnbheroes/README.md` notes official X items `15` and `16` as Elrik / Arnulf hero art.

## Hero artwork status

A Thai article from 18 Nov 2021 yielded **21/21 real Hero artworks**, now archived under:
- `archive/hero-art-20211118/`

Do not assume article order equals on-chain `heroNameId`; the article was arranged by name/alphabetical presentation.

Strong identity anchors already known:
- heroNameId 14 → Arnulf of Esplin
- heroNameId 18 → Elrik the Imbuer

These are the only IDs that should be treated as firmly mapped unless new evidence is found.

The next high-value work item is mapping the remaining 19 Hero artworks to `heroNameId` using:
- official X “hero spotlight” posts/captions,
- on-chain Attack/Armor/Speed tuples,
- old guides/screenshots with visible hero name/stat combinations,
- possibly recovered GitBook Hero Wiki media/text.

Do not assign names merely from aesthetics.

## Stronghold / Town media status

Recovered first-party Town layers currently include:
- background / village scene
- objects layer
- Bank level 1
- Town Inn level 1
- Training Grounds level 1

Still missing original direct byte for:
- `towns/3-1.png` (Barracks level 1)
- several higher-level town layers / thumbnails depending on screen

Old-domain assets:
- `Level-1.png`
- `Level-4.png`
were identified in the `bnbheroes.xyz` “Rebuild your stronghold / Building Upgrade” section and should be treated as period evidence/reference.

A first-party archived image from `bnbheroes.io` was also recovered:
- filename: `IMG_20211114_030807_117-1.png`
- dimensions: 2369×2048
- Wayback snapshot: 14 Nov 2021
- SHA-256 previously computed: `e3ec617c9f1c6adbf9e8d9d7c839a4049e658972f6e7dbf875a6617f951bfc13`

Use it as a pixel reference when reconstructing missing Stronghold/Barracks elements.

## Screenshot/community evidence

Five 1440×1080 gameplay screenshots were recovered from a 2021 Zhihu article and stored under the media-hunt research tree. At least one clearly shows the original Town/Stronghold with building-under-construction state and bottom-row buttons such as Market / Battle Log / GitBook.

A Chinese Mifengcha article from 23 Nov 2021 exposed URLs for five gameplay screenshots (Connect → Recruit → Fight → Idle Job → Town Upgrade), but the Aliyun OSS host currently returns AccessDenied and MemGator had no snapshot. Preserve the discovered URLs in research; do not redo the same dead-end from scratch.

## Bot screenshot evidence

Historical bot repo still provides real UI fragments/crops such as:
- fightBoss
- fightMage
- myHeroes
- unlock
- goToBoss
- goToMage
- MetaMask-related recognition assets

Also known to contain at least two full-screen 1920×1080 captures:
- `confirmedTransaction1-full.bmp`
- `unlock-full.bmp`

These are valuable for pixel positions and missing UI pieces when archive bytes are unavailable.

## Media that still lacks original direct game-client bytes

After Wayback/Common Crawl/MemGator checks, these hashed/static paths still do NOT have confirmed original direct bytes from `play.bnbheroes.io`:

- `fight.42bbd04e.png`
- `card.df50fb38.png`
- `card_lock.c211f00f.png`
- `recruit_card.aa5e12c7.png`
- `rewards.16b2db64.png`
- `You lose.00f95b2b.png`
- `towns/3-1.png`
- `/enemies/1.png`
- `/enemies/2.png`
- `/enemies/3.png`
- `/enemies/5.png`
- `/enemies/6.png`
- `/enemies/7.png`

However, do NOT yet ask the user to recreate all of these. Several now have **period-original GitBook sheets/screenshots** that can likely be used to reconstruct the exact visual faithfully:
- enemies 1–6 from `Level 1/2 Skull Enemies.jpg`
- Fight visual from `FIGHT.png` / `FIGHT (1).png`
- Boss Zangrief may be present in `Enemies.jpg`, `a.jpg`, FIGHT images, X media, or video
- Barracks can potentially be reconstructed from first-party town screenshots/layers

## Preservation safety policy

The original React app used Web3Modal/Web3 and chain 56. Production preservation build intentionally disables real wallet transaction flow. Keep it this way unless user explicitly asks for a separate audited relaunch architecture.

Never restore/reuse old private-key/bot credential material.
Never expose secrets found in historical repos.
Legacy mainnet contracts should be treated read-only for preservation/research.

## Current playable architecture

Two useful modes remain:

1. `/` = recovered original 2021 React UI in safe/preservation mode.
2. `/prototype/` = playable simulation using recovered mechanics/economy.

Long-term ideal:
- keep original React components/layout,
- inject a compatibility/mock provider that implements the methods the old UI expects,
- connect those calls to the safe simulation engine,
- preserve all UI/flows without real wallet transactions.

This integration is still incomplete and is one of the biggest remaining functional tasks.

## Immediate next actions — DO THESE IN ORDER

1. **Finish enemy sprite recovery**
   - inspect `Level 1 Skull Enemies.jpg` / `Level 2 Skull Enemies.jpg` visually,
   - use `/enemies/4.png` as a feature anchor,
   - establish exact L→R order,
   - crop/clean transparent sprites for types 1–6,
   - locate/crop Zangrief from GitBook/X/video if possible,
   - preserve provenance in `docs/MEDIA_RECOVERY.md`.

2. **Inspect/download `keyframe-My-Video.mp4`**
   - source URL and archive timestamps are above,
   - extract frames at scene changes,
   - compare against missing Fight/Town/Card/Boss media.

3. **Map GitBook assets to pages**
   - use state metadata/file creation batch IDs where useful,
   - avoid already-failed guessed `document.json` URL patterns unless new revision/batch data is recovered.

4. **Finish Hero ID mapping**
   - 21 art files exist,
   - 14=Arnulf and 18=Elrik are strong anchors,
   - use X captions/stat tuples / guides to map the rest.

5. **Recover/reconstruct Barracks and missing card/result art**
   - only after exhausting period evidence,
   - if still impossible, prepare a concise list for the user with each missing asset + exact screenshot reference so the user can direct creative reconstruction.

6. **Integrate recovered media into runtime**
   - replace neutral placeholders only when mapping is sufficiently supported,
   - do not overwrite recovered raw evidence; create production derivatives separately,
   - rerun `npm run check:all` and browser smoke tests.

7. **Update production Vercel**
   - current production Git integration previously worked through GitHub Actions/materialization workflow because CLI auth in container was lost.
   - Browser was logged into GitHub/Vercel in prior session; do not scrape JWT/cookies/tokens.
   - Use legitimate GitHub workflow / browser UI if needed.

8. **Update this handoff again** after major mapping/integration changes.

## Research dead ends already checked — avoid repeating blindly

- Common Crawl only had root/robots records for `play.bnbheroes.io`; it did not crawl all static JS/CSS/media children.
- Direct Common Crawl index had intermittent errors/429; a local `cluster.idx` approach was already used to inspect the domain block.
- Wayback direct access had rate limits; MemGator was used successfully as a proxy/timemap aggregator.
- Direct old Firebase GitBook media URLs returned 404, but `files.gitbook.com` legacy redirect works — use that.
- Direct guessed sibling GitBook `document.json` paths for page IDs returned 404.
- Exact web search by hashed missing asset filename generally returned nothing useful.
- GitHub searches found calculator/contracts/bots, not a complete intact `play.bnbheroes.io` source repository.

## Files created/used in the latest archaeology

- `research/media_hunt/gitbook-legacy/initial-state.json`
- `research/media_hunt/gitbook-legacy/files/`
- `research/media_hunt/gitbook-legacy/files/DOWNLOAD_REPORT.tsv`
- `research/media_hunt/gitbook-legacy/asset-timemaps.tsv`
- `research/media_hunt/gitbook-legacy/segmentation/`
- `research/media_hunt/legacy-domains/`
- `research/media_hunt/inspection-catbox.tsv` (temporary viewing links only; NOT provenance)
- `research/x_bnbheroes/media.tsv`
- `assets/reference/x/official/`
- `assets/reference/x/videos/`
- `archive/hero-art-20211118/`
- `archive/original-20211117/`

## Important provenance rule

Temporary Catbox URLs were only used to let ChatGPT visually inspect/show already-recovered files. Never cite Catbox as the historical source. Historical source/provenance is the old BNB HEROES domain, GitBook legacy storage, X/Twitter, Wayback, article archive, or recovered bot/video evidence.

## Last state before chat handoff

The user explicitly said the conversation was close to the token limit and asked to update the handoff so a new chat can continue.

At this exact checkpoint:
- source/media archaeology has advanced significantly,
- enemy names/mechanics are locked from original code,
- legacy GitBook media was newly recovered,
- Tier 1/2 enemy crops exist but mapping/production promotion is NOT finalized,
- the old first-party video is confirmed but frame extraction is NOT finalized,
- latest discoveries have NOT yet been fully deployed to production,
- next session should continue from the ordered action list above, not restart research.

## Progress update — 2026-09-03 (continued recovery)

### Enemy runtime contract recovered from period-original bundle
- Original `archive/original-20211117/static/js/main.5e2ca500.chunk.js` contains the exact 7-entry enemy table:
  - type 1 `Red Skull 1` — success 70, reward .003, XP 100, HP 200
  - type 2 `Red Skull 2` — 67, .0036, 110, 200
  - type 3 `Red Skull 3` — 63, .0042, 120, 200
  - type 4 `Red Skull Archer` — 59, .0048, 130, 200
  - type 5 `Red Skull Assasin` — 55, .0054, 150, 200
  - type 6 `Red Skull Mage` — 51, .006, 200, 200
  - type 7 `Zangrief` — 40, .024, 400, 400
- Same bundle proves runtime path is `/enemies/` + `type` + `.png`; Tier-1 carousel indexes 0..2, Tier-2 3..5, boss index 6.

### Enemy 1/2/3 promoted to runtime (first-party derivatives)
- GitBook first-party `Level 1 Skull Enemies.jpg` contains exactly 3 Tier-1 characters.
- The recovered crops `segmentation/tier1/{1,2,3}.png` were independently matched back to the earlier first-party 4000x2070 `a.jpg` via SIFT/RANSAC. Their centers are x≈647, 1980, 3342, proving left→center→right ordering.
- Therefore runtime mapping is now evidence-backed: `enemies/1.png` = left, `2.png` = center, `3.png` = right.
- Old identical placeholder files were preserved under `research/media_hunt/derivatives/enemies/placeholder-backup-{1,2,3}.png`.
- Proof record updated at `research/media_hunt/derivatives/enemies/PROOF.json`.

### Remaining enemy blocker
- First-party Tier-2 sheet and three clean crops are recovered, but exact crop→type mapping for Archer/Assasin/Mage is not yet independently proven. Do not overwrite 4/5/6 until proof is found.
- Type 7 Zangrief runtime art remains unresolved.

### Barracks investigation correction
- `research/media_hunt/legacy-domains/assets/Level-1.png` and `Level-4.png` are valid 1700x1549 alpha PNGs; similarly named `critical/` copies are truncated.
- They are strong period first-party Barracks-related candidates, but dimensions/composition do not directly match the 1920x1080 `/towns/{type}-{level}.png` layers. Do not promote without geometric/source proof.

## Progress update — 2026-09-03 enemy + Barracks milestone

### Enemy mapping is now locked

- Tier 1: runtime types 1/2/3 = first-party GitBook Level-1 sheet left/middle/right.
- Tier 2:
  - type 4 Red Skull Archer = left. Original `/enemies/4.png` direct SIFT match gives 59/63 inliers (earlier proof run 251 inliers).
  - type 6 Red Skull Mage = middle. Historical bot `mage/mage1.bmp` exact-scale template score 0.9721 against middle crop.
  - type 5 Red Skull Assasin = right, the only remaining crop in the exact 3-enemy Level-2 set.
- `enemies/5.png` and `enemies/6.png` are promoted derivatives from the original sheet.
- Proof: `research/media_hunt/gitbook-legacy/segmentation/TIER2_MAPPING_PROOF.md`.

### Zangrief recovered as period reconstruction

- Production YouTube video `vpYV15hBOGs` uploaded 17 Nov 2021 explicitly shows the newly implemented Chapter-1 boss and the player winning the boss fight.
- Higher-resolution period screenshot `research/media_hunt/matters-20211208/boss-win.png` (1162x1140) contains the same boss.
- Boss was isolated from that period screenshot; runtime `enemies/7.png` is now a transparent 500x600 reconstruction.
- Previous unusable enemy7 placeholder is preserved as `research/media_hunt/derivatives/enemies/placeholder-backup-7.png`.
- Proof: `research/media_hunt/derivatives/enemies/ZANGRIEF_PROOF.md`.

### Barracks Level 1 recovered/reconstructed into town coordinates

- Archived first-party `bnbheroes.xyz` HTML explicitly says `Level-1.png` alt=`Level 1 Barracks` and `Level-4.png` alt=`Level 4 Barracks`.
- `Level-1.png` is a valid 1700x1549 alpha PNG.
- It matches period Zhihu gameplay screenshot `research/media_hunt/zhihu/2.jpg` with 125 RANSAC inliers.
- Original `towns/1-1.png` matches the same screenshot with 153 inliers.
- Composed homography places the Barracks into original 1920x1080 town coordinates; reconstructed result promoted to `towns/3-1.png`.
- Proof: `research/media_hunt/barracks-analysis/TOWN_3_1_PROOF.json`.

### GitBook legacy storage fully enumerated

- Public bucket prefix listing recovered 189 historical document objects.
- The Space asset prefix contains exactly 20 publicly listable assets; all are known/recovered. `research/media_hunt/gitbook-legacy/assets-index/all.json` records the enumeration.
- Do not waste time guessing more sibling GitBook asset URLs unless a new Space/revision ID is discovered.

### Embedded bundle images checked

- Original main JS contains 10 small base64 PNG data-URIs; decoded to `research/media_hunt/bundle-embedded/`.
- They are small UI/icon assets (e.g. 51x30, 128x128, 55x59), not the missing large card/result/fight files.

### Historical six-file missing-media queue — **SUPERSEDED BY LATER RECOVERY BELOW**

At this earlier checkpoint, direct original bytes were still unrecovered for:
- `static/media/fight.42bbd04e.png`
- `static/media/card.df50fb38.png`
- `static/media/card_lock.c211f00f.png`
- `static/media/recruit_card.aa5e12c7.png`
- `static/media/rewards.16b2db64.png`
- `static/media/You lose.00f95b2b.png`

This paragraph records the earlier search state only. Later checkpoints below recovered period/first-party pixels for all six runtime slots; direct byte-identical hashed originals remain unavailable for some of them.

## Progress update — 2026-09-03 final hashed-media promotion

### The former six-file media queue is now integrated

All six formerly missing hashed-media runtime slots now use historical period/first-party pixels or evidence-backed period-pixel reconstruction. `fight` was upgraded later from a creative placeholder to a supervised period-pixel reconstruction. Direct byte-identical 2021 originals were **not** recovered for every slot, so provenance labels still matter.

1. `static/media/card.df50fb38.png`
   - 459×654, SHA-256 `cac62dc89c4e15b36fb738131ca99c04b90c1211bf9e2e175e655394fef8e100`.
   - Official 2021 video `WZwbq7Va0gg`, 210 repeated open-card detections, median-stacked reconstruction.
2. `static/media/card_lock.c211f00f.png`
   - 459×654, SHA-256 `f68d9efe4d89f00ec1e5ef6857b046d9aaa69147c52ca11c6f9e1a8e24284103`.
   - Same official video, separate locked-card cluster, 51 detections.
3. `static/media/recruit_card.aa5e12c7.png`
   - 459×654, SHA-256 `12ddc8b41804baff0e78ede53833bd503fa24e3b130ec2d01203fca8cf65aae6`.
   - First-party archived `BNBH-Card-Back.png` adapted to runtime aspect. It matches official video with 195 RANSAC inliers at the strongest frame, so this is real period artwork, though not direct hashed-file bytes.
4. `static/media/rewards.16b2db64.png`
   - 512×512, SHA-256 `0ba35be2fa35911f90468a49ed2b019adf505a59497569b53e7e5dc84e8e8a9d`.
   - Original bundle proves RESULT modal renders it at width 500px for nonzero reward. Reconstructed from period win-frame pixels using win/lose median differential isolation.
5. `static/media/You lose.00f95b2b.png`
   - 512×512, SHA-256 `4f08df3827f4b41f42c4e078542f04ada3858be578fe9a0099f8083de89034b4`.
   - Bundle proves `Q.rewards == 0` renders this at width 500px; reconstructed from corresponding period lose-frame pixels.
6. `static/media/fight.42bbd04e.png`
   - 512×512, SHA-256 `158f9f06f9f5720f884d97bd954fbea2029034a2b79c81405fc868a515791bf0`.
   - Current crossed-weapons image remains a **CREATIVE_RECONSTRUCTION**. This checkpoint only normalized it to 8-bit. Do not claim original/period source.

Full record: `research/media_hunt/final-promotions/PROVENANCE.md` and `research/media_hunt/card-analysis/CARD_SLOT_RECOVERY_PROOF.md`.
Previous placeholders are preserved under `research/media_hunt/final-promotions/backups/`.

### RESULT modal contract recovered exactly from original bundle
- Modal title: `RESULT`.
- Loss when `Number(Q.rewards) == 0`: DOM label `You LosE`, image `You lose.00f95b2b.png`, width 500px.
- Win otherwise: DOM label `ENEMY DEFEATED`, image `rewards.16b2db64.png`, width 500px.
- Result details are separate DOM content at bottom; therefore period screenshot text/numbers must not be baked into the reconstructed background image.

### Validation
- `npm run check:all` passes after promoting the last media batch.
- Local HTTP server check returned HTTP 200 for all six hashed media, `enemies/1.png`, `enemies/7.png`, and `towns/3-1.png`.
- Browser Host Bridge is on the Mac host and cannot reach container `127.0.0.1`; container has no Chromium executable. Therefore true visual browser smoke is still open. Do not mark it passed based only on HTTP checks.

### Immediate next work
1. Original 2021 UI still has dead Web3/game transaction dependencies. Build the safe compatibility/mock adapter so the **original UI**, not only `/prototype/`, can execute recruit/upgrade/fight/result flows locally without wallet signing.
2. Keep all real wallet/mainnet signing/transaction operations blocked.
3. Browser-regression test original routes once a browser can reach the served build.
4. Continue Hero ID mapping only with evidence; anchors remain heroNameId 14=Arnulf and 18=Elrik.

## Progress update — 2026-09-03 original-UI safe bridge

### Original bundle contract-call inventory completed
`docs/ORIGINAL_UI_COMPATIBILITY.md` now records the core calls required for native emulation:
- writes: `createNewHero`, `claimRewards`, `upgradeTown`, `fight`, `expediteHero`, `unLockLevel`, `moveHeroToBag`;
- reads: `getHeroesByOwner`, `getHeroesInBag`, `getHero`, `getTownLevel`, `getTownsOfPlayer`, `unLockTime`, `getCharacterPrice`, `getTownUpgradePrices`, `getUnlockLevelPrice`, balances/allowances;
- approval writes: ERC20 `approve`, NFT `setApprovalForAll`;
- fight receipt contract: original UI consumes `events.Fight.returnValues.rewards/xpGained/hpLoss`.

### Phase-1 compatibility bridge implemented
- `preservation-shim.js` still blocks the original real transaction layer before React handlers.
- Instead of a dead-end alert for recovered menu/action imagery, the following UI actions now route to equivalent deterministic local-simulation tabs:
  - `upgrade` -> `/prototype/#town`
  - `fight-btn` -> `/prototype/#battle`
  - `recruit` -> `/prototype/#heroes`
  - `myheroes` -> `/prototype/#heroes`
  - `mybag` -> `/prototype/#reserve`
  - `market` -> `/prototype/#market`
  - `battlelog` -> `/prototype/#log`
- `prototype/src/app.js` now reads `location.hash` at startup and on `hashchange`, enabling those deep links.
- Real wallet/mainnet signing remains disabled.

### Validation after bridge patch
- `npm run check:all` passes.
- This is **not yet the final provider emulation layer**: the 2021 React components still do not receive ABI-compatible local contract reads/writes directly. Phase 2 remains to emulate Web3/EIP-1193 responses and synthetic transaction receipts/events while keeping all network writes disabled.

## Progress update — 2026-09-03 native original-UI provider bridge

### Phase 2/3 bridge implemented
- Added `preservation-provider.js`, a local EIP-1193/Web3 provider backed by the same `prototype/src/engine.js`, `prototype/src/legacy-data.js`, and `bnbheroes-revival-v2` localStorage save as the standalone revival.
- `index.html` now loads vendored `ethers-6.17.0.umd.min.js`, then the local provider, then the preservation shim, before the original React main bundle.
- Exact 17 Nov 2021 contract identities are preserved for core/token/character/market/oracle/pool, but no runtime RPC endpoint is used.
- Main bundle compatibility patches are deliberately narrow:
  - static module-24 Web3 provider -> `window.__BNBH_LOCAL_PROVIDER__`;
  - WalletConnect remote RPC config removed;
  - `F.connect()` inside original `se()` -> safe local-provider resolution;
  - original `se().then(...)` auto-connect restored;
  - original `connect:se` prop restored.
- `preservation-shim.js` no longer intercepts Recruit/Upgrade/Fight/My Heroes/Reserve/Market/Battle Log into `/prototype/`; original React handlers now execute natively through the local provider.
- GitBook external-open interception remains, sending the dead historic GitBook URL to `/gitbook/`.

### Oracle values/formula locked from exact legacy contract
Read-only `eth_call` against build-17/11 oracle `0xD160bbDED5cFF79b126443EefCB28F3b67991140` still responds and exactly matches the stored snapshot for character, expedite, town and token prices.

The exact unlock formula was independently confirmed by sampled contract calls:
`getUnlockLevelPrice(level) = getTokenPrice * basePriceToUnlockInBNB * (100 + unlockRate*level) / 1e20`
with snapshot `basePriceToUnlockInBNB=0.008 BNB`, `unlockRate=4`.
Provider uses integer BigInt arithmetic and the preserved snapshot, not a live oracle.

### Original ABI surface implemented
- Hero/town/core/oracle reads, ERC20/NFT approvals, active/reserve hero lists, and marketplace reads are ABI-compatible.
- Writes implemented locally: recruit, claim, town upgrade, fight, expedite, level unlock, reserve move/return, market listing.
- `Fight` returns a synthetic mined receipt with an ABI-encoded `Fight` event so the untouched React RESULT logic receives `rewards`, `xpGained`, `hpLoss` in its historical path.
- Local market listing implements the UI-documented 10% listing fee.

### Safety invariant
The app shadows any browser wallet on this page with the preservation provider. `eth_sign`, `personal_sign`, `eth_signTransaction`, and `eth_sendRawTransaction` hard-fail. Runtime main/provider contain no BSC/Infura RPC endpoint. Chain id 56 is reported only so the 2021 UI's original chain gate accepts the emulator.

### Tests
- Added `tests/provider.test.mjs`.
- `npm run check:all` passes after native bridge integration.
- Provider test verifies exact oracle values, hero/market ABI reads, fight synthetic receipt, shared save persistence, and signing/raw-transaction rejection.

### Remaining immediate gate
- Deploy a **non-production Vercel preview** and browser-smoke original routes/actions there.
- Do not call production certified until browser checks cover `/`, `/myheroes`, `/market`, `/battlelogs`, `/myreserve`, Recruit, Upgrade, Fight and RESULT.

## Progress update — 2026-09-03 Recruit cross-version source recovery

### Why Recruit looked disabled on the 17 Nov shell
Browser regression of the Vercel preview proved Home/My Heroes/Fight/Upgrade worked natively, but Home Recruit was disabled. This is historical, not a provider failure: untouched `archive/original-20211117/static/js/main.5e2ca500.chunk.js` hard-disables both Home Recruit rendering branches even though the complete modal, approval and `createNewHero()` code remains in that same bundle.

### Authentic active handler recovered from 16 Nov
`research/play_forensics/recovered/build-20211116/main.907e74c4.chunk.js` contains the same Home component one day earlier with the eligible branch active. Its original click handler opens the Recruit modal and calls the oracle `getCharacterPrice()` before continuing through the existing approval/recruit functions.

The current runtime now uses that exact 16 Nov handler in the 17 Nov shell. The insufficient-balance/full-inn branch remains disabled exactly as before. This is a cross-version historical restoration, not invented UI. The 17 Nov archive is untouched and verification now asserts both source states.

## Progress update — 2026-09-03 public-preview native UI certification

### Preview / branch
- GitHub branch: `restoration/native-ui-20260903`
- Vercel preview: `https://bnbheroes-revival-git-restoration-nati-89e999-phu-tans-projects.vercel.app/`
- Do **not** force-push `main`: remote `main` and the restoration history diverged. The restoration was intentionally pushed to its own branch.

### Browser-certified native 2021 React flows
The public Vercel preview was exercised with real Chrome via Browser Host Bridge. Passed: Home local-wallet auto-connect, My Heroes, cross-version original Recruit handler, ~12h arrival, Expedite, Reserve/Return, Bank Upgrade, Basic Fight, Zangrief Boss screen, RESULT win, RESULT loss, Claim after the historical lock gate, and Battle Logs.

Concrete smoke outcomes:
- Recruit fresh-state BNBH: `20000 -> 13099.179568...`; NFT #1 created with ~43,174 seconds of arrival time.
- Expedite: another ~690.082043 BNBH spent; NFT #1 became immediately active.
- Bank upgrade isolated smoke: `20000 -> 18274.794892...`, town state became level 1 and `/towns/1-2.png` rendered.
- Boss win: Zangrief RESULT displayed 0.024 BNB / 400 XP / 330 HP loss.
- Forced deterministic QA loss on a second Hero: `YOU LOSE`, 0 BNB / 0 XP / 400 HP loss.
- Claim QA advanced only local save time past the gate: pending `0.048279` became claimed `0.0386232` after legacy 20% tax; pending and unlock reset to zero.

### Battle Logs blocker solved
The 17 Nov UI does not use Web3 for battle history; it queries retired `https://graphql.bitquery.io/` through Apollo. `prototype/src/engine.js` now stores structured `battleHistory`; `preservation-shim.js` locally answers the original Bitquery count/list query shapes from that same save. The React/Apollo Battle Logs page itself was not rewritten. Public preview then rendered a fresh row: `NFT 0 / Red Skull 1 / 0.00329175 BNB / 100 XP / 130 HP` with pagination.

### Mobile smoke
Valid mobile smoke used iPhone Safari UA plus 390×844 viewport. Original mobile layout placed Recruit/My Heroes/Upgrade/Fight controls in-view. A prior desktop-UA viewport-only result was discarded as invalid because `react-device-detect` correctly requires mobile UA.

### Evidence
See `research/browser-regression/REPORT_2026-09-03.md` and compressed screenshots under `research/browser-regression/evidence/`.

### Safety remains unchanged
No real wallet/signing/mainnet transaction path was restored. `eth_sign`, `personal_sign`, `eth_signTransaction` and `eth_sendRawTransaction` remain blocked. The original UI is driven by local EIP-1193/Web3 and local Bitquery-compatible adapters only.

## Progress update — 2026-09-03 full Hero-card mapping and promotion

### 21/21 Hero cards are no longer placeholders

All runtime `/cards/1.png` … `/cards/21.png` now use the surviving period artwork set from `archive/hero-art-20211118/`, copied **byte-for-byte**. No resize/crop/redraw/generation was applied. `scripts/verify-preservation.mjs` now compares every runtime card to its mapped archived source and fails if any card regresses to `cards/unkown.png`.

Final mapping:

| heroNameId | Hero | rarity | confidence |
|---:|---|---|---|
| 1 | Dayne of Gerston | Common | HIGH_STRUCTURAL |
| 2 | Andin Olis | Uncommon | HIGH_STRUCTURAL |
| 3 | Torlov Branhart | Common | HIGH_STRUCTURAL |
| 4 | Aelof Orstone | Uncommon | HIGH_STRUCTURAL |
| 5 | Jan Rhylen | Common | HIGH_STRUCTURAL |
| 6 | Demisov the Bold | Uncommon | HIGH_STRUCTURAL |
| 7 | Esfel of Lordan | Common | HIGH_STRUCTURAL |
| 8 | Reis of the Knife | Uncommon | HIGH_STRUCTURAL |
| 9 | Sivalas Zefen | Common | HIGH_STRUCTURAL |
| 10 | Lena | Common | HIGH_STRUCTURAL_NEW_INSERT |
| 11 | Thalas One-Eye | Uncommon | HIGH_STRUCTURAL |
| 12 | Lady Ella of Tir | Rare | HIGH_STRUCTURAL |
| 13 | Sir Bertrand | Rare | HIGH_STRUCTURAL |
| 14 | Arnulf of Esplin | Rare | **DIRECT_ANCHOR** |
| 15 | Balen Fellwood | Rare | HIGH_STRUCTURAL |
| 16 | Helia Stormcall | Epic | HIGH_STRUCTURAL |
| 17 | Xegis Branfyre | Epic | HIGH_STRUCTURAL |
| 18 | Elrik the Imbuer | Epic | **DIRECT_ANCHOR** |
| 19 | Uriah the Sage | Legendary | HIGH_STRUCTURAL |
| 20 | Sir Asten | Legendary | HIGH_STRUCTURAL |
| 21 | Duke Duscair IV | Legendary | HIGH_STRUCTURAL |

### Why the structural mapping is strong but not mislabeled “direct”

Recovered legacy GitBook `Hero Drop Rate` preserves an ordered 18-Hero roster with rarity sequence:

`C U C U C U C U C U R R R E E L L L`

The preserved 21-ID Character rarity array is:

`C U C U C U C U C C U R R R R E E E L L L`

Removing exactly IDs **10, 14, 18** makes the 21-ID sequence match the old 18-Hero sequence position-for-position. Official period X material says three new Heroes were being added. IDs 14 and 18 are independently locked as Arnulf and Elrik; the only additional artwork outside the old 18-name roster is Lena, giving ID10=Lena. This yields one consistent ordered merge without using article alphabetical order as numeric evidence.

Artwork/rank identities are additionally cross-checked against official rarity lineups with SIFT/RANSAC (e.g. Xegis 342, Helia 324, Balen 212, Bertrand 192, Lady Ella 183, Uriah 192 inliers). `Layer-1.png` is in the Uncommon group and is the residual Demisov artwork after the other four Uncommon identities are resolved.

Full proof and machine-readable mapping:
- `research/hero-id-mapping/PROOF.md`
- `research/hero-id-mapping/heroNameId-final.tsv`
- `research/hero-id-mapping/art-to-official-rarity-sift.tsv`
- `research/hero-id-mapping/official-group-layout-sift.tsv`

### Archive paths exhausted without inflating confidence

The old NFT `tokenURI()` resolves to the dead first-party route `https://metadata.bnbheroes.io/token/{id}`. Common Crawl/Wayback/alternate archive attempts did not yield the token JSON; public historical BSC RPCs are pruned for the required 2021 state; Sourcify/source-history routes did not provide a stronger numeric table. Current `randomTable` state is known to have changed and is **not** used as historical Hero-ID proof.

### Runtime/data/tests

- `prototype/src/legacy-data.js` now contains all 21 recovered Hero names.
- `tests/engine.test.mjs` asserts the exact ordered name set and that no template returns `Lost Hero #...`.
- `scripts/verify-preservation.mjs` asserts all 21 source/card byte equalities and preserves direct anchors 14/18.
- `docs/MEDIA_RECOVERY.md` and `archive/hero-art-20211118/SOURCE.md` were consolidated to remove stale placeholder claims.
- `npm run check:all` **passes** after full Hero promotion.

### Browser/deployment note

The Mac Browser Host Bridge currently cannot reach the Docker container directly (`127.0.0.1` refused; `172.28.0.3` timed out), while the container server itself returns HTTP 200. Therefore do not falsely certify this exact Hero-card commit via local browser. Push it to the existing non-production restoration branch and browser-smoke the HTTPS Vercel preview instead, then record commit/preview certification below.

### Remaining true uncertainties after Hero completion

The restoration is now functionally complete for the recovered 2021 UI/gameplay surface. Remaining fidelity caveats are narrow and already labeled:

1. `static/media/fight.42bbd04e.png` is now `RECONSTRUCTED_FROM_PERIOD_PIXELS`; direct hashed bytes remain unavailable, but 2021 Home footage and supervised alpha/recomposition proof support the active reconstruction.
2. Hero IDs 14/18 are direct numeric anchors; the other 19 are high-confidence structural mappings, not a recovered metadata-table dump.
3. Some enemy/Barracks/card/result runtime images are period-derived reconstructions rather than byte-identical original hashed files; their proof docs preserve exact provenance.

Do not reopen solved queues unless a genuinely new historical source can improve fidelity/provenance.

## Final restoration checkpoint — 2026-09-03 Hero-card deployment certification

- Hero restoration commit: `addeaef16ef1d1428651bb73c08436c5075190b8` (`Complete 21-hero period card restoration`).
- GitHub restoration branch: `restoration/native-ui-20260903`; `origin/restoration/native-ui-20260903` points at the Hero-card commit. Remote `main` has a separate/diverged history; do not force-push it.
- Vercel preview: `https://bnbheroes-revival-git-restoration-nati-89e999-phu-tans-projects.vercel.app/`.
- Public-preview verification fetched `/cards/1.png` … `/cards/21.png`: every response was HTTP 200 and every byte length matched the corresponding immutable period source; local SHA-256 verification confirms byte identity for all 21.
- `/myheroes` rendered `/cards/14.png` at its natural 499×699 dimensions in the original 2021 React UI. Evidence: `research/browser-regression/evidence/2026-09-03-myheroes-period-card.jpg`.
- `npm run check:all` passes after the complete Hero promotion.
- Main playable preservation flows were already browser-certified on this same preview: Recruit/arrival/Expedite, Reserve/Return, Upgrade, Basic Fight, Zangrief win/loss RESULT, Claim, Battle Logs, restored GitBook/prototype, and valid iPhone-UA mobile layout.
- This Hero-deployment note predates the later Town/Fight recovery. Current state: `fight.42bbd04e.png` is a validated period-pixel reconstruction; used `/townselect/*-2..4` are evidence-backed period reconstructions; Town L2–L4 full layers are restored and geometry-verified.

## Live recovery checkpoint — 2026-09-03 Town Level 2/3 integration

This checkpoint is intentionally written immediately so a network/tool interruption does not lose context.

### Runtime changes already on disk
- `towns/1-2.png` … `towns/4-2.png` and `towns/1-3.png` … `towns/4-3.png` are now evidence-backed full-canvas 1920×1080 period-pixel reconstructions, replacing the former 573-byte transparent fallbacks.
- `townselect/1-2.png` … `townselect/4-2.png` and `townselect/1-3.png` … `townselect/4-3.png` are also recovered/reconstructed and currently modified in the working tree.
- Original/fallback town files were preserved under `archive/pre-town-layer-recovery-20260903/` before promotion.
- Bank Level 3 proof was corrected to use the stable transform-chain solution rather than the earlier distorted direct homography; current proof records 53/59 inliers for the stable chain.
- `npm run check:all` passed after the Level 2/3 full-town promotion.

### Historical unresolved work at this checkpoint — **SUPERSEDED BY LATER RECOVERY**
The four bullets that originally followed this heading (Town L4 fallbacks, Barracks-L4 proof recovery, dark-overlay rejection, and Fight creative re-audit) are all resolved in later checkpoints below. Current truth: Town L2–L4 full layers + used previews are promoted/canonicalized/hash-locked, Fight is `RECONSTRUCTED_FROM_PERIOD_PIXELS`, full checks pass, and the HTTPS preview is browser-certified. Keep the later proof sections as the authoritative state.

### Git/deployment state at this checkpoint
- HEAD is still `addeaef` (`Complete 21-hero period card restoration`).
- The Town Level 2/3 batch is intentionally not committed yet.
- Existing public Vercel preview is therefore older than this live Town batch and must not be treated as certification of the new Town files.

### Live sub-checkpoint — Barracks Level 4 proof source recovered
- Exact historical proof frame has been re-identified: `research/media_hunt/town-layers-reconstruction/fulltown-L4-rel13.png` (1920×1080).
- Source is `research/media_hunt/legacy-domains/assets/Level-4.png` (1700×1549), mirrored/processed in `barracks-analysis/assets_Level-4.png`.
- Re-running SIFT/RANSAC against the recovered frame reproduces essentially the same homography as `3-4-proof.json`: scale ~0.3775/0.3744 and translation ~1282.5/140.7. Current SIFT settings yield 199–217 inliers; the earlier saved run records 625/726 with the same geometric solution.
- Therefore `research/media_hunt/town-layers-reconstruction/3-4.png` has reproducible period-video placement evidence and is eligible for promotion after final compositing validation.

### Live sub-checkpoint — critical Level 4 geometry correction
- `fulltown-L4-rel13.png` is 1920×1080 but is NOT pixel-coordinate-identical to the runtime town canvas. SIFT/RANSAC against runtime `towns/background.jpg` gives ~76 inliers with a transform close to X=1.00, Y=0.874 plus ~98 px vertical translation; `towns/objects.png` independently gives ~82 inliers and Y=0.872 plus ~99 px translation.
- Therefore the earlier `3-4.png` candidate, whose bbox is expressed in video-frame coordinates, must NOT be promoted directly. Correct method is: estimate runtime→frame geometry from original background/objects, inverse-warp the period L4 frame to canonical runtime coordinates, then reconstruct/promote layers there.
- This correction is now the active Level 4 plan.

### Live sub-checkpoint — Git branch safety corrected
- Town L2/L3 checkpoint commit: `219796a` (`Restore Town level 2 and 3 upgrade media`).
- That commit was initially created while the only local branch was named `main`, but **it was not pushed to remote main**.
- Local branch `restoration/native-ui-20260903` has now been recreated at `219796a`; local `main` was reset to track `origin/main` at `a0069ba`.
- Continue all restoration work and future pushes from `restoration/native-ui-20260903`; do not force-push `main`.

### Live sub-checkpoint — Level 4 canonical reconstruction candidate validated
- Corrected canonical Level 4 candidates are under `research/media_hunt/town-layers-reconstruction/level4-canonical/`.
- Barracks (`3-4`) is reconstructed from the surviving first-party WordPress `Level-4.png`, placed by source→period-frame homography and then inverse scene geometry into runtime coordinates. Runtime bbox candidate: x=1282..1919, y=49..713.
- Bank/Inn/Training (`1-4`, `2-4`, `4-4`) use visible pixels from the 21-Nov-2021 period gameplay frame after inverse scene warp and calibrated background subtraction. Segmentation parameters were calibrated against exact Barracks alpha (visible IoU ≈0.85, precision ≈0.90, recall ≈0.94). Only truly occluded areas retain Level-3 pixels as explicitly documented fallback; no invented drawing is used.
- Candidate full-town composite validation against the canonicalized period frame improves MAE from 28.10 (background-only baseline) to 7.28; median error is 0.0 over the building-support validation field.
- Candidate files are NOT yet promoted to runtime until Level-4 preview derivation + final verifier pass are complete.

### Live sub-checkpoint — Level 4 townselect previews reconstructed and validated
- `townselect/*-4` candidate previews are now derived reproducibly from the canonical full-town Level 4 candidates by inverse of the saved Level-3 preview→full placement homographies. This derivation was independently validated on Levels 2/3, where inverse-warping full-town layers reproduces the recovered previews at alpha IoU ~0.95–1.00 and RGB MAE ~0.1–0.4.
- Level-4 preview candidates: `research/media_hunt/town-layers-reconstruction/level4-canonical/{1,2,3,4}-4-preview-candidate.png`.
- Machine-readable proof: `level4-canonical/TOWNSELECT_L4_PROOF.json`.
- Forward round-trip alpha IoU back into full-town coordinates: Bank 0.9140, Inn 0.9540, Barracks 0.9322, Training 0.9433. RGB MAE on overlap is ~4.6–5.2 for Bank/Inn/Training; Barracks ~13.5 because its first-party source color/alpha is cleaner than the compressed video reference.
- Off-canvas-only Level-3 fallback pixels: Bank 1,867; Inn 914; Barracks 755; Training 0. The fallback is used only where preview coordinates map outside the 1920×1080 town canvas and therefore cannot be observed/reconstructed from the full-town period frame.
- No sufficiently clean/direct Level-4 upgrade-modal frame was found in the 21-Nov walkthrough, so these previews must be labeled `PERIOD_DERIVED_RECONSTRUCTION`, not byte-identical originals.
- Next action: backup the eight runtime Level-4 transparent fallbacks, promote 4 full-town + 4 preview candidates, extend preservation verifier, and run `npm run check:all` before committing.

### Live sub-checkpoint — Level 4 promoted to runtime + verifier lock added
- Backed up the eight former transparent Level-4 fallbacks under `archive/pre-town-level4-recovery-20260903/`.
- Promoted all 4 canonical full-town Level-4 candidates to `towns/{1,2,3,4}-4.png`.
- Promoted all 4 derived Level-4 upgrade previews to `townselect/{1,2,3,4}-4.png`.
- Added `research/media_hunt/town-layers-reconstruction/RUNTIME_TOWN_RECOVERY.sha256`, covering all 24 Town recovery artifacts: 12 full-town layers for Levels 2–4 and 12 upgrade previews for Levels 2–4.
- Extended `scripts/verify-preservation.mjs` to require all Town layers/previews, verify their SHA-256 hashes, and fail if any Level 2–4 recovery file regresses to a <=573-byte transparent fallback.
- Runtime L4 dimensions are now correct: full-town 1920×1080 RGBA; upgrade previews 250×250 RGBA.
- This checkpoint is written before the full verifier/test run. If interrupted, next action is `npm run check:all`; only commit L4 if it passes.

### Live sub-checkpoint — Level 4 runtime verification PASSED
- `npm run check:all` PASSED after Level-4 promotion.
- Preservation verification now enumerates all `towns/1-1..4-4`, all used `townselect/*-2..4`, validates the 24-entry Town recovery SHA-256 manifest, and rejects <=573-byte fallback regressions.
- Engine tests and local provider tests still PASS; Town media integration did not alter Web3 safety/gameplay logic.
- Level-4 is now eligible to commit as its own protected checkpoint before Fight-icon archaeology.

### Live sub-checkpoint — Town Level 4 committed
- Protected Level-4 commit: `c2b5316` (`Restore Town level 4 media`) on `restoration/native-ui-20260903`.
- Previous protected Town L2/L3 commit: `219796a`.
- Next queue is Fight-icon final archaeology; do not reopen Town reconstruction unless a genuinely stronger original source appears.

### Live sub-checkpoint — Fight icon final archive audit
- Exact URLScan filename queries saved under `research/web_archive/urlscan_deep/filename_fight.42bbd04e.png.json`, `urlscan_deep/play/filename%3A%22fight.42bbd04e.png%22.json`, and `urlscan_live/filename_fight.42bbd04e.png.json` all return `total: 0`.
- Common Crawl exact-path queries across available 2021–2022 indexes under `research/web_archive/commoncrawl_live/*fight.42bbd04e.png.txt` return `No Captures found` wherever the index endpoint succeeds; a few indexes return gateway timeout/error rather than positive captures.
- Direct URLScan result API requests for known `play.bnbheroes.io` scan IDs are currently HTTP 403 from this environment, so no response-body SHA could be recovered through that API path.
- A final period-pixel recovery attempt is now running: SIFT/RANSAC scans 834 archived gameplay images/frames using the seven surviving 512×512 menu icons as fiducial markers. Once Home frames are located, infer the original 150×150 Fight slot from the original bundle layout and median-stack multiple period frames if possible.
- Do not downgrade/upgrade Fight provenance until this scan completes.

### Live sub-checkpoint — Fight period Home pixels recovered
- The final fiducial scan completed across 834 archived gameplay images/frames using the seven surviving original 512×512 Home menu icons as SIFT/RANSAC anchors.
- Six consecutive 1920×1080 period Home frames were positively identified: `research/media_hunt/townselect-video/fulltown-rel29.5.jpg`, `fulltown-rel30.jpg`, `fulltown-rel30.5.jpg`, `fulltown-rel31.jpg`, `fulltown-rel31.5.jpg`, `fulltown-rel32.jpg`. Recruit/Heroes/Upgrade/Market each register roughly 16–24 RANSAC inliers on the strongest frames.
- Original bundle/DOM evidence independently establishes that Fight renders as its own 150×150 image while normal menu icons render at 120×120. Desktop DOM geometry gives a right offset of ~64 px; in the 1920×1080 browser-capture frame the period Fight slot is approximately x=1706, y=899, w=150, h=150.
- Median-stacking the six period Fight slots is extremely stable (pairwise frame MAE ~0–0.77). Artifact: `research/media_hunt/fight-period-recovery/fight-slot-median-150.png`.
- The current creative `static/media/fight.42bbd04e.png` has masked correlation about -0.058 against this period slot, so the creative artwork is almost certainly not visually faithful to the original.
- A simple background-residual segmentation calibrated against original Recruit/Heroes/Upgrade/Market alpha reaches only ~0.65–0.73 IoU; connected-component/hysteresis variants did not improve enough to justify runtime promotion yet. The period pixels are real, but transparent silhouette reconstruction must remain conservative until a stronger matte/reprojection method succeeds.

### Live sub-checkpoint — Town L2/L3 canonical geometry bug found and corrected
- A post-promotion geometry audit found that the first L2/L3 full-town reconstructions were expressed in the 1920×1080 reviewer-video coordinate system rather than the canonical runtime town canvas. This escaped the hash verifier because the files were internally valid images.
- Exact full-resolution source segment recovered/used for the original Level-2 placements: `research/media_hunt/townselect-video/VUt1ccH-dQ4-upgrades-1205-1245.mp4` (2021-11-07, 1920×1080). Exact proof times by building are 7.5, 13.5, 20.0 and 25.5 seconds.
- Fitting original `towns/background.jpg` to those period frames yields an exceptionally consistent axis-aligned runtime→video mapping: x scale ~1.000 with ~0 px translation; y scale 0.9064–0.90715 with +98.3..99.0 px translation. Median inlier residuals are mostly <0.14 px.
- All eight `towns/{1..4}-{2,3}.png` layers were inverse-warped with premultiplied alpha into canonical runtime coordinates. Round-trip canonical→video validation against the prior period-coordinate reconstructions gives alpha IoU 0.95456–0.99917 and overlap RGB MAE 0.932–1.006.
- The corrected Level-3 preview→canonical-full homographies were independently validated by forward-warping the untouched period `townselect/*-3` previews into corrected full-town L3: alpha IoU 0.99746–0.99893, overlap RGB MAE 0.821–1.066.
- Because the previous Level-4 previews inherited the old video-coordinate Level-3 placement H, all four `townselect/*-4` previews were regenerated from canonical `towns/*-4` using the corrected homographies. Level-3 fallback is used only for preview pixels whose mapped location is genuinely outside the observable 1920×1080 runtime canvas.
- Machine-readable correction proof is curated under `research/proofs/town-canonical-geometry-20260903/`. Pre-fix reconstructed runtime files are preserved under `archive/pre-town-canonical-geometry-fix-20260903/`.
- `RUNTIME_TOWN_RECOVERY.sha256` has been refreshed for the corrected 24 Town runtime assets. A full `npm run check:all` is running at this checkpoint; do not commit this geometry correction unless it passes.

### Live sub-checkpoint — Town canonical geometry verification PASSED
- After promoting corrected L2/L3 full-town geometry and regenerated L4 previews, `npm run check:all` PASSED completely: preservation verifier, engine tests and local-provider tests.
- `scripts/verify-preservation.mjs` is now additionally geometry-aware: it rejects Town L2/L3 if the 8-layer canonical round-trip proof drops below alpha IoU 0.95 / RGB MAE 1.1, rejects Level-3 preview→canonical mapping below alpha IoU 0.997 / RGB MAE 1.2, and requires Level-4 previews to declare the corrected canonical derivation method.
- `research/media_hunt/town-layers-reconstruction/level4-canonical/TOWNSELECT_L4_PROOF.json` has been replaced with the corrected canonical proof rather than the stale video-coordinate proof.
- This Town geometry correction is ready for its own protected commit before continuing Fight reconstruction.

### Live sub-checkpoint — Fight exact source + Home-state reconstruction (bridge-safe checkpoint)
- Exact period source for the six previously identified Home frames is now proven: `research/media_hunt/townselect-video/VUt1ccH-dQ4-upgrades-1205-1245.mp4` (1920×1080). Source frame at t=31.5s matches the previously saved `fulltown-rel31.5.jpg` at grayscale correlation 0.99949 / mean absolute RGB difference ~1.84 (JPEG-vs-video extraction difference).
- Runtime→period-frame geometry at t=31.5s is independently recovered from `towns/background.jpg` with 67 homography inliers and robust axis-aligned fit approximately X scale=0.999929, X shift=+0.025 px, Y scale=0.905853, Y shift=+99.470 px. Machine-readable evidence: `research/media_hunt/fight-period-recovery/SOURCE_FRAME_GEOMETRY.json`.
- Exhaustive compositing over the 16 possible Level-1/Level-2 Town combinations shows `(Bank, Inn, Barracks, Training) = (2,2,2,2)` is the best scene-state match by a clear margin at the period Fight frame (median pixel MAE ~5.33; mean ~14.94; ~65.9% validation pixels under MAE 10). Thus the background behind Fight is no longer unknown in state terms: all four buildings are Level 2.
- Runtime Fight DOM evidence remains: desktop Fight image renders 150×150 in `.btn-fight`, independent from the normal 120×120 menu icons. The period Fight slot remains approximately x=1706, y=899, w=150, h=150 for this 1920×1080 capture geometry.
- A multi-video Home-frame scan was started to locate the same Fight icon over additional backgrounds. Before being stopped to avoid saturating the local bridge, confirmed Home hits were found in at least: `VUt1ccH-dQ4-upgrades-855-920.mp4` (14 hits), `vpYV15hBOGs-upgrade.mp4` (17), `VUt1ccH-dQ4-upgrades-1205-1245.mp4` (37), `Wmon4hMiX2I-110-140.mp4` (3), and `IKhejV19gHI-fulltown-L4.mp4` (23). Sparse source frames were saved under `research/media_hunt/fight-period-recovery/archive-home-scan/`.
- The long scan was intentionally stopped after repeated 502 saturation; no runtime files were changed by that scan. Continue Fight reconstruction with small per-video/per-frame batches only.
- Town canonical geometry is already protected in commit `23071e2` (`Canonicalize restored Town geometry`) and must not be reopened unless stronger evidence appears.
- Immediate next action after interruption: analyze the already-saved Home frames in small batches to identify scene geometry/state and derive Fight pixels across genuinely different backgrounds. Do not rerun the 13,000-second monolithic scan.

### Live sub-checkpoint — Fight supervised period reconstruction validated
- The final Fight extraction is now objectively validated against four surviving original menu icons using leave-one-icon-out supervised segmentation. Saved-mask metrics: Recruit IoU 0.9647, Heroes 0.9416, Upgrade 0.9605, Market 0.9561; mean IoU 0.95573, minimum 0.94163. Machine-readable metrics: `research/media_hunt/fight-period-recovery/supervised-proof/LOO_SAVED_MASK_METRICS.json`.
- A single final OpenCV RTrees model (80 trees) was then trained on the four original-icon alpha masks and applied to the period Fight slot. Candidate artifacts: `research/media_hunt/fight-period-recovery/final-candidate/fight-150.png`, `fight-512.png`, `mask-150.png`; proof: `final-candidate/PROOF.json`.
- Final Fight candidate support fraction is ~0.75658 with one dominant connected component (17,023 px at 150x150).
- Candidate composited back over the reconstructed all-Level-2 period background reproduces the observed period Fight crop with median MAE 1.029, mean MAE 1.188, p90 2.697; inside predicted Fight support mean MAE is only 0.135.
- The current creative runtime Fight reconstruction performs dramatically worse on the same test: median MAE 46.72, mean MAE 48.09, p90 81.17.
- Period Fight pixels are stable across the six consecutive source frames: mean RGB std ~0.370, p90 ~0.658 inside predicted support.
- Conclusion: the new candidate is eligible to replace the creative runtime asset and must be labeled `RECONSTRUCTED_FROM_PERIOD_PIXELS` / period-pixel reconstruction. It is NOT byte-identical original media; direct hashed-file archive searches remain exhausted.
- Immediate next action: backup current creative `static/media/fight.42bbd04e.png`, promote `final-candidate/fight-512.png`, curate small proof files, add preservation verification, run `npm run check:all`, then commit/push the restoration branch.

### Live sub-checkpoint — Fight period reconstruction promoted to runtime
- The superseded creative `static/media/fight.42bbd04e.png` was backed up to `archive/pre-fight-period-recovery-20260903/fight.42bbd04e.png` (SHA-256 `158f9f06f9f5720f884d97bd954fbea2029034a2b79c81405fc868a515791bf0`).
- The validated period-pixel candidate has now been promoted to the original runtime path `static/media/fight.42bbd04e.png`, still 512×512 RGBA. New SHA-256: `e53c1be329ff369acce7179659cd0066957653a096ea7823a731221b4f55edfa`.
- Curated reproducible evidence is under `research/proofs/fight-period-reconstruction-20260903/`: `PROOF.md`, `LOO_SAVED_MASK_METRICS.json`, `FINAL_PROOF.json`, `SOURCE_FRAME_GEOMETRY.json`, `fight-150.png`, `mask-150.png`.
- Provenance is **RECONSTRUCTED_FROM_PERIOD_PIXELS**, not byte-identical original. Direct hashed-file archive recovery remains exhausted; this promotion is justified by objective period-frame reconstruction metrics, not by visual guesswork.
- Runtime has changed at this checkpoint, but preservation verifier/docs/full suite have NOT yet been updated/run. Immediate next action: add Fight proof/hash verification, update current recovery docs/provenance/task ledger, then run `npm run check:all`. Do not commit the Fight promotion until that passes.

### Live sub-checkpoint — Fight runtime verification PASSED
- After promoting the validated Fight period-pixel reconstruction and adding proof/hash assertions, `npm run check:all` PASSED completely: syntax checks, preservation verifier, engine tests and local-provider tests.
- Preservation verifier now requires the active Fight SHA-256 `e53c1be329ff369acce7179659cd0066957653a096ea7823a731221b4f55edfa`, requires the superseded creative SHA `158f9f06f9f5720f884d97bd954fbea2029034a2b79c81405fc868a515791bf0` to remain only in archive, enforces LOO segmentation mean IoU >=0.95 / min >=0.94, and enforces final period-frame photometric thresholds.
- Current recovery docs/task ledger/provenance have been updated to label Fight `RECONSTRUCTED_FROM_PERIOD_PIXELS`; direct original hashed bytes remain unavailable.
- Fight promotion is now eligible for a protected commit. Immediate next action: stage only curated runtime/proof/docs/verifier/backup files, commit on `restoration/native-ui-20260903`, push the restoration branch, then wait for Vercel Git preview redeploy and run fresh HTTPS browser regression.

### Live sub-checkpoint — Fight period reconstruction committed
- Protected Fight commit: `dba6d7f` (`Restore Fight button from period pixels`) on local branch `restoration/native-ui-20260903`.
- Commit contains only curated runtime/proof/docs/verifier/creative-backup files; large raw video/CV research caches were intentionally not staged.
- Preceding protected Town commits are `219796a` (L2/L3), `c2b5316` (L4), and `23071e2` (canonical geometry correction).
- Immediate next action: push `restoration/native-ui-20260903` to origin (fast-forward only), then wait for the Git-integrated Vercel preview alias to redeploy and run fresh HTTPS browser regression. Do not force-push remote `main`.

### Live sub-checkpoint — pushed branch preview serves Town + Fight bytes
- `origin/restoration/native-ui-20260903` now points at `dba6d7f6d7317f5268eec2df908bd5d42ccf07b3` after a normal fast-forward push; remote `main` was not touched.
- The Git-integrated Vercel branch preview is reachable at `https://bnbheroes-revival-git-restoration-nati-89e999-phu-tans-projects.vercel.app/` through the authenticated Browser Host session.
- Browser-side no-cache fetch proves the preview is serving the new Fight runtime bytes: 569,720 bytes, SHA-256 `e53c1be329ff369acce7179659cd0066957653a096ea7823a731221b4f55edfa`, HTTP 200 `image/png`.
- Representative canonical Town assets for Level 2/3/4 and upgrade previews also return HTTP 200 `image/png` with the new non-fallback byte sizes/hashes (Bank L2/L3/L4 plus `townselect/1-2..4` were checked). Therefore this HTTPS preview is the new Town/Fight deployment, not the older Hero-only checkpoint.
- Immediate next action: run fresh HTTPS browser regression on this exact preview: Town Upgrade previews/full layers through L2→L3→L4, Fight/result/Boss smoke, Hero/Recruit smoke, and responsive/mobile smoke; capture evidence and update `research/browser-regression/REPORT_2026-09-03.md` before final certification commit.

### Final browser certification — Town/Fight restoration preview PASSED
- Certified preview: `https://bnbheroes-revival-git-restoration-nati-89e999-phu-tans-projects.vercel.app/` on branch `restoration/native-ui-20260903`, with remote/runtime Fight restoration head `dba6d7f6d7317f5268eec2df908bd5d42ccf07b3` before this documentation-only certification commit.
- Deployment bytes were positively identified before regression: Fight SHA-256 `e53c1be329ff369acce7179659cd0066957653a096ea7823a731221b4f55edfa` plus promoted Town L2/L3/L4 and town-select assets returned HTTP 200 image bytes from the HTTPS preview.
- Fresh Town browser flow PASSED through Bank L1 -> L2 -> L3 -> L4 using the original React/local-Web3 handler. Modal previews advanced `townselect/1-2 -> 1-3 -> 1-4`; full town layers advanced `towns/1-2 -> 1-3 -> 1-4`.
- Fresh Fight browser flow PASSED: promoted Fight period-pixel button opened `/fight/-1`; Basic Enemy fight produced the native RESULT modal; Boss tab rendered Zangrief with historical text and values (46% displayed chance for QA hero, 400 HP, 0.024 BNB, 400 XP).
- My Heroes smoke PASSED with recovered Hero #0/card/stats/actions. Home Recruit smoke PASSED: original modal opened and displayed a 6900 BNBH recruit price. No extra recruit transaction was executed in the final certification pass.
- Responsive smoke PASSED with a genuine Android mobile UA and CDP device metrics 390x844 on Home, My Heroes and Fight. Each page reported document/body scroll width exactly 390 (no horizontal overflow).
- QA state was isolated and then restored exactly from `sessionStorage.__qa_backup_bnbh`: regression state before restore was ~993674 BNBH, Bank L4 (`towns[0]=3`), two battles, stored HP 800; restored save is 20000 BNBH, towns `[0,0,0,0]`, one prior battle, stored HP 870. Equality check against the backup string returned true; QA backup key was deleted afterward. Browser UA/device metrics were returned to the original desktop Mac Chrome profile.
- Final report: `research/browser-regression/REPORT_2026-09-03.md`. Eight small compressed final review screenshots are curated under `research/browser-regression/evidence/`; full PNG captures remain intentionally untracked local artifacts.
- Immediate next action: run `npm run check:all`; if PASS, stage only this handoff/report plus the eight compressed final review JPGs, create a small certification commit, push `restoration/native-ui-20260903` normally (no force, do not touch `main`), then verify remote branch head.

### Final certification test gate PASSED
- After the complete HTTPS regression and exact QA-save restore, `npm run check:all` PASSED again: syntax checks, preservation verification, engine tests, and local-provider tests.
- Final certification commit should include only `AI_IDE_HANDOFF.md`, `research/browser-regression/REPORT_2026-09-03.md`, and the eight compressed `research/browser-regression/evidence/2026-09-03-final-*.jpg` review images. Raw full-resolution browser PNGs and bulk research caches remain local/untracked by design.
- Certification commit `0935796` (`Certify restored Town and Fight preview`) was pushed normally to `origin/restoration/native-ui-20260903`; local and remote heads matched exactly after push. Tracked working tree was clean; raw full-resolution browser PNGs and bulk research caches remain local/untracked by design. `origin/main` was not touched.
- Restoration/certification is complete at this checkpoint. Reopen archaeology only if genuinely stronger original-period evidence appears; otherwise preserve the verified runtime/provenance rather than replacing it speculatively.

### 2026-09-03 forensic-fidelity phase — housekeeping checkpoint
- User explicitly requested the next phase to pursue fidelity items **1, 2, 3, and 5** from the prior roadmap: (1) exact original-byte recovery for period reconstructions, (2) direct Hero numeric-ID metadata recovery, (3) deeper exact legacy contract/state reconstruction, and (5) automated visual-diff forensic auditing. The separate dual-snapshot Recruit/Museum mode idea is intentionally NOT a priority because the 17-Nov Recruit disable may have been a legitimate pre-shutdown state.
- Housekeeping completed before new research: current-authoritative-state block added near the top of this handoff; stale Fight creative/Town fallback claims corrected or explicitly marked superseded; `docs/ORIGINAL_UI_COMPATIBILITY.md`, `docs/MEDIA_RECOVERY.md`, `docs/FORENSICS.md`, and `research/CONTINUATION_TASKS.md` synchronized with the final certified runtime.
- Next action: commit this documentation-only cleanup, then build the visual-diff forensic suite and run it against surviving period references/current canonical assets; in parallel start a new evidence-only deep-recovery pass for byte-original media, direct Hero metadata, and legacy contract history/state.

### 2026-09-03 forensic-fidelity phase — visual-diff suite checkpoint
- Added reproducible visual regression tool `scripts/visual-forensics.py` plus manifest/baseline under `research/visual-forensics/` and npm commands `visual:forensics` / `forensics:all`.
- Pipeline: SIFT/RANSAC alignment -> canonical warp -> bounded per-channel photometric fit -> MAE/correlation/edge-F1 metrics -> regenerated aligned/overlay/heatmap evidence. Period footage is treated as visual evidence, never as a byte-original claim.
- Initial certified coverage is 10 cases: all-Level-4 Town canonical composite vs 21-Nov-2021 max-town frame; all 8 direct Town L2/L3 upgrade previews vs their period composites; Fight reconstruction composited over recovered Town background vs six-frame period median.
- Baseline highlights: Town L4 3132/3243 RANSAC inliers (96.6%), normalized MAE ~13.75, edge-F1 ~0.688; Town L2/L3 previews 185–613 inliers with correlation ~0.913–0.975; Fight recomposition 232 inliers, correlation ~0.969, edge-F1 ~0.940. `npm run visual:forensics` PASS after tolerance calibration.
- Generated images/results are ignored and reproducible; durable config is `manifest.json`, `BASELINE.json`, README, and the tool script.
- Next action: run full functional + visual gates, commit/push visual suite, then begin deep-recovery passes for exact media bytes, direct Hero numeric metadata, and exact contract/state history.

## Deep fidelity checkpoint — 2026-09-03 (items 1/2/3/5)

User explicitly prioritized: (1) exact original-byte media recovery, (2) direct Hero numeric-ID metadata proof, (3) deeper contract/state recovery, and (5) automated visual-diff forensics. The dual-snapshot Recruit/Museum idea is intentionally not pursued because the 17-Nov Recruit disable may represent a legitimate late-game state.

Housekeeping commit `a0577e8` synchronized stale docs. Visual forensic regression suite commit `2c34a40` provides 10 evidence-backed cases and `npm run visual:forensics` / `npm run forensics:all`.

New deployment evidence: Common Crawl `CC-MAIN-2022-05` contains a Jan-25-2022 response for `play.bnbheroes.io` whose HTTP `last-modified` is **10-Dec-2021 10:54:18 GMT** and whose HTML references `main.c3f63d85.chunk.js`, vendor `2.89c86d0d`, CSS `main.a8f26ba7`, and lazy chunk `3.e84d78ad`. The main/vendor/CSS were already recovered locally; the WARC now independently proves their production/date lineage. See `research/media_hunt/deployment-artifacts/PROOF.md`.

The six missing hashed media (`fight.42bbd04e`, `card.df50fb38`, `card_lock.c211f00f`, `recruit_card.aa5e12c7`, `rewards.16b2db64`, `You lose.00f95b2b`) retain the same content hashes across recovered 16-Nov, 17-Nov and Dec-10 build references. Their missing exact bytes are therefore not caused by choosing the wrong build; sibling hashed assets survive while these exact public objects do not.

Dec-10 bundle discovery also exposes development/testnet ↔ production pairs for Core, Character, Market, BNBH, and Oracle. Read-only latest `eth_getCode` shows Core/Character/Market/Oracle dev+prod all share an identical 2,141-byte runtime SHA-256 `f493237b9d26fcb9d47fc3685d30e1e17c8302b5d84071394e77642cfa14cfcb`, strongly indicating a shared proxy runtime. Next high-value action is resolve proxy implementation/admin slots and implementation history, then use implementation/storage/events to test simulator rules and Hero-name assignment. See `research/contract-forensics/BUILD_20211210_DISCOVERY.md`.

## Deep-recovery checkpoint — 2026-09-03 production lineage / proxy discovery

- Common Crawl `CC-MAIN-2022-05` yielded a preserved `play.bnbheroes.io` production HTML response captured 2022-01-25 whose HTTP header says `last-modified: Fri, 10 Dec 2021 10:54:18 GMT`. The HTML references production build `main.c3f63d85.chunk.js`, vendor `2.89c86d0d`, CSS `main.a8f26ba7`, and lazy chunk `3.e84d78ad`. Exact WARC record: `research/media_hunt/deployment-artifacts/commoncrawl-20220125-play-root.warc-record`.
- Those Dec build main/vendor/CSS artifacts already existed under `research/play_forensics/recovered/original-build/`; this new WARC establishes their production/date provenance.
- Six missing hashed media identities are unchanged across recovered 16-Nov, 17-Nov and 10-Dec bundles: `fight.42bbd04e.png`, `card.df50fb38.png`, `card_lock.c211f00f.png`, `recruit_card.aa5e12c7.png`, `rewards.16b2db64.png`, `You lose.00f95b2b.png`. Therefore the missing-byte problem is not a wrong-build artifact. Current runtime reconstructions remain correctly labeled rather than falsely byte-original.
- The 10-Dec bundle exposes dev/testnet -> production pairs for Core, Character, Market, BNBH, and Oracle. See `research/deep-recovery-20260903/DISCOVERY_CHECKPOINT.md` for addresses.
- Read-only latest `eth_getCode` shows Core/Character/Market/Oracle dev and prod addresses all share one 2141-byte runtime proxy code with SHA-256 `f493237b9d26fcb9d47fc3685d30e1e17c8302b5d84071394e77642cfa14cfcb`. This strongly indicates a shared proxy family. BNBH is a separate 7903-byte implementation/runtime family.
- The later ABI adds state/admin surfaces absent from the older frontend view, including `bannedList`, `bots`, `feeToLevelup`, `lastPriceUpdateTime`, `maintenanceMode`, `taxFee`, `minimumPrice`, `migrate`, and `migrate_table`.
- Immediate next deep-recovery flow: identify proxy implementation/admin/beacon storage and upgrade history; retrieve implementation bytecode; diff 17-Nov vs 10-Dec logic/state; mine creation/fight/upgrade events to improve simulator and Hero numeric-name proof; then rerun `npm run forensics:all`, commit/push only curated proofs/scripts/docs, and recheck preview.

### Deep-recovery sub-checkpoint — EIP-1967 implementations resolved
- The identical 2,141-byte Core/Character/Market/Oracle runtimes are now directly confirmed as EIP-1967 proxies. Reproducible script/result: `research/contract-forensics/proxy-discovery.mjs` + `PROXY_DISCOVERY.json`; summary `PROXY_DISCOVERY.md`.
- Mainnet current implementations: Core `0x7E12cb515361E1fD2aDAc92018E70Ac76019b07d` (16,011 bytes), Character `0x3D833FFb8A19DDA5e44Fc34D5AB666Fa24c6e9E6` (18,814), Market `0x3c72e11BD64Bf0E2C0344B92A243bB9CA7e229aA` (13,317), Oracle `0x247E23BacE48bba978466675e663AfaAd082cb69` (5,186). Common mainnet proxy admin: `0xA6f76A3f9a42B184cAf05eb14D45C9d3C842e1fF`; beacon slots are empty.
- Testnet proxies use common admin `0x60b75A63C716C7AA5703ABa319d1093C5E0A604A` with separate current implementations. Do not assume current implementation == launch implementation.
- Immediate next action: recover historical `Upgraded(address)` / proxy-admin events and/or historical EIP-1967 slot values around Nov-Dec 2021, then fingerprint/decompile the exact historical implementations and compare to simulator/ABI/Hero assignment.

### Deep-recovery sub-checkpoint — launch-era implementations recovered from archive state
- Alchemy public BNB RPC supports historical account/storage state even though official BSC public RPC is pruned and disables `eth_getLogs`. Direct `eth_getStorageAt` of the EIP-1967 slot at period blocks recovered the actual implementation addresses.
- At block `12,723,964` (2021-11-17 13:07:30 UTC; known period gameplay transaction), exact implementations were: Core `0x986a1820498a636939a0b80eb8d12014e5d70b58`, Character `0x36bd26648ce81c1675dfa3bc640607a3ef0852f9`, Market `0x894d347281918c5307eb2e31ebb7d39a2f298be2`, Oracle `0xbd002cfa9a942c7f3a5771056d2f1482621ce07f`.
- By ~20-Nov the four slots had already moved to Core `0xd282954c99bb22def05e7b6b66b12568c0671c62`, Character `0x400d7b2f50f586dc33fe522cb1a98c038836e5da`, Market `0xade9b8d6bf3c220e7d8c9b3ed7caccd4584473f1`, Oracle `0x247e23bace48bba978466675e663afaad082cb69`. Core/Character/Market continued upgrading in Dec; Oracle was already at its later implementation by then.
- Historical implementation bytecode remains retrievable through archive RPC. Summary: `research/contract-forensics/HISTORICAL_IMPLEMENTATION_SNAPSHOTS.md`.
- Immediate next action: sample EIP-1967 slot across 12.0M–13.5M, binary-search each transition block, save unique implementation runtime/fingerprints, then inspect exact 17-Nov Core/Character logic and Hero-name/random-table assignment.

### Deep-recovery correction — Hero ID9/10 direct period-stat proof
- Production Character public arrays were read directly: `heroNames[0..20] = 1..21`, with parallel `heroTypes`, `heroClasses`, `attacks`, `armors`, `speeds`. Snapshot: `research/hero-id-mapping/onchain/character-template-table-20260903.tsv`.
- Independent calculator mirror `honeyvig/bnbhero`, Git commit `6cb15a4` dated 2021-12-06, contains literal Hero names plus base `[attack, armor, speed]` triples. Unique joins lock 17/21 numeric identities independently.
- This new evidence **corrects a prior mapping error**: ID9 is **Lena** (500/400/600); ID10 is **Sivalas Zefen** (600/300/600). The previous structural 9=Sivalas / 10=Lena inference is SUPERSEDED.
- Runtime `cards/9.png` and `cards/10.png` were swapped using the exact immutable period bytes from `archive/hero-art-20211118/`; `prototype/src/legacy-data.js` is corrected too. Previous pair archived at `archive/pre-hero-id-9-10-correction-20260903/`.
- Updated proof: `research/hero-id-mapping/PROOF.md` + `onchain/PERIOD_STAT_JOIN_PROOF.md`. Verifier now locks the corrected names/art files and 21-slot on-chain template snapshot.
- Remaining literal-name confidence: ID4 complete-set exclusion; ID19 class+roster (Legendary mage=Uriah); IDs20/21 ordered-roster structural because the period calculator duplicates one Legendary stat triple for all three.

### Deep-recovery sub-checkpoint — exact frontend-capture historical state recovered
- The clean frontend baseline capture time (~2021-11-17 19:08:01 UTC) was mapped by archive block-time binary search to BSC block **12,730,607**, timestamp **2021-11-17 19:08:02 UTC** (only +1 second). Full direct historical proxy-state snapshot: `research/contract-forensics/FRONTEND_CAPTURE_STATE_20211117.json`, generated by `snapshot-launch-state.mjs` through Alchemy public BNB archive RPC.
- Stable Character tables at the capture block differ materially from the 2026 snapshot previously feeding the simulator: `randomTable` differs at 93/100 entries and has exact rarity distribution Common 42 / Uncommon 30 / Rare 16 / Epic 9 / Legendary 3; current runtime table had no Legendary entries. `baseChances[6]` is **400** (not 280), which with Arnulf A600 yields the historically displayed 46% Zangrief chance. `baseBNBRewards` are `[0.003,0.0036,0.0042,0.0048,0.0054,0.006,0.024] BNB`; current runtime uses later-lowered rewards. `requiredHps` historical length is exactly 7 (`[200,200,200,200,200,200,400]`); the later snapshot has an extra unreachable eighth entry. Hero type/name/class/A/D/S arrays, enemy XP, Town timing/ratios are unchanged.
- Capture-block Oracle state is dynamic and therefore deliberately frozen to the frontend-capture block for offline preservation: `bnbhPrice=900772073805252084266`, recruit `270231622141575625279` wei BNBH, expedite `27023162214157562527`, and historical Town upgrade price vector recorded in the snapshot. `basePriceToUnlockInBNB=0.008 BNB`, `unlockRate=4`; direct `getUnlockLevelPrice(level)` samples prove the level formula. Historical `getTokenPrice()` itself reverts at this implementation; the legacy simulator's use of a later `getTokenPrice` value is therefore not launch-faithful.
- Historical token URI is directly proven as `https://metadata.bnbheroes.io/token/{tokenId}.json` (with `.json`). A fresh Common Crawl search specifically for this newly proven `.json` path found no surviving metadata captures. Direct metadata bodies therefore remain unrecovered; however, 17/21 identities are independently locked by period-stat joins, while IDs14/18 also retain their prior direct anchors. IDs4/19/20/21 keep explicit non-direct confidence labels.
- Immediate next action before runtime patch: inspect original UI/Core call semantics for `getUnlockLevelPrice`/`unlockLevel`, then replace only direct-proof historical Character/Oracle values in `legacy-data.js`, correct unlock-cost formula, add tests, run `forensics:all`, and browser-certify any visible price/gameplay changes.

### Deep-recovery sub-checkpoint — frontend-capture chain state promoted locally, focused tests PASS
- `prototype/src/legacy-data.js` now uses direct historical Character/Oracle state from BSC block **12,730,607** (2021-11-17 19:08:02 UTC), one second after the preserved frontend capture timestamp. This replaces the former 2026-derived RNG/reward/price state while preserving the stronger Hero ID9=Lena / ID10=Sivalas period-stat correction.
- Promoted historical differences: exact 100-entry RNG with rarity distribution 42/30/16/9/3; Zangrief base chance 400; base rewards `.003/.0036/.0042/.0048/.0054/.006/.024 BNB`; required-HP table length 7; capture-time recruit/expedite/Town prices; historical `.json` tokenURI; launch Oracle `bnbhPrice` and unlock constants. `getTokenPrice` was removed from preservation data because the launch-era Oracle implementation reverts for that selector.
- Unlock logic is corrected end-to-end: original Hero components pass `(tokenId,currentLevel)` to `getUnlockLevelPrice(currentLevel)`; engine and preservation provider now implement the direct historical formula `bnbhPrice * 0.008 * (100 + 4*level) / 100`, with exact wei samples locked in tests.
- Stale Hero test order was corrected to ID9=Lena / ID10=Sivalas. Focused `node tests/engine.test.mjs && node tests/provider.test.mjs` PASS after the historical-state promotion.
- This is **not committed/deployed yet**. Next gate: generate historical-state diff/timeline proofs, synchronize forensic docs/tasks, run `npm run forensics:all`, then commit/push and browser-certify visible Recruit/Town/Unlock/Boss values before declaring the deep-recovery runtime final.

### 2026-09-04 historical-state browser certification complete
- Actual repo state superseded the immediately preceding handoff sentence that said the historical-state batch was uncommitted: curated historical Character/Oracle state + Hero ID9/10 correction + proxy/implementation proofs were already committed and pushed as `31e5ad3` (`Restore frontend-capture historical game state`); local and `origin/restoration/native-ui-20260903` heads match at `31e5ad33a5065f5719ef6da6306dd4d975df2515`.
- Fresh `npm run forensics:all` PASS on that exact head: preservation verifier, engine/provider tests, and all 10 visual-forensics cases pass.
- Fresh HTTPS Vercel branch-preview certification PASS on `https://bnbheroes-revival-git-restoration-nati-89e999-phu-tans-projects.vercel.app/` using the Browser Host bridge.
- Home Recruit modal visibly renders `Use 270 BNBH to Recruit a New Hero!`, consistent with capture-block recruit price `270231622141575625279` wei BNBH and legacy integer formatting.
- Town Upgrade -> Bank Level 2 visibly renders `Use 67 BNBH to upgrade town` and the 24-hour upgrade duration from the capture-time Oracle state.
- Direct live-preview local-provider `eth_call` to preserved Oracle `getUnlockLevelPrice(1)` returns `7494423654059697341` wei, matching the historical formula now locked in engine/provider tests.
- Fight -> Boss Fight visibly renders Zangrief at **46% success / 400 HP / 0.024 BNB / 400 XP** for Arnulf A600, directly certifying the historical `baseChances[6]=400`, HP and reward tables in the deployed UI.
- No Recruit/Town/Unlock/Fight write transaction was executed during this certification pass; the existing local preservation save was not intentionally mutated.
- Browser certification report: `research/browser-regression/HISTORICAL_STATE_CERT_2026-09-04.md`. Raw boss screenshot is local/untracked at `research/browser-regression/2026-09-04-historical-state-boss.png` unless later curated.
- `research/CONTINUATION_TASKS.md` now marks the historical-state batch complete and explicitly lists the remaining fidelity ceiling: direct evidence for Hero IDs 4/19/20/21, exact byte recovery for the six missing hashed media, and any newly relevant historical implementation transitions. Do not replace verified period reconstructions or raise confidence labels without genuinely stronger evidence.

### 2026-09-04 final archaeology closeout — Character launch lineage + remaining ceiling
- User requested finishing quickly while preserving every significant research/change in handoff/task files. This checkpoint closes the currently actionable public-source archaeology rather than leaving an endless open loop.
- Exact Character implementation lineage from proxy deployment through the preserved frontend capture is now recovered: deploy block `12,641,026` uses `0xb0a5d98d...`; upgrades occur at `12,675,919` -> `0xec411735...` (tx `0xe3645725...`), `12,694,860` -> `0xa22ac137...` (tx `0xbd41e369...`), `12,700,016` -> `0x950e812b...` (tx `0xe8f9f404...`), and `12,712,496` -> capture implementation `0x36bd2664...` (tx `0x78e439dc...`). All four calls use ProxyAdmin selector `0x99a88ec4` targeting Character. Full hashes/data: `research/contract-forensics/CHARACTER_LAUNCH_LINEAGE_20260904.md/json`.
- Direct archive reads at deployment block `12,641,026` (2021-11-14 11:38:21 UTC) show `totalSupply=0` but target numeric Hero templates are already initialized: ID4 `(type2,class1,500/600/500)`, ID19 `(5,4,900/500/700)`, ID20 `(5,5,800/700/600)`, ID21 `(5,5,900/700/500)`. The tuples remain unchanged at every launch-week Character transition and match the block-12,730,607 frontend-capture table.
- Consequence: the former possible route “derive Asten/Duscair/Uriah from a later 18->21 template insertion/migration” is now directly ruled out. The full 21 numeric template layout existed before the first NFT mint. This improves provenance/continuity but **does not** create literal-name evidence, because chain state stores numeric `heroNameId`, not the human-readable name. Keep ID4 `HIGH_COMPLETE_SET`, ID19 `HIGH_CLASS_ROSTER`, ID20/21 `HIGH_STRUCTURAL`; do not falsely promote them to DIRECT.
- Initial Character implementation runtime is 19,932 bytes, raw SHA-256 `04b2166126ee59086c2dca780636de732c4c632cf59ca3fc6d5dcdb92519fdd4`; dispatcher contains `initialize()` selector `0x8129fc1c` and runtime code constructs 21-element template arrays, consistent with the direct deployment-block state.
- Final exact-byte/name-art pass found no stronger surviving public artifact than the evidence already curated. Six missing hashed media remain period-derived reconstructions with explicit labels; target Hero literal-name mappings remain non-direct where documented. Further progress now requires a genuinely new external/private artifact such as metadata bodies, original `/cards/{id}.png` bytes, a named NFT screenshot with token ID, or an old deployment backup.
- `research/CONTINUATION_TASKS.md` is intentionally changed from open-ended archaeology to a **closed highest-evidence ceiling**. This does not mean the four names/six hashes became byte-direct; it means all currently actionable public routes have been exhausted without fabricating certainty.
- No runtime/gameplay asset or mapping was changed in this final archaeology pass. Final `npm run forensics:all` **PASS**; curated launch-lineage proofs + historical-state browser certification evidence/docs were committed and pushed as `121b449` (`Close launch archaeology with exact Character lineage`) on `restoration/native-ui-20260903`. Local and `origin/restoration/native-ui-20260903` matched at `121b44900e4f89e796530b1898960f9662d48d2a` immediately after push. Because this closeout changes only research/provenance/docs and no runtime bytes, the already-certified `31e5ad3` runtime remains the deployed gameplay state; no redundant browser regression is required for this documentation-only head.

