/* EasyStore – mobile app layer.
   • App mode (installed app / APK / ?source=app): logo splash -> Login & Register -> full store with bottom tabs.
   • Website mode: a "Get the app" corner with the Android APK / Google Play / Install buttons.
   • Everything (logo, name, banners, products, prices, download links…) comes from the admin panel through /api/site,
     so a change in admin.html shows in the website and in the app. Open pages refresh by themselves. */
(function () {
  'use strict';
  var D = document, H = D.documentElement;
  function ls(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }
  function lw(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function ss(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) {} return null; }

  var q = new URLSearchParams(location.search);
  if (q.get('source') === 'app' || q.get('app') === '1') lw('es_app_mode', 1);
  if (q.get('app') === '0') lw('es_app_mode', 0);
  var standalone = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true || (D.referrer || '').indexOf('android-app://') === 0;
  var isApp = standalone || ls('es_app_mode', 0) === 1;
  var page = location.pathname.split('/').pop() || 'index.html';
  var AUTH = ['customer-login.html', 'customer-register.html'];
  var OPEN = AUTH.concat(['privacy-policy.html', 'terms-and-conditions.html', 'shipping-policy.html', 'return-refund-policy.html', '404.html', 'offline.html']);
  var isAuth = AUTH.indexOf(page) >= 0;

  /* ----- app mode: the login / register screen comes first ----- */
  if (isApp && !ls('es_user', null) && OPEN.indexOf(page) < 0) { location.replace('customer-login.html'); return; }
  if (isApp) { H.classList.add('es-app'); if (isAuth) H.classList.add('es-auth'); }

  /* ----- phone meta tags ----- */
  function head(tag, attrs) { var e = D.createElement(tag); for (var k in attrs) e.setAttribute(k, attrs[k]); D.head.appendChild(e); }
  (function () {
    var v = D.querySelector('meta[name=viewport]');
    if (v && v.content.indexOf('viewport-fit') < 0) v.content += ',viewport-fit=cover';
    head('link', { rel: 'apple-touch-icon', href: 'icon-192.png' });
    head('meta', { name: 'mobile-web-app-capable', content: 'yes' });
    head('meta', { name: 'apple-mobile-web-app-capable', content: 'yes' });
    head('meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' });
  })();

  /* ----- service worker + install prompt ----- */
  var deferred = null;
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; paintCorner(); });
  window.addEventListener('appinstalled', function () { deferred = null; lw('es_app_mode', 1); paintCorner(); });
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }

  /* ----- splash screen (once every time the app is opened) ----- */
  var cfg = ls('es_app_cfg', {});
  if (isApp && !ss('es_splash')) {
    ss('es_splash', '1');
    var secs = Math.min(6, Math.max(1.5, +cfg.secs || 2.6));
    var sp = D.createElement('div');
    sp.id = 'es-splash';
    sp.style.setProperty('--d', secs + 's');
    if (cfg.color) { sp.style.setProperty('--sp1', cfg.color); sp.style.setProperty('--sp2', cfg.color2 || cfg.color); }
    var nm = cfg.name || 'EasyStore';
    sp.innerHTML = '<div class="sp-wrap"><i class="sp-ring2"></i><i class="sp-ring"></i><img class="sp-logo" alt="" src="' + (cfg.logo || 'logo.png') + '"></div>' +
      '<div class="sp-name"></div><div class="sp-tag"></div><div class="sp-bar"><i></i></div>';
    sp.querySelector('.sp-name').textContent = nm;
    sp.querySelector('.sp-tag').textContent = cfg.tagline || '';
    H.appendChild(sp);
    setTimeout(function () { sp.classList.add('out'); setTimeout(function () { sp.remove(); }, 500); }, secs * 1000);
  }

  /* ----- helpers ----- */
  function ES() { return window.ES; }
  function T(en, ur) { return ES() && ES().lang && ES().lang() === 'ur' ? ur : en; }
  function st() { return (ES() && ES().D && ES().D.settings) || {}; }
  function img(u) { return u ? (ES().imgUrl ? ES().imgUrl(u) : u) : ''; }
  function squareLogo() { var s = st(); return img(s.icon || s.logo) || 'logo.png'; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var ICON = {
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
    shop: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
    cart: '<path d="M3 4h3l2.4 10.2a2 2 0 0 0 2 1.6h6.4a2 2 0 0 0 2-1.5L20 8H7"/><circle cx="10" cy="20" r="1.2"/><circle cx="17" cy="20" r="1.2"/>',
    orders: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4-6.5 8-6.5s7 2 8 6.5"/>'
  };
  function svg(k) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[k] + '</svg>'; }

  /* ----- bottom tab bar (app mode) ----- */
  var TABS = [
    ['index.html', 'home', 'Home', 'ہوم', ['index.html', '']],
    ['categories.html', 'shop', 'Shop', 'شاپ', ['categories.html', 'shop.html', 'deals.html', 'search-results.html', 'product-details.html']],
    ['cart.html', 'cart', 'Cart', 'کارٹ', ['cart.html', 'checkout.html']],
    ['my-orders.html', 'orders', 'Orders', 'آرڈرز', ['my-orders.html']],
    ['my-account.html', 'user', 'Account', 'اکاؤنٹ', ['my-account.html']]
  ];
  function paintNav() {
    var nav = D.getElementById('es-nav');
    if (!nav) { nav = D.createElement('nav'); nav.id = 'es-nav'; nav.setAttribute('aria-label', 'App'); D.body.appendChild(nav); }
    var n = (ES() && ES().cart && ES().cart.count) ? ES().cart.count() : 0;
    var sig = n + '|' + page + '|' + (ES() && ES().lang ? ES().lang() : '');
    if (nav.getAttribute('data-sig') === sig) return;
    nav.setAttribute('data-sig', sig);
    nav.innerHTML = TABS.map(function (t) {
      return '<a href="' + t[0] + '" class="' + (t[4].indexOf(page) >= 0 ? 'on' : '') + '">' + svg(t[1]) + '<span>' + T(t[2], t[3]) + '</span>' + (t[1] === 'cart' ? '<b data-n="' + n + '">' + (n || '') + '</b>' : '') + '</a>';
    }).join('');
  }

  /* ----- login / register screen ----- */
  function paintAuth() {
    var s = st(), old = D.querySelector('.es-authhead');
    if (old) old.remove();
    var h = D.createElement('div'); h.className = 'es-authhead';
    h.innerHTML = '<button type="button" class="lang-btn es-lang">' + (ES().lang() === 'en' ? 'اردو' : 'English') + '</button>' +
      '<img alt="" src="' + esc(squareLogo()) + '"><h1>' + esc(s.name || 'EasyStore') + '</h1><p>' + esc((ES().L && ES().L(s, 'tagline')) || '') + '</p>' +
      '<div class="es-tabs"><a href="customer-login.html" class="' + (page === AUTH[0] ? 'on' : '') + '">' + T('Log in', 'لاگ ان') + '</a><a href="customer-register.html" class="' + (page === AUTH[1] ? 'on' : '') + '">' + T('Create account', 'اکاؤنٹ بنائیں') + '</a></div>';
    D.body.insertBefore(h, D.body.firstChild);
  }

  /* ----- "Get the app" corner (website mode) ----- */
  var apk = '', apkChecked = false;
  var ANDROID = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 18c0 .55.45 1 1 1h1v3.5a1.5 1.5 0 0 0 3 0V19h2v3.5a1.5 1.5 0 0 0 3 0V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8A1.5 1.5 0 0 0 2 9.5v7a1.5 1.5 0 0 0 3 0v-7A1.5 1.5 0 0 0 3.5 8zm17 0A1.5 1.5 0 0 0 19 9.5v7a1.5 1.5 0 0 0 3 0v-7A1.5 1.5 0 0 0 20.5 8zM15.53 2.16l1.3-1.3a.5.5 0 0 0-.71-.7l-1.48 1.48A5.97 5.97 0 0 0 12 1c-.96 0-1.86.23-2.66.63L7.85.15a.5.5 0 0 0-.7.7l1.31 1.31A5.98 5.98 0 0 0 6 7h12a5.98 5.98 0 0 0-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>';
  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#00d7fe" d="M3.6 2.3a1.6 1.6 0 0 0-.6 1.3v16.8c0 .5.2 1 .6 1.3L13 12z"/><path fill="#ffce00" d="M16.2 8.8 13 12l3.2 3.2 3.7-2.1a1.5 1.5 0 0 0 0-2.6z"/><path fill="#ff3a44" d="M13 12 3.6 21.7c.5.4 1.2.4 1.8.1l10.8-6.6z"/><path fill="#00f076" d="M16.2 8.8 5.4 2.2c-.6-.3-1.300-.3-1.800.1L13 12z"/></svg>';
  function resolveApk(ap, cb) {
    if (ap.apk_url) { apk = ap.apk_url; return cb(); }
    if (ap.apk_uploaded) { apk = 'downloads/easystore.apk'; return cb(); }
    if (apkChecked) return cb();
    apkChecked = true;
    fetch('downloads/easystore.apk', { method: 'HEAD', cache: 'no-store' }).then(function (r) {
      if (r.ok && !/html/.test(r.headers.get('content-type') || '')) apk = 'downloads/easystore.apk';
    }).catch(function () {}).then(cb);
  }
  function paintCorner() {
    if (isApp || !ES() || !ES().D) return;
    var s = st(), ap = s.app || {}, el = D.getElementById('es-dl');
    if (ap.enabled === false || ls('es_dl_hide', 0) > Date.now() || location.protocol === 'file:' || ['admin.html'].indexOf(page) >= 0) { if (el) el.remove(); return; }
    resolveApk(ap, function () {
      var open = el && el.classList.contains('open');
      if (el) el.remove();
      var ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
      var title = (ES().lang() === 'ur' && ap.title_ur) ? ap.title_ur : (ap.title || T('Get the app', 'ایپ حاصل کریں'));
      var sub = (ES().lang() === 'ur' && ap.sub_ur) ? ap.sub_ur : (ap.sub || T('Shop faster with our mobile app. Offers, orders and tracking in one place.', 'ہماری موبائل ایپ سے تیزی سے خریداری کریں۔ آفرز، آرڈرز اور ٹریکنگ ایک جگہ۔'));
      var body = '<div class="es-dl-head"><img alt="" src="' + esc(squareLogo()) + '"><div><b>' + esc(s.name || 'EasyStore') + '</b><small>' + esc(sub) + '</small></div></div>';
      if (apk) body += '<a class="es-dl-a" href="' + esc(apk) + '" download>' + ANDROID + '<span>' + T('Download Android App (APK)', 'اینڈرائیڈ ایپ ڈاؤن لوڈ کریں') + '</span></a>';
      if (ap.play_url) body += '<a class="es-dl-a play" href="' + esc(ES().safe ? ES().safe(ap.play_url) : ap.play_url) + '" target="_blank" rel="noopener">' + PLAY + '<span>' + T('Get it on Google Play', 'گوگل پلے سے حاصل کریں') + '</span></a>';
      if (deferred) body += '<button type="button" class="es-dl-a alt" data-es-install>' + ANDROID + '<span>' + T('Install on this phone', 'اس فون پر انسٹال کریں') + '</span></button>';
      if (!apk && !ap.play_url && !deferred) body += '<p class="es-dl-note">' + (ios ? T('On iPhone: tap the Share button, then “Add to Home Screen”.', 'آئی فون پر: شیئر کا بٹن دبائیں، پھر “Add to Home Screen” منتخب کریں۔') : T('On your phone open this website in Chrome, tap the ⋮ menu and choose “Install app” / “Add to Home screen”.', 'اپنے فون پر یہ ویب سائٹ کروم میں کھولیں، ⋮ مینو دبائیں اور “Install app” / “Add to Home screen” منتخب کریں۔')) + '</p>';
      else if (!ios && !deferred) body += '<p class="es-dl-note">' + T('If Android asks, allow “Install from this source” for your browser.', 'اگر اینڈرائیڈ پوچھے تو اپنے براؤزر کے لیے “اس ذریعے سے انسٹال” کی اجازت دیں۔') + '</p>';
      var w = D.createElement('div');
      w.id = 'es-dl'; w.className = 'es-dl ' + (ap.corner === 'right' ? 'r' : 'l') + (open ? ' open' : '');
      w.innerHTML = '<div class="es-dl-panel">' + body + '</div><div class="es-dl-row"><button type="button" class="es-dl-btn" data-es-dl aria-expanded="' + (open ? 'true' : 'false') + '">' + ANDROID + '<span>' + esc(title) + '</span></button><button type="button" class="es-dl-x" data-es-dlx aria-label="Hide">×</button></div>';
      D.body.appendChild(w);
    });
  }

  /* ----- keep the app in step with the admin panel ----- */
  var last = null;
  function banner() {
    if (D.getElementById('es-upd')) return;
    var b = D.createElement('div'); b.id = 'es-upd';
    b.innerHTML = '<span>' + T('The store was updated', 'اسٹور اپ ڈیٹ ہو گیا ہے') + '</span><button type="button">' + T('Refresh', 'ریفریش') + '</button>';
    b.querySelector('button').onclick = function () { location.reload(); };
    D.body.appendChild(b);
  }
  function remember() {
    var s = st(), ap = s.app || {};
    lw('es_app_cfg', { name: s.name || 'EasyStore', tagline: (ES().L && ES().L(s, 'tagline')) || '', logo: squareLogo(), color: ap.splash_color || '', color2: ap.splash_color2 || '', secs: ap.splash_secs || 2.6 });
  }
  function poll(force) {
    if (!ES() || ES().mode !== 'server' || D.hidden) return;
    fetch('api/site', { cache: 'no-store' }).then(function (r) { return r.ok ? r.text() : Promise.reject(); }).then(function (txt) {
      if (last === null) { last = txt; return; }
      if (txt === last) return;
      last = txt;
      try { ES().applySite(JSON.parse(txt)); } catch (e) { return; }
      remember(); paintCorner();
      var watch = ['home', 'shop', 'categories', 'deals', 'search'].indexOf(ES().page()) >= 0;
      var typing = D.activeElement && /INPUT|TEXTAREA|SELECT/.test(D.activeElement.tagName);
      if (!watch) return;
      if (force === true || (window.scrollY < 40 && !typing)) location.reload(); else banner();
    }).catch(function () {});
  }

  /* ----- start ----- */
  D.addEventListener('DOMContentLoaded', function () {
    var go = function () {
      if (!ES()) return;
      remember();
      if (isApp) {
        if (isAuth) paintAuth(); else paintNav();
        setInterval(function () { if (!isAuth) paintNav(); }, 900);
        if (isAuth) {
          D.addEventListener('submit', function () { ss('es_pl', String(Date.now())); }, true);
          if (q.get('social')) ss('es_pl', String(Date.now()));
        }
        if (page === 'my-account.html' && ls('es_user', null) && Date.now() - (+ss('es_pl') || 0) < 20000) { ss('es_pl', '0'); location.replace('index.html'); return; }
      } else paintCorner();
      setTimeout(function () { poll(); }, 1500);
      setInterval(poll, 30000);
    };
    (ES() && ES().ready ? ES().ready : Promise.resolve()).then(go, go);
  });
  D.addEventListener('visibilitychange', function () { if (!D.hidden) poll(true); });
  window.addEventListener('online', function () { poll(true); });
  D.addEventListener('click', function (e) {
    var t = e.target;
    if (t.closest && t.closest('.lang-btn')) setTimeout(function () { if (isApp) { isAuth ? paintAuth() : paintNav(); } else paintCorner(); }, 30);
    var b = t.closest && t.closest('[data-es-dl]');
    if (b) { var w = D.getElementById('es-dl'); w.classList.toggle('open'); b.setAttribute('aria-expanded', w.classList.contains('open')); return; }
    if (t.closest && t.closest('[data-es-dlx]')) { lw('es_dl_hide', Date.now() + 3 * 86400000); var d = D.getElementById('es-dl'); d && d.remove(); return; }
    if (t.closest && t.closest('[data-es-install]') && deferred) { deferred.prompt(); deferred.userChoice.finally(function () { deferred = null; paintCorner(); }); return; }
    var dl = D.getElementById('es-dl');
    if (dl && dl.classList.contains('open') && !(t.closest && t.closest('#es-dl'))) dl.classList.remove('open');
  });
})();
