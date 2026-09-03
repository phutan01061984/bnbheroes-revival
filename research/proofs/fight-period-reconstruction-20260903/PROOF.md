# Fight button period-pixel reconstruction proof — 2026-09-03

Status: **RECONSTRUCTED_FROM_PERIOD_PIXELS**. This is not a byte-identical recovery of `fight.42bbd04e.png`.

Period source: 2021-11-07 gameplay footage, `VUt1ccH-dQ4-upgrades-1205-1245.mp4`, 1920×1080. The canonical source frame is t=31.5 s. Original React/CSS establishes a 150×150 desktop Fight render slot; period Home UI fiducials establish the source-frame placement.

The foreground classifier was calibrated with four surviving original menu icons (Recruit, Heroes, Upgrade, Market) and validated leave-one-icon-out. Mean IoU is >0.955; minimum held-out IoU is >0.941. The final Fight candidate, recomposited over the reconstructed period Town background, has mean MAE <1.2 and foreground-support mean MAE <0.14; the superseded creative reconstruction has mean MAE >48 against the same period observation.

Machine-readable evidence:
- `LOO_SAVED_MASK_METRICS.json`
- `FINAL_PROOF.json`
- `SOURCE_FRAME_GEOMETRY.json`

Curated visual evidence:
- `fight-150.png`
- `mask-150.png`

The previous creative 512×512 runtime asset is preserved in `archive/pre-fight-period-recovery-20260903/fight.42bbd04e.png`.
