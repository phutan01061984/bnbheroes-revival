# Final HTTPS browser certification — 2026-09-04

Target branch: `restoration/native-ui-20260903`

Certified source commit before this report-only checkpoint: `955b673e46aa2a75bb619b235279f20cd44ad1f4` (`Record full forensic certification`).

Vercel deployment:

- Deployment ID: `Fe43MPNxGZPq5wJeELUEomUvDhaZ`
- Status: **Ready**
- Environment: **Preview**
- Source shown by Vercel: `restoration/native-ui-20260903` @ `955b673`
- Branch alias: `https://bnbheroes-revival-git-restoration-nati-89e999-phu-tans-projects.vercel.app/`
- Immutable deployment domain: `https://bnbheroes-revival-62io5ev3a-phu-tans-projects.vercel.app/`

## Full local forensic gate

After reinstalling Python/OpenCV in the Alpine local-coder container:

`npm run forensics:all` => **PASS**

This includes:

- preservation verifier PASS;
- engine/provider tests PASS;
- Town all-L4 visual comparison PASS;
- all eight Townselect L2/L3 period-preview comparisons PASS;
- Fight period recomposition PASS;
- visual-forensics overall PASS.

## HTTPS browser smoke

All checks below were performed against the branch alias above while Vercel reported source commit `955b673`.

### `/`
PASS.

Observed:

- original BNBHeroes home scene renders;
- local preservation wallet auto-connects as `0xb000...0001`;
- BNB/BNBH balances and claim timer render;
- Recruit / My Heroes / My Reserve / Upgrade / Market / Battlelog / GitBook / Fight affordances render;
- `2021 PRESERVATION · Local wallet emulator` badge renders.

Evidence: `research/browser-regression/evidence/2026-09-04-final-home-955b673.jpg`.

### Runtime v3 marker
PASS.

Fetching `/prototype/src/engine.js` from the HTTPS preview shows the v3 restore path and the exact-17-Nov notes for Town pending state / later-era `stackedXp` removal.

### `/market`
PASS.

Exact target-era message preserved:

`Sorry. We are in maintenance mode for a while.`

No later Buy/Cancel/Change Price UI is backported.

### `/myheroes`
PASS.

The page rendered Hero NFT #0 with XP `1100/1999`, level unlock action, HP/stats, Fight, Sell, Move To Reserve, Recruit and Town Inn upgrade controls.

### `/fight/0`
PASS.

Rendered Chapter 1, Hero selection and enemy tiers. Tier 1 showed 76% success, 200 HP requirement, 0.003 base BNB / 100 XP; Tier 2 showed 65%, 200 HP, 0.0048 BNB / 130 XP.

### `/battlelogs`
PASS.

Local Bitquery-compatible adapter rendered historical/local fight rows without requiring the retired external GraphQL service.

### `/myreserve`
PASS.

Reserve route renders successfully under the local provider.

### `/gitbook/`
PASS.

Recovered GitBook loads with gameplay/economy/technical/provenance sections and no original GitBook dependency.

### `/prototype/`
PASS.

Revival UI loads with local balances, recruitment price, all four Stronghold branches and historical references.

## Result

The exact branch deployment corresponding to the latest gameplay/forensics batch is browser-certified **PASS**. Production `bnbheroes-revival.vercel.app` was still on the older `main` deployment at the time of this certification; do not confuse it with the certified branch preview unless a later promotion is explicitly recorded.

## Production promotion

After the preview certification, commit `49ab900` was promoted through the authenticated Vercel dashboard.

- Production deployment: `GQkhbNneDHk7ikCCKzGG6X5uzJhj`
- Environment: **Production**
- Status: **Ready**
- Source: `restoration/native-ui-20260903 @ 49ab900`
- Production alias: `https://bnbheroes-revival.vercel.app/`

Production HTTPS verification PASS: the Home route renders the preservation UI/local wallet; `/prototype/src/engine.js` contains the v3/exact-17-Nov state path; `/market` retains `Sorry. We are in maintenance mode for a while.`

The promotion changes the Vercel production pointer only; Git `main` was not merged, rebased or force-pushed.
