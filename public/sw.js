// A super-simple service worker for caching static assets and offline home.
// Not production-perfect, but enough to trigger PWA install.
const CACHE = "eglyco-v1";
const OFFLINE_URL = "/";
self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll([OFFLINE_URL, "/manifest.json"]);
  })());
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", (e) => {
  e.respondWith((async () => {
    try {
      const network = await fetch(e.request);
      return network;
    } catch (err) {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(e.request);
      return cached || await cache.match(OFFLINE_URL);
    }
  })());
});
