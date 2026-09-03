# Deep recovery checkpoint — 2026-09-03

This checkpoint records discoveries made after the visual-forensics milestone `2c34a40`.

## Production lineage discovered in Common Crawl
- Common Crawl `CC-MAIN-2022-05` preserves the `https://play.bnbheroes.io/` response captured at `2022-01-25T19:35:57Z`.
- Response header says `last-modified: Fri, 10 Dec 2021 10:54:18 GMT`.
- That production HTML references:
  - `/static/css/2.f4c56af9.chunk.css`
  - `/static/css/main.a8f26ba7.chunk.css`
  - `/static/js/2.89c86d0d.chunk.js`
  - `/static/js/main.c3f63d85.chunk.js`
  - lazy `/static/js/3.e84d78ad.chunk.js`
- The main/vendor/CSS artifacts had already been recovered locally under `research/play_forensics/recovered/original-build/`; the WARC record now gives them explicit production/date provenance.
- Exact WARC response saved at `research/media_hunt/deployment-artifacts/commoncrawl-20220125-play-root.warc-record`.

## Six missing static-media identities persist across builds
The same six hashed references survive unchanged through the recovered 16-Nov, 17-Nov and 10-Dec bundles:
- `fight.42bbd04e.png`
- `card.df50fb38.png`
- `card_lock.c211f00f.png`
- `recruit_card.aa5e12c7.png`
- `rewards.16b2db64.png`
- `You lose.00f95b2b.png`

This proves the current reconstruction gap is not caused by choosing the wrong frontend build. Public memento/archive probes still do not expose the original object bodies.

## Development/testnet contract pairs discovered in 10-Dec production bundle
- Core: dev `0xfC5A012A887134d942b93F67B5030D052A38732c` -> prod `0xde9fFb228C1789FEf3F08014498F2b16c57db855`
- Character: dev `0xf20551bd1dD34d3d58a167B645c94c408bEd9525` -> prod `0x6DA72F24c56197Dcf6B8920baCb183F6ccca8b01`
- Market: dev `0x0d75E6d46445FbaB2FF9d3F379BB11Fe374772aD` -> prod `0x5CFFca0321b83dc873Bd2439aE7fEA10aE163fac`
- BNBH: dev `0x0d69E5688B8BEbE66c13Cb1b234aFcad32376a43` -> prod `0xD25631648E3Ad4863332319E8E0d6f2A8EC6f267`
- Oracle: dev `0xa050fdB208c1d533D44eF277A598aF9001aE3d0a` -> prod `0xD160bbDED5cFF79b126443EefCB28F3b67991140`

Read-only `eth_getCode` at latest shows Core/Character/Market/Oracle dev+prod all share the same 2141-byte runtime code and SHA-256 `f493237b9d26fcb9d47fc3685d30e1e17c8302b5d84071394e77642cfa14cfcb`, strongly indicating the same proxy family. BNBH dev/prod are 7903-byte non-identical runtimes.

## 10-Dec ABI/state surface expands on 17-Nov
The later bundle exposes additional state/admin surfaces including `bannedList`, `bots`, `feeToLevelup`, `lastPriceUpdateTime`, `maintenanceMode`, `taxFee`, `minimumPrice`, `migrate`, and `migrate_table`.

Next: identify proxy implementation/admin/beacon slots and upgrade history, retrieve implementation bytecode, then use historical event/state evidence to refine the local simulator and Hero-name mapping.
