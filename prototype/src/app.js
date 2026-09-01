import { LEGACY } from './legacy-data.js';
import { freshState,restoreState,currentHp,effectiveStats,recruit,recruitCost,expedite,expediteCost,upgradeTown,townCost,fight } from './engine.js';
const KEY='bnbheroes-revival-v1'; let state=restoreState(localStorage.getItem(KEY)); let selected=state.heroes[0]?.tokenId??0;
const $=s=>document.querySelector(s); const fmt=n=>Number(n).toLocaleString(undefined,{maximumFractionDigits:4});
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
const rarityClass=r=>r.toLowerCase();
function card(h){const hp=currentHp(h),st=effectiveStats(h,state),waiting=Math.max(0,h.arrivalAt-Date.now());return `<article class="hero-card ${rarityClass(h.rarity)} ${h.tokenId===selected?'selected':''}" data-hero="${h.tokenId}">
<div class="portrait"><span>${h.className.slice(0,1)}</span><b>${h.rarity}</b></div><div class="hero-copy"><small>#${h.tokenId} · ${h.className}</small><h3>${h.name}</h3><div class="stats"><span>⚔ ${st.attack}</span><span>🛡 ${st.armor}</span><span>➤ ${st.speed}</span></div><div class="bar"><i style="width:${hp/10}%"></i></div><small>${hp}/1000 HP · Lv.${h.level} · ${h.xp} XP</small>${waiting?`<button class="tiny" data-expedite="${h.tokenId}">Expedite (${fmt(expediteCost())})</button>`:''}</div></article>`}
function render(){
 $('#bnbh').textContent=fmt(state.bnbh); $('#rewards').textContent=state.pendingBNB.toFixed(6); $('#supply').textContent=LEGACY.character.totalSupply.toLocaleString();
 $('#heroes').innerHTML=state.heroes.map(card).join('');
 const h=state.heroes.find(x=>x.tokenId===selected)||state.heroes[0]; if(h) selected=h.tokenId;
 $('#selectedHero').textContent=h?`${h.name} #${h.tokenId}`:'—';
 $('#enemies').innerHTML=LEGACY.character.baseChances.map((chance,i)=>`<button class="enemy" data-enemy="${i}"><b>${LEGACY.enemyNames[i]}</b><span>Base chance ${chance/10}%</span><span>${LEGACY.character.requiredHps[i]} HP requirement</span><span>${(Number(LEGACY.character.baseBNBRewards[i])/1e18).toFixed(5)} base BNB</span></button>`).join('');
 const townNames=['BNB Reward Building','Hero Capacity / Recovery','XP Building','Training Ground']; $('#towns').innerHTML=state.towns.map((lv,i)=>`<div class="town"><div><small>Building ${i}</small><h3>${townNames[i]}</h3><p>Legacy level ${lv}/3</p></div>${lv<3?`<button data-town="${i}">Upgrade · ${fmt(townCost(i,lv+1))} BNBH</button>`:'<b>MAX</b>'}</div>`).join('');
 $('#log').innerHTML=state.log.map(x=>`<li>${x}</li>`).join('');
 document.querySelectorAll('[data-hero]').forEach(el=>el.onclick=e=>{if(e.target.closest('[data-expedite]'))return;selected=Number(el.dataset.hero);render()});
 document.querySelectorAll('[data-expedite]').forEach(b=>b.onclick=e=>act(()=>expedite(state,Number(b.dataset.expedite))));
 document.querySelectorAll('[data-enemy]').forEach(b=>b.onclick=()=>act(()=>fight(state,selected,Number(b.dataset.enemy))));
 document.querySelectorAll('[data-town]').forEach(b=>b.onclick=()=>act(()=>upgradeTown(state,Number(b.dataset.town))));
}
function act(fn){try{state=fn();save();render()}catch(e){$('#toast').textContent=e.message;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),1800)}}
$('#recruit').onclick=()=>act(()=>recruit(state)); $('#reset').onclick=()=>{state=freshState();selected=0;save();render()};
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-tab],.panel').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#'+b.dataset.tab).classList.add('active')});
$('#recruitCost').textContent=fmt(recruitCost());
$('#core').textContent=LEGACY.addresses.core; $('#character').textContent=LEGACY.addresses.character; $('#pool').textContent=LEGACY.addresses.pool; $('#oracle').textContent=LEGACY.addresses.oracle;
render(); setInterval(render,10000);
