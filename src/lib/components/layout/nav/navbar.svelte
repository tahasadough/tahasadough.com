<script lang="ts">
	import ProfileLink from '$lib/components/ui/profile-link.svelte';
	import ThemeToggle from '$lib/components/ui/theme-toggle.svelte';
	import { navLinks } from './nav.constants';
	import Navmenu from './navmenu.svelte';

	let scrollY = $state(0);
	let isScrolled = $derived(scrollY > 50);
</script>

<svelte:window bind:scrollY />

<div
	class="fixed top-0 left-0 z-50 flex w-full items-center border-b p-4 text-sm transition-navbar md:px-14 md:py-6 xl:px-56 {isScrolled
		? 'border-light-black bg-almost-black/90 shadow-navbar backdrop-blur-xl'
		: 'border-transparent bg-almost-black/60 backdrop-blur-md'}"
>
	<div class="flex flex-1 items-center">
		<ProfileLink class="z-50" href="home" />
	</div>

	<nav aria-label="Desktop navigation" class="hidden md:block">
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

	<div class="flex flex-1 items-center justify-end gap-4">
		<ThemeToggle />
		<Navmenu />
	</div>
</div>
