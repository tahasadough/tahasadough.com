<script lang="ts">
	import './layout.css';
	import { favicon } from '$lib';
	import { MousetrailProvider } from '$lib';
	import { SmoothScrollProvider } from '$lib';
	import { ThemeProvider } from '$lib';

	let { children } = $props();
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
