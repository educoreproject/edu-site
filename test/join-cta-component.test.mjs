import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const joinCtaComponentPath = 'src/lib/components/site/JoinCta.svelte';
const dsuPagePaths = [
	'src/routes/dsu/members/+page.svelte',
	'src/routes/dsu/projects/+page.svelte'
];

test('DSU join CTAs use the shared site component', () => {
	assert.equal(existsSync(joinCtaComponentPath), true);

	const componentSource = readFileSync(joinCtaComponentPath, 'utf8');
	assert.equal(componentSource.includes('class="join-cta"'), true);
	assert.equal(componentSource.includes('class="join-panel"'), true);

	for (const pagePath of dsuPagePaths) {
		const pageSource = readFileSync(pagePath, 'utf8');

		assert.equal(pageSource.includes("import JoinCta from '$lib/components/site/JoinCta.svelte';"), true);
		assert.equal(pageSource.includes('<JoinCta content={page.joinCta}'), true);
		assert.equal(pageSource.includes('class="join-cta"'), false);
		assert.equal(pageSource.includes('class="join-panel"'), false);
	}
});
