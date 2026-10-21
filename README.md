# EasyStore – complete website + admin panel

## The two files you asked about

| What | File | Address (when running locally) |
|---|---|---|
| **Your website (home page)** | `index.html` | http://localhost:3000/index.html |
| **Admin panel** | `admin.html` | http://localhost:3000/admin.html |
| Server that saves admin changes for all visitors | `server.js` | start with `node server.js` |

Anything you change in `admin.html` (products, up to 8 images per product, categories, top bar, store name, logo, contact info, shipping) appears on `index.html` and every other page.

## Start it (recommended: with the server)

1. Install Node.js 18 or newer (https://nodejs.org).
2. In this folder run: `node server.js` (or `npm start`).
3. Open http://localhost:3000/admin.html and log in with **admin123**, then go to **Settings → Admin password** and change it right away.
4. Open http://localhost:3000/index.html in another tab to see your website.

With the server running, every visitor sees your changes, orders and contact messages arrive in the admin panel, stock goes down automatically, and uploaded pictures are stored in the `uploads/` folder. Data is stored in `data/site.json` (back it up).

To set the first password before the first start: `ADMIN_PASSWORD="your strong password" node server.js`. To use another port: `PORT=8080 node server.js`.

### Without the server (browser-only mode)
Run `python3 -m http.server 8000` in this folder and open http://localhost:8000/admin.html. Admin changes are then saved **in your browser only** (the website and admin panel must be opened from the same address). Good for trying things out, not for a live shop. Double-clicking the files also works in Chrome but not reliably in Firefox.

## Admin panel guide (`admin.html`)

- **Dashboard** – orders, revenue, low stock, new messages.
- **Products** – add/edit/delete, Urdu name and description, price and old price (shows a discount badge), stock, rating, hide/show, **up to 8 images** (first image is the main one, use “Make main” to change it).
- **Categories** – add/edit/delete with an image.
- **Settings** – also contains the top promo bar (text in English and Urdu, button link, show/hide).
- **Home banner slider** – the 8-image slider on the home page is plain code: `slider.css`, `slider.js` and the markup in `index.html`. Put your banner pictures in `images/banners/` using the same file names.
- **Orders** – set pending / shipped / delivered / cancelled.
- **Messages** – messages from the Contact page.
- **Settings** – store name, tagline, logo upload, contact details, free-shipping rule, admin password, backup download/restore, reset to demo data.

## Put it online

Run `node server.js` on any VPS (for example with `pm2 start server.js --name easystore`) behind nginx or Caddy with HTTPS, and point your domain to it. Use HTTPS so the admin password is not sent in clear text. Do not expose the project folder directly; `server.js` already blocks `data/`, `server.js` and other source files from being downloaded.

## All files

| Area | Files |
|---|---|
| Pages | `index`, `shop`, `product-details`, `categories`, `search-results`, `deals`, `cart`, `checkout`, `customer-login`, `customer-register`, `my-account`, `my-orders`, `contact`, `about-us`, `shipping-policy`, `return-refund-policy`, `privacy-policy`, `terms-and-conditions`, `404`, **`admin`** (`.html`) |
| Styles | `main`, `header`, `footer`, `homepage`, `product-card`, `product-details`, `category`, `cart`, `checkout`, `responsive`, `rtl`, **`admin`** (`.css`) |
| Scripts | `main`, `search`, `filters`, `product-gallery`, `cart`, `checkout`, `language-switcher`, `mobile-menu`, `wishlist`, **`admin`** (`.js`) and **`server.js`** |
| Odoo 17 module | `__manifest__.py`, `controllers/`, `models/`, `views/`, `security/`, `static/src/`, `i18n/`, `tests/` (optional alternative backend) |
| Data | `products.csv`, `categories.csv`, `product_translations.csv`, `image_manifest.csv`, `inventory_export.csv`, `orders_export.csv`, `product_import_template.xlsx`, `database_backup.sql`, `data/seed.json` |
| Images | `logo.png`, `hero-banner.webp`, `images/categories/`, `images/products/`, `uploads/` (admin uploads) |
| Deploy | `package.json`, `Dockerfile`, `docker-compose.yml`, `nginx.conf`, `odoo.conf`, `requirements.txt`, `.env.example` |

`Dockerfile`, `docker-compose.yml`, `nginx.conf` and `odoo.conf` belong to the **Odoo** option. For the Node option you only need `server.js`.

## Odoo option (instead of server.js)
This folder is also an Odoo 17 module called `easy_store`. `cp .env.example .env`, edit the passwords, then `docker compose up -d --build`, open http://localhost, create a database and install **Easy Store**. Odoo then provides its own admin panel. It was written to Odoo 17 conventions but was **not run on a live Odoo server** here; if an XPath in `views/` fails on your version, adjust it.

## Honest limits
- Demo product pictures are drawn illustrations. Upload your own photos in the admin panel.
- No online payment yet (cards, JazzCash, Easypaisa). Orders are cash on delivery or paid manually after you contact the customer.
- Customer accounts on the website are simple demo accounts stored in the visitor’s browser (passwords not hashed). Customers see their own order history only on the device they ordered from; you see all orders in the admin panel.
- Policy pages are generic English text. Edit them and get legal review before launch.
- The admin panel has one shared password and no user roles.


## Home Slider, Payments and Sizes (admin panel)
- **Home Slider** – upload banner images (several at once), reorder, edit title/link, hide/show, delete. Set the auto-play speed and whether it pauses on mouse-over. Slides keep moving automatically.
- **Payments** – turn Cash on delivery, Bank transfer, JazzCash, Easypaisa, NayaPay, SadaPay, Card or any custom method on/off. Add account title, number and instructions (English + Urdu). They show at checkout; for bank/wallet methods the customer enters the transaction ID, which you see in Orders.
- **Product sizes** – in Add/Edit product use the presets (Clothes S–XXL, Pants 28–38, Shoes 38–45 EU, Shoes 6–11 UK, Kids) or add your own sizes, each with its own stock. Customers must choose a size; stock goes down per size; Orders show the size.


## Payments, social login, scanner, help (admin panel)
- **Payments** – exactly four methods: Cash on delivery, Easypaisa, JazzCash, Credit / Debit card (with icons). Wallets: *Manual* (customer sends money + enters transaction ID), *Live* (customer enters their number and gets a payment request in the app; needs your merchant API details) or *Demo* (testing). Card: *Demo* form or *Payment page* link to your gateway. Card numbers are never stored. API secrets stay on the server (`data/site.json`).
- **Social Login** – Google, Facebook, LinkedIn, TikTok. Needs the site to run with `node server.js` on your https domain and a developer app per service.
- **Home Slider & Ads** – slider images + promo ads under the slider (new products/offers).
- **Products → Scan QR / barcode** – camera, photo or USB scanner. A QR with product details (JSON such as {"name":"Shirt","price":1200,"sku":"123","sizes":"S,M,L"}) adds the product; a plain barcode opens a prefilled form or the existing product (matched by SKU). The camera needs https (or localhost).
- **Help & WhatsApp** – WhatsApp button, Help center (`help.html`) with FAQs and order tracking, and a chat assistant. Set `ANTHROPIC_API_KEY` (optional `ASSISTANT_MODEL`) for AI answers; without it the FAQ-based answers are used.


## Mobile app (PWA + Android APK)
The site now behaves like a phone app: logo splash → Login / Register → full store with bottom tabs (only in app mode, i.e. installed app / APK). A **“Get the app”** corner button on the website offers the Android APK, Google Play link and “Install”. Manage it in **admin.html → Mobile App** (upload APK, Play link, colours, text). Admin changes show in both the website and the app. See `ANDROID_APP.md` for building the APK / Play Store app.


## Permanent saving: project.json
Everything you do in the admin panel (products, categories, home slider, settings, orders, messages, customers) is saved in **`project.json`**. Uploaded pictures go to `uploads/`, backups to `backups/`, the admin password hash to `auth.json`. The banners and category pictures you supplied are in `images/banners/` and `images/categories/` and are listed in `project.json`.
Set `STORAGE_DIR` to keep all of that on a persistent disk (default: this folder).

### Publishing on Render.com
1. Put this folder in a **private** GitHub repository (project.json holds orders and customer phone numbers; it is git-ignored on purpose).
2. Render → New → Blueprint → pick the repo (it reads `render.yaml`). Set `ADMIN_PASSWORD` when asked.
3. A free Render service has no permanent disk: its files reset on every restart/redeploy. The blueprint uses a paid instance with a 1 GB disk mounted at `/var/data` (`STORAGE_DIR`) so project.json and uploads are never lost.
4. Download a backup from admin → Settings now and then.


## Keep admin changes on GitHub (survives Render restarts, works on the free plan too)
With `GITHUB_TOKEN` and `GITHUB_REPO` set, every admin change (project.json, admin password hash, uploaded pictures) is saved automatically to a separate branch called `data` of your repository, a few seconds after you click save. When Render starts, `node gitsync.js pull` restores them first. Pushes go to the `data` branch, so they never trigger a new Render deploy.
1. GitHub → Settings → Developer settings → Fine-grained tokens → Generate. Repository access: only your **private** repo. Permission: Contents = Read and write. Copy the token.
2. Render → your service → Environment: add `GITHUB_TOKEN` (the token), `GITHUB_REPO` (`yourname/reponame`), `ADMIN_PASSWORD`. Start command: `node gitsync.js pull && node server.js` (npm start does the same).
3. After the first change in the admin panel, check that a `data` branch appeared on GitHub.
The repo must stay private: the data branch contains orders, customer phones and the password hash. Don't merge `data` into `main`.
