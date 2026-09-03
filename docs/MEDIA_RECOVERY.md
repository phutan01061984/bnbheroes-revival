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

## Update — 2026-09-03 recovery milestone

### Enemies 1–7

Enemy runtime names/types are locked from the original 17 Nov 2021 bundle.

- 1/2/3: first-party Level-1 enemy sheet left/center/right promoted as transparent derivatives.
- 4: Red Skull Archer — original `/enemies/4.png` anchor matches the left Level-2 crop (59/63 direct proof; 251 inliers in the initial comparison).
- 6: Red Skull Mage — historical bot `mage1.bmp` matches the middle Level-2 crop at 0.9721, scale 1.0.
- 5: Red Skull Assasin — the remaining right Level-2 crop after Archer/Mage are independently locked.
- 7: Zangrief — direct original byte was not recovered. A transparent 500x600 runtime reconstruction was made from the period `boss-win.png` screenshot, cross-validated against the 17 Nov 2021 production gameplay video that shows the Chapter-1 boss fight.

Proof:
- `research/media_hunt/gitbook-legacy/segmentation/TIER2_MAPPING_PROOF.md`
- `research/media_hunt/derivatives/enemies/ZANGRIEF_PROOF.md`
- `research/media_hunt/derivatives/enemies/PROOF.json`

### Barracks `towns/3-1.png`

This is no longer a blank placeholder.

The archived first-party `bnbheroes.xyz` HTML explicitly labels:
- `Level-1.png` as `Level 1 Barracks`
- `Level-4.png` as `Level 4 Barracks`

`Level-1.png` is a real alpha PNG. It matches the 2021 Zhihu gameplay screenshot with 125 RANSAC inliers. A known original town layer (`towns/1-1.png`) matches the same screenshot with 153 inliers. Composing the two homographies maps the Barracks into the original 1920x1080 town coordinate system. The resulting period-original reconstruction is now `towns/3-1.png`.

Proof: `research/media_hunt/barracks-analysis/TOWN_3_1_PROOF.json`.

### GitBook legacy archive exhaustion

The public legacy Space storage has now been enumerated rather than guessed:
- 189 historical document objects recovered.
- 20 total publicly listable asset objects recovered for Space `-MiQ2_ADbmPLGvENAQw4`.

This materially lowers the chance that Zangrief/card/result art is hiding in an unenumerated GitBook sibling path.

### Still not direct-byte recovered

The following original hashed client files still lack their direct 2021 bytes after GitBook-storage enumeration, archive searches, period video/screenshots and old-host archaeology:

- `fight.42bbd04e.png`
- `card.df50fb38.png`
- `card_lock.c211f00f.png`
- `recruit_card.aa5e12c7.png`
- `rewards.16b2db64.png`
- `You lose.00f95b2b.png`

Current runtime versions of these are reconstruction/placeholders and must not be described as byte-identical originals. `FIGHT.png` / `FIGHT (1).png`, bot crops, and period gameplay video remain the best visual references if a later creative reconstruction is desired.

## Update — 2026-09-03 final hashed-media checkpoint

The old six-file hashed-media queue is no longer an unresolved runtime blocker. Direct original bytes are still missing, but five files now use period/first-party pixels and one is explicitly retained as a creative reconstruction.

- `card.df50fb38.png`: official-video median reconstruction from 210 repeated open-card occurrences; 459×654.
- `card_lock.c211f00f.png`: official-video median reconstruction from 51 repeated locked-card occurrences; 459×654.
- `recruit_card.aa5e12c7.png`: adapted from first-party `BNBH-Card-Back.png`; strongest official-video SIFT/RANSAC match = 195 inliers. Center-cropped to runtime aspect and resized to 459×654.
- `rewards.16b2db64.png`: win RESULT artwork reconstructed from period win/lose frame differential; original bundle confirms width=500px in the RESULT modal.
- `You lose.00f95b2b.png`: loss RESULT artwork reconstructed from the corresponding period loss-frame set; original bundle confirms the `Q.rewards == 0` condition and width=500px.
- `fight.42bbd04e.png`: direct/period pixel source still not recovered. Runtime keeps the existing crossed-weapons creative reconstruction; it is explicitly **not original**.

Detailed provenance and hashes: `research/media_hunt/final-promotions/PROVENANCE.md`.

After promotion, `npm run check:all` passes. A live local HTTP check also returned HTTP 200 for all six hashed media plus enemies 1/7 and Barracks `towns/3-1.png`. Browser Host Bridge cannot reach the container's `127.0.0.1`; no Chromium binary is installed in the container, so a true visual browser regression remains open rather than falsely marked complete.
