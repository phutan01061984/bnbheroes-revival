# Historical EIP-1967 implementation snapshots

Read-only archive state was queried through Alchemy's public BNB endpoint after official BSC public nodes proved pruned for 2021 storage. These are the actual EIP-1967 implementation-slot values at historical blocks; they supersede any assumption that the 2026 current implementation was the launch implementation.

| Block / evidence time | Core | Character | Market | Oracle |
|---|---|---|---|---|
| 12,723,964 — 2021-11-17 13:07:30 UTC period gameplay tx | `0x986a1820498a636939a0b80eb8d12014e5d70b58` | `0x36bd26648ce81c1675dfa3bc640607a3ef0852f9` | `0x894d347281918c5307eb2e31ebb7d39a2f298be2` | `0xbd002cfa9a942c7f3a5771056d2f1482621ce07f` |
| 12,730,607 — 2021-11-17 19:08:02 UTC exact frontend capture | `0x986a1820498a636939a0b80eb8d12014e5d70b58` | `0x36bd26648ce81c1675dfa3bc640607a3ef0852f9` | `0xade9b8d6bf3c220e7d8c9b3ed7caccd4584473f1` | `0xbd002cfa9a942c7f3a5771056d2f1482621ce07f` |
| ~12,804,212 — 2021-11-20 period | `0xd282954c99bb22def05e7b6b66b12568c0671c62` | `0x400d7b2f50f586dc33fe522cb1a98c038836e5da` | `0xade9b8d6bf3c220e7d8c9b3ed7caccd4584473f1` | `0x247e23bace48bba978466675e663afaad082cb69` |
| 13,219,043 — 2021-12-05 period fight era | `0x37e3d60e9264df6aa98743654bf25a5492cbb2f4` | `0xbe67ac75b88a3205f580d30ca841bc8768b92258` | `0x20a5c35fa7fa3406153245bbfe6134279f57ac2d` | `0x247e23bace48bba978466675e663afaad082cb69` |
| 13,324,764 — 2021-12-09 period | `0x1874c696ebdb1ff3db84f86555edfe68d9facde4` | `0x3d833ffb8a19dda5e44fc34d5ab666fa24c6e9e6` | `0x3c72e11bd64bf0e2c0344b92a243bb9ca7e229aa` | `0x247e23bace48bba978466675e663afaad082cb69` |
| 13,350,000 | `0x8e701c08d88dd50623ef829bf4f68780f87cb524` | same as above | same as above | same as above |
| 13,400,000 | `0x7e12cb515361e1fd2adac92018e70ac76019b07d` | same as above | same as above | same as above |

Historical implementation bytecode is also still retrievable at those blocks. Therefore exact launch-era implementation recovery is feasible without relying on explorer source verification.

The transition immediately relevant to the preserved 17-Nov frontend is now exact: Market changed at block 12,724,583 (2021-11-17 13:41:38 UTC), tx `0x162f2c3e6122234aa382050c2786ca67721411295a759e9da780faa7d73c0f49`, from `0x894d...` to `0xade9...`. See `FRONTEND_CAPTURE_IMPLEMENTATIONS_20211117.md`. Broader Nov-Dec rows remain representative snapshots rather than a claim of a complete event timeline.
