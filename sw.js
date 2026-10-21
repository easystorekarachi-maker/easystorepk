/* EasyStore service worker – app shell + offline fallback.
   Pages, scripts and /api/site are always fetched from the network first, so every change made in the
   admin panel shows up immediately; the cache is only used when the phone is offline. */
const V = 'easystore-v1', MAX = 160;
const SHELL = ['./', 'index.html', 'offline.html', 'main.css', 'header.css', 'footer.css', 'homepage.css', 'slider.css', 'product-card.css', 'product-details.css', 'category.css', 'cart.css', 'checkout.css', 'responsive.css', 'rtl.css', 'app.css', 'main.js', 'slider.js', 'search.js', 'filters.js', 'product-gallery.js', 'cart.js', 'checkout.js', 'language-switcher.js', 'mobile-menu.js', 'help-widget.js', 'wishlist.js', 'app.js', 'logo.png', 'logo-full.png', 'icon-192.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const trim = c => c.keys().then(ks => { if (ks.length > MAX) return Promise.all(ks.slice(0, ks.length - MAX).map(k => c.delete(k))); });
const put = (r, res) => { if (res && res.ok && res.type === 'basic') { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp).then(() => trim(c))); } return res; };
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin || r.headers.has('range')) return;
  if (u.pathname.startsWith('/api/') && u.pathname !== '/api/site') return;
  if (u.pathname.startsWith('/auth/') || /\/admin\.(html|js|css)$/.test(u.pathname) || /\.apk$/.test(u.pathname) || u.pathname.includes('/downloads/')) return;
  if (r.destination === 'image') {                       /* images: show cached copy fast, refresh in background */
    e.respondWith(caches.match(r).then(m => { const f = fetch(r).then(res => put(r, res)).catch(() => m); return m || f; }));
    return;
  }
  e.respondWith(fetch(r).then(res => put(r, res)).catch(() =>        /* everything else: network first */
    caches.match(r).then(m => m || (r.mode === 'navigate' ? caches.match('offline.html') : Response.error()))));
});
