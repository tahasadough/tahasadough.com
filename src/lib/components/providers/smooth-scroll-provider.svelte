<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	$effect(() => {
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (prefersReduced.matches) return;

		let target = window.scrollY;
		let current = window.scrollY;
		let rafId: number;

		const clamp = (v: number) =>
			Math.max(0, Math.min(v, document.documentElement.scrollHeight - window.innerHeight));

		const startLoop = () => {
			if (!rafId) rafId = requestAnimationFrame(tick);
		};

		const onWheel = (e: WheelEvent) => {
			e.preventDefault();
			let delta = e.deltaY;
			if (e.deltaMode === 1) delta *= 30;
			target = clamp(target + delta);
			startLoop();
		};

		const onClick = (e: MouseEvent) => {
			const link = (e.target as HTMLElement).closest('a[href^="#"]');
			if (!link) return;
			const href = (link as HTMLAnchorElement).getAttribute('href');
			if (!href || href === '#') return;
			const id = href.slice(1);
			if (!document.getElementById(id)) return;
			e.preventDefault();
			target = clamp(document.getElementById(id)!.getBoundingClientRect().top + window.scrollY);
			current = window.scrollY;
			startLoop();
		};

		const tick = () => {
			const diff = target - current;
			if (Math.abs(diff) > 0.5) {
				current += diff * 0.09;
				window.scrollTo(0, Math.round(current));
				rafId = requestAnimationFrame(tick);
			} else {
				current = target;
				rafId = 0;
			}
		};

		window.addEventListener('wheel', onWheel, { passive: false });
		document.addEventListener('click', onClick);
		rafId = requestAnimationFrame(tick);

		return () => {
			window.removeEventListener('wheel', onWheel);
			document.removeEventListener('click', onClick);
			cancelAnimationFrame(rafId);
		};
	});

	afterNavigate(() => {
		window.scrollTo(0, 0);
	});
</script>

{@render children()}
