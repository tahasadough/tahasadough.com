<script>
	import favicon from '$lib/assets/favicon.ico';
	import Badge from '$lib/components/ui/badge.svelte';
	import Card from '$lib/components/ui/card.svelte';
</script>

<section
	id="about"
	class="container flex flex-col items-center justify-center pt-30 md:flex-col-reverse lg:flex-row"
>
	<Card class="p-5 sm:size-[70%] lg:size-full">
		<img src={favicon} alt="taha-sadough" class="size-full rounded-md object-cover" />
	</Card>
	<div class="space-y-8 py-10 md:px-10">
		<div class="flex justify-start md:justify-center">
			<Badge>About</Badge>
		</div>
		<h2 class="text-2xl text-gray md:text-center md:text-4xl lg:text-5xl">
			I&apos;m a <span class="text-white">Software Engineer</span>
		</h2>
		<p class="text-[16px] text-gray md:text-center">
			As a Software Engineer, I specialize in architecting scalable, high-performance systems.I
			believe in the &apos;right tool for the job &apos; philosophy. I design robust architectures
			tailored to the specific needs of the product—ranging from efficient, maintainable Modular
			Monoliths, to distributed Microservices when extreme scale demands it.
		</p>
	</div>
</section>
