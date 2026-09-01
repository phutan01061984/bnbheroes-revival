import { PAGES } from './pages.js';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let current=location.hash.slice(1)||PAGES[0].id;
function groups(){const g=[];for(const p of PAGES){let x=g.find(x=>x.name===p.group);if(!x){x={name:p.group,pages:[]};g.push(x)}x.pages.push(p)}return g}
function renderNav(filter=''){
 const q=filter.trim().toLowerCase();
 $('#nav').innerHTML=groups().map(g=>{const ps=g.pages.filter(p=>!q||(`${p.title} ${p.group} ${p.html.replace(/<[^>]+>/g,' ')}`).toLowerCase().includes(q));if(!ps.length)return'';return `<section><small>${g.name}</small>${ps.map(p=>`<a href="#${p.id}" data-page="${p.id}" class="${p.id===current?'active':''}"><span>${p.icon}</span>${p.title}</a>`).join('')}</section>`}).join('')||'<p class="no-search">No matching page</p>';
 $$('[data-page]').forEach(a=>a.onclick=()=>setTimeout(render,0));
}
function buildToc(){
 const heads=[...$('#content').querySelectorAll('h2[id]')];
 $('#toc').innerHTML=heads.map(h=>`<a href="#${current}:${h.id}" data-anchor="${h.id}">${h.textContent}</a>`).join('');
 $$('[data-anchor]').forEach(a=>a.onclick=e=>{e.preventDefault();document.getElementById(a.dataset.anchor)?.scrollIntoView({behavior:'smooth',block:'start'})});
}
function render(){
 const raw=location.hash.slice(1); if(raw&&raw.includes(':')) current=raw.split(':')[0]; else if(raw)current=raw;
 let i=PAGES.findIndex(p=>p.id===current);if(i<0){i=0;current=PAGES[0].id}
 const p=PAGES[i];document.title=`${p.title} · BNB HEROES Restored GitBook`;$('#content').innerHTML=p.html;renderNav($('#search').value);buildToc();
 $('#prevBtn').style.visibility=i?'visible':'hidden';$('#prevBtn').innerHTML=i?`← <span>${PAGES[i-1].title}</span>`:'';$('#prevBtn').onclick=()=>{location.hash=PAGES[i-1].id};
 $('#nextBtn').style.visibility=i<PAGES.length-1?'visible':'hidden';$('#nextBtn').innerHTML=i<PAGES.length-1?`<span>${PAGES[i+1].title}</span> →`:'';$('#nextBtn').onclick=()=>{location.hash=PAGES[i+1].id};
 window.scrollTo(0,0);$('#sidebar').classList.remove('open');
}
$('#search').oninput=e=>renderNav(e.target.value);$('#menuBtn').onclick=()=>$('#sidebar').classList.toggle('open');window.addEventListener('hashchange',render);render();
