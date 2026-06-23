<script lang="ts">
	import CategorySelector from '$lib/components/site/CategorySelector.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PageCtas from '$lib/components/site/PageCtas.svelte';
	import Pagination from '$lib/components/site/Pagination.svelte';
	import SectionChrome from '$lib/components/site/SectionChrome.svelte';
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
	let selectedCategory = $state('');
	let currentPage = $state(1);
	let itemsPerPage = $state(25);
	let defaultItemCategory = $derived(page.categories[0] ?? '');
	let filteredItems = $derived(
		selectedCategory
			? page.items.filter(itemBelongsToCategory)
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

	function itemBelongsToCategory(item: ResourcesFaqPage['items'][number]) {
		return (item.category ?? defaultItemCategory) === selectedCategory;
	}
</script>

<svelte:head>
	<title>{page.hero.title}</title>
	<meta
		name="description"
		content={page.hero.description ?? 'Frequently asked questions about DSU, EDU, and EDUcore.'}
	/>
</svelte:head>

<SectionChrome {chrome} routeKey="resourcesFaq" />

<main>
	<Hero content={page.hero} background="teal" icon="resource" />

	<section class="section section-padded" aria-labelledby="faq-heading">
		<Container>
			<!-- <div class="section-header">
				<p class="eyebrow">Categories</p>
				<h2 id="faq-heading">Frequently asked questions</h2>
			</div> -->

			<div class="content-layout">
				<CategorySelector
					categories={page.categories}
					label="FAQ categories"
					allCategoryLabel="All FAQs"
					bind:selectedCategory
					onSelect={handleCategoryChange}
				/>

				<div class="faq-list">
					{#if filteredItems.length}
						{#each paginatedItems as item}
							<article class="faq-row">
								{#if item.category}
									<p class="item-category">{item.category}</p>
								{/if}
								<h3>{item.question}</h3>
								<p>{item.answer}</p>
							</article>
						{/each}

						<Pagination
							totalItems={filteredItems.length}
							bind:currentPage
							bind:itemsPerPage
							label="FAQ pagination"
						/>
					{:else}
						<div class="empty-state" role="status">
							<h3>No items available</h3>
							<p>There are no FAQ items available for {selectedCategory} yet.</p>
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
	h3 {
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

	.empty-state {
		border: 1px solid var(--ec-border-soft);
		border-left: 4px solid var(--ec-teal-dark);
		border-radius: 8px;
		display: grid;
		gap: 0.625rem;
		min-width: 0;
		padding: 1.25rem;
	}

	.empty-state h3 {
		margin: 0;
	}

	.empty-state p {
		margin: 0;
	}

	@media (max-width: 760px) {
		.content-layout {
			grid-template-columns: 1fr;
		}

		.content-layout {
			margin-top: 1.5rem;
		}
	}
</style>
