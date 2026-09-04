# Offline runtime audit — 2026-09-04

## Result

The BNB HEROES preservation runtime has no required remote JS/CSS/RPC dependency for normal play.

### Local runtime assets

`index.html` loads local copies of:

- Bootstrap CSS/JS
- ethers UMD
- preservation provider/shim
- exact recovered 2021 vendor/main JS
- exact recovered 2021 CSS

All referenced runtime media checked by `scripts/verify-preservation.mjs` exists locally.

### Chain/wallet

The recovered 2021 bundle is patched to resolve reads/wallet connection through `window.__BNBH_LOCAL_PROVIDER__`. The local provider contains no BSC/Infura/testnet endpoint and blocks real signing/raw transactions.

### Battle Logs / Bitquery

The historical Battle Logs component still points at `https://graphql.bitquery.io/`, but `preservation-shim.js` intercepts that request before network use and synthesizes the historical GraphQL shape from local battle history.

### External navigation links

Historical strings/links to BscScan, PancakeSwap and the old GitBook may remain as navigation provenance. They are not required runtime dependencies. Old GitBook `window.open` navigation is redirected to the recovered local `/gitbook/` copy.

### Local serving

`npm start` now uses `node scripts/serve.mjs` rather than Python's `http.server`. This removes an unnecessary interpreter dependency and preserves direct client-side routes such as `/market` by falling back to the root React index.

Smoke test on port 18080 returned HTTP 200 for:

- `/`
- `/market`
- `/prototype/`
- `/gitbook/`
- `/static/js/main.5e2ca500.chunk.js`
- `/static/css/main.433e3d53.chunk.css`

`npm run check:all` passes with regression assertions for offline assets/provider behavior and the exact 17-Nov Market maintenance state.
