<script lang="ts">
	import type { Link } from '$lib/types/types.common';
	import GithubLink from '../ui/github-link.svelte';

	type FooterLink = Link & {
		target?: '_blank';
	};

	const footerLinks: FooterLink[] = [
		{
			href: 'https://github.com/TahaSadough',
			name: 'Github',
			target: '_blank'
		},
		{
			href: 'https://www.linkedin.com/in/taha-sadough/',
			name: 'Linkedin',
			target: '_blank'
		},
		{ href: 'https://medium.com/@@tahasadoughdev', name: 'Medium' }
	];
</script>

<footer class="container pt-16 pb-12">
	<div class="flex flex-col space-y-6 md:flex-row md:justify-between md:space-y-0">
		<div class="space-y-3">
			<GithubLink />
			<p class="w-[60%] text-sm md:w-[40%]">
				Software Engineer | Architecting Scalable, High-Performance Systems & APIs
			</p>
			<a href="mailto:tsadough.eng@gmail.com" class="transition-all duration-500 hover:text-gray">
				tsadough.eng@gmail.com
			</a>
		</div>

		<nav aria-label="Footer navigation" class="z-10 flex flex-col gap-8 text-sm">
			{#each footerLinks as link, i (i)}
				<a
					href={link.href}
					target={link.target}
					aria-label={link.name}
					class="transition-all duration-500 hover:text-gray"
				>
					{link.name}
				</a>
			{/each}
		</nav>
	</div>

	<div class="my-10 h-px bg-light-black"></div>

	<p
		class="bg-linear-to-tr from-light-black to-gray bg-clip-text text-center text-[40px] text-nowrap text-transparent md:text-[100px] lg:text-[130px] xl:text-[170px] 2xl:text-[185px]"
	>
		Taha Sadough
	</p>
</footer>
