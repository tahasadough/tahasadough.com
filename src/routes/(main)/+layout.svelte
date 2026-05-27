<script lang="ts">
	import { Footer } from '$lib';
	import { Navbar } from '$lib';
	import { dev } from '$app/environment';

	let { children } = $props();

	$effect(() => {
		if (!dev && 'serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js');
		}
	});
</script>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-almost-black focus:px-4 focus:py-2 focus:text-on-surface focus:ring-2 focus:ring-on-surface"
>
	Skip to content
</a>

<header class="lg:container">
	<Navbar />
</header>

<main id="main-content">
	{@render children()}
</main>

<Footer />
