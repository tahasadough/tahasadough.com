<script lang="ts">
	import { favicon } from '$lib';

	interface Props {
		class?: string;
		href?: 'github' | 'home';
	}

	let { class: className, href = 'home' }: Props = $props();
</script>

<a
	href={href == 'github' ? 'https://github.com/tahasadough' : '/'}
	target={href == 'github' ? '_blank' : ''}
	class="z-60 flex items-center gap-2 {className}"
>
	<img src={favicon} alt="profile" class="size-6.25 rounded-full object-cover" />
	<h2 class="font-bold">Taha Sadough</h2>
</a>
