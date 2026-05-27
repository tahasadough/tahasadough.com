<script lang="ts">
	import { theme } from '$lib/theme.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	$effect(() => {
		document.documentElement.classList.toggle('light', theme.current === 'light');
	});
</script>

{@render children()}
