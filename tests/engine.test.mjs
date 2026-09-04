import assert from 'node:assert/strict';
import {
  freshState,restoreState,recruit,fight,heroTemplate,currentHp,heroCapacity,effectiveTownLevel,upgradeTown,
  moveToReserve,takeFromReserve,withdrawalTax,claimRewards,buyMarketHero,
  unlockLevel,unlockLevelCost,unlockLevelPriceWei,recruitCost,expediteCost,townCost
} from '../prototype/src/engine.js';
import { LEGACY } from '../prototype/src/legacy-data.js';

let s=freshState();
assert.equal(s.version,3);
assert.equal(s.heroes[0].name,'Arnulf of Esplin');
assert.equal(heroTemplate(17).name,'Elrik the Imbuer');
const expectedHeroNames=[
  'Dayne of Gerston','Andin Olis','Torlov Branhart','Aelof Orstone','Jan Rhylen','Demisov the Bold',
  'Esfel of Lordan','Reis of the Knife','Lena','Sivalas Zefen','Thalas One-Eye','Lady Ella of Tir',
  'Sir Bertrand','Arnulf of Esplin','Balen Fellwood','Helia Stormcall','Xegis Branfyre','Elrik the Imbuer',
  'Uriah the Sage','Sir Asten','Duke Duscair IV'
];
assert.deepEqual(Array.from({length:21},(_,i)=>heroTemplate(i).name), expectedHeroNames);
assert.ok(Array.from({length:21},(_,i)=>heroTemplate(i).name).every(name=>!name.startsWith('Lost Hero #')));
assert.equal(heroCapacity(s),2);
assert.equal(LEGACY.chainSnapshotBlock,12730607);
assert.equal(LEGACY.chainSnapshotAt,'2021-11-17T19:08:02.000Z');
assert.equal(LEGACY.character.baseChances[6],400);
assert.equal(LEGACY.character.baseBNBRewards[6],24000000000000000);
assert.deepEqual(LEGACY.character.requiredHps,[200,200,200,200,200,200,400]);
const rarityDistribution=LEGACY.character.randomTable.reduce((out,template)=>{
  const rarityId=LEGACY.character.heroTypes[template]; out[rarityId]=(out[rarityId]||0)+1; return out;
},{});
assert.deepEqual(rarityDistribution,{1:42,2:30,3:16,4:9,5:3});
assert.ok(Math.abs(recruitCost()-270.2316221415756)<1e-9);
assert.ok(Math.abs(expediteCost()-27.02316221415756)<1e-9);
assert.ok(Math.abs(townCost(0,1)-67.5579055353939)<1e-9);
assert.equal(unlockLevelPriceWei(1).toString(),'7494423654059697341');
assert.equal(unlockLevelPriceWei(10).toString(),'10088647226618823343');

const before=s.bnbh;
s=recruit(s,()=>0);
assert.ok(s.bnbh<before);
assert.equal(s.heroes.length,2);
assert.equal(s.heroes[1].template,4);
assert.throws(()=>recruit(s,()=>0),/capacity/i);

const reserveAt=1_000_000;
s.heroes[1]={...s.heroes[1],hp:41,hpUpdatedAt:reserveAt};
s=moveToReserve(s,1,reserveAt);
assert.equal(s.heroes.length,1);
assert.equal(s.reserve.length,1);
assert.equal(s.reserve[0].hp,41);
// Exact historical bag behavior freezes HP instead of granting passive recovery.
s=takeFromReserve(s,1,reserveAt+10*86400000);
assert.equal(s.heroes.length,2);
assert.equal(s.reserve.length,0);
assert.equal(s.heroes.find(h=>h.tokenId===1).hp,41);
assert.equal(currentHp(s.heroes.find(h=>h.tokenId===1),reserveAt+10*86400000),41);
let fullBag=freshState();
fullBag.reserve=Array.from({length:10},(_,i)=>({...heroTemplate(0),tokenId:100+i,xp:1000,level:1,hp:1000,hpUpdatedAt:reserveAt,arrivalAt:0}));
assert.throws(()=>moveToReserve(fullBag,0,reserveAt),/full/i);

let t=freshState();
const townAt=2_000_000;
t=upgradeTown(t,1,townAt);
assert.equal(t.towns[1],1); // raw contract-like level increments immediately
assert.equal(effectiveTownLevel(t,1,townAt),0);
assert.equal(heroCapacity(t,townAt),2);
assert.equal(t.townUpgradeEnds[1],townAt+24*3600000);
assert.throws(()=>upgradeTown(t,1,townAt+1),/progress/i);
assert.equal(effectiveTownLevel(t,1,t.townUpgradeEnds[1]),1);
assert.equal(heroCapacity(t,t.townUpgradeEnds[1]),3);

const migrated=restoreState(JSON.stringify({...freshState(),version:2,towns:[1,2,0,0],stackedXp:{0:777}}));
assert.equal(migrated.version,3);
assert.deepEqual(migrated.townUpgradeEnds,[0,0,0,0]);
assert.equal(migrated.stackedXp,undefined);
assert.equal(effectiveTownLevel(migrated,1,0),2);

let b=freshState();
const rewards=b.pendingBNB;
b=fight(b,0,0,()=>0.999);
assert.ok(b.pendingBNB>rewards);
assert.ok(b.heroes[0].xp>1000);
assert.ok(currentHp(b.heroes[0])<1000);
assert.equal(b.battleHistory.length,1);
assert.equal(b.battleHistory[0].hero,0);
assert.equal(b.battleHistory[0].enemy,0);
assert.ok(b.battleHistory[0].rewards>0);
assert.equal(withdrawalTax(b,b.rewardUnlockAt),20);
assert.equal(withdrawalTax(b,b.rewardUnlockAt+10*86400000),0);
assert.throws(()=>claimRewards(b,b.rewardUnlockAt-1),/lock/i);
assert.throws(()=>claimRewards(b,b.rewardUnlockAt),/lock/i);
const claimed=claimRewards(b,b.rewardUnlockAt+10*86400000);
assert.equal(claimed.pendingBNB,0);
assert.ok(claimed.claimedBNB>0);

let m=freshState();
const listing=m.market[2];
const marketBefore=m.bnbh;
m=buyMarketHero(m,listing.tokenId);
assert.equal(m.heroes.length,2);
assert.ok(m.bnbh<marketBefore);
assert.equal(m.market.length,2);

let u=freshState();
u.heroes[0].xp=1940;
u=fight(u,0,0,()=>0.999);
assert.equal(u.heroes[0].xp,1999);
assert.equal(u.battleHistory[0].xpGained,59); // direct chain analogue: Hero #637
const rewardAtCap=u.pendingBNB;
u=fight(u,0,0,()=>0.999,u.heroes[0].hpUpdatedAt);
assert.equal(u.heroes[0].xp,1999);
assert.equal(u.battleHistory[0].xpGained,0);
assert.ok(u.pendingBNB>rewardAtCap); // fight/reward remains allowed at XP cap
assert.equal(u.stackedXp,undefined);

let early=freshState();
early.heroes[0].xp=1850; // direct chain analogue: Hero #90 unlocked early
const cost=unlockLevelCost(early,0);
assert.ok(cost>0);
early=unlockLevel(early,0);
assert.equal(early.heroes[0].level,2);
assert.equal(early.heroes[0].xp,1850); // exact 17-Nov unlock preserves XP
assert.ok(early.bnbh<20000);

console.log('engine tests OK');
