<script lang="ts">
	import { onMount, tick } from 'svelte';
	import CategorySelector from '$lib/components/site/CategorySelector.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PageCtas from '$lib/components/site/PageCtas.svelte';
	import Pagination from '$lib/components/site/Pagination.svelte';
	import SectionChrome from '$lib/components/site/SectionChrome.svelte';
	import type { ResourcesGlossaryPage, SiteChrome, GlossaryTerm } from '$lib/content/types';
	import { slugify } from '$lib/utils/slugify';

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

	let highlightedAnchor = $state('');

	function anchorFor(item: GlossaryTerm) {
		return item.anchor?.trim() || slugify(item.term);
	}

	async function goToAnchor(hash: string) {
		const anchorId = decodeURIComponent(hash.replace(/^#/, ''));
		if (!anchorId) return;

		const term = page.terms.find((item) => anchorFor(item) === anchorId);
		if (!term) return;

		selectedCategory = term.category;
		await tick();

		const index = filteredTerms.findIndex((item) => anchorFor(item) === anchorId);
		if (index === -1) return;

		currentPage = Math.floor(index / itemsPerPage) + 1;
		await tick();

		document.getElementById(anchorId)?.scrollIntoView({ block: 'start' });
		highlightedAnchor = anchorId;
	}

	onMount(() => {
		if (window.location.hash) {
			void goToAnchor(window.location.hash);
		}

		const handleHashChange = () => void goToAnchor(window.location.hash);
		window.addEventListener('hashchange', handleHashChange);
		return () => window.removeEventListener('hashchange', handleHashChange);
	});
</script>

<svelte:head>
	<title>{page.hero.title}</title>
	<meta
		name="description"
		content={page.hero.description ?? 'Glossary of education data standards terminology.'}
	/>
</svelte:head>

<SectionChrome {chrome} routeKey="resourcesGlossary" />

<main>
	<Hero content={page.hero} background="teal" icon="resource" />

	<section class="section section-padded" aria-labelledby="glossary-heading">
		<Container>
			<!-- <div class="section-header">
				<p class="eyebrow">Categories</p>
				<h2 id="glossary-heading">All glossary terms</h2>
			</div> -->

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
						<article
							class="term-row"
							class:highlighted={anchorFor(item) === highlightedAnchor}
							id={anchorFor(item)}
						>
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
			{#if page.artifact?.url}
				<div class="link-wrapper">
					<a
					class="artifact-link"
					href={page.artifact.url}
					download={page.artifact.filename ?? true}
				>
					<i class="ti ti-download" aria-hidden="true"></i>
					<span>{page.artifact.label}</span>
				</a>
				</div>
			{/if}
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

	.link-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 4rem;
	}

	.artifact-link {
	  align-self: flex-start;
    color: var(--ec-link);
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.4;
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    text-decoration: none;
	}

	  .artifact-link > i {
    font-size: 1.125rem;
  }

  .artifact-link > span {
    text-decoration: underline;
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
		scroll-margin-top: 1.5rem;
	}

	.term-row:target,
	.term-row.highlighted {
		box-shadow: 0 0 0 2px var(--ec-gold);
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
