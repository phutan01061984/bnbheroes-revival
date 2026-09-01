import { LEGACY } from './legacy-data.js';
import {
  freshState, restoreState, currentHp, effectiveStats, recruit, recruitCost,
  expedite, expediteCost, upgradeTown, townCost, fight, heroCapacity,
  unlockLevel, unlockLevelCost, moveToReserve, takeFromReserve,
  withdrawalTax, claimRewards, buyMarketHero
} from './engine.js';

const KEY='bnbheroes-revival-v2';
let state=restoreState(localStorage.getItem(KEY) || localStorage.getItem('bnbheroes-revival-v1'));
let selected=state.heroes[0]?.tokenId ?? null;
let marketFilter='All';

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const fmt=(n,d=2)=>Number(n||0).toLocaleString(undefined,{maximumFractionDigits:d});
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const classGlyph={Soldier:'♜',Hunter:'➹',Rogue:'♠',Mage:'✦',Knight:'♞'};
const townMeta=[
  {name:'Bank',icon:'◆',effect:['+3% BNB rewards','+6% BNB rewards','+16% BNB rewards'],desc:'Increases BNB rewards from successful fights.'},
  {name:'Town Inn',icon:'⌂',effect:['+1 Hero slot · recovery bonus','+1 Hero slot · recovery bonus','+1 Hero slot · recovery bonus'],desc:'Adds active Hero capacity; the 2021 guide also describes reduced HP loss/recovery improvement.'},
  {name:'Barracks',icon:'⚑',effect:['+30 XP / win','+60 XP / win','+90 XP / win'],desc:'Adds XP to successful fights.'},
  {name:'Training Grounds',icon:'⚔',effect:['+30 A/D/S','+60 A/D/S','+140 A/D/S'],desc:'Adds Attack, Armor and Speed.'}
];

function toast(msg,kind='error'){
  const t=$('#toast'); t.textContent=msg; t.dataset.kind=kind; t.classList.add('show');
  clearTimeout(toast.timer); toast.timer=setTimeout(()=>t.classList.remove('show'),2200);
}
function act(fn,msg){try{state=fn(); if(selected!==null&&!state.heroes.some(h=>h.tokenId===selected)) selected=state.heroes[0]?.tokenId??null; save();render(); if(msg)toast(msg,'ok')}catch(e){toast(e.message)}}
function duration(ms){
  if(ms<=0)return 'Ready'; const s=Math.ceil(ms/1000),h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;
  return h?`${h}h ${m}m`:`${m}m ${sec}s`;
}
function heroVisual(h,small=false){
  const glyph=classGlyph[h.className]||'♞';
  return `<div class="hero-art ${h.rarity.toLowerCase()} ${small?'small':''}"><div class="art-haze"></div><span class="class-glyph">${glyph}</span><i class="weapon"></i><b>${esc(h.rarity)}</b></div>`;
}
function heroCard(h,{market=false}={}){
  const hp=currentHp(h),st=effectiveStats(h,state),waiting=Math.max(0,(h.arrivalAt||0)-Date.now());
  const cap=(h.level+1)*1000-1,levelReady=h.xp===cap;
  return `<article class="hero-card ${h.rarity.toLowerCase()} ${h.tokenId===selected?'selected':''}" data-hero="${h.tokenId}">
    ${heroVisual(h)}
    <div class="hero-info">
      <div class="hero-kicker"><span>${esc(h.className)}</span><em>LV ${h.level}</em></div>
      <h3>${esc(h.name)}</h3>
      <small class="token-id">${market?'ARCHIVE LISTING':`HERO #${h.tokenId}`}</small>
      <div class="stat-row"><span><i>ATK</i><b>${st.attack}</b></span><span><i>ARM</i><b>${st.armor}</b></span><span><i>SPD</i><b>${st.speed}</b></span></div>
      ${market?`<div class="market-price"><span>${fmt(h.price,0)} BNBH</span><button data-buy="${h.tokenId}">BUY</button></div>`:`
      <div class="meter hp"><i style="width:${hp/10}%"></i><b>${hp} / 1000 HP</b></div>
      <div class="meter xp"><i style="width:${Math.max(0,Math.min(100,((h.xp-h.level*1000)/(cap-h.level*1000))*100))}%"></i><b>${h.xp} XP</b></div>
      <div class="hero-actions">
        ${waiting?`<button data-expedite="${h.tokenId}">Expedite · ${fmt(expediteCost())}</button><small>${duration(waiting)} to arrive</small>`:
          levelReady?`<button class="level-up" data-unlock="${h.tokenId}">Unlock Lv.${h.level+1} · ${fmt(unlockLevelCost(state,h.tokenId))}</button>`:
          `<button data-select="${h.tokenId}">Select for Battle</button><button data-reserve="${h.tokenId}" class="ghost">Reserve</button>`}
      </div>`}
    </div>
  </article>`;
}
function selectedHero(){return state.heroes.find(h=>h.tokenId===selected)||state.heroes[0]||null}
function selectedPreview(){
  const h=selectedHero(); if(!h)return '<div class="empty-state">No active Hero</div>';
  const st=effectiveStats(h,state),hp=currentHp(h);
  return `<div class="fighter-card">${heroVisual(h)}<small>YOUR HERO</small><h3>${esc(h.name)}</h3><p>${esc(h.rarity)} ${esc(h.className)} · Lv.${h.level}</p><div class="fighter-stats"><span>⚔ ${st.attack}</span><span>🛡 ${st.armor}</span><span>➤ ${st.speed}</span><span>♥ ${hp}</span></div></div>`;
}
function renderTown(){
  $('#townHotspots').innerHTML=townMeta.map((t,i)=>`<button data-town-open="${i}" class="hotspot hotspot-${i}"><span>${t.icon}</span><b>${t.name}</b><small>Lv.${state.towns[i]}</small></button>`).join('');
  $('#towns').innerHTML=townMeta.map((t,i)=>{const lv=state.towns[i];return `<article class="town-card"><div class="town-icon">${t.icon}</div><div><small>BUILDING ${i+1}</small><h3>${t.name}</h3><p>${t.desc}</p><strong>${lv? t.effect[lv-1]:'Not upgraded'}</strong></div><div class="town-level"><b>${lv}</b><small>/ 3</small>${lv<3?`<button data-town="${i}">Upgrade<br><em>${fmt(townCost(i,lv+1))} BNBH</em></button>`:'<span>MAX</span>'}</div></article>`}).join('');
}
function renderHeroes(){
  $('#heroCount').textContent=state.heroes.length; $('#heroCapacity').textContent=heroCapacity(state);
  $('#heroesGrid').innerHTML=state.heroes.length?state.heroes.map(h=>heroCard(h)).join(''):'<div class="empty-state">All heroes are in Reserves. Bring one back to fight.</div>';
  $('#recruitCost').textContent=fmt(recruitCost());
}
function renderBattle(){
  const h=selectedHero(); $('#selectedHero').textContent=h?`${h.name} #${h.tokenId}`:'—'; $('#fighterPreview').innerHTML=selectedPreview();
  $('#enemies').innerHTML=LEGACY.character.baseChances.map((chance,i)=>{
    const boss=i===6, mage=i===5; const name=LEGACY.enemyNames[i]; const base=Number(LEGACY.character.baseBNBRewards[i])/1e18;
    return `<button class="enemy-card ${boss?'boss':''}" data-enemy="${i}"><div class="enemy-art"><span>${boss?'♛':mage?'✹':'☠'}</span></div><small>${boss?'BOSS CHAPTER':mage?'MAGE ENCOUNTER':`ENEMY ${i+1}`}</small><h3>${esc(name)}</h3><dl><div><dt>BASE</dt><dd>${chance/10}%</dd></div><div><dt>HP</dt><dd>${LEGACY.character.requiredHps[i]}</dd></div><div><dt>XP</dt><dd>${LEGACY.character.baseEnemyXps[i]}</dd></div><div><dt>BNB</dt><dd>${base.toFixed(5)}</dd></div></dl><b>FIGHT</b></button>`;
  }).join('');
}
function renderMarket(){
  const list=(state.market||[]).filter(h=>marketFilter==='All'||h.rarity===marketFilter);
  $('#marketGrid').innerHTML=list.length?list.map(h=>heroCard(h,{market:true})).join(''):'<div class="empty-state">No demo listings in this rarity.</div>';
}
function compactHero(h,reserved=false){
  return `<article class="compact-hero">${heroVisual(h,true)}<div><b>${esc(h.name)}</b><small>#${h.tokenId} · ${h.rarity} ${h.className}</small><span>Lv.${h.level} · ${currentHp(h)} HP</span></div>${reserved?`<button data-return="${h.tokenId}">Return</button>`:`<button data-reserve="${h.tokenId}">Move →</button>`}</article>`;
}
function renderReserve(){
  $('#reserveCount').textContent=(state.reserve||[]).length;
  $('#activeReserveList').innerHTML=state.heroes.length?state.heroes.map(h=>compactHero(h)).join(''):'<div class="empty-mini">No active heroes</div>';
  $('#reserveList').innerHTML=(state.reserve||[]).length?state.reserve.map(h=>compactHero(h,true)).join(''):'<div class="empty-mini">Reserve bag is empty</div>';
}
function renderVault(){
  const now=Date.now(),locked=state.pendingBNB>0&&now<state.rewardUnlockAt,tax=withdrawalTax(state,now);
  $('#vaultAmount').textContent=state.pendingBNB.toFixed(6); $('#claimTax').textContent=`${tax}%`; $('#claimedLarge').textContent=(state.claimedBNB||0).toFixed(6);
  $('#vaultLock').innerHTML=!state.pendingBNB?'No rewards yet':locked?`<b>LOCKED</b> ${duration(state.rewardUnlockAt-now)} remaining`:`<b>UNLOCKED</b> Claim now at ${tax}% tax`;
  $('#claimBtn').disabled=!state.pendingBNB||locked;
}
function renderLog(){
  $('#activityLog').innerHTML=(state.log||[]).map((x,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span><p>${esc(x)}</p></li>`).join('');
}
function bindDynamic(){
  $$('[data-select]').forEach(b=>b.onclick=e=>{e.stopPropagation();selected=Number(b.dataset.select);render();openTab('battle')});
  $$('[data-hero]').forEach(el=>el.onclick=e=>{if(e.target.closest('button'))return;selected=Number(el.dataset.hero);render()});
  $$('[data-expedite]').forEach(b=>b.onclick=e=>{e.stopPropagation();act(()=>expedite(state,Number(b.dataset.expedite)))});
  $$('[data-unlock]').forEach(b=>b.onclick=e=>{e.stopPropagation();act(()=>unlockLevel(state,Number(b.dataset.unlock)))});
  $$('[data-reserve]').forEach(b=>b.onclick=e=>{e.stopPropagation();act(()=>moveToReserve(state,Number(b.dataset.reserve)))});
  $$('[data-return]').forEach(b=>b.onclick=()=>act(()=>takeFromReserve(state,Number(b.dataset.return))));
  $$('[data-town]').forEach(b=>b.onclick=()=>act(()=>upgradeTown(state,Number(b.dataset.town))));
  $$('[data-town-open]').forEach(b=>b.onclick=()=>{document.querySelector(`[data-town="${b.dataset.townOpen}"]`)?.scrollIntoView({behavior:'smooth',block:'center'})});
  $$('[data-enemy]').forEach(b=>b.onclick=()=>act(()=>fight(state,selected,Number(b.dataset.enemy))));
  $$('[data-buy]').forEach(b=>b.onclick=e=>{e.stopPropagation();act(()=>buyMarketHero(state,Number(b.dataset.buy)),'Hero purchased in local simulation')});
}
function render(){
  $('#bnbh').textContent=fmt(state.bnbh); $('#rewards').textContent=state.pendingBNB.toFixed(4); $('#claimed').textContent=(state.claimedBNB||0).toFixed(4);
  renderTown();renderHeroes();renderBattle();renderMarket();renderReserve();renderVault();renderLog();bindDynamic();
}
function openTab(tab){
  $$('.screen').forEach(x=>x.classList.toggle('active',x.id===tab));
  $$('.rail-btn').forEach(x=>x.classList.toggle('active',x.dataset.tab===tab));
  window.scrollTo({top:0,behavior:'smooth'});
}

$$('[data-tab]').forEach(b=>b.onclick=()=>openTab(b.dataset.tab));
$('#recruit').onclick=()=>act(()=>recruit(state));
$('#claimBtn').onclick=()=>act(()=>claimRewards(state),'Rewards claimed in simulation');
$('#reset').onclick=()=>{if(confirm('Reset this local BNB HEROES revival save?')){state=freshState();selected=0;save();render();openTab('town')}};
$$('.filter').forEach(b=>b.onclick=()=>{marketFilter=b.textContent.trim();$$('.filter').forEach(x=>x.classList.toggle('active',x===b));renderMarket();bindDynamic()});
$('#core').textContent=LEGACY.addresses.core; $('#character').textContent=LEGACY.addresses.character; $('#pool').textContent=LEGACY.addresses.pool; $('#oracle').textContent=LEGACY.addresses.oracle;

save();render();setInterval(()=>{renderHeroes();renderBattle();renderReserve();renderVault();bindDynamic()},1000);
