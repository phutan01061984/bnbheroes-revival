# BNB HEROES Revival

Forensic restoration of the abandoned 2021 BNB HEROES / BNBH game.

## Run the playable preservation prototype
```bash
cd prototype
python3 -m http.server 8080
# open http://localhost:8080
```

The prototype reproduces recovered recruit, HP/stamina, fight, reward, rarity and stronghold parameters locally. Real-money and wallet actions are intentionally disabled.

## Structure
- `prototype/` playable browser build
- `research/chain-snapshot.json` live BSC state snapshot
- `research/snapshot-chain.mjs` reproducible chain reader
- `docs/FORENSICS.md` reconstruction notes and verified addresses
- `mirrors/` recovered third-party/source repositories
- `tests/engine.test.mjs` deterministic engine checks

Run tests with `node tests/engine.test.mjs`.
