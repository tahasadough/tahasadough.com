<script>
	import Badge from '$lib/components/ui/badge.svelte';
	import Button from '$lib/components/ui/button.svelte';
</script>

<section id="contact" class="relative flex flex-col items-center justify-center gap-7 py-32">
	<Badge>Contact</Badge>
	<h2 class="text-center text-[32px] lg:text-5xl">
		<span class="text-gray">Let&apos;s Get </span> in Touch
	</h2>
	<p class="text-center text-[16px] text-gray">Let&apos;s start ASAP.</p>
	<a href="https://github.com/tahasadough" target="_blank" class="z-40">
		<Button variant="outline">Connect me</Button>
	</a>
	<div class="absolute inset-0 -z-10 h-full bg-black opacity-90"></div>
	<div
		class="absolute -top-20 left-0 h-[40%] w-full bg-linear-to-br from-almost-black to-black blur-3xl"
	></div>
	<div
		class="absolute top-98 bottom-0 left-0 h-[30%] w-full bg-linear-to-br from-almost-black to-black blur-3xl"
	></div>

	<img
		src="images/metalic-shape-background.webp"
		alt="metalic-shape-background"
		class="absolute inset-0 -z-20 size-full object-cover select-none"
	/>
</section>
