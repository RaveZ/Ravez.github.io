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
            'portfolio-example01.html',
            '/app.css',
            '/styles.js',
            '/images/*'
          ])
        })
    );
    return self.clients.claim();
  });
  
  