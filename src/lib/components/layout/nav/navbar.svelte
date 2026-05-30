<script lang="ts">
	import { tahaSadoughSm } from '$lib';
	import ThemeToggle from '$lib/components/ui/theme-toggle.svelte';
	import { navLinks } from './nav';
	import Navmenu from './navmenu.svelte';

	let scrollY = $state(0);
	let isScrolled = $derived(scrollY > 50);
</script>

<svelte:window bind:scrollY />

<div
	class="fixed top-0 left-0 z-50 flex w-full items-center border-b p-4 text-sm transition-navbar md:px-14 md:py-6 xl:px-56 {isScrolled
		? 'border-muted bg-elevated/90 shadow-navbar backdrop-blur-xl'
		: 'border-transparent bg-elevated/60 backdrop-blur-md'}"
>
	<div class="flex flex-1 items-center">
		<a href="/" class="group z-60 flex items-center gap-2">
			<enhanced:img
				src={tahaSadoughSm}
				alt=""
				aria-hidden="true"
				onerror={({ currentTarget }) => {
					(currentTarget as HTMLElement).style.display = 'none';
				}}
				class="size-6.5 rounded-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:ring-2 group-hover:ring-gray/50"
			/>
			<span class="font-bold transition-all duration-500 group-hover:text-gray">Taha Sadough</span>
		</a>
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
