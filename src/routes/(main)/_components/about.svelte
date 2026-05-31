<script lang="ts">
	import { tahaSadoughLg } from '$lib';
	import { Badge } from '$lib';
	import { Card } from '$lib';
</script>

<section
	id="about"
	class="container flex flex-col items-center justify-center pt-30 md:flex-col-reverse lg:flex-row"
>
	<Card variant="ghost" class="aspect-square overflow-hidden sm:w-7/10 lg:w-full">
		<enhanced:img
			src={tahaSadoughLg}
			alt="Taha Sadough, Software Engineer"
			loading="lazy"
			onerror={({ currentTarget }) => {
				(currentTarget as HTMLElement).style.display = 'none';
			}}
			class="size-full object-cover transition-all duration-700 hover:scale-105"
		/>
	</Card>
	<div class="space-y-8 py-10 md:px-10">
		<div class="flex justify-center">
			<Badge>About</Badge>
		</div>
		<h2 class="text-center text-2xl text-gray md:text-4xl lg:text-5xl">
			I&apos;m a <span class="text-on-surface">Software Engineer</span>
		</h2>
		<p class="text-center text-base text-gray">
			As a Software Engineer, I specialize in architecting scalable, high-performance systems.I
			believe in the &apos;right tool for the job &apos; philosophy. I design robust architectures
			tailored to the specific needs of the product—ranging from efficient, maintainable Modular
			Monoliths, to distributed Microservices when extreme scale demands it.
		</p>
	</div>
</section>
