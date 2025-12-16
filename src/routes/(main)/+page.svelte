<script>
	import { favicon } from '$lib';
	import About from './_components/about/about.svelte';
	import Contact from './_components/contact/contact.svelte';
	import Hero from './_components/hero/hero.svelte';
	import WhyMe from './_components/why-me/why-me.svelte';

	const metaData = {
		title: 'Taha Sadough',
		description: 'Developing High-Performance & Scalable Applications',
		url: 'https://www.tahasadough.com',
		image: favicon
	};
</script>

<svelte:head>
	<title>{metaData.title}</title>
	<meta name="description" content={metaData.description} />
	<meta name="keywords" content="taha sadough, portfolio, software engineer, developer" />
	<link rel="canonical" href={metaData.url} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={metaData.url} />
	<meta property="og:title" content={metaData.title} />
	<meta property="og:description" content={metaData.description} />
	<meta property="og:image" content={metaData.image} />
</svelte:head>

<Hero />
<About />
<WhyMe />
<Contact />
