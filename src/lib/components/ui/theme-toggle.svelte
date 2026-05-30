<script lang="ts">
	import { theme } from '$lib/theme.svelte';
	import { Sun, Moon } from '$lib';

	let rotating = $state(false);
	let timeoutId: ReturnType<typeof setTimeout>;

	$effect(() => {
		return () => clearTimeout(timeoutId);
	});

	function handleToggle() {
		rotating = true;
		theme.toggle();
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => (rotating = false), 600);
	}
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
