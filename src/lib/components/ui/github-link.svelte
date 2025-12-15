<script lang="ts">
	import favicon from '$lib/assets/favicon.ico';

	let { class: className }: { class?: string } = $props();
</script>

<a
	href="https://github.com/tahasadough"
	target="_blank"
	class="z-60 flex items-center gap-2 {className}"
>
	<img src={favicon} alt="profile" class="size-6.25 rounded-full object-cover" />
	<h2 class="font-bold">Taha Sadough</h2>
</a>
