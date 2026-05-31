<script lang="ts">
	import { Sun, Moon } from '$lib';
	import { theme } from '$lib/theme.svelte';

	let rotating = $state(false);
	let timeoutId: ReturnType<typeof setTimeout>;

	$effect(() => {
		return () => clearTimeout(timeoutId);
	});

	const handleToggle = () => {
		rotating = true;
		theme.toggle();
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => (rotating = false), 600);
	};
</script>

<button
	onclick={handleToggle}
	aria-label={theme.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	aria-pressed={theme.current === 'light'}
	class="cursor-pointer rounded-lg p-1.5 transition-all duration-500 ease-spring hover:bg-highlight hover:text-gray {rotating
		? 'scale-110 rotate-360'
		: ''}"
>
	<div class="transition-all duration-500 {rotating ? 'scale-110' : ''}">
		{#if theme.current === 'dark'}
			<Sun size={18} />
		{:else}
			<Moon size={18} />
		{/if}
	</div>
</button>
