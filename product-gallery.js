/* EasyStore – product details page and image gallery (supports up to 8 images) */
(function(){const S=ES;
S.gallery=(p,el)=>{let i=0;const n=Math.min(8,p.images.length);
 const draw=()=>{el.innerHTML=`<div class="gmain"><img id="gimg" src="${S.imgUrl(p.images[i])}" alt="${S.esc(S.pname(p))} ${i+1}">${n>1?'<button class="gnav prev" type="button" aria-label="Previous">‹</button><button class="gnav next" type="button" aria-label="Next">›</button>':''}</div><div class="gthumbs">${p.images.slice(0,n).map((f,k)=>`<button type="button" data-i="${k}" class="${k===i?'on':''}" aria-label="Image ${k+1}"><img src="${S.imgUrl(f)}" alt=""></button>`).join('')}</div>`;
  const go=d=>{i=(i+d+n)%n;draw()};
  const pv=S.$('.prev',el),nx=S.$('.next',el);if(pv)pv.onclick=()=>go(-1);if(nx)nx.onclick=()=>go(1);
  S.$$('[data-i]',el).forEach(b=>b.onclick=()=>{i=+b.dataset.i;draw()})};
 draw();el.tabIndex=0;el.onkeydown=e=>{if(e.key==='ArrowRight'){i=(i+1)%n;draw();el.focus()}if(e.key==='ArrowLeft'){i=(i-1+n)%n;draw();el.focus()}}};
S.pages.product=()=>{const p=S.prod(S.q('id'));if(!p){location.href='404.html';return}
 const c=S.cat(p.cat),o=S.off(p);document.title=S.pname(p)+' | '+S.D.store.name;
 S.$('#pd').innerHTML=`<nav class="crumbs"><a href="index.html">${S.t('home')}</a> › <a href="shop.html?cat=${p.cat}">${S.esc(S.cname(c))}</a> › <span>${S.esc(S.pname(p))}</span></nav>
<div class="pd-grid"><div id="pd-gal"></div><div class="pd-info"><h1>${S.esc(S.pname(p))}</h1><div class="stars">${S.stars(p.rating)} <span style="color:var(--mute)">${p.rating}</span></div>
<div class="pd-price">${S.fmt(p.price)}${o?`<s>${S.fmt(p.old_price)}</s><span class="tag low">${o}% ${S.t('off')}</span>`:''}</div><p>${S.esc(S.pdesc(p))}</p>${(p.desc_images||[]).length?`<div class="pd-dimgs">${p.desc_images.map(f=>`<img src="${S.esc(S.imgUrl(f))}" alt="${S.esc(S.pname(p))}" loading="lazy" decoding="async">`).join('')}</div>`:''}
<div class="pd-meta"><div>${S.t('brand')}: <b>${S.esc(p.brand)}</b></div><div>${S.t('category')}: <b>${S.esc(S.cname(c))}</b></div><div>${S.t('delivery')}: <b>${S.deliv(p)===0?S.t('free'):S.fmt(S.deliv(p))}</b></div><div>${p.stock>0?`<span class="tag">${S.t('in_stock')}: ${p.stock}</span>`:`<span class="tag low">${S.t('out_of_stock')}</span>`}</div></div>
${p.stock>0&&S.sizes(p).length?`<div class="pd-sizes"><div class="pd-sz-h">${S.t('sizes_label')}</div><div class="sz-list">${S.sizes(p).map(s=>`<button type="button" class="sz" data-size="${S.esc(s.name)}" ${+s.stock>0?'':'disabled'} aria-pressed="false">${S.esc(s.name)}</button>`).join('')}</div></div>`:''}${p.stock>0&&S.colors(p).length?`<div class="pd-colors"><div class="pd-sz-h">${S.t('colors_label')}</div><div class="clr-list">${S.colors(p).map(c=>`<button type="button" class="clr" data-color="${S.esc(c.name)}" aria-pressed="false"><i style="background:${S.esc(c.hex||'#ccc')}"></i>${S.esc(c.name)}</button>`).join('')}</div></div>`:''}
${p.stock>0?`<div class="pd-act"><div class="qty"><button type="button" id="q-minus">−</button><input id="q-n" type="number" min="1" max="${p.stock}" value="1" aria-label="${S.t('qty')}"><button type="button" id="q-plus">+</button></div><button class="btn" id="pd-add" type="button">${S.t('add')}</button><button class="btn alt" id="pd-buy" type="button">${S.t('buy_now')}</button></div>`:''}
<button class="btn alt sm" data-wish="${p.id}" type="button">${S.t('wish_add')}</button><p class="pd-note">${S.t('del_info')}</p></div></div>`;
 S.gallery(p,S.$('#pd-gal'));
 if(p.stock>0){const n=S.$('#q-n'),need=S.sizes(p).length>0,needC=S.colors(p).length>0;let sel='',selC='';
  const mx=()=>need?(sel?S.sstock(p,sel):p.stock):p.stock,v=()=>Math.max(1,Math.min(mx(),+n.value||1));
  S.$$('.sz').forEach(b=>b.onclick=()=>{sel=b.dataset.size;S.$('.pd-sizes').classList.remove('need');S.$$('.sz').forEach(x=>{const on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)});n.max=mx();n.value=v()});
  S.$$('.clr').forEach(b=>b.onclick=()=>{selC=b.dataset.color;S.$('.pd-colors').classList.remove('need');S.$$('.clr').forEach(x=>{const on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)})});
  S.$('#q-minus').onclick=()=>n.value=Math.max(1,v()-1);S.$('#q-plus').onclick=()=>n.value=Math.min(mx(),v()+1);
  const ok=()=>{if(needC&&!selC){S.toast(S.t('select_color'));const h=S.$('.pd-colors');h&&h.classList.add('need');return false}if(need&&!sel){S.toast(S.t('select_size'));const h=S.$('.pd-sizes');h&&h.classList.add('need');return false}return true};
  S.$('#pd-add').onclick=()=>{if(ok())S.cart.add(p.id,v(),sel,selC)};S.$('#pd-buy').onclick=()=>{if(!ok())return;S.cart.add(p.id,v(),sel,selC);location.href='cart.html'}}
 S.$('#pd-rel-title')&&(S.$('#pd-rel-title').textContent=S.t('related'));
 S.grid('#pd-rel',S.D.products.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,4))};
})();
