# Exact 17-Nov-2021 Gameplay Behavior Audit

Status: **DIRECT HISTORICAL CHAIN / FRONTEND EVIDENCE**  
Target frontend capture: **2021-11-17 19:08:01 UTC**  
Closest BSC block: **12,730,607 @ 2021-11-17 19:08:02 UTC**

This audit exists because the later ~27-Nov Solidity mirror differs materially from the implementation serving the preserved 17-Nov frontend. For preservation behavior, exact historical bytecode/state and the captured frontend take precedence.

## Corrections promoted into the simulator/provider

### Town upgrade timing

The raw Town level increments at upgrade start, but effective `getTownLevel()` remains one level lower until `lastUpgradedTimeStamp` expires. Engine state v3 therefore stores raw `towns[4]` plus `townUpgradeEnds[4]`; Town bonuses and Inn capacity use effective level. Existing v2 saves migrate old Town levels as completed rather than retroactively creating pending timers.

### Reserve / bag

Historical Core bag capacity is **10 Heroes**. Bag stamina is paused rather than healed for free. Direct historical examples used during verification include Hero **#6640** with bag HP **41** and Hero **#12208** with bag HP **29** across later blocks. The ABI has an important nuance: `getHeroesInBag()` exposes the paused HP view while direct Character `getHero()` can show timestamp-derived HP while Core owns the token; the provider preserves that distinction.

### XP cap and Fight

The exact 17-Nov Character implementation does **not** expose `stackedXp(uint256)`. Excess XP is discarded. Direct near-cap historical calls showed XP increases truncated to the visible cap, including **+59**, **+39**, and **+29** cases. A Hero at cap can still Fight and receive BNB; visible XP gain is then zero.

Core Fight math itself was separately checked on real historical Hero state and retained: success threshold, Barracks XP, Speed/Bank BNB reward and Armor HP reduction matched the exact implementation outputs.

### Unlock Level

The exact 17-Nov implementation and captured UI impose **no XP-cap prerequisite** for Unlock. Historical examples include:

- Hero **#90**: level 1 -> 2 at **XP 1850**; XP unchanged.
- Hero **#140**: level 2 -> 3 at **XP 2100**; XP unchanged.

The later full-XP guard and stacked-XP restoration therefore must not be backported into this snapshot. A/D/S growth remains tied to XP-thousand steps, not merely explicit unlocked level.

### Claim lock/tax

Exact Core bytecode confirms:

- first reward lock: **48 hours**;
- initial withdrawal tax: **20%**;
- tax falls by **2 percentage points per elapsed day** over ten days;
- claim requires strict `block.timestamp > unLockTime`, not equality.

### Town Inn regeneration bug

Exact historical calls show the Inn regeneration modifier does not change recovery speed: both calcTown false/true paths continue to resolve at **86 seconds per HP**. This matches a missing-assignment bug visible in the later mirror and is retained as historical behavior rather than "fixed" gameplay.

### Recruit / arrival

The exact snapshot uses **43,200 seconds (12 hours)** arrival time. Unlike the later mirror behavior, the 17-Nov implementation returns the real Hero fields plus remaining arrival countdown; it does not replace the Hero with a fake/mystery template.

## Historical Market world snapshot

`research/historical-world/MARKET_20211117_BLOCK12730607.json` contains **966/966 listings** at the aligned block, with historical Market `taxFee=10`. This is direct chain state, not a fabricated demo market.

Useful identity-search anchors for the four remaining non-direct Hero-name mappings:

- numeric ID4: token **#18227**, price 350 BNBH, L1, XP 1950
- numeric ID4: token **#35347**, price 200 BNBH, L1, XP 1000
- numeric ID4: token **#2522**, price 500 BNBH, L1, XP 1120
- numeric ID4: token **#764**, price 1000 BNBH, L1, XP 1350
- numeric ID4: token **#34458**, price 300 BNBH, L1, XP 1130
- numeric ID4: token **#3542**, price 1234 BNBH, L1, XP 1000
- numeric ID19: token **#5980**, price 7000 BNBH, L1, XP 1130
- numeric ID19: token **#29747**, price 5500 BNBH, L1, XP 1000
- numeric ID19: token **#14480**, price 6300 BNBH, L1, XP 1000
- numeric ID19: token **#8169**, price 15000 BNBH, L1, XP 1130
- numeric ID19: token **#6442**, price 11666 BNBH, L1, XP 1400
- numeric ID19: token **#19540**, price 8000 BNBH, L1, XP 1400
- numeric ID20: token **#28100**, price 7000 BNBH, L5, XP 1760
- numeric ID20: token **#34814**, price 2800 BNBH, L1, XP 1999
- numeric ID20: token **#5869**, price 10000 BNBH, L1, XP 1600
- numeric ID20: token **#5363**, price 7000 BNBH, L1, XP 1000
- numeric ID20: token **#14185**, price 2800 BNBH, L1, XP 1999
- numeric ID20: token **#1527**, price 8000 BNBH, L3, XP 1750
- numeric ID21: token **#30998**, price 6000 BNBH, L1, XP 1520
- numeric ID21: token **#29326**, price 5888 BNBH, L1, XP 1000
- numeric ID21: token **#31825**, price 3888 BNBH, L1, XP 1000
- numeric ID21: token **#11522**, price 4999 BNBH, L1, XP 1720
- numeric ID21: token **#28286**, price 7000 BNBH, L1, XP 1280
- numeric ID21: token **#23159**, price 6300 BNBH, L5, XP 1550

## Version separation rule

See `BUILD_IMPLEMENTATION_LINEAGE_20211116_20211210.json`. The 16-Nov, 17-Nov and 10-Dec frontend/build timestamps resolve to different Character/Market implementation sets. The honeyvig mirror starts around 27-Nov and is valuable for decoding storage/formulas, but it is never authoritative when it conflicts with exact 17-Nov evidence.

## Runtime files covered by this audit

- `prototype/src/engine.js`
- `preservation-provider.js`
- `tests/engine.test.mjs`
- `tests/provider.test.mjs`

Full preservation/visual forensic gate must pass before the batch is committed.
