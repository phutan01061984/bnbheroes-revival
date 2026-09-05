# BNB HEROES Private Access Certification — 2026-09-05

## Goal

Keep the restored BNB HEROES deployment private while making login as simple as possible for the owner: one password field, no username prompt.

## Implementation

- Vercel built-in Password Protection was attempted first but the Hobby team returned `428 Advanced Deployment Protection is not enabled on your team`.
- Production is therefore protected by root `middleware.js` using Vercel Routing Middleware / Node.js runtime and `@vercel/functions` `next()`.
- Login UI is a minimal HTML page containing exactly one `type="password"` input plus a `Vào game` button.
- There is **no username**.
- The password value is **not stored in Git, HANDOFF, screenshots or this certificate**. It lives only as Vercel Secret environment variable `BNBH_SITE_PASSWORD`, Production only.
- Correct login sets a SHA-256-derived access token in cookie `bnbh_private_access` with `HttpOnly; Secure; SameSite=Strict; Max-Age=604800` (7 days), then redirects back to the originally requested path.
- The cookie does not contain the plaintext password.
- Missing Vercel secret fails closed with HTTP 503; it never makes the site public.
- Wrong password returns HTTP 401 and the same one-field page with `Sai mật khẩu`.
- Unauthenticated GETs return only the login page, including attempts to request direct media/assets; protected bytes are never returned without a valid cookie.
- Responses use `Cache-Control: private, no-store`, `Pragma: no-cache`, and `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`.
- `tests/site-auth.test.mjs` is part of `npm test` and regression-locks login page shape, wrong password, correct login/cookie, direct-asset protection and missing-secret fail-closed behavior.

## Production deployment

- Password-only login source commit: `f58ef837b97a172652a0ccbd41ede7ef15d8fe4a` (`Simplify private access to password-only login`).
- Production canonical URL: `https://bnbheroes-revival.vercel.app`.
- Production immutable URL: `https://bnbheroes-revival-4mvuz73l5-phu-tans-projects.vercel.app`.
- Vercel deployment: `dpl_AMm1eTmz6fWXDXUnDHRXwQWAgB3d`.
- Status: Ready.

## Live Production gate

All checks were run against the canonical Production alias after the password-only deployment:

- Unauthenticated `/` → HTTP 200 login page with exactly **1 password input**, **0 text/username inputs**, and one `Vào game` button.
- Wrong password POST → HTTP 401 + `Sai mật khẩu`.
- Correct password POST → HTTP 303 + private access cookie.
- Cookie-authenticated `/` → HTTP 200 game.
- Cookie-authenticated direct `/cards/14.png` → HTTP 200 image.
- Unauthenticated direct assets receive the login page rather than the protected asset bytes.

The authenticated `cards/14.png` remained byte-identical to the repository copy:

`ddf5042115e4f89ee6628866a4bb3fcdb2b7768c186d5504d1f94b77e78b336f`

## Security boundary

- Never commit the password value to source or documentation.
- Rotate the password by replacing Vercel Production Secret `BNBH_SITE_PASSWORD` and redeploying.
- Do not remove `middleware.js`, the Production secret, or `tests/site-auth.test.mjs` unless the owner explicitly asks to make the site public.
- Preview deployments without `BNBH_SITE_PASSWORD` fail closed with 503 rather than becoming public.
