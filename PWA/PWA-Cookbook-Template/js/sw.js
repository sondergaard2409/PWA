self.addEventListener('install', event => {
	console.log('Service Worker has been installed');
})

self.addEventListener('activate', event => {
	console.log('Service Worker has been activated');
})

self.addEventListener('fetch', event => {
	console.log('Fetch event', event)
})