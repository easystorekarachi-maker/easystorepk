# EasyStore – Mobile App (Android) / मोबाइल ऐप

## आपकी वेबसाइट में क्या जुड़ गया है / What was added

| Feature | Where |
|---|---|
| Logo splash (logo घूमकर आता है) → **Login / Register** → पूरा स्टोर बॉटम-टैब (Home, Shop, Cart, Orders, Account) के साथ | `app.js`, `app.css` |
| Installable app (PWA) + offline page | `manifest.json`, `sw.js`, `offline.html`, `icon-*.png` |
| Website के कोने में **"Get the app"** बटन: Android APK / Google Play / Install | `app.js` (admin से कंट्रोल) |
| Admin → **Mobile App** टैब: APK upload, Play Store link, बटन का टेक्स्ट/कोना, splash का रंग और समय | `admin.js` |
| Play Store ऐप के लिए config | `twa-manifest.json`, `assetlinks.json` |

**Admin panel की हर तब्दीली** (products, prices, banners, logo, texts, payments…) website और app दोनों में एक ही सर्वर से आती है, इसलिए दोनों में अपने-आप दिखती है। खुला हुआ पेज ~30 सेकंड में या ऐप दोबारा खोलने पर खुद अपडेट हो जाता है।

App mode में customer जब तक login नहीं करता, उसे Login / Register पेज ही दिखता है।

## Android APK कैसे बनाएं (Play Store के बिना भी)

ऐप असल में आपकी HTTPS वेबसाइट को Android ऐप में लपेटता है (Trusted Web Activity), इसलिए ऊपर की सारी चीज़ें ऐप में चलती हैं।

**ज़रूरी:** वेबसाइट एक असली डोमेन पर **HTTPS** के साथ चल रही हो (`node server.js` + nginx/Caddy)। localhost से APK नहीं बनता।

1. अपने कंप्यूटर पर Node.js 18+ और Java JDK 17 लगाएं।
2. `twa-manifest.json` में `YOUR-DOMAIN.com` अपने डोमेन से बदलें (4 जगह) और चाहें तो `packageId` बदलें।
3. इस फ़ोल्डर में चलाएं:
   ```
   npm i -g @bubblewrap/cli
   bubblewrap init --manifest=https://YOUR-DOMAIN.com/manifest.json
   bubblewrap build
   ```
   (पहली बार Bubblewrap Android SDK खुद डाउनलोड करवाता है और signing key बनवाता है – पासवर्ड संभालकर रखें।)
4. `bubblewrap build` से `app-release-signed.apk` (Play Store के लिए `app-release-bundle.aab`) बनती है।
5. **`bubblewrap fingerprint`** से SHA-256 fingerprint लें और `assetlinks.json` में `REPLACE_WITH_YOUR_SIGNING_KEY_SHA256_FINGERPRINT` की जगह डालें (`package_name` वही रखें)। सर्वर यह फ़ाइल `https://YOUR-DOMAIN.com/.well-known/assetlinks.json` पर खुद देता है। इसके बिना ऐप में ऊपर एड्रेस-बार दिखेगा।
6. **Admin → Mobile App** में APK अपलोड करें (या लिंक चिपकाएं)। वेबसाइट के कोने में "Download Android App" बटन चालू हो जाएगा।

## Google Play Store पर डालना

1. Google Play Console अकाउंट बनाएं (एक बार की फ़ीस)।
2. नई ऐप बनाकर `.aab` फ़ाइल अपलोड करें; Privacy Policy का लिंक दें (`privacy-policy.html` पहले से है)।
3. ऐप publish होने पर उसका लिंक **Admin → Mobile App → Google Play Store link** में डालें – "Get it on Google Play" बटन दिखने लगेगा।

## बिना APK के (तुरंत)
Android Chrome में वेबसाइट खोलें → कोने के बटन में **"Install on this phone"** (या ⋮ → *Install app*)। फ़ोन में ऐप आइकन बन जाता है और ऊपर वाला पूरा ऐप-अनुभव चलता है। iPhone: Share → *Add to Home Screen*।

## ज़रूरी नोट
- Service worker और Install सिर्फ **HTTPS** (या localhost) पर चलते हैं।
- Customer के login की जानकारी अब भी पहले जैसी है (उसी ब्राउज़र/ऐप में सेव)। असली पासवर्ड-सुरक्षा के लिए बाद में server-side accounts चाहिए होंगे (README की "Honest limits" देखें)।
- APK upload की सीमा 300 MB है और फ़ाइल `downloads/easystore.apk` में रखी जाती है।
