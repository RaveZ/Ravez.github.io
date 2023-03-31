self.addEventListener("install", event => {
    console.log("Service worker installed");
 });
 self.addEventListener("activate", event => {
    console.log("Service worker activated");
 });

// self.addEventListener('install', function(event) {
//     console.log('[Service Worker] Installing Service Worker ...', event);
//     self.skipWaiting(); //PENTING bila ada versi baru!!
//     event.waitUntil(
//       caches.open('static')
//         .then(function(cache) {
//           console.log('[Service Worker] Precaching App Shell');
//           cache.addAll([
//             '/',
//             '/about.html',
//             '/blog.html',
//             '/contact.html',
//             '/index.html',
//             '/portfolio-example01.html',
//             '/app.css',
//             '/styles.js',
//             'https://fonts.googleapis.com/css?family=Roboto:400,700',
//             'https://fonts.googleapis.com/icon?family=Material+Icons',
//             'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
//             "https://code.getmdl.io/1.3.0/material.min.js",
//             "https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en",
//             "https://code.getmdl.io/1.3.0/material.grey-pink.min.css",
//             "https://fonts.googleapis.com/icon?family=Material+Icons"
//           ]);
//         })
//     )
//   });
  
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
  
  fetch('https://httpbin.org/ip').
  then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  });

  fetch('https://httpbin.org/post', {
  method: 'post',
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  },
    mode: 'cors',
    body: JSON.stringify({message: 'Does this work?'})
  })
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  });

  self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
      caches.open('static')
        .then(function(cache) {
          console.log('[Service Worker] Precaching App Shell');
          cache.add('/app.js')
        })
    )
  });
  
  self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
    return self.clients.claim();
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(fetch(event.request));
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          } else {
            return fetch(event.request)		//newly opened pages are cached dynamically
              .then(function(res) {
                return caches.open('dynamic')
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());
                    return res;
                  })
              });
          }
        })
    );
  });

  self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
    event.waitUntil(
      caches.keys()
        .then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
            if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
              console.log('[Service Worker] Removing old cache.', key);
              return caches.delete(key);
            }
          }));
        })
    );
    return self.clients.claim();
  });

  function onSaveButtonClicked(event) {
    console.log('clicked');
    if ('caches' in window) {
      caches.open('user-requested')
        .then(function(cache) {
          cache.add('https://httpbin.org/get');
          cache.add('/src/images/sf-boat.jpg');
        });
    }
  }

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          } else {
            return fetch(event.request)
              .then(function(res) {
                return caches.open(CACHE_DYNAMIC_NAME)
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());
                    return res;
                  })
              })
              .catch(function(err) {
                return caches.open(CACHE_STATIC_NAME)
                  .then(function(cache) {
                    return cache.match('/offline.html');
                  });
              });
          }
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
  
  