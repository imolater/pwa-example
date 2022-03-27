const staticCacheName = 'static-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/assets/js/app.js',
  '/assets/css/style.css',
  '/assets/images/coffee1.jpg',
  '/assets/images/coffee2.jpg',
  '/assets/images/coffee3.jpg',
  '/assets/images/coffee4.jpg',
  '/assets/images/coffee5.jpg',
  '/assets/images/coffee6.jpg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cache => cache || fetch(event.request))
  );
});

const dynamicCacheName = 'dynamic-cache-v1';

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys
        .filter(key => key !== dynamicCacheName)
        .map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cache =>
      cache ||
      fetch(event.request))
      .then(response =>
        caches.open(dynamicCacheName)
          .then(cache => {
            cache.put(event.request.url, response.clone());
            return response;
          }))
  );
});
