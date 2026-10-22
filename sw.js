// Increment CACHE_VERSION whenever application shell changes.
const CACHE_VERSION = 'chinese-vocab-pwa-v1';
const SHELL = ['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(SHELL)));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith('chinese-vocab-pwa-') && name !== CACHE_VERSION).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // Never cache Google Sheets or remote AI dependencies.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try { const response = await fetch(request); if(response.ok) { const cache=await caches.open(CACHE_VERSION); await cache.put('./index.html',response.clone()); } return response; }
      catch { return (await caches.match(request)) || (await caches.match('./index.html')) || Response.error(); }
    })());
    return;
  }
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if(response.ok && SHELL.some(path => new URL(path,self.registration.scope).href === url.href)) {
      const copy=response.clone(); caches.open(CACHE_VERSION).then(cache=>cache.put(request,copy));
    }
    return response;
  })));
});
