<script lang="ts">
	import Button from '$lib/components/site/Button.svelte';
	import Card from '$lib/components/site/Card.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageCtas from '$lib/components/site/PageCtas.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import SectionChrome from '$lib/components/site/SectionChrome.svelte';
	import type {
		CedsOverviewPage,
		ResourceCard,
		SectionHeader,
		SiteChrome
	} from '$lib/content/types';

	type Props = {
		data: {
			page: CedsOverviewPage;
			chrome: SiteChrome;
		};
	};

	let { data }: Props = $props();
	let page = $derived(data.page);
	let chrome = $derived(data.chrome);
</script>

{#snippet richText(blocks: SectionHeader['body'])}
	{#each blocks ?? [] as block}
		{#if block._type === 'block'}
			<p>
				{#each block.children ?? [] as span}
					{@const isStrong = span.marks?.includes('strong')}
					{@const isEm = span.marks?.includes('em')}
					{#if isStrong && isEm}
						<strong><em>{span.text}</em></strong>
					{:else if isStrong}
						<strong>{span.text}</strong>
					{:else if isEm}
						<em>{span.text}</em>
					{:else}
						{span.text}
					{/if}
				{/each}
			</p>
		{/if}
	{/each}
{/snippet}

{#snippet sectionHeader(header: SectionHeader, headingId: string)}
	<div class="section-header">
		{#if header.eyebrow}
			<p class="eyebrow">{header.eyebrow}</p>
		{/if}
		{#if header.heading}
			<h2 id={headingId}>{header.heading}</h2>
		{/if}
		{@render richText(header.body)}
	</div>
{/snippet}

{#snippet resourceLink(card: ResourceCard, tone: 'teal' | 'gold' | 'navy' | 'violet' = 'teal')}
	<Card
		as="a"
		href={card.cta.href}
		target={card.cta.target}
		rel={card.cta.rel}
		download={card.cta.download}
		variant="plain"
		{tone}
		eyebrow={card.meta}
		title={card.title}
		body={card.description}
		linkLabel={card.cta.label}
	/>
{/snippet}

<svelte:head>
	<title>{page.hero.title}</title>
	<meta
		name="description"
		content={page.hero.description ?? 'Common Education Data Standards overview.'}
	/>
</svelte:head>

<SectionChrome {chrome} routeKey="cedsOverview" />

<main>
	<Hero content={page.hero} background="teal" icon="world" />

	<section class="section section-padded intro" aria-labelledby="overview-heading">
		<Container width="wide">
			<div class="intro-layout">
				<article class="intro-copy">
					{@render sectionHeader(page.overview, 'overview-heading')}
				</article>

				<aside class="fact-panel" aria-label="Common Education Data Standards overview">
					{#if page.logoImage?.url}
						<img
							class="ceds-logo"
							src={page.logoImage.url}
							alt={page.logoImage.alt || 'Common Education Data Standards'}
						/>
					{/if}
					<dl>
						<div>
							<dt>Scope</dt>
							<dd>P-20W education data</dd>
						</div>
						<div>
							<dt>Standard</dt>
							<dd>17,000+ elements, definitions, and option sets</dd>
						</div>
						<div>
							<dt>Access</dt>
							<dd>Open-source and community-driven</dd>
						</div>
					</dl>
					<Button href="https://cedstandards.gitbook.io/ceds-gitbook" label="Open CEDS GitBook" variant="gold" />
				</aside>
			</div>
		</Container>
	</section>

	<section class="section section-padded bg-surface" aria-labelledby="reasons-heading">
		<Container width="wide">
			<div class="split-heading">
				<div>
					<p class="eyebrow">Why Use CEDS?</p>
					<h2 id="reasons-heading">What CEDS makes possible</h2>
				</div>
				<p>
					CEDS gives education data teams a shared vocabulary and technical foundation for understanding,
					mapping, and exchanging data across systems.
				</p>
			</div>

			<div class="card-grid three-up">
				{#each page.reasons as reason}
					<Card variant="plain" tone="teal" title={reason.label} body={reason.text} />
				{/each}
			</div>
		</Container>
	</section>

	<section class="section section-padded" aria-labelledby="models-heading">
		<Container width="wide">
			<div class="horizontal-layout">
				<div class="section-header">
					<p class="eyebrow">Data Models</p>
					<h2 id="models-heading">Data models</h2>
					<p>
						CEDS is expressed through multiple models so implementers can understand the standard,
						describe relationships, store operational data, and support longitudinal reporting.
					</p>
				</div>

				<ol class="model-list" aria-labelledby="models-heading">
					{#each page.dataModels as model}
						<Card variant="count" as="li" tone="gold" title={model.label} body={model.text} />
					{/each}
				</ol>
			</div>
		</Container>
	</section>

	<section class="section section-padded learning bg-surface" aria-labelledby="learning-heading">
		<Container width="wide">
			<div class="split-heading">
				<div>
					<p class="eyebrow">Webinars and Resources</p>
					<h2 id="learning-heading">Webinars and resources</h2>
				</div>
				<p>
					Start with the GitBook, then use the webinar archive, data model guide, and resource library
					to go deeper into implementation details.
				</p>
			</div>

			<div class="card-grid">
				{#each page.learningLinks as link}
					{@render resourceLink(link, 'navy')}
				{/each}
			</div>
		</Container>
	</section>

	<section class="section section-padded community" aria-labelledby="community-heading">
		<Container width="narrow">
			<article class="text-section">
				{@render sectionHeader(page.community, 'community-heading')}
			</article>

			<article class="text-section" aria-labelledby="exchange-heading">
				{@render sectionHeader(page.exchange, 'exchange-heading')}
			</article>
		</Container>
	</section>

	<PageCtas ctas={page.ctas} />
</main>

<PageFooter {chrome} />

<style>
	.intro-layout {
		align-items: start;
		display: grid;
		gap: 2rem;
		grid-template-columns: minmax(0, 1fr) minmax(18rem, 24rem);
	}

	.intro-copy {
		max-width: 48rem;
	}

	.fact-panel {
		background: var(--ec-white);
		border: 1px solid var(--ec-border-soft);
		border-radius: 8px;
		box-shadow: 0 14px 32px rgba(20, 43, 69, 0.08);
		display: grid;
		gap: 1.25rem;
		padding: 1.5rem;
	}

	.bg-surface {
		border-top: 1px solid var(--ec-border-soft);
		border-bottom: 1px solid var(--ec-border-soft);}

	dt,
	dd {
		font-family: var(--ec-font-sans);
	}

	.ceds-logo {
		display: block;
		height: auto;
		max-width: 100%;
		width: min(100%, 18.5rem);
	}

	dl {
		display: grid;
		gap: 1rem;
		margin: 0;
	}

	dl div {
		border-top: 1px solid var(--ec-border-soft);
		display: grid;
		gap: 0.25rem;
		padding-top: 1rem;
	}

	dt {
		color: var(--ec-ink-soft);
		font-size: 0.875rem;
		line-height: 1.4;
	}

	dd {
		color: var(--ec-ink);
		font-size: 1rem;
		font-weight: 700;
		line-height: 1.4;
		margin: 0;
	}

	.split-heading {
		align-items: end;
		display: grid;
		gap: 1.5rem;
		grid-template-columns: minmax(0, 0.72fr) minmax(18rem, 0.48fr);
		margin-bottom: 2rem;
	}

	.split-heading h2,
	.split-heading p {
		margin: 0;
	}

	.split-heading > p {
		color: var(--ec-ink-soft);
		font-family: var(--ec-font-sans);
		font-size: 1rem;
		line-height: 1.6;
	}

	.card-grid {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.three-up {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.model-list {
		counter-reset: card-count;
		display: grid;
		gap: 1.25rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.text-section + .text-section {
		border-top: 1px solid var(--ec-border-soft);
		margin-top: 3rem;
		padding-top: 3rem;
	}

	@media (max-width: 1024px) {
		.intro-layout,
		.split-heading,
		.three-up {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 760px) {
		.intro-layout,
		.split-heading,
		.card-grid,
		.three-up {
			grid-template-columns: 1fr;
		}

		.text-section + .text-section {
			margin-top: 2.25rem;
			padding-top: 2.25rem;
		}
	}
</style>
