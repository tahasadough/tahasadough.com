<script>
	import Footer from '$lib/components/layout/footer.svelte';
	import Navbar from '$lib/components/layout/nav/navbar.svelte';

	let { children } = $props();
</script>

<header class="lg:container">
	<Navbar />
</header>

<main>
	{@render children()}
</main>

<Footer />
