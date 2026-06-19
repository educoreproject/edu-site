<script lang="ts">
	import Card from '$lib/components/site/Card.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PageCtas from '$lib/components/site/PageCtas.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import { isExternalLink } from '$lib/content/links';
	import type { EducoreOverviewPage, SectionHeader, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: EducoreOverviewPage;
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
			<p class="eyebrow violet">{header.eyebrow}</p>
		{/if}
		{#if header.heading}
			<h2 id={headingId}>{header.heading}</h2>
		{/if}
		{@render richText(header.body)}
	</div>
{/snippet}

{#snippet iconPrefix(icon: string)}
	<span class="icon-chip" aria-hidden="true">
		<i class={`ti ti-${icon || 'sparkles'}`}></i>
	</span>
{/snippet}

<svelte:head>
	<title>{page.hero.title}</title>
	<meta
		name="description"
		content={page.hero.description ?? 'EDUcore tools for education data standards.'}
	/>
</svelte:head>

<PrimaryNav links={chrome.primaryNav} footerColumns={chrome.footerColumns} activeSection={page.activeSection} activeSubSection="Overview" />
<SubNav crumb="EDUcore" crumbHref="/educore" links={page.subNav} active="Overview" />

<main>
	<Hero content={page.hero} icon="affiliate" background="violet" />

	<section class="section section-padded bg-surface" aria-labelledby="use-cases-heading">
		<Container width="wide">
			{@render sectionHeader(page.useCasesHeader, 'use-cases-heading')}

			<div class="card-grid use-case-grid">
				{#each page.useCases as useCase}
					<Card variant="plain" tone="violet" title={useCase.title} body={useCase.description}>
						{#snippet prefix()}
							{@render iconPrefix(useCase.icon)}
						{/snippet}
					</Card>
				{/each}
			</div>
		</Container>
	</section>

	<section class="section section-padded" aria-labelledby="why-heading">
		<Container width="wide">
			<div class="horizontal-layout why-layout">
				<article class="text-section">
					{@render sectionHeader(page.why, 'why-heading')}
				</article>

				<aside class="working-panel" aria-labelledby="working-toward-heading">
					<h3 id="working-toward-heading" class="panel-heading">{page.workingTowardHeading}</h3>
					<ul class="working-list" aria-labelledby="working-toward-heading">
						{#each page.workingTowardItems as item}
							<Card
								variant="count"
								as="li"
								tone="violet"
								title={item.label}
								body={item.text}
								bulletListItem
							/>
						{/each}
					</ul>
				</aside>
			</div>
		</Container>
	</section>

	<section class="section section-padded bg-surface" aria-labelledby="phase-one-heading">
		<Container width="wide">
			{@render sectionHeader(page.phaseOneHeader, 'phase-one-heading')}

			<div class="card-grid deliverable-grid">
				{#each page.phaseOneDeliverables as deliverable}
					<Card variant="standard" tone="navy" title={deliverable.label} body={deliverable.text} />
				{/each}
			</div>
		</Container>
	</section>

	<section class="section section-padded standards" aria-labelledby="standards-heading">
		<Container width="narrow">
			<article class="text-section">
				{@render sectionHeader(page.standardsAlignment, 'standards-heading')}
			</article>
		</Container>
	</section>

	<section class="section section-padded bg-surface bakeoff" aria-labelledby="bakeoff-heading">
		<Container width="wide">
			{@render sectionHeader(page.aiBakeoffHeader, 'bakeoff-heading')}

			<div class="demo-grid">
				{#each page.aiBakeoffDemos as demo}
					{@const isDemoDisabled = !demo.videoUrl || demo.videoUrl === '#'}
					<article class="demo-card">
						{#if demo.thumbnailImage?.url}
							{#if isDemoDisabled}
								<div class="demo-media disabled" aria-hidden="true">
									<img src={demo.thumbnailImage.url} alt="" loading="lazy" />
								</div>
							{:else}
								<a
									class="demo-media"
									href={demo.videoUrl}
									target={isExternalLink(demo.videoUrl) ? '_blank' : undefined}
									rel={isExternalLink(demo.videoUrl) ? 'noopener noreferrer' : undefined}
									aria-label={`${demo.linkLabel}: ${demo.title}`}
								>
									<img
										src={demo.thumbnailImage.url}
										alt={demo.thumbnailImage.alt ?? ''}
										loading="lazy"
									/>
								</a>
							{/if}
						{:else}
							<div class="demo-media demo-media-fallback" aria-hidden="true">
								<i class="ti ti-player-play"></i>
							</div>
						{/if}

						<div class="demo-content">
							<p class="demo-meta">
								{demo.presenter}
								{#if demo.organization}
									<span aria-hidden="true">-</span>
									{demo.organization}
								{/if}
							</p>
							<h3 class="demo-title">{demo.title}</h3>
							<p class="demo-description">{demo.description}</p>
							{#if isDemoDisabled}
								<span class="demo-link disabled" aria-disabled="true">
									<span>{demo.linkLabel}</span>
								</span>
							{:else}
								<a
									class="demo-link"
									href={demo.videoUrl}
									target={isExternalLink(demo.videoUrl) ? '_blank' : undefined}
									rel={isExternalLink(demo.videoUrl) ? 'noopener noreferrer' : undefined}
								>
									<span>{demo.linkLabel}</span>
									<i class="ti ti-external-link" aria-hidden="true"></i>
								</a>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</Container>
	</section>

	<PageCtas ctas={page.ctas} />
</main>

<PageFooter {chrome} />

<style>
	.violet {
		color: var(--ec-violet);
	}

	.icon-chip {
		align-items: center;
		background: color-mix(in srgb, var(--ec-violet) 10%, transparent);
		border-radius: 8px;
		color: var(--ec-violet);
		display: inline-flex;
		height: 2.75rem;
		justify-content: center;
		width: 2.75rem;
	}

	.icon-chip i {
		font-size: 1.45rem;
		line-height: 1;
	}

	.why-layout {
		align-items: start;
	}

	.text-section :global(strong) {
		color: var(--ec-navy);
	}

	.working-panel {
		display: grid;
		gap: 1.25rem;
		min-width: 0;
	}

	.panel-heading {
		color: var(--ec-navy);
		font-family: var(--ec-font-sans);
		font-size: 1.375rem;
		line-height: 1.3;
		margin: 0;
		text-wrap: pretty;
	}

	.working-list {
		display: grid;
		gap: 1rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.standards {
		border-bottom: 1px solid var(--ec-border-soft);
		border-top: 1px solid var(--ec-border-soft);
	}

	.use-case-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.demo-grid {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.demo-card {
		background: var(--ec-white);
		border: 1px solid var(--ec-border-soft);
		border-radius: 8px;
		box-shadow: 0 10px 28px rgba(20, 43, 69, 0.06);
		display: flex;
		flex-direction: column;
		min-width: 0;
		overflow: hidden;
	}

	.demo-media {
		align-items: center;
		aspect-ratio: 16 / 9;
		background: var(--ec-navy-deep);
		display: flex;
		justify-content: center;
		overflow: hidden;
		text-decoration: none;
	}

	.demo-media img {
		height: 100%;
		object-fit: cover;
		width: 100%;
	}

	.demo-media-fallback {
		color: var(--ec-violet);
		font-size: 2.75rem;
	}

	.demo-content {
		display: flex;
		flex: 1 1 auto;
		flex-direction: column;
		gap: 0.675rem;
		padding: 1.5rem;
	}

	.demo-meta,
	.demo-title,
	.demo-description,
	.demo-link {
		font-family: var(--ec-font-sans);
	}

	.demo-meta {
		color: var(--ec-violet);
		font-size: 0.8125rem;
		font-weight: 700;
		line-height: 1.35;
		margin: 0;
		text-transform: uppercase;
	}

	.demo-title {
		color: var(--ec-navy);
		font-size: 1.25rem;
		line-height: 1.3;
		margin: 0;
		text-wrap: pretty;
	}

	.demo-description {
		color: var(--ec-ink-soft);
		font-size: 1rem;
		line-height: 1.58;
		margin: 0;
	}

	.demo-link {
		align-items: center;
		align-self: flex-start;
		display: inline-flex;
		gap: 0.375rem;
		margin-top: auto;
		text-decoration: none;
	}

	.demo-link span {
		text-decoration: underline;
		text-decoration-thickness: 0.125rem;
		text-underline-offset: 0.1875rem;
	}

	.demo-link.disabled {
		color: var(--ec-ink-soft);
		cursor: not-allowed;
		opacity: 0.72;
	}

	@media (max-width: 860px) {
		.use-case-grid,
		.demo-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 420px) {
		.demo-content {
			padding: 1.125rem;
		}
	}
</style>
