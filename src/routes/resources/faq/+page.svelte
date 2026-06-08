<script lang="ts">
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
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

<PrimaryNav links={chrome.primaryNav} activeSection={page.activeSection} />
<SubNav crumb="Resources" links={page.subNav} active="FAQ" />

<main>
	<Hero content={page.hero} compact />

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

	<section
		id="newsletter"
		class:teal={page.newsletter.background === 'teal'}
		class="newsletter"
		aria-labelledby="newsletter-heading"
	>
		<Container>
			<div class="newsletter-inner">
				<div>
					<p class="eyebrow">Newsletter</p>
					<h2 id="newsletter-heading">{page.newsletter.heading}</h2>
					<p>{page.newsletter.description}</p>
				</div>

				<form class="newsletter-form" onsubmit={(event) => event.preventDefault()}>
					<label for="faq-newsletter-email">Email address</label>
					<div class="form-row">
						<input
							id="faq-newsletter-email"
							name="email"
							type="email"
							autocomplete="email"
							placeholder={page.newsletter.emailPlaceholder}
						/>
						<button type="submit">{page.newsletter.ctaLabel}</button>
					</div>
				</form>
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
	.item-category,
	h2,
	h3,
	p,
	span,
	label,
	input,
	button {
		font-family: var(--ec-font-sans);
	}

	.eyebrow,
	.item-category {
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

	.newsletter {
		background: var(--ec-navy);
		padding-block: 3.5rem;
	}

	.newsletter.teal {
		background: var(--ec-teal-darker);
	}

	.newsletter-inner {
		align-items: center;
		display: grid;
		gap: 2rem;
		grid-template-columns: minmax(0, 1fr) minmax(18rem, 28rem);
	}

	.newsletter .eyebrow {
		color: var(--ec-teal-soft);
	}

	.newsletter h2,
	.newsletter p,
	.newsletter label {
		color: var(--ec-white);
	}

	.newsletter h2 {
		margin-bottom: 0.75rem;
	}

	.newsletter p {
		color: rgba(255, 255, 255, 0.86);
		max-width: 43rem;
	}

	.newsletter-form {
		display: grid;
		gap: 0.625rem;
		min-width: 0;
	}

	.newsletter-form label {
		font-size: 0.875rem;
		font-weight: 700;
		line-height: 1.3;
	}

	.form-row {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: minmax(0, 1fr) auto;
	}

	input {
		border: 1px solid transparent;
		border-radius: 6px;
		color: var(--ec-ink);
		min-width: 0;
		padding: 0.8125rem 0.875rem;
		width: 100%;
	}

	button {
		background: var(--ec-gold);
		border: 0;
		border-radius: 6px;
		color: var(--ec-navy-deep);
		cursor: pointer;
		font-weight: 700;
		line-height: 1.2;
		padding: 0.8125rem 1rem;
		white-space: nowrap;
	}

	@media (max-width: 760px) {
		.section-padded,
		.newsletter {
			padding-block: 3rem;
		}

		.content-layout,
		.newsletter-inner,
		.form-row {
			grid-template-columns: 1fr;
		}

		.content-layout {
			margin-top: 1.5rem;
		}

		.category-list {
			display: flex;
			flex-wrap: wrap;
		}

		button {
			width: 100%;
		}
	}
</style>
