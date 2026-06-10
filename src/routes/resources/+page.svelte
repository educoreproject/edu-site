<script lang="ts">
	import Card from '$lib/components/site/Card.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
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
	<Hero content={page.hero} />

	<section class="section section-padded library" aria-labelledby="resources-heading">
		<Container>
			<div class="section-header">
				<p class="eyebrow">{page.eyebrow}</p>
				<h2 id="resources-heading">{page.heading}</h2>
			</div>

			<div class="resource-grid">
				{#each page.cards as card}
					<Card
						variant="resource"
						tone="gold"
						eyebrow={card.meta}
						title={card.title}
						body={card.description}
						linkLabel={card.cta.label}
						linkHref={card.cta.href}
					/>
				{/each}
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
					<label for="resources-newsletter-email">Email address</label>
					<div class="form-row">
						<input
							id="resources-newsletter-email"
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
	label,
	input,
	button {
		font-family: var(--ec-font-sans);
	}

	.resource-grid {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin-top: 2rem;
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
		.newsletter {
			padding-block: 3rem;
		}

		.resource-grid,
		.newsletter-inner,
		.form-row {
			grid-template-columns: 1fr;
		}

		.resource-grid {
			margin-top: 1.5rem;
		}

		button {
			width: 100%;
		}
	}
</style>
