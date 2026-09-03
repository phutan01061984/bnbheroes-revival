# Original 2021 UI compatibility adapter

Status: native local-provider bridge implemented and public-preview browser regression passed, 2026-09-03.

Goal: keep the recovered 17 Nov 2021 React/CSS UI visually intact while replacing its dead/unsafe BSC provider with deterministic local simulation. Real wallet signing, raw transactions and mainnet writes remain disabled.

## Contract surface used by the original bundle

A static scan of `static/js/main.5e2ca500.chunk.js` found 27 `.methods.*` calls. The compatibility provider implements the calls needed by the shipped UI rather than emulating a general blockchain node.

### Core/game writes
- `createNewHero().send({from})`
- `claimRewards().send({from})`
- `upgradeTown(townType).send({from})`
- `fight(heroTokenId, enemyType).send({from})`
- `expediteHero(heroId).send({from})`
- `unLockLevel(heroId).send({from})`
- `moveHeroToBag(heroId).send({from})`
- `takeHeroFromBag(heroId).send({from})`

### Hero/town/oracle reads
- `getHeroesByOwner(account, true).call()`
- `getHeroesInBag(account).call()`
- `getHero(heroId, calcTown).call()`
- `getTownLevel(account, townType).call()`
- `getTownsOfPlayer(account).call()`
- `unLockTime(account).call()`
- `getCharacterPrice().call()`
- `getTownUpgradePrices().call()` / `getTownUpgradePrice(...)`
- `getUnlockLevelPrice(level).call()`
- token/NFT `balanceOf`, `allowance`, `isApprovedForAll`

### Marketplace reads/writes used by the UI
- `getCharactersForPage(...)`
- `getCharactersForSeller(address)`
- `getNumberOfCharacterListings(...)`
- `canChangePrice(address, heroId)`
- `addListing(heroId, price)`

Local `addListing` follows the UI's documented 10% BNBH listing fee and moves the hero into the simulated market state. Existing archive-demo listings use a separate fake seller address.

### Approval writes
- ERC20 `approve(...)`
- NFT `setApprovalForAll(...)`

These are acknowledged locally only; no signature or network submission occurs.

## Exact legacy contracts retained as ABI/address identities

The 17 Nov 2021 bundle hard-codes:
- Gameplay/core: `0xde9fFb228C1789FEf3F08014498F2b16c57db855`
- BNBH token: `0xD25631648E3Ad4863332319E8E0d6f2A8EC6f267`
- Character/NFT: `0x6DA72F24c56197Dcf6B8920baCb183F6ccca8b01`
- Market: `0x5CFFca0321b83dc873Bd2439aE7fEA10aE163fac`
- Oracle: `0xD160bbDED5cFF79b126443EefCB28F3b67991140`
- Pool (snapshot dependency): `0xdE8c58d082d39D04DC2e5241a3a65911454674CD`

The addresses are preserved so the original Web3 contract objects and ABI routing remain meaningful, but all runtime calls are intercepted locally.

## Oracle fidelity

The preservation Oracle is now pinned to the exact historical state aligned with the frontend capture: BSC block **12,730,607**, 2021-11-17 19:08:02 UTC. Direct archive calls recover:
- `getCharacterPrice = 270231622141575625279`
- `getExpeditePrice = 27023162214157562527`
- the full 16-entry capture-time `getTownUpgradePrices`
- `bnbhPrice = 900772073805252084266`
- `basePriceToUnlockInBNB = 8000000000000000`
- `unlockRate = 4`

`getUnlockLevelPrice(level)` is reproduced exactly with integer arithmetic:

`bnbhPrice * basePriceToUnlockInBNB * (100 + unlockRate * level) / 1e20`

The launch-era Oracle implementation reverts for `getTokenPrice()`; that selector belongs to a later implementation and is deliberately not used by the preservation runtime. Examples verified directly at the capture block:
- level 0: `7206176590442016674`
- level 1: `7494423654059697341`
- level 10: `10088647226618823343`

The untouched Hero components pass the **current Hero level** into `getUnlockLevelPrice(level)` and render `Unlock LV. level+1`, so the local provider and simulator use the same semantics.

No live oracle is required at runtime; these inputs come from `prototype/src/legacy-data.js`.

## Fight-result receipt contract

The original UI consumes:
- `events.Fight.returnValues.rewards`
- `events.Fight.returnValues.xpGained`
- `events.Fight.returnValues.hpLoss`

`preservation-provider.js` therefore returns a synthetic mined receipt plus a correctly ABI-encoded `Fight` log. The original Web3 layer decodes that receipt and the original RESULT modal remains responsible for showing the win/loss art and values.

## Runtime integration

`preservation-provider.js`:
- installs a local EIP-1193/Web3-compatible provider at `window.ethereum`;
- reports chain id 56 only for compatibility with the original UI's BSC gate;
- uses fake local account `0xB000...0001`;
- imports the same `prototype/src/engine.js` and `legacy-data.js` used by the standalone revival;
- shares the same `bnbheroes-revival-v2` localStorage save;
- implements original ABI reads and writes locally;
- blocks `eth_sign`, `personal_sign`, `eth_signTransaction`, and `eth_sendRawTransaction`;
- contains no BSC/Infura RPC endpoint.

The runtime bundle has only minimal compatibility patches:
1. module 24's hard-coded `HttpProvider("https://bsc-dataseed.binance.org/")` is replaced by the local provider;
2. Web3Modal's WalletConnect RPC configuration is removed;
3. the original `se()` connect function resolves the local provider instead of opening a real wallet;
4. original auto-connect lifecycle is restored;
5. `connect:se` is restored.

`preservation-shim.js` no longer intercepts Recruit/Upgrade/Fight navigation. Those original React handlers are now allowed to execute through the local provider. The shim only keeps preservation metadata/badge and redirects the dead external GitBook link to the recovered local GitBook.

## Validation

`npm run check:all` currently passes and includes:
- syntax checks;
- preservation/static-runtime checks;
- engine tests;
- `tests/provider.test.mjs`, which verifies exact oracle values, hero/market ABI reads, a synthetic fight transaction/receipt, shared save state, and hard rejection of real signing/raw transactions.

Browser certification is complete on the restoration Vercel preview. Home, My Heroes, Marketplace maintenance state, Battle Logs, My Reserve, Recruit, Upgrade through Town L4, Fight/RESULT, Zangrief Boss, Claim and mobile 390×844 were exercised through the original React handlers/local provider. See `research/browser-regression/REPORT_2026-09-03.md`.

## Cross-version restoration: Recruit button

The untouched 17 Nov 2021 production bundle contains the full Recruit modal, approval and `createNewHero()` transaction logic, but its eligible Home Recruit icon was deliberately rendered with the Bootstrap `disabled` class and no click handler. This was a frontend switch, not a missing gameplay implementation.

A recovered original bundle from **16 Nov 2021** (`research/play_forensics/recovered/build-20211116/main.907e74c4.chunk.js`) contains the immediately preceding authentic handler for the same Home component. When the player has enough BNBH and the Town Inn is not full, it opens the existing Recruit modal and fetches `getCharacterPrice()` before enabling the normal historical flow.

The preservation runtime restores that exact 16 Nov handler inside the 17 Nov visual shell. No new Recruit UX was invented, and the untouched 17 Nov archive remains unchanged as evidence. This is intentionally classified as a **cross-version original-source restoration**, not a byte-identical 17 Nov snapshot.

## Public preview browser certification — 2026-09-03

The original React shell was exercised on the Vercel branch preview, not only through unit tests. Native Home, My Heroes, Recruit, Expedite, Reserve/Return, Town Upgrade, Basic Fight, Zangrief Boss Fight, win/loss RESULT, Claim and Battle Logs flows passed. The 2021 Marketplace maintenance screen is intentionally preserved because it exists in the untouched 17 Nov bundle. Correct mobile device detection was also smoke-tested with an iPhone Safari user agent at 390×844. See `research/browser-regression/REPORT_2026-09-03.md`.

Battle Logs historically depended on Bitquery GraphQL rather than Web3 RPC. `preservation-shim.js` now emulates only that retired query endpoint from structured local `battleHistory`, while the original React/Apollo component, query shape, table and pagination remain unchanged.
