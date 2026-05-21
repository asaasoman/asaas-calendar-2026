# تقويم أساس المؤسسي — ASAAS Corporate Calendar 2026

تطبيق ويب داخلي بنمط التقويم التحريري الفاخر — Premium Corporate Editorial.

---

## 🚀 Deploy in 60 seconds (Vercel)

1. أنشئ مجلد جديد وضع داخله الملفات التالية:
   ```
   /index.html
   /manifest.webmanifest
   /sw.js
   /public/spotlight/        ← ضع هنا صور "لنتذكّر"
   /public/subsection-logos/ ← ضع هنا شعارات Mindshare / KNOWHOW / إلخ
   /public/icons/            ← أيقونات PWA (192, 512, maskable-512)
   ```
2. ارفع المجلد إلى GitHub.
3. اذهب إلى [vercel.com](https://vercel.com) → New Project → Import → Deploy.

أو بدون GitHub:
```bash
npm i -g vercel
vercel
```

> ملاحظة: لا يحتاج التطبيق إلى خطوة بناء — هو ملف HTML واحد ثابت.

---

## 🔐 Admin Login

كلمة المرور الافتراضية: **`asaas2026`**

غيّرها قبل النشر داخل `index.html`:
```js
const ADMIN_PASSWORD = 'asaas2026';
```

يتم حفظ جلسة المسؤول في `localStorage` بمفتاح `asaas_admin_logged_in`.

---

## 🖼 الصور والشعارات

ضع الصور بنفس المسارات المُعرَّفة في "لوحة التحكم":

```
/public/spotlight/spotlight-1.jpg
/public/spotlight/spotlight-2.jpg
...
/public/subsection-logos/Mindshare.jpg
/public/subsection-logos/Mindshare+.jpg
/public/subsection-logos/Knowhow.jpg
/public/subsection-logos/Fenjan.jpg
/public/subsection-logos/Ziyara.jpg
```

⚠️ مهم: أسماء الملفات والامتدادات حساسة لحالة الأحرف على Vercel.

---

## 💾 تخزين البيانات

كل البيانات محفوظة في `localStorage` بالمفاتيح التالية:

| المفتاح | الوصف |
|---|---|
| `asaas_events` | الفعاليات |
| `asaas_deleted_event_ids` | معرّفات الفعاليات الافتراضية المحذوفة (لمنع عودتها) |
| `asaas_admin_logged_in` | حالة دخول المسؤول |
| `asaas_categories` | التصنيفات الرئيسية |
| `asaas_subcategories` | الفعاليات الفرعية |
| `asaas_news_items` | الأخبار |
| `asaas_inspirational_quotes` | العبارات الملهمة |
| `asaas_spotlight_items` | صور لنتذكّر |
| `asaas_selected_countdown_event_id` | الحدث المختار للعد التنازلي |
| `asaas_hijri_day_offset` | تعديل التاريخ الهجري بالأيام |
| `asaas_filters_hidden` | الفلاتر المُخفاة |
| `asaas_quote_hidden` | إخفاء العبارة الملهمة |

استخدم زر **التحكم → تصدير / استيراد** لنقل البيانات بين الأجهزة.

---

## 🌐 للترقية إلى قاعدة بيانات مشتركة

`localStorage` خاص بكل متصفح/جهاز. للمشاركة الحية بين جميع المستخدمين، يُنصح بـ:
- **Firebase Firestore** (الأسهل)
- **Supabase**
- **SharePoint List** (إذا كنتم على Microsoft 365)

كل وظائف `save()` و `load()` معزولة في مكان واحد، لذا يمكن استبدالها بسهولة.

---

## 🎨 لوحة الألوان

```
Background: #F4EFE6
Main Green: #315C3B
Dark Text:  #3A2A1D
Soft Beige: #E9DDCA
Muted Gold: #C9A646
Soft Clay:  #B36A3C
Card:       #FFFDF8
Border:     #E1D6C5
```
