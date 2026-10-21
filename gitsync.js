'use strict';
/* Saves project.json, auth.json and uploaded pictures to a GitHub branch (default "data") and restores them on start.
   Env: GITHUB_TOKEN (fine-grained token, Contents: read & write), GITHUB_REPO ("owner/name"), GITHUB_BRANCH (default "data"). */
const fs = require('fs'), path = require('path');
const T = process.env.GITHUB_TOKEN, REPO = process.env.GITHUB_REPO, BR = process.env.GITHUB_BRANCH || 'data';
const API = process.env.GITHUB_API || 'https://api.github.com', on = !!(T && REPO);
const STORAGE = process.env.STORAGE_DIR ? path.resolve(process.env.STORAGE_DIR) : __dirname;
const call = async (m, p, b, raw) => {
  const r = await fetch(API + '/repos/' + REPO + p, { method: m, headers: { Authorization: 'Bearer ' + T, Accept: raw ? 'application/vnd.github.raw' : 'application/vnd.github+json', 'User-Agent': 'easystore', 'Content-Type': 'application/json' }, body: b ? JSON.stringify(b) : undefined });
  if (raw) return { ok: r.ok, status: r.status, buf: r.ok ? Buffer.from(await r.arrayBuffer()) : null };
  let j = null; try { j = await r.json(); } catch (e) {} return { ok: r.ok, status: r.status, j };
};
let ready = null, chain = Promise.resolve(); const timers = {};
const ensure = () => ready || (ready = (async () => {
  if ((await call('GET', '/git/ref/heads/' + BR)).ok) return;
  const rp = await call('GET', ''); if (!rp.ok) throw new Error('repo ' + rp.status);
  const d = await call('GET', '/git/ref/heads/' + rp.j.default_branch); if (!d.ok) throw new Error('default branch ' + d.status);
  const c = await call('POST', '/git/refs', { ref: 'refs/heads/' + BR, sha: d.j.object.sha }); if (!c.ok) throw new Error('create branch ' + c.status);
})());
async function put(rel, file) {
  await ensure(); if (!fs.existsSync(file)) return;
  const g = await call('GET', '/contents/' + encodeURI(rel) + '?ref=' + BR);
  const r = await call('PUT', '/contents/' + encodeURI(rel), { message: 'EasyStore data ' + new Date().toISOString(), content: fs.readFileSync(file).toString('base64'), branch: BR, sha: g.ok && g.j ? g.j.sha : undefined });
  if (!r.ok) throw new Error('save ' + rel + ' ' + r.status);
}
function push(rel, file) {
  if (!on) return; clearTimeout(timers[rel]);
  timers[rel] = setTimeout(() => { chain = chain.then(() => put(rel, file)).catch(e => { console.error('[gitsync]', e.message, '- retrying in 30s'); setTimeout(() => push(rel, file), 30000); }); }, 4000);
}
async function pull() {
  if (!on) return console.log('[gitsync] off (set GITHUB_TOKEN and GITHUB_REPO to keep data on GitHub)');
  try {
    fs.mkdirSync(path.join(STORAGE, 'uploads'), { recursive: true }); let n = 0;
    for (const f of ['project.json', 'auth.json']) { const r = await call('GET', '/contents/' + f + '?ref=' + BR, null, true); if (r.ok) { fs.writeFileSync(path.join(STORAGE, f), r.buf); n++; } }
    const l = await call('GET', '/contents/uploads?ref=' + BR);
    if (l.ok && Array.isArray(l.j)) for (const e of l.j) { if (e.type !== 'file' || !/^[\w.-]+$/.test(e.name) || e.name === '.gitkeep') continue; const r = await call('GET', '/contents/uploads/' + e.name + '?ref=' + BR, null, true); if (r.ok) { fs.writeFileSync(path.join(STORAGE, 'uploads', e.name), r.buf); n++; } }
    console.log('[gitsync] restored ' + n + ' file(s) from branch ' + BR);
  } catch (e) { console.error('[gitsync] pull failed:', e.message); }
}
module.exports = { push, pull, on };
if (require.main === module && process.argv[2] === 'pull') pull();
