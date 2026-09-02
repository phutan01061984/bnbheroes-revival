# BNB HEROES Media Recovery Status

Last updated: 2026-09-02 late-session checkpoint.

See `AI_IDE_HANDOFF.md` for the full continuation state. This file is a compact media-specific ledger.

## Recovered original / period-original sources

- Original 17 Nov 2021 React/CSS build from `play.bnbheroes.io`.
- Later Dec 2021 React/CSS build.
- Official X media archive under `assets/reference/x/`.
- 21 Hero artworks from a Nov 18 2021 period article, archived under `archive/hero-art-20211118/`.
- Legacy `bnbheroes.xyz` media and archived first-party video `keyframe-My-Video.mp4`.
- Archived first-party `IMG_20211114_030807_117-1.png` (2369×2048, SHA-256 `e3ec617c9f1c6adbf9e8d9d7c839a4049e658972f6e7dbf875a6617f951bfc13`).
- GitBook legacy state in `research/media_hunt/gitbook-legacy/initial-state.json`.
- GitBook legacy images via `files.gitbook.com`, including `FIGHT.png`, `FIGHT (1).png`, `Enemies.jpg`, `Level 1 Skull Enemies.jpg`, `Level 2 Skull Enemies.jpg`, `BNB HEROES.png`.
- Five 1440×1080 gameplay screenshots from 2021 Zhihu material.
- Historical bot UI crops/full-screen captures.

## Enemy mapping locked from original React source

1. Red Skull 1
2. Red Skull 2
3. Red Skull 3
4. Red Skull Archer
5. Red Skull Assasin
6. Red Skull Mage
7. Zangrief (Chapter 1 Boss)

The Tier-1 and Tier-2 GitBook enemy sheets contain three enemy artworks each. Crops exist under `research/media_hunt/gitbook-legacy/segmentation/`, but exact left/middle/right mapping has not yet been promoted to production.

## Still missing original direct game-client bytes

- `fight.42bbd04e.png`
- `card.df50fb38.png`
- `card_lock.c211f00f.png`
- `recruit_card.aa5e12c7.png`
- `rewards.16b2db64.png`
- `You lose.00f95b2b.png`
- `towns/3-1.png`
- enemy sprites 1,2,3,5,6,7 as direct `/enemies/*.png` bytes

Do NOT recreate these yet unless period evidence is exhausted. GitBook sheets/screenshots/video likely allow faithful reconstruction for several of them.

## Hero identity anchors

- heroNameId 14 = Arnulf of Esplin
- heroNameId 18 = Elrik the Imbuer

Remaining 19 Hero artworks are real, but ID mapping remains unproven.

## Next media tasks

1. Lock enemy sheet order using original `/enemies/4.png` + visual/feature matching.
2. Extract frames from archived `keyframe-My-Video.mp4`.
3. Locate Zangrief / Boss artwork.
4. Map Hero IDs from official X/stat evidence.
5. Reconstruct Barracks/card/result media only from period references when raw bytes remain unavailable.
6. Integrate mapped media and rerun tests/browser smoke test.
