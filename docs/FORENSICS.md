# BNB HEROES forensic reconstruction

## Verified legacy addresses (BNB Chain mainnet)
- BNBH token: `0xD25631648E3Ad4863332319E8E0d6f2A8EC6f267`
- Game core proxy: `0xde9fFb228C1789FEf3F08014498F2b16c57db855`
- BNBHCharacter proxy: `0x6DA72F24c56197Dcf6B8920baCb183F6ccca8b01`
- Rewards pool: `0xdE8c58d082d39D04DC2e5241a3a65911454674CD`
- Price oracle: `0xD160bbDED5cFF79b126443EefCB28F3b67991140`
- Randoms: `0xB81Cd7e88feAda830E7C1095909db3F5336d8664`

EIP-1967 implementations recovered on 2026-09-01:
- Core: `0x7e12cb515361e1fd2adac92018e70ac76019b07d`
- Character: `0x3d833ffb8a19dda5e44fc34d5ab666fa24c6e9e6`
- Oracle: `0x247e23bace48bba978466675e663afaad082cb69`

## Recovered state
- NFT name/symbol: `BNBHCharacter / BHC`
- Total minted / maxHeroesCount: 309,732
- 21 hero templates in storage.
- Normal recruit table uses only templates 0–17 in the first 100 slots; templates 18–20 are absent from normal rolls.
- Current 100-roll rarity mix from live state: Common 51, Uncommon 28, Rare 15, Epic 6, Legendary 0.
- Hero max HP 1000; regen 1 HP / 86 sec; recruit arrival delay 12h.
- Enemy base chance: 700, 670, 630, 590, 550, 510, 280 (per 1000).
- Enemy HP requirement: 200 for types 0–5, 400 for type 6.
- Legacy metadata URI was `https://metadata.bnbheroes.io/token/<id>`; hostname no longer resolves.

## Hero identity evidence
- `heroName=14`, template 13: **Arnulf of Esplin**, Rare Soldier, A600/D700/S400.
- `heroName=18`, template 17: **Elrik the Imbuer**, Epic Rogue, A900/D500/S500.
- Class IDs 1=Soldier and 3=Rogue are directly corroborated. IDs 2=Hunter, 4=Mage, 5=Knight follow the five-class ordering in surviving contemporary guides and remain to be independently corroborated.

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
