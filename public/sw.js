const cacheName = 'CalceTweet';

// Cache all the files to make a PWA
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      // Our application only has two files here index.html and manifest.json
      // but you can add more such as style.css as your app grows
      return cache.addAll([
        './',
        './css/bootstrap.min.css',
        './css/bootstrap.min.css.map',
        './css/bootstrap.rtl.min.css',
        './css/bootstrap.rtl.min.css.map',
        './css/dashboard.css',
        './css/signin.css',
        './js/dashboard.js',
        './js/repository.js',
        './images/avatar.png',
        './index.html',
        './explore.html',
        './signup.html',
        './login.html',
        './newpost.html',
        './posts.html',
        './perfil.html',
        './manifest.json',
      ]);
    })
  );
});

// Our service worker will intercept all fetch requests
// and check if we have cached the file
// if so it will serve the cached file
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request);
      });
    })
  );
});
