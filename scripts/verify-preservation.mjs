import fs from 'node:fs';
import { LEGACY } from '../prototype/src/legacy-data.js';

const fail = (m) => { console.error('FAIL:', m); process.exitCode = 1; };
const ok = (m) => console.log('OK:', m);
const exists = (p) => fs.existsSync(p) ? ok(p) : fail(`missing ${p}`);

for (const p of [
  'index.html','preservation-provider.js','preservation-shim.js','vercel.json','scripts/serve.mjs',
  'vendor/ethers-6.17.0.umd.min.js',
  'static/js/2.04f79657.chunk.js','static/js/main.5e2ca500.chunk.js',
  'static/css/2.f4c56af9.chunk.css','static/css/main.433e3d53.chunk.css',
  'static/media/Village.64091b0b.jpg','static/media/myheroes-bg.3c5effac.jpg',
  'backgrounds/village.jpg','backgrounds/market.jpg','backgrounds/myheroes-bg.jpg','backgrounds/battlelog-bg.jpg',
  'towns/background.jpg','towns/objects.png',
  'static/media/card.df50fb38.png','static/media/card_lock.c211f00f.png','static/media/recruit_card.aa5e12c7.png',
  'static/media/rewards.16b2db64.png','static/media/You lose.00f95b2b.png',
  'research/media_hunt/card-analysis/CARD_SLOT_RECOVERY_PROOF.md','research/media_hunt/final-promotions/PROVENANCE.md',
  'archive/pre-card-semantic-fix-20260904/card.df50fb38.png','archive/pre-card-semantic-fix-20260904/card_lock.c211f00f.png','archive/pre-card-semantic-fix-20260904/unkown.png',
  'archive/pre-result-cleanup-20260904/rewards.16b2db64.png','archive/pre-result-cleanup-20260904/You lose.00f95b2b.png',
  'archive/pre-result-seam-fix-20260904/You lose.00f95b2b.png',
  'research/proofs/card-state-semantic-20260904/PROOF.md','research/proofs/card-state-semantic-20260904/EVIDENCE.sha256',
  'research/proofs/result-art-cleanup-20260904/PROOF.md','research/proofs/result-art-cleanup-20260904/PROOF.json','research/proofs/result-art-cleanup-20260904/EVIDENCE.sha256',
  'static/media/fight.42bbd04e.png','archive/pre-fight-period-recovery-20260903/fight.42bbd04e.png',
  'research/proofs/fight-period-reconstruction-20260903/PROOF.md',
  'research/proofs/fight-period-reconstruction-20260903/LOO_SAVED_MASK_METRICS.json',
  'research/proofs/fight-period-reconstruction-20260903/FINAL_PROOF.json',
  'research/proofs/fight-period-reconstruction-20260903/SOURCE_FRAME_GEOMETRY.json',
  'research/proofs/fight-period-reconstruction-20260903/fight-150.png',
  'research/proofs/fight-period-reconstruction-20260903/mask-150.png',
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
  'research/hero-id-mapping/onchain/character-template-table-20260903.tsv','research/hero-id-mapping/onchain/PERIOD_STAT_JOIN_PROOF.md',
  'research/contract-forensics/FRONTEND_CAPTURE_STATE_20211117.json',
  'research/contract-forensics/FRONTEND_CAPTURE_RUNTIME_DIFF_20211117.json',
  'research/contract-forensics/FRONTEND_CAPTURE_RUNTIME_DIFF_20211117.md',
  'research/contract-forensics/FRONTEND_CAPTURE_IMPLEMENTATIONS_20211117.json',
  'research/contract-forensics/FRONTEND_CAPTURE_IMPLEMENTATIONS_20211117.md',
  'enemies/1.png','enemies/5.png','enemies/6.png','enemies/7.png',
  'prototype/index.html','gitbook/index.html',
  'archive/original-20211117/SHA256SUMS','AI_IDE_HANDOFF.md'
]) exists(p);


// Town recovery checkpoint: Levels 2–4 and their Upgrade previews must match the evidence-backed runtime manifest.
const townManifest = fs.readFileSync('research/media_hunt/town-layers-reconstruction/RUNTIME_TOWN_RECOVERY.sha256','utf8').trim().split(/\r?\n/).filter(Boolean);
const crypto = await import('node:crypto');
const hashFile = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const verifyHashManifest = (manifestPath, label) => {
  const rows = fs.readFileSync(manifestPath,'utf8').trim().split(/\r?\n/).filter(Boolean);
  for (const line of rows) {
    const m = line.match(/^([0-9a-f]{64})\s+(.+)$/);
    if (!m) { fail(`${label} invalid hash line: ${line}`); continue; }
    const [,expected,path] = m;
    if (!fs.existsSync(path)) { fail(`${label} evidence missing: ${path}`); continue; }
    const got = hashFile(path);
    if (got === expected) ok(`${label} evidence preserved: ${path}`);
    else fail(`${label} evidence changed: ${path}`);
  }
  return rows.length;
};

const cardEvidenceCount = verifyHashManifest('research/proofs/card-state-semantic-20260904/EVIDENCE.sha256','card-state');
if (cardEvidenceCount === 4) ok('card-state compact proof contains 4 locked evidence files');
else fail(`card-state compact proof has ${cardEvidenceCount}/4 evidence files`);
const resultEvidenceCount = verifyHashManifest('research/proofs/result-art-cleanup-20260904/EVIDENCE.sha256','RESULT');
if (resultEvidenceCount === 5) ok('RESULT compact proof contains 5 locked evidence files');
else fail(`RESULT compact proof has ${resultEvidenceCount}/5 evidence files`);

// Fight recovery checkpoint: the superseded creative art must stay archived while runtime uses the validated period-pixel reconstruction.
const fightRuntimePath = 'static/media/fight.42bbd04e.png';
const fightBackupPath = 'archive/pre-fight-period-recovery-20260903/fight.42bbd04e.png';
const fightExpectedHash = 'e53c1be329ff369acce7179659cd0066957653a096ea7823a731221b4f55edfa';
const fightCreativeHash = '158f9f06f9f5720f884d97bd954fbea2029034a2b79c81405fc868a515791bf0';
const fightRuntimeHash = crypto.createHash('sha256').update(fs.readFileSync(fightRuntimePath)).digest('hex');
const fightBackupHash = crypto.createHash('sha256').update(fs.readFileSync(fightBackupPath)).digest('hex');
if (fightRuntimeHash === fightExpectedHash) ok('Fight runtime uses validated period-pixel reconstruction');
else fail(`Fight runtime hash changed: ${fightRuntimeHash}`);
if (fightRuntimeHash !== fightCreativeHash && fightBackupHash === fightCreativeHash) ok('superseded creative Fight bytes remain archived, not active');
else fail('Fight creative/runtime provenance boundary changed');
const fightLoo = JSON.parse(fs.readFileSync('research/proofs/fight-period-reconstruction-20260903/LOO_SAVED_MASK_METRICS.json','utf8'));
const fightFinal = JSON.parse(fs.readFileSync('research/proofs/fight-period-reconstruction-20260903/FINAL_PROOF.json','utf8'));
if (fightLoo.leave_one_out_bbox_from_saved_predictions?.length === 4 && fightLoo.mean_iou >= 0.95 && fightLoo.min_iou >= 0.94)
  ok('Fight alpha segmentation leave-one-icon-out proof passes');
else fail('Fight alpha segmentation proof missing or below threshold');
if (fightFinal.candidate_recompose?.mean_mae <= 2.0 && fightFinal.candidate_recompose?.support_mean_mae <= 0.5 && fightFinal.creative_recompose?.mean_mae >= 30 && fightFinal.period_support_stability?.mean_rgb_std <= 1.0)
  ok('Fight period-pixel photometric proof passes');
else fail('Fight period-pixel photometric proof missing or below threshold');

// Card-state semantic checkpoint: recovered bundle/video prove open=plain back, locked=padlock, pending-arrival=question mark.
const cardExpected = {
  'static/media/card.df50fb38.png': '0451318f5e6a9b7ca55705630a0f51bb104c9597d1585ee5e4e986a1800721be',
  'static/media/card_lock.c211f00f.png': 'cac62dc89c4e15b36fb738131ca99c04b90c1211bf9e2e175e655394fef8e100',
  'cards/unkown.png': 'f68d9efe4d89f00ec1e5ef6857b046d9aaa69147c52ca11c6f9e1a8e24284103',
  'static/media/recruit_card.aa5e12c7.png': '12ddc8b41804baff0e78ede53833bd503fa24e3b130ec2d01203fca8cf65aae6'
};
for (const [p, expected] of Object.entries(cardExpected)) {
  const got = hashFile(p);
  if (got === expected) ok(`card-state asset preserved: ${p}`); else fail(`card-state asset drifted: ${p} ${got}`);
}
const oldCardOpenHash = hashFile('archive/pre-card-semantic-fix-20260904/card.df50fb38.png');
const oldCardLockHash = hashFile('archive/pre-card-semantic-fix-20260904/card_lock.c211f00f.png');
const oldUnknownHash = hashFile('archive/pre-card-semantic-fix-20260904/unkown.png');
if (oldCardOpenHash === 'cac62dc89c4e15b36fb738131ca99c04b90c1211bf9e2e175e655394fef8e100' &&
    oldCardLockHash === 'f68d9efe4d89f00ec1e5ef6857b046d9aaa69147c52ca11c6f9e1a8e24284103' &&
    oldUnknownHash === '2d071d79018235e9aa1d867b1c59204e8321c1caf4955b15d109c4a0288e2cd0')
  ok('pre-correction card-state bytes remain archived');
else fail('pre-correction card-state archive changed');

// RESULT-art checkpoint: runtime must use art-only reconstructions, never the contaminated diff-art intermediates.
const resultProof = JSON.parse(fs.readFileSync('research/proofs/result-art-cleanup-20260904/PROOF.json','utf8'));
const resultExpected = {
  'static/media/rewards.16b2db64.png': '8fc8ce881b9eabfecf7ff7f53fa441a8f48153e272d38b1a28229ad6e7c72f46',
  'static/media/You lose.00f95b2b.png': '084806d7df4f1b51094d8de5babd9f3afca7760250e799554a2af5cdff3a3a02'
};
for (const [p, expected] of Object.entries(resultExpected)) {
  const got = hashFile(p);
  if (got === expected) ok(`clean RESULT art preserved: ${p}`); else fail(`RESULT art drifted: ${p} ${got}`);
}
const contaminatedRewardsHash = hashFile('archive/pre-result-cleanup-20260904/rewards.16b2db64.png');
const contaminatedLoseHash = hashFile('archive/pre-result-cleanup-20260904/You lose.00f95b2b.png');
const seamRejectedLoseHash = hashFile('archive/pre-result-seam-fix-20260904/You lose.00f95b2b.png');
if (contaminatedRewardsHash === '0ba35be2fa35911f90468a49ed2b019adf505a59497569b53e7e5dc84e8e8a9d' &&
    contaminatedLoseHash === '4f08df3827f4b41f42c4e078542f04ada3858be578fe9a0099f8083de89034b4')
  ok('superseded contaminated RESULT diff-art bytes remain archived');
else fail('RESULT contaminated-asset archive changed');
if (seamRejectedLoseHash === '14074d97711e1ae44538295db5952174c9cfb889d2d05dea77e981a107be0b2d')
  ok('browser-rejected Lose seam intermediate remains archived');
else fail('Lose seam-rejection archive changed');
if (resultProof.win?.primary_to_runtime_geometry_sift?.ratio >= 0.87 &&
    resultProof.win?.independent_reviewer_to_primary_chest_alignment?.ratio >= 0.95 &&
    resultProof.lose?.period_frame_to_runtime_geometry_sift?.ratio >= 0.89 &&
    resultProof.lose?.first_party_mage_identity_fit?.ratio >= 0.82)
  ok('RESULT period-geometry / first-party identity proof passes');
else fail('RESULT cleanup proof missing or below evidence thresholds');
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


// Hero-card promotion must remain byte-identical to the archived period art and must never regress to the pending-arrival placeholder.
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
const hero9 = mappingRows.find(r=>r.heroNameId==='9');
const hero10 = mappingRows.find(r=>r.heroNameId==='10');
if (hero9?.name==='Lena' && hero9?.artFile==='13-Lena.png' && hero9?.confidence==='DIRECT_PERIOD_STAT_MATCH' && hero10?.name==='Sivalas Zefen' && hero10?.artFile==='17-Sivalas.png' && hero10?.confidence==='DIRECT_PERIOD_STAT_MATCH') ok('on-chain period-stat correction preserved (ID9 Lena, ID10 Sivalas)');
else fail('Hero ID9/10 period-stat correction regressed');
const templateRows = fs.readFileSync('research/hero-id-mapping/onchain/character-template-table-20260903.tsv','utf8').trim().split(/\r?\n/).slice(1).map(x=>x.split('\t'));
if (templateRows.length===21 && templateRows.every((r,i)=>Number(r[0])===i && Number(r[1])===i+1) && templateRows[8].slice(4,7).join('/')==='500/400/600' && templateRows[9].slice(4,7).join('/')==='600/300/600') ok('21-slot on-chain Character template snapshot preserved');
else fail('on-chain Character template snapshot missing/stale');

// Historical runtime-state authority: preserve the exact chain state aligned to the 17-Nov frontend capture.
const captureState = JSON.parse(fs.readFileSync('research/contract-forensics/FRONTEND_CAPTURE_STATE_20211117.json','utf8'));
const captureImpl = JSON.parse(fs.readFileSync('research/contract-forensics/FRONTEND_CAPTURE_IMPLEMENTATIONS_20211117.json','utf8'));
const rarityDistribution = LEGACY.character.randomTable.reduce((out,template) => {
  const rarity = LEGACY.character.heroTypes[template]; out[rarity] = (out[rarity] || 0) + 1; return out;
}, {});
if (LEGACY.chainSnapshotBlock===12730607 && LEGACY.chainSnapshotAt==='2021-11-17T19:08:02.000Z' && captureState.block===12730607)
  ok('runtime state is pinned to exact 17-Nov frontend-capture block');
else fail('runtime historical capture block drifted');
if (JSON.stringify(rarityDistribution)===JSON.stringify({1:42,2:30,3:16,4:9,5:3}) && LEGACY.character.baseChances[6]===400 && LEGACY.character.baseBNBRewards[6]===24000000000000000 && LEGACY.character.requiredHps.length===7)
  ok('launch RNG / Zangrief chance / rewards / HP table preserved');
else fail('launch Character state regressed');
if (LEGACY.oracle.getCharacterPrice==='270231622141575625279' && LEGACY.oracle.getExpeditePrice==='27023162214157562527' && LEGACY.oracle.bnbhPrice==='900772073805252084266' && !('getTokenPrice' in LEGACY.oracle))
  ok('capture-time Oracle prices preserved without later getTokenPrice dependency');
else fail('capture-time Oracle state regressed');
if (captureImpl.frontendCapture?.implementations?.core==='0x986a1820498a636939a0b80eb8d12014e5d70b58' && captureImpl.frontendCapture?.implementations?.character==='0x36bd26648ce81c1675dfa3bc640607a3ef0852f9' && captureImpl.frontendCapture?.implementations?.market==='0xade9b8d6bf3c220e7d8c9b3ed7caccd4584473f1' && captureImpl.frontendCapture?.implementations?.oracle==='0xbd002cfa9a942c7f3a5771056d2f1482621ce07f' && captureImpl.marketUpgradeImmediatelyBeforeCapture?.firstNewBlock===12724583)
  ok('exact frontend-capture proxy implementations and Market transition preserved');
else fail('frontend-capture proxy implementation proof regressed');

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
if (main.includes('Sorry. We are in maintenance mode for a while.')) ok('17-Nov Marketplace maintenance-mode UI preserved');
else fail('17-Nov Marketplace maintenance-mode UI missing');
if (!main.includes('Buy Hero') && !main.includes('.purchaseListing(') && !main.includes('.cancelListing(') && !main.includes('.changeListingPrice(')) ok('later Marketplace buy/cancel/change UI is not backported into 17-Nov target');
else fail('later Marketplace write UI leaked into 17-Nov target');

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
const runtimeIndex = fs.readFileSync('index.html','utf8');
for (const remoteScript of ['<script src="http://','<script src="https://','<link href="http://','<link href="https://']) {
  if (runtimeIndex.includes(remoteScript)) fail(`runtime index depends on remote asset: ${remoteScript}`);
}
ok('runtime index has no remote JS/CSS dependency');
const pkg = JSON.parse(fs.readFileSync('package.json','utf8'));
if (pkg.scripts?.start === 'node scripts/serve.mjs') ok('local preservation server has no Python dependency');
else fail('local preservation server still depends on external interpreter');
for (const marker of ['realWalletDisabled:true','localProvider:true','/prototype/','/gitbook/']) {
  if (!shim.includes(marker)) fail(`shim marker missing: ${marker}`);
}

if (!process.exitCode) console.log('\nPreservation verification PASSED');
