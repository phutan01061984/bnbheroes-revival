# 10-Dec-2021 production bundle contract discovery

Source artifact: `research/play_forensics/recovered/original-build/static/js/main.c3f63d85.chunk.js`, independently dated/provenanced by the Common Crawl production HTML documented in `research/media_hunt/deployment-artifacts/PROOF.md`.

The build contains explicit development/testnet -> production address pairs:

| Contract | Development / BSC testnet | Production / BSC mainnet |
|---|---|---|
| Core | `0xfC5A012A887134d942b93F67B5030D052A38732c` | `0xde9fFb228C1789FEf3F08014498F2b16c57db855` |
| Character | `0xf20551bd1dD34d3d58a167B645c94c408bEd9525` | `0x6DA72F24c56197Dcf6B8920baCb183F6ccca8b01` |
| Market | `0x0d75E6d46445FbaB2FF9d3F379BB11Fe374772aD` | `0x5CFFca0321b83dc873Bd2439aE7fEA10aE163fac` |
| BNBH | `0x0d69E5688B8BEbE66c13Cb1b234aFcad32376a43` | `0xD25631648E3Ad4863332319E8E0d6f2A8EC6f267` |
| Oracle | `0xa050fdB208c1d533D44eF277A598aF9001aE3d0a` | `0xD160bbDED5cFF79b126443EefCB28F3b67991140` |

Read-only `eth_getCode` against public BSC mainnet/testnet RPC on 2026-09-03 returned identical 2,141-byte runtime code for Core/Character/Market/Oracle across both networks, SHA-256:

`f493237b9d26fcb9d47fc3685d30e1e17c8302b5d84071394e77642cfa14cfcb`

This strongly indicates a shared proxy runtime rather than the implementation logic itself. BNBH is non-identical across networks (both 7,903 bytes) and is treated separately.

The Dec-10 ABI also exposes later-state/admin surfaces not prominent in the Nov-17 snapshot, including `bannedList`, `bots`, `feeToLevelup`, `lastPriceUpdateTime`, `maintenanceMode`, `taxFee`, `minimumPrice`, `migrate`, and `migrate_table`. These are evidence for deeper historical-state reconstruction; they do not by themselves justify changing the preservation simulator.
