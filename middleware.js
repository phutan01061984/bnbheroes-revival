import { createHash } from 'node:crypto';
import { next } from '@vercel/functions';

export const config = {
  runtime: 'nodejs',
};

const COOKIE_NAME = 'bnbh_private_access';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function noStoreHeaders(extra = {}) {
  return {
    'Cache-Control': 'private, no-store, max-age=0',
    'Pragma': 'no-cache',
    'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
    ...extra,
  };
}

function secureEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  let diff = a.length ^ b.length;
  const length = Math.max(a.length, b.length);
  for (let i = 0; i < length; i += 1) {
    diff |= (a.charCodeAt(i % Math.max(a.length, 1)) || 0) ^
            (b.charCodeAt(i % Math.max(b.length, 1)) || 0);
  }
  return diff === 0;
}

function tokenFor(password) {
  return createHash('sha256').update(`bnbh-private:${password}`).digest('hex');
}

function readCookie(request, name) {
  const raw = request.headers.get('cookie') || '';
  for (const part of raw.split(';')) {
    const [key, ...value] = part.trim().split('=');
    if (key === name) return value.join('=');
  }
  return '';
}

function safeNext(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) return '/';
  return value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function loginPage(target, wrong = false) {
  const error = wrong ? '<div class="error">Sai mật khẩu</div>' : '';
  const html = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow,noarchive,nosnippet">
<title>BNB HEROES</title>
<style>
*{box-sizing:border-box}html,body{height:100%;margin:0}body{display:grid;place-items:center;background:#0b1018;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:20px}.box{width:min(360px,100%);padding:28px 24px;border:1px solid #263346;border-radius:16px;background:#121a26;box-shadow:0 18px 60px #0008}h1{font-size:20px;text-align:center;margin:0 0 20px;letter-spacing:.08em}input,button{width:100%;height:48px;border-radius:10px;font-size:16px}input{border:1px solid #34445b;background:#0b111a;color:#fff;padding:0 14px;outline:none}input:focus{border-color:#d7aa54;box-shadow:0 0 0 3px #d7aa5422}button{margin-top:12px;border:0;background:#d7aa54;color:#171109;font-weight:700;cursor:pointer}.error{text-align:center;color:#ff8d8d;font-size:14px;margin:0 0 12px}</style>
</head>
<body>
<form class="box" method="post" action="/__private_login">
<h1>BNB HEROES</h1>
${error}
<input type="password" name="password" placeholder="Mật khẩu" autocomplete="current-password" autofocus required>
<input type="hidden" name="next" value="${escapeHtml(target)}">
<button type="submit">Vào game</button>
</form>
</body>
</html>`;
  return new Response(html, {
    status: wrong ? 401 : 200,
    headers: noStoreHeaders({ 'Content-Type': 'text/html; charset=utf-8' }),
  });
}

export default async function middleware(request) {
  const expectedPassword = process.env.BNBH_SITE_PASSWORD;

  // Fail closed: a missing secret must never make the preservation public.
  if (!expectedPassword) {
    return new Response('Private site authentication is not configured.', {
      status: 503,
      headers: noStoreHeaders({ 'Content-Type': 'text/plain; charset=utf-8' }),
    });
  }

  const expectedToken = tokenFor(expectedPassword);
  const suppliedToken = readCookie(request, COOKIE_NAME);
  if (secureEqual(suppliedToken, expectedToken)) {
    return next({ headers: noStoreHeaders() });
  }

  const url = new URL(request.url);
  if (url.pathname === '/__private_login' && request.method === 'POST') {
    const form = await request.formData();
    const suppliedPassword = String(form.get('password') || '');
    const target = safeNext(String(form.get('next') || '/'));

    if (!secureEqual(suppliedPassword, expectedPassword)) {
      return loginPage(target, true);
    }

    return new Response(null, {
      status: 303,
      headers: noStoreHeaders({
        Location: target,
        'Set-Cookie': `${COOKIE_NAME}=${expectedToken}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; Secure; SameSite=Strict`,
      }),
    });
  }

  return loginPage(`${url.pathname}${url.search}`);
}
