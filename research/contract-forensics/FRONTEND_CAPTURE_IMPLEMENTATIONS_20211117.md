# Exact proxy implementations at the preserved 17-Nov frontend capture

Evidence class: **DIRECT_HISTORICAL_EIP1967_STORAGE_AND_TRANSACTION**.

The preserved frontend capture at ~2021-11-17 19:08:01 UTC maps to BSC block **12,730,607**, timestamp **2021-11-17 19:08:02 UTC**. Direct reads of the EIP-1967 implementation slot at that block give:

| Proxy | Implementation at block 12,730,607 |
|---|---|
| Core | `0x986a1820498a636939a0b80eb8d12014e5d70b58` |
| Character | `0x36bd26648ce81c1675dfa3bc640607a3ef0852f9` |
| Market | `0xade9b8d6bf3c220e7d8c9b3ed7caccd4584473f1` |
| Oracle | `0xbd002cfa9a942c7f3a5771056d2f1482621ce07f` |

## Market changed during 17-Nov, before the frontend capture

At period gameplay block 12,723,964 (13:07:30 UTC), Market still pointed at `0x894d347281918c5307eb2e31ebb7d39a2f298be2`.

Binary search of the historical EIP-1967 slot locks the transition boundary exactly:

- block **12,724,582**: old implementation still active;
- block **12,724,583**, **2021-11-17 13:41:38 UTC**: new implementation active;
- transaction: `0x162f2c3e6122234aa382050c2786ca67721411295a759e9da780faa7d73c0f49`;
- transaction calls ProxyAdmin `0xA6f76A3f9a42B184cAf05eb14D45C9d3C842e1fF` with selector `0x99a88ec4`, decoded as `upgrade(address proxy,address implementation)`;
- decoded proxy = Market `0x5CFFca0321b83dc873Bd2439aE7fEA10aE163fac`;
- decoded implementation = `0xADE9B8D6BF3c220e7d8c9b3eD7cAccD4584473F1`;
- receipt status is success and the Market proxy emits OpenZeppelin `Upgraded(address)`.

Therefore any restoration claiming to represent the **19:08 frontend capture** must use the `0xade9...` Market implementation lineage, not the earlier 13:07 `0x894d...` implementation.

The broader Nov-Dec implementation history contains many additional upgrades; `HISTORICAL_IMPLEMENTATION_SNAPSHOTS.md` records representative milestones. This file intentionally makes an exact claim only where the transition boundary and transaction were directly recovered.
