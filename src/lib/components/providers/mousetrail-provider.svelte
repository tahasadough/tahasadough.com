<script>
	import { Spring } from 'svelte/motion';
	import { screen } from '$lib/stores/screen.svelte';

	const coords = new Spring({ x: 50, y: 50 }, { stiffness: 0.1, damping: 2 });
	const size = new Spring(7, { stiffness: 0.1, damping: 2 });

	let { children } = $props();

	$effect(() => {
		if (!screen.isDesktop) return;

		const controller = new AbortController();
		const { signal } = controller;

		window.addEventListener('mousemove', (e) => (coords.target = { x: e.clientX, y: e.clientY }), {
			signal
		});
		window.addEventListener('mousedown', () => (size.target = 20), { signal });
		window.addEventListener('mouseup', () => (size.target = 7), { signal });

		return () => controller.abort();
	});
</script>

{#if screen.isDesktop}
	<div
		class="pointer-events-none fixed z-1000 rounded-full bg-white mix-blend-difference"
		style="
			width: {size.current * 2}px;
			height: {size.current * 2}px;
			transform: translate3d({coords.current.x}px, {coords.current.y}px, 0) translate(-50%, -50%);
			will-change: transform;
		"
	></div>
{/if}

{@render children()}
