<script lang="ts">
	import { tahaSadoughSm } from '$lib';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLAnchorElement> {
		href?: 'github' | 'home';
	}

	let { class: className, href = 'home', ...rest }: Props = $props();
</script>

<a
	href={href === 'github' ? 'https://github.com/tahasadough' : '#home'}
	target={href === 'github' ? '_blank' : ''}
	class="group z-60 flex items-center gap-2 {className}"
	{...rest}
>
	<enhanced:img
		src={tahaSadoughSm}
		alt="Taha Sadough"
		class="size-6.5 rounded-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:ring-2 group-hover:ring-gray/50"
	/>
	<span class="font-bold transition-all duration-500 group-hover:text-gray">Taha Sadough</span>
</a>
