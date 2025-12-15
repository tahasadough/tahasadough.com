<script lang="ts">
	import GithubLink from '$lib/components/ui/github-link.svelte';
	import { navLinks } from './nav.contants';
	import Navmenu from './navmenu.svelte';
</script>

<div
	class="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-light-black p-4 text-sm backdrop-blur md:px-14 md:py-6 xl:px-56"
>
	<GithubLink class="z-50" />

	<nav class="hidden md:block">
		<ul class="flex gap-8">
			{#each navLinks as link, i (i)}
				<li>
					<a href={link.href} class="transition-all duration-500 hover:text-gray">
						{link.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<Navmenu />
</div>
