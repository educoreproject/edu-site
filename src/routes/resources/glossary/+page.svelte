<script lang="ts">
	import CategorySelector from '$lib/components/site/CategorySelector.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PageCtas from '$lib/components/site/PageCtas.svelte';
	import Pagination from '$lib/components/site/Pagination.svelte';
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
	let selectedCategory = $state('');
	let currentPage = $state(1);
	let itemsPerPage = $state(25);
	let filteredTerms = $derived(
		selectedCategory
			? page.terms.filter((item) => item.category === selectedCategory)
			: page.terms
	);
	let firstTermIndex = $derived((currentPage - 1) * itemsPerPage);
	let paginatedTerms = $derived(
		filteredTerms.slice(firstTermIndex, firstTermIndex + itemsPerPage)
	);

	function handleCategoryChange(category: string) {
		void category;
		currentPage = 1;
	}
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

			{#if page.artifact?.url}
				<a
					class="artifact-link"
					href={page.artifact.url}
					download={page.artifact.filename ?? true}
				>
					<i class="ti ti-download" aria-hidden="true"></i>
					<span>{page.artifact.label}</span>
				</a>
			{/if}

			<div class="content-layout">
				<CategorySelector
					categories={page.categories}
					label="Glossary categories"
					allCategoryLabel="All terms"
					bind:selectedCategory
					onSelect={handleCategoryChange}
				/>

				<div class="term-list">
					{#each paginatedTerms as item}
						<article class="term-row">
							<div class="term-heading">
								<h3>{item.term}</h3>
								<span>{item.category}</span>
							</div>
							<p>{item.definition}</p>
						</article>
					{/each}

					<Pagination
						totalItems={filteredTerms.length}
						bind:currentPage
						bind:itemsPerPage
						label="Glossary pagination"
					/>
				</div>
			</div>
		</Container>
	</section>

	<PageCtas ctas={page.ctas} />
</main>

<PageFooter {chrome} />

<style>
	h3,
	span {
		font-family: var(--ec-font-sans);
	}

	.artifact-link {
		align-items: center;
		color: var(--ec-link);
		display: inline-flex;
		font-family: var(--ec-font-sans);
		font-size: 0.9375rem;
		font-weight: 700;
		gap: 0.5rem;
		line-height: 1.35;
		margin-top: 1.25rem;
		text-decoration-thickness: 0.125rem;
		text-underline-offset: 0.1875rem;
	}

	.artifact-link:hover {
		color: var(--ec-navy);
	}

	.artifact-link i {
		font-size: 1.125rem;
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
		gap: 3.5rem;
		grid-template-columns: minmax(9rem, 11rem) minmax(0, 1fr);
		margin-top: 2rem;
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
