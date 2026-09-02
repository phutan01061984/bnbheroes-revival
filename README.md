# BNB HEROES Revival

A forensic restoration and playable preservation build of the abandoned 2021 BNB HEROES / BNBH game.

## Start everything

```bash
cd /workspace/bnbheroes-revival
npm start
```

Then open:

- Game: `http://localhost:8080/prototype/`
- Restored GitBook: `http://localhost:8080/gitbook/`

## What is implemented

The playable build restores the recoverable core loop: Hero recruitment and 12-hour arrival, expedite, original recruit probability table, Hero rarity/classes/stats, HP/stamina recovery, PvE/Boss fight formula, XP and stacked XP, Hero level unlocks, four Stronghold buildings, active Hero capacity, Hero Reserves, BNB reward vault and legacy withdrawal tax, a preservation Marketplace screen, activity/battle logs and responsive medieval UI.

The GitBook-style documentation reconstructs the original project's whitepaper and gameplay manual from dated 2021 material, surviving Solidity/client repositories and live BNB Chain state. Every section distinguishes on-chain-confirmed facts, 2021-documented facts and reconstructed preservation material.

Real-money and wallet writes are intentionally disabled. The old economic contracts remain useful as historical evidence, not as a safe deployment target.

## Project structure

- `prototype/` — complete playable browser preservation build
- `gitbook/` — restored searchable GitBook/whitepaper
- `research/chain-snapshot.json` — recovered live BSC state snapshot
- `research/snapshot-chain.mjs` — reproducible BSC state reader
- `docs/FORENSICS.md` — forensic notes and verified addresses
- `mirrors/` — recovered 2021 source/client repositories (local research copies)
- `tests/engine.test.mjs` — deterministic gameplay-engine tests

## Commands

```bash
npm test       # engine tests
npm run check  # syntax checks for game + GitBook
npm run snapshot # refresh live chain snapshot
npm start      # serve project on port 8080
```

## Archival limitations

The original `metadata.bnbheroes.io` contents and the exact old `play.bnbheroes.io` frontend bundle are no longer publicly reachable from their original hosts. Therefore missing Hero art/names, some enemy display names and exact original GitBook wording are not fabricated. The revival uses reconstructed medieval visuals while preserving the recovered numeric game model and marks historically uncertain content clearly.
