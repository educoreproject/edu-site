import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const genericCtaComponentPath = 'src/lib/components/site/GenericCta.svelte';

test('generic CTAs use the shared site component', () => {
	assert.equal(existsSync(genericCtaComponentPath), true);

	const componentSource = readFileSync(genericCtaComponentPath, 'utf8');
	assert.equal(componentSource.includes('class="generic-cta"'), true);
	assert.equal(componentSource.includes('class="generic-cta-panel"'), true);
	assert.equal(componentSource.includes("class:teal={content.background === 'teal'}"), true);
	assert.equal(componentSource.includes("import Button from '$lib/components/site/Button.svelte';"), true);
	assert.equal(componentSource.includes('href={content.cta.href}'), true);
	assert.equal(componentSource.includes('<Button'), true);
});
