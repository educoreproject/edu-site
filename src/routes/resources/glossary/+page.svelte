<script lang="ts">
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import NewsletterSignup from '$lib/components/site/NewsletterSignup.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { ResourcesGlossaryPage, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: ResourcesGlossaryPage;
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
		content={page.hero.description ?? 'Glossary of education data standards terminology.'}
	/>
</svelte:head>

<PrimaryNav links={chrome.primaryNav} footerColumns={chrome.footerColumns} activeSection={page.activeSection} activeSubSection="Glossary" />
<SubNav crumb="Resources" links={page.subNav} active="Glossary" />

<main>
	<Hero content={page.hero} background="teal" icon="resource" />

	<section class="section section-padded" aria-labelledby="glossary-heading">
		<Container>
			<div class="section-header">
				<p class="eyebrow">Categories</p>
				<h2 id="glossary-heading">All glossary terms</h2>
			</div>

			<div class="content-layout">
				<aside class="category-list" aria-label="Glossary categories">
					{#each page.categories as category, index}
						<span class:current={index === 0} aria-current={index === 0 ? 'true' : undefined}>
							{category}
						</span>
					{/each}
				</aside>

				<div class="term-list">
					{#each page.terms as item}
						<article class="term-row">
							<div class="term-heading">
								<h3>{item.term}</h3>
								<span>{item.category}</span>
							</div>
							<p>{item.definition}</p>
						</article>
					{/each}
				</div>
			</div>
		</Container>
	</section>

	<NewsletterSignup content={page.newsletter} emailId="glossary-newsletter-email" />
</main>

<PageFooter {chrome} />

<style>
	h3,
	span {
		font-family: var(--ec-font-sans);
	}

	h3 {
		color: var(--ec-navy);
		font-size: 1.125rem;
		line-height: 1.3;
		margin: 0;
		text-wrap: pretty;
	}

	.content-layout {
		align-items: start;
		display: grid;
		gap: 2rem;
		grid-template-columns: minmax(13rem, 16rem) minmax(0, 1fr);
		margin-top: 2rem;
	}

	.category-list {
		background: var(--ec-surface);
		border: 1px solid var(--ec-border-soft);
		border-radius: 8px;
		display: grid;
		gap: 0.25rem;
		padding: 0.625rem;
	}

	.category-list span {
		border-radius: 6px;
		color: var(--ec-ink);
		font-size: 0.9375rem;
		font-weight: 600;
		line-height: 1.3;
		padding: 0.75rem;
	}

	.category-list .current {
		background: var(--ec-navy);
		color: var(--ec-white);
	}

	.term-list {
		display: grid;
		gap: 1rem;
		min-width: 0;
	}

	.term-row {
		border: 1px solid var(--ec-border-soft);
		border-left: 4px solid var(--ec-gold);
		border-radius: 8px;
		display: grid;
		gap: 0.75rem;
		min-width: 0;
		padding: 1.25rem;
	}

	.term-heading {
		align-items: start;
		display: flex;
		gap: 1rem;
		justify-content: space-between;
		min-width: 0;
	}

	.term-heading span {
		background: color-mix(in srgb, var(--ec-teal) 14%, var(--ec-white));
		border-radius: 999px;
		color: var(--ec-teal-dark);
		flex: 0 1 auto;
		font-size: 0.8125rem;
		font-weight: 700;
		line-height: 1.25;
		min-width: 0;
		overflow-wrap: anywhere;
		padding: 0.25rem 0.625rem;
		text-align: right;
	}

	@media (max-width: 760px) {
		.content-layout {
			grid-template-columns: 1fr;
		}

		.content-layout {
			margin-top: 1.5rem;
		}

		.category-list {
			display: flex;
			flex-wrap: wrap;
		}

		.term-heading {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.625rem;
		}

		.term-heading span {
			text-align: left;
		}
	}
</style>
