<script lang="ts">
	import type { Link } from '$lib/types';
	import ProfileLink from '../ui/profile-link.svelte';

	interface FooterLink extends Link {
		target?: '_blank';
	}

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
		{
			href: 'https://medium.com/@@tahasadoughdev',
			name: 'Medium'
		}
	];
</script>

<footer class="container pt-16 pb-12">
	<div class="flex flex-col space-y-6 md:flex-row md:justify-between md:space-y-0">
		<div class="space-y-3">
			<ProfileLink href="github" />
			<p class="w-3/5 text-sm md:w-2/5">
				Software Engineer | Architecting Scalable, High-Performance Systems & APIs
			</p>
			<a
				href="mailto:tsadough.eng@gmail.com"
				class="relative w-fit transition-all duration-500 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-gray after:transition-transform after:duration-500 hover:text-gray hover:after:origin-left hover:after:scale-x-100"
			>
				tsadough.eng@gmail.com
			</a>
		</div>

		<nav aria-label="Footer navigation" class="z-10 flex flex-col gap-8 text-sm">
			{#each footerLinks as link, i (i)}
				<a
					href={link.href}
					target={link.target}
					rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
					class="relative w-fit transition-all duration-500 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-gray after:transition-transform after:duration-500 hover:text-gray hover:after:origin-left hover:after:scale-x-100"
				>
					{link.name}
				</a>
			{/each}
		</nav>
	</div>

	<div class="my-10 h-px bg-light-black"></div>

	<p
		class="bg-linear-to-tr from-light-black to-gray bg-clip-text text-center text-4xl text-nowrap text-transparent md:text-8xl lg:text-9xl xl:text-[10.625rem] 2xl:text-[11.5625rem]"
	>
		Taha Sadough
	</p>
</footer>
