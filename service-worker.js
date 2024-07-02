const CACHE_NAME = "quranfullapp1-22";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/service-worker.js",
  "/aseet/icon-192x192.png",
  "/aseet/icon-512x512.png",
  "/aseet/quran.css",
  "/aseet/quran.js",
  "/fonts/HQPB7.ttf",
  "/fonts/MSHQ.TTF",
  "/fonts/PageD1.TTf",
  "/fonts/PageD2.TTf",
  "/fonts/PageQ1.TTf",
  "/fonts/PageQ2.TTf",
  "/fonts/PageQ3.TTf",
  "/fonts/UthmanicHafs.otf",
  "/tahlil.html",
  "/aseet/tahlil.css",
  "/aseet/tahlil.js",
  "/aseet/data/tahlilpanjang.json",
  "/aseet/data/tahlilpendek.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
