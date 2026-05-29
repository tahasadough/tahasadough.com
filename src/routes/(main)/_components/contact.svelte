<script lang="ts">
	import { Badge } from '$lib';
	import { metalicShape } from '$lib';
	import { Button } from '$lib';
</script>

<section id="contact" class="relative flex flex-col items-center justify-center gap-7 py-32">
	<Badge>Contact</Badge>
	<h2 class="text-center text-3xl lg:text-5xl">
		<span class="text-gray">Let&apos;s Get </span> in Touch
	</h2>
	<p class="text-center text-base text-gray">Let&apos;s start ASAP.</p>
	<Button variant="outline" href="https://github.com/tahasadough" target="_blank" class="z-40"
		>Connect me</Button
	>
	<div class="absolute inset-0 -z-10 h-full bg-surface opacity-90"></div>
	<div
		class="animate-blob absolute -top-20 left-0 h-2/5 w-full bg-linear-to-br from-almost-black to-surface blur-3xl"
	></div>
	<div
		class="animate-blob absolute top-98 bottom-0 left-0 h-1/3 w-full bg-linear-to-br from-almost-black to-surface blur-3xl"
		style="animation-delay: -5s; animation-duration: 12s;"
	></div>

	<enhanced:img
		src={metalicShape}
		alt=""
		aria-hidden="true"
		loading="lazy"
		onerror={({ currentTarget }) => {
			(currentTarget as HTMLElement).style.display = 'none';
		}}
		class="absolute inset-0 -z-20 size-full object-cover select-none"
	/>
</section>
