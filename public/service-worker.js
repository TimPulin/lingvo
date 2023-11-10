const CACHE = 'lingvocards-network-or-cache-v1';

const test = () => {
  console.log('normvvvvv');
}


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => {
        return cache.addAll(['img/background'])
      }))
})

self.addEventListener('message', (event) => {
  if (event.data && event.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
})

self.addEventListener('activate', () => {
  console.log('activate');
})

self.addEventListener('fetch', () => {
  console.log('fetching');
})

// const TIMEOUT = 400;
