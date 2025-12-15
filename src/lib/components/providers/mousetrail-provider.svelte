<script lang="ts">
	import { screen } from '$lib/stores/screen.svelte';
	import mouseTrail from '@codemasters/mousetrail';

	$effect(() => {
		if (screen.isDesktop) mouseTrail();
		else mouseTrail.distroy();

		return () => mouseTrail.distroy();
	});

	let { children } = $props();
</script>

{@render children()}
