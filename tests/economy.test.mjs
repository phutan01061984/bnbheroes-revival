import assert from 'node:assert/strict';
import fs from 'node:fs';
const m=JSON.parse(fs.readFileSync('research/economy/MODEL_20211117.json','utf8'));
const near=(a,b,e=1e-9)=>assert.ok(Math.abs(a-b)<=e,`${a} != ${b}`);
assert.equal(m.target.block,12730607);
assert.equal(m.chainEconomy.totalHeroSupply,35451);
near(m.chainEconomy.poolBnbBalance,3270.9317357921767,1e-9);
assert.deepEqual(m.rarityRolls,{Common:42,Uncommon:30,Rare:16,Epic:9,Legendary:3});
near(m.oracle.recruitBnbEquivalent,0.3,1e-12);
near(m.oracle.expediteBnbEquivalent,0.03,1e-12);
near(m.oracle.totalTownBnbEquivalent,0.95,1e-12);
assert.equal(m.heroes.length,21);
assert.ok(m.heroes.every(h=>h.base.length===7));
// Lock all 21 model templates to the direct on-chain period table, not stale human notes.
const tsv=fs.readFileSync('research/hero-id-mapping/onchain/character-template-table-20260903.tsv','utf8').trim().split(/\r?\n/).slice(1);
assert.equal(tsv.length,21);
for(const line of tsv){
  const [slot,id,type,klass,attack,armor,speed]=line.split('\t').map(Number);
  const h=m.heroes[id-1];
  assert.equal(slot,id-1);
  assert.deepEqual([h.attack,h.armor,h.speed],[attack,armor,speed],`stats mismatch heroNameId ${id}`);
  assert.equal(h.rarity,m.rarityRolls[h.rarity]!==undefined ? h.rarity : '',`rarity missing heroNameId ${id}`);
}
near(m.aggregate.avgBossBnbPerDayPerRecruitBase,0.0450770043315912,1e-12);
near(m.aggregate.recruitSimplePaybackDaysGross,6.655278105731433,1e-12);
near(m.aggregate.zeroInflowPoolRunwayAllMintedDays,2.04685907934518,1e-12);
assert.equal(m.mechanics.baseChances[6],400);
assert.equal(m.mechanics.requiredHp[6],400);
assert.equal(m.mechanics.bankBonusesPct[3],16);
assert.equal(m.mechanics.innHpBonusEffective[3],0);
assert.equal(m.mechanics.trainingStatBonus[3],140);
const arnulf=m.heroes[13];
assert.deepEqual([arnulf.attack,arnulf.armor,arnulf.speed],[600,700,400]);
near(arnulf.base[6].rewardOnWin,0.0336,1e-12);
near(arnulf.base[6].expectedBnbPerDay,0.04211849863545072,1e-12);
assert.ok(fs.readFileSync('economy/index.html','utf8').includes('BNB HEROES — BẢN ĐỒ DÒNG TIỀN'));
assert.ok(fs.statSync('economy/data.json').size>10000);
console.log('economy model tests OK');
