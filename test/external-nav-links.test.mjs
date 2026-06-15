import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('shared nav links identify external destinations from hrefs', () => {
	const source = readFileSync('src/lib/content/links.ts', 'utf8');

	assert.match(source, /export function isExternalLink\(href\?: string\)/);
	assert.match(source, /https\?:/);
	assert.match(source, /mailto:/);
	assert.match(source, /tel:/);
	assert.match(source, /href\.startsWith\('\/\/'\)/);
});

test('subnav external links open in a new tab and show an icon', () => {
	const source = readFileSync('src/lib/components/site/SubNav.svelte', 'utf8');

	assert.match(source, /import \{ isExternalLink \} from ['"]\$lib\/content\/links['"];/);
	assert.match(source, /const isExternal = isExternalLink\(link\.href\)/);
	assert.match(source, /target=\{isExternal \? ['"]_blank['"] : undefined\}/);
	assert.match(source, /rel=\{isExternal \? ['"]noopener noreferrer['"] : undefined\}/);
	assert.match(source, /ti ti-external-link/);
	assert.match(source, /<span class="sr-only">Opens in a new tab<\/span>/);
});

test('footer and mobile drawer use the same external-link behavior', () => {
	const footerSource = readFileSync('src/lib/components/site/PageFooter.svelte', 'utf8');
	const primaryNavSource = readFileSync('src/lib/components/site/PrimaryNav.svelte', 'utf8');

	for (const source of [footerSource, primaryNavSource]) {
		assert.match(source, /import \{ isExternalLink \} from ['"]\$lib\/content\/links['"];/);
		assert.match(source, /target=\{[^}]*\? ['"]_blank['"] : undefined\}/);
		assert.match(source, /rel=\{[^}]*\? ['"]noopener noreferrer['"] : undefined\}/);
		assert.match(source, /ti ti-external-link/);
		assert.match(source, /<span class="sr-only">Opens in a new tab<\/span>/);
	}
});

test('footer disabled styles only target disabled link placeholders', () => {
	const source = readFileSync('src/lib/components/site/PageFooter.svelte', 'utf8');

	assert.doesNotMatch(source, /\n\tli span\s*\{/);
	assert.match(source, /li > span\[aria-disabled="true"\]\s*\{/);
});

test('resources hub cards open external CTA destinations in a new tab', () => {
	const source = readFileSync('src/routes/resources/+page.svelte', 'utf8');

	assert.match(source, /import \{ isExternalLink \} from '\$lib\/content\/links';/);
	assert.match(source, /const isExternal = isExternalLink\(card\.cta\.href\)/);
	assert.match(source, /target=\{isExternal \? '_blank' : undefined\}/);
	assert.match(source, /rel=\{isExternal \? 'noopener noreferrer' : undefined\}/);
});

test('resources demo seed preserves edited external EdMatrix links', () => {
	const source = readFileSync('studio/migrations/seed-resources-library-demo.ts', 'utf8');

	assert.match(source, /async function getResourcesSubNav\(\)/);
	assert.match(source, /findExistingResourcesLink\('standards-matrix'\)/);
	assert.match(source, /find\(\(link\) => link\._key === key && link\.disabled === false\)/);
	assert.match(source, /find\(\(link\) => link\._key === key && \/\^https\?:\//);
	assert.match(source, /label:\s*existingStandardsMatrix\?\.label \?\? 'EdMatrix'/);
	assert.match(source, /href:\s*existingStandardsMatrix\?\.href \?\? '\/resources\/standards-matrix'/);
	assert.match(source, /disabled:\s*existingStandardsMatrix\?\.disabled \?\? true/);
	assert.match(source, /const standardsMatrixLink = resourcesSubNav\.find/);
	assert.match(source, /card\.title\?\.toLowerCase\(\)\.includes\('standards matrix'\)/);
	assert.match(source, /href:\s*standardsMatrixLink\?\.href \?\? card\.cta\?\.href/);
});
