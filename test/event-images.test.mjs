import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('event items use uploaded Sanity images instead of generated poster text', () => {
	const schemaSource = readFileSync('studio/schemaTypes/objects.ts', 'utf8');
	const queriesSource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const typesSource = readFileSync('src/lib/content/types.ts', 'utf8');

	assert.equal(schemaSource.includes("name: 'poster'"), false);
	assert.match(schemaSource, /name:\s*'image'[\s\S]*?type:\s*'image'/);
	assert.match(schemaSource, /name:\s*'alt'[\s\S]*?title:\s*'Alternative text'/);

	assert.equal(queriesSource.includes('poster,'), false);
	assert.match(queriesSource, /"image":\s*select\([\s\S]*?defined\(image\.asset\)[\s\S]*?"url":\s*image\.asset->url[\s\S]*?"alt":\s*image\.alt/);

	assert.equal(typesSource.includes('poster: string;'), false);
	assert.match(typesSource, /image\?:\s*ImageAsset/);
});

test('event routes render event images with alt text', () => {
	for (const pagePath of ['src/routes/events/+page.svelte', 'src/routes/events/past/+page.svelte']) {
		const source = readFileSync(pagePath, 'utf8');

		assert.equal(source.includes('{event.poster}'), false, `${pagePath} still renders poster text`);
		assert.match(source, /<img\s+src=\{event\.image\.url\}\s+alt=\{event\.image\.alt\s*\?\?\s*''\}/);
		assert.equal(
			source.includes('<div class="poster" aria-hidden="true">'),
			false,
			`${pagePath} still hides the event media`
		);
	}
});
