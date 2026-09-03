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
  'towns/background.jpg','towns/objects.png',
  ...Array.from({length:4},(_,b)=>Array.from({length:4},(_,l)=>`towns/${b+1}-${l+1}.png`)).flat(),
  ...Array.from({length:4},(_,b)=>Array.from({length:3},(_,l)=>`townselect/${b+1}-${l+2}.png`)).flat(),
  'research/media_hunt/town-layers-reconstruction/RUNTIME_TOWN_RECOVERY.sha256',
  'research/media_hunt/town-layers-reconstruction/level4-canonical/PROOF.json',
  'research/media_hunt/town-layers-reconstruction/level4-canonical/TOWNSELECT_L4_PROOF.json',
  'research/proofs/town-canonical-geometry-20260903/GEOMETRY_PROOF.json',
  'research/proofs/town-canonical-geometry-20260903/ROUNDTRIP_VALIDATION.json',
  'research/proofs/town-canonical-geometry-20260903/PREVIEW_TO_CANONICAL_VALIDATION.json',
  'research/proofs/town-canonical-geometry-20260903/TOWNSELECT_L4_CANONICAL_PROOF.json',
  ...Array.from({length:21},(_,i)=>`cards/${i+1}.png`),'cards/unkown.png',
  'research/hero-id-mapping/heroNameId-final.tsv','research/hero-id-mapping/PROOF.md',
  'enemies/1.png','enemies/5.png','enemies/6.png','enemies/7.png',
  'prototype/index.html','gitbook/index.html',
  'archive/original-20211117/SHA256SUMS','AI_IDE_HANDOFF.md'
]) exists(p);


// Town recovery checkpoint: Levels 2–4 and their Upgrade previews must match the evidence-backed runtime manifest.
const townManifest = fs.readFileSync('research/media_hunt/town-layers-reconstruction/RUNTIME_TOWN_RECOVERY.sha256','utf8').trim().split(/\r?\n/).filter(Boolean);
const crypto = await import('node:crypto');
for (const line of townManifest) {
  const m = line.match(/^([0-9a-f]{64})\s+(.+)$/);
  if (!m) { fail(`invalid Town recovery hash line: ${line}`); continue; }
  const [,expected,path] = m;
  if (!fs.existsSync(path)) { fail(`Town recovery asset missing: ${path}`); continue; }
  const got = crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex');
  if (got === expected) ok(`Town recovery asset preserved: ${path}`); else fail(`Town recovery asset changed: ${path}`);
  if (fs.statSync(path).size <= 573) fail(`Town recovery asset regressed to transparent fallback: ${path}`);
}
if (townManifest.length === 24) ok('Town recovery manifest covers 12 full-town + 12 upgrade-preview assets');
else fail(`Town recovery manifest has ${townManifest.length}/24 entries`);

// Geometry proof: recovered full-town pixels must be canonical runtime coordinates, not reviewer-video coordinates.
const roundTrip = JSON.parse(fs.readFileSync('research/proofs/town-canonical-geometry-20260903/ROUNDTRIP_VALIDATION.json','utf8'));
if (roundTrip.length === 8 && roundTrip.every(r => r.alpha_iou >= 0.95 && r.rgb_mae_overlap <= 1.1))
  ok('Town L2/L3 canonical round-trip proof passes for all 8 layers');
else fail('Town L2/L3 canonical round-trip proof is missing or below threshold');
const previewCanonical = JSON.parse(fs.readFileSync('research/proofs/town-canonical-geometry-20260903/PREVIEW_TO_CANONICAL_VALIDATION.json','utf8'));
const previewRows = Object.values(previewCanonical);
if (previewRows.length === 4 && previewRows.every(r => r.validation_level3_alpha_iou >= 0.997 && r.validation_level3_rgb_mae_overlap <= 1.2))
  ok('Town Level-3 preview-to-canonical geometry proof passes for all 4 buildings');
else fail('Town Level-3 preview-to-canonical geometry proof is missing or below threshold');
const l4PreviewProof = JSON.parse(fs.readFileSync('research/media_hunt/town-layers-reconstruction/level4-canonical/TOWNSELECT_L4_PROOF.json','utf8'));
const l4PreviewRows = Object.values(l4PreviewProof);
if (l4PreviewRows.length === 4 && l4PreviewRows.every(r => r.method === 'inverse_corrected_level3_preview_to_canonical_full_homography' && r.level3_mapping_validation_alpha_iou >= 0.997))
  ok('Town Level-4 previews derive from corrected canonical geometry');
else fail('Town Level-4 preview canonical-geometry proof is missing or stale');


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
