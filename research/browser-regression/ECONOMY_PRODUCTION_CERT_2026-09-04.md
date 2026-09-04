# BNB HEROES Economy Sidecar — Production Certification (2026-09-04)

## Scope

Post-restoration economy analysis only. The frozen game-preservation baseline remains annotated tag `preservation-v1.0.0` at commit `2ffd3ccb8374b2a887f1c90fab74aa8a6dfe6014`. The economy sidecar does not rewrite the preserved 2021 runtime.

## Source / deployment lineage

- Economy implementation commit: `69529de001dc3e9d7c023d9c0036b89490f3da6b` (`Correct economy model against exact hero table`).
- Rejected first economy Preview: commit `8afdf06`; browser review exposed stale narrative assumptions (Arnulf stats / Training L4 / class labels). It was **never promoted**.
- Certified clean Preview:
  - URL: `https://bnbheroes-revival-oonrcw7qf-phu-tans-projects.vercel.app`
  - deployment: `dpl_4hfG7rzQvK37bCEkdAaSp5yAkA9z`
  - target: Preview
  - status: Ready
- Production after promoting the tested Preview output:
  - canonical alias: `https://bnbheroes-revival.vercel.app`
  - immutable URL: `https://bnbheroes-revival-eds49batf-phu-tans-projects.vercel.app`
  - deployment: `dpl_2K8Qxx9GtYf4ynvB9DT1zGyaEHLh`
  - target: Production
  - status: Ready

The promotion used `vercel promote` on the already-browser-tested Preview. No separate source rebuild was used as the certification source.

## Correctness gates

### Model / preservation tests

- `npm run check:all` — PASS.
- `npm run economy:test` — PASS.
- All 21 economy Hero templates are test-locked against `research/hero-id-mapping/onchain/character-template-table-20260903.tsv`.
- Exact corrected facts used by the dashboard include:
  - Arnulf of Esplin ID14 = `A600 / D700 / S400`.
  - Training L4 = `+140 A/D/S`.
  - class labels = `Soldier / Hunter / Rogue / Mage / Knight`.
  - target block = `12,730,607`.
  - 21 Hero templates / 7 enemies.

### Browser interaction gate — Preview and Production

Default Arnulf/Zangrief/base-Town output:

- Win chance: `45.9%`.
- Reward / win: `0.03360 BNB`.
- EV / fight: `0.01542 BNB`.
- HP-limited output: `0.0421 BNB/day`.
- Recruit mechanical payback: `7.12 days` for Arnulf specifically.

Independent interaction check with Uriah the Sage + Boss + Bank L4 + Training L4:

- Win chance: `50.3%`.
- Reward / win: `0.05123 BNB`.
- EV / fight: `0.02577 BNB`.
- HP-limited output: `0.0704 BNB/day`.
- Recruit mechanical payback: `4.26 days`.

Pool slider at 25% active:

- Active Heroes: `8,863`.
- Gross BNB/day: `399.51`.
- zero-inflow runway: `8.2 days`.

Production interaction changed no localStorage values (`before === after` returned `true`). The sidecar has no wallet/signing route.

## Responsive / visual gate

`read_image` review passed on:

- Production desktop overview:
  - `research/browser-regression/2026-09-04-economy-production-desktop.png`
  - SHA-256 `0c6d40c58d329a81d19bd7f31615b5f86b234070150a73ae7ff8d9265e746319`
- Preview mobile 390×844 top:
  - `research/browser-regression/2026-09-04-economy-preview-69529de-mobile-390x844.png`
  - SHA-256 `aaac00acfe517e7aa45f6c710242b98d330eab559bbad3e32bab0a38fcff0e8b`
- Preview mobile calculator:
  - `research/browser-regression/2026-09-04-economy-preview-69529de-mobile-calculator.png`
  - SHA-256 `bf55aed82bcc2d8bf34ebfd8b6be7ef436ca728a58affc5cb326dfe32725edb9`

No horizontal overflow or unreadable calculator controls were observed at 390×844.

## Frozen-runtime byte gate

`git diff preservation-v1.0.0..69529de` contains only post-restoration documentation/economy/test files; no preserved runtime path changed.

Production bytes were fetched from the public alias and matched repository bytes exactly:

| Runtime file | Production SHA-256 | Result |
|---|---|---|
| `index.html` | `c099b138a6c02dc5a19915497cf7ed7f141e705e0381e3c1d4dbfc0d43135a72` | MATCH Git + frozen tag |
| `preservation-provider.js` | `f84005fa12bc6dd27841907dd809b6d1c9e662c7a70e203c12424826bbef7f72` | MATCH Git + frozen tag |
| `preservation-shim.js` | `01d65c89c41b5d8db0512b0d1e2a2cef8b3cdb783a803f1a9961fca5ef7be173` | MATCH Git + frozen tag |
| `prototype/src/engine.js` | `2a12d91410cee7b5553c183e62f48acd5c3847de07924fde27ab195512e1b31d` | MATCH Git + frozen tag |
| `static/js/main.5e2ca500.chunk.js` | `44ed149f9e01a563e804d2c5f7e17fb9bbeedb00fb45d1f7413c9fb7d6fa5084` | MATCH Git + frozen tag |
| `static/css/main.433e3d53.chunk.css` | `ced75e42b93a67a7099c1db14fe42409de01a241ef94e753915e351fc494bb3f` | MATCH Git + frozen tag |
| `static/media/You lose.00f95b2b.png` | `0e2369ac0879584ff11584fe49a682736e60a416206b8d9197a491aeec096d9f` | MATCH Git + frozen tag |

Economy production bytes also match Git exactly:

- `economy/data.json` SHA-256 `b57d8dec0e4871b4b99f0747b5d0f28050196e571739aafe67fc344ef23dbc95`.
- `economy/index.html` SHA-256 `460d6144d66940264db7212cb0bf30d7e52767290c000cf3809ed82dcc53d317`.

The protected Preview's `index.html` had exactly one environment-only difference: Vercel injected its Preview feedback-toolbar script after the closing HTML. All substantive game JS/CSS/provider/engine/art bytes already matched Git on Preview. Production does not contain that Preview injection and its `index.html` matches Git exactly.

## Final status

**PASS.** Economy Phase 2 is complete and public at:

`https://bnbheroes-revival.vercel.app/economy/`

The preserved 2021 game remains byte-identical to the frozen preservation baseline on the certified runtime files above.
