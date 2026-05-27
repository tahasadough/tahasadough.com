<script lang="ts">
	import './layout.css';
	import { favicon } from '$lib';
	import { MousetrailProvider } from '$lib';
	import { SmoothScrollProvider } from '$lib';
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
	<link rel="icon" href={favicon} />
</svelte:head>

<ThemeProvider>
	<SmoothScrollProvider>
		<MousetrailProvider>
			{@render children()}
		</MousetrailProvider>
	</SmoothScrollProvider>
</ThemeProvider>
