import assert from 'node:assert/strict';
import {
  freshState,recruit,fight,heroTemplate,currentHp,heroCapacity,upgradeTown,
  moveToReserve,takeFromReserve,withdrawalTax,claimRewards,buyMarketHero,
  unlockLevel,unlockLevelCost
} from '../prototype/src/engine.js';

let s=freshState();
assert.equal(s.version,2);
assert.equal(s.heroes[0].name,'Arnulf of Esplin');
assert.equal(heroTemplate(17).name,'Elrik the Imbuer');
const expectedHeroNames=[
  'Dayne of Gerston','Andin Olis','Torlov Branhart','Aelof Orstone','Jan Rhylen','Demisov the Bold',
  'Esfel of Lordan','Reis of the Knife','Sivalas Zefen','Lena','Thalas One-Eye','Lady Ella of Tir',
  'Sir Bertrand','Arnulf of Esplin','Balen Fellwood','Helia Stormcall','Xegis Branfyre','Elrik the Imbuer',
  'Uriah the Sage','Sir Asten','Duke Duscair IV'
];
assert.deepEqual(Array.from({length:21},(_,i)=>heroTemplate(i).name), expectedHeroNames);
assert.ok(Array.from({length:21},(_,i)=>heroTemplate(i).name).every(name=>!name.startsWith('Lost Hero #')));
assert.equal(heroCapacity(s),2);

const before=s.bnbh;
s=recruit(s,()=>0);
assert.ok(s.bnbh<before);
assert.equal(s.heroes.length,2);
assert.equal(s.heroes[1].template,2);
assert.throws(()=>recruit(s,()=>0),/capacity/i);

s=moveToReserve(s,1);
assert.equal(s.heroes.length,1);
assert.equal(s.reserve.length,1);
s=takeFromReserve(s,1);
assert.equal(s.heroes.length,2);
assert.equal(s.reserve.length,0);

let t=freshState();
t=upgradeTown(t,1);
assert.equal(heroCapacity(t),3);

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
u.heroes[0].xp=1900;
u=fight(u,0,5,()=>0.999);
assert.equal(u.heroes[0].xp,1999);
assert.ok(u.stackedXp[0]>0);
const cost=unlockLevelCost(u,0);
assert.ok(cost>0);
u=unlockLevel(u,0);
assert.equal(u.heroes[0].level,2);
assert.ok(u.heroes[0].xp>1999);
assert.equal(u.stackedXp[0],0);
assert.ok(u.bnbh<20000);

console.log('engine tests OK');
