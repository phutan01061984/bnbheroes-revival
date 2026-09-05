# BNB HEROES Private Access Certification — 2026-09-05

## Goal

Keep the restored BNB HEROES deployment private so the production site, direct game routes, economy sidecar, JavaScript and media assets are not readable without the owner's credentials.

## Implementation

- Vercel built-in Password Protection was attempted first but the Hobby team returned `428 Advanced Deployment Protection is not enabled on your team`.
- Fallback is Vercel Routing Middleware in root `middleware.js` using the Node.js runtime and `@vercel/functions` `next()`.
- Authentication is HTTP Basic Auth over HTTPS.
- Username is `bnbh`.
- Password is **not stored in Git or this handoff**. It is stored as Vercel Secret environment variable `BNBH_SITE_PASSWORD`, Production only.
- Missing secret fails closed with HTTP 503; it never makes the site public.
- Unauthenticated/wrong credentials return HTTP 401 with `WWW-Authenticate: Basic realm="BNB HEROES Private"`.
- All auth responses use `Cache-Control: private, no-store`, `Pragma: no-cache`, and `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`.
- `tests/site-auth.test.mjs` is part of `npm test` and locks no-auth, wrong-user, wrong-password, correct-password and missing-secret behavior.

## Production deployment

- Auth wrapper source head: `aa2f646d396decc19af61ea4adec0dbc198ad812` (`Use Node runtime for private site auth`).
- Production canonical URL: `https://bnbheroes-revival.vercel.app`.
- Production immutable URL: `https://bnbheroes-revival-7iehwu6lo-phu-tans-projects.vercel.app`.
- Vercel deployment: `dpl_G7xXxh77veZb8G6nHbwbcXaJWDkS`.
- Status: Ready.
- Middleware runtime appears as a Vercel function deployed globally.

## Live HTTP gate

All checks were run against the canonical Production alias after the Node.js middleware deployment:

| Request | No/wrong auth | Correct auth |
|---|---:|---:|
| `/` | 401 | 200 |
| `/myheroes` | 401 | 200 |
| `/economy/` | 401 | 200 |
| `/cards/14.png` | 401 | 200 |

A direct static asset cannot bypass the password layer.

The authenticated `cards/14.png` remained byte-identical to the repository copy:

`ddf5042115e4f89ee6628866a4bb3fcdb2b7768c186d5504d1f94b77e78b336f`

## Security boundary

- The password value must never be committed to source, HANDOFF or screenshots.
- Changing the password should be done by rotating `BNBH_SITE_PASSWORD` in Vercel Production and then redeploying.
- Do not remove `middleware.js`, the Production secret, or `tests/site-auth.test.mjs` unless the owner explicitly asks to make the site public.
- Preview deployments currently do not have `BNBH_SITE_PASSWORD`; because middleware is fail-closed they will return 503 unless a Preview secret is deliberately added.
