<script lang="ts">
	import HeroFlower from './hero-flower.svelte';
	import { Badge } from '$lib';
	import { Button } from '$lib';
</script>

<section
	id="home"
	class="container flex flex-col items-center justify-center space-y-11.25 pt-36 pb-10 md:space-y-16 md:pt-30 md:pb-0 lg:space-y-25 lg:pt-35"
>
	<div class="flex flex-col items-center justify-center gap-9">
		<Badge>Hello, I&apos;m Taha 👋</Badge>

		<h1 class="text-center text-3xl leading-none sm:text-5xl md:text-6xl">
			<span
				class="animate-gradient bg-200 bg-linear-to-r from-on-surface via-gray to-on-surface bg-clip-text text-transparent"
			>
				Software Engineer
			</span>
			<span class="text-gray"> Architecting Scalable, High-Performance Systems & APIs </span>
		</h1>

		<Button variant="outline" href="https://github.com/tahasadough" target="_blank"
			>Connect me</Button
		>
	</div>

	<HeroFlower />
</section>
