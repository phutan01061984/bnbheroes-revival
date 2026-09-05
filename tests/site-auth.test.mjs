import assert from 'node:assert/strict';

process.env.BNBH_SITE_PASSWORD = 'correct-horse-test-secret';
const { default: middleware } = await import('../middleware.js');

const req = (url = 'https://bnbheroes.example/myheroes', init = {}) => new Request(url, init);

let res = await middleware(req());
assert.equal(res.status, 200);
assert.match(await res.text(), /name="password"/);
assert.doesNotMatch(res.headers.get('www-authenticate') || '', /Basic/i);
assert.equal(res.headers.get('x-robots-tag'), 'noindex, nofollow, noarchive, nosnippet');

const wrongBody = new URLSearchParams({ password: 'wrong', next: '/myheroes' });
res = await middleware(req('https://bnbheroes.example/__private_login', {
  method: 'POST',
  body: wrongBody,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
}));
assert.equal(res.status, 401);
assert.match(await res.text(), /Sai mật khẩu/);

const goodBody = new URLSearchParams({ password: 'correct-horse-test-secret', next: '/myheroes' });
res = await middleware(req('https://bnbheroes.example/__private_login', {
  method: 'POST',
  body: goodBody,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
}));
assert.equal(res.status, 303);
assert.equal(res.headers.get('location'), '/myheroes');
const cookie = (res.headers.get('set-cookie') || '').split(';', 1)[0];
assert.match(cookie, /^bnbh_private_access=/);
assert.match(res.headers.get('set-cookie') || '', /HttpOnly/);
assert.match(res.headers.get('set-cookie') || '', /Secure/);
assert.match(res.headers.get('set-cookie') || '', /SameSite=Strict/);

res = await middleware(req('https://bnbheroes.example/myheroes', {
  headers: { cookie },
}));
assert.equal(res.status, 200);

res = await middleware(req('https://bnbheroes.example/cards/14.png'));
assert.equal(res.status, 200);
assert.match(res.headers.get('content-type') || '', /text\/html/);
assert.match(await res.text(), /name="password"/);

const saved = process.env.BNBH_SITE_PASSWORD;
delete process.env.BNBH_SITE_PASSWORD;
res = await middleware(req());
assert.equal(res.status, 503);
process.env.BNBH_SITE_PASSWORD = saved;

console.log('site auth middleware tests OK');
