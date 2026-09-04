# Character launch lineage — exact 14–17 Nov 2021 transitions

Recovered 2026-09-04 with read-only BSC archive RPC. This closes the specific hypothesis that Hero IDs 19–21 may have been inserted/remapped by a post-deploy Character migration.

## Exact implementation lineage

Character proxy: `0x6DA72F24c56197Dcf6B8920baCb183F6ccca8b01`  
ProxyAdmin: `0xA6f76A3f9a42B184cAf05eb14D45C9d3C842e1fF`

| Active from block | UTC | Implementation | Upgrade transaction |
|---:|---|---|---|
| 12,641,026 | 2021-11-14 11:38:21 | `0xb0a5d98d8d613b087704157006920e0518db4ec0` | proxy deployment/initializer block |
| 12,675,919 | 2021-11-15 18:35:53 | `0xec411735c2bcb9224eded102cd39a47063308658` | `0xe364572534e598da8f3cf143f9c99903a269ad1344d969d9e1c2d954f20d4596` |
| 12,694,860 | 2021-11-16 11:00:08 | `0xa22ac137d2b5196411bd86a2c87f5ec89dfd4a84` | `0xbd41e369f4ca37dd25a211b5ac45adc403d5340877e95386ce8be85890717bed` |
| 12,700,016 | 2021-11-16 15:43:04 | `0x950e812ba0046116174df4203fdd20f497571b94` | `0xe8f9f40434592f59217e254d8929c891aa0275dc8c5be0c2ffd39b7d39f80dd9` |
| 12,712,496 | 2021-11-17 02:39:38 | `0x36bd26648ce81c1675dfa3bc640607a3ef0852f9` | `0x78e439dcd6fc31db68a68abd2bfa71363bdb8324072fc74da2ae3054d0f9f1fc` |

All four transition transactions call ProxyAdmin selector `0x99a88ec4`, decoded elsewhere in this repo as `upgrade(address,address)`, targeting the Character proxy and the implementation shown above. The capture at block 12,730,607 (2021-11-17 19:08:02 UTC) is still on `0x36bd...`.

The initial implementation runtime is 19,932 bytes; raw runtime SHA-256 `04b2166126ee59086c2dca780636de732c4c632cf59ca3fc6d5dcdb92519fdd4`. Its dispatcher contains `initialize()` selector `0x8129fc1c`; bytecode around the initializer builds 21-element template arrays, consistent with direct post-initialize state reads below.

## Direct deployment-block Hero template state

At the end of deployment block 12,641,026, `totalSupply()` is **0**, but all four unresolved numeric template slots already exist:

| Template slot | heroNameId | type | class | attack | armor | speed |
|---:|---:|---:|---:|---:|---:|---:|
| 3 | 4 | 2 | 1 | 500 | 600 | 500 |
| 18 | 19 | 5 | 4 | 900 | 500 | 700 |
| 19 | 20 | 5 | 5 | 800 | 700 | 600 |
| 20 | 21 | 5 | 5 | 900 | 700 | 500 |

The same four tuples were directly re-read at each implementation transition start through block 12,712,496, and they match the existing exact frontend-capture state at block 12,730,607. Observed supplies at transition starts were 0, 3,934, 23,564, 24,830, and 29,053 respectively.

## Consequence for Hero-name archaeology

This **rejects the post-deploy insertion/migration hypothesis** for IDs 19–21: the 21-slot template layout, including IDs 4/19/20/21, was already initialized before the first Character NFT existed and remained numerically stable across the four launch-week upgrades.

It does **not** by itself turn the remaining literal-name assignments into direct name evidence because the contract stores numeric `heroNameId`, not the human-readable string. Therefore existing confidence labels remain correct:

- ID4 Aelof Orstone — `HIGH_COMPLETE_SET`;
- ID19 Uriah the Sage — `HIGH_CLASS_ROSTER`;
- ID20 Sir Asten — `HIGH_STRUCTURAL`;
- ID21 Duke Duscair IV — `HIGH_STRUCTURAL`.

Any future confidence upgrade now requires a surviving artifact that directly bridges numeric ID/artwork/token to a literal name (period metadata, `/cards/{id}.png` byte/archive mapping, named NFT screenshot/token ID, or equivalent). Additional Character implementation-history digging alone cannot distinguish Asten vs Duscair because their numeric templates were already fixed at deploy.
