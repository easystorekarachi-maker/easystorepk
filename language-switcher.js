/* EasyStore – English / Urdu (RTL) switcher */
(function(){document.addEventListener('click',e=>{if(e.target.closest('.lang-btn')){ES.set('lang',ES.lang()==='en'?'ur':'en');ES.render()}})})();
