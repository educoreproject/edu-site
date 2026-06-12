import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const source = readFileSync('src/routes/resources/glossary/+page.svelte', 'utf8');
const selectorSource = readFileSync('src/lib/components/site/CategorySelector.svelte', 'utf8');

test('glossary category selector matches the left rail Figma treatment', () => {
	assert.match(source, /import CategorySelector from '\$lib\/components\/site\/CategorySelector\.svelte';/);
	assert.match(source, /<CategorySelector[\s\S]*?label="Glossary categories"[\s\S]*?allCategoryLabel="All terms"/);
	assert.match(selectorSource, /<p class="category-list-title">\{title\}<\/p>/);
	assert.match(selectorSource, /\.category-list\s*\{[\s\S]*?position:\s*sticky;/);
	assert.match(selectorSource, /\.category-list\s*\{[\s\S]*?top:\s*2rem;/);
	assert.match(selectorSource, /\.category-list-title\s*\{[\s\S]*?text-transform:\s*uppercase;/);
	assert.match(selectorSource, /\.category-list \.current\s*\{[\s\S]*?border-left:\s*3px solid var\(--ec-teal-dark\);/);
	assert.match(selectorSource, /\.category-list \.current\s*\{[\s\S]*?color:\s*var\(--ec-teal-dark\);/);
	assert.match(selectorSource, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.category-list\s*\{[\s\S]*?display:\s*none;/);

	const categoryListBlock = selectorSource.match(/\.category-list\s*\{([\s\S]*?)\n\t\}/)?.[1] ?? '';
	assert.equal(categoryListBlock.includes('background:'), false);
	assert.equal(categoryListBlock.includes('border:'), false);
	assert.equal(categoryListBlock.includes('border-radius:'), false);
});

test('glossary category selector filters terms by the selected category', () => {
	assert.match(source, /let selectedCategory = \$state\(''\);/);
	assert.match(source, /let filteredTerms = \$derived\([\s\S]*?page\.terms\.filter\(\(item\) => item\.category === selectedCategory\)/);
	assert.match(selectorSource, /function selectCategory\(category: string\)/);
	assert.match(selectorSource, /selectedCategory = isAllCategory\(category\) \? '' : category;/);
	assert.match(selectorSource, /function isSelectedCategory\(category: string\)/);
	assert.match(selectorSource, /!selectedCategory && isAllCategory\(category\)/);
	assert.match(selectorSource, /<button[\s\S]*?type="button"[\s\S]*?onclick=\{\(\) => selectCategory\(category\)\}/);
	assert.match(selectorSource, /class:current=\{isSelectedCategory\(category\)\}/);
	assert.match(selectorSource, /aria-pressed=\{isSelectedCategory\(category\)\}/);
	assert.match(source, /filteredTerms\.slice\(firstTermIndex, firstTermIndex \+ itemsPerPage\)/);
	assert.match(source, /\{#each paginatedTerms as item\}/);
});

test('glossary route loads content on the server so the selector can hydrate', () => {
	assert.equal(existsSync('src/routes/resources/glossary/+page.server.ts'), true);
	assert.equal(existsSync('src/routes/resources/glossary/+page.ts'), false);

	const loadSource = readFileSync('src/routes/resources/glossary/+page.server.ts', 'utf8');
	assert.match(loadSource, /getResourcesGlossaryPage/);
	assert.match(loadSource, /getSiteChrome/);
});
