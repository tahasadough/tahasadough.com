var CACHE = 'cache-v1';
var OFFLINE_CACHE = 'offline-v1';
var OFFLINE_URL = '/offline';

var ASSETS = [
  '/',
  '/style.css',
  '/js/app.js',
  '/images/taha-sadough.webp',
  '/images/metallic-flower.webp',
  '/images/metallic-shape-background.webp',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/pwa-192.png',
  '/pwa-512.png',
  '/manifest.json',
  '/robots.txt'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(ASSETS);
    }).then(function () {
      return caches.open(OFFLINE_CACHE);
    }).then(function (cache) {
      return cache.add(OFFLINE_URL);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== CACHE && key !== OFFLINE_CACHE) {
          return caches.delete(key);
        }
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;

  var url = new URL(request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  if (request.headers.get('Accept') && request.headers.get('Accept').indexOf('text/html') !== -1) {
    event.respondWith(navigationHandler(request));
    return;
  }

  event.respondWith(staticHandler(request));
});

function navigationHandler(request) {
  return caches.match(request).then(function (cached) {
    if (cached) return cached;
    return fetch(request).then(function (response) {
      if (response.ok) {
        var cloned = response.clone();
        caches.open(OFFLINE_CACHE).then(function (cache) {
          cache.put(request, cloned);
        });
      }
      return response;
    }).catch(function () {
      return caches.match(OFFLINE_URL).then(function (fallback) {
        if (fallback) return fallback;
        return new Response('Offline', { status: 503 });
      });
    });
  });
}

function staticHandler(request) {
  return caches.match(request).then(function (cached) {
    if (cached) return cached;
    return fetch(request).then(function (response) {
      if (response.ok) {
        var cloned = response.clone();
        caches.open(OFFLINE_CACHE).then(function (cache) {
          cache.put(request, cloned);
        });
      }
      return response;
    }).catch(function () {
      return new Response(null, { status: 204 });
    });
  });
}

self.addEventListener('message', function (event) {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
