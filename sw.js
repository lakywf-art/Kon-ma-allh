const CACHE_NAME = 'kan-ma-allah-v2';
const ASSETS = [
  '/Kon-ma-allh/',
  '/Kon-ma-allh/index.html',
  '/Kon-ma-allh/manifest.json',
  '/Kon-ma-allh/icon-192.jpg',
  '/Kon-ma-allh/icon-512.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
    
