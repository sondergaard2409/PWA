const staticCacheName = 'site-static'

const dynamicCacheName = 'site-dynamic'



const assets = [
	'/',
	'/index.html',
	'/js/app.js',
	'/js/ui.js',
	'/js/materialize.min.js',
	'/css/styles.css',
	'/css/materialize.min.css',
	'/img/dish.png'
]



self.addEventListener('install', event => {
	console.log('Service Worker has been installed');
	event.waitUntil(
		caches.open(staticCacheName).then(cache => {
			cache.addAll(assets)
		})
	)
})

self.addEventListener('activate', event => {
	console.log('Service Worker has been activated');
	event.waitUntil(
		caches.keys().then(keys =>{
			return Promise.all(keys
				.filter(key => key !== staticCacheName)
				.map(key => caches.delete(key)))
		})
	)
	return;
})

self.addEventListener('fetch', event => {
	console.log('Fetch event', event)
	event.respondWith(
		caches.match(event.request).then(cacheRes =>{

			return cacheRes || fetch(event.request).then(fetchRes => {
				return caches.open(dynamicCacheName).then(cache => {
					cache.put(event.request.url, fetchRes.clone())
					return fetchRes
				})
			})
		})
	)
})