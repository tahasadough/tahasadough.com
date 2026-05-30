<script lang="ts">
	import { Footer } from '$lib';
	import { Navbar } from '$lib';
	import { dev } from '$app/environment';

	let { children } = $props();

	let updateAvailable = $state(false);
	let registration: ServiceWorkerRegistration | null = null;

	$effect(() => {
		if (dev || !('serviceWorker' in navigator)) return;

		navigator.serviceWorker
			.register('/service-worker.js')
			.then((reg) => {
				registration = reg;

				if (reg.waiting) {
					updateAvailable = true;
				}

				reg.addEventListener('updatefound', () => {
					const installing = reg.installing;
					if (!installing) return;

					installing.addEventListener('statechange', () => {
						if (installing.state === 'installed' && navigator.serviceWorker.controller) {
							updateAvailable = true;
						}
					});
				});
			})
			.catch(() => {});
	});

	function applyUpdate() {
		updateAvailable = false;
		const waitingWorker = registration?.waiting;
		if (!waitingWorker) return;
		waitingWorker.postMessage('SKIP_WAITING');
		waitingWorker.addEventListener('statechange', () => {
			if (waitingWorker.state === 'activated') {
				window.location.reload();
			}
		});
	}
</script>

{#if updateAvailable}
	<button
		onclick={applyUpdate}
		class="fixed right-4 bottom-4 z-50 cursor-pointer rounded-lg bg-elevated px-4 py-2 text-sm text-on-surface shadow-lg transition-colors hover:opacity-80"
	>
		Update available — click to refresh
	</button>
{/if}

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-elevated focus:px-4 focus:py-2 focus:text-on-surface focus:ring-2 focus:ring-on-surface"
>
	Skip to content
</a>

<header class="lg:container">
	<Navbar />
</header>

<main id="main-content" aria-label="Main content">
	{@render children()}
</main>

<Footer />
