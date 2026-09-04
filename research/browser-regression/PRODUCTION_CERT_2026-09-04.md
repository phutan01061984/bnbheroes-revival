# BNB HEROES — Final Production Certification (2026-09-04)

## Certified runtime

- Git branch: `restoration/native-ui-20260903`
- Runtime commit: `4a94061769122d26a94ee8f036768307fc2f0be2` (`Finalize clean Lose Result art`)
- Clean detached-worktree Preview: `https://bnbheroes-revival-ayxrt71xz-phu-tans-projects.vercel.app`
- Preview deployment: `7EXAvr44FyBxWJNoLqtZv7vrdHi6`
- Production deployment created by promoting the already-tested Preview: `dpl_Ax8drGP62RaF8TuXHzyrc1LZA5gX`
- Production immutable URL: `https://bnbheroes-revival-24k8sh2uo-phu-tans-projects.vercel.app`
- Production alias: `https://bnbheroes-revival.vercel.app`
- Vercel target/status at certification: `production` / `Ready`

## Byte identity gate

Production `static/media/You lose.00f95b2b.png` was fetched with cache bypass after promotion:

- HTTP: `200`
- Bytes: `187246`
- SHA-256: `0e2369ac0879584ff11584fe49a682736e60a416206b8d9197a491aeec096d9f`

This is exactly the same Lose-art hash that passed the clean Preview browser gate. Production was promoted from the tested deployment rather than rebuilt from a different source state.

## Pre-promotion gates

Before promotion, commit `4a94061` was checked from a clean detached worktree:

- `npm run forensics:all` — **PASS** (preservation verifier, engine/provider tests, and all 10 visual-forensics cases).
- My Heroes — **PASS**: recruitable slot uses the plain BNB HEROES card back; Town-Inn-locked slots use padlocks.
- Forced Win RESULT — **PASS `read_image`**: one `ENEMY DEFEATED` title, one BNB/XP/HP row set, clean chest/glow.
- Forced Lose RESULT — **PASS `read_image`**: `YOU LOSE`, no rectangular alpha/crop band, continuous Mage/staff + soft glow, clean separator and reward rows.

Only after all three browser gates passed was that exact Preview promoted.

## Production browser smoke

The same three visual gates were repeated against `https://bnbheroes-revival.vercel.app` after promotion:

1. **My Heroes PASS** — recovered Hero art, plain Recruit card back, three Town Inn padlocks; no semantic regression.
2. **Win RESULT PASS** — deterministic QA win (`Math.random = () => 0.999999`) rendered a single clean Result modal with chest art and one BNB/XP/HP set.
3. **Lose RESULT PASS** — deterministic QA loss (`Math.random = () => 0`) rendered the final Mage/staff art with no rectangle/crop artifact and clean DOM reward rows.

Compressed durable review evidence:

- `evidence/2026-09-04-production-final-myheroes.jpg` — SHA-256 `3f172f0b4bf09f0d0e696c0ea41eb7d1fa000016872695f0e70e0ce6dd16dd09`
- `evidence/2026-09-04-production-final-win.jpg` — SHA-256 `b2021e0296ddc7adf9e8f4a81202fe73e1279adb9c79b82da8a47b6ef57c6122`
- `evidence/2026-09-04-production-final-lose.jpg` — SHA-256 `89e3d55e9b10959dee5e2d9af63d1f9ea3cd5098e0f0044a67637b0d23e0ad67`

The full-resolution browser PNGs remain local/untracked archaeology/QA artifacts by design.

## QA state integrity

Production QA used the existing `bnbheroes-revival-v2` localStorage save only after first backing up its exact string in sessionStorage. The save was restored after Win and again after Lose; the final equality check returned `true`, and the temporary QA backup keys were removed. No QA battle state is intentionally left in the user's Production save.

## Provenance and safety boundary

- `You lose.00f95b2b.png` remains **RECONSTRUCTED_FROM_PERIOD_PIXELS / FIRST-PARTY PERIOD ART**, not byte-identical original hashed media.
- The final Mage/staff layer is derived from first-party 2021 Skull Mage art, mapped into the independently established Result geometry; the glow is a smooth reconstruction rather than captured modal pixels.
- Real wallet signing/raw mainnet transaction paths remain disabled by the preservation provider. This certification does not re-enable the historical economic contracts.

## Closeout status

**Production restoration closeout: PASS.** The current branch/Production deployment is the highest-evidence public-source restoration reached in this recovery. Do not repeat the rejected Lose-art candidates or reopen saturated archive searches unless a genuinely stronger historical artifact appears.
