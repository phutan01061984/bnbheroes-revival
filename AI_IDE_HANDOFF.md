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

### Confirmed lost / fallback assets

Wayback + Memgator + Common Crawl searches did **not** recover original bytes for several assets. Production intentionally prevents broken images while preserving provenance.

- `static/media/fight.42bbd04e.png`
  - current file is a reconstructed Fight fallback using 2021 palette/font.
  - **NOT original art.**

- `towns/3-1.png` (Barracks level 1)
  - current production file is transparent, preserving the underlying original town instead of inventing a building.
  - town levels not recovered are transparent fallbacks.

- `/townselect/*`
  - current files are transparent fallbacks because archive did not capture originals.

- `static/media/card.df50fb38.png`
- `static/media/card_lock.c211f00f.png`
- `static/media/recruit_card.aa5e12c7.png`
- `static/media/rewards.16b2db64.png`
- `static/media/You lose.00f95b2b.png`
  - neutral/reconstructed preservation fallbacks; **not original art**.

- enemies other than the surviving archived sprite currently placed at `/enemies/4.png`
  - neutral `ENEMY ART LOST` fallback is used rather than inventing the enemy portrait.

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

### Critical mapping warning

The article order is alphabetical/editorial. **It is NOT the `/cards/1.png ... /cards/21.png` heroNameId order.**

Do not map the other 19 heroes to numeric IDs by position.

Current production uses only two previously established identity anchors:

- `/cards/14.png` → Arnulf of Esplin
- `/cards/18.png` → Elrik the Imbuer

All other numeric card IDs currently use a neutral `HERO ART LOST` fallback until a numeric identity can be proved.

If continuing identity work, produce a local proof artifact (on-chain `getHero` result + official named NFT evidence) before changing these mappings.

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
