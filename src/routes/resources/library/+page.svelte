<script lang="ts">
	import CategorySelector from '$lib/components/site/CategorySelector.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageCtas from '$lib/components/site/PageCtas.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import Pagination from '$lib/components/site/Pagination.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { ResourcesLibraryPage, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: ResourcesLibraryPage;
			chrome: SiteChrome;
		};
	};

	let { data }: Props = $props();
	let page = $derived(data.page);
	let chrome = $derived(data.chrome);
	let selectedCategory = $state('');
	let currentPage = $state(1);
	let itemsPerPage = $state(25);
	let filteredItems = $derived(
		selectedCategory
			? page.items.filter((item) => item.category === selectedCategory)
			: page.items
	);
	let firstItemIndex = $derived((currentPage - 1) * itemsPerPage);
	let paginatedItems = $derived(
		filteredItems.slice(firstItemIndex, firstItemIndex + itemsPerPage)
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
		content={page.hero.description ?? 'White papers and reports from Education Data Unlimited.'}
	/>
</svelte:head>

<PrimaryNav links={chrome.primaryNav} footerColumns={chrome.footerColumns} activeSection={page.activeSection} activeSubSection="Library" />
<SubNav crumb="Resources" links={page.subNav} active="Library" />

<main>
	<Hero content={page.hero} background="teal" icon="resource" />

	<section class="section section-padded" aria-labelledby="library-heading">
		<Container>
			<div class="section-header">
				<p class="eyebrow">Categories</p>
				<h2 id="library-heading">White papers and reports</h2>
			</div>

			<div class="content-layout">
				<CategorySelector
					categories={page.categories}
					label="Resource categories"
					allCategoryLabel="All items"
					bind:selectedCategory
					onSelect={handleCategoryChange}
				/>

				<div class="document-list">
					{#if filteredItems.length}
						{#each paginatedItems as item}
							<article class="document-row">
								<div class="document-heading">
									<div>
										<p class="item-category">{item.category}</p>
										<h3>{item.title}</h3>
									</div>
									<span class="document-type">{item.documentType}</span>
								</div>

								{#if item.description}
									<p>{item.description}</p>
								{/if}

								<a
									class="download-link"
									href={item.document.url}
									download={item.document.filename ?? true}
								>
									<i class="ti ti-download" aria-hidden="true"></i>
									<span>Download file</span>
								</a>
							</article>
						{/each}

						<Pagination
							totalItems={filteredItems.length}
							bind:currentPage
							bind:itemsPerPage
							label="Resources library pagination"
						/>
					{:else}
						<div class="empty-state" role="status">
							<h3>No documents available</h3>
							<p>There are no resources available for {selectedCategory} yet.</p>
						</div>
					{/if}
				</div>
			</div>
		</Container>
	</section>

	<PageCtas ctas={page.ctas} />
</main>

<PageFooter {chrome} />

<style>
	.item-category,
	h3,
	.document-type,
	.download-link {
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
		gap: 3.5rem;
		grid-template-columns: minmax(9rem, 11rem) minmax(0, 1fr);
		margin-top: 2rem;
	}

	.document-list {
		display: grid;
		gap: 1rem;
		min-width: 0;
	}

	.document-row,
	.empty-state {
		border: 1px solid var(--ec-border-soft);
		border-radius: 8px;
		display: grid;
		gap: 0.875rem;
		min-width: 0;
		padding: 1.25rem;
	}

	.document-row {
		border-left: 4px solid var(--ec-gold);
	}

	.document-heading {
		align-items: start;
		display: flex;
		gap: 1rem;
		justify-content: space-between;
		min-width: 0;
	}

	.document-type {
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

	.download-link {
		align-items: center;
		color: var(--ec-link);
		display: inline-flex;
		font-size: 0.9375rem;
		font-weight: 500;
		gap: 0.5rem;
		line-height: 1.35;
		text-decoration: none;
		width: fit-content;
	}

	.download-link span {
		text-decoration: underline;
		text-decoration-thickness: 0.125rem;
		text-underline-offset: 0.1875rem;
		text-decoration-color: var(--ec-link);
	}

	.download-link:hover {
		color: var(--ec-navy);
	}

	.download-link i {
		font-size: 1.125rem;
	}

	.empty-state {
		border-left: 4px solid var(--ec-teal-dark);
	}

	.empty-state h3,
	.empty-state p {
		margin: 0;
	}

	@media (max-width: 760px) {
		.content-layout {
			grid-template-columns: 1fr;
			margin-top: 1.5rem;
		}

		.document-heading {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.625rem;
		}

		.document-type {
			text-align: left;
		}
	}
</style>
