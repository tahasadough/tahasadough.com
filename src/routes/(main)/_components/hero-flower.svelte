<script lang="ts">
	import { metalicFlower } from '$lib';
	import { Spring } from 'svelte/motion';

	let wrapper: HTMLElement;

	let scrollY = $state(0);

	let initialTop = $state(0);
	let isReady = $state(false);

	const motion = new Spring({ y: 0, r: 0 }, { stiffness: 0.03, damping: 0.6 });

	$effect(() => {
		if (wrapper && !isReady) {
			initialTop = wrapper.getBoundingClientRect().top + scrollY;
			isReady = true;
		}

		if (isReady) {
			const p = Math.max(0, Math.min(1, (scrollY - (initialTop - 500)) / 1300));

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
		<enhanced:img
			src={metalicFlower}
			alt=""
			aria-hidden="true"
			fetchpriority="high"
			sizes="(max-width: 768px) 90vw, 500px"
			onerror={({ currentTarget }) => {
				(currentTarget as HTMLElement).style.display = 'none';
			}}
			class="size-90 object-cover transition-all duration-1500 ease-smooth md:size-125 {isReady
				? 'translate-y-0 scale-100 rotate-0 opacity-90'
				: 'translate-y-7.5 -rotate-30 opacity-20'}"
		/>
	</div>
</section>
