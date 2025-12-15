<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico';
	import LenisProvider from '$lib/components/providers/lenis-provider.svelte';
	import MousetrailProvider from '$lib/components/providers/mousetrail-provider.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<LenisProvider>
	<MousetrailProvider>
		{@render children()}
	</MousetrailProvider>
</LenisProvider>
