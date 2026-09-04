# Card-state recovery proof

Date: 2026-09-04

## Status

- `static/media/card.df50fb38.png`: **RECONSTRUCTED_FROM_PERIOD_PIXELS** — open / recruitable slot.
- `static/media/card_lock.c211f00f.png`: **RECONSTRUCTED_FROM_PERIOD_PIXELS** — Town Inn locked slot.
- `cards/unkown.png`: **RECONSTRUCTED_FROM_PERIOD_PIXELS** — recruited Hero pending arrival / EXPEDITE.
- `static/media/recruit_card.aa5e12c7.png`: unchanged first-party-period adapted card used in Recruit/Hero-Recruited modals.
- Original hashed response bytes for the three reconstructed card-state images are still not recovered.

## Why the 2026-09-03 mapping was wrong

The first recovery pass correctly extracted three repeated card-like visual clusters from official 2021 footage, but assigned the cluster meanings incorrectly. Direct image inspection on 2026-09-04, combined with recovered bundle control flow and the official video timeline, proves the correct semantics below.

Recovered 17-Nov bundle behavior:

- module 175 -> `static/media/card.df50fb38.png`, rendered when slot component `unlock === true` and paired with the `Recruit` button.
- module 174 -> `static/media/card_lock.c211f00f.png`, rendered when `unlock === false` and paired with `Upgrade Town Inn to Level ...`.
- a recruited Hero with non-zero `arrivalTime` is rendered separately through `./cards/unkown.png` and the EXPEDITE flow.
- module 104 -> `recruit_card.aa5e12c7.png`, used inside the Recruit / Hero-Recruited modal; it is not the grid locked-state image.

## Primary visual evidence

Official BNB Heroes YouTube video:

- Video ID: `WZwbq7Va0gg`
- Title: `BNB HEROES NFT minting function is tested and fully working!`
- Upload date: 2021-10-17
- Preserved locally: `research/media_hunt/youtube/deep/WZwbq7Va0gg.mp4`
- Preserved resolution: 1920x1080

Timeline verified from the official footage:

- ~20 s, before recruiting: the open/recruitable slots display the plain BNB HEROES card back; slots requiring Town Inn upgrades display padlocks.
- ~45-50 s, after the first recruit: the new Hero slot displays the yellow question-mark card with arrival countdown / EXPEDITE.
- ~55-60 s, after EXPEDITE: the question-mark card is replaced by the revealed Hero.
- ~80-90 s, after a second recruit without expedite: the second pending Hero remains the yellow question-mark card.

Independent near-launch corroboration: the preserved Zhihu/reviewer My Heroes screenshot from November 2021 shows real Heroes followed by `Upgrade Town Inn` slots using the padlock artwork, confirming that `card_lock = padlock` remained true near launch and was not only a prototype-state convention.

## Multi-frame clustering

Frames from 16-91 s were sampled every 0.5 s. Card-like contours were normalized to 227x330 and clustered by normalized image correlation. 356 candidates were retained.

Correct cluster semantics:

- Cluster 0: 210 instances -> **padlock** -> `card_lock.c211f00f.png`.
- Cluster 1: 51 instances -> **yellow question mark** -> `cards/unkown.png` pending-arrival state.
- Cluster 2: 45 instances -> **plain BNB HEROES card back** -> `card.df50fb38.png` open/recruitable state.

Preserved median cluster images:

- committed proof snapshot: `research/proofs/card-state-semantic-20260904/evidence/mint-20s.png`
- `research/proofs/card-state-semantic-20260904/evidence/cluster-00-n210.png`
- `research/proofs/card-state-semantic-20260904/evidence/cluster-01-n51.png`
- `research/proofs/card-state-semantic-20260904/evidence/cluster-02-n45.png`

The larger raw extraction/video workspace remains intentionally outside the compact restoration commit; the committed proof snapshots above are sufficient to inspect the three recovered visual states without re-running the full archaeology pipeline.

## Reconstruction geometry and transform

The previous reconstruction transform was recovered exactly by comparing the median clusters to the promoted 459x654 outputs:

1. trim the 1-pixel captured border on every side;
2. Lanczos resize to 459x654;
3. Gaussian blur with sigma 0.7;
4. mild unsharp `1.18 * resized - 0.18 * blurred`;
5. encode RGBA.

This reproduces the previously reconstructed padlock/question-mark pixels while correcting only which runtime state receives them. The open/recruitable card was rebuilt from Cluster 2 using the same recovered transform.

## Corrected runtime hashes

- `static/media/card.df50fb38.png` — `0451318f5e6a9b7ca55705630a0f51bb104c9597d1585ee5e4e986a1800721be`
- `static/media/card_lock.c211f00f.png` — `cac62dc89c4e15b36fb738131ca99c04b90c1211bf9e2e175e655394fef8e100`
- `cards/unkown.png` — `f68d9efe4d89f00ec1e5ef6857b046d9aaa69147c52ca11c6f9e1a8e24284103`
- `static/media/recruit_card.aa5e12c7.png` — `12ddc8b41804baff0e78ede53833bd503fa24e3b130ec2d01203fca8cf65aae6` (unchanged)

Pre-correction runtime bytes are preserved under `archive/pre-card-semantic-fix-20260904/`.

## Provenance boundary

These three corrected state images are **not byte-identical original hashed responses**. They are reconstruction derivatives made from repeated pixels visible in official 2021 BNB Heroes footage, with semantics resolved by the recovered 17-Nov bundle and independent period screenshots. Label them `RECONSTRUCTED_FROM_PERIOD_PIXELS` / `RECONSTRUCTED`, never `ORIGINAL_BYTES`.
