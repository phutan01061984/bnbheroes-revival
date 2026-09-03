# BNB HEROES Revival / Preservation — AI IDE Handoff

> **READ THIS FILE FIRST. DO NOT REDO THE FORENSIC RESEARCH FROM ZERO.**
>
> This repository contains a preservation-grade recovery of the original 2021 BNB HEROES web client plus a safe playable reconstruction and restored GitBook. The original project's real-money/wallet layer is intentionally disabled.

Last handoff update: **2026-09-02**  
Working directory used during recovery: `/workspace/bnbheroes-revival`

---

## 1. What this project is now

There are three useful surfaces:

1. **`/` — Original 17 Nov 2021 frontend preservation**
   - Recovered HTML/CSS/React bundle from `play.bnbheroes.io`.
   - Uses the original 2021 component tree, routes, class names, layout, CSS, fonts and surviving assets.
   - Auto wallet connection is removed.
   - Real transaction actions are blocked by `preservation-shim.js`.
   - Missing historical images are represented by explicitly documented neutral/reconstructed fallbacks; do not mislabel them as original.

2. **`/prototype/` — Safe playable revival**
   - LocalStorage simulation.
   - No wallet signing or real funds.
   - Reimplements recovered recruitment, combat, town, XP, reserve and BNB claim rules.
   - Existing tests: `tests/engine.test.mjs`.

3. **`/gitbook/` — Restored GitBook**
   - Preservation reconstruction of the old documentation.
   - Marks on-chain confirmed / 2021 documented / reconstructed claims.

The former custom revival landing page is preserved as `revival-landing.html` after promotion of the original game UI to `/`.

---

## 2. First commands for any new AI / IDE

```bash
cd /workspace/bnbheroes-revival
npm run check:all
python3 -m http.server 8080 --directory .
```

Then open:

- `http://localhost:8080/`
- `http://localhost:8080/prototype/`
- `http://localhost:8080/gitbook/`

For the original SPA, direct-route refreshes require Vercel rewrites (defined in `vercel.json`) or a history-fallback server.

Before editing the recovered original client, compare against:

```bash
cd archive/original-20211117
sha256sum -c SHA256SUMS
```

**Never modify `archive/original-20211117/`.** It is the clean evidence baseline.

---

## 3. Automated preservation verifier

Run:

```bash
npm run verify:preservation
```

It checks:

- core recovered HTML/JS/CSS/assets exist;
- production bundle no longer auto-connects a wallet;
- the wallet-disabled patch marker exists;
- every `static/media/*` file referenced by recovered JS/CSS exists;
- clean original archive still contains original 2021 auto-connect code (evidence only);
- playable revival and GitBook still exist.

Full regression command:

```bash
npm run check:all
```

This runs existing syntax checks, preservation verification and engine tests.

---

## 4. Clean original frontend baseline

Clean archive:

`archive/original-20211117/`

Recovered capture set:

- root HTML: archive capture around **2021-11-17 19:08:01 UTC**
- vendor JS: `static/js/2.04f79657.chunk.js`, around **2021-11-17 19:12:38 UTC**
- main JS: `static/js/main.5e2ca500.chunk.js`, around **2021-11-17 19:12:48 UTC**
- vendor CSS: `static/css/2.f4c56af9.chunk.css`
- main CSS: `static/css/main.433e3d53.chunk.css`, archived around **2021-11-16 07:41:33 UTC**

Baseline hashes are in:

`archive/original-20211117/SHA256SUMS`

Important known hashes:

- original `main.5e2ca500.chunk.js`: `c5e5b850aaa7cc49b769f09bd95161029d0874dd3f8553a8f399975a8cbfc4bb`
- original `main.433e3d53.chunk.css`: `ced75e42b93a67a7099c1db14fe42409de01a241ef94e753915e351fc494bb3f`

A later December build was also recovered under raw forensic working files at:

`research/play_forensics/recovered/original-build/`

That later build added API calls such as `https://bnbheroes.io/api/fight.php` and market behavior. Use it for behavioral comparison, **not** as the default visual baseline unless deliberately changing the preservation date.

---

## 5. Production safety patches vs original bundle

Production root uses a copy of the Nov-17 bundle at:

`static/js/main.5e2ca500.chunk.js`

Two intentional wallet changes were made to the minified bundle:

1. original auto-connect call:

```js
se().then((function(){}))
```

was replaced with a resolved no-op.

2. the routed `connect: se` handler was replaced with an alert saying wallet connection is disabled in preservation mode.

`preservation-shim.js` additionally:

- exposes `window.__BNBH_PRESERVATION__`;
- redirects the dead original GitBook link to `/gitbook/`;
- intercepts Home **Upgrade** and **Fight** actions that would otherwise require the old contract transaction layer;
- shows a small preservation badge linking to the safe playable revival and restored GitBook.

### Non-negotiable safety rule

Do **not** restore real wallet signing, seed/private-key handling, or mainnet transaction sending in this preservation build.

If a real-money relaunch is ever desired, build a **new audited economic/smart-contract layer** after a security review. Do not simply re-enable the historical contracts.

---

## 6. Original 2021 routes recovered from the React client

The Nov-17 bundle contains these routes:

- `/`
- `/myheroes`
- `/market`
- `/fight/:id`
- `/battlelogs`
- `/myreserve`

`vercel.json` rewrites these direct routes back to `index.html` so BrowserRouter works after refresh.

Original public asset path patterns used by the client include:

- `/backgrounds/myheroes-bg.jpg`
- `/backgrounds/market.jpg`
- `/backgrounds/village.jpg`
- `/backgrounds/battlelog-bg.jpg`
- `/towns/background.jpg`
- `/towns/objects.png`
- `/towns/{1..4}-{level}.png`
- `/townselect/{town}-{level}.png`
- `/cards/{heroNameId}.png`
- `/cards/unkown.png` (original spelling in source)
- `/enemies/{1..8}.png`

---

## 7. Historical UI assets: what is original and what is fallback

### Recovered original/surviving assets used in production

Examples:

- `backgrounds/village.jpg`
- `backgrounds/market.jpg`
- `backgrounds/myheroes-bg.jpg`
- `backgrounds/battlelog-bg.jpg`
- `towns/background.jpg` — 1920×1080
- `towns/objects.png` — 1920×1080
- `towns/1-1.png` — 1920×1080
- `towns/2-1.png` — 1920×1080
- `towns/4-1.png` — 1920×1080
- `static/media/Recruit.67f5fa05.png`
- `static/media/heroes.7105c3d9.png`
- `static/media/myreserve.31e6d624.png`
- `static/media/upgrade.032dc018.png`
- `static/media/Market.bf10d207.png`
- `static/media/battlelog.d20da706.png`
- `static/media/git book.8ce64c07.png`
- `static/media/GODOFWAR.edd836b7.TTF`
- `static/media/Hexa.f5c4a64d.png`
- `static/media/Ribbon.74c61692.png`
- BNB / BNBH HUD assets and info panels.

The hashed backgrounds that Wayback returned as failed/error payloads are replaced with the surviving public-path backgrounds of the same purpose:

- `static/media/Village.64091b0b.jpg` ← `backgrounds/village.jpg`
- `static/media/myheroes-bg.3c5effac.jpg` ← `backgrounds/myheroes-bg.jpg`

### Recovered/reconstructed assets whose original hashed bytes did not survive

The current runtime no longer uses the early neutral placeholders for Barracks, enemies, Hero cards, or RESULT art. Provenance is explicit:

- `static/media/fight.42bbd04e.png`
  - **CREATIVE_RECONSTRUCTION** only. Direct/period pixels for the original Fight icon were not recovered after GitBook, old-host, archive, bundle, urlscan, repo/CDN and video searches. Do not call it original.
- `towns/3-1.png`
  - **PERIOD_RECONSTRUCTION** from first-party `Level-1.png` explicitly labeled `Level 1 Barracks`, positioned into the 1920×1080 town coordinate system via period screenshot homography.
- `static/media/card.df50fb38.png` / `card_lock.c211f00f.png`
  - **RECONSTRUCTED_FROM_PERIOD_PIXELS** by median stacking repeated card appearances in the official 2021 minting video.
- `static/media/recruit_card.aa5e12c7.png`
  - **FIRST_PARTY_PERIOD_ART_ADAPTED** from archived `BNBH-Card-Back.png`, independently matched to official video (195 RANSAC inliers).
- `static/media/rewards.16b2db64.png` / `You lose.00f95b2b.png`
  - **RECONSTRUCTED_FROM_PERIOD_PIXELS** from corresponding 2021 win/loss footage while preserving dynamic RESULT text as DOM.
- `/enemies/1.png` … `/enemies/6.png`
  - evidence-backed derivatives from first-party GitBook Level-1/Level-2 sheets; type mapping is documented in the enemy proof reports.
- `/enemies/7.png`
  - **PERIOD_RECONSTRUCTION** of Zangrief from 17-Nov production video plus higher-resolution 8-Dec period screenshot.
- `/cards/1.png` … `/cards/21.png`
  - **EXACT PERIOD ART BYTES** copied byte-for-byte from `archive/hero-art-20211118/` according to `research/hero-id-mapping/heroNameId-final.tsv`; IDs 14/18 are direct numeric anchors and the other 19 are explicitly high-confidence structural mappings.
- `/townselect/*`
  - still transparent preservation fallbacks where no source art was recovered. This is the remaining known visual fallback family besides the reconstructed Fight icon.

### Why we do not silently fake missing art

The goal is historical fidelity. It is better to show a labeled/neutral fallback than to let an AI-generated asset become indistinguishable from surviving 2021 evidence.

---

## 8. 21 surviving Hero artworks (important)

A high-value period source was found:

`https://thisisgamethailand.com/uncategorized/bnb-heroes-play-to-earn/`

Article date: **18 Nov 2021**.

All 21 linked hero PNGs were recovered and archived at:

`archive/hero-art-20211118/`

Hashes:

`archive/hero-art-20211118/SHA256SUMS`

Source notes:

`archive/hero-art-20211118/SOURCE.md`

The recovered article art list includes:

- Aelof Orstone
- Andin Olis
- Arnulf of Esplin
- Balen Fellwood
- Dayne
- Duke Duscair IV
- Elrik the Imbuer
- Esfel
- Helia Stormcall
- Jan (source filename; identity needs confirmation)
- Lady Ella of Tir
- `Layer-1` (source filename; identity needs confirmation)
- Lena
- Reis of the Knife
- Sir Asten
- Sir Bertrand
- Sivalas
- Thalas One-Eye
- Torlov
- Uriah the Sage
- Xegis Branfyre

### Numeric Hero mapping — completed with confidence labels

The article order is alphabetical/editorial and was **not** used directly as `/cards/1.png ... /cards/21.png` order.

Final runtime mapping is documented in:

- `research/hero-id-mapping/PROOF.md`
- `research/hero-id-mapping/heroNameId-final.tsv`

Confidence policy:

- IDs **14 = Arnulf of Esplin** and **18 = Elrik the Imbuer** are `DIRECT_ANCHOR` mappings.
- The other 18 legacy-roster IDs are `HIGH_STRUCTURAL`, derived from the exact ordered 18-Hero GitBook Drop Rate roster merged with the exact 21-ID contract rarity structure.
- ID **10 = Lena** is `HIGH_STRUCTURAL_NEW_INSERT`: official period evidence says exactly three Heroes were added; after direct inserted anchors 14/18, Lena is the only period artwork/name outside the old 18-Hero roster and ID10 is the only remaining inserted rarity position.

All 21 runtime card files are byte-identical to their mapped period artwork source. Preservation verification asserts this on every run.

---

## 9. Character contract snapshot already recovered

`research/chain-snapshot.json` contains a live historical-state snapshot from BSC reads.

Character state:

- name: `BNBHCharacter`
- symbol: `BHC`
- totalSupply: `309732`
- maxHeroesCount: `309732`
- max HP: `1000`
- HP recovery: 1 HP per `86` seconds
- base active character limit: `2`
- hero arrival time: `43200` seconds = 12 hours
- 21 templates

Arrays:

```text
heroTypes   = [1,2,1,2,1,2,1,2,1,1,2,3,3,3,3,4,4,4,5,5,5]
heroNames   = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
heroClasses = [1,1,1,1,1,2,3,3,2,2,2,4,5,1,2,4,4,3,4,5,5]
attacks     = [500,500,500,500,500,500,400,500,500,600,700,600,600,600,700,800,800,900,900,800,900]
armors      = [500,500,600,600,700,800,300,300,400,300,300,400,600,700,500,400,500,500,500,700,700]
speeds      = [500,600,400,500,300,300,800,800,600,600,600,700,500,400,500,700,600,500,700,600,500]
```

Known class mapping with strongest evidence:

- class 1 = Soldier
- class 3 = Rogue

Likely but weaker historical mapping retained in the playable reconstruction:

- class 2 ≈ Hunter
- class 4 ≈ Mage
- class 5 ≈ Knight

Rarity types:

1. Common
2. Uncommon
3. Rare
4. Epic
5. Legendary

The recovered early recruit random table is in `research/chain-snapshot.json`; the first 100 slots were approximately:

- Common 51
- Uncommon 28
- Rare 15
- Epic 6
- Legendary 0

This illustrates version drift versus some early public probability tables. Do not assert one probability table as timeless across all 2021 builds.

---

## 10. Original enemy table — recovered directly from frontend

Do not use the older “unknown enemies 0–4” assumption anymore. The later recovered frontend contains their actual display names.

| type | UI name | success | base BNB reward | XP | HP required |
|---:|---|---:|---:|---:|---:|
| 1 | Red Skull 1 | 70% | 0.00235125 | 100 | 200 |
| 2 | Red Skull 2 | 67% | 0.0028215 | 110 | 200 |
| 3 | Red Skull 3 | 63% | 0.00329175 | 120 | 200 |
| 4 | Red Skull Archer | 59% | 0.003762 | 130 | 200 |
| 5 | Red Skull Assasin | 55% | 0.00423225 | 150 | 200 |
| 6 | Red Skull Mage | 51% | 0.0047025 | 200 | 200 |
| 7 | Zangrief | 28% | 0.0172425 | 400 | 400 |
| 8 | Boss 2 placeholder | variable | 1 | 2000 | 500 |

Keep the original spelling `Assasin` when documenting exact UI text; use `[sic]` if needed in prose.

Zangrief description recovered from the client:

> Your squad spots ZANGRIEF at the stronghold gates charging towards them. Defeat Him in order to claim the stronghold once and for all!

The Solidity-derived combat model implemented in `prototype/src/engine.js` uses the recovered base chances/rewards and hero stats.

---

## 11. Stronghold / town data

Correct building index order:

0. Bank
1. Town Inn
2. Barracks
3. Training Grounds

Recovered arrays:

```text
baseTownTimes = [
  0,24,24,48,
  0,24,24,48,
  0,24,24,48,
  0,24,24,24
]

baseTownRatio = [
  0,3,6,16,
  0,5,12,27,
  0,30,60,90,
  0,30,60,140
]
```

Recovered/intended effects used by the revival:

- Bank: BNB reward bonus, +3%, +6%, +16% at levels represented by ratios.
- Town Inn: active Hero capacity; historical guide also described HP/recovery benefit. There is source/version ambiguity around the HP implementation.
- Barracks: XP bonus +30 / +60 / +90.
- Training Grounds: Attack/Armor/Speed +30 / +60 / +140.

Do not rename/reorder these buildings based on visual guesswork.

---

## 12. Oracle and economy snapshot

Historical Oracle snapshot previously recovered:

- `getCharacterPrice ≈ 6900.820431868 BNBH`
- `getExpeditePrice ≈ 690.082043 BNBH`
- `characterPriceInBNB = 0.3 BNB`
- `getTokenPrice ≈ 23002.734772893 BNBH per BNB`
- `basePriceToUnlockInBNB = 0.008 BNB`
- `unlockRate = 4`
- `isStarted = true`

Public 2021 model:

- players acquire/spend BNBH for recruitment/upgrades/unlocks/etc.;
- Oracle dynamically converts BNB-denominated targets into BNBH amounts;
- PvE/Boss rewards are denominated in BNB;
- public material said roughly 70% of in-game spending supported the BNB Rewards Pool while 30% was burned;
- live Core getter `dividePercent = 70` supports the 70-side parameter, but do not oversimplify that into an unverified mechanical statement that every BNBH spend was literally converted 70/30 into BNB cash at the same instant;
- reward claims had a 48-hour lock and a tax schedule that falls over time.

The original economic model did not create external cash flow. If BNB reward outflows exceed realized external revenue/reserve replenishment, sustainability depends on new inflows and token demand. A modern relaunch should cap rewards to realized revenue/reserve coverage rather than promise unlimited P2E yield.

---

## 13. Verified historical contract addresses

BNB Smart Chain / BSC:

- BNBH token: `0xD25631648E3Ad4863332319E8E0d6f2A8EC6f267`
- Game Core proxy: `0xde9fFb228C1789FEf3F08014498F2b16c57db855`
- Character proxy: `0x6DA72F24c56197Dcf6B8920baCb183F6ccca8b01`
- BNBHPool: `0xdE8c58d082d39D04DC2e5241a3a65911454674CD`
- Oracle: `0xD160bbDED5cFF79b126443EefCB28F3b67991140`
- Randoms: `0xB81Cd7e88feAda830E7C1095909db3F5336d8664`
- Burn address/contract used by project: `0x0f3d164083275Bd690Db61445878786b290aaE9B`

EIP-1967 implementations recovered:

- Core: `0x7e12cb515361e1fd2adac92018e70ac76019b07d`
- Character: `0x3d833ffb8a19dda5e44fc34d5ab666fa24c6e9e6`
- Oracle: `0x247e23bace48bba978466675e663afaad082cb69`

Live/historical getters previously read:

- `firstLockTime = 172800` sec = 48h
- `maxHeroCount = 20`
- `dividePercent = 70`
- `numTokensToSend = 10000000000000000000000000`

Token max supply: **100,000,000 BNBH**.

### Important false lead — do not repeat this research

Address:

`0x9051e0E33aF188e25D421e64661Fc254a6A0a425`

was investigated and is **NOT** the BNB HEROES game core. Its runtime exposed fee/liquidity BEP-20 style behavior such as Pancake router / swap-and-liquify functions. This false lead is documented in `docs/FORENSICS.md` and research files such as `research/9051_*`.

---

## 14. Recovered source/code mirrors

Useful historical mirrors in `mirrors/` include:

### `hardhat-proxy-bnbh-example`

Recovered Solidity resembling the production contracts:

- BNBHero Core
- Character / HeroLibrary
- BNBHPool interfaces
- Oracle
- Randoms
- Token
- proxy-era deployment examples

This is extremely useful for mechanics, but treat it as an historical source mirror, not automatically as the exact final mainnet source at every date.

### `130347665-BNBHeroes`

Third-party Dec-2021 Nim automation/bot with real production addresses and ABI usage.

It corroborates production calls such as fight/recruit/upgrade/expedite and Mage/Boss flow.

**Security warning:** this mirror contains old credential/private-key-style automation logic. Never expose, reuse, publish or operationalize secrets from it.

### `bnb-heroes-bot` / pathawee1993-style AutoIt bot

Contains many BMP UI fragments and two very valuable 1920×1080 full-screen captures. These were used for UI archaeology.

Useful local evidence paths include:

- `mirrors/bnb-heroes-bot/_imageAll/...`
- `research/play_forensics/confirmedTransaction1-full.png`
- `research/play_forensics/unlock-full.png`

### Unrelated repos

A repo named `mirrors/BNB-Heroes` with BCR/CD1/MVS gameplay was inspected and determined to be a different project. Do not use it as BNB HEROES 2021 evidence.

---

## 15. Official/community visual evidence already archived

Do not start by scraping X again. Existing evidence is under:

`assets/reference/x/`

including:

- `assets/reference/x/official/` — official BNB_HEROES media
- `assets/reference/x/retweets/`
- `assets/reference/x/videos/`
- `assets/reference/x/index.html`

Community captures:

`assets/reference/community/`

These include historical homepage/game screenshots from X, Imgur/PTT/Matters and other sources.

Raw forensic work under `research/play_forensics/` contains archive/Memgator/Common Crawl scans. Some files are very large (for example a decompressed Common Crawl neighborhood dump around 187 MB). **Do not commit raw bulk forensic dumps unless intentionally creating a separate research archive.**

---

## 16. Research paths that are already exhausted / low value

The following were already attempted sufficiently for current preservation work:

- Wayback exact lookup of many missing `/cards/*`, `/townselect/*`, `/enemies/*`, `fight.42bbd04e.png`, Barracks/town layers.
- Memgator multi-archive time maps.
- Common Crawl nearby record scans.
- source-map recovery for the recovered CRA builds (`*.js.map` / CSS maps were not archived).
- exact GitHub code search for missing hashed asset names.
- current `bnbheroes.io`/unrelated modern BNB Heroes sites — not authoritative for the 2021 game.

Only redo these if you have a **new archive source, new URL corpus, or a specific evidence hypothesis**.

---

## 17. Playable revival mechanics already implemented

`prototype/src/engine.js` / `prototype/src/app.js` include:

- deterministic recruitment using recovered random table;
- recruit cost via recovered Oracle snapshot;
- 12h hero arrival;
- expedite cost;
- active Hero capacity = base character limit + Town Inn level;
- HP max/recovery model;
- combat success/reward/XP/HP-loss model;
- building bonuses;
- reserve bag and capacity;
- BNB reward vault;
- 48h claim lock;
- withdrawal tax starting at 20%, reducing 2 percentage points per full day to 0%;
- XP cap overflow / `stackedXp` behavior;
- level unlock simulation;
- local Marketplace simulation;
- localStorage persistence.

The Marketplace UI is historically documented, but the original market settlement contract was not recovered with the same confidence as Core/Character. The revival market is deliberately local simulation.

Current tests cover state version, identities used by the reconstruction, capacity, recruitment, reserve, Town Inn, fight, BNB vault, XP/HP, tax schedule, claim, Marketplace, stacked XP, unlock and BNBH charge behavior.

---

## 18. Historical project failure / why wallet remains disabled

BNB HEROES later became associated with a Jan-2022 pool-drain/rug-pull event and severe token decline, reported by multiple crypto incident sources at the time.

Therefore:

- the preservation build is **museum/read-only/simulation-first**;
- do not reconnect historical proxy admins/owners/pools to user wallets;
- any future production relaunch should audit admin roles, proxy ownership, Oracle, Randoms, Pool, treasury and the historical drain path, then deploy a fresh audited stack.

---

## 19. Vercel deployment state

Vercel configuration:

- `vercel.json` contains SPA rewrites for the recovered BrowserRouter routes.
- `.vercel/output/` may contain anonymous/static output from previous work, but do not treat it as authoritative source.

Production is now live through the repository's GitHub → Vercel integration. The local container's Vercel CLI is still logged out, so deployment was completed through the authenticated GitHub workflow/browser session rather than by extracting or printing any Vercel token.

Current production URL:

- `https://bnbheroes-revival.vercel.app/`
- playable simulation: `https://bnbheroes-revival.vercel.app/prototype/`
- restored GitBook: `https://bnbheroes-revival.vercel.app/gitbook/`

Production provenance at the end of the 2026-09-02 recovery session:

- GitHub materialization workflow run: `Materialize production source #2` — **Success**
- materialized release commit: `97fcb8d734e29199978c8586a07b83738071180b` — `Materialize recovered 2021 preservation release`
- final runtime-assets fix commit: `a0069ba1b95b91efa05ea1f227b6658e18c97df7` — `Include historical assets in Vercel runtime`
- final Vercel deployment id: `dpl_8ZqRrZ17xGXNYi6QragVa4azWFSp`
- Vercel state: **READY / PROMOTED / production**

Browser regression performed against the production alias after the final deploy:

- `/` — recovered 17-Nov-2021 React client rendered; all 15 ordinary image assets loaded; preservation flag present; wallet disabled.
- `/myheroes` — direct refresh works; no broken images.
- `/market` — direct refresh works; no broken images.
- `/battlelogs` — direct refresh works; no broken images.
- `/myreserve` — direct refresh works; no broken images.
- `/prototype/` — safe simulation rendered with 23/23 image elements loading successfully after the final `assets/` Vercel fix.
- `/gitbook/` — restored GitBook rendered successfully.

Before any future production promotion, always run:

```bash
npm run check:all
```

If command-line Vercel credentials are restored later, the normal production command remains:

```bash
npx vercel --prod --yes
```

---

## 20. Known remaining fidelity work (do this, not broad re-research)

Highest-value remaining tasks:

1. **Prove numeric heroNameId mapping for the other 19 recovered Hero artworks**
   - use named official NFT/event posts + on-chain `getHero(tokenId)` reads;
   - save raw proof locally;
   - then replace neutral `/cards/{id}.png` fallbacks.

2. **Recover or reconstruct Barracks (`towns/3-1.png`) from period evidence**
   - best path is pixel/layer reconstruction from exact 1920×1080 official town screenshots because surviving town layers are also 1920×1080;
   - mark any reconstruction clearly in provenance.

3. **Recover original enemy sprites / Fight icon / modal art from a genuinely new source**
   - do not repeat already-exhausted Wayback/Common Crawl searches without a new lead.

4. **Browser regression on public deployment**
   - root renders original Town/Home without wallet;
   - My Heroes, Market, Battle Logs, Reserve route backgrounds/layout load;
   - no uncaught errors that blank the app;
   - no wallet popup;
   - no real transaction path;
   - no 404 static/media paths.

5. **Only after fidelity:** optionally connect the original visual components to the safe simulation engine so the 2021 UI itself becomes fully playable without blockchain. Keep that adapter separate from the clean archive.

---

## 21. What “finished” means for this repository

A preservation release is acceptable when:

- original recovered Nov-17 UI is the root experience;
- no wallet transaction can occur;
- all required web assets return HTTP 200;
- known missing art is clearly represented as fallback/reconstruction, not falsely called original;
- `/prototype/` remains a fully playable safe simulation;
- `/gitbook/` remains usable;
- `npm run check:all` passes;
- public deployment is browser-tested;
- this handoff remains updated with exact deployment URL and any new evidence.

It does **not** require pretending every lost PNG was recovered.

---

## 22. Recommended prompt for the next AI IDE

Copy/paste this to the next AI:

> Read `/workspace/bnbheroes-revival/AI_IDE_HANDOFF.md` completely before changing anything. Do not restart BNB HEROES forensic research from zero. Run `npm run check:all`, inspect git status and the clean `archive/original-20211117/` hashes, then continue only from **Known remaining fidelity work**. Preserve the original archive, keep wallet/mainnet transactions disabled, and clearly distinguish recovered original evidence from reconstructed fallback assets.

---

## 23. Quick file map

```text
/
├── index.html                     # production: recovered 17-Nov-2021 HTML, self-contained refs
├── preservation-shim.js           # safety + preservation navigation only
├── vercel.json                    # SPA rewrites / headers
├── static/                        # production recovered JS/CSS/media + documented fallbacks
├── backgrounds/                   # surviving original page backgrounds
├── towns/                         # surviving original town layers + transparent missing-layer fallbacks
├── townselect/                    # preservation fallbacks until originals are recovered
├── cards/                         # ID 14/18 period art + neutral unknowns
├── enemies/                       # surviving sprite(s) + neutral unknowns
├── vendor/                        # Bootstrap 5.1.2 copied locally
├── prototype/                     # safe playable reconstruction
├── gitbook/                       # restored docs
├── archive/
│   ├── original-20211117/         # immutable recovered HTML/CSS/JS baseline + SHA256
│   └── hero-art-20211118/         # all 21 period hero PNGs + SHA256/source note
├── assets/reference/              # official/community historical screenshots/media
├── docs/FORENSICS.md              # contract/false-lead forensic notes
├── docs/WEB-ARCHAEOLOGY.md        # web recovery notes
├── research/chain-snapshot.json   # recovered on-chain state snapshot
├── research/play_forensics/       # raw web archaeology; may include huge untracked data
├── mirrors/                       # historical source/bot mirrors
├── scripts/verify-preservation.mjs
└── AI_IDE_HANDOFF.md              # THIS FILE
```

---

## 24. Rule for future edits

When adding anything historical, label it with one of these concepts in code/docs/provenance:

- **Recovered original** — byte/file/component directly recovered from 2021 source/archive.
- **On-chain confirmed** — read from historical/live contract state/source with address/method evidence.
- **2021 documented** — period article/guide/social media evidence.
- **Reconstructed** — inferred/recreated from period evidence.
- **Simulation** — new safe gameplay implementation, not claimed as original code.

This distinction is more important than making every screen look artificially “complete.”

---

# 2026-09-02 Late-session checkpoint: deep media recovery

This section is the authoritative continuation point for the next ChatGPT/AI-IDE session. Read this before re-doing any media archaeology.

## User intent at this checkpoint

User wants the 2021 BNB HEROES game revived as faithfully as possible. Priority order:
1. Recover original 2021 media/source first.
2. Only recreate/synthesize an asset after multiple original-source avenues are exhausted.
3. Keep the original 2021 React/CSS frontend as the visual baseline.
4. Keep real wallet / real-money transactions disabled for safety.
5. Continue integrating recovered media and mechanics until the old game UI is as complete/playable as possible.

## Current production / project baseline

- Working directory: `/workspace/bnbheroes-revival`
- Production domain: `https://bnbheroes-revival.vercel.app/`
- Production root currently uses the recovered **17 Nov 2021 React frontend build** (safe/preservation patched).
- Playable simulation remains at `/prototype/`.
- Restored GitBook remains at `/gitbook/`.
- Original 17 Nov 2021 bundle archive is under `archive/original-20211117/` with SHA-256 verification.
- 21 recovered Hero artworks are under `archive/hero-art-20211118/`.
- `npm run check:all` and engine tests had passed at prior production checkpoint.

## IMPORTANT correction about the earlier “94 URL resources”

The earlier 94 resource URLs + SHA-256 came from historical scans of **`bnbheroes.io` marketing/WordPress/Elementor**, not from `play.bnbheroes.io` game-client assets. This distinction matters. The actual game-client frontend was later recovered separately from archived `play.bnbheroes.io` HTML + JS/CSS bundles.

## Actual game frontend recovery status

Recovered build around **17 Nov 2021**:
- React main bundle: `main.5e2ca500.chunk.js`
- vendor bundle: `2.04f79657.chunk.js`
- main CSS: `main.433e3d53.chunk.css`
- vendor CSS: `2.f4c56af9.chunk.css`

Recovered later build around **10 Dec 2021**:
- `main.c3f63d85.chunk.js`
- `2.89c86d0d.chunk.js`
- `main.a8f26ba7.chunk.css`
- `2.f4c56af9.chunk.css`

Original root HTML from `play.bnbheroes.io` was recovered from Common Crawl. It confirmed a React build and exposed the hashed bundle names.

The 17 Nov build is currently used as the visual baseline because it is closest to the launch/open-beta period the user remembers.

## Newly recovered legacy-domain source: `bnbheroes.xyz`

A major discovery in the latest research is the older first-party domain:
- `bnbheroes.xyz`
- Wayback snapshots exist from **15 Oct 2021** onward.

This domain exposed legacy media that the `.io` site / `play.bnbheroes.io` archive did not preserve.

Notable filenames found from the old site:
- `BNBH-Card-Back.png`
- `Level-1.png`
- `Level-4.png`
- `menu-btn-00_Buttons_01.png`
- `Untitled-design-39.png`
- `Untitled-design-40.png`
- `Untitled-design-42.png`
- `Untitled-design-45.png`
- `Untitled-design-50.png`
- `keyframe-My-Video.mp4`

### Team image mapping (do NOT treat as gameplay assets)

The four team images requested by the user were identified from the legacy site HTML:
- `Untitled-design-39.png` → Matthew Leno — Project Leader
- `Untitled-design-45.png` → Chris Chua — Lead Game Developer
- `Untitled-design-40.png` → Flore Santos — Lead Artist
- `Untitled-design-42.png` → Vinnie Tan — Smart Contracts

They were shown to the user via temporary external viewing URLs. They are team/profile images and must NOT be reused as game art.

## First-party archived video now confirmed

Legacy first-party video:
- URL: `https://bnbheroes.xyz/wp-content/uploads/2021/10/keyframe-My-Video.mp4`
- Wayback first snapshot: **2021-10-15 17:51:37 GMT**
- another snapshot: **2021-11-08 10:19:31 GMT**
- archived original content length: **6,568,989 bytes**
- original last-modified shown by archive: **2021-10-13 19:20:31 GMT**

MemGator HEAD/proxy confirmed HTTP 200 and `content-type: video/mp4`.

This video still needs to be downloaded/extracted frame-by-frame if possible. It is a high-priority source for missing UI / media references.

## Major GitBook legacy-state breakthrough

The archived GitBook snapshot around **15 Oct 2021** contains serialized/compressed GitBook state. It was extracted to:
- `research/media_hunt/gitbook-legacy/initial-state.json`

Relevant legacy GitBook space:
- space ID: `-MiQ2_ADbmPLGvENAQw4`
- revision seen in initial state: `UWqoqKC3Sjj9Vsmd1z3Z`

The state exposed legacy Firebase/GitBook media metadata, including historical names, sizes, IDs, and URLs.

Although the old `firebasestorage.googleapis.com` URLs returned 404 directly, replacing the host with `files.gitbook.com` redirects to the still-live legacy bucket:
- `https://files.gitbook.com/v0/b/gitbook-legacy-files/...`

This is the key recovery path. Do NOT repeat the failed Firebase-only assumption.

## GitBook legacy media recovered in this checkpoint

Files are under:
- `research/media_hunt/gitbook-legacy/files/`

A download report is stored at:
- `research/media_hunt/gitbook-legacy/files/DOWNLOAD_REPORT.tsv`

Recovered metadata exposed **18 legacy assets**. Examples and verified dimensions:

- `FIGHT.png` → 1920×1080 PNG
- `FIGHT (1).png` → 1920×1080 PNG
- `Enemies.jpg` → 4000×2070 JPEG
- `a.jpg` → 4000×2070 JPEG
- `Level 1 Skull Enemies.jpg` → 1280×662 JPEG
- `Level 2 Skull Enemies.jpg` → 1280×461 JPEG
- `BNB HEROES.png` → 1920×1080 PNG
- `BNBH coin.png` → 2296×2296 PNG
- `$CROWN Tokenomics.png` → 1500×1500 PNG
- `HotC tokenomics.png` → 1920×1080 PNG
- `HotC transparent.png` → 2855×1293 PNG
- `Untitled design (34).png` → 500×500 PNG
- plus several `Copy of Copy of certificate...` and legacy promo images.

### Important note on apparent size mismatch

For some large files (`FIGHT.png`, `FIGHT (1).png`, `Enemies.jpg`) the bytes returned by `files.gitbook.com` were smaller than the historical `size` metadata, but ImageMagick still successfully decoded them at the expected dimensions. Treat them as recovered legacy copies, but retain metadata + provenance and do not silently claim byte-identical equality with the historical Firebase object unless SHA or exact size can be established.

## Legacy GitBook pages discovered from old site links/state

Old `bnbheroes.xyz`/GitBook references exposed page targets for:
- Common Enemies
- Bosses
- Hero Wiki
- Eastcliff Town Upgrade
- Hero Recruitment

Known page IDs captured in research attempts include:
- common enemies: `-MiQR4aAuYCML572KYiK`
- bosses: `-MiQRC6Gl363pDakiVxd`
- hero wiki: `-Mi_oiwrMg12G1-abNsZ`
- eastcliff town upgrade: `-Mi_CkHw0YULIQBBzR8B`
- hero recruitment: `-Mieci3472EOuTzxOyvg`

Direct reconstruction of sibling legacy `document.json` paths from the one surviving root `legacyURL` returned 404. Do not waste time repeating the same guessed-path variants unless a new batch/revision ID is found.

## Enemy identity is now locked from the ORIGINAL 17 Nov React bundle

Do not use earlier guessed names. The 17 Nov bundle explicitly defines:

1. type 1 → `Red Skull 1`
   - successRate 70
   - reward 0.003 BNB
   - XP 100
   - HP 200
2. type 2 → `Red Skull 2`
   - successRate 67
   - reward 0.0036 BNB
   - XP 110
   - HP 200
3. type 3 → `Red Skull 3`
   - successRate 63
   - reward 0.0042 BNB
   - XP 120
   - HP 200
4. type 4 → `Red Skull Archer`
   - successRate 59
   - reward 0.0048 BNB
   - XP 130
   - HP 200
5. type 5 → `Red Skull Assasin`
   - NOTE: original code spelling is **Assasin**
   - successRate 55
   - reward 0.0054 BNB
   - XP 150
   - HP 200
6. type 6 → `Red Skull Mage`
   - successRate 51
   - reward 0.006 BNB
   - XP 200
   - HP 200
7. type 7 → `Zangrief` (Boss of Chapter 1)
   - description in source: “Your squad spots ZANGRIEF at the stronghold gates charging towards them. Defeat Him in order to claim the stronghold once and for all!”
   - successRate 40
   - reward 0.024 BNB
   - XP 400
   - HP 400

Source location in de-minified 17 Nov bundle is around `research/play_forensics/recovered/build-20211117/main.pretty.js` lines ~7845–7910.

The Fight route renders:
- Chapter title: `Chapter 1: Enemy at the gates`
- Tier 1 = `te[0..2]`
- Tier 2 = `te[3..5]`
- Boss = `te[6]`
- enemy image path: `/enemies/<type>.png`

## Recovered enemy sheets and segmentation work

`Level 1 Skull Enemies.jpg` clearly contains **three Tier-1 Red Skull characters**.
`Level 2 Skull Enemies.jpg` clearly contains **three Tier-2 Red Skull characters**.

Segmentation output was created under:
- `research/media_hunt/gitbook-legacy/segmentation/tier1/1.png .. 3.png`
- `research/media_hunt/gitbook-legacy/segmentation/tier2/1.png .. 3.png`
- additional experiments under `research/media_hunt/gitbook-legacy/segmentation/`

The existing surviving game sprite:
- `/enemies/4.png`
- 300×407, transparent PNG
- corresponds to `Red Skull Archer` by source definition.

It is being used as the anchor to determine the left/middle/right order in the Tier-2 sheet.

Current matching experiments (PHASH/edge/alpha) have NOT yet produced a sufficiently rigorous mapping to promote all three Tier-2 crops as type 4/5/6. Do not state that mapping as certain yet.

Next AI should continue visual/template matching against `/enemies/4.png`, ideally with OpenCV or another robust feature matcher if available/installable, and also inspect the source sheets visually.

## X/Twitter archive already downloaded

Official historical X media is already stored under:
- `assets/reference/x/official/`
- videos under `assets/reference/x/videos/`
- retweets under `assets/reference/x/retweets/`

Manifest:
- `research/x_bnbheroes/media.tsv`

There are about 50 official media items and 2 videos plus retweeted media. Do NOT re-download the entire account unless seeking higher-quality/orig versions or text/caption metadata.

Useful official X items known from prior work:
- posts around Open Beta V2/V3
- dynamic success rate battle UI
- gameplay beta screenshots
- Hero rarity sheets
- result / enemy-defeated imagery
- Hero art for at least Arnulf and Elrik

`research/x_bnbheroes/README.md` notes official X items `15` and `16` as Elrik / Arnulf hero art.

## Hero artwork status

A Thai article from 18 Nov 2021 yielded **21/21 real Hero artworks**, now archived under:
- `archive/hero-art-20211118/`

Do not assume article order equals on-chain `heroNameId`; the article was arranged by name/alphabetical presentation.

Strong identity anchors already known:
- heroNameId 14 → Arnulf of Esplin
- heroNameId 18 → Elrik the Imbuer

These are the only IDs that should be treated as firmly mapped unless new evidence is found.

The next high-value work item is mapping the remaining 19 Hero artworks to `heroNameId` using:
- official X “hero spotlight” posts/captions,
- on-chain Attack/Armor/Speed tuples,
- old guides/screenshots with visible hero name/stat combinations,
- possibly recovered GitBook Hero Wiki media/text.

Do not assign names merely from aesthetics.

## Stronghold / Town media status

Recovered first-party Town layers currently include:
- background / village scene
- objects layer
- Bank level 1
- Town Inn level 1
- Training Grounds level 1

Still missing original direct byte for:
- `towns/3-1.png` (Barracks level 1)
- several higher-level town layers / thumbnails depending on screen

Old-domain assets:
- `Level-1.png`
- `Level-4.png`
were identified in the `bnbheroes.xyz` “Rebuild your stronghold / Building Upgrade” section and should be treated as period evidence/reference.

A first-party archived image from `bnbheroes.io` was also recovered:
- filename: `IMG_20211114_030807_117-1.png`
- dimensions: 2369×2048
- Wayback snapshot: 14 Nov 2021
- SHA-256 previously computed: `e3ec617c9f1c6adbf9e8d9d7c839a4049e658972f6e7dbf875a6617f951bfc13`

Use it as a pixel reference when reconstructing missing Stronghold/Barracks elements.

## Screenshot/community evidence

Five 1440×1080 gameplay screenshots were recovered from a 2021 Zhihu article and stored under the media-hunt research tree. At least one clearly shows the original Town/Stronghold with building-under-construction state and bottom-row buttons such as Market / Battle Log / GitBook.

A Chinese Mifengcha article from 23 Nov 2021 exposed URLs for five gameplay screenshots (Connect → Recruit → Fight → Idle Job → Town Upgrade), but the Aliyun OSS host currently returns AccessDenied and MemGator had no snapshot. Preserve the discovered URLs in research; do not redo the same dead-end from scratch.

## Bot screenshot evidence

Historical bot repo still provides real UI fragments/crops such as:
- fightBoss
- fightMage
- myHeroes
- unlock
- goToBoss
- goToMage
- MetaMask-related recognition assets

Also known to contain at least two full-screen 1920×1080 captures:
- `confirmedTransaction1-full.bmp`
- `unlock-full.bmp`

These are valuable for pixel positions and missing UI pieces when archive bytes are unavailable.

## Media that still lacks original direct game-client bytes

After Wayback/Common Crawl/MemGator checks, these hashed/static paths still do NOT have confirmed original direct bytes from `play.bnbheroes.io`:

- `fight.42bbd04e.png`
- `card.df50fb38.png`
- `card_lock.c211f00f.png`
- `recruit_card.aa5e12c7.png`
- `rewards.16b2db64.png`
- `You lose.00f95b2b.png`
- `towns/3-1.png`
- `/enemies/1.png`
- `/enemies/2.png`
- `/enemies/3.png`
- `/enemies/5.png`
- `/enemies/6.png`
- `/enemies/7.png`

However, do NOT yet ask the user to recreate all of these. Several now have **period-original GitBook sheets/screenshots** that can likely be used to reconstruct the exact visual faithfully:
- enemies 1–6 from `Level 1/2 Skull Enemies.jpg`
- Fight visual from `FIGHT.png` / `FIGHT (1).png`
- Boss Zangrief may be present in `Enemies.jpg`, `a.jpg`, FIGHT images, X media, or video
- Barracks can potentially be reconstructed from first-party town screenshots/layers

## Preservation safety policy

The original React app used Web3Modal/Web3 and chain 56. Production preservation build intentionally disables real wallet transaction flow. Keep it this way unless user explicitly asks for a separate audited relaunch architecture.

Never restore/reuse old private-key/bot credential material.
Never expose secrets found in historical repos.
Legacy mainnet contracts should be treated read-only for preservation/research.

## Current playable architecture

Two useful modes remain:

1. `/` = recovered original 2021 React UI in safe/preservation mode.
2. `/prototype/` = playable simulation using recovered mechanics/economy.

Long-term ideal:
- keep original React components/layout,
- inject a compatibility/mock provider that implements the methods the old UI expects,
- connect those calls to the safe simulation engine,
- preserve all UI/flows without real wallet transactions.

This integration is still incomplete and is one of the biggest remaining functional tasks.

## Immediate next actions — DO THESE IN ORDER

1. **Finish enemy sprite recovery**
   - inspect `Level 1 Skull Enemies.jpg` / `Level 2 Skull Enemies.jpg` visually,
   - use `/enemies/4.png` as a feature anchor,
   - establish exact L→R order,
   - crop/clean transparent sprites for types 1–6,
   - locate/crop Zangrief from GitBook/X/video if possible,
   - preserve provenance in `docs/MEDIA_RECOVERY.md`.

2. **Inspect/download `keyframe-My-Video.mp4`**
   - source URL and archive timestamps are above,
   - extract frames at scene changes,
   - compare against missing Fight/Town/Card/Boss media.

3. **Map GitBook assets to pages**
   - use state metadata/file creation batch IDs where useful,
   - avoid already-failed guessed `document.json` URL patterns unless new revision/batch data is recovered.

4. **Finish Hero ID mapping**
   - 21 art files exist,
   - 14=Arnulf and 18=Elrik are strong anchors,
   - use X captions/stat tuples / guides to map the rest.

5. **Recover/reconstruct Barracks and missing card/result art**
   - only after exhausting period evidence,
   - if still impossible, prepare a concise list for the user with each missing asset + exact screenshot reference so the user can direct creative reconstruction.

6. **Integrate recovered media into runtime**
   - replace neutral placeholders only when mapping is sufficiently supported,
   - do not overwrite recovered raw evidence; create production derivatives separately,
   - rerun `npm run check:all` and browser smoke tests.

7. **Update production Vercel**
   - current production Git integration previously worked through GitHub Actions/materialization workflow because CLI auth in container was lost.
   - Browser was logged into GitHub/Vercel in prior session; do not scrape JWT/cookies/tokens.
   - Use legitimate GitHub workflow / browser UI if needed.

8. **Update this handoff again** after major mapping/integration changes.

## Research dead ends already checked — avoid repeating blindly

- Common Crawl only had root/robots records for `play.bnbheroes.io`; it did not crawl all static JS/CSS/media children.
- Direct Common Crawl index had intermittent errors/429; a local `cluster.idx` approach was already used to inspect the domain block.
- Wayback direct access had rate limits; MemGator was used successfully as a proxy/timemap aggregator.
- Direct old Firebase GitBook media URLs returned 404, but `files.gitbook.com` legacy redirect works — use that.
- Direct guessed sibling GitBook `document.json` paths for page IDs returned 404.
- Exact web search by hashed missing asset filename generally returned nothing useful.
- GitHub searches found calculator/contracts/bots, not a complete intact `play.bnbheroes.io` source repository.

## Files created/used in the latest archaeology

- `research/media_hunt/gitbook-legacy/initial-state.json`
- `research/media_hunt/gitbook-legacy/files/`
- `research/media_hunt/gitbook-legacy/files/DOWNLOAD_REPORT.tsv`
- `research/media_hunt/gitbook-legacy/asset-timemaps.tsv`
- `research/media_hunt/gitbook-legacy/segmentation/`
- `research/media_hunt/legacy-domains/`
- `research/media_hunt/inspection-catbox.tsv` (temporary viewing links only; NOT provenance)
- `research/x_bnbheroes/media.tsv`
- `assets/reference/x/official/`
- `assets/reference/x/videos/`
- `archive/hero-art-20211118/`
- `archive/original-20211117/`

## Important provenance rule

Temporary Catbox URLs were only used to let ChatGPT visually inspect/show already-recovered files. Never cite Catbox as the historical source. Historical source/provenance is the old BNB HEROES domain, GitBook legacy storage, X/Twitter, Wayback, article archive, or recovered bot/video evidence.

## Last state before chat handoff

The user explicitly said the conversation was close to the token limit and asked to update the handoff so a new chat can continue.

At this exact checkpoint:
- source/media archaeology has advanced significantly,
- enemy names/mechanics are locked from original code,
- legacy GitBook media was newly recovered,
- Tier 1/2 enemy crops exist but mapping/production promotion is NOT finalized,
- the old first-party video is confirmed but frame extraction is NOT finalized,
- latest discoveries have NOT yet been fully deployed to production,
- next session should continue from the ordered action list above, not restart research.

## Progress update — 2026-09-03 (continued recovery)

### Enemy runtime contract recovered from period-original bundle
- Original `archive/original-20211117/static/js/main.5e2ca500.chunk.js` contains the exact 7-entry enemy table:
  - type 1 `Red Skull 1` — success 70, reward .003, XP 100, HP 200
  - type 2 `Red Skull 2` — 67, .0036, 110, 200
  - type 3 `Red Skull 3` — 63, .0042, 120, 200
  - type 4 `Red Skull Archer` — 59, .0048, 130, 200
  - type 5 `Red Skull Assasin` — 55, .0054, 150, 200
  - type 6 `Red Skull Mage` — 51, .006, 200, 200
  - type 7 `Zangrief` — 40, .024, 400, 400
- Same bundle proves runtime path is `/enemies/` + `type` + `.png`; Tier-1 carousel indexes 0..2, Tier-2 3..5, boss index 6.

### Enemy 1/2/3 promoted to runtime (first-party derivatives)
- GitBook first-party `Level 1 Skull Enemies.jpg` contains exactly 3 Tier-1 characters.
- The recovered crops `segmentation/tier1/{1,2,3}.png` were independently matched back to the earlier first-party 4000x2070 `a.jpg` via SIFT/RANSAC. Their centers are x≈647, 1980, 3342, proving left→center→right ordering.
- Therefore runtime mapping is now evidence-backed: `enemies/1.png` = left, `2.png` = center, `3.png` = right.
- Old identical placeholder files were preserved under `research/media_hunt/derivatives/enemies/placeholder-backup-{1,2,3}.png`.
- Proof record updated at `research/media_hunt/derivatives/enemies/PROOF.json`.

### Remaining enemy blocker
- First-party Tier-2 sheet and three clean crops are recovered, but exact crop→type mapping for Archer/Assasin/Mage is not yet independently proven. Do not overwrite 4/5/6 until proof is found.
- Type 7 Zangrief runtime art remains unresolved.

### Barracks investigation correction
- `research/media_hunt/legacy-domains/assets/Level-1.png` and `Level-4.png` are valid 1700x1549 alpha PNGs; similarly named `critical/` copies are truncated.
- They are strong period first-party Barracks-related candidates, but dimensions/composition do not directly match the 1920x1080 `/towns/{type}-{level}.png` layers. Do not promote without geometric/source proof.

## Progress update — 2026-09-03 enemy + Barracks milestone

### Enemy mapping is now locked

- Tier 1: runtime types 1/2/3 = first-party GitBook Level-1 sheet left/middle/right.
- Tier 2:
  - type 4 Red Skull Archer = left. Original `/enemies/4.png` direct SIFT match gives 59/63 inliers (earlier proof run 251 inliers).
  - type 6 Red Skull Mage = middle. Historical bot `mage/mage1.bmp` exact-scale template score 0.9721 against middle crop.
  - type 5 Red Skull Assasin = right, the only remaining crop in the exact 3-enemy Level-2 set.
- `enemies/5.png` and `enemies/6.png` are promoted derivatives from the original sheet.
- Proof: `research/media_hunt/gitbook-legacy/segmentation/TIER2_MAPPING_PROOF.md`.

### Zangrief recovered as period reconstruction

- Production YouTube video `vpYV15hBOGs` uploaded 17 Nov 2021 explicitly shows the newly implemented Chapter-1 boss and the player winning the boss fight.
- Higher-resolution period screenshot `research/media_hunt/matters-20211208/boss-win.png` (1162x1140) contains the same boss.
- Boss was isolated from that period screenshot; runtime `enemies/7.png` is now a transparent 500x600 reconstruction.
- Previous unusable enemy7 placeholder is preserved as `research/media_hunt/derivatives/enemies/placeholder-backup-7.png`.
- Proof: `research/media_hunt/derivatives/enemies/ZANGRIEF_PROOF.md`.

### Barracks Level 1 recovered/reconstructed into town coordinates

- Archived first-party `bnbheroes.xyz` HTML explicitly says `Level-1.png` alt=`Level 1 Barracks` and `Level-4.png` alt=`Level 4 Barracks`.
- `Level-1.png` is a valid 1700x1549 alpha PNG.
- It matches period Zhihu gameplay screenshot `research/media_hunt/zhihu/2.jpg` with 125 RANSAC inliers.
- Original `towns/1-1.png` matches the same screenshot with 153 inliers.
- Composed homography places the Barracks into original 1920x1080 town coordinates; reconstructed result promoted to `towns/3-1.png`.
- Proof: `research/media_hunt/barracks-analysis/TOWN_3_1_PROOF.json`.

### GitBook legacy storage fully enumerated

- Public bucket prefix listing recovered 189 historical document objects.
- The Space asset prefix contains exactly 20 publicly listable assets; all are known/recovered. `research/media_hunt/gitbook-legacy/assets-index/all.json` records the enumeration.
- Do not waste time guessing more sibling GitBook asset URLs unless a new Space/revision ID is discovered.

### Embedded bundle images checked

- Original main JS contains 10 small base64 PNG data-URIs; decoded to `research/media_hunt/bundle-embedded/`.
- They are small UI/icon assets (e.g. 51x30, 128x128, 55x59), not the missing large card/result/fight files.

### Remaining media requiring creative reconstruction if desired

Direct original bytes remain unrecovered for:
- `static/media/fight.42bbd04e.png`
- `static/media/card.df50fb38.png`
- `static/media/card_lock.c211f00f.png`
- `static/media/recruit_card.aa5e12c7.png`
- `static/media/rewards.16b2db64.png`
- `static/media/You lose.00f95b2b.png`

At this point GitBook storage, old-host archive paths, period videos/screenshots, bot assets and bundle-embedded images have all been checked. Treat these six as the concise creative-reconstruction queue unless a genuinely new archive source appears.

## Progress update — 2026-09-03 final hashed-media promotion

### The former six-file media queue is now integrated

Five of the six unrecovered hashed media files now use historical period/first-party pixels; the last (`fight`) remains an explicitly documented creative reconstruction. Direct byte-identical 2021 originals were **not** recovered, so provenance labels matter.

1. `static/media/card.df50fb38.png`
   - 459×654, SHA-256 `cac62dc89c4e15b36fb738131ca99c04b90c1211bf9e2e175e655394fef8e100`.
   - Official 2021 video `WZwbq7Va0gg`, 210 repeated open-card detections, median-stacked reconstruction.
2. `static/media/card_lock.c211f00f.png`
   - 459×654, SHA-256 `f68d9efe4d89f00ec1e5ef6857b046d9aaa69147c52ca11c6f9e1a8e24284103`.
   - Same official video, separate locked-card cluster, 51 detections.
3. `static/media/recruit_card.aa5e12c7.png`
   - 459×654, SHA-256 `12ddc8b41804baff0e78ede53833bd503fa24e3b130ec2d01203fca8cf65aae6`.
   - First-party archived `BNBH-Card-Back.png` adapted to runtime aspect. It matches official video with 195 RANSAC inliers at the strongest frame, so this is real period artwork, though not direct hashed-file bytes.
4. `static/media/rewards.16b2db64.png`
   - 512×512, SHA-256 `0ba35be2fa35911f90468a49ed2b019adf505a59497569b53e7e5dc84e8e8a9d`.
   - Original bundle proves RESULT modal renders it at width 500px for nonzero reward. Reconstructed from period win-frame pixels using win/lose median differential isolation.
5. `static/media/You lose.00f95b2b.png`
   - 512×512, SHA-256 `4f08df3827f4b41f42c4e078542f04ada3858be578fe9a0099f8083de89034b4`.
   - Bundle proves `Q.rewards == 0` renders this at width 500px; reconstructed from corresponding period lose-frame pixels.
6. `static/media/fight.42bbd04e.png`
   - 512×512, SHA-256 `158f9f06f9f5720f884d97bd954fbea2029034a2b79c81405fc868a515791bf0`.
   - Current crossed-weapons image remains a **CREATIVE_RECONSTRUCTION**. This checkpoint only normalized it to 8-bit. Do not claim original/period source.

Full record: `research/media_hunt/final-promotions/PROVENANCE.md` and `research/media_hunt/card-analysis/CARD_SLOT_RECOVERY_PROOF.md`.
Previous placeholders are preserved under `research/media_hunt/final-promotions/backups/`.

### RESULT modal contract recovered exactly from original bundle
- Modal title: `RESULT`.
- Loss when `Number(Q.rewards) == 0`: DOM label `You LosE`, image `You lose.00f95b2b.png`, width 500px.
- Win otherwise: DOM label `ENEMY DEFEATED`, image `rewards.16b2db64.png`, width 500px.
- Result details are separate DOM content at bottom; therefore period screenshot text/numbers must not be baked into the reconstructed background image.

### Validation
- `npm run check:all` passes after promoting the last media batch.
- Local HTTP server check returned HTTP 200 for all six hashed media, `enemies/1.png`, `enemies/7.png`, and `towns/3-1.png`.
- Browser Host Bridge is on the Mac host and cannot reach container `127.0.0.1`; container has no Chromium executable. Therefore true visual browser smoke is still open. Do not mark it passed based only on HTTP checks.

### Immediate next work
1. Original 2021 UI still has dead Web3/game transaction dependencies. Build the safe compatibility/mock adapter so the **original UI**, not only `/prototype/`, can execute recruit/upgrade/fight/result flows locally without wallet signing.
2. Keep all real wallet/mainnet signing/transaction operations blocked.
3. Browser-regression test original routes once a browser can reach the served build.
4. Continue Hero ID mapping only with evidence; anchors remain heroNameId 14=Arnulf and 18=Elrik.

## Progress update — 2026-09-03 original-UI safe bridge

### Original bundle contract-call inventory completed
`docs/ORIGINAL_UI_COMPATIBILITY.md` now records the core calls required for native emulation:
- writes: `createNewHero`, `claimRewards`, `upgradeTown`, `fight`, `expediteHero`, `unLockLevel`, `moveHeroToBag`;
- reads: `getHeroesByOwner`, `getHeroesInBag`, `getHero`, `getTownLevel`, `getTownsOfPlayer`, `unLockTime`, `getCharacterPrice`, `getTownUpgradePrices`, `getUnlockLevelPrice`, balances/allowances;
- approval writes: ERC20 `approve`, NFT `setApprovalForAll`;
- fight receipt contract: original UI consumes `events.Fight.returnValues.rewards/xpGained/hpLoss`.

### Phase-1 compatibility bridge implemented
- `preservation-shim.js` still blocks the original real transaction layer before React handlers.
- Instead of a dead-end alert for recovered menu/action imagery, the following UI actions now route to equivalent deterministic local-simulation tabs:
  - `upgrade` -> `/prototype/#town`
  - `fight-btn` -> `/prototype/#battle`
  - `recruit` -> `/prototype/#heroes`
  - `myheroes` -> `/prototype/#heroes`
  - `mybag` -> `/prototype/#reserve`
  - `market` -> `/prototype/#market`
  - `battlelog` -> `/prototype/#log`
- `prototype/src/app.js` now reads `location.hash` at startup and on `hashchange`, enabling those deep links.
- Real wallet/mainnet signing remains disabled.

### Validation after bridge patch
- `npm run check:all` passes.
- This is **not yet the final provider emulation layer**: the 2021 React components still do not receive ABI-compatible local contract reads/writes directly. Phase 2 remains to emulate Web3/EIP-1193 responses and synthetic transaction receipts/events while keeping all network writes disabled.

## Progress update — 2026-09-03 native original-UI provider bridge

### Phase 2/3 bridge implemented
- Added `preservation-provider.js`, a local EIP-1193/Web3 provider backed by the same `prototype/src/engine.js`, `prototype/src/legacy-data.js`, and `bnbheroes-revival-v2` localStorage save as the standalone revival.
- `index.html` now loads vendored `ethers-6.17.0.umd.min.js`, then the local provider, then the preservation shim, before the original React main bundle.
- Exact 17 Nov 2021 contract identities are preserved for core/token/character/market/oracle/pool, but no runtime RPC endpoint is used.
- Main bundle compatibility patches are deliberately narrow:
  - static module-24 Web3 provider -> `window.__BNBH_LOCAL_PROVIDER__`;
  - WalletConnect remote RPC config removed;
  - `F.connect()` inside original `se()` -> safe local-provider resolution;
  - original `se().then(...)` auto-connect restored;
  - original `connect:se` prop restored.
- `preservation-shim.js` no longer intercepts Recruit/Upgrade/Fight/My Heroes/Reserve/Market/Battle Log into `/prototype/`; original React handlers now execute natively through the local provider.
- GitBook external-open interception remains, sending the dead historic GitBook URL to `/gitbook/`.

### Oracle values/formula locked from exact legacy contract
Read-only `eth_call` against build-17/11 oracle `0xD160bbDED5cFF79b126443EefCB28F3b67991140` still responds and exactly matches the stored snapshot for character, expedite, town and token prices.

The exact unlock formula was independently confirmed by sampled contract calls:
`getUnlockLevelPrice(level) = getTokenPrice * basePriceToUnlockInBNB * (100 + unlockRate*level) / 1e20`
with snapshot `basePriceToUnlockInBNB=0.008 BNB`, `unlockRate=4`.
Provider uses integer BigInt arithmetic and the preserved snapshot, not a live oracle.

### Original ABI surface implemented
- Hero/town/core/oracle reads, ERC20/NFT approvals, active/reserve hero lists, and marketplace reads are ABI-compatible.
- Writes implemented locally: recruit, claim, town upgrade, fight, expedite, level unlock, reserve move/return, market listing.
- `Fight` returns a synthetic mined receipt with an ABI-encoded `Fight` event so the untouched React RESULT logic receives `rewards`, `xpGained`, `hpLoss` in its historical path.
- Local market listing implements the UI-documented 10% listing fee.

### Safety invariant
The app shadows any browser wallet on this page with the preservation provider. `eth_sign`, `personal_sign`, `eth_signTransaction`, and `eth_sendRawTransaction` hard-fail. Runtime main/provider contain no BSC/Infura RPC endpoint. Chain id 56 is reported only so the 2021 UI's original chain gate accepts the emulator.

### Tests
- Added `tests/provider.test.mjs`.
- `npm run check:all` passes after native bridge integration.
- Provider test verifies exact oracle values, hero/market ABI reads, fight synthetic receipt, shared save persistence, and signing/raw-transaction rejection.

### Remaining immediate gate
- Deploy a **non-production Vercel preview** and browser-smoke original routes/actions there.
- Do not call production certified until browser checks cover `/`, `/myheroes`, `/market`, `/battlelogs`, `/myreserve`, Recruit, Upgrade, Fight and RESULT.

## Progress update — 2026-09-03 Recruit cross-version source recovery

### Why Recruit looked disabled on the 17 Nov shell
Browser regression of the Vercel preview proved Home/My Heroes/Fight/Upgrade worked natively, but Home Recruit was disabled. This is historical, not a provider failure: untouched `archive/original-20211117/static/js/main.5e2ca500.chunk.js` hard-disables both Home Recruit rendering branches even though the complete modal, approval and `createNewHero()` code remains in that same bundle.

### Authentic active handler recovered from 16 Nov
`research/play_forensics/recovered/build-20211116/main.907e74c4.chunk.js` contains the same Home component one day earlier with the eligible branch active. Its original click handler opens the Recruit modal and calls the oracle `getCharacterPrice()` before continuing through the existing approval/recruit functions.

The current runtime now uses that exact 16 Nov handler in the 17 Nov shell. The insufficient-balance/full-inn branch remains disabled exactly as before. This is a cross-version historical restoration, not invented UI. The 17 Nov archive is untouched and verification now asserts both source states.

## Progress update — 2026-09-03 public-preview native UI certification

### Preview / branch
- GitHub branch: `restoration/native-ui-20260903`
- Vercel preview: `https://bnbheroes-revival-git-restoration-nati-89e999-phu-tans-projects.vercel.app/`
- Do **not** force-push `main`: remote `main` and the restoration history diverged. The restoration was intentionally pushed to its own branch.

### Browser-certified native 2021 React flows
The public Vercel preview was exercised with real Chrome via Browser Host Bridge. Passed: Home local-wallet auto-connect, My Heroes, cross-version original Recruit handler, ~12h arrival, Expedite, Reserve/Return, Bank Upgrade, Basic Fight, Zangrief Boss screen, RESULT win, RESULT loss, Claim after the historical lock gate, and Battle Logs.

Concrete smoke outcomes:
- Recruit fresh-state BNBH: `20000 -> 13099.179568...`; NFT #1 created with ~43,174 seconds of arrival time.
- Expedite: another ~690.082043 BNBH spent; NFT #1 became immediately active.
- Bank upgrade isolated smoke: `20000 -> 18274.794892...`, town state became level 1 and `/towns/1-2.png` rendered.
- Boss win: Zangrief RESULT displayed 0.024 BNB / 400 XP / 330 HP loss.
- Forced deterministic QA loss on a second Hero: `YOU LOSE`, 0 BNB / 0 XP / 400 HP loss.
- Claim QA advanced only local save time past the gate: pending `0.048279` became claimed `0.0386232` after legacy 20% tax; pending and unlock reset to zero.

### Battle Logs blocker solved
The 17 Nov UI does not use Web3 for battle history; it queries retired `https://graphql.bitquery.io/` through Apollo. `prototype/src/engine.js` now stores structured `battleHistory`; `preservation-shim.js` locally answers the original Bitquery count/list query shapes from that same save. The React/Apollo Battle Logs page itself was not rewritten. Public preview then rendered a fresh row: `NFT 0 / Red Skull 1 / 0.00329175 BNB / 100 XP / 130 HP` with pagination.

### Mobile smoke
Valid mobile smoke used iPhone Safari UA plus 390×844 viewport. Original mobile layout placed Recruit/My Heroes/Upgrade/Fight controls in-view. A prior desktop-UA viewport-only result was discarded as invalid because `react-device-detect` correctly requires mobile UA.

### Evidence
See `research/browser-regression/REPORT_2026-09-03.md` and compressed screenshots under `research/browser-regression/evidence/`.

### Safety remains unchanged
No real wallet/signing/mainnet transaction path was restored. `eth_sign`, `personal_sign`, `eth_signTransaction` and `eth_sendRawTransaction` remain blocked. The original UI is driven by local EIP-1193/Web3 and local Bitquery-compatible adapters only.

## Progress update — 2026-09-03 full Hero-card mapping and promotion

### 21/21 Hero cards are no longer placeholders

All runtime `/cards/1.png` … `/cards/21.png` now use the surviving period artwork set from `archive/hero-art-20211118/`, copied **byte-for-byte**. No resize/crop/redraw/generation was applied. `scripts/verify-preservation.mjs` now compares every runtime card to its mapped archived source and fails if any card regresses to `cards/unkown.png`.

Final mapping:

| heroNameId | Hero | rarity | confidence |
|---:|---|---|---|
| 1 | Dayne of Gerston | Common | HIGH_STRUCTURAL |
| 2 | Andin Olis | Uncommon | HIGH_STRUCTURAL |
| 3 | Torlov Branhart | Common | HIGH_STRUCTURAL |
| 4 | Aelof Orstone | Uncommon | HIGH_STRUCTURAL |
| 5 | Jan Rhylen | Common | HIGH_STRUCTURAL |
| 6 | Demisov the Bold | Uncommon | HIGH_STRUCTURAL |
| 7 | Esfel of Lordan | Common | HIGH_STRUCTURAL |
| 8 | Reis of the Knife | Uncommon | HIGH_STRUCTURAL |
| 9 | Sivalas Zefen | Common | HIGH_STRUCTURAL |
| 10 | Lena | Common | HIGH_STRUCTURAL_NEW_INSERT |
| 11 | Thalas One-Eye | Uncommon | HIGH_STRUCTURAL |
| 12 | Lady Ella of Tir | Rare | HIGH_STRUCTURAL |
| 13 | Sir Bertrand | Rare | HIGH_STRUCTURAL |
| 14 | Arnulf of Esplin | Rare | **DIRECT_ANCHOR** |
| 15 | Balen Fellwood | Rare | HIGH_STRUCTURAL |
| 16 | Helia Stormcall | Epic | HIGH_STRUCTURAL |
| 17 | Xegis Branfyre | Epic | HIGH_STRUCTURAL |
| 18 | Elrik the Imbuer | Epic | **DIRECT_ANCHOR** |
| 19 | Uriah the Sage | Legendary | HIGH_STRUCTURAL |
| 20 | Sir Asten | Legendary | HIGH_STRUCTURAL |
| 21 | Duke Duscair IV | Legendary | HIGH_STRUCTURAL |

### Why the structural mapping is strong but not mislabeled “direct”

Recovered legacy GitBook `Hero Drop Rate` preserves an ordered 18-Hero roster with rarity sequence:

`C U C U C U C U C U R R R E E L L L`

The preserved 21-ID Character rarity array is:

`C U C U C U C U C C U R R R R E E E L L L`

Removing exactly IDs **10, 14, 18** makes the 21-ID sequence match the old 18-Hero sequence position-for-position. Official period X material says three new Heroes were being added. IDs 14 and 18 are independently locked as Arnulf and Elrik; the only additional artwork outside the old 18-name roster is Lena, giving ID10=Lena. This yields one consistent ordered merge without using article alphabetical order as numeric evidence.

Artwork/rank identities are additionally cross-checked against official rarity lineups with SIFT/RANSAC (e.g. Xegis 342, Helia 324, Balen 212, Bertrand 192, Lady Ella 183, Uriah 192 inliers). `Layer-1.png` is in the Uncommon group and is the residual Demisov artwork after the other four Uncommon identities are resolved.

Full proof and machine-readable mapping:
- `research/hero-id-mapping/PROOF.md`
- `research/hero-id-mapping/heroNameId-final.tsv`
- `research/hero-id-mapping/art-to-official-rarity-sift.tsv`
- `research/hero-id-mapping/official-group-layout-sift.tsv`

### Archive paths exhausted without inflating confidence

The old NFT `tokenURI()` resolves to the dead first-party route `https://metadata.bnbheroes.io/token/{id}`. Common Crawl/Wayback/alternate archive attempts did not yield the token JSON; public historical BSC RPCs are pruned for the required 2021 state; Sourcify/source-history routes did not provide a stronger numeric table. Current `randomTable` state is known to have changed and is **not** used as historical Hero-ID proof.

### Runtime/data/tests

- `prototype/src/legacy-data.js` now contains all 21 recovered Hero names.
- `tests/engine.test.mjs` asserts the exact ordered name set and that no template returns `Lost Hero #...`.
- `scripts/verify-preservation.mjs` asserts all 21 source/card byte equalities and preserves direct anchors 14/18.
- `docs/MEDIA_RECOVERY.md` and `archive/hero-art-20211118/SOURCE.md` were consolidated to remove stale placeholder claims.
- `npm run check:all` **passes** after full Hero promotion.

### Browser/deployment note

The Mac Browser Host Bridge currently cannot reach the Docker container directly (`127.0.0.1` refused; `172.28.0.3` timed out), while the container server itself returns HTTP 200. Therefore do not falsely certify this exact Hero-card commit via local browser. Push it to the existing non-production restoration branch and browser-smoke the HTTPS Vercel preview instead, then record commit/preview certification below.

### Remaining true uncertainties after Hero completion

The restoration is now functionally complete for the recovered 2021 UI/gameplay surface. Remaining fidelity caveats are narrow and already labeled:

1. `static/media/fight.42bbd04e.png` remains a creative reconstruction because no period pixel source/direct byte survived.
2. Hero IDs 14/18 are direct numeric anchors; the other 19 are high-confidence structural mappings, not a recovered metadata-table dump.
3. Some enemy/Barracks/card/result runtime images are period-derived reconstructions rather than byte-identical original hashed files; their proof docs preserve exact provenance.

Do not reopen solved queues unless a genuinely new historical source can improve fidelity/provenance.

## Final restoration checkpoint — 2026-09-03 Hero-card deployment certification

- Hero restoration commit: `addeaef16ef1d1428651bb73c08436c5075190b8` (`Complete 21-hero period card restoration`).
- GitHub restoration branch: `restoration/native-ui-20260903`; `origin/restoration/native-ui-20260903` points at the Hero-card commit. Remote `main` has a separate/diverged history; do not force-push it.
- Vercel preview: `https://bnbheroes-revival-git-restoration-nati-89e999-phu-tans-projects.vercel.app/`.
- Public-preview verification fetched `/cards/1.png` … `/cards/21.png`: every response was HTTP 200 and every byte length matched the corresponding immutable period source; local SHA-256 verification confirms byte identity for all 21.
- `/myheroes` rendered `/cards/14.png` at its natural 499×699 dimensions in the original 2021 React UI. Evidence: `research/browser-regression/evidence/2026-09-03-myheroes-period-card.jpg`.
- `npm run check:all` passes after the complete Hero promotion.
- Main playable preservation flows were already browser-certified on this same preview: Recruit/arrival/Expedite, Reserve/Return, Upgrade, Basic Fight, Zangrief win/loss RESULT, Claim, Battle Logs, restored GitBook/prototype, and valid iPhone-UA mobile layout.
- Known visual provenance limitation remains explicit: `fight.42bbd04e.png` is creative reconstruction and `/townselect/*` are transparent fallbacks. All other major runtime blockers from this recovery campaign have been closed or reconstructed from period evidence.

## Live recovery checkpoint — 2026-09-03 Town Level 2/3 integration

This checkpoint is intentionally written immediately so a network/tool interruption does not lose context.

### Runtime changes already on disk
- `towns/1-2.png` … `towns/4-2.png` and `towns/1-3.png` … `towns/4-3.png` are now evidence-backed full-canvas 1920×1080 period-pixel reconstructions, replacing the former 573-byte transparent fallbacks.
- `townselect/1-2.png` … `townselect/4-2.png` and `townselect/1-3.png` … `townselect/4-3.png` are also recovered/reconstructed and currently modified in the working tree.
- Original/fallback town files were preserved under `archive/pre-town-layer-recovery-20260903/` before promotion.
- Bank Level 3 proof was corrected to use the stable transform-chain solution rather than the earlier distorted direct homography; current proof records 53/59 inliers for the stable chain.
- `npm run check:all` passed after the Level 2/3 full-town promotion.

### Current unresolved work
1. Level 4 full-town layers `towns/{1,2,3,4}-4.png` are still 573-byte transparent fallbacks at runtime. Do NOT promote weak candidates merely to fill the slots.
2. Barracks Level 4 has a surviving first-party `research/media_hunt/barracks-analysis/assets_Level-4.png` source and strong historical homography evidence, but the exact prior 625/726-inlier source frame/script still needs to be re-identified so provenance is reproducible.
3. The 21 Nov max-town video frames currently scanned contain a global dark/overlay treatment; a trial L4 reconstruction from those pixels was rejected and remains research-only under `research/media_hunt/town-layers-reconstruction/level4/`.
4. After Level 4: finish/lock `townselect/*-4`; re-audit `static/media/fight.42bbd04e.png` and retain CREATIVE_RECONSTRUCTION labeling unless a true period pixel source is found; then run full tests, commit, push restoration branch, redeploy Vercel preview, and browser-regression the HTTPS build.

### Git/deployment state at this checkpoint
- HEAD is still `addeaef` (`Complete 21-hero period card restoration`).
- The Town Level 2/3 batch is intentionally not committed yet.
- Existing public Vercel preview is therefore older than this live Town batch and must not be treated as certification of the new Town files.

### Live sub-checkpoint — Barracks Level 4 proof source recovered
- Exact historical proof frame has been re-identified: `research/media_hunt/town-layers-reconstruction/fulltown-L4-rel13.png` (1920×1080).
- Source is `research/media_hunt/legacy-domains/assets/Level-4.png` (1700×1549), mirrored/processed in `barracks-analysis/assets_Level-4.png`.
- Re-running SIFT/RANSAC against the recovered frame reproduces essentially the same homography as `3-4-proof.json`: scale ~0.3775/0.3744 and translation ~1282.5/140.7. Current SIFT settings yield 199–217 inliers; the earlier saved run records 625/726 with the same geometric solution.
- Therefore `research/media_hunt/town-layers-reconstruction/3-4.png` has reproducible period-video placement evidence and is eligible for promotion after final compositing validation.

### Live sub-checkpoint — critical Level 4 geometry correction
- `fulltown-L4-rel13.png` is 1920×1080 but is NOT pixel-coordinate-identical to the runtime town canvas. SIFT/RANSAC against runtime `towns/background.jpg` gives ~76 inliers with a transform close to X=1.00, Y=0.874 plus ~98 px vertical translation; `towns/objects.png` independently gives ~82 inliers and Y=0.872 plus ~99 px translation.
- Therefore the earlier `3-4.png` candidate, whose bbox is expressed in video-frame coordinates, must NOT be promoted directly. Correct method is: estimate runtime→frame geometry from original background/objects, inverse-warp the period L4 frame to canonical runtime coordinates, then reconstruct/promote layers there.
- This correction is now the active Level 4 plan.

### Live sub-checkpoint — Git branch safety corrected
- Town L2/L3 checkpoint commit: `219796a` (`Restore Town level 2 and 3 upgrade media`).
- That commit was initially created while the only local branch was named `main`, but **it was not pushed to remote main**.
- Local branch `restoration/native-ui-20260903` has now been recreated at `219796a`; local `main` was reset to track `origin/main` at `a0069ba`.
- Continue all restoration work and future pushes from `restoration/native-ui-20260903`; do not force-push `main`.

### Live sub-checkpoint — Level 4 canonical reconstruction candidate validated
- Corrected canonical Level 4 candidates are under `research/media_hunt/town-layers-reconstruction/level4-canonical/`.
- Barracks (`3-4`) is reconstructed from the surviving first-party WordPress `Level-4.png`, placed by source→period-frame homography and then inverse scene geometry into runtime coordinates. Runtime bbox candidate: x=1282..1919, y=49..713.
- Bank/Inn/Training (`1-4`, `2-4`, `4-4`) use visible pixels from the 21-Nov-2021 period gameplay frame after inverse scene warp and calibrated background subtraction. Segmentation parameters were calibrated against exact Barracks alpha (visible IoU ≈0.85, precision ≈0.90, recall ≈0.94). Only truly occluded areas retain Level-3 pixels as explicitly documented fallback; no invented drawing is used.
- Candidate full-town composite validation against the canonicalized period frame improves MAE from 28.10 (background-only baseline) to 7.28; median error is 0.0 over the building-support validation field.
- Candidate files are NOT yet promoted to runtime until Level-4 preview derivation + final verifier pass are complete.

### Live sub-checkpoint — Level 4 townselect previews reconstructed and validated
- `townselect/*-4` candidate previews are now derived reproducibly from the canonical full-town Level 4 candidates by inverse of the saved Level-3 preview→full placement homographies. This derivation was independently validated on Levels 2/3, where inverse-warping full-town layers reproduces the recovered previews at alpha IoU ~0.95–1.00 and RGB MAE ~0.1–0.4.
- Level-4 preview candidates: `research/media_hunt/town-layers-reconstruction/level4-canonical/{1,2,3,4}-4-preview-candidate.png`.
- Machine-readable proof: `level4-canonical/TOWNSELECT_L4_PROOF.json`.
- Forward round-trip alpha IoU back into full-town coordinates: Bank 0.9140, Inn 0.9540, Barracks 0.9322, Training 0.9433. RGB MAE on overlap is ~4.6–5.2 for Bank/Inn/Training; Barracks ~13.5 because its first-party source color/alpha is cleaner than the compressed video reference.
- Off-canvas-only Level-3 fallback pixels: Bank 1,867; Inn 914; Barracks 755; Training 0. The fallback is used only where preview coordinates map outside the 1920×1080 town canvas and therefore cannot be observed/reconstructed from the full-town period frame.
- No sufficiently clean/direct Level-4 upgrade-modal frame was found in the 21-Nov walkthrough, so these previews must be labeled `PERIOD_DERIVED_RECONSTRUCTION`, not byte-identical originals.
- Next action: backup the eight runtime Level-4 transparent fallbacks, promote 4 full-town + 4 preview candidates, extend preservation verifier, and run `npm run check:all` before committing.

### Live sub-checkpoint — Level 4 promoted to runtime + verifier lock added
- Backed up the eight former transparent Level-4 fallbacks under `archive/pre-town-level4-recovery-20260903/`.
- Promoted all 4 canonical full-town Level-4 candidates to `towns/{1,2,3,4}-4.png`.
- Promoted all 4 derived Level-4 upgrade previews to `townselect/{1,2,3,4}-4.png`.
- Added `research/media_hunt/town-layers-reconstruction/RUNTIME_TOWN_RECOVERY.sha256`, covering all 24 Town recovery artifacts: 12 full-town layers for Levels 2–4 and 12 upgrade previews for Levels 2–4.
- Extended `scripts/verify-preservation.mjs` to require all Town layers/previews, verify their SHA-256 hashes, and fail if any Level 2–4 recovery file regresses to a <=573-byte transparent fallback.
- Runtime L4 dimensions are now correct: full-town 1920×1080 RGBA; upgrade previews 250×250 RGBA.
- This checkpoint is written before the full verifier/test run. If interrupted, next action is `npm run check:all`; only commit L4 if it passes.

### Live sub-checkpoint — Level 4 runtime verification PASSED
- `npm run check:all` PASSED after Level-4 promotion.
- Preservation verification now enumerates all `towns/1-1..4-4`, all used `townselect/*-2..4`, validates the 24-entry Town recovery SHA-256 manifest, and rejects <=573-byte fallback regressions.
- Engine tests and local provider tests still PASS; Town media integration did not alter Web3 safety/gameplay logic.
- Level-4 is now eligible to commit as its own protected checkpoint before Fight-icon archaeology.
