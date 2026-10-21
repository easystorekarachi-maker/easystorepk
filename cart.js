/* EasyStore – shopping cart (localStorage). Each line: {id, n, size?} – the same product in two sizes is two lines. */
(function(){const S=ES;
const same=(x,id,size,color)=>x.id===id&&(x.size||'')===(size||'')&&(x.color||'')===(color||'');
S.cart={
 items(){return S.get('cart',[])},
 save(l){S.set('cart',l);this.badge()},
 count(){return this.items().reduce((a,c)=>a+c.n,0)},
 sub(){return this.items().reduce((a,c)=>{const p=S.prod(c.id);return a+(p?p.price*c.n:0)},0)},
 ship(){const l=this.items().filter(c=>S.prod(c.id));if(!l.length)return 0;const sh=S.D.settings.shipping||{};let fixed=0,rest=0,any=false;l.forEach(c=>{const p=S.prod(c.id),d=p.delivery;if(d!=null&&d!==''&&!isNaN(+d)&&+d>=0)fixed+=Math.round(+d);else{any=true;rest+=p.price*c.n}});return fixed+(any?(rest>=(sh.freeOver!=null?sh.freeOver:5000)?0:(sh.fee!=null?sh.fee:250)):0)},
 total(){return this.sub()+this.ship()},
 badge(){S.$$('.cart-count').forEach(e=>e.textContent=this.count())},
 add(id,n,size,color){const p=S.prod(id);if(!p||p.stock<1)return S.toast(S.t('out_of_stock'));
  if(S.sizes(p).length&&!size){S.toast(S.t('select_size'));if(S.page()!=='product')location.href='product-details.html?id='+id;return}
  if(S.colors(p).length&&!color){S.toast(S.t('select_color'));if(S.page()!=='product')location.href='product-details.html?id='+id;return}
  const max=S.sstock(p,size);if(max<1)return S.toast(S.t('out_of_stock'));
  const l=this.items(),c=l.find(x=>same(x,id,size,color)),q=(c?c.n:0)+(n||1);
  if(q>max)return S.toast(S.t('only')+' '+max);
  if(c)c.n=q;else{const ln={id:id,n:q};if(size)ln.size=size;if(color)ln.color=color;l.push(ln)}
  this.save(l);S.toast(S.t('added'));if(S.page()==='cart')this.render()},
 setQty(id,n,size,color){let l=this.items();const p=S.prod(id);n=Math.min(n,S.sstock(p,size));
  l=n<1?l.filter(x=>!same(x,id,size,color)):l.map(x=>same(x,id,size,color)?Object.assign({},x,{n:n}):x);this.save(l);this.render()},
 clear(){this.save([])},
 render(){const box=S.$('#cart-box'),l=this.items().filter(c=>S.prod(c.id));
  if(!l.length){box.innerHTML=`<div class="box empty">${S.t('empty_cart')}<br><br><a class="btn" href="shop.html">${S.t('continue')}</a></div>`;return}
  box.innerHTML=`<div class="cart-grid"><div class="box" style="overflow-x:auto"><table><tr><th>${S.t('product')}</th><th>${S.t('price')}</th><th>${S.t('qty')}</th><th>${S.t('total')}</th><th></th></tr>${l.map(c=>{const p=S.prod(c.id),sz=S.esc(c.size||''),cz=S.esc(c.color||'');return `<tr><td><a class="ci-name" href="product-details.html?id=${p.id}"><img class="ci-img" src="${S.imgUrl(p.images[0])}" alt="">${S.esc(S.pname(p))}${c.size?`<small class="ci-size">${S.t('size')}: <b>${sz}</b></small>`:''}${c.color?`<small class="ci-size">${S.t('color')}: <b>${cz}</b></small>`:''}</a></td><td>${S.fmt(p.price)}</td><td><div class="qty"><button type="button" data-q="${p.id}" data-size="${sz}" data-color="${cz}" data-d="-1" aria-label="-">−</button><input value="${c.n}" readonly aria-label="${S.t('qty')}"><button type="button" data-q="${p.id}" data-size="${sz}" data-color="${cz}" data-d="1" aria-label="+">+</button></div></td><td>${S.fmt(p.price*c.n)}</td><td><button class="rm" type="button" data-rm="${p.id}" data-size="${sz}" data-color="${cz}">${S.t('remove')}</button></td></tr>`}).join('')}</table></div>
<aside class="box sum"><div><span>${S.t('subtotal')}</span><b>${S.fmt(this.sub())}</b></div><div><span>${S.t('shipping')}</span><b>${this.ship()?S.fmt(this.ship()):S.t('free')}</b></div><div class="tot"><span>${S.t('total')}</span><span>${S.fmt(this.total())}</span></div><a class="btn" href="checkout.html">${S.t('checkout')}</a><a class="btn alt" href="shop.html">${S.t('continue')}</a></aside></div>`;
  box.onclick=e=>{const q=e.target.closest('[data-q]'),r=e.target.closest('[data-rm]');
   if(q){const id=+q.dataset.q,sz=q.dataset.size||'',cl=q.dataset.color||'',c=this.items().find(x=>same(x,id,sz,cl));if(c)this.setQty(id,c.n+ +q.dataset.d,sz,cl)}
   if(r)this.setQty(+r.dataset.rm,0,r.dataset.size||'',r.dataset.color||'')}}
};
S.pages.cart=()=>S.cart.render();
})();
