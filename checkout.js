/* EasyStore – checkout (stores the order in localStorage; the Odoo module handles real orders) */
(function(){const S=ES;
S.pages.checkout=()=>{const box=S.$('#co-box'),l=S.cart.items().filter(c=>S.prod(c.id)),u=S.user()||{},t=S.t,pays=S.pays();
 if(!l.length){box.innerHTML=`<div class="box empty">${t('empty_cart')}<br><br><a class="btn" href="shop.html">${t('continue')}</a></div>`;return}
 box.innerHTML=`<form id="co-form" class="co-grid" novalidate><div class="box"><h2>${t('delivery')}</h2>
<label class="field">${t('name')} *<input name="name" required value="${S.esc(u.name||'')}" autocomplete="name"></label>
<label class="field">${t('phone')} *<input name="phone" type="tel" required value="${S.esc(u.phone||'')}" autocomplete="tel"></label>
<label class="field">${t('email')} *<input name="email" type="email" required value="${S.esc(u.email||'')}" autocomplete="email"></label>
<label class="field">${t('city')} *<input name="city" required autocomplete="address-level2"></label>
<label class="field">${t('address')} *<input name="address" required autocomplete="street-address"></label>
<label class="field">${t('note')}<textarea name="note" rows="2"></textarea></label>
<h3>${t('payment')}</h3><div class="pay">${pays.map((x,k)=>`<label class="pay-opt"><input type="radio" name="pay" value="${S.esc(x.id)}" ${k?'':'checked'}>${S.payIcon(x.id,42)}<span>${S.esc(S.L(x,'name'))}</span></label>`).join('')}</div><div id="pay-info"></div></div>
<aside class="box"><h2>${t('your_cart')}</h2>${l.map(c=>{const p=S.prod(c.id);return `<div class="co-line"><span>${S.esc(S.pname(p))}${c.size?` (${S.esc(c.size)})`:''}${c.color?` – ${S.esc(c.color)}`:''} ×${c.n}</span><b>${S.fmt(p.price*c.n)}</b></div>`}).join('')}
<div class="co-line"><span>${t('shipping')}</span><b>${S.cart.ship()?S.fmt(S.cart.ship()):t('free')}</b></div><div class="co-line" style="font-size:18px"><span>${t('total')}</span><b>${S.fmt(S.cart.total())}</b></div><br><button class="btn" style="width:100%" type="submit">${t('place')}</button></aside></form>`;
 const f=S.$('#co-form');
 const brandOf=n=>/^4/.test(n)?'visa':(/^(5[1-5]|2(2[2-9]|[3-6]|7[01]|720))/.test(n)?'mastercard':'card');
 const luhn=n=>{let s=0,d=false;for(let i=n.length-1;i>=0;i--){let x=+n[i];if(d){x*=2;if(x>9)x-=9}s+=x;d=!d}return n.length>12&&s%10===0};
 const cur=()=>{const id=(new FormData(f)).get('pay');return pays.find(y=>y.id===id)||pays[0]};
 const info=()=>{const x=cur(),mode=x.mode||'manual',box=S.$('#pay-info'),ins=S.L(x,'instructions'),w=S.esc(S.L(x,'name'));let h=ins?`<p>${S.esc(ins)}</p>`:'';
  if(x.id==='card'){h+=mode==='demo'?`<div class="cc"><div class="cc-brands">${S.payIcon('visa',40)}${S.payIcon('mastercard',40)}</div><label class="field">${t('card_number')}<span class="cc-num"><input id="cc-n" inputmode="numeric" autocomplete="cc-number" maxlength="23" placeholder="1234 5678 9012 3456"><i id="cc-b">${S.payIcon('card',34)}</i></span></label><label class="field">${t('card_name')}<input id="cc-h" autocomplete="cc-name"></label><div class="cc-row"><label class="field">${t('card_exp')}<input id="cc-e" inputmode="numeric" autocomplete="cc-exp" maxlength="5" placeholder="MM/YY"></label><label class="field">${t('card_cvc')}<input id="cc-c" inputmode="numeric" autocomplete="cc-csc" maxlength="4" placeholder="123"></label></div><small class="cc-test">${t('card_test')}</small></div>`:`<p class="cc-brands">${S.payIcon('visa',40)}${S.payIcon('mastercard',40)}</p><p>${t('card_redirect')}</p>`}
  else if(x.id==='easypaisa'||x.id==='jazzcash'){
   if(mode==='manual'){const det=[[t('pay_acct'),x.account_title],[t('pay_no'),x.account_number]].filter(r=>r[1]);h+=(det.length?`<dl>${det.map(r=>`<dt>${S.esc(r[0])}</dt><dd>${S.esc(r[1])}</dd>`).join('')}</dl>`:'')+`<label class="field">${t('pay_ref')}<input name="txn" maxlength="80" autocomplete="off"></label>`}
   else{h+=`<label class="field">${t('pay_wallet_no').replace('{w}',w)}<input name="wallet" type="tel" inputmode="numeric" maxlength="11" placeholder="03XXXXXXXXX" autocomplete="tel-national"></label>`+(x.id==='jazzcash'&&mode==='live'?`<label class="field">${t('pay_cnic')}<input name="cnic6" inputmode="numeric" maxlength="6" placeholder="123456"></label>`:'')+`<small class="cc-test">${t('wallet_push').replace('{w}',w)}${mode==='demo'?' · '+t('card_test'):''}</small>`}}
  box.innerHTML=h?`<div class="pay-info">${h}</div>`:'';
  const n=S.$('#cc-n');if(n){const e=S.$('#cc-e');n.oninput=()=>{const d=n.value.replace(/\D/g,'').slice(0,19);n.value=d.replace(/(.{4})/g,'$1 ').trim();S.$('#cc-b').innerHTML=S.payIcon(brandOf(d),34)};e.oninput=()=>{let d=e.value.replace(/\D/g,'').slice(0,4);if(d.length>2)d=d.slice(0,2)+'/'+d.slice(2);e.value=d}}};
 f.addEventListener('change',e=>{if(e.target.name==='pay')info()});info();f.onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));
  if(!d.name.trim()||!d.phone.trim()||!d.email.trim()||!d.city.trim()||!d.address.trim()||!/^[0-9+\-\s]{9,}$/.test(d.phone.trim()))return S.toast(t('fill_all'));
  const x=cur(),mode=x.mode||'manual';let card=null;
  if(x.id==='card'&&mode==='demo'){const n=(S.$('#cc-n').value||'').replace(/\D/g,''),e=(S.$('#cc-e').value||'').split('/'),mm=+e[0],yy=+e[1],c=(S.$('#cc-c').value||'').trim(),now=new Date(),exp=new Date(2000+yy,mm,1);
   if(!luhn(n)||!(mm>=1&&mm<=12)||!(exp>now)||!/^\d{3,4}$/.test(c)||!S.$('#cc-h').value.trim())return S.toast(t('card_bad'));card={brand:brandOf(n),last4:n.slice(-4)}}
  if((x.id==='easypaisa'||x.id==='jazzcash')&&mode!=='manual'&&!/^03\d{9}$/.test((d.wallet||'').trim()))return S.toast(t('wallet_bad'));
  const o={id:'ES-'+new Date().toISOString().slice(2,10).replace(/-/g,'')+'-'+Math.floor(1000+Math.random()*9000),date:new Date().toLocaleDateString('en-GB'),email:d.email.trim().toLowerCase(),name:d.name.trim(),phone:d.phone.trim(),city:d.city.trim(),address:d.address.trim(),note:d.note,pay:d.pay,payname:S.payName(d.pay),txn:(d.txn||'').trim(),wallet:(d.wallet||'').trim(),cnic6:(d.cnic6||'').trim(),card:card,status:'pending',total:S.cart.total(),items:l.map(c=>({id:c.id,name:S.prod(c.id).name,size:c.size||'',color:c.color||'',n:c.n,price:S.prod(c.id).price}))};
  let pj={};
  if(S.mode==='server'){try{const r=await fetch('api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(o)});const j=await r.json();if(!r.ok)return S.toast(j.error||'Order failed');o.id=j.id;o.total=j.total;o.items=j.items;o.payname=j.payname||o.payname;pj=j.payment||{};delete o.cnic6;delete o.card}catch(x){return S.toast('Network error, please try again')}}
  else{const all=S.get('orders',[]);all.unshift(o);S.set('orders',all);const site=S.get('site',null);
   if(site&&site.products){o.items.forEach(i=>{const p=site.products.find(x=>x.id===i.id);if(p){p.stock=Math.max(0,p.stock-i.n);const se=(p.sizes||[]).find(s=>s.name===i.size);if(se)se.stock=Math.max(0,(+se.stock||0)-i.n)}});S.set('site',site)}}
  delete o.cnic6;delete o.card;
  const mine=S.get('myorders',[]);mine.unshift(o);S.set('myorders',mine);S.cart.clear();
  if(!S.user())S.set('user',{name:o.name,email:o.email,phone:o.phone});
  const go=()=>{location.href='my-orders.html?new='+o.id};
  if(pj.state==='redirect'&&pj.redirect){location.href=pj.redirect;return}
  if(pj.state==='pending'&&pj.ptoken&&x.id!=='card'){const w=S.esc(S.L(x,'name'));
   box.innerHTML=`<div class="box pay-wait"><div class="spin"></div><h2>${t('pay_waiting')}</h2><p>${t('pay_waiting_hint').replace('{w}',w)}</p><p class="pw-st" id="pw-st"></p><a class="btn alt" href="my-orders.html?new=${S.esc(o.id)}">${t('view_orders')}</a></div>`;
   let tries=0;const iv=setInterval(async()=>{tries++;try{const r=await fetch('api/orders/pay-status?id='+encodeURIComponent(o.id)+'&t='+pj.ptoken),s=await r.json();
    if(s.paystate==='paid'){clearInterval(iv);S.$('#pw-st').textContent=t('pay_ok');setTimeout(go,1200)}else if(s.paystate==='failed'){clearInterval(iv);S.$('#pw-st').textContent=t('pay_late')}}catch(e){}
    if(tries>100){clearInterval(iv);S.$('#pw-st').textContent=t('pay_late')}},3000);return}
  go()}};
})();
