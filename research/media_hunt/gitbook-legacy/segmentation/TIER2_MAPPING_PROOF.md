# Tier-2 enemy mapping proof

Period/runtime contract from `archive/original-20211117/static/js/main.5e2ca500.chunk.js`:

- type 4 = Red Skull Archer
- type 5 = Red Skull Assasin
- type 6 = Red Skull Mage

The first-party GitBook `Level 2 Skull Enemies.jpg` contains exactly three level-2 enemies, segmented left-to-right as `tier2/1.png`, `tier2/2.png`, `tier2/3.png`.

Evidence:

1. Original runtime `/enemies/4.png` SIFT/RANSAC vs Tier-2 crops:
   - left `1.png`: 251 inliers in the first proof run; later direct runtime-vs-crop run: 59/63 inliers.
   - middle `2.png`: 0 inliers in direct runtime-vs-crop run.
   - right `3.png`: 0 inliers in direct runtime-vs-crop run.
   Therefore left = type 4 Red Skull Archer.

2. Historical bot asset `mirrors/bnb-heroes-bot/mage/mage1.bmp` multiscale template matching:
   - left: 0.7306
   - middle: 0.9721 at exact 1.0 scale, location `(25,113)`
   - right: 0.6997
   Therefore middle = type 6 Red Skull Mage.

3. The GitBook page states there are exactly three Level-2 enemies. With left locked as type 4 and middle locked as type 6, the remaining right crop is type 5 Red Skull Assasin.

Runtime mapping locked:

- `enemies/4.png` = left = Red Skull Archer
- `enemies/5.png` = right = Red Skull Assasin
- `enemies/6.png` = middle = Red Skull Mage

Additional period validation: 7 Nov 2021 gameplay video `VUt1ccH-dQ4` says “archer versus archer” while the original type-4 asset produces the strongest feature match in that fight view.
