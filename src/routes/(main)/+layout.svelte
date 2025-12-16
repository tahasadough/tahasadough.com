<script>
	import { Footer } from '$lib';
	import { Navbar } from '$lib';

	let { children } = $props();
</script>

<header class="lg:container">
	<Navbar />
</header>

<main>
	{@render children()}
</main>

<Footer />
