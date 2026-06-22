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
