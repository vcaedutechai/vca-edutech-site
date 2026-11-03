/* Minimal service worker: online pages always come from the network; only an offline notice is cached. Payments and tests are never cached. */
const C='vca-offline-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.add('/offline.html')));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('/offline.html')));}});
