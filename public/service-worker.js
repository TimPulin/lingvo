const CACHE_NAME = 'lingvocards-cache-v1';
const SW_VERSION = '10.0.6';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([
          'img/background'
        ])
      }))
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
})



self.addEventListener('message', (event) => {
  if (event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage(SW_VERSION);
  }
});

self.addEventListener('activate', () => {
  console.log('activate');
})

self.addEventListener('fetch', () => {
  console.log('fetching');
})
