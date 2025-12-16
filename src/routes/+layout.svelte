<script lang="ts">
	import './layout.css';
	import { favicon } from '$lib';
	import { LenisProvider } from '$lib';
	import { MousetrailProvider } from '$lib';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<LenisProvider>
	<MousetrailProvider>
		{@render children()}
	</MousetrailProvider>
</LenisProvider>
