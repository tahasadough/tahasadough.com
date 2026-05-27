/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;
const OFFLINE_CACHE = `offline-${version}`;
const ASSETS = [...build, ...files];
const OFFLINE_URL = '/offline';

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE)
			.then((cache) => cache.addAll(ASSETS))
			.then(() => caches.open(OFFLINE_CACHE))
			.then((cache) => cache.add(OFFLINE_URL))
			.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then(async (keys) => {
			for (const key of keys) {
				if (key !== CACHE && key !== OFFLINE_CACHE) await caches.delete(key);
			}
			self.clients.claim();
		})
	);
});

self.addEventListener('fetch', (event) => {
	const { request } = event;
	if (request.method !== 'GET') return;

	const url = new URL(request.url);
	if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

	if (request.headers.get('Accept')?.includes('text/html')) {
		event.respondWith(navigationHandler(request));
		return;
	}

	event.respondWith(staticHandler(request));
});

async function navigationHandler(request) {
	const cached = await caches.match(request);
	if (cached) return cached;

	try {
		const response = await fetch(request);
		if (response.ok) {
			const cache = await caches.open(OFFLINE_CACHE);
			cache.put(request, response.clone());
		}
		return response;
	} catch {
		const fallback = await caches.match(OFFLINE_URL);
		if (fallback) return fallback;
		return new Response('Offline', { status: 503 });
	}
}

async function staticHandler(request) {
	const cached = await caches.match(request);
	if (cached) return cached;

	try {
		const response = await fetch(request);
		if (response.ok) {
			const cache = await caches.open(OFFLINE_CACHE);
			cache.put(request, response.clone());
		}
		return response;
	} catch {
		return new Response(null, { status: 204 });
	}
}

self.addEventListener('message', (event) => {
	if (event.data === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});
