import { next } from '@vercel/functions';

const REALM = 'BNB HEROES Private';
const DEFAULT_USER = 'bnbh';

function noStoreHeaders(extra = {}) {
  return {
    'Cache-Control': 'private, no-store, max-age=0',
    'Pragma': 'no-cache',
    'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
    ...extra,
  };
}

function challenge(message = 'BNB HEROES is private. Authentication required.') {
  return new Response(message, {
    status: 401,
    headers: noStoreHeaders({
      'Content-Type': 'text/plain; charset=utf-8',
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
    }),
  });
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

function parseBasicAuth(header) {
  if (!header || !header.startsWith('Basic ')) return null;
  try {
    const decoded = atob(header.slice(6).trim());
    const separator = decoded.indexOf(':');
    if (separator < 0) return null;
    return {
      user: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

export default function middleware(request) {
  const expectedPassword = process.env.BNBH_SITE_PASSWORD;
  const expectedUser = process.env.BNBH_SITE_USER || DEFAULT_USER;

  // Fail closed: a missing secret must never make the preservation public.
  if (!expectedPassword) {
    return new Response('Private site authentication is not configured.', {
      status: 503,
      headers: noStoreHeaders({ 'Content-Type': 'text/plain; charset=utf-8' }),
    });
  }

  const supplied = parseBasicAuth(request.headers.get('authorization'));
  const allowed = supplied &&
    secureEqual(supplied.user, expectedUser) &&
    secureEqual(supplied.password, expectedPassword);

  if (!allowed) return challenge();

  return next({
    headers: noStoreHeaders(),
  });
}
