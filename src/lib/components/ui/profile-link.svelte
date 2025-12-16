<script lang="ts">
	import { tahaSadoughSm } from '$lib';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLAnchorElement> {
		href?: 'github' | 'home';
	}

	let { class: className, href = 'home', ...rest }: Props = $props();
</script>

<a
	href={href == 'github' ? 'https://github.com/tahasadough' : '/'}
	target={href == 'github' ? '_blank' : ''}
	class="z-60 flex items-center gap-2 {className}"
	{...rest}
>
	<enhanced:img src={tahaSadoughSm} alt="profile" class="size-6.5 rounded-full object-cover" />
	<h2 class="font-bold">Taha Sadough</h2>
</a>
