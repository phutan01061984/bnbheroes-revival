# Original 2021 UI compatibility adapter

Status: native local-provider bridge implemented; browser regression pending, 2026-09-03.

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

Read-only calls to the exact legacy oracle on 2026-09-03 matched the stored snapshot for:
- `getCharacterPrice = 6900820431868022675263`
- `getExpeditePrice = 690082043186802267526`
- the full 16-entry `getTownUpgradePrices`
- `getTokenPrice = 23002734772893408917546`
- `basePriceToUnlockInBNB = 8000000000000000`
- `unlockRate = 4`

`getUnlockLevelPrice(level)` is reproduced exactly with integer arithmetic:

`getTokenPrice * basePriceToUnlockInBNB * (100 + unlockRate * level) / 1e20`

Examples verified against the live read-only legacy oracle:
- level 0: `184021878183147271340`
- level 10: `257630629456406179876`

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

Still required before declaring the native-original UI fully browser-certified:
- visual/browser smoke of `/`, `/myheroes`, `/market`, `/battlelogs`, `/myreserve`, plus Recruit/Upgrade/Fight/RESULT flows on the deployed preview or Mac Browser Host Bridge.
