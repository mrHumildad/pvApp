//worker
if (navigator.serviceWorker) {// he quitado el .controller
    console.log("Active service worker found");
    } else {
        navigator.serviceWorker
        .register("trabajador.js", {
        scope: "./"
        })
        .then(function (reg) {
        console.log("Service worker  registered");
        });
    }

// Perform install steps
let CACHE_NAME = 'mi cache';
let urlsToCache = [
    'micss.css',
    'iconos/logovibra512.png',
    'midi.js',
    "sinte.js",
    "index.html",
    "starfield.js",
    "algodrone.js",
    "visual.js",
    "js/easeljs-NEXT.combined.js",
    "js/tweenjs-NEXT.combined.js",
	  "v2.js"
    ];

self.addEventListener('install', function(event) {
// Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('abierta cache');
        return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['pigment'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});