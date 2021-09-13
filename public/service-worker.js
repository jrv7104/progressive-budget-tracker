const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

const FILES_TO_CACHE = [
"/",
"/index.html",
"/styles.css",
"index.js",
"/icon-192x192.png",
"icon-512x512.png"
];

self.addEventListener("install", function (evt) {
    evt.waitUntil(
        caches.open(DATA_CACHE_NAME).then((cache) => cache.add("/index.html"))
    );

    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
    );

    self.skipWaiting();
});

