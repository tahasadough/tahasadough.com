<script>
	import { favicon } from '$lib';
	import { Badge } from '$lib';
	import { Card } from '$lib';
</script>

<section
	id="about"
	class="container flex flex-col items-center justify-center pt-30 md:flex-col-reverse lg:flex-row"
>
	<Card class="p-5 sm:size-[70%] lg:size-full">
		<img src={favicon} alt="taha-sadough" class="size-full rounded-md object-cover" />
	</Card>
	<div class="space-y-8 py-10 md:px-10">
		<div class="flex justify-center">
			<Badge>About</Badge>
		</div>
		<h2 class="text-center text-2xl text-gray md:text-4xl lg:text-5xl">
			I&apos;m a <span class="text-white">Software Engineer</span>
		</h2>
		<p class="text-center text-[16px] text-gray">
			As a Software Engineer, I specialize in architecting scalable, high-performance systems.I
			believe in the &apos;right tool for the job &apos; philosophy. I design robust architectures
			tailored to the specific needs of the product—ranging from efficient, maintainable Modular
			Monoliths, to distributed Microservices when extreme scale demands it.
		</p>
	</div>
</section>
