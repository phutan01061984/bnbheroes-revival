# Hero `heroNameId` mapping proof

Status: **runtime promotion approved with explicit confidence labels**.

This recovery does not pretend that all 21 numeric IDs were found in a surviving metadata API. IDs 14 and 18 are direct anchors; the remaining IDs are a high-confidence structural reconstruction from multiple independent first-party/period sources.

## 1. Direct numeric anchors

The preserved chain/session forensics establish:

- `heroNameId=14` → **Arnulf of Esplin**. Runtime template index 13 is Rare / Soldier with A600 D700 S400.
- `heroNameId=18` → **Elrik the Imbuer**. Runtime template index 17 is Epic / Rogue with A900 D500 S500.

The runtime files `cards/14.png` and `cards/18.png` were already byte-identical to the corresponding period artwork before this promotion.

See `docs/FORENSICS.md`, `prototype/src/legacy-data.js`, and the clean recovered 17-Nov-2021 application bundle for the underlying contract/template data.

## 2. Surviving historical 18-Hero roster

The recovered legacy GitBook page **Hero Drop Rate** is preserved in:

`research/media_hunt/gitbook-legacy/documents/LATEST_CONTENT_REPORT.md`

Its 18-Hero order and rarity sequence is:

1. Dayne of Gerston — Common
2. Andin Olis — Uncommon
3. Torlov Branhart — Common
4. Aelof Orstone — Uncommon
5. Jan Rhylen — Common
6. Demisov the Bold — Uncommon
7. Esfel of Lordan — Common
8. Reis of the Knife — Uncommon
9. Sivalas Zefen — Common
10. Thalas One-Eye — Uncommon
11. Lady Ella of Tir — Rare
12. Sir Bertrand — Rare
13. Balen Fellwood — Rare
14. Helia Stormcall — Epic
15. Xegis Branfyre — Epic
16. Uriah the Sage — Legendary
17. Sir Asten — Legendary
18. Duke Duscair IV — Legendary

## 3. The 21-ID contract structure

The preserved Character snapshot has 21 sequential `heroNames` values (`1..21`) and these 21 rarity/type values:

`C U C U C U C U C C U R R R R E E E L L L`

where C=Common, U=Uncommon, R=Rare, E=Epic, L=Legendary.

Removing exactly IDs **10, 14, and 18** yields:

`C U C U C U C U C U R R R E E L L L`

That is an **exact position-for-position match** for the historical GitBook 18-Hero roster above.

Official X material from the period independently says that **three new Heroes** were being added. Two of those insertion positions are independently identified by the numeric anchors:

- ID 14 = Arnulf
- ID 18 = Elrik

The surviving 21-art set has one other Hero not present in the 18-name GitBook roster: **Lena**. Therefore the remaining inserted slot is ID 10 = Lena.

This gives a single consistent ordered merge: preserve the GitBook roster order and insert Lena/Arnulf/Elrik at IDs 10/14/18.

## 4. Artwork identities are period evidence, not generated replacements

All 21 promoted card images come byte-for-byte from:

`archive/hero-art-20211118/`

They were recovered from a period 18-Nov-2021 article / first-party WordPress media trail. The archive originals remain immutable.

The identities/rareness of many artworks are independently corroborated against official rarity lineup imagery using SIFT + RANSAC:

- Helia Stormcall → Epic: 324 inliers
- Xegis Branfyre → Epic: 342 inliers
- Balen Fellwood → Rare: 212 inliers
- Sir Bertrand → Rare: 192 inliers
- Lady Ella → Rare: 183 inliers
- Uriah → Legendary: 192 inliers
- `Layer-1.png` → Uncommon group: 63 inliers; after the other four Uncommon identities are resolved, it is the remaining artwork for **Demisov the Bold**.

Machine-readable CV evidence: `art-to-official-rarity-sift.tsv` and `official-group-layout-sift.tsv`.

## 5. Confidence policy

- `DIRECT_ANCHOR`: numeric ID ↔ identity has independent direct forensic evidence. Currently IDs **14, 18**.
- `HIGH_STRUCTURAL`: numeric identity follows from the exact 18-roster order + exact rarity insertion structure + period artwork identity.
- `HIGH_STRUCTURAL_NEW_INSERT`: the one residual inserted slot after the two direct inserted anchors; currently ID **10 = Lena**.

The mapping used by the runtime is in `heroNameId-final.tsv`.

## 6. Paths investigated but not promoted as proof

We also investigated the old first-party NFT metadata route `https://metadata.bnbheroes.io/token/{id}`, historical public BSC RPC state, Wayback/Common Crawl, Sourcify, BscScan/3xpl-style source/history routes, urlscan first-party captures, and the official X “three new Heroes” video. These were useful provenance/context checks but did not yield a stronger surviving numeric-ID table. The dead metadata host and pruned/blocked archival state are therefore **not** used to inflate confidence.

## Runtime promotion rule

`cards/1.png` … `cards/21.png` are exact copies of their mapped period files. No crop, resize, redraw, generative fill, or color alteration is allowed during promotion. `cards/unkown.png` remains the historical/fallback unknown-card asset and is not evidence for any Hero identity.
