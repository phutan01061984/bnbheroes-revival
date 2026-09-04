# Hero `heroNameId` mapping proof

Status: **runtime mapping corrected 2026-09-03 from direct on-chain template arrays + independent period stat fingerprints**.

## 1. Direct on-chain 21-slot table

Production Character proxy `0x6DA72F24c56197Dcf6B8920baCb183F6ccca8b01` exposes public arrays `heroNames`, `heroTypes`, `heroClasses`, `attacks`, `armors`, and `speeds` through the recovered 10-Dec ABI. Read-only calls show slots 0..20 have `heroNames = 1..21` exactly. The complete snapshot is:

`research/hero-id-mapping/onchain/character-template-table-20260903.tsv`

The Solidity mirror independently explains the structure: `mint()` selects one template slot from `randomTable`, then assigns `Hero.name = heroNames[seedNum]`, `heroType = heroTypes[seedNum]`, class and base stats from the parallel arrays.

## 2. Independent period calculator provides literal name + base stats

The independent mirror `mirrors/honeyvig-bnbhero` has Git commit `6cb15a4b7f6c7ce8a6f2fe777a6b071e39d56cec`, authored **2021-12-06**. Its `src/util/hero.js` lists literal Hero names and `[attack, armor, speed]` triples.

Joining those period triples to the on-chain parallel arrays uniquely locks **17 numeric IDs** (including the prior Arnulf/Elrik anchors). Full join proof:

`research/hero-id-mapping/onchain/PERIOD_STAT_JOIN_PROOF.md`

Critically this join falsified one prior structural inference:

- **ID 9 = Lena** (`500/400/600`)
- **ID 10 = Sivalas Zefen** (`600/300/600`)

The old `9=Sivalas / 10=Lena` mapping was therefore corrected in runtime and preservation data.

## 3. Remaining four identities

- **ID4 = Aelof Orstone**: after the unique stat joins, ID4 is the only unmatched Uncommon template and Aelof is the only unmatched old-roster Uncommon; the preserved GitBook order also agrees.
- **ID19 = Uriah the Sage**: ID19 has on-chain `heroClass=4`, the same mage class demonstrated by Lady Ella/Helia/Xegis; the period calculator identifies Uriah as the Legendary mage. GitBook order agrees.
- **ID20 = Sir Asten**, **ID21 = Duke Duscair IV**: retained from the preserved ordered GitBook roster plus the 21-slot insertion model. The period calculator repeats the same Legendary stat triple for all three names, an apparent copy error, so it is not used to distinguish IDs20/21.

## 4. Existing period roster / new-Hero evidence remains corroboration

The recovered legacy GitBook Hero Drop Rate page preserves the original 18-name order. Official period material says three Heroes were added before/at launch. Direct/period evidence still supports Arnulf and Elrik as inserted IDs 14/18; the stat join now shows Lena is ID9 rather than the previously inferred inserted ID10, so **do not reuse the old “remove IDs 10/14/18” argument as authoritative numeric proof**. It is superseded by the direct template/stat evidence above.

## 5. Artwork provenance

All runtime `cards/1.png` … `cards/21.png` remain exact byte copies from `archive/hero-art-20211118/`; only their numeric placement changes when stronger ID evidence demands it. The ID9/10 correction swaps the untouched period bytes for Lena and Sivalas, with the previous runtime pair archived under `archive/pre-hero-id-9-10-correction-20260903/`.

## 6. Confidence labels

- `DIRECT_ANCHOR`: prior direct numeric identity evidence, now independently stat-validated (IDs14/18).
- `DIRECT_PERIOD_STAT_MATCH`: unique literal-name period stat triple ↔ on-chain numeric template slot.
- `HIGH_COMPLETE_SET`: complete-set exclusion plus ordered first-party roster (ID4).
- `HIGH_CLASS_ROSTER`: on-chain class plus period literal class plus ordered roster (ID19).
- `HIGH_STRUCTURAL`: ordered first-party roster/insertion structure where no unique stat fingerprint survives (IDs20/21).

Machine-readable final mapping: `research/hero-id-mapping/heroNameId-final.tsv`.
## 7. Launch-deployment lineage check (2026-09-04)

A final archive-state pass recovered every Character implementation boundary from proxy deployment through the 17-Nov frontend capture. Crucially, at deployment block **12,641,026** `totalSupply=0` while numeric templates **4, 19, 20, 21 already exist**, and those four tuples remain unchanged across all four launch-week upgrades and at block 12,730,607. See `research/contract-forensics/CHARACTER_LAUNCH_LINEAGE_20260904.md`.

This directly rejects a post-deploy “three new Heroes were inserted into the arrays later” explanation. It strengthens numeric-template continuity but **does not upgrade literal-name confidence**: the chain stores numeric IDs rather than the names Aelof/Uriah/Asten/Duscair. In particular, further implementation-history analysis cannot resolve ID20 vs ID21 without an external literal-name/art/token bridge.

