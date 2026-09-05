const CACHE_NAME = 'kon-with-allah-v2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg'
];

// تثبيت وتخزين النسخة الجديدة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// تفعيل وتنظيف أي كاش قديم فورا
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

// استراتيجية Network First (الشبكة أولاً، ثم الكاش) لتحديث الأيام والصلوات تلقائياً
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // لو الإنترنت شغّال، خد نسخة جديدة وحدّث الكاش في الخلفية واعرض الجديد
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => {
        // لو الموبايل في وضع الـ Offline تماماً، افتح من الكاش كبديل مؤقت
        return caches.match(event.request).then(cached => {
          return cached || caches.match('./index.html');
        });
      })
  );
});
            
