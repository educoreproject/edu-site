<script lang="ts">
	import Container from '$lib/components/site/Container.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import { filterSearchResultsByType, getSearchResultTypeOptions } from '$lib/content/search';
	import type { SearchResult } from '$lib/content/search';
	import type { SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			chrome: SiteChrome;
			keyword: string;
			results: SearchResult[];
			hasSearched: boolean;
		};
	};

	let { data }: Props = $props();
	let chrome = $derived(data.chrome);
	let keyword = $derived(data.keyword);
	let results = $derived(data.results);
	let hasSearched = $derived(data.hasSearched);
	let selectedResultType = $state('');
	let resultTypeOptions = $derived(getSearchResultTypeOptions(results));
	let filteredResults = $derived(filterSearchResultsByType(results, selectedResultType));
	let resultLabel = $derived(filteredResults.length === 1 ? 'result' : 'results');

	$effect(() => {
		if (selectedResultType && !resultTypeOptions.includes(selectedResultType)) {
			selectedResultType = '';
		}
	});
</script>

<svelte:head>
	<title>{hasSearched ? `Search results for ${keyword}` : 'Search'}</title>
	<meta name="description" content="Search Education Data Unlimited resources and events." />
</svelte:head>

<PrimaryNav {chrome} />

<main>
	<section class="search-hero" aria-labelledby="search-heading">
		<Container>
			<p class="eyebrow">Search</p>
			<h1 id="search-heading">Search resources and events</h1>
			<form class="search-form" method="GET" action="/search" role="search">
				<label for="keyword">Search by keyword</label>
				<div class="search-controls">
					<input
						id="keyword"
						name="keyword"
						type="search"
						value={keyword}
						placeholder="Search resources and events"
					/>
					<button class="search-submit" type="submit">
						<i class="ti ti-search" aria-hidden="true"></i>
						<span>Search</span>
					</button>
				</div>
			</form>
		</Container>
	</section>

	<section class="section section-padded" aria-labelledby="results-heading">
		<Container>
			{#if hasSearched}
				<div class="results-header">
					<h2 id="results-heading">Results</h2>
					<p>
						Displaying {filteredResults.length} {resultLabel}{#if selectedResultType} of {results.length}{/if}
						for "{keyword}"
					</p>
				</div>

				{#if results.length}
					{#if resultTypeOptions.length > 1}
						<div class="result-type-filters" aria-label="Filter by result type">
							<p class="result-filter-label">Result type</p>
							<div class="result-filter-options">
								<button
									type="button"
									aria-pressed={!selectedResultType}
									onclick={() => (selectedResultType = '')}
								>
									All results
								</button>
								{#each resultTypeOptions as type}
									<button
										type="button"
										aria-pressed={selectedResultType === type}
										onclick={() => (selectedResultType = type)}
									>
										{type}
									</button>
								{/each}
							</div>
						</div>
					{/if}

					<div class="result-list">
						{#if filteredResults.length}
							{#each filteredResults as result (result.id)}
								<article class="result-card">
									<div class="result-main">
										<p class="result-type">{result.type}</p>
										<h3>
											{#if result.href && !result.disabled}
												<a
													href={result.href}
													target={result.target}
													rel={result.rel}
													download={result.download}>{result.title}</a
												>
											{:else}
												{result.title}
											{/if}
										</h3>
										{#if result.description}
											<p>{result.description}</p>
										{/if}
										{#if result.metadata.length}
											<ul class="metadata" aria-label="Result details">
												{#each result.metadata as item}
													<li>{item}</li>
												{/each}
											</ul>
										{/if}
									</div>

									{#if result.href && !result.disabled}
										<a
											class="result-link"
											href={result.href}
											target={result.target}
											rel={result.rel}
											download={result.download}
										>
											<span>{result.linkLabel}</span>
											<i class="ti ti-arrow-right" aria-hidden="true"></i>
										</a>
									{:else}
										<span class="result-link disabled" aria-disabled="true">{result.linkLabel}</span>
									{/if}
								</article>
							{/each}
						{:else}
							<div class="empty-state" role="status">
								<h3>No results found</h3>
								<p>Try another result type or search with a different keyword.</p>
							</div>
						{/if}
					</div>
				{:else}
					<div class="empty-state" role="status">
						<h3>No results found</h3>
						<p>Try another keyword or browse the Resources and Events sections.</p>
					</div>
				{/if}
			{:else}
				<div class="empty-state" role="status">
					<h2 id="results-heading">No search yet</h2>
					<p>Enter a keyword to search resources, documents, FAQs, glossary terms, and events.</p>
				</div>
			{/if}
		</Container>
	</section>
</main>

<PageFooter {chrome} />

<style>
	.search-hero {
		background: var(--ec-surface);
		border-bottom: 1px solid var(--ec-border-soft);
		padding-block: 3rem;
	}

	h1,
	h2,
	h3,
	label,
	input,
	button,
	a,
	span {
		font-family: var(--ec-font-sans);
	}

	h1 {
		color: var(--ec-navy);
		font-size: clamp(2rem, 5vw, 3rem);
		line-height: 1.08;
		margin: 0;
		text-wrap: pretty;
	}

	.search-form {
		display: grid;
		gap: 0.625rem;
		margin-top: 1.5rem;
		max-width: 44rem;
	}

	label {
		color: var(--ec-navy);
		font-weight: 700;
	}

	.search-controls {
		display: flex;
		gap: 0.75rem;
	}

	input {
		border: 1px solid var(--ec-border);
		border-radius: 6px;
		color: var(--ec-ink);
		flex: 1 1 auto;
		font-size: 1rem;
		min-height: 3rem;
		min-width: 0;
		padding: 0.75rem 1rem;
	}

	button,
	.result-link {
		align-items: center;
		border-radius: 6px;
		display: inline-flex;
		font-weight: 600;
		gap: 0.5rem;
		justify-content: center;
		min-height: 3rem;
		text-decoration: none;
	}

	.search-submit {
		background: var(--ec-link);
		border: 2px solid transparent;
		color: var(--ec-white);
		cursor: pointer;
		padding: 0.75rem 1.125rem;
	}

	.search-submit:hover {
		background: var(--ec-violet-dark);
	}

	button:active,
	.result-link:active {
		transform: translateY(1px);
	}

	.results-header {
		display: grid;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.results-header p {
		margin: 0;
	}

	.result-type-filters {
		display: grid;
		gap: 0.625rem;
		margin-bottom: 1.5rem;
	}

	.result-filter-label {
		color: var(--ec-navy);
		font-family: var(--ec-font-sans);
		font-size: 0.875rem;
		font-weight: 800;
		line-height: 1.2;
		margin: 0;
		text-transform: uppercase;
	}

	.result-filter-options {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.result-filter-options button {
		background: var(--ec-white);
		border: 1px solid var(--ec-border);
		color: var(--ec-ink);
		cursor: pointer;
		font-size: 0.9375rem;
		min-height: 2.5rem;
		padding: 0.5rem 0.875rem;
	}

	.result-filter-options button:hover {
		background: var(--ec-surface);
		border-color: var(--ec-teal);
	}

	.result-filter-options button[aria-pressed='true'] {
		background: var(--ec-navy);
		border-color: var(--ec-navy);
		color: var(--ec-white);
	}

	.result-list {
		display: grid;
		gap: 1rem;
	}

	.result-card,
	.empty-state {
		border: 1px solid var(--ec-border-soft);
		border-left: 4px solid var(--ec-teal);
		border-radius: 8px;
		display: grid;
		gap: 1rem;
		grid-template-columns: minmax(0, 1fr) auto;
		padding: 1.25rem;
	}

	.result-main {
		display: grid;
		gap: 0.625rem;
		min-width: 0;
	}

	.result-type {
		color: var(--ec-teal-dark);
		font-size: 0.8125rem;
		font-weight: 700;
		line-height: 1.2;
		margin: 0;
		text-transform: uppercase;
	}

	h3 {
		color: var(--ec-navy);
		font-size: 1.25rem;
		line-height: 1.3;
		margin: 0;
		text-wrap: pretty;
	}

	h3 a {
		color: inherit;
		text-decoration-thickness: 0.125rem;
		text-underline-offset: 0.1875rem;
	}

	.metadata {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.metadata li {
		background: color-mix(in srgb, var(--ec-teal) 12%, var(--ec-white));
		border-radius: 999px;
		color: var(--ec-teal-darker);
		font-size: 0.8125rem;
		font-weight: 700;
		line-height: 1.25;
		padding: 0.25rem 0.625rem;
	}

	.result-link {
		align-self: start;
		color: var(--ec-link);
		white-space: nowrap;
	}

	.result-link span {
		text-decoration: underline;
		text-decoration-thickness: 0.125rem;
		text-underline-offset: 0.1875rem;
	}

	.result-link.disabled {
		color: var(--ec-ink-soft);
		opacity: 0.72;
	}

	.empty-state {
		grid-template-columns: 1fr;
	}

	.empty-state h2,
	.empty-state h3,
	.empty-state p {
		margin: 0;
	}

	@media (max-width: 760px) {
		.search-controls,
		.result-card {
			grid-template-columns: 1fr;
		}

		.search-controls {
			display: grid;
		}

		.result-link {
			justify-self: start;
			white-space: normal;
		}
	}
</style>
