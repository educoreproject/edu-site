import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('site category selector component exposes the updated reusable left rail pattern', () => {
	const componentPath = 'src/lib/components/site/CategorySelector.svelte';

	assert.equal(existsSync(componentPath), true);

	const source = readFileSync(componentPath, 'utf8');

	assert.match(source, /selectedCategory = \$bindable\(''\)/);
	assert.match(source, /allCategoryLabel = 'All items'/);
	assert.match(source, /let displayedCategories = \$derived\(/);
	assert.match(source, /\[allCategoryLabel, \.\.\.categories\]/);
	assert.match(source, /function selectCategory\(category: string\)/);
	assert.match(source, /selectedCategory = isAllCategory\(category\) \? '' : category;/);
	assert.match(source, /<aside class="category-list" aria-label=\{label\}>/);
	assert.match(source, /<p class="category-list-title">\{title\}<\/p>/);
	assert.match(source, /\{#each displayedCategories as category\}/);
	assert.match(source, /class:current=\{isSelectedCategory\(category\)\}/);
	assert.match(source, /aria-pressed=\{isSelectedCategory\(category\)\}/);
	assert.match(source, /\.category-list\s*\{[\s\S]*?position:\s*sticky;/);
	assert.match(source, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.category-list\s*\{[\s\S]*?display:\s*none;/);
});

test('FAQ page filters by category, shows empty states, and paginates filtered items', () => {
	const source = readFileSync('src/routes/resources/faq/+page.svelte', 'utf8');
	const loadSource = readFileSync('src/routes/resources/faq/+page.server.ts', 'utf8');

	assert.match(source, /import CategorySelector from '\$lib\/components\/site\/CategorySelector\.svelte';/);
	assert.match(source, /import Pagination from '\$lib\/components\/site\/Pagination\.svelte';/);
	assert.match(source, /let selectedCategory = \$state\(''\);/);
	assert.match(source, /let currentPage = \$state\(1\);/);
	assert.match(source, /let itemsPerPage = \$state\(25\);/);
	assert.match(source, /let defaultItemCategory = \$derived\(page\.categories\[0\] \?\? ''\);/);
	assert.match(source, /function itemBelongsToCategory\(item: ResourcesFaqPage\['items'\]\[number\]\)/);
	assert.match(source, /return \(item\.category \?\? defaultItemCategory\) === selectedCategory;/);
	assert.match(source, /let filteredItems = \$derived\([\s\S]*?page\.items\.filter\(itemBelongsToCategory\)/);
	assert.match(source, /filteredItems\.slice\(firstItemIndex, firstItemIndex \+ itemsPerPage\)/);
	assert.match(source, /function handleCategoryChange\(category: string\)/);
	assert.match(source, /currentPage = 1;/);
	assert.match(source, /<CategorySelector[\s\S]*?categories=\{page\.categories\}[\s\S]*?allCategoryLabel="All FAQs"[\s\S]*?bind:selectedCategory[\s\S]*?onSelect=\{handleCategoryChange\}/);
	assert.match(source, /\{#if filteredItems\.length\}/);
	assert.match(source, /\{#each paginatedItems as item\}/);
	assert.match(source, /No items available/);
	assert.match(source, /There are no FAQ items available for \{selectedCategory\} yet\./);
	assert.match(source, /<Pagination[\s\S]*?totalItems=\{filteredItems\.length\}[\s\S]*?bind:currentPage[\s\S]*?bind:itemsPerPage/);
	assert.equal(existsSync('src/routes/resources/faq/+page.ts'), false);
	assert.match(loadSource, /getResourcesFaqPage/);
	assert.match(loadSource, /getSiteChrome/);
});

test('glossary page keeps using the updated category selector pattern', () => {
	const source = readFileSync('src/routes/resources/glossary/+page.svelte', 'utf8');

	assert.match(source, /import CategorySelector from '\$lib\/components\/site\/CategorySelector\.svelte';/);
	assert.match(source, /<CategorySelector[\s\S]*?categories=\{page\.categories\}[\s\S]*?allCategoryLabel="All terms"[\s\S]*?bind:selectedCategory[\s\S]*?onSelect=\{handleCategoryChange\}/);
});
