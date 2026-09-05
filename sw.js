const CACHE_NAME = 'kan-ma-allah-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png.jpg',
  './icon-512.png.jpg'
];

// تثبيت الملفات في الذاكرة للعمل بدون إنترنت
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// استدعاء الملفات المخزنة عند قطع الإنترنت
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});