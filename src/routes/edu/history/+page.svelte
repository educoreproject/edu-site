<script lang="ts">
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { EduHistoryPage, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: EduHistoryPage;
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
		content={page.hero.description ?? 'Education Data Unlimited history and milestones.'}
	/>
</svelte:head>

<PrimaryNav links={chrome.primaryNav} footerColumns={chrome.footerColumns} activeSection={page.activeSection} activeSubSection="History" />
<SubNav crumb="EDU" links={page.subNav} active="History" />

<main>
	<Hero content={page.hero} compact />

	<section class="section section-padded" aria-labelledby="history-heading">
		<Container size="narrow">
			<div class="section-header">
				<p class="eyebrow">{page.hero.chip}</p>
				<h2 id="history-heading">{page.hero.title}</h2>
			</div>

			<div class="timeline">
				{#each page.entries as entry}
					<article class="timeline-entry">
						<div class="year">{entry.year}</div>
						<div class="timeline-card">
							<h3>{entry.title}</h3>
							<p>{entry.text}</p>
						</div>
					</article>
				{/each}
			</div>
		</Container>
	</section>
</main>

<PageFooter {chrome} />

<style>
	main {
		background: var(--ec-white);
		overflow-x: clip;
	}

	.section {
		position: relative;
	}

	.section-padded {
		padding-block: 4rem;
	}

	.section-header {
		max-width: 46rem;
	}

	.eyebrow,
	.year,
	h2,
	h3,
	p {
		font-family: var(--ec-font-sans);
	}

	.eyebrow {
		color: var(--ec-teal-dark);
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0;
		line-height: 1.2;
		margin: 0 0 0.625rem;
		text-transform: uppercase;
	}

	h2 {
		color: var(--ec-navy);
		font-size: clamp(1.875rem, 4vw, 2.5rem);
		line-height: 1.16;
		margin: 0;
		text-wrap: pretty;
	}

	h3 {
		color: var(--ec-navy);
		font-size: 1.125rem;
		line-height: 1.3;
		margin: 0;
		text-wrap: pretty;
	}

	p {
		color: var(--ec-ink-soft);
		font-size: 1rem;
		line-height: 1.58;
		margin: 0;
	}

	.timeline {
		display: grid;
		gap: 0;
		margin-top: 2.5rem;
		position: relative;
	}

	.timeline::before {
		background: var(--ec-border);
		bottom: 0;
		content: '';
		left: 7.5rem;
		position: absolute;
		top: 0;
		width: 1px;
	}

	.timeline-entry {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: 7.5rem minmax(0, 1fr);
		min-width: 0;
		padding-block: 0 1.5rem;
		position: relative;
	}

	.timeline-entry:last-child {
		padding-bottom: 0;
	}

	.year {
		color: var(--ec-navy);
		font-size: 1rem;
		font-weight: 700;
		line-height: 1.3;
		padding-top: 1rem;
	}

	.timeline-card {
		background: var(--ec-white);
		border: 1px solid var(--ec-border-soft);
		border-radius: 8px;
		display: grid;
		gap: 0.625rem;
		min-width: 0;
		padding: 1.25rem;
		position: relative;
	}

	.timeline-card::before {
		background: var(--ec-teal);
		border: 3px solid var(--ec-white);
		border-radius: 999px;
		box-shadow: 0 0 0 1px var(--ec-border);
		content: '';
		height: 0.875rem;
		left: -1.9375rem;
		position: absolute;
		top: 1.25rem;
		width: 0.875rem;
	}

	@media (max-width: 760px) {
		.section-padded {
			padding-block: 3rem;
		}

		.timeline {
			gap: 1rem;
			margin-top: 1.5rem;
		}

		.timeline::before {
			display: none;
		}

		.timeline-entry {
			gap: 0.5rem;
			grid-template-columns: 1fr;
			padding-block: 0;
		}

		.year {
			padding-top: 0;
		}

		.timeline-card::before {
			display: none;
		}
	}

	@media (max-width: 420px) {
		.timeline-card {
			padding: 1.125rem;
		}
	}
</style>
