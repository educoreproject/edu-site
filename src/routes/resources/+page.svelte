<script lang="ts">
	import Card from '$lib/components/site/Card.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PageCtas from '$lib/components/site/PageCtas.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { ResourcesHubPage, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: ResourcesHubPage;
			chrome: SiteChrome;
		};
	};

	let { data }: Props = $props();
	let page = $derived(data.page);
	let chrome = $derived(data.chrome);
</script>

<svelte:head>
	<title>{page.hero.title}</title>
	<meta
		name="description"
		content={page.hero.description ?? 'Resources from Education Data Unlimited and the DSU community.'}
	/>
</svelte:head>

<PrimaryNav links={chrome.primaryNav} footerColumns={chrome.footerColumns} activeSection={page.activeSection} activeSubSection="Library" />
<SubNav crumb="Resources" links={page.subNav} active="Library" />

<main>
	<Hero content={page.hero} background="teal" icon="resource" />

	<section class="section section-padded library" aria-labelledby="resources-heading">
		<Container width="wide">
			<div class="section-header">
				<p class="eyebrow">{page.eyebrow}</p>
				<h2 id="resources-heading">{page.heading}</h2>
			</div>

			<div class="card-grid">
				{#each page.cards as card}
					<Card
						as="a"
						variant="resource"
						tone="gold"
						eyebrow={card.meta}
						title={card.title}
						body={card.description}
						linkLabel={card.cta.label}
						href={card.cta.href}
					/>
				{/each}
			</div>
		</Container>
	</section>

	<PageCtas ctas={page.ctas} />
</main>

<PageFooter {chrome} />
