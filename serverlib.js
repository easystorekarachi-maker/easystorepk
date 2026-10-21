'use strict';
/* EasyStore server helpers: payment gateways, social login, help assistant.  (Never served to browsers.) */
const crypto = require('crypto');

/* ---------------- payments ---------------- */
const PAYIDS = ['cod', 'easypaisa', 'jazzcash', 'card'];
const enabledPays = settings => {
  const l = ((settings && settings.pay2) || []).filter(x => x && PAYIDS.includes(x.id) && x.enabled !== false);
  return l.length ? l : [{ id: 'cod', name: 'Cash on delivery', mode: 'cod' }];
};
const pktStamp = (d) => new Date(d.getTime() + 5 * 3600e3).toISOString().replace(/[-:T]/g, '').slice(0, 14);
async function postJSON(url, body, headers) {
  const ac = new AbortController(), to = setTimeout(() => ac.abort(), 45000);
  try {
    const r = await fetch(url, { method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, headers || {}), body: JSON.stringify(body), signal: ac.signal });
    const text = await r.text(); let j = {}; try { j = JSON.parse(text); } catch (e) { j = { raw: text.slice(0, 300) }; }
    return { status: r.status, body: j };
  } finally { clearTimeout(to); }
}
/* Live wallet push (customer approves in the Easypaisa / JazzCash app).
   These follow the providers' public merchant API formats – test them in each provider's SANDBOX before going live. */
async function chargeWallet(id, secrets, o) {
  const c = (secrets && secrets[id]) || {};
  try {
    if (id === 'easypaisa') {
      if (!c.storeId || !c.username || !c.password) return { ok: false, message: 'Easypaisa is not configured yet.' };
      const url = c.sandbox === false ? 'https://easypay.easypaisa.com.pk/easypay-service/rest/v4/initiate-ma-transaction' : 'https://easypaystg.easypaisa.com.pk/easypay-service/rest/v4/initiate-ma-transaction';
      const r = await postJSON(url, { orderId: o.orderId, storeId: String(c.storeId), transactionAmount: Number(o.amount).toFixed(2), transactionType: 'MA', mobileAccountNo: o.phone, emailAddress: o.email }, { Credentials: Buffer.from(c.username + ':' + c.password).toString('base64') });
      const code = String(r.body.responseCode || '');
      if (code === '0000') return { ok: true, ref: String(r.body.transactionId || '') };
      return { ok: false, message: r.body.responseDesc || 'Easypaisa could not start the payment. Please check the number and try again.' };
    }
    if (id === 'jazzcash') {
      if (!c.merchantId || !c.password || !c.salt) return { ok: false, message: 'JazzCash is not configured yet.' };
      const url = c.sandbox === false ? 'https://payments.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction' : 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction';
      const now = new Date(), f = {
        pp_Language: 'EN', pp_MerchantID: c.merchantId, pp_SubMerchantID: '', pp_Password: c.password, pp_TxnRefNo: 'T' + pktStamp(now) + crypto.randomInt(100, 999),
        pp_MobileNumber: o.phone, pp_CNIC: o.cnic6, pp_Amount: String(Math.round(o.amount * 100)), pp_DiscountedAmount: '', pp_TxnCurrency: 'PKR',
        pp_TxnDateTime: pktStamp(now), pp_BillReference: 'billRef', pp_Description: String(o.desc || 'Order').slice(0, 100), pp_TxnExpiryDateTime: pktStamp(new Date(now.getTime() + 3600e3)),
        ppmpf_1: o.orderId, ppmpf_2: '', ppmpf_3: '', ppmpf_4: '', ppmpf_5: ''
      };
      const s = c.salt + '&' + Object.keys(f).sort().map(k => f[k]).filter(v => v !== '').join('&');
      f.pp_SecureHash = crypto.createHmac('sha256', c.salt).update(s).digest('hex').toUpperCase();
      const r = await postJSON(url, f);
      const code = String(r.body.pp_ResponseCode || '');
      if (code === '000') return { ok: true, ref: String(r.body.pp_RetreivalReferenceNo || r.body.pp_TxnRefNo || '') };
      if (code === '124') return { ok: true, pending: true, ref: String(r.body.pp_TxnRefNo || '') };
      return { ok: false, message: r.body.pp_ResponseMessage || 'JazzCash could not start the payment. Please check the details and try again.' };
    }
  } catch (e) { return { ok: false, message: 'The payment service did not respond. Please try again.' }; }
  return { ok: false, message: 'Unknown payment method.' };
}
const luhn = n => { let s = 0, d = false; for (let i = n.length - 1; i >= 0; i--) { let x = +n[i]; if (d) { x *= 2; if (x > 9) x -= 9; } s += x; d = !d; } return n.length > 12 && s % 10 === 0; };


/* ---------------- social login (OAuth 2.0 authorization-code flow) ---------------- */
const form = o => new URLSearchParams(o).toString();
const getJSON = async (url, headers) => (await fetch(url, { headers })).json();
const postForm = async (url, o) => (await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: form(o) })).json();
const SOCIAL = {
  google:   { label: 'Google',   auth: 'https://accounts.google.com/o/oauth2/v2/auth', scope: 'openid email profile',
    q: (c, ru, st) => ({ client_id: c.id, redirect_uri: ru, response_type: 'code', scope: 'openid email profile', state: st, prompt: 'select_account' }),
    async exchange(c, ru, code) { const t = await postForm('https://oauth2.googleapis.com/token', { client_id: c.id, client_secret: c.secret, code, redirect_uri: ru, grant_type: 'authorization_code' });
      if (!t.access_token) throw new Error('token'); const j = await getJSON('https://openidconnect.googleapis.com/v1/userinfo', { Authorization: 'Bearer ' + t.access_token }); return { id: j.sub, name: j.name, email: j.email }; } },
  facebook: { label: 'Facebook', auth: 'https://www.facebook.com/v19.0/dialog/oauth',
    q: (c, ru, st) => ({ client_id: c.id, redirect_uri: ru, response_type: 'code', scope: 'public_profile,email', state: st }),
    async exchange(c, ru, code) { const t = await getJSON('https://graph.facebook.com/v19.0/oauth/access_token?' + form({ client_id: c.id, client_secret: c.secret, redirect_uri: ru, code }));
      if (!t.access_token) throw new Error('token'); const j = await getJSON('https://graph.facebook.com/me?' + form({ fields: 'id,name,email', access_token: t.access_token })); return { id: j.id, name: j.name, email: j.email }; } },
  linkedin: { label: 'LinkedIn', auth: 'https://www.linkedin.com/oauth/v2/authorization',
    q: (c, ru, st) => ({ response_type: 'code', client_id: c.id, redirect_uri: ru, state: st, scope: 'openid profile email' }),
    async exchange(c, ru, code) { const t = await postForm('https://www.linkedin.com/oauth/v2/accessToken', { grant_type: 'authorization_code', code, client_id: c.id, client_secret: c.secret, redirect_uri: ru });
      if (!t.access_token) throw new Error('token'); const j = await getJSON('https://api.linkedin.com/v2/userinfo', { Authorization: 'Bearer ' + t.access_token }); return { id: j.sub, name: j.name, email: j.email }; } },
  tiktok:   { label: 'TikTok', auth: 'https://www.tiktok.com/v2/auth/authorize/',
    q: (c, ru, st) => ({ client_key: c.id, scope: 'user.info.basic', response_type: 'code', redirect_uri: ru, state: st }),
    async exchange(c, ru, code) { const t = await postForm('https://open.tiktokapis.com/v2/oauth/token/', { client_key: c.id, client_secret: c.secret, code, grant_type: 'authorization_code', redirect_uri: ru });
      if (!t.access_token) throw new Error('token'); const j = await getJSON('https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name', { Authorization: 'Bearer ' + t.access_token }); const u = (j.data && j.data.user) || {}; return { id: u.open_id, name: u.display_name, email: '' }; } }
};
const socialReady = (site, prov) => { const s = site.settings && site.settings.social && site.settings.social[prov], c = site.secrets && site.secrets.social && site.secrets.social[prov]; return !!(SOCIAL[prov] && s && s.enabled && c && c.id && c.secret); };

/* ---------------- help assistant (uses Claude when ANTHROPIC_API_KEY is set; otherwise the browser answers from the FAQs) ---------------- */
const rate = new Map();
async function assistantReply(site, messages, lang, ip) {
  const key = process.env.ANTHROPIC_API_KEY; if (!key) return null;
  const now = Date.now(), r = (rate.get(ip) || []).filter(t => now - t < 60e3); if (r.length >= 15) return { reply: lang === 'ur' ? 'براہ کرم تھوڑی دیر بعد کوشش کریں۔' : 'Please wait a moment and try again.' };
  r.push(now); rate.set(ip, r);
  const st = site.settings || {}, sh = st.shipping || {}, ct = st.contact || {}, h = st.help || {};
  const cats = (site.categories || []).map(c => c.name).join(', ');
  const prods = (site.products || []).filter(p => p.active !== false).slice(0, 80).map(p => `#${p.id} ${p.name} – Rs. ${p.price}${p.stock < 1 ? ' (sold out)' : ''}${Array.isArray(p.sizes) && p.sizes.length ? ' sizes: ' + p.sizes.filter(s => s.stock > 0).map(s => s.name).join('/') : ''} [product-details.html?id=${p.id}]`).join('\n');
  const pays = enabledPays(st).map(p => p.name).join(', ');
  const faq = (h.faqs || []).map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n').replace(/\{fee\}/g, 'Rs. ' + (sh.fee != null ? sh.fee : 250)).replace(/\{free\}/g, 'Rs. ' + (sh.freeOver != null ? sh.freeOver : 5000));
  const system = `You are the customer-help assistant of the online shop "${st.name || 'EasyStore'}" in Pakistan. Answer briefly and kindly (max 4 sentences) in the customer's language (English, Urdu, or Roman Urdu).
Use ONLY the store information below. Never invent prices, stock, delivery promises, discounts or order details. If you do not know, say so and suggest WhatsApp/phone/email. Never ask for card numbers, PINs or passwords. To check an order the customer must give the order number and email in the chat; you cannot look orders up yourself.
Store: ${st.name || 'EasyStore'}. Delivery fee Rs. ${sh.fee != null ? sh.fee : 250}; free over Rs. ${sh.freeOver != null ? sh.freeOver : 5000}. Payment methods: ${pays}. Contact: phone ${ct.phone || '-'}, email ${ct.email || '-'}, WhatsApp ${ct.whatsapp || ct.phone || '-'}.
Categories: ${cats}.
Products:\n${prods}\n\nFAQ:\n${faq}`;
  const msgs = (Array.isArray(messages) ? messages : []).slice(-10).filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string').map(m => ({ role: m.role, content: m.content.slice(0, 800) }));
  if (!msgs.length || msgs[msgs.length - 1].role !== 'user') return null;
  try {
    const ac = new AbortController(), to = setTimeout(() => ac.abort(), 30000);
    const res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', signal: ac.signal, headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' }, body: JSON.stringify({ model: process.env.ASSISTANT_MODEL || 'claude-sonnet-5-5', max_tokens: 500, system, messages: msgs }) });
    clearTimeout(to); if (!res.ok) return null;
    const j = await res.json(), t = (j.content || []).filter(c => c.type === 'text').map(c => c.text).join('\n').trim();
    return t ? { reply: t } : null;
  } catch (e) { return null; }
}

module.exports = { assistantReply, PAYIDS, enabledPays, chargeWallet, luhn, SOCIAL, socialReady };
