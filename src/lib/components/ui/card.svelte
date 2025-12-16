<script lang="ts">
	import { cn } from '$lib';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		class?: string;
	}

	let { children, class: className }: Props = $props();
</script>

<div class={cn('rounded-2xl border border-light-black bg-almost-black px-8 py-10', className)}>
	{@render children()}
</div>
