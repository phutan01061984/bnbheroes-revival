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
