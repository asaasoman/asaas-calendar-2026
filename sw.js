/* ASAAS Calendar — minimal service worker
   Network-first for HTML so updates always reach users.
   Cache-first for other same-origin GET assets. Skips everything else. */

const CACHE = 'asaas-cal-v4';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);

  // — Skip everything we shouldn't intercept ——————————————
  // 1. Non-GET (POST/PUT/DELETE/PATCH) — Cache API rejects these
  if (req.method !== 'GET') return;
  // 2. Cross-origin (Firebase, Firestore, CDNs) — let the browser handle them directly
  if (url.origin !== self.location.origin) return;
  // 3. Range requests / partial content — usually media
  if (req.headers.get('range')) return;
  // 4. Our own API endpoints — always hit the network, never cache (live data)
  if (url.pathname.startsWith('/api/')) return;

  // — Network-first for HTML so updates always reach users ————
  if (req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/') {
    e.respondWith(
      fetch(req).then(r => {
        // Only cache successful responses
        if (r && r.ok) {
          const copy = r.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
        }
        return r;
      }).catch(() => caches.match(req).then(c => c || caches.match('/')))
    );
    return;
  }

  // — Cache-first for other same-origin GET assets ——————————
  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(r => {
        // Only cache successful, basic responses (skip opaque, errors, 404s)
        if (r && r.ok && r.type === 'basic') {
          const copy = r.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy)).catch(()=>{});
        }
        return r;
      }).catch(() => undefined);
    })
  );
});
