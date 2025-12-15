<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { Snippet } from 'svelte';

	const variants = cva(
		'cursor-pointer rounded-3xl font-bold transition-all duration-500 hover:bg-white hover:text-almost-black',
		{
			variants: {
				variant: {
					default: 'bg-almost-black',
					outline: 'border-gray border'
				},
				size: {
					default: 'px-8 py-[0.63rem]',
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

	interface Props extends VariantProps<typeof variants> {
		class?: string;
		children: Snippet;
	}

	let { variant, size, class: className, children }: Props = $props();

	const buttonClass = $derived(cn(variants({ variant, size }), className));
</script>

<button class={buttonClass}>
	{@render children()}
</button>
