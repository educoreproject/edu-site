import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('site pagination component exposes reusable page and page-size controls', () => {
	const componentPath = 'src/lib/components/site/Pagination.svelte';

	assert.equal(existsSync(componentPath), true);

	const source = readFileSync(componentPath, 'utf8');

	assert.match(source, /currentPage = \$bindable\(1\)/);
	assert.match(source, /itemsPerPage = \$bindable\(25\)/);
	assert.match(source, /pageSizeOptions = \[10, 25, 50, 100\]/);
	assert.match(source, /let totalPages = \$derived\(Math\.max\(1, Math\.ceil\(totalItems \/ itemsPerPage\)\)\)/);
	assert.match(source, /function goToPage\(page: number\)/);
	assert.match(source, /Math\.min\(Math\.max\(page, 1\), totalPages\)/);
	assert.match(source, /function updateItemsPerPage\(event: Event\)/);
	assert.match(source, /currentPage = 1;/);
	assert.match(source, /aria-label="First page"[\s\S]*?disabled=\{currentPage === 1\}/);
	assert.match(source, /aria-label="Previous page"[\s\S]*?disabled=\{currentPage === 1\}/);
	assert.match(source, /aria-label="Next page"[\s\S]*?disabled=\{currentPage === totalPages\}/);
	assert.match(source, /aria-label="Last page"[\s\S]*?disabled=\{currentPage === totalPages\}/);
	assert.match(source, /\{#each pages as page\}/);
	assert.match(source, /aria-current=\{page === currentPage \? 'page' : undefined\}/);
});

test('glossary page uses pagination to render the current slice of filtered terms', () => {
	const source = readFileSync('src/routes/resources/glossary/+page.svelte', 'utf8');

	assert.match(source, /import Pagination from '\$lib\/components\/site\/Pagination\.svelte';/);
	assert.match(source, /let currentPage = \$state\(1\);/);
	assert.match(source, /let itemsPerPage = \$state\(25\);/);
	assert.match(source, /let paginatedTerms = \$derived\([\s\S]*?filteredTerms\.slice\(firstTermIndex, firstTermIndex \+ itemsPerPage\)/);
	assert.match(source, /function handleCategoryChange\(category: string\)[\s\S]*?currentPage = 1;/);
	assert.match(source, /<CategorySelector[\s\S]*?allCategoryLabel="All terms"[\s\S]*?onSelect=\{handleCategoryChange\}/);
	assert.match(source, /\{#each paginatedTerms as item\}/);
	assert.match(source, /<Pagination[\s\S]*?totalItems=\{filteredTerms\.length\}[\s\S]*?bind:currentPage[\s\S]*?bind:itemsPerPage/);
});
