<script lang="ts">
	import Lenis, { type LenisOptions } from 'lenis';
	import { afterNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	const lenisDefaultOptions: LenisOptions = {
		duration: 1.2,
		easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		wheelMultiplier: 1,
		touchMultiplier: 1
	};

	let lenis: Lenis | undefined;
	let rafId: number;

	$effect(() => {
		lenis = new Lenis(lenisDefaultOptions);

		const raf = (time: number) => {
			lenis?.raf(time);
			rafId = requestAnimationFrame(raf);
		};

		rafId = requestAnimationFrame(raf);

		const handleUnload = () => {
			lenis?.scrollTo(0, { immediate: true });
		};
		window.onbeforeunload = handleUnload;

		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			lenis?.destroy();
			window.onbeforeunload = null;
		};
	});

	afterNavigate(() => {
		lenis?.scrollTo(0, { immediate: true });
	});
</script>

{@render children()}
