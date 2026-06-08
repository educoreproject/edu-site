<script lang="ts">
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { DsuHomePage, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: DsuHomePage;
			chrome: SiteChrome;
		};
	};

	let { data }: Props = $props();
	let page = $derived(data.page);
	let chrome = $derived(data.chrome);
</script>

<svelte:head>
	<title>{page.hero.title}</title>
	<meta name="description" content={page.hero.description} />
</svelte:head>

<PrimaryNav links={chrome.primaryNav} activeSection={page.activeSection} />
<SubNav crumb={page.activeSection} links={page.subNav} active="Home" />

<main>
	<Hero content={page.hero} />

	<section class="section section-padded pillars" aria-labelledby="pillars-heading">
		<Container>
			<div class="section-header">
				<p class="eyebrow">Foundation</p>
				<h2 id="pillars-heading">Built to align standards bodies without flattening their independence.</h2>
			</div>

			<div class="pillar-grid">
				{#each page.pillars as pillar}
					<article>
						<h3>{pillar.label}</h3>
						<p>{pillar.text}</p>
					</article>
				{/each}
			</div>
		</Container>
	</section>

	<section class="section section-padded values" aria-labelledby="values-heading">
		<Container>
			<div class="values-layout">
				<div class="section-header">
					<p class="eyebrow">Commitments</p>
					<h2 id="values-heading">The operating principles behind the collaborative.</h2>
				</div>

				<div class="value-list">
					{#each page.values as value}
						<article>
							<div class="number" aria-hidden="true">{value.number}</div>
							<div>
								<h3>{value.title}</h3>
								<p>{value.description}</p>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</Container>
	</section>

	<section class="section initiative" aria-labelledby="initiative-heading">
		<Container>
			<div class="initiative-panel">
				<div class="section-header">
					<p class="eyebrow">Initiative</p>
					<h2 id="initiative-heading">{page.initiative.heading}</h2>
				</div>

				<ul>
					{#each page.initiative.items as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		</Container>
	</section>

	<section class="section section-padded voices" aria-labelledby="voices-heading">
		<Container>
			<div class="section-header">
				<p class="eyebrow">Voices</p>
				<h2 id="voices-heading">Standards leaders on why coordination matters now.</h2>
			</div>

			<div class="voice-grid">
				{#each page.voices as voice}
					<figure>
						<blockquote>
							<p>{voice.quote}</p>
						</blockquote>
						<figcaption>
							<strong>{voice.name}</strong>
							<span>{voice.organization}</span>
						</figcaption>
					</figure>
				{/each}
			</div>
		</Container>
	</section>
</main>

<PageFooter {chrome} />

<style>
	main {
		background: var(--ec-white);
	}

	.section {
		position: relative;
	}

	.section-padded {
		padding-block: 4rem;
	}

	.section-header {
		max-width: 43rem;
	}

	.eyebrow {
		color: var(--ec-teal-dark);
		font-family: var(--ec-font-sans);
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0;
		line-height: 1.2;
		margin: 0 0 0.625rem;
		text-transform: uppercase;
	}

	h2,
	h3,
	p {
		font-family: var(--ec-font-sans);
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
	}

	p {
		color: var(--ec-ink-soft);
		font-size: 1rem;
		line-height: 1.58;
		margin: 0;
	}

	.pillars {
		background: var(--ec-surface);
	}

	.pillar-grid {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin-top: 2rem;
	}

	.pillar-grid article,
	.value-list article,
	.voice-grid figure {
		background: var(--ec-white);
		border: 1px solid var(--ec-border-soft);
		border-radius: 8px;
	}

	.pillar-grid article {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
		padding: 1.5rem;
	}

	.values-layout {
		display: grid;
		gap: 2rem;
		grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
	}

	.value-list {
		display: grid;
		gap: 1rem;
	}

	.value-list article {
		display: grid;
		gap: 1rem;
		grid-template-columns: auto minmax(0, 1fr);
		padding: 1.25rem;
	}

	.number {
		align-items: center;
		background: var(--ec-navy);
		border-radius: 999px;
		color: var(--ec-white);
		display: inline-flex;
		font-family: var(--ec-font-sans);
		font-size: 0.9375rem;
		font-weight: 700;
		height: 2.25rem;
		justify-content: center;
		width: 2.25rem;
	}

	.value-list h3 {
		margin-bottom: 0.375rem;
	}

	.initiative {
		background: var(--ec-navy);
		color: var(--ec-white);
		padding-block: 4rem;
	}

	.initiative-panel {
		display: grid;
		gap: 2rem;
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
	}

	.initiative .eyebrow {
		color: var(--ec-teal-soft);
	}

	.initiative h2 {
		color: var(--ec-white);
	}

	.initiative ul {
		display: grid;
		gap: 1rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.initiative li {
		border-left: 4px solid var(--ec-teal);
		color: rgba(255, 255, 255, 0.9);
		font-family: var(--ec-font-sans);
		font-size: 1rem;
		line-height: 1.55;
		padding-left: 1rem;
	}

	.voice-grid {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin-top: 2rem;
	}

	.voice-grid figure {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		justify-content: space-between;
		margin: 0;
		padding: 1.5rem;
	}

	blockquote {
		margin: 0;
	}

	blockquote p {
		color: var(--ec-ink);
		font-size: 0.96875rem;
		line-height: 1.62;
	}

	figcaption {
		border-top: 1px solid var(--ec-border-soft);
		display: flex;
		flex-direction: column;
		font-family: var(--ec-font-sans);
		gap: 0.25rem;
		padding-top: 1rem;
	}

	figcaption strong {
		color: var(--ec-navy);
		font-size: 0.9375rem;
		line-height: 1.3;
	}

	figcaption span {
		color: var(--ec-ink-soft);
		font-size: 0.8125rem;
		line-height: 1.45;
	}

	@media (max-width: 760px) {
		.section-padded,
		.initiative {
			padding-block: 3rem;
		}

		.pillar-grid,
		.values-layout,
		.initiative-panel,
		.voice-grid {
			grid-template-columns: 1fr;
		}

		.pillar-grid,
		.voice-grid {
			margin-top: 1.5rem;
		}
	}

	@media (max-width: 440px) {
		.value-list article {
			grid-template-columns: 1fr;
		}
	}
</style>
