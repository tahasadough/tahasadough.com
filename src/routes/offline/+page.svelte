<script lang="ts">
	let online = $state(true);

	$effect(() => {
		online = navigator.onLine;
		const handler = () => (online = navigator.onLine);
		addEventListener('online', handler);
		addEventListener('offline', handler);
		return () => {
			removeEventListener('online', handler);
			removeEventListener('offline', handler);
		};
	});
</script>

<svelte:head>
	<title>Offline — Taha Sadough</title>
</svelte:head>

<section class="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
	<div class="text-6xl">&#9888;</div>
	<h1 class="text-3xl font-bold">You're Offline</h1>
	<p class="max-w-md text-gray">
		{online
			? 'Back online! Try refreshing the page.'
			: "The page you requested isn't cached. Connect to the internet and try again."}
	</p>
	{#if online}
		<a
			href="/"
			class="rounded-lg bg-almost-black px-4 py-2 text-on-surface transition-colors hover:opacity-80"
		>
			Go Home
		</a>
	{/if}
</section>
