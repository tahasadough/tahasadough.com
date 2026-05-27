<script lang="ts">
	import { metalicFlower } from '$lib';
	import { Spring } from 'svelte/motion';

	let wrapper: HTMLElement;

	let scrollY = $state(0);

	let isReady = $state(false);

	const motion = new Spring({ y: 0, r: 0 }, { stiffness: 0.05, damping: 0.7 });

	$effect(() => {
		if (wrapper) {
			if (!isReady) {
				isReady = true;
			}

			const top = wrapper.getBoundingClientRect().top + scrollY - motion.current.y;

			const p = Math.max(0, Math.min(1, (scrollY - (top - 500)) / 1300));

			motion.target = { y: p * 230, r: p * 45 };
		}
	});
</script>

<svelte:window bind:scrollY />

<section class="relative -z-50 select-none">
	<div
		bind:this={wrapper}
		style:transform="translateY({motion.current.y}px) rotate({motion.current.r}deg)"
	>
		<div
			class="transition-all duration-1500 ease-smooth {isReady
				? 'translate-y-0 scale-100 rotate-0 opacity-100'
				: 'translate-y-7.5 -rotate-30 opacity-20'}"
		>
			<enhanced:img
				src={metalicFlower}
				alt=""
				aria-hidden="true"
				fetchpriority="high"
				class="size-90 object-cover md:size-125"
			/>
			<div
				class="absolute top-0 -z-50 w-full rounded-full bg-on-surface py-64 opacity-10 blur-3xl"
			></div>
			<div
				class="absolute right-0 bottom-0 left-0 h-1/4 bg-linear-to-t from-surface to-transparent"
			></div>
		</div>
	</div>

	<div
		class="absolute top-2/5 z-50 h-150 w-full bg-linear-to-tr from-almost-black to-surface opacity-85 blur-3xl"
	></div>
	<div
		class="absolute top-4/5 z-50 h-150 w-full bg-linear-to-tr from-almost-black to-surface blur-3xl"
	></div>
</section>
