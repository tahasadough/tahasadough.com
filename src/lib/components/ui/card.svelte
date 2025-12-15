<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<div class={cn('rounded-2xl border border-light-black bg-almost-black px-8 py-10', className)}>
	{@render children()}
</div>
