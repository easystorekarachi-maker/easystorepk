/* EasyStore – search */
(function(){const S=ES;
S.search=q=>{q=(q||'').trim().toLowerCase();if(!q)return[];return S.D.products.filter(p=>{const c=S.cat(p.cat)||{};return[p.name,p.name_ur,p.brand,p.desc,c.name,c.name_ur].join(' ').toLowerCase().includes(q)})};
S.fillSugg=()=>{const d=S.$('#sugg');if(d)d.innerHTML=S.D.products.map(p=>`<option value="${S.esc(S.pname(p))}">`).join('')};
S.pages.search=()=>{const q=S.q('q')||'',r=S.search(q);S.$('#sr-title').textContent=S.t('results_for')+' “'+q+'”';S.$('#sr-count').textContent=r.length+' '+S.t('items');S.grid('#sr-grid',r)};
})();
