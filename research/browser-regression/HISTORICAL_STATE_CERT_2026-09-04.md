# Historical frontend-capture state browser certification — 2026-09-04

Certified preview: `https://bnbheroes-revival-git-restoration-nati-89e999-phu-tans-projects.vercel.app/`

Certified Git branch/head: `restoration/native-ui-20260903` @ `31e5ad33a5065f5719ef6da6306dd4d975df2515` (`Restore frontend-capture historical game state`).

## Automated gates

`npm run forensics:all` PASS on the certified checkout.

This includes:
- syntax checks;
- preservation verifier;
- engine/provider tests;
- all 10 visual-forensics cases.

## HTTPS runtime checks

The browser host opened the live Vercel branch preview and exercised the original 2021 React UI with the local preservation provider. No real wallet or mainnet transaction path was enabled.

### Recruit

Home -> Recruit modal rendered:

- `Use 270 BNBH to Recruit a New Hero!`

This is consistent with capture-block Oracle recruit price `270231622141575625279` wei BNBH, rounded by the legacy UI.

### Town upgrade

Home -> Town Upgrade (Bank Level 2) rendered:

- `Use 67 BNBH to upgrade town`
- `The town will be upgraded to next level in 24 hours`

This is the visible legacy formatting of the capture-time Town upgrade price supplied by the preservation provider.

### Unlock price RPC

The live preview preservation provider was queried directly through the same injected `eth_call` path used by the original Web3 UI:

- contract: preserved Oracle address `0xd160bbded5cff79b126443eefcb28f3b67991140`
- call: `getUnlockLevelPrice(1)` selector `0xd5ee917d`
- returned wei: `7494423654059697341`

This matches the promoted historical formula locked by tests: `bnbhPrice * 0.008 * (100 + 4*level) / 100`.

### Boss

Fight -> Boss Fight rendered the period-consistent Zangrief values for Arnulf (A=600):

- `SUCCESS CHANCE 46%`
- `HP REQUIRED TO FIGHT 400`
- `BASE BNB 0.024`
- `XP 400`

This directly validates the historical Character capture state (`baseChances[6]=400`, required HP 400, reward 0.024 BNB) in the deployed UI.

## Save-state safety

The certification did not execute Recruit, Town upgrade, Unlock, or Fight writes. The existing local preservation save was therefore not intentionally mutated by this pass.

## Result

PASS. The frontend-capture historical-state batch is deployed and browser-certified on the restoration branch preview.
