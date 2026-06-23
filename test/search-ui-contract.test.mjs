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
	assert.match(source, /import \{ filterSearchResultsByType, getSearchResultTypeOptions \} from '\$lib\/content\/search';/);
	assert.match(source, /<PrimaryNav \{chrome\} \/>/);
	assert.match(source, /<form[\s\S]*?method="GET"[\s\S]*?action="\/search"/);
	assert.match(source, /name="keyword"/);
	assert.match(source, /let selectedResultType = \$state\(''\);/);
	assert.match(source, /let resultTypeOptions = \$derived\(getSearchResultTypeOptions\(results\)\);/);
	assert.match(source, /let filteredResults = \$derived\(filterSearchResultsByType\(results, selectedResultType\)\);/);
	assert.match(source, /Displaying \{filteredResults\.length\}/);
	assert.match(source, /of \{results\.length\}/);
	assert.match(source, /aria-label="Filter by result type"/);
	assert.match(source, /Result type/);
	assert.match(source, /All results/);
	assert.match(source, /aria-pressed=\{!selectedResultType\}/);
	assert.match(source, /aria-pressed=\{selectedResultType === type\}/);
	assert.match(source, /No search yet/);
	assert.match(source, /No results found/);
	assert.match(source, /\{result\.type\}/);
	assert.match(source, /\{#each filteredResults as result \(result\.id\)\}/);
	assert.match(source, /\{#if result\.href && !result\.disabled\}/);
	assert.match(source, /href=\{result\.href\}/);
	assert.match(source, /download=\{result\.download\}/);
	assert.match(source, /aria-disabled="true"/);
});

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
