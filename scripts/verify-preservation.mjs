import fs from 'node:fs';
import path from 'node:path';

const fail = (m) => { console.error('FAIL:', m); process.exitCode = 1; };
const ok = (m) => console.log('OK:', m);
const exists = (p) => fs.existsSync(p) ? ok(p) : fail(`missing ${p}`);

for (const p of [
  'index.html','preservation-shim.js','vercel.json',
  'static/js/2.04f79657.chunk.js','static/js/main.5e2ca500.chunk.js',
  'static/css/2.f4c56af9.chunk.css','static/css/main.433e3d53.chunk.css',
  'static/media/Village.64091b0b.jpg','static/media/myheroes-bg.3c5effac.jpg',
  'backgrounds/village.jpg','backgrounds/market.jpg','backgrounds/myheroes-bg.jpg','backgrounds/battlelog-bg.jpg',
  'towns/background.jpg','towns/objects.png','towns/1-1.png','towns/2-1.png','towns/3-1.png','towns/4-1.png',
  'cards/14.png','cards/18.png','enemies/1.png','prototype/index.html','gitbook/index.html',
  'archive/original-20211117/SHA256SUMS','AI_IDE_HANDOFF.md'
]) exists(p);

const main = fs.readFileSync('static/js/main.5e2ca500.chunk.js','utf8');
if (main.includes('se().then((function(){}))')) fail('original auto wallet connect is still present');
else ok('original auto wallet connect disabled');
if (main.includes('BNB HEROES preservation mode: wallet connection is disabled.')) ok('wallet Connect action patched to preservation alert');
else fail('wallet-preservation patch marker missing');

const sourceText = main + '\n' + fs.readFileSync('static/css/main.433e3d53.chunk.css','utf8');
const mediaRefs = [...new Set(sourceText.match(/static\/media\/[^"')},;]+?\.(?:png|jpe?g|gif|svg|ttf|woff2?|ico)/gi) || [])];
for (const ref of mediaRefs) if (!fs.existsSync(ref)) fail(`referenced media missing: ${ref}`);
if (!process.exitCode) ok(`all ${mediaRefs.length} referenced static media files exist`);

const original = fs.readFileSync('archive/original-20211117/static/js/main.5e2ca500.chunk.js','utf8');
if (original.includes('se().then((function(){}))')) ok('clean archive still contains original 2021 auto-connect code (evidence only)');
else fail('clean archive appears modified');

const shim = fs.readFileSync('preservation-shim.js','utf8');
for (const marker of ['walletDisabled:true','/prototype/','/gitbook/']) {
  if (!shim.includes(marker)) fail(`shim marker missing: ${marker}`);
}
if (!process.exitCode) console.log('\nPreservation verification PASSED');
