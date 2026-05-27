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
	class={cn(
		'rounded-2xl border border-light-black bg-almost-black px-8 py-10 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-gray/50 hover:shadow-card light:hover:border-gray/30 light:hover:shadow-card-light',
		className
	)}
	{...rest}
>
	{@render children()}
</div>
