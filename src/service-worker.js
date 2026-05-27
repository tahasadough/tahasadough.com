/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;
const ASSETS = [...build, ...files];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE)
			.then((cache) => cache.addAll(ASSETS))
			.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then(async (keys) => {
			for (const key of keys) {
				if (key !== CACHE) await caches.delete(key);
			}
			self.clients.claim();
		})
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;
	const { protocol } = new URL(event.request.url);
	if (protocol !== 'http:' && protocol !== 'https:') return;
	event.respondWith(
		caches.match(event.request).then((cached) => {
			if (cached) return cached;
			return fetch(event.request).then((response) => {
				return caches.open(`offline-${version}`).then((cache) => {
					cache.put(event.request, response.clone());
					return response;
				});
			});
		})
	);
});
