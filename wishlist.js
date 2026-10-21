/* EasyStore – wishlist (localStorage) */
(function(){const S=ES;
S.wish={list(){return S.get('wish',[])},has(id){return this.list().includes(id)},
 toggle(id){let l=this.list();l=l.includes(id)?l.filter(x=>x!==id):l.concat(id);S.set('wish',l);S.wishPaint();if(S.page()==='account')S.pages.account()}};
S.wishPaint=()=>S.$$('[data-wish]').forEach(b=>{const on=S.wish.has(+b.dataset.wish);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);if(b.classList.contains('wish'))b.textContent=on?'♥':'♡'});
})();
