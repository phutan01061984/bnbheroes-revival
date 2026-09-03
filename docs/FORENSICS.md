# BNB HEROES forensic reconstruction

## Verified legacy addresses (BNB Chain mainnet)
- BNBH token: `0xD25631648E3Ad4863332319E8E0d6f2A8EC6f267`
- Game core proxy: `0xde9fFb228C1789FEf3F08014498F2b16c57db855`
- BNBHCharacter proxy: `0x6DA72F24c56197Dcf6B8920baCb183F6ccca8b01`
- Rewards pool: `0xdE8c58d082d39D04DC2e5241a3a65911454674CD`
- Price oracle: `0xD160bbDED5cFF79b126443EefCB28F3b67991140`
- Randoms: `0xB81Cd7e88feAda830E7C1095909db3F5336d8664`

Exact EIP-1967 implementations at the preserved frontend-capture block **12,730,607** (2021-11-17 19:08:02 UTC):
- Core: `0x986a1820498a636939a0b80eb8d12014e5d70b58`
- Character: `0x36bd26648ce81c1675dfa3bc640607a3ef0852f9`
- Market: `0xade9b8d6bf3c220e7d8c9b3ed7caccd4584473f1`
- Oracle: `0xbd002cfa9a942c7f3a5771056d2f1482621ce07f`

Market changed from `0x894d...` to `0xade9...` at exact block **12,724,583** (2021-11-17 13:41:38 UTC), transaction `0x162f2c3e6122234aa382050c2786ca67721411295a759e9da780faa7d73c0f49`. See `research/contract-forensics/FRONTEND_CAPTURE_IMPLEMENTATIONS_20211117.md`.

## Recovered state at the 17-Nov frontend capture
- NFT name/symbol: `BNBHCharacter / BHC`
- `totalSupply=35,451`, `maxHeroesCount=35,450` at block 12,730,607.
- 21 hero templates in storage.
- Exact launch-era 100-roll table includes all five rarities, including templates 18–20 once each.
- Capture-block rarity mix: **Common 42, Uncommon 30, Rare 16, Epic 9, Legendary 3**.
- Hero max HP 1000; regen 1 HP / 86 sec; recruit arrival delay 12h.
- Enemy base chance: 700, 670, 630, 590, 550, 510, **400** (per 1000).
- Base BNB rewards: `.003, .0036, .0042, .0048, .0054, .006, .024` BNB.
- Enemy HP requirement: 200 for types 0–5, 400 for type 6.
- Historical metadata URI is directly recovered as `https://metadata.bnbheroes.io/token/<id>.json`; hostname no longer resolves and no archived metadata body has been recovered.

## Hero identity evidence
- `heroName=14`, template 13: **Arnulf of Esplin**, Rare Soldier, A600/D700/S400.
- `heroName=18`, template 17: **Elrik the Imbuer**, Epic Rogue, A900/D500/S500.
- Independent period calculator stats joined against the on-chain template arrays uniquely lock 17/21 literal identities. This corrects the former structural swap: **ID9=Lena**, **ID10=Sivalas Zefen**. IDs4/19/20/21 retain explicit non-direct confidence labels. See `research/hero-id-mapping/PROOF.md`.

## Source recovery
The repository `neko1101/hardhat-proxy-bnbh-example` was created 2021-11-27 and contains Solidity source for BNBHero, BNBHCharacter, BNBHPool, BNBHPriceOracle, ChainlinkRandoms and BNBHeroToken. Its behavior and constants match live BSC transactions and contract state closely, although live state has later parameter updates.

The repository `130347665/BNBHeroes` (Dec 2021) is a third-party Nim automation/client and independently embeds the same core, token and oracle addresses. It also documents the live contract ABI and enemyType 5 usage.

The address `0x9051e0E33aF188e25D421e64661Fc254a6A0a425` listed by some game databases is **not** the BNB HEROES game core. Runtime selector analysis shows it is a fee/liquidity BEP-20 style contract. It is retained only as a false-lead note.

## 2021 interface / documentation recovery
- A dated 2021-11-16 beginner walkthrough preserves the original feature flow: Recruit, Town upgrades, Marketplace, PvE, Boss Fight, withdrawals and Hero Reserves.
- The same walkthrough explicitly names the four Stronghold buildings as **Town Inn, Bank, Training Grounds and Barracks**. The numeric effects align with the four ranges in `baseTownRatio`.
- A dated 2021-11-04 overview preserves early token allocation, Oracle explanation, Hero rarity/stat concepts, weekly battle events and BNB Arena references.
- A November 2021 project release describes the later 70% Rewards Pool / 30% burn in-game spending policy and planned BNB Champions / BNB Mercenaries expansions.
- A contemporary exchange listing preserves the original GitBook URL: `bnbheroes.gitbook.io/bnbheroes`.

The `gitbook/` directory is therefore a **reconstructed preservation edition**, not a byte-for-byte copy of the lost GitBook. Pages label claims as on-chain-confirmed, 2021-documented or reconstructed. This is intentional: exact missing prose is not silently invented.

## Playable restoration coverage
The browser build currently implements: recruitment, the recovered 100-slot random table, 12-hour arrival, expedite, active Hero capacity, Hero Reserves, HP recovery, Attack/Armor/Speed combat, seven recovered encounter parameter sets, XP and stacked XP, level unlocks, Bank/Town Inn/Barracks/Training Grounds upgrades, BNB reward accumulation, 48-hour reward lock, declining withdrawal tax, local Marketplace preservation UI, activity log and responsive medieval interface.

The Marketplace settlement path is not claimed as recovered; Marketplace purchases in the preservation build are local simulations. Media provenance is now tracked asset-by-asset rather than described generically: all 21 Hero cards use surviving period artwork bytes, enemies/Barracks/card/result art mix direct and period-derived evidence, and `fight.42bbd04e.png` is explicitly labeled `RECONSTRUCTED_FROM_PERIOD_PIXELS` with supervised alpha/recomposition proof; its direct hashed bytes remain unrecovered. See `docs/MEDIA_RECOVERY.md` and `research/hero-id-mapping/PROOF.md`.

## Preservation rule
The revival prototype does not sign transactions, request private keys, or pay real BNB. The legacy economic layer should stay read-only until the old contracts and ownership/admin risks are fully audited.
