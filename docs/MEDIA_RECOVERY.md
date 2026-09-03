# BNB HEROES Media Recovery Status

Last updated: 2026-09-03 — Hero-card promotion checkpoint.

This ledger distinguishes **direct original bytes**, **period-original bytes**, **period-derived reconstruction**, and **creative reconstruction**. Do not collapse those provenance classes.

## Runtime status

The recovered 17 Nov 2021 React frontend is playable through a safe local EIP-1193/Web3 adapter. Real signing/raw transactions/mainnet RPC remain disabled. `npm run check:all` passes.

### Hero cards — 21/21 period artworks promoted

All runtime `cards/1.png` … `cards/21.png` now contain surviving 2021 Hero artwork, copied **byte-for-byte** from `archive/hero-art-20211118/`. No card is resized, cropped, redrawn or generated during promotion.

Numeric identity confidence is documented at:

- `research/hero-id-mapping/PROOF.md`
- `research/hero-id-mapping/heroNameId-final.tsv`

Direct numeric anchors:

- heroNameId 14 = Arnulf of Esplin
- heroNameId 18 = Elrik the Imbuer

The other 19 IDs are high-confidence structural mappings. The recovered GitBook has an ordered 18-Hero drop-rate roster. The preserved 21-ID rarity array becomes an exact position-for-position match to that roster when IDs 10/14/18 are removed. Official period material says three new Heroes were added; 14/18 are the direct Arnulf/Elrik anchors, leaving ID10 for Lena. Artwork identities/rarities are additionally checked against period/official imagery using SIFT/RANSAC.

`cards/unkown.png` retains the historical fallback spelling and is not used as a mapped Hero card.

## Enemy mapping / runtime art

Original React source locks runtime types:

1. Red Skull 1
2. Red Skull 2
3. Red Skull 3
4. Red Skull Archer
5. Red Skull Assasin
6. Red Skull Mage
7. Zangrief (Chapter 1 Boss)

Recovery status:

- enemies 1/2/3: transparent derivatives from the first-party GitBook Level-1 enemy sheet; left/center/right ordering independently matched back to the earlier 4000×2070 first-party sheet.
- enemy 4 Archer: surviving direct runtime sprite is the anchor; it matches Tier-2 left crop.
- enemy 6 Mage: historical bot `mage1.bmp` matches Tier-2 middle crop at 0.9721 exact scale.
- enemy 5 Assasin: remaining right crop in the exact three-enemy Tier-2 set.
- enemy 7 Zangrief: direct `/enemies/7.png` byte not recovered; runtime is a transparent **period-derived reconstruction** from a higher-resolution Dec-2021 screenshot, cross-validated against the 17-Nov production boss video.

Proof:

- `research/media_hunt/gitbook-legacy/segmentation/TIER2_MAPPING_PROOF.md`
- `research/media_hunt/derivatives/enemies/PROOF.json`
- `research/media_hunt/derivatives/enemies/ZANGRIEF_PROOF.md`

## Barracks

`towns/3-1.png` is no longer a blank placeholder. Archived first-party `bnbheroes.xyz` HTML labels `Level-1.png` as **Level 1 Barracks**. The alpha art matches a 2021 gameplay screenshot with 125 RANSAC inliers. A known original town layer matches that screenshot with 153 inliers; composing those transforms places the Barracks into the original 1920×1080 town coordinate system.

Proof: `research/media_hunt/barracks-analysis/TOWN_3_1_PROOF.json`.

## Hashed client media

Direct 2021 bytes remain unavailable for six historical hashed filenames, but they are no longer broken runtime blockers:

- `card.df50fb38.png` — **period-derived reconstruction**: official-video median stack from 210 open-card detections.
- `card_lock.c211f00f.png` — **period-derived reconstruction**: official-video median stack from 51 locked-card detections.
- `recruit_card.aa5e12c7.png` — **period-original source adapted to runtime geometry** from first-party `BNBH-Card-Back.png`; strongest official-video match 195 RANSAC inliers.
- `rewards.16b2db64.png` — **period-derived reconstruction** from win/lose frame differential; original bundle confirms RESULT usage/500px render width.
- `You lose.00f95b2b.png` — **period-derived reconstruction** from period loss frames; original bundle confirms loss condition/500px render width.
- `fight.42bbd04e.png` — **RECONSTRUCTED_FROM_PERIOD_PIXELS** from 2021-11-07 gameplay Home frames. The original hashed bytes remain unrecovered, but the runtime art is now reconstructed from observed period pixels with leave-one-icon-out alpha validation (mean IoU 0.9557, min 0.9416) and period-frame recomposition mean MAE ~1.19. See `research/proofs/fight-period-reconstruction-20260903/`.

Full hashes/provenance: `research/media_hunt/final-promotions/PROVENANCE.md` and `research/media_hunt/card-analysis/CARD_SLOT_RECOVERY_PROOF.md`.

## Legacy GitBook / archive exhaustion

The old GitBook Space was recovered by public legacy bucket enumeration rather than guessed child URLs:

- 189 historical document objects archived.
- 20 publicly listable Space assets enumerated and archived.
- Hero Drop Rate text survives, including the ordered 18-Hero roster used in Hero-ID forensics.

Further searches also covered exact page titles/IDs, old `bnbheroes.xyz` paths, public web indexes, alternate Memento/archive routes, period articles/screenshots/video, old bot assets and bundle-embedded images. These searches are considered exhausted for current runtime blockers unless a genuinely new archive/revision/source appears.

## First-party / period sources preserved

- untouched 17 Nov 2021 React/CSS build under `archive/original-20211117/`;
- 16 Nov build evidence for historically active Recruit handler;
- later Dec-2021 build;
- official X media archive;
- 21 surviving Hero artworks under `archive/hero-art-20211118/`;
- old `bnbheroes.xyz` media + `keyframe-My-Video.mp4`;
- GitBook legacy document/asset storage;
- production/period gameplay videos and screenshots;
- historical bot crops/screens;
- Zhihu/ThisIsGame/other period mirrors used only where provenance is recorded.

## Validation

`npm run check:all` currently asserts:

- all 21 mapped cards exist;
- each is byte-identical to its archived period source;
- none equals `cards/unkown.png`;
- direct anchors 14=Arnulf and 18=Elrik remain fixed;
- all referenced static media exists;
- preservation provider contains no live BSC/Infura RPC endpoint;
- signing/raw-transaction methods remain blocked;
- engine/provider tests pass.

The native 2021 UI was previously browser-certified on the Vercel restoration preview across Home, My Heroes, Recruit, Expedite, Reserve/Return, Town Upgrade, Fight, Zangrief, win/loss RESULT, Claim, Battle Logs and mobile layout. After the 21-card promotion, a fresh public-preview smoke is required before calling this exact commit browser-certified.

## True remaining visual uncertainty

The project is functionally restored and the major missing-media queue is closed. The remaining material uncertainty is narrow:

1. `fight.42bbd04e.png` is a **period-pixel reconstruction**, not byte-identical original hashed media; direct archive recovery of the hash remains exhausted.
2. Hero numeric IDs 14/18 are direct; the other 19 are high-confidence structural reconstruction, not a surviving metadata-table dump.
3. Several other runtime assets are period-derived reconstructions rather than byte-identical hashed originals; each is explicitly labeled above/provenance docs.

Do not reopen solved items merely because the exact hashed client byte was not recovered; reopen only when a new source can materially improve provenance/fidelity.
