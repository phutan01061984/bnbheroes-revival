import fs from 'node:fs';
import path from 'node:path';
import { LEGACY } from '../prototype/src/legacy-data.js';

const OUT = path.resolve('research/economy');
const WEB = path.resolve('economy');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(WEB, { recursive: true });

const WAD = 1e18;
const c = LEGACY.character;
const o = LEGACY.oracle;
const names = LEGACY.knownHeroNames;
const rarityName = t => LEGACY.rarityMap[t] || `Type ${t}`;
const className = t => LEGACY.classMap[t] || `Class ${t}`;
const enemyNames = ['Red Skull 1','Red Skull 2','Red Skull 3','Red Skull Archer','Red Skull Assasin','Red Skull Mage','Zangrief'];
const toFloat = x => Number(BigInt(x)) / WAD;
const hpPerDay = 86400 / c.secondsPerHp;

// Direct archive-state reads at BSC block 12,730,607 (2021-11-17T19:08:02Z).
// These are intentionally separate from later-source-mirror architecture fields.
const chainEconomy = {
  block: 12730607,
  timestamp: '2021-11-17T19:08:02.000Z',
  token: LEGACY.addresses.token,
  core: LEGACY.addresses.core,
  pool: LEGACY.addresses.pool,
  tokenBnbFeePct: 11,
  tokenLiquidityFeePct: 1,
  coreDividePercent: 70,
  firstLockSeconds: 172800,
  maxReserveHeroes: 10,
  poolBnbBalance: 3270.931735792176651269,
  tokenContractBnbhBalance: 25541245.37165106012488297,
  totalHeroSupply: c.totalSupply,
  tokenTotalSupply: 100_000_000,
  poolCoreLinkConfirmed: true,
};

function fightMetrics(heroIndex, enemyIndex, bankLevel=0, trainingLevel=0) {
  const statBonus = c.baseTownRatio[12 + trainingLevel] || 0;
  const bankBonusPct = c.baseTownRatio[bankLevel] || 0;
  const A = c.attacks[heroIndex] + statBonus;
  const D = c.armors[heroIndex] + statBonus;
  const S = c.speeds[heroIndex] + statBonus;
  const threshold = c.baseChances[enemyIndex] + Math.floor(A / 10);
  // Exact 17-Nov Character behavior uses seed 0..999 and strict seed+threshold > 1000.
  const pWin = Math.max(0, Math.min(1, (threshold - 1) / 1000));
  const requiredHp = c.requiredHps[enemyIndex];
  const rewardOnWin = toFloat(c.baseBNBRewards[enemyIndex]) * (1 + S/1000) * (1 + bankBonusPct/100);
  const hpLossWin = requiredHp - Math.floor(D/10);
  const expectedHpLoss = pWin * hpLossWin + (1-pWin) * requiredHp;
  const expectedBnbPerFight = pWin * rewardOnWin;
  const hpLimitedFightsPerDay = hpPerDay / expectedHpLoss;
  const expectedBnbPerDay = expectedBnbPerFight * hpLimitedFightsPerDay;
  return {
    pWin, rewardOnWin, expectedBnbPerFight, hpLossWin, hpLossFail: requiredHp,
    expectedHpLoss, hpLimitedFightsPerDay, expectedBnbPerDay,
    attack:A, armor:D, speed:S, bankBonusPct, statBonus,
  };
}

const heroes = Array.from({length:21}, (_,i) => ({
  id:i+1, name:names[i+1], rarity:rarityName(c.heroTypes[i]), class:className(c.heroClasses[i]),
  attack:c.attacks[i], armor:c.armors[i], speed:c.speeds[i],
  base: enemyNames.map((name,e)=>({enemy:e+1,name,...fightMetrics(i,e,0,0)})),
  maxBankTraining: enemyNames.map((name,e)=>({enemy:e+1,name,...fightMetrics(i,e,3,3)})),
}));

const rarityRolls = {};
for (const heroIndex of c.randomTable) {
  const r = rarityName(c.heroTypes[heroIndex]);
  rarityRolls[r] = (rarityRolls[r] || 0) + 1;
}

const recruitBnbh = toFloat(o.getCharacterPrice);
const expediteBnbh = toFloat(o.getExpeditePrice);
const bnbhPerBnb = toFloat(o.bnbhPrice);
const townPrices = o.getTownUpgradePrices.map(toFloat);
const townNames = ['Bank','Inn','Barracks','Training Grounds'];
const town = townNames.map((name,type)=>{
  const levels = townPrices.slice(type*4+1,type*4+4);
  return {name, levels, total:levels.reduce((a,b)=>a+b,0), bnbEquivalent:levels.reduce((a,b)=>a+b,0)/bnbhPerBnb};
});
const totalTownBnbh = town.reduce((a,x)=>a+x.total,0);

function unlockBnbh(level) {
  return Number(BigInt(o.bnbhPrice) * BigInt(o.basePriceToUnlockInBNB) * (100n + BigInt(o.unlockRate)*BigInt(level)) / 10n**20n) / WAD;
}
const unlocks = [1,2,3].map(level=>({level, bnbh:unlockBnbh(level), bnbEquivalent:unlockBnbh(level)/bnbhPerBnb}));

const weightedAverage = fn => c.randomTable.reduce((sum,heroIndex)=>sum+fn(heroIndex),0) / c.randomTable.length;
const avgBossDayBase = weightedAverage(i=>fightMetrics(i,6,0,0).expectedBnbPerDay);
const avgBossDayMax = weightedAverage(i=>fightMetrics(i,6,3,3).expectedBnbPerDay);
const avgTier1BestDay = weightedAverage(i=>Math.max(...[0,1,2].map(e=>fightMetrics(i,e,0,0).expectedBnbPerDay)));
const recruitBnbEq = recruitBnbh / bnbhPerBnb;
const expediteBnbEq = expediteBnbh / bnbhPerBnb;

const runway = [1,5,10,25,50,100].map(activePct=>{
  const activeHeroes = chainEconomy.totalHeroSupply * activePct/100;
  const grossOutflowPerDay = activeHeroes * avgBossDayBase;
  return {activePct,activeHeroes,grossOutflowPerDay,zeroInflowPoolDays:chainEconomy.poolBnbBalance/grossOutflowPerDay};
});

const model = {
  modelVersion: '2021-11-17-v1',
  target: {block:chainEconomy.block,timestamp:chainEconomy.timestamp},
  chainEconomy,
  oracle: {
    bnbhPerBnb, impliedBnbPerBnbh:1/bnbhPerBnb,
    recruitBnbh,recruitBnbEquivalent:recruitBnbEq,
    expediteBnbh,expediteBnbEquivalent:expediteBnbEq,
    town,totalTownBnbh,totalTownBnbEquivalent:totalTownBnbh/bnbhPerBnb,
    unlocks,
  },
  mechanics: {
    secondsPerHp:c.secondsPerHp,hpPerDay,heroArrivalSeconds:c.heroArrivalTime,
    firstClaimLockSeconds:chainEconomy.firstLockSeconds,initialClaimTaxPct:20,claimTaxDropPctPerDay:2,
    bankBonusesPct:c.baseTownRatio.slice(0,4),innConfiguredRatio:c.baseTownRatio.slice(4,8),innHpBonusEffective:[0,0,0,0],barracksXpBonus:c.baseTownRatio.slice(8,12),trainingStatBonus:c.baseTownRatio.slice(12,16),
    marketListingFeePct:10,
    enemyNames,
    baseChances:c.baseChances,baseRewardsBnb:c.baseBNBRewards.map(toFloat),baseXp:c.baseEnemyXps,requiredHp:c.requiredHps,
  },
  rarityRolls,
  heroes,
  aggregate: {
    avgBossBnbPerDayPerRecruitBase:avgBossDayBase,
    avgBossBnbPerDayPerRecruitMaxBankTraining:avgBossDayMax,
    avgBestTier1BnbPerDayPerRecruitBase:avgTier1BestDay,
    recruitSimplePaybackDaysGross:recruitBnbEq/avgBossDayBase,
    recruitPlusExpeditePaybackDaysGross:(recruitBnbEq+expediteBnbEq)/avgBossDayBase,
    recruitPaybackDaysAtEarliest20PctClaim:recruitBnbEq/(avgBossDayBase*0.8),
    allMintedHeroesBossGrossBnbPerDay:chainEconomy.totalHeroSupply*avgBossDayBase,
    zeroInflowPoolRunwayAllMintedDays:chainEconomy.poolBnbBalance/(chainEconomy.totalHeroSupply*avgBossDayBase),
    runway,
  },
  provenance: {
    exact17Nov: [
      'Character reward/chance/HP/stat tables and Oracle prices from block 12,730,607',
      'Core dividePercent=70, firstLockTime=172800, maxHeroCount=10 at block 12,730,607',
      'BNBH token fees _BNBFee=11 and _liquidityFee=1 at block 12,730,607',
      'BNBHPool balance 3270.931735792176651269 BNB at block 12,730,607',
      'Pool->Core linkage and Token->Pool address linkage at block 12,730,607',
    ],
    architectureCorroboration: 'Recovered late-Nov Solidity mirror shows operation BNBH collected by Core, split toward token contract/burn, token swapAndCharge sells accumulated BNBH for BNB, adds a liquidity portion, and sends remaining BNB to BNBHPool; claimRewards pulls BNB from that pool. Exact 17-Nov state confirms the key addresses/split/fees, but the mirror is not treated as byte-identical 17-Nov source for every internal detail.',
  },
};

fs.writeFileSync(path.join(OUT,'MODEL_20211117.json'), JSON.stringify(model,null,2)+'\n');
fs.writeFileSync(path.join(WEB,'data.json'), JSON.stringify(model));

const rows = ['heroId,hero,rarity,class,attack,armor,speed,enemy,winProbability,rewardOnWinBNB,expectedBNBPerFight,expectedHpLoss,hpLimitedFightsPerDay,expectedBNBPerDay'];
for (const h of heroes) for (const m of h.base) rows.push([
  h.id,JSON.stringify(h.name),h.rarity,h.class,h.attack,h.armor,h.speed,m.enemy,m.pWin,m.rewardOnWin,m.expectedBnbPerFight,m.expectedHpLoss,m.hpLimitedFightsPerDay,m.expectedBnbPerDay
].join(','));
fs.writeFileSync(path.join(OUT,'HERO_ENEMY_MATRIX_20211117.csv'), rows.join('\n')+'\n');

console.log(JSON.stringify({recruitBnbh,recruitBnbEq,poolBnb:chainEconomy.poolBnbBalance,avgBossDayBase,paybackDays:recruitBnbEq/avgBossDayBase,runway},null,2));
