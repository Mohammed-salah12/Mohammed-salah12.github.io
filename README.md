# Abeer Survey Frontend

واجهة React عربية RTL لنظام الاستبيان، وتشمل:

- الاستبيان متعدد الخطوات
- لوحة الإدارة
- الرسوم التحليلية
- جاهزية للنشر على GitHub Pages

## التشغيل المحلي

```bash
npm install
cp .env.example .env
npm run dev
```

## متغيرات البيئة

- `VITE_API_URL`: رابط الـ API. أثناء التطوير يمكن أن يبقى `/api`.
- `VITE_DEV_API_TARGET`: هدف الـ proxy المحلي، افتراضيًا `http://localhost:5001`.
- `VITE_APP_BASE`: المسار الأساسي للأصول عند النشر.
- `VITE_ROUTER_MODE`: `browser` محليًا أو `hash` عند GitHub Pages.

## GitHub Pages

تم تجهيز Workflow للنشر التلقائي من فرع `main`.

قبل أول نشر، أضف Repository Variable باسم:

- `VITE_API_URL`

وقيمته يجب أن تكون رابط الـ backend المنشور، مثل:

```text
https://your-backend-domain.com/api
```

بعد ذلك فعّل GitHub Pages من إعدادات المستودع مع Source = GitHub Actions.
