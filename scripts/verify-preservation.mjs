import fs from 'node:fs';

const fail = (m) => { console.error('FAIL:', m); process.exitCode = 1; };
const ok = (m) => console.log('OK:', m);
const exists = (p) => fs.existsSync(p) ? ok(p) : fail(`missing ${p}`);

for (const p of [
  'index.html','preservation-provider.js','preservation-shim.js','vercel.json',
  'vendor/ethers-6.17.0.umd.min.js',
  'static/js/2.04f79657.chunk.js','static/js/main.5e2ca500.chunk.js',
  'static/css/2.f4c56af9.chunk.css','static/css/main.433e3d53.chunk.css',
  'static/media/Village.64091b0b.jpg','static/media/myheroes-bg.3c5effac.jpg',
  'backgrounds/village.jpg','backgrounds/market.jpg','backgrounds/myheroes-bg.jpg','backgrounds/battlelog-bg.jpg',
  'towns/background.jpg','towns/objects.png','towns/1-1.png','towns/2-1.png','towns/3-1.png','towns/4-1.png',
  'cards/14.png','cards/18.png','enemies/1.png','enemies/5.png','enemies/6.png','enemies/7.png',
  'prototype/index.html','gitbook/index.html',
  'archive/original-20211117/SHA256SUMS','AI_IDE_HANDOFF.md'
]) exists(p);

const main = fs.readFileSync('static/js/main.5e2ca500.chunk.js','utf8');
for (const remote of ['https://bsc-dataseed.binance.org/','https://mainnet.infura.io','https://data-seed-prebsc']) {
  if (main.includes(remote)) fail(`runtime bundle still contains active provider URL: ${remote}`);
}
if (main.includes('new s.a(window.__BNBH_LOCAL_PROVIDER__)')) ok('static read contracts use local preservation provider');
else fail('static read provider patch missing');
if (main.includes('Promise.resolve(window.__BNBH_LOCAL_PROVIDER__)')) ok('wallet connect resolves to local preservation provider');
else fail('safe local connect patch missing');
if (main.includes('se().then((function(){}))')) ok('original 2021 auto-connect lifecycle restored');
else fail('original auto-connect lifecycle missing');
if (main.includes('connect:se')) ok('original Connect action restored');
else fail('original Connect action missing');
if (main.includes('wallet connection is disabled')) fail('obsolete wallet alert patch remains');

const provider = fs.readFileSync('preservation-provider.js','utf8');
for (const marker of ['window.ethereum = provider','eth_sendRawTransaction','personal_sign','blocks real signing/raw transactions','getUnlockLevelPrice','getCharactersForPage']) {
  if (provider.includes(marker)) ok(`provider marker: ${marker}`); else fail(`provider marker missing: ${marker}`);
}
for (const remote of ['bsc-dataseed','infura.io','data-seed-prebsc']) {
  if (provider.includes(remote)) fail(`local provider contains network endpoint: ${remote}`);
}

const index = fs.readFileSync('index.html','utf8');
const order = ['vendor/ethers-6.17.0.umd.min.js','preservation-provider.js','preservation-shim.js','static/js/main.5e2ca500.chunk.js'].map(x => index.indexOf(x));
if (order.every(x=>x>=0) && order.every((x,i)=>i===0 || order[i-1] < x)) ok('provider scripts load before the 2021 React bundle');
else fail('provider script order is unsafe');

const sourceText = main + '\n' + fs.readFileSync('static/css/main.433e3d53.chunk.css','utf8');
const mediaRefs = [...new Set(sourceText.match(/static\/media\/[^"')},;]+?\.(?:png|jpe?g|gif|svg|ttf|woff2?|ico)/gi) || [])];
for (const ref of mediaRefs) if (!fs.existsSync(ref)) fail(`referenced media missing: ${ref}`);
if (!process.exitCode) ok(`all ${mediaRefs.length} referenced static media files exist`);

const original = fs.readFileSync('archive/original-20211117/static/js/main.5e2ca500.chunk.js','utf8');
if (original.includes('se().then((function(){}))') && original.includes('https://bsc-dataseed.binance.org/')) ok('clean archive still contains untouched 2021 network behavior (evidence only)');
else fail('clean archive appears modified');

const shim = fs.readFileSync('preservation-shim.js','utf8');
for (const marker of ['realWalletDisabled:true','localProvider:true','/prototype/','/gitbook/']) {
  if (!shim.includes(marker)) fail(`shim marker missing: ${marker}`);
}

if (!process.exitCode) console.log('\nPreservation verification PASSED');
