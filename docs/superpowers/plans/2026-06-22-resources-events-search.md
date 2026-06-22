# Resources Events Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Resources and Events search flow with a header search modal and `/search?keyword=` results page.

**Architecture:** A pure content search module normalizes Resources and Events singleton content into one result shape and scores keyword matches. The `/search` server route fetches site chrome and search results, while the Svelte page renders the keyword form, states, and typed result cards. `PrimaryNav.svelte` owns the header icon button and modal form so all pages get the same entry point.

**Tech Stack:** SvelteKit, Svelte 5, TypeScript, Sanity-backed content helpers, Node `node:test`, `tsx`, existing Tabler icon font.

---

## File Structure

- Create `src/lib/content/search.ts`: pure result normalization, keyword scoring, and a Sanity-backed `getSearchResults()` wrapper.
- Create `src/routes/search/+page.server.ts`: parse `keyword`, fetch site chrome, and return route data.
- Create `src/routes/search/+page.svelte`: render primary chrome, search form, result summary, empty/no-results states, typed result cards, and footer.
- Modify `src/lib/components/site/PrimaryNav.svelte`: add accessible search icon buttons and modal form.
- Create `test/search-results.test.mjs`: TDD coverage for normalization, filtering, ranking, empty keywords, and injected content fetchers.
- Create `test/search-ui-contract.test.mjs`: source-level contract tests for the route page and header modal wiring.

## Task 1: Pure Search Index

**Files:**
- Create: `src/lib/content/search.ts`
- Test: `test/search-results.test.mjs`

- [ ] **Step 1: Write the failing search behavior tests**

Create `test/search-results.test.mjs`:

```js
import assert from 'node:assert/strict';
import { test } from 'node:test';

const {
	createSearchIndex,
	searchContent,
	normalizeKeyword,
	getSearchResults
} = await import('../src/lib/content/search.ts');

function fixtureContent() {
	return {
		library: {
			items: [
				{
					category: 'Reports',
					title: 'Data Quality Toolkit',
					documentType: 'PDF',
					description: 'A guide for improving DSU data quality.',
					document: {
						url: 'https://cdn.example.org/data-quality.pdf',
						filename: 'data-quality.pdf'
					}
				}
			]
		},
		press: {
			items: [
				{
					category: 'Press releases',
					title: 'EDU announces new partners',
					documentType: 'PDF',
					description: 'Partner announcement.',
					document: {
						url: 'https://cdn.example.org/partners.pdf',
						filename: 'partners.pdf'
					}
				}
			]
		},
		newsletter: {
			items: [
				{
					category: 'January 2026',
					title: 'January newsletter',
					documentType: 'PDF',
					description: 'Updates on community events.',
					document: {
						url: 'https://cdn.example.org/january.pdf',
						filename: 'january.pdf'
					}
				}
			]
		},
		glossary: {
			terms: [
				{
					term: 'Interoperability',
					definition: 'Systems exchanging and using data.',
					category: 'Data systems'
				}
			]
		},
		faq: {
			items: [
				{
					question: 'How do members share data?',
					answer: 'Members use approved governance practices.',
					category: 'About DSU'
				}
			]
		},
		upcomingEvents: {
			events: [
				{
					tag: 'Webinar',
					date: 'July 15, 2026',
					title: 'Data Quality Webinar',
					description: 'A webinar about practical quality checks.',
					href: 'https://example.org/webinar'
				},
				{
					tag: 'Workshop',
					date: 'August 1, 2026',
					title: 'Governance workshop',
					description: 'Hands-on planning session.',
					href: '#'
				}
			]
		},
		pastEvents: {
			archive: [
				{
					year: '2025',
					events: [
						{
							tag: 'Convening',
							date: 'May 8, 2025',
							title: 'Past Data Convening',
							description: 'A recap of state data work.',
							href: 'https://example.org/past'
						}
					]
				}
			]
		}
	};
}

test('normalizeKeyword trims repeated whitespace', () => {
	assert.equal(normalizeKeyword('  data   quality  '), 'data quality');
});

test('createSearchIndex normalizes all Resources and Events result types', () => {
	const results = createSearchIndex(fixtureContent());

	assert.deepEqual(
		results.map((result) => result.type),
		[
			'Library resource',
			'Press & charter',
			'Newsletter',
			'Glossary',
			'FAQ',
			'Event',
			'Event',
			'Past event'
		]
	);
	assert.equal(results[0].href, 'https://cdn.example.org/data-quality.pdf');
	assert.equal(results[0].download, 'data-quality.pdf');
	assert.equal(results[3].href, '/resources/glossary');
	assert.equal(results[4].href, '/resources/faq');
	assert.equal(results[6].href, undefined);
	assert.equal(results[6].disabled, true);
});

test('searchContent filters case-insensitively across titles, body, and metadata', () => {
	const index = createSearchIndex(fixtureContent());

	assert.deepEqual(
		searchContent(index, 'WEBINAR').map((result) => result.title),
		['Data Quality Webinar']
	);
	assert.deepEqual(
		searchContent(index, 'governance').map((result) => result.title),
		['Governance workshop', 'How do members share data?']
	);
	assert.deepEqual(
		searchContent(index, 'january 2026').map((result) => result.title),
		['January newsletter']
	);
});

test('searchContent ranks title matches before lower-strength metadata matches', () => {
	const index = createSearchIndex(fixtureContent());
	const results = searchContent(index, 'data');

	assert.equal(results[0].title, 'Data Quality Toolkit');
	assert.ok(results[0].score > results.at(-1).score);
});

test('searchContent returns no results for an empty keyword', () => {
	assert.deepEqual(searchContent(createSearchIndex(fixtureContent()), '   '), []);
});

test('getSearchResults delegates to supplied content fetchers', async () => {
	const results = await getSearchResults('quality', {
		getResourcesLibraryPage: async () => fixtureContent().library,
		getResourcesPressPage: async () => fixtureContent().press,
		getResourcesNewsletterPage: async () => fixtureContent().newsletter,
		getResourcesGlossaryPage: async () => fixtureContent().glossary,
		getResourcesFaqPage: async () => fixtureContent().faq,
		getEventsUpcomingPage: async () => fixtureContent().upcomingEvents,
		getEventsPastPage: async () => fixtureContent().pastEvents
	});

	assert.deepEqual(
		results.map((result) => result.title),
		['Data Quality Toolkit', 'Data Quality Webinar']
	);
});
```

- [ ] **Step 2: Run the search tests to verify RED**

Run:

```bash
node --import tsx --test test/search-results.test.mjs
```

Expected: FAIL because `src/lib/content/search.ts` does not exist.

- [ ] **Step 3: Implement the minimal pure search module**

Create `src/lib/content/search.ts`:

```ts
import {
	getEventsPastPage,
	getEventsUpcomingPage,
	getResourcesFaqPage,
	getResourcesGlossaryPage,
	getResourcesLibraryPage,
	getResourcesNewsletterPage,
	getResourcesPressPage
} from './site';
import type {
	EventItem,
	EventsPastPage,
	EventsUpcomingPage,
	FaqItem,
	GlossaryTerm,
	NewsletterDocumentItem,
	PressDocumentItem,
	ResourceDocumentItem,
	ResourcesFaqPage,
	ResourcesGlossaryPage,
	ResourcesLibraryPage,
	ResourcesNewsletterPage,
	ResourcesPressPage
} from './types';

export type SearchResult = {
	id: string;
	type: string;
	title: string;
	description?: string;
	href?: string;
	linkLabel: string;
	metadata: string[];
	score: number;
	target?: '_blank';
	rel?: 'noopener noreferrer';
	download?: string | boolean;
	disabled?: boolean;
};

type SearchField = {
	value?: string;
	weight: number;
};

type IndexedSearchResult = Omit<SearchResult, 'score'> & {
	fields: SearchField[];
};

export type SearchContentSources = {
	library: Pick<ResourcesLibraryPage, 'items'>;
	press: Pick<ResourcesPressPage, 'items'>;
	newsletter: Pick<ResourcesNewsletterPage, 'items'>;
	glossary: Pick<ResourcesGlossaryPage, 'terms'>;
	faq: Pick<ResourcesFaqPage, 'items'>;
	upcomingEvents: Pick<EventsUpcomingPage, 'events'>;
	pastEvents: Pick<EventsPastPage, 'archive'>;
};

type SearchFetchers = {
	getResourcesLibraryPage: () => Promise<Pick<ResourcesLibraryPage, 'items'>>;
	getResourcesPressPage: () => Promise<Pick<ResourcesPressPage, 'items'>>;
	getResourcesNewsletterPage: () => Promise<Pick<ResourcesNewsletterPage, 'items'>>;
	getResourcesGlossaryPage: () => Promise<Pick<ResourcesGlossaryPage, 'terms'>>;
	getResourcesFaqPage: () => Promise<Pick<ResourcesFaqPage, 'items'>>;
	getEventsUpcomingPage: () => Promise<Pick<EventsUpcomingPage, 'events'>>;
	getEventsPastPage: () => Promise<Pick<EventsPastPage, 'archive'>>;
};

const defaultFetchers: SearchFetchers = {
	getResourcesLibraryPage,
	getResourcesPressPage,
	getResourcesNewsletterPage,
	getResourcesGlossaryPage,
	getResourcesFaqPage,
	getEventsUpcomingPage,
	getEventsPastPage
};

export function normalizeKeyword(keyword: string) {
	return keyword.trim().replace(/\s+/g, ' ');
}

function cleanText(value?: string) {
	return normalizeKeyword(value ?? '');
}

function isUsableHref(href?: string) {
	return Boolean(href && href !== '#');
}

function isExternalHref(href?: string) {
	return Boolean(href && (/^https?:\/\//.test(href) || href.startsWith('//')));
}

function linkProps(href?: string) {
	if (!isUsableHref(href)) {
		return { disabled: true };
	}

	return isExternalHref(href) ? { href, target: '_blank' as const, rel: 'noopener noreferrer' as const } : { href };
}

function documentResult(
	prefix: string,
	type: string,
	item: ResourceDocumentItem | PressDocumentItem | NewsletterDocumentItem
): IndexedSearchResult {
	const metadata = [item.category, item.documentType].filter(Boolean);

	return {
		id: `${prefix}-${item.title}`,
		type,
		title: item.title,
		description: item.description,
		linkLabel: 'Download file',
		metadata,
		href: item.document.url,
		target: '_blank',
		rel: 'noopener noreferrer',
		download: item.document.filename ?? true,
		fields: [
			{ value: item.title, weight: 24 },
			{ value: item.description, weight: 8 },
			{ value: metadata.join(' '), weight: 5 }
		]
	};
}

function glossaryResult(term: GlossaryTerm): IndexedSearchResult {
	return {
		id: `glossary-${term.term}`,
		type: 'Glossary',
		title: term.term,
		description: term.definition,
		href: '/resources/glossary',
		linkLabel: 'View glossary',
		metadata: [term.category].filter(Boolean),
		fields: [
			{ value: term.term, weight: 24 },
			{ value: term.definition, weight: 8 },
			{ value: term.category, weight: 5 }
		]
	};
}

function faqResult(item: FaqItem): IndexedSearchResult {
	return {
		id: `faq-${item.question}`,
		type: 'FAQ',
		title: item.question,
		description: item.answer,
		href: '/resources/faq',
		linkLabel: 'View FAQ',
		metadata: [item.category ?? 'FAQ'].filter(Boolean),
		fields: [
			{ value: item.question, weight: 24 },
			{ value: item.answer, weight: 8 },
			{ value: item.category, weight: 5 }
		]
	};
}

function eventResult(prefix: string, type: string, event: EventItem): IndexedSearchResult {
	const metadata = [event.tag, event.date].filter(Boolean);

	return {
		id: `${prefix}-${event.title}`,
		type,
		title: event.title,
		description: event.description,
		linkLabel: 'Learn more',
		metadata,
		...linkProps(event.href),
		fields: [
			{ value: event.title, weight: 24 },
			{ value: event.description, weight: 8 },
			{ value: metadata.join(' '), weight: 5 }
		]
	};
}

export function createSearchIndex(content: SearchContentSources): IndexedSearchResult[] {
	return [
		...content.library.items.map((item) => documentResult('library', 'Library resource', item)),
		...content.press.items.map((item) => documentResult('press', 'Press & charter', item)),
		...content.newsletter.items.map((item) => documentResult('newsletter', 'Newsletter', item)),
		...content.glossary.terms.map(glossaryResult),
		...content.faq.items.map(faqResult),
		...content.upcomingEvents.events.map((event) => eventResult('event', 'Event', event)),
		...content.pastEvents.archive.flatMap((group) =>
			group.events.map((event) => eventResult(`past-${group.year}`, 'Past event', event))
		)
	];
}

function scoreResult(result: IndexedSearchResult, keyword: string) {
	const normalizedKeyword = keyword.toLowerCase();
	const terms = normalizedKeyword.split(' ').filter(Boolean);
	const aggregate = result.fields.map((field) => field.value ?? '').join(' ').toLowerCase();

	if (!terms.length || terms.some((term) => !aggregate.includes(term))) {
		return 0;
	}

	return result.fields.reduce((score, field) => {
		const value = cleanText(field.value).toLowerCase();

		if (!value) {
			return score;
		}

		if (value.includes(normalizedKeyword)) {
			return score + field.weight * 2;
		}

		const termMatches = terms.filter((term) => value.includes(term)).length;
		return score + termMatches * field.weight;
	}, 0);
}

export function searchContent(index: IndexedSearchResult[], keyword: string): SearchResult[] {
	const normalizedKeyword = normalizeKeyword(keyword);

	if (!normalizedKeyword) {
		return [];
	}

	return index
		.map((result) => ({ ...result, score: scoreResult(result, normalizedKeyword) }))
		.filter((result) => result.score > 0)
		.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
		.map(({ fields, ...result }) => result);
}

export async function getSearchResults(keyword: string, fetchers: SearchFetchers = defaultFetchers) {
	const [
		library,
		press,
		newsletter,
		glossary,
		faq,
		upcomingEvents,
		pastEvents
	] = await Promise.all([
		fetchers.getResourcesLibraryPage(),
		fetchers.getResourcesPressPage(),
		fetchers.getResourcesNewsletterPage(),
		fetchers.getResourcesGlossaryPage(),
		fetchers.getResourcesFaqPage(),
		fetchers.getEventsUpcomingPage(),
		fetchers.getEventsPastPage()
	]);

	return searchContent(
		createSearchIndex({ library, press, newsletter, glossary, faq, upcomingEvents, pastEvents }),
		keyword
	);
}
```

- [ ] **Step 4: Run the search tests to verify GREEN**

Run:

```bash
node --import tsx --test test/search-results.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit Task 1**

Run:

```bash
git add src/lib/content/search.ts test/search-results.test.mjs
git commit -m "feat: add resources events search index"
```

## Task 2: Search Route Loader And Results Page

**Files:**
- Create: `src/routes/search/+page.server.ts`
- Create: `src/routes/search/+page.svelte`
- Modify: `test/search-results.test.mjs`
- Test: `test/search-ui-contract.test.mjs`

- [ ] **Step 1: Add failing loader and route UI contract tests**

Create `test/search-ui-contract.test.mjs`:

```js
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('search route renders chrome, GET form, typed results, and empty states', () => {
	const pagePath = 'src/routes/search/+page.svelte';
	const loadPath = 'src/routes/search/+page.server.ts';

	assert.equal(existsSync(pagePath), true);
	assert.equal(existsSync(loadPath), true);

	const source = readFileSync(pagePath, 'utf8');
	const loadSource = readFileSync(loadPath, 'utf8');

	assert.match(loadSource, /normalizeKeyword/);
	assert.match(loadSource, /getSearchResults/);
	assert.match(loadSource, /getSiteChrome/);
	assert.match(loadSource, /url\.searchParams\.get\('keyword'\)/);
	assert.match(loadSource, /hasSearched:\s*Boolean\(keyword\)/);

	assert.match(source, /import PrimaryNav from '\$lib\/components\/site\/PrimaryNav\.svelte';/);
	assert.match(source, /import PageFooter from '\$lib\/components\/site\/PageFooter\.svelte';/);
	assert.match(source, /<PrimaryNav \{chrome\} \/>/);
	assert.match(source, /<form[\s\S]*?method="GET"[\s\S]*?action="\/search"/);
	assert.match(source, /name="keyword"/);
	assert.match(source, /Displaying \{results\.length\}/);
	assert.match(source, /No search yet/);
	assert.match(source, /No results found/);
	assert.match(source, /\{result\.type\}/);
	assert.match(source, /\{#if result\.href && !result\.disabled\}/);
	assert.match(source, /href=\{result\.href\}/);
	assert.match(source, /download=\{result\.download\}/);
	assert.match(source, /aria-disabled="true"/);
});
```

- [ ] **Step 2: Run route tests to verify RED**

Run:

```bash
node --import tsx --test test/search-results.test.mjs test/search-ui-contract.test.mjs
```

Expected: FAIL because the `/search` route files do not exist.

- [ ] **Step 3: Implement the server loader**

Create `src/routes/search/+page.server.ts`:

```ts
import { getSearchResults, normalizeKeyword } from '$lib/content/search';
import { getSiteChrome } from '$lib/content/site';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const keyword = normalizeKeyword(url.searchParams.get('keyword') ?? '');
	const [chrome, results] = await Promise.all([getSiteChrome(), getSearchResults(keyword)]);

	return {
		chrome,
		keyword,
		results,
		hasSearched: Boolean(keyword)
	};
};
```

- [ ] **Step 4: Implement the results page**

Create `src/routes/search/+page.svelte`:

```svelte
<script lang="ts">
	import Container from '$lib/components/site/Container.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
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
	let resultLabel = $derived(results.length === 1 ? 'result' : 'results');
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
			<form class="search-form" action="/search" method="GET" role="search">
				<label for="keyword">Search by keyword</label>
				<div class="search-controls">
					<input
						id="keyword"
						name="keyword"
						type="search"
						value={keyword}
						placeholder="Search resources and events"
					/>
					<button type="submit">
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
					<p>Displaying {results.length} {resultLabel} for "{keyword}"</p>
				</div>

				{#if results.length}
					<div class="result-list">
						{#each results as result (result.id)}
							<article class="result-card">
								<div class="result-main">
									<p class="result-type">{result.type}</p>
									<h3>
										{#if result.href && !result.disabled}
											<a href={result.href} target={result.target} rel={result.rel} download={result.download}>
												{result.title}
											</a>
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
									<a class="result-link" href={result.href} target={result.target} rel={result.rel} download={result.download}>
										<span>{result.linkLabel}</span>
										<i class="ti ti-arrow-right" aria-hidden="true"></i>
									</a>
								{:else}
									<span class="result-link disabled" aria-disabled="true">{result.linkLabel}</span>
								{/if}
							</article>
						{/each}
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

	button {
		background: var(--ec-link);
		border: 2px solid transparent;
		color: var(--ec-white);
		cursor: pointer;
		padding: 0.75rem 1.125rem;
	}

	button:hover {
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
```

- [ ] **Step 5: Run route tests to verify GREEN**

Run:

```bash
node --import tsx --test test/search-results.test.mjs test/search-ui-contract.test.mjs
```

Expected: PASS.

- [ ] **Step 6: Commit Task 2**

Run:

```bash
git add src/routes/search/+page.server.ts src/routes/search/+page.svelte test/search-results.test.mjs test/search-ui-contract.test.mjs
git commit -m "feat: add search results page"
```

## Task 3: Header Search Modal

**Files:**
- Modify: `src/lib/components/site/PrimaryNav.svelte`
- Modify: `test/search-ui-contract.test.mjs`

- [ ] **Step 1: Add failing header modal contract assertions**

Append to `test/search-ui-contract.test.mjs`:

```js
test('primary nav exposes accessible search buttons and modal form', () => {
	const source = readFileSync('src/lib/components/site/PrimaryNav.svelte', 'utf8');

	assert.match(source, /import \{ tick \} from 'svelte';/);
	assert.match(source, /let searchOpen = \$state\(false\);/);
	assert.match(source, /aria-label="Open search"/);
	assert.match(source, /class="search-toggle desktop-search"/);
	assert.match(source, /class="search-toggle mobile-search"/);
	assert.match(source, /role="dialog"/);
	assert.match(source, /aria-modal="true"/);
	assert.match(source, /bind:this=\{searchInput\}/);
	assert.match(source, /name="keyword"/);
	assert.match(source, /action="\/search"/);
	assert.match(source, /method="GET"/);
	assert.match(source, /placeholder="Search resources and events"/);
	assert.match(source, /onclick=\{closeSearch\}/);
});
```

- [ ] **Step 2: Run UI tests to verify RED**

Run:

```bash
node --import tsx --test test/search-ui-contract.test.mjs
```

Expected: FAIL because `PrimaryNav.svelte` has no search modal yet.

- [ ] **Step 3: Implement `PrimaryNav.svelte` state and handlers**

Modify the `<script>` block in `src/lib/components/site/PrimaryNav.svelte`:

```svelte
<script lang="ts">
  import { tick } from 'svelte';
  import { isExternalLink } from "$lib/content/links";
  import { getRoutePage } from "$lib/content/route-metadata";
  import type { RoutePageKey, SiteSectionKey } from "$lib/content/route-metadata";
  import type { FooterColumn, LinkItem, SiteChrome } from "$lib/content/types";
  import Container from "./Container.svelte";
```

Add state after `let menuOpen = $state(false);`:

```ts
  let searchOpen = $state(false);
  let searchInput: HTMLInputElement | undefined = $state();
  const searchDialogId = `${uid}-search-dialog`;
  const searchTitleId = `${uid}-search-title`;
  const searchInputId = `${uid}-search-input`;
```

Add handlers after `closeMenu()`:

```ts
  async function openSearch() {
    searchOpen = true;
    await tick();
    searchInput?.focus();
  }

  function closeSearch() {
    searchOpen = false;
  }
```

Update `handleKeydown()`:

```ts
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      if (searchOpen) {
        closeSearch();
        return;
      }

      closeMenu();
    }
  }
```

- [ ] **Step 4: Implement header buttons and modal markup**

Add this button immediately after the desktop `.links` div inside `<Container>`:

```svelte
    <button
      class="search-toggle desktop-search"
      type="button"
      aria-label="Open search"
      aria-haspopup="dialog"
      onclick={openSearch}
    >
      <i class="ti ti-search" aria-hidden="true"></i>
    </button>
```

Add this mobile button before the existing `.menu-toggle` button:

```svelte
  <button
    class="search-toggle mobile-search"
    type="button"
    aria-label="Open search"
    aria-haspopup="dialog"
    onclick={openSearch}
  >
    <i class="ti ti-search" aria-hidden="true"></i>
  </button>
```

Add this modal block before the `{#if menuOpen}` drawer block:

```svelte
{#if searchOpen}
  <div class="search-layer">
    <button class="search-scrim" type="button" aria-label="Close search" onclick={closeSearch}></button>

    <div
      id={searchDialogId}
      class="search-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby={searchTitleId}
    >
      <div class="search-dialog-header">
        <h2 id={searchTitleId}>Search</h2>
        <button class="search-close" type="button" aria-label="Close search" onclick={closeSearch}>
          <i class="ti ti-x" aria-hidden="true"></i>
        </button>
      </div>

      <form class="modal-search-form" action="/search" method="GET" role="search">
        <label for={searchInputId}>Search by keyword</label>
        <input
          id={searchInputId}
          bind:this={searchInput}
          name="keyword"
          type="search"
          placeholder="Search resources and events"
          autocomplete="off"
        />
        <button type="submit">
          <i class="ti ti-search" aria-hidden="true"></i>
          <span>Search</span>
        </button>
      </form>
    </div>
  </div>
{/if}
```

- [ ] **Step 5: Add modal and button CSS**

Add styles near the existing button styles in `PrimaryNav.svelte`:

```css
  .search-toggle {
    align-items: center;
    align-self: center;
    background: transparent;
    border: 0;
    color: var(--ec-white);
    display: inline-flex;
    flex: 0 0 auto;
    height: 2.75rem;
    justify-content: center;
    margin-left: 1rem;
    padding: 0;
    width: 2.75rem;
  }

  .search-toggle i {
    font-size: 1.375rem;
  }

  .search-toggle:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .search-toggle:active {
    transform: translateY(1px);
  }

  .mobile-search {
    display: none;
    margin-left: auto;
    margin-right: 0.25rem;
  }

  .search-layer {
    inset: 0;
    position: fixed;
    z-index: 100;
  }

  .search-scrim {
    background: rgba(12, 23, 29, 0.56);
    border: 0;
    inset: 0;
    position: absolute;
    width: 100%;
  }

  .search-dialog {
    background: var(--ec-white);
    border-radius: 8px;
    box-shadow: 0 1.5rem 4rem rgba(12, 23, 29, 0.28);
    display: grid;
    gap: 1.25rem;
    left: 50%;
    max-width: min(92vw, 34rem);
    padding: 1.25rem;
    position: absolute;
    top: 18vh;
    transform: translateX(-50%);
    width: 100%;
  }

  .search-dialog-header {
    align-items: center;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
  }

  .search-dialog h2 {
    color: var(--ec-navy);
    font-family: var(--ec-font-sans);
    font-size: 1.5rem;
    line-height: 1.2;
    margin: 0;
  }

  .search-close {
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: 6px;
    color: var(--ec-navy);
    display: inline-flex;
    height: 2.5rem;
    justify-content: center;
    width: 2.5rem;
  }

  .search-close:hover {
    background: var(--ec-surface);
  }

  .modal-search-form {
    display: grid;
    gap: 0.75rem;
  }

  .modal-search-form label {
    color: var(--ec-navy);
    font-family: var(--ec-font-sans);
    font-weight: 700;
  }

  .modal-search-form input {
    border: 1px solid var(--ec-border);
    border-radius: 6px;
    color: var(--ec-ink);
    min-height: 3rem;
    padding: 0.75rem 1rem;
    width: 100%;
  }

  .modal-search-form button {
    align-items: center;
    background: var(--ec-link);
    border: 2px solid transparent;
    border-radius: 6px;
    color: var(--ec-white);
    display: inline-flex;
    font-weight: 600;
    gap: 0.5rem;
    justify-content: center;
    justify-self: start;
    min-height: 2.875rem;
    padding: 0.75rem 1.125rem;
  }

  .modal-search-form button:hover {
    background: var(--ec-violet-dark);
  }
```

Update the mobile media query:

```css
    .desktop-search {
      display: none;
    }

    .mobile-search {
      display: inline-flex;
    }
```

Update the reduced-motion selector:

```css
    .search-toggle,
    .search-close,
    .modal-search-form button,
```

- [ ] **Step 6: Run UI tests to verify GREEN**

Run:

```bash
node --import tsx --test test/search-ui-contract.test.mjs
```

Expected: PASS.

- [ ] **Step 7: Commit Task 3**

Run:

```bash
git add src/lib/components/site/PrimaryNav.svelte test/search-ui-contract.test.mjs
git commit -m "feat: add header search modal"
```

## Task 4: Final Verification

**Files:**
- Verify: all feature files

- [ ] **Step 1: Run focused tests**

Run:

```bash
node --import tsx --test test/search-results.test.mjs test/search-ui-contract.test.mjs
```

Expected: PASS.

- [ ] **Step 2: Run Svelte type and accessibility-oriented checks**

Run:

```bash
npm run check
```

Expected: PASS.

- [ ] **Step 3: Run production build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 4: Review final diff**

Run:

```bash
git diff --stat HEAD~3..HEAD
git status --short
```

Expected: Search feature commits are present, and no unrelated files are staged or modified.
