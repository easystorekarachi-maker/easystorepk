/* Home page banner slider – slides, speed and links come from Admin > Home Slider */
(() => {
  const S = window.ES; if (!S) return;
  let timer = null;

  function paint() {
    clearInterval(timer);
    const host = document.getElementById('home-slider'); if (!host) return;
    const cfg = (S.D.settings || {}).slider || {};
    const items = (cfg.items || []).filter(x => x && x.active !== false && x.image);
    if (!items.length) { host.innerHTML = ''; return; }
    const multi = items.length > 1;
    host.innerHTML = `<section class="banner-slider" aria-roledescription="carousel" aria-label="Promotional banners"><div class="bs-slides">${items.map((b, i) => {
      const img = `<img src="${S.esc(S.imgUrl(b.image))}" alt="${S.esc(S.L(b, 'alt'))}"${i ? ' loading="lazy"' : ''}>`;
      const cta = b.btn_on !== false ? `<a class="bs-cta" href="${S.esc(S.safe(b.btn_link || b.link || 'shop.html'))}">${S.esc(S.L(b, 'btn_text') || S.t('shop_now'))}</a>` : '';
      return `<div class="bs-slide${i ? '' : ' active'}">${b.link ? `<a href="${S.esc(S.safe(b.link))}">${img}</a>` : img}${cta}</div>`;
    }).join('')}</div>${multi ? '<button class="bs-arrow bs-prev" type="button" aria-label="Previous banner">&#10094;</button><button class="bs-arrow bs-next" type="button" aria-label="Next banner">&#10095;</button><div class="bs-dots" aria-label="Choose a banner"></div>' : ''}</section>`;
    if (multi) init(host.firstElementChild, items.length, cfg);
  }

  function paintPromos() {
    const host = document.getElementById('home-promos'); if (!host) return;
    const cfg = (S.D.settings || {}).promos || {};
    const items = (cfg.items || []).filter(x => x && x.active !== false && x.image);
    if (!items.length) { host.innerHTML = ''; return; }
    host.innerHTML = `<div class="promo-grid cols-${Math.min(3, Math.max(1, +cfg.columns || 2))}">${items.map(b => {
      const img = `<img src="${S.esc(S.imgUrl(b.image))}" alt="${S.esc(S.L(b, 'alt'))}" loading="lazy">`;
      return b.link ? `<a class="promo" href="${S.esc(S.safe(b.link))}">${img}</a>` : `<div class="promo">${img}</div>`;
    }).join('')}</div>`;
  }

  function init(slider, count, cfg) {
    const slides = [...slider.querySelectorAll('.bs-slide')];
    const dotsBox = slider.querySelector('.bs-dots');
    const delay = Math.max(2, +cfg.delay || 4) * 1000;
    const auto = cfg.autoplay !== false;
    let current = 0;

    const dots = slides.map((s, i) => {
      const d = document.createElement('button');
      d.type = 'button'; d.className = 'bs-dot';
      d.setAttribute('aria-label', 'Show banner ' + (i + 1));
      d.onclick = () => { show(i); start(); };
      dotsBox.appendChild(d); return d;
    });

    function show(i) {
      current = (i + count) % count;
      slides.forEach((s, k) => s.classList.toggle('active', k === current));
      dots.forEach((d, k) => { d.classList.toggle('active', k === current); d.setAttribute('aria-current', k === current ? 'true' : 'false'); });
    }
    function start() { clearInterval(timer); if (auto) timer = setInterval(() => show(current + 1), delay); }

    slider.querySelector('.bs-next').onclick = () => { show(current + 1); start(); };
    slider.querySelector('.bs-prev').onclick = () => { show(current - 1); start(); };
    if (cfg.pauseOnHover) { slider.onmouseenter = () => clearInterval(timer); slider.onmouseleave = start; }

    let x0 = 0;
    slider.addEventListener('touchstart', e => { x0 = e.changedTouches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', e => {
      const d = e.changedTouches[0].clientX - x0;
      if (Math.abs(d) > 45) { show(current + (d < 0 ? 1 : -1)); start(); }
    }, { passive: true });

    show(0); start();
  }

  document.addEventListener('visibilitychange', () => { if (!document.hidden && document.querySelector('.banner-slider .bs-dot')) { const h = document.getElementById('home-slider'); if (h && !timer) paint(); } });

  const home = S.pages.home;
  S.pages.home = function () { const r = home.apply(this, arguments); paint(); paintPromos(); return r; };
})();
