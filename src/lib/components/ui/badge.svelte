<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { Snippet } from 'svelte';

	const variants = cva('cursor-pointer z-40 text-sm transition-all duration-300 hover:scale-105', {
		variants: {
			color: {
				default: 'bg-lighter-black',
				secondary: 'bg-almost-black'
			},
			size: {
				default: 'px-3 py-2',
				sm: 'px-2 py-1',
				lg: 'px-5 py-3'
			},
			rounded: {
				default: 'rounded-full',
				large: 'rounded-2xl',
				medium: 'rounded-xl',
				small: 'rounded-lg',
				xs: 'rounded-sm'
			}
		},
		defaultVariants: {
			color: 'default',
			size: 'default',
			rounded: 'default'
		}
	});

	type Props = VariantProps<typeof variants> & {
		class?: string;
		children: Snippet;
	};

	let { color, size, rounded, class: className, children }: Props = $props();

	const badgeClass = $derived(cn(variants({ color, size, rounded }), className));
</script>

<span class={badgeClass}>
	{@render children()}
</span>
