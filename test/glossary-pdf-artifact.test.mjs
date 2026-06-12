import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('glossary schema, query, and types expose a downloadable PDF artifact', () => {
	const schemaSource = readFileSync('studio/schemaTypes/resourcesGlossary.ts', 'utf8');
	const querySource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const typesSource = readFileSync('src/lib/content/types.ts', 'utf8');
	const pageSource = readFileSync('src/routes/resources/glossary/+page.svelte', 'utf8');

	assert.match(schemaSource, /name:\s*'artifact'[\s\S]*?title:\s*'Downloadable artifact'/);
	assert.match(schemaSource, /name:\s*'file'[\s\S]*?type:\s*'file'/);
	assert.match(schemaSource, /accept:\s*'application\/pdf'/);

	assert.match(querySource, /const fileArtifactProjection = `\{[\s\S]*?label[\s\S]*?"url":\s*file\.asset->url/);
	assert.match(querySource, /artifact\$\{fileArtifactProjection\}/);
	assert.match(querySource, /"filename":\s*file\.asset->originalFilename/);
	assert.match(querySource, /"mimeType":\s*file\.asset->mimeType/);
	assert.match(querySource, /"size":\s*file\.asset->size/);

	assert.match(typesSource, /export type GlossaryArtifact = \{/);
	assert.match(typesSource, /artifact\?: GlossaryArtifact/);

	assert.match(pageSource, /\{#if page\.artifact\?\.url\}/);
	assert.match(pageSource, /href=\{page\.artifact\.url\}/);
	assert.match(pageSource, /download=\{page\.artifact\.filename/);
});

test('glossary seed migration contains extracted PDF terms and uploads the artifact', () => {
	const migrationPath = 'studio/migrations/seed-resources-glossary-pdf-terms.ts';

	assert.equal(existsSync(migrationPath), true);

	const migrationSource = readFileSync(migrationPath, 'utf8');

	assert.match(migrationSource, /DSU Glossary_Terms_Education_Skills_Technology\.pdf/);
	assert.match(migrationSource, /client\.assets\.upload\('file'/);
	assert.match(migrationSource, /_id:\s*'resourcesGlossary'/);
	assert.match(migrationSource, /const categories = \['All terms', 'Education', 'Skills\/Talent\/Workforce', 'Technology'\]/);
	assert.match(migrationSource, /\n\t\tcategories,/);

	const termsBlock = migrationSource.match(/const terms = (\[[\s\S]*?\n\]) as const/)?.[1];
	assert.ok(termsBlock, 'expected migration to define a terms array');

	const terms = JSON.parse(
		termsBlock
			.replaceAll(/,\n\s*\]/g, '\n]')
	);

	assert.equal(terms.length, 174);
	assert.equal(terms.filter((term) => term.category === 'Education').length, 66);
	assert.equal(terms.filter((term) => term.category === 'Skills/Talent/Workforce').length, 42);
	assert.equal(terms.filter((term) => term.category === 'Technology').length, 66);
	assert.deepEqual(terms[0], {
		term: '504 Plan',
		definition: 'Education accommodations under Section 504',
		category: 'Education'
	});
	assert.deepEqual(terms.at(-1), {
		term: 'XML',
		definition: 'eXtensible Markup Language',
		category: 'Technology'
	});
});
