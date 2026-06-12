<script lang="ts">
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PageCtas from '$lib/components/site/PageCtas.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { EduOverviewPage, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: EduOverviewPage;
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
		content={page.hero.description ?? 'Education Data Unlimited overview and mission.'}
	/>
</svelte:head>

<PrimaryNav links={chrome.primaryNav} footerColumns={chrome.footerColumns} activeSection={page.activeSection} activeSubSection="Overview" />
<SubNav crumb="EDU" links={page.subNav} active="Overview" />

<main>
	<Hero content={page.hero} />

	<section class="section document" aria-labelledby="mission-heading">
		<Container width="narrow">
			<article class="text-section">
				{#if page.mission.eyebrow}
					<p class="eyebrow">{page.mission.eyebrow}</p>
				{/if}
				<h2 id="mission-heading">{page.mission.heading}</h2>
				{#each page.mission.paragraphs as paragraph}
					<p>{paragraph}</p>
				{/each}
			</article>

			<article class="text-section" aria-labelledby="organization-heading">
				{#if page.organization.eyebrow}
					<p class="eyebrow">{page.organization.eyebrow}</p>
				{/if}
				<h2 id="organization-heading">{page.organization.heading}</h2>
				{#each page.organization.paragraphs as paragraph}
					<p>{paragraph}</p>
				{/each}
			</article>
		</Container>
	</section>

	<section class="section list-surface" aria-labelledby="scope-heading">
		<Container width="narrow">
			<h2 id="scope-heading" class="sr-only">EDU scope and boundaries</h2>
			<div class="list-grid">
				<article class="list-card">
					<h3>{page.willDo.heading}</h3>
					<p>{page.willDo.description}</p>
					<ul>
						{#each page.willDo.items as item}
							<li>{item}</li>
						{/each}
					</ul>
				</article>

				<article class="list-card">
					<h3>{page.willNotDo.heading}</h3>
					<p>{page.willNotDo.description}</p>
					<ul>
						{#each page.willNotDo.items as item}
							<li>{item}</li>
						{/each}
					</ul>
				</article>
			</div>
		</Container>
	</section>

	<section class="section document closing" aria-labelledby="unification-heading">
		<Container width="narrow">
			<article class="text-section">
				{#if page.unification.eyebrow}
					<p class="eyebrow">{page.unification.eyebrow}</p>
				{/if}
				<h2 id="unification-heading">{page.unification.heading}</h2>
				{#each page.unification.paragraphs as paragraph}
					<p>{paragraph}</p>
				{/each}
			</article>

			<article class="text-section" aria-labelledby="incorporation-heading">
				{#if page.incorporation.eyebrow}
					<p class="eyebrow">{page.incorporation.eyebrow}</p>
				{/if}
				<h2 id="incorporation-heading">{page.incorporation.heading}</h2>
				{#each page.incorporation.paragraphs as paragraph}
					<p>{paragraph}</p>
				{/each}
			</article>
		</Container>
	</section>

	<PageCtas ctas={page.ctas} />
</main>

<PageFooter {chrome} />

<style>
	.document {
		padding-block: 4rem;
	}

	.closing {
		padding-top: 0;
	}

	.text-section {
		display: grid;
		gap: 1rem;
	}

	.text-section + .text-section {
		border-top: 1px solid var(--ec-border-soft);
		margin-top: 3rem;
		padding-top: 3rem;
	}

	h3,
	li {
		font-family: var(--ec-font-sans);
	}

	h3 {
		color: var(--ec-navy);
		font-size: 1.25rem;
		line-height: 1.3;
		margin: 0;
		text-wrap: pretty;
	}

	li {
		color: var(--ec-ink-soft);
		font-size: 1rem;
		line-height: 1.68;
		margin: 0;
	}

	.list-surface {
		background: var(--ec-surface);
		padding-block: 3.5rem;
	}

	.list-grid {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.list-card {
		background: var(--ec-white);
		border: 1px solid var(--ec-border-soft);
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: 0;
		padding: 1.5rem;
	}

	.list-card ul {
		display: grid;
		gap: 0.75rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.list-card li {
		border-left: 4px solid var(--ec-teal);
		color: var(--ec-ink);
		padding-left: 0.875rem;
	}

	@media (max-width: 760px) {
		.document,
		.list-surface {
			padding-block: 3rem;
		}

		.closing {
			padding-top: 0;
		}

		.text-section + .text-section {
			margin-top: 2.25rem;
			padding-top: 2.25rem;
		}

		.list-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 420px) {
		.list-card {
			padding: 1.125rem;
		}
	}
</style>
