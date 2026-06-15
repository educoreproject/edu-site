import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('resources library schema registers downloadable white papers and reports', () => {
	const schemaSource = readFileSync('studio/schemaTypes/resourcesLibrary.ts', 'utf8');
	const objectsSource = readFileSync('studio/schemaTypes/objects.ts', 'utf8');
	const indexSource = readFileSync('studio/schemaTypes/index.ts', 'utf8');

	assert.match(schemaSource, /name:\s*'resourcesLibrary'/);
	assert.match(schemaSource, /initialValue:\s*\{current:\s*'resources-library'\}/);
	assert.match(schemaSource, /name:\s*'categories'[\s\S]*?\{title:\s*'White papers',\s*value:\s*'White papers'\}/);
	assert.match(schemaSource, /name:\s*'categories'[\s\S]*?\{title:\s*'Reports',\s*value:\s*'Reports'\}/);
	assert.match(schemaSource, /name:\s*'items'[\s\S]*?type:\s*'resourceDocument'/);

	assert.match(objectsSource, /export const resourceDocument = defineType\(\{/);
	assert.match(objectsSource, /name:\s*'resourceDocument'/);
	assert.match(objectsSource, /name:\s*'category'[\s\S]*?\{title:\s*'White paper',\s*value:\s*'White papers'\}/);
	assert.match(objectsSource, /name:\s*'category'[\s\S]*?\{title:\s*'Report',\s*value:\s*'Reports'\}/);
	assert.match(objectsSource, /name:\s*'title'[\s\S]*?validation:\s*\(rule\) => rule\.required\(\)/);
	assert.match(objectsSource, /name:\s*'documentType'[\s\S]*?\{title:\s*'PDF',\s*value:\s*'PDF'\}/);
	assert.match(objectsSource, /name:\s*'documentType'[\s\S]*?\{title:\s*'Word doc',\s*value:\s*'Word doc'\}/);
	assert.match(objectsSource, /name:\s*'description'[\s\S]*?type:\s*'text'/);
	assert.match(objectsSource, /name:\s*'document'[\s\S]*?type:\s*'file'/);
	assert.match(objectsSource, /accept:\s*'\.pdf,\.doc,\.docx,application\/pdf,application\/msword,application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document'/);

	assert.match(indexSource, /resourceDocument/);
	assert.match(indexSource, /resourcesLibrary/);
});

test('resources press schema registers downloadable press releases and charters', () => {
	const schemaSource = readFileSync('studio/schemaTypes/resourcesPress.ts', 'utf8');
	const objectsSource = readFileSync('studio/schemaTypes/objects.ts', 'utf8');
	const indexSource = readFileSync('studio/schemaTypes/index.ts', 'utf8');

	assert.match(schemaSource, /name:\s*'resourcesPress'/);
	assert.match(schemaSource, /initialValue:\s*\{current:\s*'resources-press'\}/);
	assert.match(schemaSource, /name:\s*'categories'[\s\S]*?\{title:\s*'Press releases',\s*value:\s*'Press releases'\}/);
	assert.match(schemaSource, /name:\s*'categories'[\s\S]*?\{title:\s*'Charters',\s*value:\s*'Charters'\}/);
	assert.match(schemaSource, /name:\s*'items'[\s\S]*?type:\s*'pressDocument'/);

	assert.match(objectsSource, /export const pressDocument = defineType\(\{/);
	assert.match(objectsSource, /name:\s*'pressDocument'/);
	assert.match(objectsSource, /name:\s*'category'[\s\S]*?\{title:\s*'Press release',\s*value:\s*'Press releases'\}/);
	assert.match(objectsSource, /name:\s*'category'[\s\S]*?\{title:\s*'Charter',\s*value:\s*'Charters'\}/);
	assert.match(objectsSource, /name:\s*'documentType'[\s\S]*?\{title:\s*'PDF',\s*value:\s*'PDF'\}/);
	assert.match(objectsSource, /name:\s*'document'[\s\S]*?type:\s*'file'/);

	assert.match(indexSource, /pressDocument/);
	assert.match(indexSource, /resourcesPress/);
});

test('resources newsletter schema registers downloadable newsletters grouped by month and year', () => {
	const schemaSource = readFileSync('studio/schemaTypes/resourcesNewsletter.ts', 'utf8');
	const objectsSource = readFileSync('studio/schemaTypes/objects.ts', 'utf8');
	const indexSource = readFileSync('studio/schemaTypes/index.ts', 'utf8');

	assert.match(schemaSource, /name:\s*'resourcesNewsletter'/);
	assert.match(schemaSource, /initialValue:\s*\{current:\s*'resources-newsletter'\}/);
	assert.match(schemaSource, /name:\s*'categories'[\s\S]*?description:\s*'Use month and year labels such as January 2026 or December 2025\.'/);
	assert.match(schemaSource, /name:\s*'items'[\s\S]*?type:\s*'newsletterDocument'/);

	assert.match(objectsSource, /export const newsletterDocument = defineType\(\{/);
	assert.match(objectsSource, /name:\s*'newsletterDocument'/);
	assert.match(objectsSource, /name:\s*'category'[\s\S]*?description:\s*'Month and year label, such as January 2026\.'/);
	assert.match(objectsSource, /name:\s*'title'[\s\S]*?validation:\s*\(rule\) => rule\.required\(\)/);
	assert.match(objectsSource, /name:\s*'documentType'[\s\S]*?\{title:\s*'PDF',\s*value:\s*'PDF'\}/);
	assert.match(objectsSource, /name:\s*'documentType'[\s\S]*?\{title:\s*'Word doc',\s*value:\s*'Word doc'\}/);
	assert.match(objectsSource, /name:\s*'description'[\s\S]*?type:\s*'text'/);
	assert.match(objectsSource, /name:\s*'document'[\s\S]*?type:\s*'file'/);

	assert.match(indexSource, /newsletterDocument/);
	assert.match(indexSource, /resourcesNewsletter/);
});

test('resources library content contract projects downloadable file metadata', () => {
	const querySource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const typesSource = readFileSync('src/lib/content/types.ts', 'utf8');
	const siteSource = readFileSync('src/lib/content/site.ts', 'utf8');

	assert.match(querySource, /export const resourcesLibraryQuery = `\*\[_type == "resourcesLibrary" && slug\.current == "resources-library"\]\[0\]\{/);
	assert.match(querySource, /"categories":\s*coalesce\(categories,\s*\[\]\)/);
	assert.match(querySource, /"items":\s*coalesce\(items\[\]\{[\s\S]*?category[\s\S]*?title[\s\S]*?documentType[\s\S]*?description/);
	assert.match(querySource, /"document":\s*\{[\s\S]*?"url":\s*document\.asset->url[\s\S]*?"filename":\s*document\.asset->originalFilename[\s\S]*?"mimeType":\s*document\.asset->mimeType[\s\S]*?"size":\s*document\.asset->size/);

	assert.match(typesSource, /export type ResourceDocumentItem = \{/);
	assert.match(typesSource, /category:\s*'White papers' \| 'Reports'/);
	assert.match(typesSource, /documentType:\s*string/);
	assert.match(typesSource, /description\?:\s*string/);
	assert.match(typesSource, /document:\s*\{[\s\S]*?url:\s*string;[\s\S]*?filename\?:\s*string;[\s\S]*?mimeType\?:\s*string;[\s\S]*?size\?:\s*number;/);
	assert.match(typesSource, /export type ResourcesLibraryPage = \{/);
	assert.match(typesSource, /items:\s*ResourceDocumentItem\[\]/);

	assert.match(siteSource, /resourcesLibraryQuery/);
	assert.match(siteSource, /ResourcesLibraryPage/);
	assert.match(siteSource, /export function getResourcesLibraryPage\(\): Promise<ResourcesLibraryPage>/);
});

test('resources press content contract projects downloadable file metadata', () => {
	const querySource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const typesSource = readFileSync('src/lib/content/types.ts', 'utf8');
	const siteSource = readFileSync('src/lib/content/site.ts', 'utf8');

	assert.match(querySource, /export const resourcesPressQuery = `\*\[_type == "resourcesPress" && slug\.current == "resources-press"\]\[0\]\{/);
	assert.match(querySource, /"categories":\s*coalesce\(categories,\s*\[\]\)/);
	assert.match(querySource, /"items":\s*coalesce\(items\[\]\{[\s\S]*?category[\s\S]*?title[\s\S]*?documentType[\s\S]*?description/);
	assert.match(querySource, /"document":\s*\{[\s\S]*?"url":\s*document\.asset->url[\s\S]*?"filename":\s*document\.asset->originalFilename[\s\S]*?"mimeType":\s*document\.asset->mimeType[\s\S]*?"size":\s*document\.asset->size/);

	assert.match(typesSource, /export type PressDocumentItem = \{/);
	assert.match(typesSource, /category:\s*'Press releases' \| 'Charters'/);
	assert.match(typesSource, /export type ResourcesPressPage = \{/);
	assert.match(typesSource, /items:\s*PressDocumentItem\[\]/);

	assert.match(siteSource, /resourcesPressQuery/);
	assert.match(siteSource, /ResourcesPressPage/);
	assert.match(siteSource, /export function getResourcesPressPage\(\): Promise<ResourcesPressPage>/);
});

test('resources newsletter content contract projects downloadable file metadata', () => {
	const querySource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const typesSource = readFileSync('src/lib/content/types.ts', 'utf8');
	const siteSource = readFileSync('src/lib/content/site.ts', 'utf8');

	assert.match(querySource, /export const resourcesNewsletterQuery = `\*\[_type == "resourcesNewsletter" && slug\.current == "resources-newsletter"\]\[0\]\{/);
	assert.match(querySource, /"categories":\s*coalesce\(categories,\s*\[\]\)/);
	assert.match(querySource, /"items":\s*coalesce\(items\[\]\{[\s\S]*?category[\s\S]*?title[\s\S]*?documentType[\s\S]*?description/);
	assert.match(querySource, /"document":\s*\{[\s\S]*?"url":\s*document\.asset->url[\s\S]*?"filename":\s*document\.asset->originalFilename[\s\S]*?"mimeType":\s*document\.asset->mimeType[\s\S]*?"size":\s*document\.asset->size/);

	assert.match(typesSource, /export type NewsletterDocumentItem = \{/);
	assert.match(typesSource, /category:\s*string/);
	assert.match(typesSource, /documentType:\s*string/);
	assert.match(typesSource, /description\?:\s*string/);
	assert.match(typesSource, /document:\s*\{[\s\S]*?url:\s*string;[\s\S]*?filename\?:\s*string;[\s\S]*?mimeType\?:\s*string;[\s\S]*?size\?:\s*number;/);
	assert.match(typesSource, /export type ResourcesNewsletterPage = \{/);
	assert.match(typesSource, /categories:\s*NewsletterDocumentItem\['category'\]\[\]/);
	assert.match(typesSource, /items:\s*NewsletterDocumentItem\[\]/);

	assert.match(siteSource, /resourcesNewsletterQuery/);
	assert.match(siteSource, /ResourcesNewsletterPage/);
	assert.match(siteSource, /export function getResourcesNewsletterPage\(\): Promise<ResourcesNewsletterPage>/);
});

test('resources library route mirrors FAQ and glossary category layout', () => {
	const pagePath = 'src/routes/resources/library/+page.svelte';
	const loadPath = 'src/routes/resources/library/+page.server.ts';

	assert.equal(existsSync(pagePath), true);
	assert.equal(existsSync(loadPath), true);
	assert.equal(existsSync('src/routes/resources/library/+page.ts'), false);

	const source = readFileSync(pagePath, 'utf8');
	const loadSource = readFileSync(loadPath, 'utf8');

	assert.match(loadSource, /getResourcesLibraryPage/);
	assert.match(loadSource, /getSiteChrome/);

	assert.match(source, /import CategorySelector from '\$lib\/components\/site\/CategorySelector\.svelte';/);
	assert.match(source, /import Pagination from '\$lib\/components\/site\/Pagination\.svelte';/);
	assert.match(source, /type \{ ResourcesLibraryPage, SiteChrome \}/);
	assert.match(source, /let selectedCategory = \$state\(''\);/);
	assert.match(source, /let currentPage = \$state\(1\);/);
	assert.match(source, /let itemsPerPage = \$state\(25\);/);
	assert.match(source, /let filteredItems = \$derived\([\s\S]*?selectedCategory[\s\S]*?page\.items\.filter\(\(item\) => item\.category === selectedCategory\)[\s\S]*?: page\.items/);
	assert.match(source, /filteredItems\.slice\(firstItemIndex, firstItemIndex \+ itemsPerPage\)/);
	assert.match(source, /function handleCategoryChange\(category: string\)/);
	assert.match(source, /currentPage = 1;/);
	assert.match(source, /<PrimaryNav[\s\S]*?activeSubSection="Library"/);
	assert.match(source, /<SubNav[\s\S]*?active="Library"/);
	assert.match(source, /<CategorySelector[\s\S]*?categories=\{page\.categories\}[\s\S]*?label="Resource categories"[\s\S]*?allCategoryLabel="All items"[\s\S]*?bind:selectedCategory[\s\S]*?onSelect=\{handleCategoryChange\}/);
	assert.match(source, /\{#if filteredItems\.length\}/);
	assert.match(source, /\{#each paginatedItems as item\}/);
	assert.match(source, /href=\{item\.document\.url\}/);
	assert.match(source, /download=\{item\.document\.filename \?\? true\}/);
	assert.match(source, /\{item\.documentType\}/);
	assert.match(source, /No documents available/);
	assert.match(source, /There are no resources available for \{selectedCategory\} yet\./);
	assert.match(source, /<Pagination[\s\S]*?totalItems=\{filteredItems\.length\}[\s\S]*?bind:currentPage[\s\S]*?bind:itemsPerPage/);
});

test('resources press route mirrors library document layout', () => {
	const pagePath = 'src/routes/resources/press/+page.svelte';
	const loadPath = 'src/routes/resources/press/+page.server.ts';

	assert.equal(existsSync(pagePath), true);
	assert.equal(existsSync(loadPath), true);

	const source = readFileSync(pagePath, 'utf8');
	const loadSource = readFileSync(loadPath, 'utf8');

	assert.match(loadSource, /getResourcesPressPage/);
	assert.match(loadSource, /getSiteChrome/);

	assert.match(source, /type \{ ResourcesPressPage, SiteChrome \}/);
	assert.match(source, /let selectedCategory = \$state\(''\);/);
	assert.match(source, /let currentPage = \$state\(1\);/);
	assert.match(source, /let itemsPerPage = \$state\(25\);/);
	assert.match(source, /page\.items\.filter\(\(item\) => item\.category === selectedCategory\)/);
	assert.match(source, /activeSubSection="Press & charter"/);
	assert.match(source, /<SubNav[\s\S]*?active="Press & charter"/);
	assert.match(source, /allCategoryLabel="All items"/);
	assert.match(source, /href=\{item\.document\.url\}/);
	assert.match(source, /download=\{item\.document\.filename \?\? true\}/);
	assert.match(source, /\{item\.documentType\}/);
	assert.match(source, /Press releases and charters/);
	assert.match(source, /No documents available/);
	assert.match(source, /<Pagination[\s\S]*?totalItems=\{filteredItems\.length\}[\s\S]*?bind:currentPage[\s\S]*?bind:itemsPerPage/);
});

test('resources newsletter route mirrors document layout with month-year categories', () => {
	const pagePath = 'src/routes/resources/newsletter/+page.svelte';
	const loadPath = 'src/routes/resources/newsletter/+page.server.ts';

	assert.equal(existsSync(pagePath), true);
	assert.equal(existsSync(loadPath), true);

	const source = readFileSync(pagePath, 'utf8');
	const loadSource = readFileSync(loadPath, 'utf8');

	assert.match(loadSource, /getResourcesNewsletterPage/);
	assert.match(loadSource, /getSiteChrome/);

	assert.match(source, /type \{ ResourcesNewsletterPage, SiteChrome \}/);
	assert.match(source, /let selectedCategory = \$state\(''\);/);
	assert.match(source, /let currentPage = \$state\(1\);/);
	assert.match(source, /let itemsPerPage = \$state\(25\);/);
	assert.match(source, /page\.items\.filter\(\(item\) => item\.category === selectedCategory\)/);
	assert.match(source, /activeSubSection="Newsletter"/);
	assert.match(source, /<SubNav[\s\S]*?active="Newsletter"/);
	assert.match(source, /label="Newsletter archive months"/);
	assert.match(source, /allCategoryLabel="All items"/);
	assert.match(source, /href=\{item\.document\.url\}/);
	assert.match(source, /download=\{item\.document\.filename \?\? true\}/);
	assert.match(source, /\{item\.documentType\}/);
	assert.match(source, /Newsletter archive/);
	assert.match(source, /No newsletters available/);
	assert.match(source, /There are no newsletters available for \{selectedCategory\} yet\./);
	assert.match(source, /<Pagination[\s\S]*?totalItems=\{filteredItems\.length\}[\s\S]*?bind:currentPage[\s\S]*?bind:itemsPerPage/);
});

test('resources hub and library routes expose distinct subnav destinations', () => {
	const hubSource = readFileSync('src/routes/resources/+page.svelte', 'utf8');
	const librarySource = readFileSync('src/routes/resources/library/+page.svelte', 'utf8');
	const pressSource = readFileSync('src/routes/resources/press/+page.svelte', 'utf8');
	const newsletterSource = readFileSync('src/routes/resources/newsletter/+page.svelte', 'utf8');
	const migrationPath = 'studio/migrations/seed-resources-library-demo.ts';

	assert.match(hubSource, /activeSubSection="Hub"/);
	assert.match(hubSource, /<SubNav[\s\S]*?active="Hub"/);
	assert.match(librarySource, /activeSubSection="Library"/);
	assert.match(librarySource, /<SubNav[\s\S]*?active="Library"/);
	assert.match(pressSource, /activeSubSection="Press & charter"/);
	assert.match(pressSource, /<SubNav[\s\S]*?active="Press & charter"/);
	assert.match(newsletterSource, /activeSubSection="Newsletter"/);
	assert.match(newsletterSource, /<SubNav[\s\S]*?active="Newsletter"/);

	assert.equal(existsSync(migrationPath), true);

	const migrationSource = readFileSync(migrationPath, 'utf8');

	assert.match(migrationSource, /async function getResourcesSubNav\(\)/);
	assert.match(migrationSource, /\{_key: 'hub', _type: 'linkItem', label: 'Hub', href: '\/resources'\}/);
	assert.match(migrationSource, /\{_key: 'library', _type: 'linkItem', label: 'Library', href: '\/resources\/library'\}/);
	assert.match(migrationSource, /\{_key: 'newsletter', _type: 'linkItem', label: 'Newsletter', href: '\/resources\/newsletter'\}/);
	assert.match(migrationSource, /\{_key: 'glossary', _type: 'linkItem', label: 'Glossary', href: '\/resources\/glossary'\}/);
	assert.match(migrationSource, /\{_key: 'faq', _type: 'linkItem', label: 'FAQ', href: '\/resources\/faq'\}/);
	assert.match(migrationSource, /_key: 'standards-matrix'[\s\S]*?label: existingStandardsMatrix\?\.label \?\? 'EdMatrix'[\s\S]*?href: existingStandardsMatrix\?\.href \?\? '\/resources\/standards-matrix'/);
	assert.match(migrationSource, /\{_key: 'press-charter', _type: 'linkItem', label: 'Press & charter', href: '\/resources\/press'\}/);
	assert.match(migrationSource, /documentIds = \['resourcesHub', 'resourcesLibrary', 'resourcesPress', 'resourcesNewsletter', 'resourcesGlossary', 'resourcesFaq'\]/);
	assert.match(migrationSource, /client\.getDocument\('siteChrome'\)/);
	assert.match(migrationSource, /column\.heading === 'Resources'[\s\S]*?links:\s*resourcesSubNav/);
	assert.match(migrationSource, /client\.createIfNotExists\(\{[\s\S]*?_id: 'resourcesLibrary'/);
	assert.match(migrationSource, /client\.createIfNotExists\(\{[\s\S]*?_id: 'resourcesPress'/);
	assert.match(migrationSource, /client\.createIfNotExists\(\{[\s\S]*?_id: 'resourcesNewsletter'/);
	assert.match(migrationSource, /assets\.upload\('file'/);
	assert.match(migrationSource, /'Demo white paper: Connected data standards'/);
	assert.match(migrationSource, /'Demo report: Implementation readiness snapshot'/);
	assert.match(migrationSource, /'Demo press release: DSU community update'/);
	assert.match(migrationSource, /'Demo charter: Data collaboration charter'/);
	assert.match(migrationSource, /'Demo newsletter: January 2026 update'/);
	assert.match(migrationSource, /'Demo newsletter: December 2025 digest'/);
});
