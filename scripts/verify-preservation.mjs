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
  ...Array.from({length:21},(_,i)=>`cards/${i+1}.png`),'cards/unkown.png',
  'research/hero-id-mapping/heroNameId-final.tsv','research/hero-id-mapping/PROOF.md',
  'enemies/1.png','enemies/5.png','enemies/6.png','enemies/7.png',
  'prototype/index.html','gitbook/index.html',
  'archive/original-20211117/SHA256SUMS','AI_IDE_HANDOFF.md'
]) exists(p);


// Hero-card promotion must remain byte-identical to the archived period art and must never regress to the generic fallback.
const mappingRows = fs.readFileSync('research/hero-id-mapping/heroNameId-final.tsv','utf8').trim().split(/\r?\n/).slice(1).map(line => {
  const [heroNameId,name,artFile,rarity,confidence] = line.split('\t');
  return {heroNameId,name,artFile,rarity,confidence};
});
if (mappingRows.length === 21) ok('hero mapping contains all 21 heroNameIds'); else fail(`hero mapping has ${mappingRows.length}/21 rows`);
const fallback = fs.readFileSync('cards/unkown.png');
for (const row of mappingRows) {
  const cardPath = `cards/${row.heroNameId}.png`;
  const archivePath = `archive/hero-art-20211118/${row.artFile}`;
  if (!fs.existsSync(cardPath) || !fs.existsSync(archivePath)) { fail(`hero art path missing for ID ${row.heroNameId}`); continue; }
  const card = fs.readFileSync(cardPath);
  const source = fs.readFileSync(archivePath);
  if (card.equals(source)) ok(`hero ${row.heroNameId} ${row.name}: exact period art`); else fail(`hero ${row.heroNameId} art differs from archived source`);
  if (card.equals(fallback)) fail(`hero ${row.heroNameId} still uses unknown placeholder`);
}
const directIds = Object.fromEntries(mappingRows.filter(r=>r.confidence==='DIRECT_ANCHOR').map(r=>[r.heroNameId,r.name]));
if (directIds['14']==='Arnulf of Esplin' && directIds['18']==='Elrik the Imbuer') ok('direct Hero ID anchors preserved (14 Arnulf, 18 Elrik)');
else fail('direct Hero ID anchors changed');

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
if (main.includes('0==ye&&Y>=Me&&Object(C.jsx)(\"div\",{className:\"menu-btn m-1 btn btn-hero\",onClick:function(){Te(!0),I(!0),F.a.methods.getCharacterPrice().call()')) ok('historical 16 Nov Recruit handler restored into 17 Nov shell');
else fail('historical Recruit handler missing');
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

const nov16 = fs.readFileSync('research/play_forensics/recovered/build-20211116/main.907e74c4.chunk.js','utf8');
const activeRecruitMarker = '0==ye&&Y>=Me&&Object(C.jsx)(\"div\",{className:\"menu-btn m-1 btn btn-hero\",onClick:function(){Te(!0),I(!0),F.a.methods.getCharacterPrice().call()';
const disabledRecruitMarker = '0==ye&&Y>=Me&&Object(C.jsx)(\"div\",{className:\"menu-btn m-1 btn btn-hero disabled\"';
if (nov16.includes(activeRecruitMarker)) ok('16 Nov original build proves active Recruit handler provenance'); else fail('16 Nov Recruit evidence missing');
if (original.includes(disabledRecruitMarker)) ok('17 Nov clean archive retains historically disabled Recruit state'); else fail('17 Nov Recruit evidence missing');

const shim = fs.readFileSync('preservation-shim.js','utf8');
if (shim.includes('__BNBH_LOCAL_BITQUERY__') && shim.includes('graphql.bitquery.io')) ok('historic Bitquery Battle Logs use local preservation data'); else fail('local Battle Logs adapter missing');
for (const marker of ['realWalletDisabled:true','localProvider:true','/prototype/','/gitbook/']) {
  if (!shim.includes(marker)) fail(`shim marker missing: ${marker}`);
}

if (!process.exitCode) console.log('\nPreservation verification PASSED');
