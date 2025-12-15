<script lang="ts">
	import { slide, fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { navLinks } from './nav.contants';

	let isToggled = $state(false);

	const toggleMenu = () => (isToggled = !isToggled);

	const closeMenu = () => (isToggled = false);
</script>

{#snippet burgerLine(baseClass: string, activeClass: string)}
	<span
		class="h-0.5 w-full rounded-full bg-white duration-300 ease-in-out {baseClass} {isToggled
			? activeClass
			: ''}"
	></span>
{/snippet}

<div class="md:hidden">
	<button
		onclick={toggleMenu}
		class="relative z-50 flex h-5 w-6 flex-col items-center justify-center gap-2 focus:outline-none"
		aria-label="Toggle Menu"
	>
		{@render burgerLine('transition-transform origin-center', 'rotate-45 translate-y-[5px]')}
		{@render burgerLine('transition-transform origin-center', '-rotate-45 -translate-y-[5px]')}
	</button>

	{#if isToggled}
		<div
			transition:slide={{ duration: 400, axis: 'y', easing: quintOut }}
			class="fixed top-0 right-0 z-40 w-full border-b border-light-black bg-almost-black"
		>
			<nav aria-label="mobile menu navigation">
				<div in:fly={{ duration: 400, opacity: 0 }} class="border-t-2 border-light-black"></div>

				<ul class="space-y-5 px-5 pt-16 pb-10 text-lg">
					{#each navLinks as link, i (i)}
						<li>
							<a
								in:fly={{ x: -30, duration: 400, delay: i * 50 }}
								out:fade={{ duration: 200 }}
								href={link.href}
								onclick={closeMenu}
								class="navmenu-link block transition-all duration-500 hover:text-gray"
							>
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	{/if}
</div>
