# Zangrief / enemy 7 recovery proof

Original 17 Nov 2021 bundle locks type 7 as `Zangrief`, the Chapter-1 boss.

Direct `/enemies/7.png` bytes were not recovered from the old game host. Recovery source hierarchy used instead:

1. Production gameplay video `vpYV15hBOGs`, uploaded 17 Nov 2021, shows the newly implemented Chapter-1 boss fight and successful win.
2. A higher-resolution period screenshot recovered from a 8 Dec 2021 article is stored at `research/media_hunt/matters-20211208/boss-win.png` (1162x1140). It shows the same boss in the original BNB HEROES boss UI.
3. The boss character was isolated from that period screenshot with GrabCut/component filtering. Raw derivative: `7-from-bosswin-crop.png`.
4. Runtime `enemies/7.png` is a transparent 500x600 canvas derived from that period screenshot. It is a reconstruction, not claimed byte-identical to the missing original `/enemies/7.png`.

The previous `enemies/7.png` was not a usable Zangrief sprite; it was preserved at `placeholder-backup-7.png`.
