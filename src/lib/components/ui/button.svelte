<script lang="ts">
	import { cn } from '$lib';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributeAnchorTarget, HTMLAttributes } from 'svelte/elements';

	const variants = cva(
		'cursor-pointer rounded-3xl font-bold transition-all duration-500 hover:scale-105 hover:shadow-lg hover:bg-white hover:text-elevated light:hover:bg-black light:hover:text-white light:hover:shadow-black/20',
		{
			variants: {
				variant: {
					default: 'bg-elevated',
					outline: 'border-gray border'
				},
				size: {
					default: 'px-8 py-2.5',
					sm: 'px-3 py-1',
					lg: 'px-6 py-3 text-lg'
				}
			},
			defaultVariants: {
				variant: 'default',
				size: 'default'
			}
		}
	);

	interface Props extends VariantProps<typeof variants>, HTMLAttributes<HTMLButtonElement> {
		href?: string;
		target?: HTMLAttributeAnchorTarget;
		children: Snippet;
	}

	let { variant, size, class: className, href, target, children, ...rest }: Props = $props();

	const buttonClass = $derived(cn(variants({ variant, size }), className));
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	role={href ? undefined : 'button'}
	{href}
	class={buttonClass}
	{target}
	rel={target === '_blank' ? 'noopener noreferrer' : undefined}
	{...rest}
>
	{@render children()}
</svelte:element>
