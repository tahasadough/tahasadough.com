<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	const variants = cva('rounded-2xl border border-muted bg-elevated', {
		variants: {
			variant: {
				default: 'px-8 py-10',
				ghost: 'p-0'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	});

	interface Props extends VariantProps<typeof variants>, HTMLAttributes<HTMLDivElement> {
		children: Snippet;
	}

	let { variant, class: className, children, ...rest }: Props = $props();

	const cardClass = $derived(
		className ? `${variants({ variant })} ${className}` : variants({ variant })
	);
</script>

<div class={cardClass} {...rest}>
	{@render children()}
</div>
