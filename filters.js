/* EasyStore – shop filters and sorting */
(function(){const S=ES;
S.pages.shop=()=>{
 if(!S.shop)S.shop={cat:S.q('cat')||'',min:'',max:'',sort:'rel',stock:false};
 const s=S.shop,t=S.t,box=S.$('#filters');
 box.innerHTML=`<h3>${t('category')}</h3><label><input type="radio" name="cat" value="" ${s.cat?'':'checked'}> ${t('all')}</label>${S.D.categories.map(c=>`<label><input type="radio" name="cat" value="${c.slug}" ${s.cat===c.slug?'checked':''}> ${S.esc(S.cname(c))}</label>`).join('')}
<h3>${t('price_rs')}</h3><div class="frow"><input type="number" min="0" id="f-min" placeholder="${t('min')}" value="${s.min}" aria-label="${t('min')}"><input type="number" min="0" id="f-max" placeholder="${t('max')}" value="${s.max}" aria-label="${t('max')}"></div>
<label><input type="checkbox" id="f-stock" ${s.stock?'checked':''}> ${t('only_stock')}</label>
<h3>${t('sort')}</h3><select id="f-sort" class="sel">${[['rel','s_rel'],['low','s_low'],['high','s_high'],['rate','s_rate'],['off','s_off']].map(o=>`<option value="${o[0]}" ${s.sort===o[0]?'selected':''}>${t(o[1])}</option>`).join('')}</select>`;
 const apply=()=>{let l=S.D.products.filter(p=>(!s.cat||p.cat===s.cat)&&(s.min===''||p.price>=+s.min)&&(s.max===''||p.price<=+s.max)&&(!s.stock||p.stock>0));
  const k={low:(a,b)=>a.price-b.price,high:(a,b)=>b.price-a.price,rate:(a,b)=>b.rating-a.rating,off:(a,b)=>S.off(b)-S.off(a)}[s.sort];if(k)l.sort(k);
  const c=S.cat(s.cat);S.$('#shop-title').textContent=c?S.cname(c):t('shop');S.$('#shop-count').textContent=l.length+' '+t('items');S.grid('#shop-grid',l)};
 box.onchange=e=>{const i=e.target;if(i.name==='cat')s.cat=i.value;if(i.id==='f-stock')s.stock=i.checked;if(i.id==='f-sort')s.sort=i.value;apply()};
 box.oninput=e=>{if(e.target.id==='f-min')s.min=e.target.value;if(e.target.id==='f-max')s.max=e.target.value;if(e.target.id==='f-min'||e.target.id==='f-max')apply()};
 apply()};
})();
