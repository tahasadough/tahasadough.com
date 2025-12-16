<script>
	import HeroMetalicFlower from './hero-metalic-flower.svelte';
	import { Badge } from '$lib';
	import { Button } from '$lib';
</script>

<section
	class="container flex flex-col items-center justify-center space-y-11.25 px-2 pt-36 pb-10 md:space-y-16 md:px-8 md:pt-30 md:pb-0 lg:space-y-25 lg:px-10 lg:pt-35"
>
	<div class="flex flex-col items-center justify-center gap-9">
		<Badge>Hello, I&apos;m Taha 👋</Badge>

		<h1 class="text-center text-[2rem] leading-none sm:text-[3rem] md:text-[4rem]">
			Software Engineer
			<span class="text-gray"> Architecting Scalable, High-Performance Systems & APIs </span>
		</h1>

		<Button variant="outline" href="https://github.com/tahasadough" target="_blank"
			>Connect me</Button
		>
	</div>

	<HeroMetalicFlower />
</section>
