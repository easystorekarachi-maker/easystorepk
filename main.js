/*DATA_START*/
/* Seed data: generated from products.csv and categories.csv. Edits made in admin.html are saved separately. */
const DATA={
 "settings": {
  "name": "EasyStore",
  "tagline": "Fast, honest online shopping with cash on delivery.",
  "tagline_ur": "تیز اور ایماندار آن لائن خریداری، کیش آن ڈیلیوری کے ساتھ۔",
  "logo": "",
  "promo": {
   "active": true,
   "text": "Summer Sale: up to 50% off on top brands | Limited time offer!",
   "text_ur": "گرمیوں کی سیل: ٹاپ برانڈز پر 50٪ تک رعایت | محدود وقت!",
   "link": "deals.html"
  },
  "contact": {
   "email": "support@easystore.example",
   "phone": "+92 300 0000000",
   "whatsapp": "",
   "address": "Your store address, city, Pakistan"
  },
  "shipping": {
   "freeOver": 5000,
   "fee": 250
  },
  "slider": {
   "autoplay": true,
   "delay": 4,
   "pauseOnHover": false,
   "items": [
    {
     "id": "s1",
     "image": "images/banners/easy_store_green_mobile_phones_free_home_delivery.jpg",
     "alt": "Mobile Phones - Free Home Delivery",
     "alt_ur": "موبائل فونز - مفت ہوم ڈیلیوری",
     "link": "shop.html?cat=mobiles",
     "active": true
    },
    {
     "id": "s2",
     "image": "images/banners/easy_store_green_laptops_computers_free_home_delivery.jpg",
     "alt": "Laptops and Computers - Free Home Delivery",
     "alt_ur": "لیپ ٹاپ اور کمپیوٹر - مفت ہوم ڈیلیوری",
     "link": "shop.html?cat=electronics",
     "active": true
    },
    {
     "id": "s3",
     "image": "images/banners/easy_store_green_led_tv_free_home_delivery.jpg",
     "alt": "LED and TV - Free Home Delivery",
     "alt_ur": "ایل ای ڈی اور ٹی وی - مفت ہوم ڈیلیوری",
     "link": "shop.html?cat=electronics",
     "active": true
    },
    {
     "id": "s4",
     "image": "images/banners/easy_store_green_smart_watches_free_home_delivery.jpg",
     "alt": "Smart Watches - Free Home Delivery",
     "alt_ur": "سمارٹ واچز - مفت ہوم ڈیلیوری",
     "link": "shop.html?cat=electronics",
     "active": true
    },
    {
     "id": "s5",
     "image": "images/banners/easy_store_green_bags_wallets_free_home_delivery.jpg",
     "alt": "Bags and Wallets - Free Home Delivery",
     "alt_ur": "بیگز اور والٹس - مفت ہوم ڈیلیوری",
     "link": "shop.html?cat=fashion",
     "active": true
    },
    {
     "id": "s6",
     "image": "images/banners/easy_store_green_home_kitchen_free_home_delivery.jpg",
     "alt": "Home and Kitchen - Free Home Delivery",
     "alt_ur": "گھر اور کچن - مفت ہوم ڈیلیوری",
     "link": "shop.html?cat=home-kitchen",
     "active": true
    },
    {
     "id": "s7",
     "image": "images/banners/easy_store_green_beauty_cosmetics_free_home_delivery.jpg",
     "alt": "Beauty and Cosmetics - Free Home Delivery",
     "alt_ur": "بیوٹی اور کاسمیٹکس - مفت ہوم ڈیلیوری",
     "link": "shop.html?cat=beauty",
     "active": true
    },
    {
     "id": "s8",
     "image": "images/banners/easy_store_green_fitness_gym_free_home_delivery.jpg",
     "alt": "Fitness and Gym - Free Home Delivery",
     "alt_ur": "فٹنس اور جم - مفت ہوم ڈیلیوری",
     "link": "shop.html?cat=sports",
     "active": true
    }
   ]
  },
  "pay2": [
   {
    "id": "cod",
    "enabled": true,
    "name": "Cash on delivery",
    "name_ur": "کیش آن ڈیلیوری",
    "mode": "cod",
    "instructions": "Pay in cash when your order arrives at your door.",
    "instructions_ur": "آرڈر دروازے پر پہنچنے پر نقد ادائیگی کریں۔"
   },
   {
    "id": "easypaisa",
    "enabled": true,
    "name": "Easypaisa",
    "name_ur": "ایزی پیسہ",
    "mode": "manual",
    "account_title": "EasyStore",
    "account_number": "03XX-XXXXXXX",
    "instructions": "Send the total amount to our Easypaisa account, then enter the transaction ID below.",
    "instructions_ur": "کل رقم ہمارے ایزی پیسہ اکاؤنٹ میں بھیجیں، پھر نیچے ٹرانزیکشن آئی ڈی درج کریں۔"
   },
   {
    "id": "jazzcash",
    "enabled": true,
    "name": "JazzCash",
    "name_ur": "جاز کیش",
    "mode": "manual",
    "account_title": "EasyStore",
    "account_number": "03XX-XXXXXXX",
    "instructions": "Send the total amount to our JazzCash account, then enter the transaction ID below.",
    "instructions_ur": "کل رقم ہمارے جاز کیش اکاؤنٹ میں بھیجیں، پھر نیچے ٹرانزیکشن آئی ڈی درج کریں۔"
   },
   {
    "id": "card",
    "enabled": false,
    "name": "Credit / Debit card",
    "name_ur": "کریڈٹ / ڈیبٹ کارڈ",
    "mode": "demo",
    "link": "",
    "instructions": "Pay securely with your Visa or Mastercard.",
    "instructions_ur": "اپنے ویزا یا ماسٹرکارڈ سے محفوظ ادائیگی کریں۔"
   }
  ],
  "help": {
   "whatsapp": {
    "enabled": true,
    "number": "",
    "message": "Hello EasyStore! I need some help.",
    "message_ur": "السلام علیکم ایزی اسٹور! مجھے کچھ مدد چاہیے۔"
   },
   "assistant": {
    "enabled": true,
    "name": "EasyStore Assistant",
    "welcome": "Hello! I am the EasyStore assistant. Ask me about delivery, payments, returns, sizes, or a product.",
    "welcome_ur": "السلام علیکم! میں ایزی اسٹور اسسٹنٹ ہوں۔ ڈیلیوری، ادائیگی، واپسی، سائز یا کسی پروڈکٹ کے بارے میں پوچھیں۔"
   },
   "faqs": [
    {
     "q": "How long does delivery take?",
     "q_ur": "ڈیلیوری میں کتنا وقت لگتا ہے؟",
     "a": "Orders are usually delivered within 2–5 working days, depending on your city. You will get a call or message when your parcel is on its way.",
     "a_ur": "آرڈر عام طور پر آپ کے شہر کے مطابق 2 سے 5 کام کے دنوں میں پہنچ جاتا ہے۔ پارسل روانہ ہونے پر آپ کو کال یا پیغام ملے گا۔",
     "keywords": "delivery time days shipping"
    },
    {
     "q": "How much is the delivery charge?",
     "q_ur": "ڈیلیوری چارجز کتنے ہیں؟",
     "a": "Delivery costs {fee}. Orders of {free} or more get free home delivery.",
     "a_ur": "ڈیلیوری چارجز {fee} ہیں۔ {free} یا اس سے زیادہ کے آرڈر پر ہوم ڈیلیوری مفت ہے۔",
     "keywords": "delivery charge fee cost free shipping"
    },
    {
     "q": "Which payment methods do you accept?",
     "q_ur": "آپ کون سے طریقۂ ادائیگی قبول کرتے ہیں؟",
     "a": "You can pay by Cash on delivery, Easypaisa, JazzCash or Credit / Debit card. The methods available are shown at checkout.",
     "a_ur": "آپ کیش آن ڈیلیوری، ایزی پیسہ، جاز کیش یا کریڈٹ / ڈیبٹ کارڈ سے ادائیگی کر سکتے ہیں۔ دستیاب طریقے چیک آؤٹ پر نظر آتے ہیں۔",
     "keywords": "payment pay card easypaisa jazzcash cod cash"
    },
    {
     "q": "Is Cash on delivery available?",
     "q_ur": "کیا کیش آن ڈیلیوری دستیاب ہے؟",
     "a": "Yes. You can pay in cash to the rider when your order arrives.",
     "a_ur": "جی ہاں۔ آرڈر پہنچنے پر آپ رائیڈر کو نقد ادائیگی کر سکتے ہیں۔",
     "keywords": "cash on delivery cod"
    },
    {
     "q": "How do I pay with Easypaisa or JazzCash?",
     "q_ur": "ایزی پیسہ یا جاز کیش سے ادائیگی کیسے کروں؟",
     "a": "Choose Easypaisa or JazzCash at checkout and follow the instructions shown. Depending on the setup, either a payment request appears in your app or you send the amount to our account and enter the transaction ID.",
     "a_ur": "چیک آؤٹ پر ایزی پیسہ یا جاز کیش منتخب کریں اور دی گئی ہدایات پر عمل کریں۔ سیٹ اپ کے مطابق آپ کی ایپ میں ادائیگی کی درخواست آئے گی یا آپ ہمارے اکاؤنٹ میں رقم بھیج کر ٹرانزیکشن آئی ڈی درج کریں گے۔",
     "keywords": "wallet mobile account app pin"
    },
    {
     "q": "What is your return policy?",
     "q_ur": "آپ کی واپسی کی پالیسی کیا ہے؟",
     "a": "You can return unused items in original packing within 7 days of delivery. Please read the Return & refund policy page for details, or contact us to start a return.",
     "a_ur": "استعمال نہ ہوئی چیزیں اصل پیکنگ میں ڈیلیوری کے 7 دن کے اندر واپس کی جا سکتی ہیں۔ تفصیل کے لیے واپسی اور ریفنڈ پالیسی کا صفحہ دیکھیں یا ہم سے رابطہ کریں۔",
     "keywords": "return refund exchange replace"
    },
    {
     "q": "How do I choose the right size?",
     "q_ur": "میں صحیح سائز کیسے چنوں؟",
     "a": "On the product page, tap a size before adding to cart. Sizes that are sold out are crossed out. If you are unsure, message us on WhatsApp and we will help you.",
     "a_ur": "پروڈکٹ پیج پر کارٹ میں ڈالنے سے پہلے سائز منتخب کریں۔ ختم شدہ سائز کٹے ہوئے نظر آتے ہیں۔ یقین نہ ہو تو واٹس ایپ پر ہمیں پیغام کریں۔",
     "keywords": "size shoes shirt pants clothes fit"
    },
    {
     "q": "How can I track my order?",
     "q_ur": "میں اپنا آرڈر کیسے ٹریک کروں؟",
     "a": "Use the “Track your order” box on this page with your order number and email, or open My orders after logging in.",
     "a_ur": "اس صفحے پر “اپنا آرڈر ٹریک کریں” میں آرڈر نمبر اور ای میل لکھیں، یا لاگ ان کر کے میرے آرڈر کھولیں۔",
     "keywords": "track tracking status where order"
    },
    {
     "q": "Can I cancel or change my order?",
     "q_ur": "کیا میں آرڈر منسوخ یا تبدیل کر سکتا ہوں؟",
     "a": "Yes, as long as it has not been shipped. Contact us on WhatsApp or by phone with your order number as soon as possible.",
     "a_ur": "جی ہاں، اگر آرڈر ابھی روانہ نہیں ہوا۔ جلد از جلد آرڈر نمبر کے ساتھ واٹس ایپ یا فون پر رابطہ کریں۔",
     "keywords": "cancel change modify order"
    },
    {
     "q": "Do I need an account to order?",
     "q_ur": "کیا آرڈر کے لیے اکاؤنٹ ضروری ہے؟",
     "a": "No, you can check out as a guest. An account lets you see your orders and save favourites. You can also sign up with Google, Facebook, LinkedIn or TikTok if enabled.",
     "a_ur": "نہیں، آپ مہمان کے طور پر بھی آرڈر کر سکتے ہیں۔ اکاؤنٹ سے آپ اپنے آرڈر دیکھ اور پسندیدہ محفوظ کر سکتے ہیں۔ آپ گوگل، فیس بک، لنکڈ اِن یا ٹک ٹاک سے بھی سائن اپ کر سکتے ہیں۔",
     "keywords": "account login register signup"
    }
   ]
  }
 },
 "categories": [
  {
   "slug": "mobiles",
   "name": "Mobiles",
   "name_ur": "موبائل",
   "image": "cat-mobiles.svg"
  },
  {
   "slug": "electronics",
   "name": "Electronics",
   "name_ur": "الیکٹرانکس",
   "image": "cat-electronics.svg"
  },
  {
   "slug": "fashion",
   "name": "Fashion",
   "name_ur": "فیشن",
   "image": "cat-fashion.svg"
  },
  {
   "slug": "home-kitchen",
   "name": "Home & Kitchen",
   "name_ur": "گھر اور کچن",
   "image": "cat-home-kitchen.svg"
  },
  {
   "slug": "beauty",
   "name": "Beauty",
   "name_ur": "خوبصورتی",
   "image": "cat-beauty.svg"
  },
  {
   "slug": "toys-games",
   "name": "Toys & Games",
   "name_ur": "کھلونے اور گیمز",
   "image": "cat-toys-games.svg"
  },
  {
   "slug": "sports",
   "name": "Sports",
   "name_ur": "کھیل",
   "image": "cat-sports.svg"
  }
 ],
 "products": [
  {
   "id": 1,
   "slug": "wireless-earbuds-pro",
   "name": "Wireless Earbuds Pro",
   "name_ur": "وائرلیس ایئر بڈز پرو",
   "cat": "electronics",
   "price": 5999,
   "old_price": 10499,
   "stock": 40,
   "rating": 4.5,
   "brand": "SoundNest",
   "desc": "True wireless earbuds with 24-hour battery, touch controls and noise reduction.",
   "desc_ur": "24 گھنٹے بیٹری، ٹچ کنٹرول اور شور کم کرنے والی سہولت کے ساتھ وائرلیس ایئر بڈز۔",
   "images": [
    "wireless-earbuds-pro-1.svg",
    "wireless-earbuds-pro-2.svg",
    "wireless-earbuds-pro-3.svg",
    "wireless-earbuds-pro-4.svg"
   ],
   "active": true
  },
  {
   "id": 2,
   "slug": "smart-fitness-watch",
   "name": "Smart Fitness Watch",
   "name_ur": "اسمارٹ فٹنس واچ",
   "cat": "electronics",
   "price": 12999,
   "old_price": 20999,
   "stock": 18,
   "rating": 4.3,
   "brand": "FitPulse",
   "desc": "Fitness watch with heart-rate and sleep tracking, 7-day battery and water resistance.",
   "desc_ur": "دل کی دھڑکن اور نیند ٹریکنگ، 7 دن بیٹری اور پانی سے تحفظ والی فٹنس واچ۔",
   "images": [
    "smart-fitness-watch-1.svg",
    "smart-fitness-watch-2.svg",
    "smart-fitness-watch-3.svg",
    "smart-fitness-watch-4.svg"
   ],
   "active": true
  },
  {
   "id": 3,
   "slug": "travel-laptop-backpack",
   "name": "Travel & Laptop Backpack",
   "name_ur": "ٹریول اور لیپ ٹاپ بیگ پیک",
   "cat": "fashion",
   "price": 999,
   "old_price": 1999,
   "stock": 60,
   "rating": 4.4,
   "brand": "UrbanPack",
   "desc": "Water-resistant backpack with padded laptop sleeve and multiple pockets.",
   "desc_ur": "لیپ ٹاپ کے لیے گدے دار خانے اور کئی جیبوں والا پانی سے محفوظ بیگ پیک۔",
   "images": [
    "travel-laptop-backpack-1.svg",
    "travel-laptop-backpack-2.svg",
    "travel-laptop-backpack-3.svg",
    "travel-laptop-backpack-4.svg"
   ],
   "active": true
  },
  {
   "id": 4,
   "slug": "mens-running-shoes",
   "name": "Men’s Running Shoes",
   "name_ur": "مردانہ رننگ شوز",
   "cat": "sports",
   "price": 1649,
   "old_price": 2999,
   "stock": 55,
   "rating": 4.6,
   "brand": "Sparx",
   "desc": "Lightweight cushioned running shoes with a grippy sole.",
   "desc_ur": "ہلکے، آرام دہ اور مضبوط گرفت والے رننگ شوز۔",
   "images": [
    "mens-running-shoes-1.svg",
    "mens-running-shoes-2.svg",
    "mens-running-shoes-3.svg",
    "mens-running-shoes-4.svg"
   ],
   "active": true,
   "sizes": [
    {
     "name": "39",
     "stock": 8
    },
    {
     "name": "40",
     "stock": 12
    },
    {
     "name": "41",
     "stock": 15
    },
    {
     "name": "42",
     "stock": 10
    },
    {
     "name": "43",
     "stock": 6
    },
    {
     "name": "44",
     "stock": 4
    }
   ]
  },
  {
   "id": 5,
   "slug": "pressure-cooker-5l",
   "name": "Pressure Cooker 5L",
   "name_ur": "پریشر کوکر 5 لیٹر",
   "cat": "home-kitchen",
   "price": 2399,
   "old_price": 3999,
   "stock": 22,
   "rating": 4.2,
   "brand": "Prestige",
   "desc": "5-litre stainless steel pressure cooker with safety valve.",
   "desc_ur": "حفاظتی والو کے ساتھ 5 لیٹر اسٹین لیس اسٹیل پریشر کوکر۔",
   "images": [
    "pressure-cooker-5l-1.svg",
    "pressure-cooker-5l-2.svg",
    "pressure-cooker-5l-3.svg",
    "pressure-cooker-5l-4.svg"
   ],
   "active": true
  },
  {
   "id": 6,
   "slug": "android-smartphone-128gb",
   "name": "Android Smartphone 128GB",
   "name_ur": "اینڈرائیڈ اسمارٹ فون 128 جی بی",
   "cat": "mobiles",
   "price": 38999,
   "old_price": 46999,
   "stock": 9,
   "rating": 4.5,
   "brand": "NovaTel",
   "desc": "6.5-inch display, 128GB storage, 50MP camera and fast charging.",
   "desc_ur": "6.5 انچ اسکرین، 128 جی بی اسٹوریج، 50 میگا پکسل کیمرہ اور فاسٹ چارجنگ۔",
   "images": [
    "android-smartphone-128gb-1.svg",
    "android-smartphone-128gb-2.svg",
    "android-smartphone-128gb-3.svg",
    "android-smartphone-128gb-4.svg"
   ],
   "active": true
  },
  {
   "id": 7,
   "slug": "ultrabook-laptop-14",
   "name": "Ultrabook Laptop 14\"",
   "name_ur": "الٹرا بک لیپ ٹاپ 14 انچ",
   "cat": "electronics",
   "price": 89999,
   "old_price": 104999,
   "stock": 5,
   "rating": 4.7,
   "brand": "AeroBook",
   "desc": "Thin and light 14-inch laptop with 16GB RAM and 512GB SSD.",
   "desc_ur": "16 جی بی ریم اور 512 جی بی ایس ایس ڈی کے ساتھ ہلکا 14 انچ لیپ ٹاپ۔",
   "images": [
    "ultrabook-laptop-14-1.svg",
    "ultrabook-laptop-14-2.svg",
    "ultrabook-laptop-14-3.svg",
    "ultrabook-laptop-14-4.svg"
   ],
   "active": true
  },
  {
   "id": 8,
   "slug": "winter-hoodie",
   "name": "Winter Hoodie",
   "name_ur": "سرمائی ہُوڈی",
   "cat": "fashion",
   "price": 1799,
   "old_price": 2999,
   "stock": 62,
   "rating": 4.1,
   "brand": "Northwear",
   "desc": "Soft fleece-lined hoodie with kangaroo pocket.",
   "desc_ur": "نرم اونی استر والی ہُوڈی، سامنے جیب کے ساتھ۔",
   "images": [
    "winter-hoodie-1.svg",
    "winter-hoodie-2.svg",
    "winter-hoodie-3.svg",
    "winter-hoodie-4.svg"
   ],
   "active": true,
   "sizes": [
    {
     "name": "S",
     "stock": 10
    },
    {
     "name": "M",
     "stock": 15
    },
    {
     "name": "L",
     "stock": 20
    },
    {
     "name": "XL",
     "stock": 12
    },
    {
     "name": "XXL",
     "stock": 5
    }
   ]
  },
  {
   "id": 9,
   "slug": "vitamin-c-face-serum",
   "name": "Vitamin C Face Serum",
   "name_ur": "وٹامن سی فیس سیرم",
   "cat": "beauty",
   "price": 899,
   "old_price": 1499,
   "stock": 70,
   "rating": 4.3,
   "brand": "GlowLab",
   "desc": "Brightening serum with 10% vitamin C for daily use.",
   "desc_ur": "روزانہ استعمال کے لیے 10٪ وٹامن سی والا چمک دینے والا سیرم۔",
   "images": [
    "vitamin-c-face-serum-1.svg",
    "vitamin-c-face-serum-2.svg",
    "vitamin-c-face-serum-3.svg",
    "vitamin-c-face-serum-4.svg"
   ],
   "active": true
  },
  {
   "id": 10,
   "slug": "plush-teddy-bear",
   "name": "Plush Teddy Bear",
   "name_ur": "نرم ٹیڈی بیئر",
   "cat": "toys-games",
   "price": 749,
   "old_price": 1299,
   "stock": 30,
   "rating": 4.8,
   "brand": "CuddleCo",
   "desc": "Soft and safe plush teddy bear, a perfect gift for kids.",
   "desc_ur": "بچوں کے لیے نرم اور محفوظ ٹیڈی بیئر، بہترین تحفہ۔",
   "images": [
    "plush-teddy-bear-1.svg",
    "plush-teddy-bear-2.svg",
    "plush-teddy-bear-3.svg",
    "plush-teddy-bear-4.svg"
   ],
   "active": true
  },
  {
   "id": 11,
   "slug": "football-size-5",
   "name": "Football Size 5",
   "name_ur": "فٹ بال سائز 5",
   "cat": "sports",
   "price": 1199,
   "old_price": 1999,
   "stock": 44,
   "rating": 4.4,
   "brand": "Kickoff",
   "desc": "Durable machine-stitched football, size 5.",
   "desc_ur": "مضبوط مشین سلائی والا فٹ بال، سائز 5۔",
   "images": [
    "football-size-5-1.svg",
    "football-size-5-2.svg",
    "football-size-5-3.svg",
    "football-size-5-4.svg"
   ],
   "active": true
  },
  {
   "id": 12,
   "slug": "blender-600w",
   "name": "Blender 600W",
   "name_ur": "بلینڈر 600 واٹ",
   "cat": "home-kitchen",
   "price": 3499,
   "old_price": 5499,
   "stock": 14,
   "rating": 4.5,
   "brand": "MixPro",
   "desc": "600W blender with 1.5-litre jar and 3 speed settings.",
   "desc_ur": "1.5 لیٹر جار اور 3 رفتار والا 600 واٹ بلینڈر۔",
   "images": [
    "blender-600w-1.svg",
    "blender-600w-2.svg",
    "blender-600w-3.svg",
    "blender-600w-4.svg"
   ],
   "active": true
  }
 ]
};
/*DATA_END*/
/* EasyStore – core: helpers, i18n texts, header/footer, product card, simple pages */
(function(){
const S=window.ES={pages:{},mode:'local',seed:DATA};
S.$=(s,r=document)=>r.querySelector(s);S.$$=(s,r=document)=>[...r.querySelectorAll(s)];
S.get=(k,d)=>{try{const v=localStorage.getItem('es_'+k);return v===null?d:JSON.parse(v)}catch(e){return d}};
S.set=(k,v)=>{try{localStorage.setItem('es_'+k,JSON.stringify(v))}catch(e){}};
S.esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
S.fmt=n=>'Rs. '+Number(n).toLocaleString('en-US');
S.q=k=>new URLSearchParams(location.search).get(k);
S.page=()=>document.body.dataset.page;
S.T={
en:{help_center:'Help center',continue_with:'Continue with {p}',or_email:'or use your email',social_fail:'Login failed. Please try again.',pay_wallet_no:'Your {w} mobile number',pay_cnic:'Last 6 digits of your CNIC',wallet_push:'After you place the order, a payment request appears in your {w} app. Approve it with your PIN.',card_number:'Card number',card_name:'Name on card',card_exp:'Expiry (MM/YY)',card_cvc:'CVC',card_redirect:'After you place the order you will be taken to the secure payment page to enter your card details.',card_test:'Test mode: no real payment is taken.',card_bad:'Please check your card details',wallet_bad:'Enter a valid mobile number like 03001234567',pay_waiting:'Waiting for your payment',pay_waiting_hint:'Open your {w} app and approve the payment request. This page updates automatically.',pay_ok:'Payment received. Thank you!',pay_late:'We have not received the payment yet. Your order is saved; we will confirm it shortly.',view_orders:'View my orders',more:'More',choose_size:'Choose size',size:'Size',select_size:'Please select a size first',select_color:'Please select a color first',colors_label:'Select color',color:'Color',choose_option:'Choose options',delivery:'Delivery',sizes_label:'Select size',pay_ref:'Transaction ID / reference (after you pay)',pay_acct:'Account title',pay_no:'Account / number',pay_bank:'Bank / wallet',promo:'Summer Sale: up to 50% off on top brands | Limited time offer!',shop_now:'Shop now',search_ph:'Search',search:'Search',home:'Home',shop:'Shop',categories:'Categories',deals:'Today’s Deals',contact:'Contact',about:'About us',cart:'Cart',login:'Log in',register:'Create account',account:'My account',orders:'My orders',logout:'Log out',add:'Add to cart',added:'Added to cart',out_of_stock:'Out of stock',in_stock:'In stock',only:'Only',off:'off',no_results:'Nothing found. Try another search or category.',results_for:'Results for',items:'items',related:'You may also like',hero1:'Upgrade your',hero2:'Everyday',hero3:'Shop the best of Electronics, Home, Fashion & more',shop_cat:'Shop by category',todays:'Today’s deals',new_in:'New arrivals',see_all:'See all',plus_t:'One membership, many benefits',plus_p:'Free delivery, early access to sales and exclusive deals',join:'Join Plus now',plus_ok:'Membership launches soon. Stay tuned!',tr1:'Great prices',tr2:'100% original',tr3:'Easy returns',s1:'Fast delivery',s2:'Cash on delivery',s3:'Top brands, 100% original',s4:'24/7 customer support',your_cart:'Your cart',empty_cart:'Your cart is empty.',continue:'Continue shopping',subtotal:'Subtotal',shipping:'Shipping',free:'Free',total:'Total',checkout:'Checkout',remove:'Remove',product:'Product',price:'Price',qty:'Qty',delivery:'Delivery details',name:'Full name',phone:'Phone',email:'Email',city:'City',address:'Address',note:'Order note (optional)',payment:'Payment method',cod:'Cash on delivery',bank:'Bank transfer',wallet:'JazzCash / Easypaisa',place:'Place order',fill_all:'Please fill in all required fields.',order_ok:'Order placed. Thank you!',password:'Password',pw_short:'Password must be at least 6 characters.',email_used:'This email is already registered.',bad_login:'Wrong email or password.',wishlist:'Wishlist',no_orders:'You have no orders yet.',login_first:'Please log in to see your orders.',message:'Message',send:'Send message',msg_sent:'Thanks! We will reply soon.',filters:'Filters',all:'All',price_rs:'Price (Rs.)',min:'Min',max:'Max',only_stock:'In stock only',sort:'Sort by',s_rel:'Relevance',s_low:'Price: low to high',s_high:'Price: high to low',s_rate:'Top rated',s_off:'Biggest discount',brand:'Brand',category:'Category',buy_now:'Buy now',wish_add:'Save to wishlist',del_info:'Cash on delivery available. 7-day easy returns.',has_acc:'Already have an account?',no_acc:'New here?',status:'Status',date:'Date',order:'Order',pending:'Pending',shipped:'Shipped',delivered:'Delivered',cancelled:'Cancelled',f_help:'Help',f_legal:'Legal',f_shop:'Shop',f_about:'Fast, honest online shopping with cash on delivery.',shipping_policy:'Shipping policy',returns:'Return & refund policy',privacy:'Privacy policy',terms:'Terms & conditions',rights:'All rights reserved.',sitemap:'Sitemap',profile:'Profile',not_found:'Page not found',nf_text:'The page you are looking for does not exist or was moved.',go_home:'Back to home'},
ur:{help_center:'ہیلپ سینٹر',continue_with:'{p} کے ساتھ جاری رکھیں',or_email:'یا اپنا ای میل استعمال کریں',social_fail:'لاگ ان ناکام رہا۔ دوبارہ کوشش کریں۔',pay_wallet_no:'آپ کا {w} موبائل نمبر',pay_cnic:'آپ کے شناختی کارڈ کے آخری 6 ہندسے',wallet_push:'آرڈر کرنے کے بعد آپ کی {w} ایپ میں ادائیگی کی درخواست آئے گی۔ اپنے پن سے منظور کریں۔',card_number:'کارڈ نمبر',card_name:'کارڈ پر نام',card_exp:'میعاد (MM/YY)',card_cvc:'CVC',card_redirect:'آرڈر کرنے کے بعد آپ کارڈ کی تفصیل درج کرنے کے لیے محفوظ ادائیگی کے صفحے پر جائیں گے۔',card_test:'ٹیسٹ موڈ: کوئی حقیقی ادائیگی نہیں ہوگی۔',card_bad:'براہ کرم کارڈ کی تفصیل چیک کریں',wallet_bad:'درست موبائل نمبر درج کریں، جیسے 03001234567',pay_waiting:'آپ کی ادائیگی کا انتظار ہے',pay_waiting_hint:'اپنی {w} ایپ کھولیں اور ادائیگی کی درخواست منظور کریں۔ یہ صفحہ خود اپ ڈیٹ ہوگا۔',pay_ok:'ادائیگی موصول ہو گئی۔ شکریہ!',pay_late:'ادائیگی ابھی موصول نہیں ہوئی۔ آپ کا آرڈر محفوظ ہے، ہم جلد تصدیق کریں گے۔',view_orders:'میرے آرڈر دیکھیں',more:'مزید',choose_size:'سائز منتخب کریں',size:'سائز',select_size:'پہلے سائز منتخب کریں',select_color:'پہلے رنگ منتخب کریں',colors_label:'رنگ منتخب کریں',color:'رنگ',choose_option:'آپشنز منتخب کریں',delivery:'ڈیلیوری',sizes_label:'سائز منتخب کریں',pay_ref:'ٹرانزیکشن آئی ڈی / حوالہ (ادائیگی کے بعد)',pay_acct:'اکاؤنٹ ٹائٹل',pay_no:'اکاؤنٹ / نمبر',pay_bank:'بینک / والٹ',promo:'گرمیوں کی سیل: ٹاپ برانڈز پر 50٪ تک رعایت | محدود وقت!',shop_now:'ابھی خریدیں',search_ph:'تلاش کریں',search:'تلاش',home:'ہوم',shop:'دکان',categories:'کیٹیگریز',deals:'آج کی ڈیلز',contact:'رابطہ',about:'ہمارے بارے میں',cart:'کارٹ',login:'لاگ اِن',register:'اکاؤنٹ بنائیں',account:'میرا اکاؤنٹ',orders:'میرے آرڈرز',logout:'لاگ آؤٹ',add:'کارٹ میں ڈالیں',added:'کارٹ میں شامل ہو گیا',out_of_stock:'اسٹاک ختم',in_stock:'دستیاب',only:'صرف',off:'رعایت',no_results:'کچھ نہیں ملا۔ کوئی اور تلاش یا کیٹیگری آزمائیں۔',results_for:'نتائج برائے',items:'اشیاء',related:'یہ بھی پسند آ سکتا ہے',hero1:'اپنی روزمرہ زندگی کو',hero2:'اپ گریڈ کریں',hero3:'الیکٹرانکس، گھر، فیشن اور بہت کچھ بہترین قیمت پر',shop_cat:'کیٹیگری کے مطابق خریدیں',todays:'آج کی ڈیلز',new_in:'نئی آمد',see_all:'سب دیکھیں',plus_t:'ایک ممبرشپ، بے شمار فوائد',plus_p:'مفت ڈیلیوری، سیل تک پہلے رسائی اور خصوصی ڈیلز',join:'ابھی پلس جوائن کریں',plus_ok:'ممبرشپ جلد شروع ہو رہی ہے۔',tr1:'بہترین قیمتیں',tr2:'100٪ اصلی',tr3:'آسان واپسی',s1:'تیز ڈیلیوری',s2:'کیش آن ڈیلیوری',s3:'ٹاپ برانڈز، 100٪ اصلی',s4:'24/7 کسٹمر سپورٹ',your_cart:'آپ کا کارٹ',empty_cart:'آپ کا کارٹ خالی ہے۔',continue:'خریداری جاری رکھیں',subtotal:'سب ٹوٹل',shipping:'ڈیلیوری چارجز',free:'مفت',total:'کل',checkout:'چیک آؤٹ',remove:'ہٹائیں',product:'پروڈکٹ',price:'قیمت',qty:'تعداد',delivery:'ڈیلیوری کی تفصیل',name:'پورا نام',phone:'فون',email:'ای میل',city:'شہر',address:'پتہ',note:'آرڈر نوٹ (اختیاری)',payment:'ادائیگی کا طریقہ',cod:'کیش آن ڈیلیوری',bank:'بینک ٹرانسفر',wallet:'جاز کیش / ایزی پیسہ',place:'آرڈر کریں',fill_all:'براہ کرم تمام ضروری خانے پُر کریں۔',order_ok:'آرڈر ہو گیا۔ شکریہ!',password:'پاسورڈ',pw_short:'پاسورڈ کم از کم 6 حروف کا ہو۔',email_used:'یہ ای میل پہلے سے رجسٹرڈ ہے۔',bad_login:'ای میل یا پاسورڈ غلط ہے۔',wishlist:'پسندیدہ',no_orders:'آپ کا کوئی آرڈر نہیں ہے۔',login_first:'اپنے آرڈرز دیکھنے کے لیے لاگ اِن کریں۔',message:'پیغام',send:'پیغام بھیجیں',msg_sent:'شکریہ! ہم جلد جواب دیں گے۔',filters:'فلٹرز',all:'سب',price_rs:'قیمت (روپے)',min:'کم از کم',max:'زیادہ سے زیادہ',only_stock:'صرف دستیاب',sort:'ترتیب',s_rel:'متعلقہ',s_low:'قیمت: کم سے زیادہ',s_high:'قیمت: زیادہ سے کم',s_rate:'بہترین ریٹنگ',s_off:'سب سے زیادہ رعایت',brand:'برانڈ',category:'کیٹیگری',buy_now:'ابھی خریدیں',wish_add:'پسندیدہ میں رکھیں',del_info:'کیش آن ڈیلیوری دستیاب۔ 7 دن آسان واپسی۔',has_acc:'پہلے سے اکاؤنٹ ہے؟',no_acc:'نئے ہیں؟',status:'حالت',date:'تاریخ',order:'آرڈر',pending:'زیر التواء',shipped:'روانہ',delivered:'پہنچ گیا',cancelled:'منسوخ',f_help:'مدد',f_legal:'قانونی',f_shop:'خریداری',f_about:'تیز اور ایماندار آن لائن خریداری، کیش آن ڈیلیوری کے ساتھ۔',shipping_policy:'شپنگ پالیسی',returns:'واپسی اور ریفنڈ پالیسی',privacy:'پرائیویسی پالیسی',terms:'شرائط و ضوابط',rights:'تمام حقوق محفوظ ہیں۔',sitemap:'سائٹ میپ',profile:'پروفائل',not_found:'صفحہ نہیں ملا',nf_text:'آپ جو صفحہ ڈھونڈ رہے ہیں وہ موجود نہیں یا منتقل ہو چکا ہے۔',go_home:'ہوم پر واپس'}};
S.lang=()=>S.get('lang','en');
S.t=k=>{const l=S.T[S.lang()];return(l&&l[k])||S.T.en[k]||k};
S.pname=p=>S.lang()==='ur'&&p.name_ur?p.name_ur:p.name;
S.pdesc=p=>S.lang()==='ur'&&p.desc_ur?p.desc_ur:p.desc;
S.cname=c=>S.lang()==='ur'&&c.name_ur?c.name_ur:c.name;
S.cat=slug=>S.D.categories.find(c=>c.slug===slug);
S.prod=id=>S.D.products.find(p=>p.id==id);
S.off=p=>p.old_price>p.price?Math.round((1-p.price/p.old_price)*100):0;
S.deals=()=>S.D.products.filter(p=>S.off(p)>0).sort((a,b)=>S.off(b)-S.off(a));
const ABS=/^(data:|https?:|\/|uploads\/|images\/)/;
S.imgUrl=f=>ABS.test(f)?f:'images/products/'+f;
S.catImg=f=>ABS.test(f)?f:'images/categories/'+f;
S.safe=u=>/^\s*javascript:/i.test(u||'')?'#':(u||'#');
S.L=(o,k)=>(S.lang()==='ur'&&o[k+'_ur'])?o[k+'_ur']:(o[k]||'');
S.nameParts=n=>{n=String(n||'EasyStore');const m=n.match(/^(.+?[a-z0-9])([A-Z].*)$/)||n.match(/^(\S+)\s+(.+)$/);return m?[m[1],m[2]]:[n.slice(0,4),n.slice(4)]};
S.deliv=p=>{const d=p.delivery;if(d!=null&&d!==''&&!isNaN(+d))return +d;const sh=(S.D.settings||{}).shipping||{};return sh.fee!=null?+sh.fee:250};
S.favicon=s=>{if(!s||!s.icon)return;let l=document.querySelector('link[rel~="icon"]');if(!l){l=document.createElement('link');l.rel='icon';document.head.appendChild(l)}l.type='';l.href=S.imgUrl(s.icon)};
S.colors=p=>Array.isArray(p.colors)?p.colors.filter(c=>c&&c.name):[];
S.track=(ev,d)=>{if(S.mode!=='server')return;try{fetch('api/customers/event',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.assign({event:ev},d)),keepalive:true}).catch(()=>{})}catch(e){}};
S.clone=o=>JSON.parse(JSON.stringify(o));
S.merge=(a,b)=>{for(const k in b){const v=b[k];a[k]=(v&&typeof v==='object'&&!Array.isArray(v))?S.merge(a[k]&&typeof a[k]==='object'?a[k]:{},v):v}return a};
S.applySite=site=>{const d=S.merge(S.clone(S.seed),site||{});S.site=d;S.D={store:d.settings,settings:d.settings,categories:d.categories,products:d.products.filter(p=>p.active!==false)}};
S.sizes=p=>Array.isArray(p.sizes)?p.sizes.filter(s=>s&&s.name):[];
S.sstock=(p,size)=>{const l=S.sizes(p);if(!l.length)return p.stock;const s=l.find(x=>x.name===size);return s?(+s.stock||0):0};
S.PAYIDS=['cod','easypaisa','jazzcash','card'];
S.pays=()=>{const l=((S.D.settings||{}).pay2||[]).filter(x=>x&&S.PAYIDS.includes(x.id)&&x.enabled!==false);return l.length?l:[{id:'cod',mode:'cod',name:'Cash on delivery',name_ur:'کیش آن ڈیلیوری'}]};
S.payName=id=>{const x=((S.D.settings||{}).pay2||[]).find(p=>p.id===id);return x?S.L(x,'name'):(id==='cod'?S.t('cod'):id)};
S.payIcon=(id,w)=>{w=w||38;const I={
 cod:`<svg viewBox="0 0 48 32" width="${w}" height="${w*32/48}" aria-hidden="true"><rect width="48" height="32" rx="6" fill="#0b5d2a"/><rect x="8" y="9" width="32" height="14" rx="2" fill="#e8f5ec"/><circle cx="24" cy="16" r="4.5" fill="#0b5d2a"/><circle cx="12" cy="16" r="1.6" fill="#0b5d2a"/><circle cx="36" cy="16" r="1.6" fill="#0b5d2a"/></svg>`,
 easypaisa:`<svg viewBox="0 0 48 32" width="${w}" height="${w*32/48}" aria-hidden="true"><rect width="48" height="32" rx="6" fill="#2fb34a"/><path d="M12 22c0-6 4-10 10-10s8 3 8 7-3 6-7 6c-3 0-5-1.500-5-4" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="35" cy="11" r="3" fill="#fff"/></svg>`,
 jazzcash:`<svg viewBox="0 0 48 32" width="${w}" height="${w*32/48}" aria-hidden="true"><rect width="48" height="32" rx="6" fill="#d6001c"/><path d="M10 9h28v3H10z" fill="#ffc20e"/><text x="24" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="10" fill="#fff">JazzCash</text></svg>`,
 card:`<svg viewBox="0 0 48 32" width="${w}" height="${w*32/48}" aria-hidden="true"><rect width="48" height="32" rx="6" fill="#1f3a8a"/><rect y="7" width="48" height="6" fill="#0f1f4d"/><rect x="6" y="19" width="14" height="4" rx="1" fill="#9db4f5"/><circle cx="34" cy="21" r="5" fill="#eb001b"/><circle cx="40" cy="21" r="5" fill="#f79e1b" fill-opacity=".9"/></svg>`,
 visa:`<svg viewBox="0 0 48 32" width="${w}" height="${w*32/48}" aria-hidden="true"><rect width="48" height="32" rx="6" fill="#fff" stroke="#d8dee9"/><text x="24" y="22" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-style="italic" font-size="14" fill="#1a1f71">VISA</text></svg>`,
 mastercard:`<svg viewBox="0 0 48 32" width="${w}" height="${w*32/48}" aria-hidden="true"><rect width="48" height="32" rx="6" fill="#fff" stroke="#d8dee9"/><circle cx="19" cy="16" r="8" fill="#eb001b"/><circle cx="29" cy="16" r="8" fill="#f79e1b" fill-opacity=".9"/></svg>`};return I[id]||I.card};
S.stars=r=>'★'.repeat(Math.round(r))+'☆'.repeat(5-Math.round(r));
S.toast=m=>{S.$$('.toast').forEach(x=>x.remove());const d=document.createElement('div');d.className='toast';d.setAttribute('role','status');d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),2000)};
S.card=p=>{const o=S.off(p);return `<article class="pcard">${o?`<span class="badge">${o}% ${S.t('off')}</span>`:''}<button class="wish" data-wish="${p.id}" aria-label="${S.t('wishlist')}">♡</button><a class="pimg" href="product-details.html?id=${p.id}"><img src="${S.imgUrl(p.images[0])}" alt="${S.esc(S.pname(p))}" loading="lazy"></a><div class="pbody"><a class="pname" href="product-details.html?id=${p.id}">${S.esc(S.pname(p))}</a><div class="stars" aria-label="${p.rating}/5">${S.stars(p.rating)}</div><div class="pprice">${S.fmt(p.price)}${o?`<s>${S.fmt(p.old_price)}</s>`:''}</div>${p.stock>0?((S.sizes(p).length||S.colors(p).length)?`<a class="btn sm" href="product-details.html?id=${p.id}">${S.t(S.colors(p).length?'choose_option':'choose_size')}</a>`:`<button class="btn sm" data-add="${p.id}">${S.t('add')}</button>`):`<button class="btn sm alt" disabled>${S.t('out_of_stock')}</button>`}</div></article>`};
S.grid=(sel,list)=>{const el=S.$(sel);if(!el)return;el.innerHTML=list.length?list.map(S.card).join(''):`<p class="empty">${S.t('no_results')}</p>`;S.wishPaint&&S.wishPaint()};
S.user=()=>S.get('user',null);
S.navCats=cur=>{const cats=S.D.categories||[],vis=Math.max(1,Math.floor(+((S.D.settings.nav||{}).visible))||7),cc=S.q('cat')||'',a=c=>`<a href="shop.html?cat=${S.esc(c.slug)}" class="${cur==='shop.html'&&cc===c.slug?'on':''}">${S.esc(S.cname(c))}</a>`,rest=cats.slice(vis);
 return `<a href="index.html" class="${cur==='index.html'||cur===''?'on':''}">${S.t('home')}</a>`+cats.slice(0,vis).map(a).join('')+(rest.length?`<div class="nav-more"><button type="button" class="nav-more-btn" aria-expanded="false" aria-haspopup="true">${S.t('more')} ▾</button><div class="nav-drop">${rest.map(a).join('')}</div></div>`:'')};
S.layout=()=>{
 const hd=S.$('#site-header');if(!hd)return;
 S.favicon(S.D.settings);
 const t=S.t,navCats=S.navCats,st=S.D.settings,pr=st.promo||{},ct=st.contact||{},u=S.user(),cur=location.pathname.split('/').pop()||'index.html',nm=st.name;
 const links=[['index.html','home'],['shop.html','shop'],['categories.html','categories'],['deals.html','deals'],['contact.html','contact']];
 hd.innerHTML=`${pr.active!==false&&(pr.text||pr.text_ur)?`<div class="topbar">${S.esc(S.L(pr,'text'))}${pr.link?`<a class="btn xs" href="${S.esc(S.safe(pr.link))}">${t('shop_now')}</a>`:''}</div>`:''}
<header class="hdr"><div class="wrap hrow"><button class="menu-btn" type="button" aria-label="Menu" aria-expanded="false">☰</button>
<a class="brand" href="index.html" aria-label="${S.esc(nm)}"><img class="brand-logo" src="${st.logo_full?S.esc(S.imgUrl(st.logo_full)):'logo-full.png'}" alt="${S.esc(nm)}" style="height:${Math.min(120,Math.max(24,+st.logo_h||46))}px">${st.logo_text?`<span class="brand-text">${S.esc(S.nameParts(nm)[0])}<b>${S.esc(S.nameParts(nm)[1])}</b></span>`:''}</a>
<form class="hsearch" action="search-results.html" role="search"><input name="q" type="search" list="sugg" placeholder="${t('search_ph')} ${S.esc(nm)}" aria-label="${t('search')}" autocomplete="off" value="${S.esc(S.page()==='search'?S.q('q')||'':'')}"><datalist id="sugg"></datalist><button>${t('search')}</button></form>
<div class="hacts"><button class="lang-btn" type="button">${S.lang()==='en'?'اردو':'English'}</button>
<a class="hact" href="${u?'my-account.html':'customer-login.html'}"><span>${u?S.esc(u.name.split(' ')[0]):t('login')}</span></a>
<a class="hact" href="cart.html"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 4h3l2.4 10.2a2 2 0 0 0 2 1.6h6.4a2 2 0 0 0 2-1.5L20 8H7"/><circle cx="10" cy="20" r="1.2"/><circle cx="17" cy="20" r="1.2"/></svg><span>${t('cart')}</span><b class="cart-count">0</b></a></div></div>
<nav class="nav" aria-label="Categories"><div class="wrap">${navCats(cur)}</div></nav></header>`;
 S.$('#site-footer').innerHTML=`<footer class="ftr"><div class="wrap"><div class="fgrid"><div><h3>${S.esc(nm)}</h3><p>${S.esc(S.L(st,'tagline')||t('f_about'))}</p>${ct.email?`<p>${S.esc(ct.email)}</p>`:''}${ct.phone?`<p>${S.esc(ct.phone)}</p>`:''}</div>
<div><h3>${t('f_shop')}</h3><a href="shop.html">${t('shop')}</a><a href="categories.html">${t('categories')}</a><a href="deals.html">${t('deals')}</a></div>
<div><h3>${t('f_help')}</h3><a href="contact.html">${t('contact')}</a><a href="about-us.html">${t('about')}</a><a href="help.html">${t('help_center')}</a><a href="shipping-policy.html">${t('shipping_policy')}</a><a href="return-refund-policy.html">${t('returns')}</a></div>
<div><h3>${t('f_legal')}</h3><a href="privacy-policy.html">${t('privacy')}</a><a href="terms-and-conditions.html">${t('terms')}</a><a href="sitemap.xml">${t('sitemap')}</a></div></div>
<div class="fbot"><span>© 2026 ${S.esc(nm)}. ${t('rights')}</span><span>${t('cod')}</span></div></div></footer>`};
S.i18n=()=>{const l=S.lang();document.documentElement.lang=l;document.documentElement.dir=l==='ur'?'rtl':'ltr';S.$$('[data-i18n]').forEach(e=>e.textContent=S.t(e.dataset.i18n));S.$$('[data-i18n-ph]').forEach(e=>e.placeholder=S.t(e.dataset.i18nPh));S.$$('[data-store]').forEach(e=>e.textContent=S.D.settings.name)};
S.render=()=>{S.layout();S.i18n();const f=S.pages[S.page()];if(f)f();S.cart&&S.cart.badge();S.wishPaint&&S.wishPaint();S.fillSugg&&S.fillSugg()};
document.addEventListener('click',e=>{
 const a=e.target.closest('[data-add]');if(a){S.cart.add(+a.dataset.add,1);return}
 const w=e.target.closest('[data-wish]');if(w){S.wish.toggle(+w.dataset.wish);return}
 });
S.boot=async()=>{let site=S.get('site',null);
 try{if(location.protocol==='file:')throw 0;const r=await fetch('api/site',{cache:'no-store'});if(r.ok&&/json/.test(r.headers.get('content-type')||'')){site=await r.json();S.mode='server'}}catch(e){}
 S.applySite(site);S.render()};
S.ready=new Promise(res=>document.addEventListener('DOMContentLoaded',()=>S.boot().then(res)));

/* ---------- simple pages ---------- */
S.pages.home=()=>{S.grid('#home-deals',S.deals().slice(0,5));S.grid('#home-new',S.D.products.slice(0,8));
 S.$('#home-cats').innerHTML=S.D.categories.map(c=>`<a class="cat" href="shop.html?cat=${c.slug}"><i><img src="${S.catImg(c.image)}" alt=""></i>${S.esc(S.cname(c))}</a>`).join('')};
S.pages.deals=()=>S.grid('#deals-grid',S.deals());
S.pages.categories=()=>{S.$('#cat-grid').innerHTML=S.D.categories.map(c=>`<a class="ccard" href="shop.html?cat=${c.slug}"><img src="${S.catImg(c.image)}" alt=""><div>${S.esc(S.cname(c))}<small>${S.D.products.filter(p=>p.cat===c.slug).length} ${S.t('items')}</small></div></a>`).join('')};
S.socialIcon=id=>({google:`<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#4285f4" d="M22 12.2c0-.7-.1-1.4-.2-2H12v3.900h5.600a4.800 4.800 0 0 1-2.100 3.100v2.600h3.400c2-1.800 3.100-4.500 3.100-7.600z"/><path fill="#34a853" d="M12 22.500c2.800 0 5.200-.9 6.900-2.500l-3.400-2.600c-.9.600-2.100 1-3.500 1-2.700 0-5-1.800-5.800-4.300H2.700v2.700A10.500 10.500 0 0 0 12 22.500z"/><path fill="#fbbc05" d="M6.200 14.100a6.300 6.300 0 0 1 0-4.200V7.200H2.700a10.500 10.500 0 0 0 0 9.600z"/><path fill="#ea4335" d="M12 5.600c1.500 0 2.800.5 3.900 1.500l2.900-2.900A10.400 10.400 0 0 0 12 1.500 10.500 10.500 0 0 0 2.700 7.200l3.500 2.700C7 7.400 9.300 5.600 12 5.600z"/></svg>`,
 facebook:`<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#1877f2"/><path fill="#fff" d="M13.500 20v-6.600h2.200l.4-2.700h-2.600V9c0-.8.300-1.300 1.400-1.300h1.300V5.300c-.2 0-1-.1-2-.1-2 0-3.400 1.200-3.400 3.500v1.900H8.600v2.700h2.200V20z"/></svg>`,
 linkedin:`<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect width="22" height="22" x="1" y="1" rx="4" fill="#0a66c2"/><path fill="#fff" d="M6.500 9.500h2.300V17H6.500zM7.600 6a1.300 1.300 0 1 1 0 2.600 1.300 1.300 0 0 1 0-2.600zM10.300 9.500h2.200v1c.3-.6 1.100-1.200 2.300-1.200 2.400 0 2.800 1.600 2.800 3.600V17h-2.300v-3.600c0-.9 0-2-1.200-2s-1.400.9-1.400 1.900V17h-2.300z"/></svg>`,
 tiktok:`<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect width="22" height="22" x="1" y="1" rx="5" fill="#000"/><path fill="#fff" d="M16.600 8.400a3.400 3.400 0 0 1-2-1.700 3.400 3.400 0 0 1-.3-1.200h-2.300v8.700a1.800 1.800 0 1 1-1.300-1.700v-2.400a4.200 4.200 0 1 0 3.600 4.100V10.500a5.700 5.700 0 0 0 3.300 1V9.200a3.400 3.400 0 0 1-1-.8z"/></svg>`})[id]||'';
S.socialUI=async()=>{const box=S.$('.box.narrow');if(!box)return;const code=S.q('social');
 if(S.q('social_error'))S.toast(S.t('social_fail'));
 if(code&&S.mode==='server'){try{const r=await fetch('api/auth/claim?code='+encodeURIComponent(code));if(!r.ok)throw 0;const j=await r.json(),us=S.get('users',[]);if(!us.some(u=>u.email===j.email)){us.push({name:j.name,email:j.email,phone:'',social:j.provider});S.set('users',us)}
   S.set('user',{name:j.name,email:j.email,phone:'',provider:j.provider});location.href='my-account.html';return}catch(e){S.toast(S.t('social_fail'))}}
 if(S.mode!=='server')return;let list=[];try{list=(await (await fetch('api/auth/providers')).json()).providers||[]}catch(e){}
 if(!list.length)return;const h=box.querySelector('h1');
 h.insertAdjacentHTML('afterend',`<div class="social-box">${list.map(p=>`<a class="soc-btn" href="auth/${p.id}/start">${S.socialIcon(p.id)}<span>${S.t('continue_with').replace('{p}',p.label)}</span></a>`).join('')}<div class="soc-or"><span>${S.t('or_email')}</span></div></div>`)};
S.pages.register=()=>{S.socialUI();const f=S.$('#reg-form');f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f)),em=d.email.trim().toLowerCase();
 if(d.password.length<6)return S.toast(S.t('pw_short'));const us=S.get('users',[]);if(us.some(u=>u.email===em))return S.toast(S.t('email_used'));
 us.push({name:d.name.trim(),email:em,phone:d.phone.trim(),password:d.password});S.set('users',us);S.set('user',{name:d.name.trim(),email:em,phone:d.phone.trim()});S.track('register',{name:d.name.trim(),email:em,phone:d.phone.trim()});location.href='my-account.html'}};
S.pages.login=()=>{S.socialUI();const f=S.$('#login-form');f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f)),em=d.email.trim().toLowerCase();
 const u=S.get('users',[]).find(x=>x.email===em&&x.password===d.password);if(!u)return S.toast(S.t('bad_login'));S.set('user',{name:u.name,email:u.email,phone:u.phone});S.track('login',{name:u.name,email:u.email,phone:u.phone});location.href='my-account.html'}};
S.pages.account=()=>{const u=S.user();if(!u){location.href='customer-login.html';return}
 S.$('#acc').innerHTML=`<div class="box"><h2>${S.t('profile')}</h2><p><b>${S.esc(u.name)}</b><br>${S.esc(u.email)}<br>${S.esc(u.phone||'')}</p><a class="btn sm" href="my-orders.html">${S.t('orders')}</a> <button class="btn sm alt" id="logout" type="button">${S.t('logout')}</button></div>
<div class="sec-head"><h2>${S.t('wishlist')}</h2></div><div id="acc-wish" class="pgrid"></div>`;
 S.$('#logout').onclick=()=>{S.set('user',null);location.href='index.html'};S.grid('#acc-wish',S.wish.list().map(S.prod).filter(Boolean))};
S.pages.orders=()=>{const u=S.user(),box=S.$('#ord');if(!u){box.innerHTML=`<p class="empty">${S.t('login_first')} <a href="customer-login.html">${S.t('login')}</a></p>`;return}
 const l=S.get('myorders',[]).filter(o=>o.email===u.email),n=S.q('new');
 box.innerHTML=(n?`<div class="ok" role="status">${S.t('order_ok')} #${S.esc(n)}</div>`:'')+(l.length?`<div class="box" style="overflow-x:auto"><table><tr><th>${S.t('order')}</th><th>${S.t('date')}</th><th>${S.t('product')}</th><th>${S.t('total')}</th><th>${S.t('status')}</th></tr>${l.map(o=>`<tr><td>${S.esc(o.id)}</td><td>${S.esc(o.date)}</td><td>${o.items.map(i=>S.esc(i.name)+(i.size?' ('+S.esc(i.size)+')':'')+(i.color?' – '+S.esc(i.color):'')+' ×'+i.n).join(', ')}</td><td>${S.fmt(o.total)}</td><td><span class="tag">${S.t(o.status)}</span></td></tr>`).join('')}</table></div>`:`<p class="empty">${S.t('no_orders')}</p>`)};
S.pages.contact=()=>{const c=S.D.settings.contact||{};S.$('#contact-info').innerHTML=`<h2>${S.esc(S.D.settings.name)}</h2><p>${c.email?'Email: '+S.esc(c.email)+'<br>':''}${c.phone?'Phone: '+S.esc(c.phone)+'<br>':''}${c.whatsapp?'WhatsApp: '+S.esc(c.whatsapp)+'<br>':''}${c.address?S.esc(c.address):''}</p>`;
 const f=S.$('#contact-form');f.onsubmit=async e=>{e.preventDefault();const m=Object.assign(Object.fromEntries(new FormData(f)),{id:'m'+Date.now(),date:new Date().toISOString(),state:'new'});
  if(S.mode==='server'){try{const r=await fetch('api/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(m)});if(!r.ok)throw 0}catch(x){return S.toast('Error, please try again')}}
  else{const l=S.get('messages',[]);l.unshift(m);S.set('messages',l)}f.reset();S.toast(S.t('msg_sent'))}};
})();
