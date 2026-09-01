import { LEGACY } from './legacy-data.js';
import {
  freshState, restoreState, currentHp, effectiveStats, recruit, recruitCost,
  expedite, expediteCost, upgradeTown, townCost, fight, heroCapacity,
  unlockLevel, unlockLevelCost, moveToReserve, takeFromReserve,
  withdrawalTax, claimRewards, buyMarketHero
} from './engine.js';
import { VISUALS, heroArt, enemyArt } from './visual-data.js';

const KEY='bnbheroes-revival-v2';
let state=restoreState(localStorage.getItem(KEY) || localStorage.getItem('bnbheroes-revival-v1'));
let selected=state.heroes[0]?.tokenId ?? null;
let marketFilter='All';

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const fmt=(n,d=2)=>Number(n||0).toLocaleString(undefined,{maximumFractionDigits:d});
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

const townMeta=[
  {name:'Bank',icon:'◆',effect:['+3% BNB rewards','+6% BNB rewards','+16% BNB rewards'],desc:'Increases BNB reward paid by successful fights.'},
  {name:'Town Inn',icon:'⌂',effect:['+1 active Hero slot','+2 active Hero slots','+3 active Hero slots'],desc:'Expands the active Hero roster and supports HP recovery.'},
  {name:'Barracks',icon:'⚑',effect:['+30 XP / win','+60 XP / win','+90 XP / win'],desc:'Adds XP to successful battles.'},
  {name:'Training Grounds',icon:'⚔',effect:['+30 A/D/S','+60 A/D/S','+140 A/D/S'],desc:'Raises Attack, Armor and Speed for active Heroes.'}
];
const rarityOrder=['Common','Uncommon','Rare','Epic','Legendary'];

function toast(msg,kind='error'){
  const t=$('#toast'); t.textContent=msg; t.dataset.kind=kind; t.classList.add('show');
  clearTimeout(toast.timer); toast.timer=setTimeout(()=>t.classList.remove('show'),2200);
}
function act(fn,msg){
  try{
    state=fn();
    if(selected!==null&&!state.heroes.some(h=>h.tokenId===selected)) selected=state.heroes[0]?.tokenId??null;
    save();render();if(msg)toast(msg,'ok');
  }catch(e){toast(e.message)}
}
function duration(ms){
  if(ms<=0)return 'Ready'; const s=Math.ceil(ms/1000),h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;
  return h?`${h}h ${m}m`:`${m}m ${sec}s`;
}
function selectedHero(){return state.heroes.find(h=>h.tokenId===selected)||state.heroes[0]||null}
function heroName(h){return h.name.startsWith('Lost Hero')?`Hero ${LEGACY.character.heroNames[h.template]}`:h.name}
function heroImage(h){return `<div class="hero-image"><img src="${heroArt(h)}" alt="${esc(heroName(h))}"><span class="rarity-tag">${esc(h.rarity)} · ${esc(h.className)}</span></div>`}

function heroCard(h,{market=false}={}){
  const hp=currentHp(h),st=effectiveStats(h,state),waiting=Math.max(0,(h.arrivalAt||0)-Date.now());
  const cap=(h.level+1)*1000-1,levelReady=h.xp===cap;
  return `<article class="hero-card ${h.rarity.toLowerCase()} ${h.tokenId===selected?'selected':''}" data-hero="${h.tokenId}">
    ${heroImage(h)}
    <div class="hero-copy">
      <small>${market?'MARKET LISTING':`NFT #${h.tokenId}`}</small>
      <h3>${esc(heroName(h))}</h3>
      <div class="hero-meta"><span>${esc(h.className)}</span><b>LV.${h.level}</b></div>
      <div class="stats"><span><i>ATTACK</i><b>${st.attack}</b></span><span><i>ARMOR</i><b>${st.armor}</b></span><span><i>SPEED</i><b>${st.speed}</b></span></div>
      ${market?`<div class="market-price"><b>${fmt(h.price,0)} BNBH</b><button class="market-buy" data-buy="${h.tokenId}">BUY</button></div>`:`
        <div class="meter"><i style="width:${hp/10}%"></i><b>${hp} / 1000 HP</b></div>
        <div class="meter xp"><i style="width:${Math.max(0,Math.min(100,((h.xp-h.level*1000)/Math.max(1,cap-h.level*1000))*100))}%"></i><b>${h.xp} XP</b></div>
        <div class="hero-actions">
          ${waiting?`<button class="primary" data-expedite="${h.tokenId}">EXPEDITE · ${fmt(expediteCost())}</button><small>${duration(waiting)}</small>`:
            levelReady?`<button class="primary" data-unlock="${h.tokenId}">UNLOCK LV.${h.level+1}</button>`:
            `<button class="primary" data-select="${h.tokenId}">SELECT</button><button data-reserve="${h.tokenId}">RESERVE</button>`}
        </div>`}
    </div>
  </article>`;
}

function renderTown(){
  $('#towns').innerHTML=townMeta.map((t,i)=>{
    const lv=state.towns[i]||0;
    return `<article class="town-card"><div class="town-icon">${t.icon}</div><small>BUILDING ${i+1}</small><h3>${t.name}</h3><p>${t.desc}</p><strong>${lv?t.effect[lv-1]:'LEVEL 0 · NOT UPGRADED'}</strong><div class="town-bottom"><span class="town-level">LV. <b>${lv}</b>/3</span>${lv<3?`<button data-town="${i}">UPGRADE<em>${fmt(townCost(i,lv+1))} BNBH</em></button>`:'<b>MAX</b>'}</div></article>`;
  }).join('');
}
function renderHeroes(){
  $('#heroCount').textContent=state.heroes.length; $('#heroCapacity').textContent=heroCapacity(state);
  $('#heroesGrid').innerHTML=state.heroes.length?state.heroes.map(h=>heroCard(h)).join(''):'<div class="empty-state">No active Heroes. Return one from Reserves.</div>';
  $('#recruitCost').textContent=fmt(recruitCost());
  $('#rarityPromos').innerHTML=rarityOrder.map(r=>`<figure><img src="${VISUALS.heroSheets[r]}" alt="Original ${r} Heroes"><figcaption>${r.toUpperCase()}</figcaption></figure>`).join('');
}
function selectedPreview(){
  const h=selectedHero(); if(!h)return '<div class="empty-state">Recruit or return a Hero first.</div>';
  const st=effectiveStats(h,state),hp=currentHp(h);
  return `<div class="fighter-card">${heroImage(h)}<h3>${esc(heroName(h))}</h3><p>${h.rarity} ${h.className} · LV.${h.level}</p><div class="fighter-stats"><span>ATTACK ${st.attack}</span><span>ARMOR ${st.armor}</span><span>SPEED ${st.speed}</span><span>HP ${hp}</span></div></div>`;
}
function successPct(h,i){if(!h)return 0;const st=effectiveStats(h,state);return Math.max(0,Math.min(100,(LEGACY.character.baseChances[i]+Math.floor(st.attack*10/100))/10))}
function renderBattle(){
  const h=selectedHero(); $('#selectedHero').textContent=h?`${heroName(h)} · NFT #${h.tokenId}`:'NO HERO'; $('#fighterPreview').innerHTML=selectedPreview();
  $('#enemies').innerHTML=LEGACY.character.baseChances.map((baseChance,i)=>{
    const boss=i===6,mage=i===5,name=boss?'Chapter 1 Boss':mage?'Tier 2 Mage':`Tier 1 Enemy ${i+1}`;
    const reward=Number(LEGACY.character.baseBNBRewards[i])/1e18;
    return `<article class="enemy-card ${boss?'boss':''}"><img src="${enemyArt(i)}" alt="${name}"><div class="enemy-info"><small>${boss?'BOSS FIGHT':mage?'TIER 2 ENCOUNTER':'PVE ENCOUNTER'}</small><h3>${name}</h3><div class="enemy-stats"><span><i>SUCCESS</i><b style="color:#73d663">${successPct(h,i).toFixed(0)}%</b></span><span><i>REQUIRED HP</i><b>${LEGACY.character.requiredHps[i]}</b></span><span><i>XP</i><b>${LEGACY.character.baseEnemyXps[i]}</b></span><span><i>BASE BNB</i><b>${reward.toFixed(3)}</b></span></div><button class="enemy-fight" data-enemy="${i}">FIGHT</button></div></article>`;
  }).join('');
}
function renderMarket(){
  const list=(state.market||[]).filter(h=>marketFilter==='All'||h.rarity===marketFilter);
  $('#marketGrid').innerHTML=list.length?list.map(h=>heroCard(h,{market:true})).join(''):'<div class="empty-state">No local archive listings in this rarity.</div>';
}
function compactHero(h,reserved=false){
  return `<article class="compact-hero"><img src="${heroArt(h)}" alt="${esc(heroName(h))}"><div><b>${esc(heroName(h))}</b><small>NFT #${h.tokenId} · ${h.rarity} ${h.className}</small><span>LV.${h.level} · ${currentHp(h)} HP</span></div>${reserved?`<button data-return="${h.tokenId}">RETURN</button>`:`<button data-reserve="${h.tokenId}">MOVE →</button>`}</article>`;
}
function renderReserve(){
  $('#reserveCount').textContent=(state.reserve||[]).length;
  $('#activeReserveList').innerHTML=state.heroes.length?state.heroes.map(h=>compactHero(h)).join(''):'<div class="empty-state">No active Heroes</div>';
  $('#reserveList').innerHTML=(state.reserve||[]).length?state.reserve.map(h=>compactHero(h,true)).join(''):'<div class="empty-state">Reserve bag is empty</div>';
}
function renderVault(){
  const now=Date.now(),locked=state.pendingBNB>0&&now<state.rewardUnlockAt,tax=withdrawalTax(state,now);
  $('#vaultAmount').textContent=state.pendingBNB.toFixed(6); $('#claimTax').textContent=`${tax}%`; $('#claimedLarge').textContent=(state.claimedBNB||0).toFixed(6);
  $('#vaultLock').innerHTML=!state.pendingBNB?'No rewards yet':locked?`<b>LOCKED</b> · ${duration(state.rewardUnlockAt-now)} remaining`:`<b>UNLOCKED</b> · ${tax}% tax if claimed now`;
  $('#claimBtn').disabled=!state.pendingBNB||locked;
}
function renderLog(){
  $('#activityLog').innerHTML=(state.log||[]).map((x,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span><p>${esc(x)}</p></li>`).join('');
}
function showFightResult(win,bnb,xp,hp){
  const overlay=$('#fightResult'),card=$('#resultCard');
  card.classList.toggle('fail',!win);
  $('#resultBNB').textContent=`${bnb.toFixed(3)}BNB`;
  $('#resultXP').textContent=`${xp}XP`;
  $('#resultHP').textContent=`${hp}HP`;
  overlay.classList.add('show'); overlay.setAttribute('aria-hidden','false');
}
function hideFightResult(){const x=$('#fightResult');x.classList.remove('show');x.setAttribute('aria-hidden','true')}
function doFight(enemyType){
  const h=selectedHero(); if(!h){toast('Select a Hero first');return}
  const beforeRewards=state.pendingBNB,beforeXp=h.xp,beforeHp=currentHp(h);
  try{
    const next=fight(state,h.tokenId,enemyType);
    const after=next.heroes.find(x=>x.tokenId===h.tokenId);
    const reward=Math.max(0,next.pendingBNB-beforeRewards),xp=Math.max(0,after.xp-beforeXp),hp=Math.max(0,beforeHp-after.hp);
    const win=reward>0||xp>0;
    state=next;save();render();showFightResult(win,reward,xp,hp);
  }catch(e){toast(e.message)}
}
function bindDynamic(){
  $$('[data-select]').forEach(b=>b.onclick=e=>{e.stopPropagation();selected=Number(b.dataset.select);render();openTab('battle')});
  $$('[data-hero]').forEach(el=>el.onclick=e=>{if(e.target.closest('button'))return;selected=Number(el.dataset.hero);render()});
  $$('[data-expedite]').forEach(b=>b.onclick=e=>{e.stopPropagation();act(()=>expedite(state,Number(b.dataset.expedite)))});
  $$('[data-unlock]').forEach(b=>b.onclick=e=>{e.stopPropagation();act(()=>unlockLevel(state,Number(b.dataset.unlock)))});
  $$('[data-reserve]').forEach(b=>b.onclick=e=>{e.stopPropagation();act(()=>moveToReserve(state,Number(b.dataset.reserve)))});
  $$('[data-return]').forEach(b=>b.onclick=()=>act(()=>takeFromReserve(state,Number(b.dataset.return))));
  $$('[data-town]').forEach(b=>b.onclick=()=>act(()=>upgradeTown(state,Number(b.dataset.town))));
  $$('[data-enemy]').forEach(b=>b.onclick=()=>doFight(Number(b.dataset.enemy)));
  $$('[data-buy]').forEach(b=>b.onclick=e=>{e.stopPropagation();act(()=>buyMarketHero(state,Number(b.dataset.buy)),'Hero purchased in local simulation')});
}
function render(){
  $('#bnbh').textContent=fmt(state.bnbh); $('#rewards').textContent=state.pendingBNB.toFixed(4); $('#claimed').textContent=(state.claimedBNB||0).toFixed(4);
  renderTown();renderHeroes();renderBattle();renderMarket();renderReserve();renderVault();renderLog();bindDynamic();
}
function openTab(tab){
  $$('.screen').forEach(x=>x.classList.toggle('active',x.id===tab));
  $$('.legacy-nav [data-tab]').forEach(x=>x.classList.toggle('active',x.dataset.tab===tab));
  window.scrollTo({top:0,behavior:'smooth'});
}

// Recovered visual sources.
$('#brandLogo').src=VISUALS.logo;
$('#betaBackdrop').src=VISUALS.betaOpen;
$('#betaV2Ref').src=VISUALS.betaV2;
$('#fightRef').src=VISUALS.dynamicFight;
$('#resultReference').src=VISUALS.resultWin;

$$('[data-tab]').forEach(b=>b.onclick=()=>openTab(b.dataset.tab));
$('#recruit').onclick=()=>act(()=>recruit(state),'Hero recruited');
$('#claimBtn').onclick=()=>act(()=>claimRewards(state),'Rewards claimed in local simulation');
$('#reset').onclick=()=>{if(confirm('Reset this local BNB HEROES preservation save?')){state=freshState();selected=0;save();render();openTab('town')}};
$('#resultClose').onclick=hideFightResult; $('#failClose').onclick=hideFightResult; $('#fightResult').onclick=e=>{if(e.target===e.currentTarget)hideFightResult()};
$$('.filter').forEach(b=>b.onclick=()=>{marketFilter=b.textContent.trim();$$('.filter').forEach(x=>x.classList.toggle('active',x===b));renderMarket();bindDynamic()});
$('#core').textContent=LEGACY.addresses.core; $('#character').textContent=LEGACY.addresses.character; $('#pool').textContent=LEGACY.addresses.pool; $('#oracle').textContent=LEGACY.addresses.oracle;

save();render();
setInterval(()=>{renderHeroes();renderBattle();renderReserve();renderVault();bindDynamic()},1000);
