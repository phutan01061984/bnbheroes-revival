(() => {
  'use strict';
  window.__BNBH_PRESERVATION__ = Object.freeze({
    baseline:'2021-11-17',
    realWalletDisabled:true,
    localProvider:true,
    playable:'/prototype/',
    gitbook:'/gitbook/'
  });

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
