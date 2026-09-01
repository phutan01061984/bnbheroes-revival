import { LEGACY } from './legacy-data.js';

const WAD = 1e18;
export const rarity = id => LEGACY.rarityMap[String(id)] || `Rarity ${id}`;
export const heroClass = id => LEGACY.classMap[String(id)] || `Class ${id}`;
export const heroName = template => LEGACY.knownHeroNames[String(LEGACY.character.heroNames[template])] || `Lost Hero #${LEGACY.character.heroNames[template]}`;
export const fromWei = value => Number(value) / WAD;

export function heroTemplate(i) {
  const c=LEGACY.character;
  return { template:i, name:heroName(i), rarity:rarity(c.heroTypes[i]), rarityId:c.heroTypes[i], className:heroClass(c.heroClasses[i]), classId:c.heroClasses[i], attack:c.attacks[i], armor:c.armors[i], speed:c.speeds[i] };
}

export function freshState() {
  // One immediately playable historical hero is seeded only so the restoration can be tested without a 12h wait.
  const seed=13; // Arnulf: A600/D700/S400, Rare Soldier
  return {
    version:1, bnbh:20000, pendingBNB:0, rewardUnlockAt:0, nextTokenId:1,
    towns:[0,0,0,0],
    heroes:[{...heroTemplate(seed), tokenId:0, xp:1000, level:1, hp:1000, hpUpdatedAt:Date.now(), arrivalAt:0, demoSeed:true}],
    log:['Revival initialized with a demo Arnulf so battle logic can be tested immediately.']
  };
}

export function restoreState(raw) {
  try { const s=JSON.parse(raw); if(s && s.version===1) return s; } catch {}
  return freshState();
}

export function currentHp(hero, now=Date.now()) {
  const elapsed=Math.max(0,(now-(hero.hpUpdatedAt||now))/1000);
  return Math.min(LEGACY.character.maxHP, Math.floor(hero.hp + elapsed/LEGACY.character.secondsPerHp));
}

export function materializeHp(hero, now=Date.now()) {
  const hp=currentHp(hero,now); return {...hero,hp,hpUpdatedAt:now};
}

export function effectiveStats(hero, state) {
  const levelBoost=10*Math.max(0,Math.floor(hero.xp/1000)-1);
  const trainingLevel=state.towns[3]||0;
  const townBoost=LEGACY.character.baseTownRatio[12+trainingLevel]||0;
  return {attack:hero.attack+levelBoost+townBoost,armor:hero.armor+levelBoost+townBoost,speed:hero.speed+levelBoost+townBoost};
}

export function recruitCost() { return fromWei(LEGACY.oracle.getCharacterPrice); }
export function expediteCost() { return fromWei(LEGACY.oracle.getExpeditePrice); }
export function townCost(type,nextLevel) {
  const idx=type*4+nextLevel; return fromWei(LEGACY.oracle.getTownUpgradePrices[idx]);
}

export function recruit(state, rng=Math.random, now=Date.now()) {
  const cost=recruitCost(); if(state.bnbh<cost) throw Error('Not enough simulated BNBH');
  const roll=Math.min(99,Math.floor(rng()*100)); const idx=LEGACY.character.randomTable[roll];
  const h={...heroTemplate(idx),tokenId:state.nextTokenId,xp:1000,level:1,hp:1000,hpUpdatedAt:now,arrivalAt:now+LEGACY.character.heroArrivalTime*1000};
  return {...state,bnbh:state.bnbh-cost,nextTokenId:state.nextTokenId+1,heroes:[...state.heroes,h],log:[`Recruit roll ${roll}: ${h.name} (${h.rarity} ${h.className})`,...state.log].slice(0,30)};
}

export function expedite(state, tokenId, now=Date.now()) {
  const cost=expediteCost(); if(state.bnbh<cost) throw Error('Not enough simulated BNBH');
  const heroes=state.heroes.map(h=>h.tokenId===tokenId?{...h,arrivalAt:now}:h);
  return {...state,bnbh:state.bnbh-cost,heroes,log:[`Expedited Hero #${tokenId} for ${cost.toFixed(2)} simulated BNBH`,...state.log].slice(0,30)};
}

export function upgradeTown(state,type,now=Date.now()) {
  const old=state.towns[type]||0; if(old>=3) throw Error('Town already max level');
  const next=old+1,cost=townCost(type,next); if(state.bnbh<cost) throw Error('Not enough simulated BNBH');
  const towns=[...state.towns]; towns[type]=next;
  return {...state,bnbh:state.bnbh-cost,towns,log:[`Town ${type} upgraded to Lv.${next} (${cost.toFixed(2)} simulated BNBH)`,...state.log].slice(0,30)};
}

export function fight(state, tokenId, enemyType, rng=Math.random, now=Date.now()) {
  if(enemyType<0 || enemyType>=LEGACY.character.baseChances.length) throw Error('Unknown enemy');
  const ix=state.heroes.findIndex(h=>h.tokenId===tokenId); if(ix<0) throw Error('Hero not found');
  let hero=materializeHp(state.heroes[ix],now); if(hero.arrivalAt>now) throw Error('Hero has not arrived yet');
  const need=LEGACY.character.requiredHps[enemyType]; if(hero.hp<need) throw Error('Hero needs to rest');
  const st=effectiveStats(hero,state); const chance=LEGACY.character.baseChances[enemyType]+Math.floor(st.attack*10/100);
  const seed=Math.floor(rng()*1000); const success=(seed+chance)>1000;
  const town2=state.towns[2]||0; const xpGain=success?(LEGACY.character.baseEnemyXps[enemyType]+(LEGACY.character.baseTownRatio[8+town2]||0)):0;
  const town0=state.towns[0]||0; const base=fromWei(LEGACY.character.baseBNBRewards[enemyType]);
  const reward=success?base*(1+st.speed/1000)*(1+(LEGACY.character.baseTownRatio[town0]||0)/100):0;
  const armorReduction=success?Math.floor(st.armor/10):0; const hpLoss=Math.max(0,need-armorReduction);
  let xp=hero.xp+xpGain; const cap=(hero.level+1)*1000-1; xp=Math.min(xp,cap);
  hero={...hero,hp:Math.max(0,hero.hp-hpLoss),hpUpdatedAt:now,xp};
  const heroes=[...state.heroes]; heroes[ix]=hero;
  const rewardUnlockAt=state.pendingBNB===0 && reward>0 ? now+172800000 : state.rewardUnlockAt;
  return {...state,heroes,pendingBNB:state.pendingBNB+reward,rewardUnlockAt,
    log:[`${success?'WIN':'MISS'} vs ${LEGACY.enemyNames[enemyType]} — +${xpGain} XP, +${reward.toFixed(6)} BNB, -${hpLoss} HP`,...state.log].slice(0,30)};
}
