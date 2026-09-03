# Hero numeric-ID stat join proof — 2026-09-03

## Direct on-chain side
Read-only calls to production Character proxy `0x6DA72F24c56197Dcf6B8920baCb183F6ccca8b01` expose public arrays `heroNames`, `heroTypes`, `heroClasses`, `attacks`, `armors`, and `speeds`. Slots 0..20 return `heroNames = 1..21` exactly; slot 21 is out of range. Snapshot is `character-template-table-20260903.tsv`.

## Independent period name/stat side
Mirror `mirrors/honeyvig-bnbhero` is Git commit `6cb15a4b7f6c7ce8a6f2fe777a6b071e39d56cec`, authored 2021-12-06. `src/util/hero.js` contains literal Hero names plus base `[attack, armor, speed]` triples used by an independent BNB HERO calculator.

17 literal heroes have unique triples that match one on-chain slot exactly:

| heroNameId | literal name | triple |
|---:|---|---|
|1|Dayne of Gerston|500/500/500|
|2|Andin Olis|500/500/600|
|3|Torlov Branhart|500/600/400|
|5|Jan Rhylen|500/700/300|
|6|Demisov the Bold|500/800/300|
|7|Esfel of Lordan|400/300/800|
|8|Reis of the Knife|500/300/800|
|9|Lena (calculator: Lena Ashwood)|500/400/600|
|10|Sivalas Zefen|600/300/600|
|11|Thalas One-Eye|700/300/600|
|12|Lady Ella of Tir|600/400/700|
|13|Sir Bertrand|600/600/500|
|14|Arnulf of Esplin|600/700/400|
|15|Balen Fellwood|700/500/500|
|16|Helia Stormcall|800/400/700|
|17|Xegis Branfyre|800/500/600|
|18|Elrik the Imbuer|900/500/500|

This independently falsifies the prior structural assignment `9=Sivalas / 10=Lena`: the on-chain stat fingerprints require `9=Lena / 10=Sivalas`.

## Remaining four
- ID4 is the only unmatched Uncommon slot and Aelof Orstone is the only unmatched old-roster Uncommon; complete-set exclusion supports ID4=Aelof.
- ID19 has class=4 (the same class used by period mages Lady Ella/Helia/Xegis), while among the three Legendary names Uriah is the mage in the period calculator. This strongly supports ID19=Uriah.
- IDs20/21 are both class=5; their literal assignment Sir Asten / Duke Duscair IV remains supported by the preserved ordered GitBook roster plus unchanged insertion model. The period calculator has an apparent copy error and repeats 800/700/600 for all three Legendary names, so it is not used to distinguish 20 from 21.

Provenance class: on-chain array values are DIRECT_STATE; literal-name joins are INDEPENDENT_PERIOD_STAT_MATCH where unique; remaining exclusion/order joins retain explicit structural labels.
