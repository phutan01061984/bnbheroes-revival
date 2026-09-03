(() => {
  'use strict';
  window.__BNBH_PRESERVATION__ = Object.freeze({
    baseline:'2021-11-17',
    realWalletDisabled:true,
    localProvider:true,
    playable:'/prototype/',
    gitbook:'/gitbook/'
  });

  // The 2021 Battle Logs page used Bitquery GraphQL instead of the game contract directly.
  // Preserve the untouched React/Apollo component and emulate only that retired data source.
  const nativeFetch = window.fetch.bind(window);
  const STATE_KEY = 'bnbheroes-revival-v2';
  const LOCAL_ACCOUNT = '0xB000000000000000000000000000000000000001';
  const toWeiString = value => BigInt(Math.round(Number(value || 0) * 1e18)).toString();
  const bitqueryResponse = async init => {
    let payload = {};
    try { payload = JSON.parse(typeof init?.body === 'string' ? init.body : '{}'); } catch {}
    const vars = payload.variables || {};
    let state = {};
    try { state = JSON.parse(localStorage.getItem(STATE_KEY) || '{}'); } catch {}
    const all = state.battleHistory || [];
    const offset = Math.max(0, Number(vars.offset || 0));
    const limit = Math.max(0, Number(vars.limit || 12));
    const query = String(payload.query || '');
    if (query.includes('count(smartContractEvent')) {
      return {data:{ethereum:{smartContractEvents:[{count:all.length}]}}};
    }
    const rows = all.slice(offset, offset + limit).map((b, i) => ({
      smartContractEvent:{name:'Fight'},
      block:{height:1000000+i,timestamp:{iso8601:new Date(b.timestamp || Date.now()).toISOString(),unixtime:Math.floor((b.timestamp || Date.now())/1000)}},
      arguments:[
        {argument:'player',value:LOCAL_ACCOUNT},
        {argument:'_attackingHero',value:String(b.hero)},
        {argument:'enemyType',value:String(b.enemy)},
        {argument:'rewards',value:toWeiString(b.rewards)},
        {argument:'xpGained',value:String(b.xpGained || 0)},
        {argument:'hpLoss',value:String(b.hpLoss || 0)}
      ]
    }));
    return {data:{ethereum:{smartContractEvents:rows}}};
  };
  window.fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : input?.url || '';
    if (url.startsWith('https://graphql.bitquery.io/')) {
      return new Response(JSON.stringify(await bitqueryResponse(init)), {status:200, headers:{'Content-Type':'application/json'}});
    }
    return nativeFetch(input, init);
  };
  window.__BNBH_LOCAL_BITQUERY__ = true;

  // Keep the historic GitBook menu useful without changing the React navigation.
  const originalOpen = window.open.bind(window);
  window.open = (url, ...rest) => {
    if (typeof url === 'string' && url.includes('bnbheroes.gitbook.io')) {
      location.href = '/gitbook/';
      return null;
    }
    return originalOpen(url, ...rest);
  };

  addEventListener('DOMContentLoaded', () => {
    const badge = document.createElement('div');
    badge.id = 'preservation-badge';
    badge.innerHTML = '<b>2021 PRESERVATION</b><span>Local wallet emulator</span><a href="/prototype/">Revival</a><a href="/gitbook/">GitBook</a>';
    badge.style.cssText = 'position:fixed;right:10px;top:10px;z-index:2147483647;background:#121018e8;border:1px solid #9c7d3b;color:#d6c8aa;padding:7px 9px;border-radius:5px;font:10px/1.3 Arial,sans-serif;box-shadow:0 2px 12px #0008;display:flex;gap:8px;align-items:center';
    for (const a of badge.querySelectorAll('a')) a.style.cssText='color:#f2c85e;text-decoration:none';
    badge.querySelector('span').style.opacity='.7';
    document.body.appendChild(badge);
  });

  addEventListener('error', (e) => {
    if (e && e.message) console.warn('[BNBH preservation caught]', e.message);
  });
})();
