<script lang="ts">
	import './layout.css';
	import { MousetrailProvider } from '$lib';
	import { ThemeProvider } from '$lib';
	import { screen } from '$lib/screen.svelte';
	import { theme } from '$lib/theme.svelte';

	let { children } = $props();

	$effect(() => {
		return () => {
			screen.destroy();
			theme.destroy();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" />
</svelte:head>

<ThemeProvider>
	<MousetrailProvider>
		{@render children()}
	</MousetrailProvider>
</ThemeProvider>
