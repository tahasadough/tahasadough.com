<script lang="ts">
	import { cn } from '$lib';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	const variants = cva(
		'cursor-pointer bg-lighter-black z-40 text-sm transition-all duration-300 hover:scale-105',
		{
			variants: {
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
				size: 'default',
				rounded: 'default'
			}
		}
	);

	interface Props extends VariantProps<typeof variants>, HTMLAttributes<HTMLSpanElement> {
		children: Snippet;
	}

	let { size, rounded, class: className, children, ...rest }: Props = $props();

	const badgeClass = $derived(cn(variants({ size, rounded }), className));
</script>

<span class={badgeClass} {...rest}>
	{@render children()}
</span>
