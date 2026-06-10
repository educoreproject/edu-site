<script lang="ts">
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import NewsletterSignup from '$lib/components/site/NewsletterSignup.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { ResourcesFaqPage, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: ResourcesFaqPage;
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
		content={page.hero.description ?? 'Frequently asked questions about DSU, EDU, and EDUcore.'}
	/>
</svelte:head>

<PrimaryNav links={chrome.primaryNav} footerColumns={chrome.footerColumns} activeSection={page.activeSection} activeSubSection="FAQ" />
<SubNav crumb="Resources" links={page.subNav} active="FAQ" />

<main>
	<Hero content={page.hero} background="teal" icon="resource" />

	<section class="section section-padded" aria-labelledby="faq-heading">
		<Container>
			<div class="section-header">
				<p class="eyebrow">Categories</p>
				<h2 id="faq-heading">Frequently asked questions</h2>
			</div>

			<div class="content-layout">
				<aside class="category-list" aria-label="FAQ categories">
					{#each page.categories as category, index}
						<span class:current={index === 0} aria-current={index === 0 ? 'true' : undefined}>
							{category}
						</span>
					{/each}
				</aside>

				<div class="faq-list">
					{#each page.items as item}
						<article class="faq-row">
							{#if item.category}
								<p class="item-category">{item.category}</p>
							{/if}
							<h3>{item.question}</h3>
							<p>{item.answer}</p>
						</article>
					{/each}
				</div>
			</div>
		</Container>
	</section>

	<NewsletterSignup content={page.newsletter} emailId="faq-newsletter-email" />
</main>

<PageFooter {chrome} />

<style>
	.item-category,
	h3,
	span {
		font-family: var(--ec-font-sans);
	}

	.item-category {
		color: var(--ec-teal-dark);
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0;
		line-height: 1.2;
		margin: 0 0 0.625rem;
		text-transform: uppercase;
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

	.faq-list {
		display: grid;
		gap: 1rem;
		min-width: 0;
	}

	.faq-row {
		border: 1px solid var(--ec-border-soft);
		border-left: 4px solid var(--ec-gold);
		border-radius: 8px;
		display: grid;
		gap: 0.75rem;
		min-width: 0;
		padding: 1.25rem;
	}

	.faq-row .item-category {
		margin: 0;
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
	}
</style>
