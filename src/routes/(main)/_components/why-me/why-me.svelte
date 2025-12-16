<script lang="ts">
	import { Card } from '$lib';
	import { Badge } from '$lib';
	import { Clock, LucideType, MessageSquare, Search } from 'lucide-svelte';

	interface Card {
		title: string;
		description: string;
		icon: typeof LucideType;
	}

	const cards: Card[] = [
		{
			title: 'Efficient Workflow',
			description:
				'Streamlined developing process for rapid deliver without compromising quality or detail.',
			icon: Clock
		},
		{
			title: 'Collaborative Process',
			description:
				'I work closely with you, integrating your feedback to create fantastic softwares and amazing experiences',
			icon: MessageSquare
		},
		{
			title: 'Attention to Detail',
			description:
				'Meticulous attention to everything, ensuring a polished and cohesive final application that impresses.',
			icon: Search
		}
	];
</script>

{#snippet whyMeCard(title: string, text: string, Icon: typeof LucideType)}
	<Card class="space-y-6">
		<div
			class="flex size-12 items-center justify-center rounded-lg border border-light-black bg-lighter-black"
		>
			<Icon />
		</div>
		<h3 class="text-xl">{title}</h3>
		<p class="text-[16px] text-gray">{text}</p>
	</Card>
{/snippet}

<section id="why-me" class="container flex flex-col items-center justify-center gap-10 pt-24 pb-20">
	<Badge>Why me?</Badge>

	<h2 class="px-2 text-center text-[32px] leading-none lg:px-0 lg:text-5xl">
		I create epic apps that <span class="text-gray">spark</span>
		your imagination!
	</h2>

	<div class="grid gap-8 md:grid-cols-3">
		{#each cards as card (card.title)}
			{@render whyMeCard(card.title, card.description, card.icon)}
		{/each}
	</div>
</section>
