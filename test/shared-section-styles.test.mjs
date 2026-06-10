import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const utilitiesSource = readFileSync('src/lib/styles/_utilities.css', 'utf8');
const dsuPagePaths = [
	'src/routes/+page.svelte',
	'src/routes/dsu/joining/+page.svelte',
	'src/routes/dsu/members/+page.svelte',
	'src/routes/dsu/projects/+page.svelte'
];
const routePagePaths = [
	...dsuPagePaths,
	'src/routes/edu/+page.svelte',
	'src/routes/edu/board/+page.svelte',
	'src/routes/edu/contact/+page.svelte',
	'src/routes/edu/history/+page.svelte',
	'src/routes/educore/+page.svelte',
	'src/routes/events/+page.svelte',
	'src/routes/events/past/+page.svelte',
	'src/routes/resources/+page.svelte',
	'src/routes/resources/faq/+page.svelte',
	'src/routes/resources/glossary/+page.svelte'
];

test('shared section primitives live in the global utilities stylesheet', () => {
	for (const selector of [
		'main',
		'.section',
		'.section-padded',
		'.section-header',
		'.eyebrow',
		'main h2',
		'main h2 + p',
		'main p',
		'.horizontal-layout'
	]) {
		assert.equal(
			utilitiesSource.includes(`${selector} {`),
			true,
			`expected ${selector} in utilities stylesheet`
		);
	}
});

test('DSU pages consume shared section primitives instead of redefining them', () => {
	for (const pagePath of dsuPagePaths) {
		const source = readFileSync(pagePath, 'utf8');

		for (const selector of [
			'main',
			'.section',
			'.section-padded',
			'.section-header',
			'.eyebrow',
			'h2',
			'h2 + p',
			'p'
		]) {
			const pattern = new RegExp(`(^|\\n)\\s*${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{`);
			assert.equal(pattern.test(source), false, `${pagePath} still defines ${selector}`);
		}
	}

	const dsuHomeSource = readFileSync('src/routes/+page.svelte', 'utf8');
	assert.equal(dsuHomeSource.includes('values-layout'), false);
	assert.equal(dsuHomeSource.includes('horizontal-layout'), true);
});

test('route pages share global page and type primitives', () => {
	for (const pagePath of routePagePaths) {
		const source = readFileSync(pagePath, 'utf8');

		for (const selector of ['main', '.section', '.section-padded', 'h2', 'h2 + p', 'p']) {
			const pattern = new RegExp(`(^|\\n)\\s*${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{`);
			assert.equal(pattern.test(source), false, `${pagePath} still defines ${selector}`);
		}
	}
});
