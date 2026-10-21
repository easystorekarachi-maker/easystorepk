/* EasyStore – WhatsApp button, Help center page and the help assistant */
(() => {
  const S = window.ES; if (!S) return;
  const T = (en, ur) => (S.lang() === 'ur' ? ur : en);
  const H = () => S.D.settings.help || {};
  const ship = () => S.D.settings.shipping || {};
  const sub = s => String(s || '').replace(/\{fee\}/g, S.fmt(ship().fee != null ? ship().fee : 250)).replace(/\{free\}/g, S.fmt(ship().freeOver != null ? ship().freeOver : 5000));
  const faqs = () => (H().faqs || []).filter(f => f && f.q && f.a);
  const contact = () => {
    const c = S.D.settings.contact || {}, w = H().whatsapp || {};
    let n = String(w.number || c.whatsapp || c.phone || '').replace(/\D/g, '');
    if (n.startsWith('00')) n = n.slice(2); else if (n.startsWith('0')) n = '92' + n.slice(1);
    return { wa: n, phone: c.phone || '', email: c.email || '' };
  };
  const esc = S.esc;
  const waLink = extra => {
    const w = H().whatsapp || {}, c = contact(); if (!c.wa) return '';
    let txt = S.L(w, 'message') || T('Hello! I need help with my order.', 'السلام علیکم! مجھے مدد چاہیے۔');
    if (extra) txt += ' ' + extra;
    return 'https://wa.me/' + c.wa + '?text=' + encodeURIComponent(txt);
  };
  const WA_SVG = '<svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"><path fill="#fff" d="M16 3C9 3 3.300 8.600 3.300 15.500c0 2.400.7 4.700 1.900 6.600L3 29l7.100-2.100a12.800 12.800 0 0 0 5.900 1.400c7 0 12.700-5.600 12.700-12.500S23 3 16 3zm0 23c-1.900 0-3.700-.5-5.300-1.500l-.4-.2-4.200 1.200 1.200-4-.3-.4a10.200 10.200 0 0 1-1.600-5.500C5.400 9.900 10.200 5.300 16 5.300s10.600 4.600 10.600 10.200S21.800 26 16 26zm5.800-7.600c-.3-.2-1.900-.9-2.200-1s-.5-.2-.7.200-.8 1-1 1.200-.4.200-.7.100a8.400 8.400 0 0 1-4.100-3.600c-.3-.5.300-.5.900-1.600.1-.2 0-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.100-.9.400s-1.200 1.200-1.200 2.800 1.200 3.300 1.400 3.500c.2.200 2.400 3.700 5.800 5.100 2.100.9 2.900.9 4 .8.600-.1 1.900-.8 2.200-1.600.3-.8.300-1.400.2-1.600l-.6-.3z"/></svg>';
  const BOT_SVG = '<svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path fill="#fff" d="M16 4C9.400 4 4 8.700 4 14.500c0 2.800 1.300 5.400 3.400 7.300L6.500 28l5.200-2.600c1.400.4 2.800.6 4.300.6 6.600 0 12-4.700 12-10.500S22.600 4 16 4z"/><circle cx="11" cy="14.500" r="1.800" fill="#0b5d2a"/><circle cx="16" cy="14.500" r="1.800" fill="#0b5d2a"/><circle cx="21" cy="14.500" r="1.800" fill="#0b5d2a"/></svg>';

  /* ---------- local answers (work without any AI key) ---------- */
  const tok = s => String(s || '').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(w => w.length > 2);
  const STOP = new Set(['the', 'and', 'for', 'you', 'are', 'how', 'can', 'what', 'does', 'will', 'with', 'this', 'that', 'have', 'from', 'your', 'about', 'please', 'want', 'need', 'kya', 'hai', 'mein', 'aur', 'ker', 'kar', 'ka', 'ki', 'ko']);
  function bestFaq(q) {
    const qt = tok(q).filter(w => !STOP.has(w)); if (!qt.length) return null;
    let best = null, bs = 0;
    faqs().forEach(f => { const ft = new Set(tok(f.q + ' ' + f.q_ur + ' ' + f.a + ' ' + (f.keywords || '')).filter(w => !STOP.has(w))); const qs = new Set(tok(f.q + ' ' + f.q_ur));
      let s = 0; qt.forEach(w => { if (ft.has(w)) s += 1; if (qs.has(w)) s += 1.500; else [...ft].some(x => x.length > 4 && w.length > 4 && (x.startsWith(w) || w.startsWith(x))) && (s += .5); });
      if (s > bs) { bs = s; best = f; } });
    return bs >= 1.500 ? { f: best, s: bs } : null;
  }
  function findProducts(q) {
    const qt = tok(q).filter(w => !STOP.has(w)); if (!qt.length) return [];
    return S.D.products.map(p => { const hay = tok(p.name + ' ' + (p.name_ur || '') + ' ' + (p.brand || '') + ' ' + ((S.D.categories.find(c => c.slug === p.cat) || {}).name || '')); let s = 0; qt.forEach(w => { if (hay.some(h => h === w || (w.length > 3 && (h.startsWith(w) || w.startsWith(h))))) s++; }); return { p, s }; }).filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 3).map(x => x.p);
  }
  async function localAnswer(text) {
    const t = text.trim(), lower = t.toLowerCase(), c = contact();
    const oid = (t.match(/ES-\d{6}-\d{4}/i) || [])[0], em = (t.match(/[^\s@]+@[^\s@]+\.[^\s@]+/) || [])[0];
    if (oid) {
      if (!em) return { text: T('To check order ' + oid.toUpperCase() + ', please also type the email address you used when ordering.', 'آرڈر ' + oid.toUpperCase() + ' چیک کرنے کے لیے وہ ای میل بھی لکھیں جو آرڈر کے وقت دی تھی۔') };
      const r = await track(oid, em); return { text: r };
    }
    if (/^(hi|hello|hey|salam|assalam|aoa|السلام)/i.test(lower) && t.length < 25) return { text: T('Hello! 👋 How can I help you today? You can ask about delivery, payments, returns, sizes or a product.', 'السلام علیکم! 👋 میں آپ کی کیا مدد کر سکتا ہوں؟ ڈیلیوری، ادائیگی، واپسی، سائز یا کسی پروڈکٹ کے بارے میں پوچھیں۔') };
    if (/thank|shukri|shukria|شکریہ/i.test(lower)) return { text: T('You are welcome! Anything else I can help with?', 'خوش آمدید! کیا کوئی اور مدد چاہیے؟') };
    if (/\b(order|track|where is my|status)\b|ٹریک|آرڈر/i.test(lower) && !oid) return { text: T('Please send your order number (like ES-261019-1234) and the email you used, in one message, and I will check the status.', 'براہ کرم اپنا آرڈر نمبر (جیسے ES-261019-1234) اور ای میل ایک ہی پیغام میں لکھیں، میں اسٹیٹس چیک کر دوں گا۔') };
    const bf = bestFaq(t), ps = findProducts(t);
    if (bf && !(ps.length && bf.s < 3)) return { text: sub(S.L(bf.f, 'a')) };
    if (ps.length) return { text: T('Here is what I found in our store:', 'ہمارے اسٹور میں یہ ملا:'), links: ps.map(p => ({ label: S.pname(p) + ' – ' + S.fmt(p.price), url: 'product-details.html?id=' + p.id })) };
    const links = []; const wl = waLink(); if (wl) links.push({ label: T('Chat on WhatsApp', 'واٹس ایپ پر بات کریں'), url: wl, ext: 1 }); if (c.phone) links.push({ label: T('Call ', 'کال کریں ') + c.phone, url: 'tel:' + c.phone.replace(/[^\d+]/g, ''), ext: 1 }); links.push({ label: T('Help center', 'ہیلپ سینٹر'), url: 'help.html' });
    return { text: T('I could not find an exact answer for that. Our team will be glad to help:', 'مجھے اس کا صحیح جواب نہیں ملا۔ ہماری ٹیم آپ کی مدد کرے گی:'), links };
  }
  async function track(id, email) {
    if (S.mode !== 'server') return T('Order tracking needs the live store server.', 'آرڈر ٹریکنگ کے لیے لائیو اسٹور سرور ضروری ہے۔');
    try { const r = await fetch('api/orders/track?id=' + encodeURIComponent(id) + '&email=' + encodeURIComponent(email)); if (!r.ok) return T('I could not find an order with that number and email. Please check both and try again.', 'اس نمبر اور ای میل کے ساتھ کوئی آرڈر نہیں ملا۔ دونوں چیک کر کے دوبارہ کوشش کریں۔');
      const j = await r.json(); const st = { pending: T('being prepared', 'تیار ہو رہا ہے'), shipped: T('on its way to you', 'آپ کی طرف روانہ ہے'), delivered: T('delivered', 'ڈیلیور ہو چکا ہے'), cancelled: T('cancelled', 'منسوخ ہو چکا ہے') }[j.status] || j.status;
      const ps = j.pay && j.pay !== 'cod' ? ({ paid: T('Payment received.', 'ادائیگی موصول ہو گئی۔'), awaiting: T('We are verifying your payment.', 'ہم آپ کی ادائیگی کی تصدیق کر رہے ہیں۔'), pending: T('Waiting for your payment.', 'آپ کی ادائیگی کا انتظار ہے۔'), unpaid: T('Payment not received yet.', 'ادائیگی ابھی موصول نہیں ہوئی۔'), failed: T('Payment failed.', 'ادائیگی ناکام ہوئی۔') }[j.paystate] || '') : '';
      return T('Order ' + j.id + ' (' + j.items + ' item(s), ' + S.fmt(j.total) + ') is ' + st + '. ' + ps, 'آرڈر ' + j.id + ' (' + j.items + ' آئٹم، ' + S.fmt(j.total) + ') ' + st + '۔ ' + ps);
    } catch (e) { return T('Sorry, I could not check that right now.', 'معذرت، ابھی چیک نہیں ہو سکا۔'); }
  }
  async function ask(history) {
    const last = history[history.length - 1].content;
    if (S.mode === 'server') {
      try { const r = await fetch('api/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history.slice(-10), lang: S.lang() }) });
        if (r.ok) { const j = await r.json(); if (j.reply) return { text: j.reply, links: j.links }; } } catch (e) {}
    }
    return localAnswer(last);
  }

  /* ---------- floating buttons + chat ---------- */
  let history = [];
  function mount() {
    ['hw-wa', 'hw-bot', 'hw-panel'].forEach(id => { const e = document.getElementById(id); if (e) e.remove(); });
    if (S.page() === 'admin') return;
    const h = H(), c = contact(), wl = waLink(), name = h.assistant && h.assistant.name || 'EasyStore Assistant';
    const bot = !h.assistant || h.assistant.enabled !== false;
    const wOn = !h.whatsapp || h.whatsapp.enabled !== false;
    let html = '';
    if (wOn && c.wa) html += `<a id="hw-wa" class="hw-fab hw-wa" href="${esc(wl)}" target="_blank" rel="noopener" aria-label="${T('Chat on WhatsApp', 'واٹس ایپ پر بات کریں')}">${WA_SVG}</a>`;
    if (bot) html += `<button id="hw-bot" class="hw-fab hw-bot" type="button" aria-label="${esc(name)}" aria-expanded="false">${BOT_SVG}</button>
<section id="hw-panel" class="hw-panel" role="dialog" aria-label="${esc(name)}" hidden><header><div><b>${esc(name)}</b><small>${T('Ask me anything about the store', 'اسٹور کے بارے میں کچھ بھی پوچھیں')}</small></div><button type="button" class="hw-x" aria-label="Close">×</button></header><div id="hw-msgs" class="hw-msgs" aria-live="polite"></div><div id="hw-chips" class="hw-chips"></div><form id="hw-form" class="hw-form"><input id="hw-in" autocomplete="off" maxlength="400" placeholder="${T('Type your question…', 'اپنا سوال لکھیں…')}" aria-label="${T('Your question', 'آپ کا سوال')}"><button class="btn" type="submit">${T('Send', 'بھیجیں')}</button></form></section>`;
    document.body.insertAdjacentHTML('beforeend', html);
    if (!bot) return;
    const panel = document.getElementById('hw-panel'), btn = document.getElementById('hw-bot'), msgs = document.getElementById('hw-msgs');
    const add = (who, text, links) => { const d = document.createElement('div'); d.className = 'hw-m hw-' + who; d.textContent = text;
      if (links && links.length) { const l = document.createElement('div'); l.className = 'hw-links'; links.forEach(k => { const a = document.createElement('a'); a.href = S.safe(k.url); a.textContent = k.label; if (k.ext) { a.target = '_blank'; a.rel = 'noopener'; } l.appendChild(a); }); d.appendChild(l); }
      msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; return d; };
    const send = async text => { text = text.trim(); if (!text) return; add('me', text); history.push({ role: 'user', content: text });
      const w = add('bot', '…'); const r = await ask(history); w.remove(); add('bot', r.text, r.links); history.push({ role: 'assistant', content: r.text }); };
    const open = o => { panel.hidden = !o; btn.setAttribute('aria-expanded', o); if (o && !msgs.children.length) { add('bot', S.L(h.assistant || {}, 'welcome') || T('Hello! I am the EasyStore assistant. Ask me about delivery, payments, returns, sizes, or a product.', 'السلام علیکم! میں ایزی اسٹور اسسٹنٹ ہوں۔ ڈیلیوری، ادائیگی، واپسی، سائز یا کسی پروڈکٹ کے بارے میں پوچھیں۔'));
      document.getElementById('hw-chips').innerHTML = faqs().slice(0, 4).map(f => `<button type="button">${esc(S.L(f, 'q'))}</button>`).join(''); }
      if (o) document.getElementById('hw-in').focus(); };
    btn.onclick = () => open(panel.hidden); panel.querySelector('.hw-x').onclick = () => open(false); window.ES.openAssistant = () => open(true);
    document.getElementById('hw-form').onsubmit = e => { e.preventDefault(); const i = document.getElementById('hw-in'); const v = i.value; i.value = ''; send(v); };
    document.getElementById('hw-chips').onclick = e => { const b = e.target.closest('button'); if (b) send(b.textContent); };
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) open(false); });
  }

  /* ---------- Help center page ---------- */
  S.pages.help = () => {
    const box = S.$('#help-box'), c = contact(), wl = waLink(), list = faqs();
    box.innerHTML = `<div class="hc-hero"><h2>${T('How can we help you?', 'ہم آپ کی کیا مدد کر سکتے ہیں؟')}</h2><input id="hc-q" type="search" placeholder="${T('Search for answers…', 'جوابات تلاش کریں…')}" aria-label="${T('Search help', 'مدد تلاش کریں')}"><button class="btn" type="button" id="hc-ask">${T('Ask our assistant', 'ہمارے اسسٹنٹ سے پوچھیں')}</button></div>
<div class="hc-grid"><div><h3>${T('Frequently asked questions', 'اکثر پوچھے جانے والے سوالات')}</h3><div id="hc-faq">${list.map((f, i) => `<details class="hc-f" data-i="${i}"><summary>${esc(S.L(f, 'q'))}</summary><p>${esc(sub(S.L(f, 'a')))}</p></details>`).join('')}</div><p id="hc-none" class="empty" hidden>${T('No answer found. Try the assistant or contact us.', 'کوئی جواب نہیں ملا۔ اسسٹنٹ سے پوچھیں یا ہم سے رابطہ کریں۔')}</p></div>
<aside><div class="box"><h3>${T('Track your order', 'اپنا آرڈر ٹریک کریں')}</h3><form id="hc-track"><label class="field">${T('Order number', 'آرڈر نمبر')}<input name="id" placeholder="ES-261019-1234" required></label><label class="field">${T('Email used for the order', 'آرڈر میں دی گئی ای میل')}<input name="email" type="email" required></label><button class="btn" style="width:100%">${T('Check status', 'اسٹیٹس چیک کریں')}</button><p id="hc-tr" class="hc-tr" aria-live="polite"></p></form></div>
<div class="box hc-contact"><h3>${T('Still need help?', 'مزید مدد چاہیے؟')}</h3>${wl ? `<a class="hc-c wa" href="${esc(wl)}" target="_blank" rel="noopener">${T('Chat on WhatsApp', 'واٹس ایپ پر بات کریں')}</a>` : ''}${c.phone ? `<a class="hc-c" href="tel:${esc(c.phone.replace(/[^\d+]/g, ''))}">${T('Call', 'کال')} ${esc(c.phone)}</a>` : ''}${c.email ? `<a class="hc-c" href="mailto:${esc(c.email)}">${esc(c.email)}</a>` : ''}<a class="hc-c" href="contact.html">${T('Send us a message', 'ہمیں پیغام بھیجیں')}</a></div></aside></div>`;
    S.$('#hc-ask').onclick = () => S.openAssistant && S.openAssistant();
    S.$('#hc-q').oninput = e => { const q = tok(e.target.value); let n = 0; S.$$('.hc-f').forEach(d => { const f = list[+d.dataset.i], hay = (f.q + ' ' + f.q_ur + ' ' + f.a + ' ' + f.a_ur).toLowerCase(); const ok = !q.length || q.every(w => hay.includes(w)); d.hidden = !ok; if (ok) n++; }); S.$('#hc-none').hidden = n > 0; };
    S.$('#hc-track').onsubmit = async e => { e.preventDefault(); const d = Object.fromEntries(new FormData(e.target)); S.$('#hc-tr').textContent = '…'; S.$('#hc-tr').textContent = await track(d.id.trim().toUpperCase(), d.email.trim()); };
  };

  const L = S.layout; S.layout = function () { const r = L.apply(this, arguments); mount(); return r; };
})();
