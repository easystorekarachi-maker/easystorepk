# Changelog

## 1.0.0 – 2026-10-18
- Static storefront: 19 pages (home, shop, product details, categories, search, deals, cart, checkout, login, register, account, orders, contact, about, 4 policies, 404).
- Product gallery with up to 8 images, filters, sorting, wishlist, cart and checkout (cash on delivery).
- English and Urdu (RTL) language switcher.
- Odoo 17 module `easy_store`: Urdu product name, deal flag, discount percent, contact messages, homepage and header/footer views.
- Data files: products, categories, translations, image manifest, inventory and order exports, import template, SQL sample data.
- Docker, docker-compose, nginx and odoo.conf for deployment.

## 1.1.0 – 2026-10-19
- Renamed the store to **EasyStore**.
- New `admin.html` admin panel (products with up to 8 images, categories, banners & ads with image upload, orders, messages, settings, backup).
- New `server.js` (no dependencies): saves admin changes for all visitors, receives orders and messages, stores uploaded images.
- Home hero, top bar, banner ads, store name, logo, contact info and shipping rules are now editable from the admin panel.

## Banner slider
- Removed the Banners & Ads tab from the admin panel and all banner ad / hero placements from the website.
- Added the home page banner slider (`slider.css`, `slider.js`, images in `images/banners/`). The top promo bar is now edited in Settings.

## Slider admin, payments, sizes
- Fixed: Settings tab did not open.
- New admin tabs: Home Slider and Payments. Products now support sizes with per-size stock.
- Checkout shows enabled payment methods with account details and a transaction ID field.

## Mobile app
- Added app layer (`app.js`, `app.css`), service worker (`sw.js`), icons, offline page, updated `manifest.json`.
- Splash → Login/Register → store with bottom tabs in app mode; “Get the app” download corner on the website.
- Admin: new **Mobile App** tab; server: APK upload (`PUT /api/admin/apk`), `.apk` download, `/.well-known/assetlinks.json`.
