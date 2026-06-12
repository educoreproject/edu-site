import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('event items use uploaded Sanity images instead of generated poster text', () => {
	const schemaSource = readFileSync('studio/schemaTypes/objects.ts', 'utf8');
	const queriesSource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const typesSource = readFileSync('src/lib/content/types.ts', 'utf8');
	const eventItemSource = schemaSource.slice(
		schemaSource.indexOf('export const eventItem'),
		schemaSource.indexOf('export const eventArchiveGroup')
	);

	assert.equal(eventItemSource.includes("name: 'poster'"), false);
	assert.match(eventItemSource, /name:\s*'image'[\s\S]*?type:\s*'image'/);
	assert.match(eventItemSource, /name:\s*'alt'[\s\S]*?title:\s*'Alternative text'/);
	assert.doesNotMatch(
		eventItemSource,
		/name:\s*'image'[\s\S]*?validation:\s*\(rule\)\s*=>\s*rule\.required\(\)[\s\S]*?name:\s*'tag'/
	);

	assert.equal(queriesSource.includes('poster,'), false);
	assert.match(queriesSource, /"image":\s*select\([\s\S]*?defined\(image\.asset\)[\s\S]*?"url":\s*image\.asset->url[\s\S]*?"alt":\s*image\.alt/);

	assert.equal(typesSource.includes('poster: string;'), false);
	assert.match(typesSource, /image\?:\s*ImageAsset/);
});

test('event routes render event images with alt text', () => {
	for (const pagePath of ['src/routes/events/+page.svelte', 'src/routes/events/past/+page.svelte']) {
		const source = readFileSync(pagePath, 'utf8');

		assert.equal(source.includes('{event.poster}'), false, `${pagePath} still renders poster text`);
		assert.equal(source.includes('{#if event.image?.url}'), true, `${pagePath} should render event media conditionally`);
		assert.equal(source.includes('class:has-image={event.image?.url}'), true, `${pagePath} should only reserve media layout when an image exists`);
		assert.equal(
			source.includes('grid-template-columns: minmax(18rem, 20.125rem) minmax(0, 1fr);'),
			true,
			`${pagePath} should reserve a wide Figma-style media column`
		);
		assert.equal(
			source.includes('aspect-ratio: 161 / 55;'),
			true,
			`${pagePath} should crop event uploads to the wide Figma card ratio`
		);
		assert.match(source, /<img\s+src=\{event\.image\.url\}\s+alt=\{event\.image\.alt\s*\?\?\s*''\}/);
		assert.equal(
			source.includes('<div class="poster" aria-hidden="true">'),
			false,
			`${pagePath} still hides the event media`
		);
	}
});
