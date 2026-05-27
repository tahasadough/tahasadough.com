<script lang="ts">
	import { slide, fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { browser } from '$app/environment';
	import { navLinks } from './nav.constants';

	let isToggled = $state(false);
	let triggerRef = $state<HTMLButtonElement>();
	let menuRef = $state<HTMLElement>();

	const toggleMenu = () => {
		const next = !isToggled;
		isToggled = next;
		if (next) {
			requestAnimationFrame(() => {
				menuRef?.querySelector('a')?.focus();
			});
		} else if (browser) {
			triggerRef?.focus();
		}
	};

	const closeMenu = () => {
		isToggled = false;
		triggerRef?.focus();
	};

	$effect(() => {
		if (!isToggled || !browser) return;

		function onKeydown(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				closeMenu();
				return;
			}
			if (e.key !== 'Tab') return;

			const focusable = menuRef?.querySelectorAll<HTMLElement>('a, button');
			if (!focusable || focusable.length === 0) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}

		window.addEventListener('keydown', onKeydown);
		return () => window.removeEventListener('keydown', onKeydown);
	});
</script>

{#snippet burgerLine(baseClass: string, activeClass: string)}
	<span
		class="h-0.5 w-full rounded-full bg-on-surface duration-300 ease-in-out {baseClass} {isToggled
			? activeClass
			: ''}"
	></span>
{/snippet}

<div class="md:hidden">
	<button
		bind:this={triggerRef}
		onclick={toggleMenu}
		aria-expanded={isToggled}
		aria-controls="mobile-menu"
		class="relative z-50 flex h-5 w-6 flex-col items-center justify-center gap-2 focus:outline-none"
		aria-label="Toggle Menu"
	>
		{@render burgerLine('origin-center', 'rotate-45 translate-y-[5px]')}
		{@render burgerLine('origin-center', '-rotate-45 -translate-y-[5px]')}
	</button>

	{#if isToggled}
		<nav
			bind:this={menuRef}
			id="mobile-menu"
			aria-label="Mobile menu"
			tabindex="-1"
			transition:slide={{ duration: 400, axis: 'y', easing: quintOut }}
			class="fixed top-0 right-0 z-40 w-full border-b border-light-black bg-almost-black/95 backdrop-blur-lg"
		>
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
	{/if}
</div>
