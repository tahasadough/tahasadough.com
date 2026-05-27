<script lang="ts">
	import About from './_components/about.svelte';
	import Contact from './_components/contact.svelte';
	import Hero from './_components/hero.svelte';
	import WhyMe from './_components/why-me.svelte';

	const title = 'Taha Sadough — Software Engineer';
	const description =
		'Software Engineer specializing in scalable, high-performance systems & APIs.';
	const url = 'https://www.tahasadough.com';
	const image = `${url}/pwa-512.png`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta
		name="keywords"
		content="taha sadough, software engineer, portfolio, full-stack developer"
	/>
	<link rel="canonical" href={url} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Taha Sadough",
			"url": "https://www.tahasadough.com",
			"jobTitle": "Software Engineer",
			"sameAs": [
				"https://github.com/TahaSadough",
				"https://www.linkedin.com/in/taha-sadough/",
				"https://medium.com/@tahasadoughdev"
			]
		}
	</script>
</svelte:head>

<Hero />
<About />
<WhyMe />
<Contact />
