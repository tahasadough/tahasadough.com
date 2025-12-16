<script lang="ts">
	import { cn } from '$lib';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
	}

	let { children, class: className, ...rest }: Props = $props();
</script>

<div
	class={cn('rounded-2xl border border-light-black bg-almost-black px-8 py-10', className)}
	{...rest}
>
	{@render children()}
</div>
