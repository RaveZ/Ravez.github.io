self.addEventListener("install", event => {
    console.log("Service worker installed");
 });
 self.addEventListener("activate", event => {
    console.log("Service worker activated");
 });

  
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('first-app')
        .then(function(cache) {
          cache.addAll([
            '/',
            '/about.html',
            '/blog.html',
            '/contact.html',
            '/index.html',
            '/portfolio-example01.html',
            '/app.css',
            '/styles.js',
            'https://fonts.googleapis.com/css?family=Roboto:400,700',
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
            "https://code.getmdl.io/1.3.0/material.min.js",
            "https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en",
            "https://code.getmdl.io/1.3.0/material.grey-pink.min.css",
            "https://fonts.googleapis.com/icon?family=Material+Icons"
          ])
        })
    );
    return self.clients.claim();
  });
  

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(res) {
          return res;
        })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open(CACHE_DYNAMIC_NAME)
        .then(function(cache) {
          return fetch(event.request)
            .then(function(res) {
              cache.put(event.request, res.clone());
              return res;
            });
        })
    );
  });
  
  