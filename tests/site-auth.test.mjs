import assert from 'node:assert/strict';

process.env.BNBH_SITE_USER = 'bnbh';
process.env.BNBH_SITE_PASSWORD = 'correct-horse-test-secret';
const { default: middleware } = await import('../middleware.js');

const req = auth => new Request('https://bnbheroes.example/myheroes', {
  headers: auth ? { authorization: auth } : {},
});
const basic = (user, pass) => `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;

let res = middleware(req());
assert.equal(res.status, 401);
assert.match(res.headers.get('www-authenticate') || '', /BNB HEROES Private/);
assert.equal(res.headers.get('x-robots-tag'), 'noindex, nofollow, noarchive, nosnippet');

res = middleware(req(basic('bnbh', 'wrong')));
assert.equal(res.status, 401);

res = middleware(req(basic('wrong', 'correct-horse-test-secret')));
assert.equal(res.status, 401);

res = middleware(req(basic('bnbh', 'correct-horse-test-secret')));
assert.equal(res.status, 200);

const saved = process.env.BNBH_SITE_PASSWORD;
delete process.env.BNBH_SITE_PASSWORD;
res = middleware(req(basic('bnbh', saved)));
assert.equal(res.status, 503);
process.env.BNBH_SITE_PASSWORD = saved;

console.log('site auth middleware tests OK');
