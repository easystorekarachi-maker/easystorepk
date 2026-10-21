'use strict';
/* EasyStore server – serves the website + admin panel and saves admin changes for ALL visitors.
   No dependencies. Needs Node 18+.  Start:  node server.js   (or: npm start)
   Env: PORT (default 3000), ADMIN_PASSWORD (first start only; default "admin123" – change it in admin.html > Settings). */
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const lib = require('./serverlib'), gs = require('./gitsync');
const ROOT = __dirname, PORT = +process.env.PORT || 3000;
/* STORAGE_DIR = where everything you change is saved permanently (project.json, uploaded pictures, backups, admin password).
   Default: this folder. On a host with a persistent disk (e.g. Render) set STORAGE_DIR to the disk path, e.g. /var/data */
const STORAGE = process.env.STORAGE_DIR ? path.resolve(process.env.STORAGE_DIR) : ROOT;
const DATA_DIR = path.join(ROOT, 'data'), UP_DIR = path.join(STORAGE, 'uploads');
const SITE_FILE = path.join(STORAGE, 'project.json'), AUTH_FILE = path.join(STORAGE, 'auth.json');
fs.mkdirSync(STORAGE, { recursive: true }); fs.mkdirSync(UP_DIR, { recursive: true });

const readJSON = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return d; } };
const writeJSON = (f, o) => { const t = f + '.tmp'; fs.writeFileSync(t, JSON.stringify(o)); fs.renameSync(t, f); };

let site = readJSON(SITE_FILE, null) || readJSON(path.join(ROOT, 'project.json'), null) || readJSON(path.join(DATA_DIR, 'site.json'), null); /* project.json -> shipped project.json -> old data/site.json */
if (!site) { site = readJSON(path.join(DATA_DIR, 'seed.json'), { settings: {}, categories: [], products: [] }); site.orders = []; site.messages = []; (writeJSON(SITE_FILE, site), gs.push('project.json', SITE_FILE)); }
site.orders = site.orders || []; site.messages = site.messages || []; site.customers = site.customers || []; site.secrets = site.secrets || {}; delete site.banners; if (site.settings) delete site.settings.hero;
const save = () => (writeJSON(SITE_FILE, site), gs.push('project.json', SITE_FILE));
/* customers: everyone who registers, logs in (email or social) or orders as a guest */
const PROVIDERS = ['email', 'google', 'facebook', 'linkedin', 'tiktok', 'instagram', 'guest'];
const upsertCustomer = (c, ev) => {
  const em = String(c.email || '').trim().toLowerCase().slice(0, 120); if (!/^\S+@\S+\.\S+$/.test(em)) return;
  const now = new Date().toISOString(), pv = PROVIDERS.includes(c.provider) ? c.provider : 'email';
  let x = site.customers.find(u => u.email === em);
  if (!x) { x = { id: 'c' + Date.now() + crypto.randomInt(100, 999), email: em, name: '', phone: '', provider: pv, registered: now, logins: 0 }; site.customers.unshift(x); if (site.customers.length > 20000) site.customers.length = 20000; }
  const nm = str(c.name, 120), ph = str(c.phone, 40);
  if (nm && (!x.name || ev === 'register' || c.verified)) x.name = nm;
  if (ph && (!x.phone || ev === 'register')) x.phone = ph;
  if (c.verified) { x.verified = true; if (x.provider === 'guest' || x.provider === 'email') x.provider = pv; }
  else if (x.provider === 'guest' && pv === 'email') x.provider = 'email';
  if (ev === 'login' || ev === 'register') { x.logins = (x.logins || 0) + 1; x.last_login = now; }
  if (ev === 'order') x.last_order = now;
};
const BK_DIR = path.join(STORAGE, 'backups'); fs.mkdirSync(BK_DIR, { recursive: true });
if (STORAGE !== ROOT) { try { const sb = path.join(ROOT, 'backups', 'starter-backup.json'); if (fs.existsSync(sb) && !fs.existsSync(path.join(BK_DIR, 'starter-backup.json'))) fs.copyFileSync(sb, path.join(BK_DIR, 'starter-backup.json')); } catch (e) {} }
const buildBackup = () => {
  const files = {};
  for (const f of fs.readdirSync(UP_DIR)) { if (!/^[\w.-]+\.(png|jpg|jpeg|webp|gif)$/i.test(f)) continue; const ext = f.split('.').pop().toLowerCase(); files[f] = 'data:image/' + (ext === 'jpg' ? 'jpeg' : ext) + ';base64,' + fs.readFileSync(path.join(UP_DIR, f)).toString('base64'); }
  return JSON.stringify({ app: 'easystore-backup', version: 2, created: new Date().toISOString(), site, files });
};
const restoreFrom = b => {
  const s = b && b.site;
  if (!s || typeof s.settings !== 'object' || !Array.isArray(s.categories) || !Array.isArray(s.products)) throw new Error('Not an EasyStore backup');
  if (s.products.some(x => !x || typeof x.id !== 'number' || typeof x.name !== 'string')) throw new Error('Invalid product in backup');
  try { fs.writeFileSync(path.join(BK_DIR, 'before-restore-' + Date.now() + '.json'), buildBackup()); } catch (e) {}
  let nf = 0;
  for (const [f, d] of Object.entries(b.files && typeof b.files === 'object' ? b.files : {})) {
    const r = /^data:image\/(png|jpeg|webp|gif);base64,([A-Za-z0-9+/=]+)$/.exec(String(d || ''));
    if (r && /^[\w.-]+\.(png|jpg|jpeg|webp|gif)$/i.test(f)) { { fs.writeFileSync(path.join(UP_DIR, f), Buffer.from(r[2], 'base64')); gs.push('uploads/' + f, path.join(UP_DIR, f)); } nf++; }
  }
  site.settings = s.settings; site.categories = s.categories; site.products = s.products;
  if (Array.isArray(s.orders)) site.orders = s.orders; if (Array.isArray(s.messages)) site.messages = s.messages; if (Array.isArray(s.customers)) site.customers = s.customers;
  if (s.secrets && typeof s.secrets === 'object') site.secrets = s.secrets;
  save(); return { products: site.products.length, images: nf };
};
const autoBackup = () => { try {
  const f = path.join(BK_DIR, 'auto-' + new Date().toISOString().slice(0, 10) + '.json');
  if (!fs.existsSync(f)) fs.writeFileSync(f, buildBackup());
  const l = fs.readdirSync(BK_DIR).filter(x => /^auto-\d{4}-\d\d-\d\d\.json$/.test(x)).sort(); while (l.length > 14) fs.unlinkSync(path.join(BK_DIR, l.shift()));
} catch (e) {} };
const BKNAME = /^[\w.-]+\.json$/;
const cRate = new Map();
const shipCost = lines => {
  const sh = (site.settings && site.settings.shipping) || {}; let fixed = 0, rest = 0, any = false;
  for (const l of lines) { const pr = site.products.find(x => x.id === l.id), d = pr && pr.delivery; if (d != null && d !== '' && !isNaN(+d) && +d >= 0) fixed += Math.round(+d); else { any = true; rest += l.price * l.n; } }
  return fixed + (any ? (rest >= (sh.freeOver != null ? sh.freeOver : 5000) ? 0 : (sh.fee != null ? sh.fee : 250)) : 0);
};

const hash = (pw, salt) => crypto.scryptSync(pw, salt, 32).toString('hex');
let auth = readJSON(AUTH_FILE, null);
if (!auth) { const salt = crypto.randomBytes(16).toString('hex'); auth = { salt, hash: hash(process.env.ADMIN_PASSWORD || 'admin123', salt), isDefault: !process.env.ADMIN_PASSWORD }; writeJSON(AUTH_FILE, auth); gs.push('auth.json', AUTH_FILE); }
const tokens = new Map(), attempts = new Map();
const authed = req => { const t = (req.headers.authorization || '').replace(/^Bearer /, ''); const e = tokens.get(t); if (!e || e < Date.now()) { tokens.delete(t); return false; } return true; };

const send = (res, code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); res.end(JSON.stringify(obj)); };
const readBody = (req, max) => new Promise((resolve, reject) => {
  let n = 0; const c = [];
  req.on('data', d => { n += d.length; if (n > max) { reject(new Error('Request too large')); req.destroy(); } else c.push(d); });
  req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(c).toString() || '{}')); } catch (e) { reject(new Error('Bad JSON')); } });
  req.on('error', reject);
});
const str = (v, n) => String(v == null ? '' : v).trim().slice(0, n);
const publicSite = () => ({ settings: site.settings, categories: site.categories, products: site.products.filter(p => p.active !== false) });

async function api(req, res, u) {
  const m = req.method, p = u.pathname;
  try {
    if (m === 'GET' && p === '/api/ping') return send(res, 200, { ok: true });
    if (m === 'GET' && p === '/api/site') return send(res, 200, publicSite());

    if (m === 'POST' && p === '/api/orders') {
      const b = await readBody(req, 200e3);
      const pl = lib.enabledPays(site.settings);
      const o = { name: str(b.name, 120), phone: str(b.phone, 40), email: str(b.email, 120).toLowerCase(), city: str(b.city, 80), address: str(b.address, 300), note: str(b.note, 500), pay: pl.some(x => x.id === b.pay) ? b.pay : pl[0].id, txn: str(b.txn, 80), wallet: str(b.wallet, 20).replace(/[^0-9+]/g, '') };
      o.payname = (pl.find(x => x.id === o.pay) || {}).name || o.pay;
      if (!o.name || !o.city || !o.address || !/^[0-9+\-\s]{9,}$/.test(o.phone) || !/^\S+@\S+\.\S+$/.test(o.email)) return send(res, 400, { error: 'Please check your details.' });
      const items = []; let sub = 0;
      for (const it of (Array.isArray(b.items) ? b.items : []).slice(0, 50)) {
        const pr = site.products.find(x => x.id === +it.id && x.active !== false), n = Math.floor(+it.n);
        if (!pr || !(n > 0)) continue;
        const szl = Array.isArray(pr.sizes) ? pr.sizes.filter(z => z && z.name) : []; let size = '';
        if (szl.length) {
          const se = szl.find(z => z.name === String(it.size));
          if (!se) return send(res, 400, { error: 'Please choose a size for ' + pr.name });
          if (n > (+se.stock || 0)) return send(res, 409, { error: 'Only ' + (+se.stock || 0) + ' left of ' + pr.name + ' in size ' + se.name });
          size = se.name;
        } else if (n > pr.stock) return send(res, 409, { error: 'Only ' + pr.stock + ' left of ' + pr.name });
        const cll = Array.isArray(pr.colors) ? pr.colors.filter(z => z && z.name) : []; let color = '';
        if (cll.length) { const ce = cll.find(z => z.name === String(it.color)); if (!ce) return send(res, 400, { error: 'Please choose a color for ' + pr.name }); color = ce.name; }
        items.push({ id: pr.id, name: pr.name, size, color, n, price: pr.price }); sub += pr.price * n;
      }
      if (!items.length) return send(res, 400, { error: 'Your cart is empty.' });
      const ship = shipCost(items);
      const id = 'ES-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + crypto.randomInt(1000, 9999), total = sub + ship;
      const pm = pl.find(x => x.id === o.pay), mode = pm.mode || 'manual';
      let pay = { paystate: 'unpaid' }, redirect = '';
      if (o.pay === 'easypaisa' || o.pay === 'jazzcash') {
        if (mode === 'manual') pay.paystate = o.txn ? 'awaiting' : 'unpaid';
        else {
          if (!/^03\d{9}$/.test(o.wallet)) return send(res, 400, { error: 'Enter your ' + pm.name + ' mobile number like 03001234567.' });
          if (mode === 'live') {
            const cnic6 = str(b.cnic6, 6);
            if (o.pay === 'jazzcash' && !/^\d{6}$/.test(cnic6)) return send(res, 400, { error: 'Enter the last 6 digits of your CNIC.' });
            const r = await lib.chargeWallet(o.pay, site.secrets, { orderId: id, amount: total, phone: o.wallet, cnic6, email: o.email, desc: 'EasyStore order ' + id });
            if (!r.ok) return send(res, 402, { error: r.message });
            pay = { paystate: r.pending ? 'pending' : 'paid', gatewayRef: r.ref };
          } else pay = { paystate: 'pending', demoAt: Date.now() + 8000 };
        }
      } else if (o.pay === 'card') {
        if (mode === 'link') {
          pay.paystate = 'pending';
          redirect = String(pm.link || '').replace(/\{order\}/g, encodeURIComponent(id)).replace(/\{amount\}/g, String(total)).replace(/\{email\}/g, encodeURIComponent(o.email));
          if (!/^https:\/\//i.test(redirect)) return send(res, 400, { error: 'Card payment is not available right now. Please choose another method.' });
        } else {
          const cd = b.card || {};
          if (!/^\d{4}$/.test(String(cd.last4 || ''))) return send(res, 400, { error: 'Please check your card details.' });
          pay = { paystate: 'paid', txn: 'DEMO •••• ' + cd.last4, cardBrand: str(cd.brand, 12) };
        }
      }
      items.forEach(i => { const pr = site.products.find(x => x.id === i.id); pr.stock = Math.max(0, pr.stock - i.n); const se = (pr.sizes || []).find(z => z.name === i.size); if (se) se.stock = Math.max(0, (+se.stock || 0) - i.n); });
      const ptoken = crypto.randomBytes(12).toString('hex');
      const order = Object.assign({ id, date: new Date().toLocaleDateString('en-GB') }, o, pay, { status: 'pending', items, shipping: ship, total, ptoken, created: new Date().toISOString() });
      site.orders.unshift(order); upsertCustomer({ name: o.name, email: o.email, phone: o.phone, provider: 'guest' }, 'order'); save();
      return send(res, 200, { id, total, items, payname: order.payname, payment: { state: redirect ? 'redirect' : order.paystate, redirect, ptoken, mode } });
    }
    if (m === 'GET' && p === '/api/auth/providers') return send(res, 200, { providers: Object.keys(lib.SOCIAL).filter(k => lib.socialReady(site, k)).map(k => ({ id: k, label: lib.SOCIAL[k].label })) });
    if (m === 'GET' && p === '/api/auth/claim') {
      const c = u.searchParams.get('code'), v = claims.get(c); claims.delete(c);
      if (!v || v.exp < Date.now()) return send(res, 404, { error: 'Expired' });
      return send(res, 200, { provider: v.provider, id: v.id, name: v.name, email: v.email });
    }
    if (m === 'GET' && p === '/api/orders/track') {
      const id = String(u.searchParams.get('id') || '').toUpperCase(), em = String(u.searchParams.get('email') || '').trim().toLowerCase();
      const o = site.orders.find(x => x.id === id && x.email === em);
      if (!o) return send(res, 404, { error: 'Not found' });
      return send(res, 200, { id: o.id, status: o.status, pay: o.pay, paystate: o.paystate || 'unpaid', total: o.total, items: (o.items || []).reduce((a, i) => a + i.n, 0) });
    }
    if (m === 'POST' && p === '/api/assistant') {
      const b = await readBody(req, 20e3);
      const r = await lib.assistantReply(site, b.messages, b.lang === 'ur' ? 'ur' : 'en', req.socket.remoteAddress || 'x');
      return send(res, 200, r || { reply: null });
    }
    if (m === 'GET' && p === '/api/orders/pay-status') {
      const o = site.orders.find(x => x.id === u.searchParams.get('id'));
      const t = String(u.searchParams.get('t') || '');
      if (!o || !o.ptoken || t.length !== o.ptoken.length || !crypto.timingSafeEqual(Buffer.from(t), Buffer.from(o.ptoken))) return send(res, 404, { error: 'Not found' });
      if (o.paystate === 'pending' && o.demoAt && Date.now() >= o.demoAt) { o.paystate = 'paid'; o.txn = o.txn || 'DEMO-' + o.id; delete o.demoAt; save(); }
      return send(res, 200, { paystate: o.paystate });
    }
    if (m === 'POST' && p === '/api/messages') {
      const b = await readBody(req, 20e3);
      const msg = { id: 'm' + Date.now() + crypto.randomInt(100, 999), name: str(b.name, 120), email: str(b.email, 120), message: str(b.message, 4000), date: new Date().toISOString(), state: 'new' };
      if (!msg.name || !msg.email || !msg.message) return send(res, 400, { error: 'Missing fields' });
      site.messages.unshift(msg); if (site.messages.length > 2000) site.messages.length = 2000; save();
      return send(res, 200, { ok: true });
    }
    if (m === 'POST' && p === '/api/customers/event') {
      const ip = req.socket.remoteAddress || 'x', a = cRate.get(ip) || { n: 0, t: Date.now() };
      if (Date.now() - a.t > 6e5) { a.n = 0; a.t = Date.now(); } a.n++; cRate.set(ip, a);
      if (a.n > 40) return send(res, 429, { error: 'Too many requests' });
      const b = await readBody(req, 4e3);
      if (!['register', 'login'].includes(b.event)) return send(res, 400, { error: 'Invalid' });
      upsertCustomer({ name: b.name, email: b.email, phone: b.phone, provider: 'email' }, b.event); save();
      return send(res, 200, { ok: true });
    }
    if (m === 'POST' && p === '/api/login') {
      const ip = req.socket.remoteAddress || 'x', a = attempts.get(ip) || { n: 0, t: Date.now() };
      if (Date.now() - a.t > 6e5) { a.n = 0; a.t = Date.now(); }
      if (a.n >= 8) return send(res, 429, { error: 'Too many attempts. Try again in 10 minutes.' });
      const b = await readBody(req, 2e3);
      const ok = crypto.timingSafeEqual(Buffer.from(hash(String(b.password || ''), auth.salt), 'hex'), Buffer.from(auth.hash, 'hex'));
      if (!ok) { a.n++; attempts.set(ip, a); return send(res, 401, { error: 'Wrong password' }); }
      attempts.delete(ip); const t = crypto.randomBytes(24).toString('hex'); tokens.set(t, Date.now() + 12 * 3600e3);
      return send(res, 200, { token: t, isDefault: auth.isDefault });
    }

    if (!authed(req)) return send(res, 401, { error: 'Unauthorized' });
    if (m === 'GET' && p === '/api/admin/site') return send(res, 200, Object.assign({}, site, { isDefaultPassword: auth.isDefault }));
    if (m === 'PUT' && p === '/api/admin/site') {
      const b = await readBody(req, 12e6);
      if (!b.settings || typeof b.settings !== 'object' || !Array.isArray(b.categories) || !Array.isArray(b.products)) return send(res, 400, { error: 'Invalid data' });
      if (b.products.length > 5000 || b.categories.length > 200) return send(res, 400, { error: 'Too many items' });
      if (b.products.some(x => !x || typeof x.id !== 'number' || typeof x.name !== 'string')) return send(res, 400, { error: 'Invalid product' });
      site.settings = b.settings; site.categories = b.categories; site.products = b.products;
      if (b.secrets && typeof b.secrets === 'object') site.secrets = b.secrets;
      save();
      return send(res, 200, { ok: true });
    }
    let mt;
    if ((mt = p.match(/^\/api\/admin\/(orders|messages|customers)\/([\w-]+)$/))) {
      const list = site[mt[1]], i = list.findIndex(x => x.id === mt[2]);
      if (i < 0) return send(res, 404, { error: 'Not found' });
      if (m === 'DELETE') { list.splice(i, 1); save(); return send(res, 200, { ok: true }); }
      if (m === 'PATCH') {
        if (mt[1] === 'customers') return send(res, 405, { error: 'Not allowed' });
        const b = await readBody(req, 2e3);
        if (mt[1] === 'orders' && b.paystate !== undefined) { if (!['unpaid', 'awaiting', 'pending', 'paid', 'failed'].includes(b.paystate)) return send(res, 400, { error: 'Invalid value' }); list[i].paystate = b.paystate; save(); return send(res, 200, { ok: true }); }
        const ok = mt[1] === 'orders' ? ['pending', 'shipped', 'delivered', 'cancelled'] : ['new', 'done'];
        const k = mt[1] === 'orders' ? 'status' : 'state';
        if (!ok.includes(b[k])) return send(res, 400, { error: 'Invalid value' });
        list[i][k] = b[k]; save(); return send(res, 200, { ok: true });
      }
    }
    if (m === 'GET' && p === '/api/admin/backup') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Disposition': 'attachment; filename="easystore-full-backup-' + new Date().toISOString().slice(0, 10) + '.json"', 'Cache-Control': 'no-store' });
      return res.end(buildBackup());
    }
    if (m === 'POST' && p === '/api/admin/restore') {
      const b = await readBody(req, 200e6);
      try { return send(res, 200, Object.assign({ ok: true }, restoreFrom(b))); } catch (e) { return send(res, 400, { error: e.message }); }
    }
    if (m === 'GET' && p === '/api/admin/backups') {
      const files = fs.readdirSync(BK_DIR).filter(x => BKNAME.test(x)).map(x => { const s = fs.statSync(path.join(BK_DIR, x)); return { name: x, size: s.size, time: s.mtime.toISOString() }; }).sort((a, b) => b.time.localeCompare(a.time));
      return send(res, 200, { files });
    }
    if (m === 'POST' && p === '/api/admin/backups') {
      const name = 'backup-' + new Date(Date.now() + 5 * 3600e3).toISOString().slice(0, 16).replace(/[:T]/g, '-') + '.json';
      fs.writeFileSync(path.join(BK_DIR, name), buildBackup()); return send(res, 200, { ok: true, name });
    }
    if (m === 'GET' && p === '/api/admin/backups/file') {
      const n = String(u.searchParams.get('name') || ''), f = path.join(BK_DIR, n);
      if (!BKNAME.test(n) || !fs.existsSync(f)) return send(res, 404, { error: 'Not found' });
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Disposition': 'attachment; filename="' + n + '"', 'Cache-Control': 'no-store' });
      return res.end(fs.readFileSync(f));
    }
    if (m === 'POST' && (p === '/api/admin/backups/restore' || p === '/api/admin/backups/delete')) {
      const b = await readBody(req, 2e3), n = String(b.name || ''), f = path.join(BK_DIR, n);
      if (!BKNAME.test(n) || !fs.existsSync(f)) return send(res, 404, { error: 'Backup file not found' });
      if (p.endsWith('/delete')) { fs.unlinkSync(f); return send(res, 200, { ok: true }); }
      let j; try { j = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return send(res, 400, { error: 'This file is not a valid backup' }); }
      try { return send(res, 200, Object.assign({ ok: true }, restoreFrom(j))); } catch (e) { return send(res, 400, { error: e.message }); }
    }
    if (m === 'PUT' && p === '/api/admin/apk') {   /* Android app (.apk) uploaded from admin > Mobile App */
      const dir = path.join(ROOT, 'downloads'); fs.mkdirSync(dir, { recursive: true });
      const tmp = path.join(dir, 'easystore.apk.tmp'); let n = 0;
      await new Promise((ok, bad) => {
        const ws = fs.createWriteStream(tmp);
        req.on('data', d => { n += d.length; if (n > 300e6) { bad(new Error('File too large (max 300 MB)')); req.destroy(); } });
        req.on('error', bad); ws.on('error', bad); ws.on('finish', ok); req.pipe(ws);
      }).catch(e => { try { fs.unlinkSync(tmp); } catch (x) {} throw e; });
      const fd = fs.openSync(tmp, 'r'), hd = Buffer.alloc(2); fs.readSync(fd, hd, 0, 2, 0); fs.closeSync(fd);
      if (hd[0] !== 0x50 || hd[1] !== 0x4b) { fs.unlinkSync(tmp); return send(res, 400, { error: 'This is not an APK file' }); }
      fs.renameSync(tmp, path.join(dir, 'easystore.apk'));
      return send(res, 200, { ok: true, size: n });
    }
    if (m === 'POST' && p === '/api/admin/upload') {
      const b = await readBody(req, 40e6), r = /^data:image\/(png|jpeg|webp|gif);base64,([A-Za-z0-9+/=]+)$/.exec(String(b.data || ''));
      if (!r) return send(res, 400, { error: 'Only PNG, JPG, WEBP or GIF images' });
      const buf = Buffer.from(r[2], 'base64'); if (buf.length > 20e6) return send(res, 413, { error: 'Image too large (max 20 MB)' });
      const f = Date.now() + '-' + crypto.randomBytes(4).toString('hex') + '.' + (r[1] === 'jpeg' ? 'jpg' : r[1]);
      fs.writeFileSync(path.join(UP_DIR, f), buf); gs.push('uploads/' + f, path.join(UP_DIR, f)); return send(res, 200, { url: 'uploads/' + f });
    }
    if (m === 'POST' && p === '/api/admin/password') {
      const b = await readBody(req, 2e3), pw = String(b.password || '');
      if (pw.length < 8) return send(res, 400, { error: 'Use at least 8 characters' });
      const salt = crypto.randomBytes(16).toString('hex'); auth = { salt, hash: hash(pw, salt), isDefault: false }; writeJSON(AUTH_FILE, auth); gs.push('auth.json', AUTH_FILE);
      return send(res, 200, { ok: true });
    }
    return send(res, 404, { error: 'Not found' });
  } catch (e) { return send(res, 400, { error: e.message || 'Bad request' }); }
}

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.apk': 'application/vnd.android.package-archive', '.webmanifest': 'application/manifest+json' };
const BLOCK = /^\/(data|backups|node_modules|tests|controllers|models|views|security|i18n|static)(\/|$)|(^|\/)\.|\/(server\.js|serverlib\.js|gitsync\.js|project\.json|auth\.json|package(-lock)?\.json)$/;
function serve(req, res, u) {
  let p; try { p = decodeURIComponent(u.pathname); } catch (e) { p = '/404.html'; }
  if (p === '/') p = '/index.html';
  if (p === '/.well-known/assetlinks.json') p = '/assetlinks.json'; /* Android app (Play Store / TWA) link verification */
  const base = (STORAGE !== ROOT && p.startsWith('/uploads/')) ? STORAGE : ROOT, f = path.join(base, path.normalize(p)), ext = path.extname(f).toLowerCase();
  const notFound = () => { res.writeHead(404, { 'Content-Type': MIME['.html'] }); fs.createReadStream(path.join(ROOT, '404.html')).pipe(res); };
  if (!f.startsWith(base + path.sep) || BLOCK.test(p) || !MIME[ext]) return notFound();
  fs.stat(f, (err, st) => {
    if (err || !st.isFile()) return notFound();
    const img = /^\.(png|jpe?g|gif|webp|svg|ico)$/.test(ext);
    res.writeHead(200, { 'Content-Type': MIME[ext], 'Content-Length': st.size, 'Cache-Control': img ? 'public, max-age=86400' : 'no-cache', ...(ext === '.apk' ? { 'Content-Disposition': 'attachment; filename="easystore.apk"' } : {}), 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'SAMEORIGIN', 'Referrer-Policy': 'same-origin' });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(f).pipe(res);
  });
}

const oauthStates = new Map(), claims = new Map();
const baseUrl = req => String((site.secrets && site.secrets.publicUrl) || '').replace(/\/+$/, '') || ((req.headers['x-forwarded-proto'] || 'http').split(',')[0] + '://' + req.headers.host);
async function authRoute(req, res, u) {
  const m = u.pathname.match(/^\/auth\/(google|facebook|linkedin|tiktok)\/(start|callback)$/);
  const back = q => { res.writeHead(302, { Location: '/customer-login.html?' + q }); res.end(); };
  if (!m || req.method !== 'GET') { res.writeHead(404); return res.end(); }
  const prov = m[1], cfg = (site.secrets.social || {})[prov] || {}, ru = baseUrl(req) + '/auth/' + prov + '/callback', P = lib.SOCIAL[prov];
  if (!lib.socialReady(site, prov)) return back('social_error=1');
  if (m[2] === 'start') {
    const st = crypto.randomBytes(16).toString('hex'); oauthStates.set(st, { prov, exp: Date.now() + 10 * 60e3 });
    res.writeHead(302, { Location: P.auth + '?' + new URLSearchParams(P.q(cfg, ru, st)).toString() }); return res.end();
  }
  const st = oauthStates.get(u.searchParams.get('state')); oauthStates.delete(u.searchParams.get('state'));
  const code = u.searchParams.get('code');
  if (!st || st.prov !== prov || st.exp < Date.now() || !code) return back('social_error=1');
  try {
    const pr = await P.exchange(cfg, ru, code);
    if (!pr || !pr.id) throw new Error('profile');
    const email = String(pr.email || '').toLowerCase() || (prov + '-' + pr.id + '@social.local');
    upsertCustomer({ name: pr.name, email, provider: prov, verified: true }, 'login'); save();
    const c = crypto.randomBytes(16).toString('hex'); claims.set(c, { provider: prov, id: String(pr.id), name: str(pr.name, 120) || P.label + ' user', email, exp: Date.now() + 2 * 60e3 });
    return back('social=' + c);
  } catch (e) { return back('social_error=1'); }
}
http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  for (const [k, v] of oauthStates) if (v.exp < Date.now()) oauthStates.delete(k);
  for (const [k, v] of claims) if (v.exp < Date.now()) claims.delete(k);
  if (u.pathname.startsWith('/auth/')) return authRoute(req, res, u);
  if (u.pathname.startsWith('/api/')) return api(req, res, u);
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
  serve(req, res, u);
}).listen(PORT, () => {
  autoBackup(); setInterval(autoBackup, 6 * 3600e3).unref();
  console.log('EasyStore running:\n  Website: http://localhost:' + PORT + '/index.html\n  Admin:   http://localhost:' + PORT + '/admin.html');
  if (auth.isDefault) console.log('  WARNING: default admin password "admin123" is active. Change it in Admin > Settings.');
});
