(() => {
  'use strict';
  const notice = 'BNB HEROES preservation mode: real wallet/contract transactions are disabled. Use the Playable Revival for simulated gameplay.';
  window.__BNBH_PRESERVATION__ = Object.freeze({baseline:'2021-11-17', walletDisabled:true, playable:'/prototype/', gitbook:'/gitbook/'});

  const originalOpen = window.open.bind(window);
  window.open = (url, ...rest) => {
    if (typeof url === 'string' && url.includes('bnbheroes.gitbook.io')) {
      location.href = '/gitbook/';
      return null;
    }
    return originalOpen(url, ...rest);
  };

  document.addEventListener('click', (event) => {
    const img = event.target && event.target.closest ? event.target.closest('img') : null;
    if (!img) return;
    const alt = (img.getAttribute('alt') || '').toLowerCase();
    // These actions require the dead/unsafe 2021 transaction layer. Stop them before React's handler.
    if (alt === 'upgrade' || alt === 'fight-btn') {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      alert(notice);
    }
  }, true);

  addEventListener('DOMContentLoaded', () => {
    const badge = document.createElement('div');
    badge.id = 'preservation-badge';
    badge.innerHTML = '<b>2021 PRESERVATION</b><span>Wallet disabled</span><a href="/prototype/">Playable Revival</a><a href="/gitbook/">GitBook</a>';
    badge.style.cssText = 'position:fixed;right:10px;top:10px;z-index:2147483647;background:#121018e8;border:1px solid #9c7d3b;color:#d6c8aa;padding:7px 9px;border-radius:5px;font:10px/1.3 Arial,sans-serif;box-shadow:0 2px 12px #0008;display:flex;gap:8px;align-items:center';
    for (const a of badge.querySelectorAll('a')) a.style.cssText='color:#f2c85e;text-decoration:none';
    badge.querySelector('span').style.opacity='.7';
    document.body.appendChild(badge);
  });

  addEventListener('error', (e) => {
    if (e && e.message) console.warn('[BNBH preservation caught]', e.message);
  });
})();
