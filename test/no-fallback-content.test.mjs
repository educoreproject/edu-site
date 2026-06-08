import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('project no longer ships fallback content or fallback seed tooling', () => {
	assert.equal(existsSync('src/lib/content/fallback.ts'), false);
	assert.equal(existsSync('scripts/build-sanity-seed.mjs'), false);
	assert.equal(existsSync('scripts/import-sanity-seed.mjs'), false);
	assert.equal(existsSync('studio/seed/fallback-content.ndjson'), false);

	const siteSource = readFileSync('src/lib/content/site.ts', 'utf8');
	assert.equal(siteSource.includes('./fallback'), false);
	assert.equal(siteSource.includes('fallback'), false);

	const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
	assert.equal('sanity:seed:build' in packageJson.scripts, false);
	assert.equal('sanity:seed:import' in packageJson.scripts, false);

	const readme = readFileSync('README.md', 'utf8');
	assert.equal(readme.includes('Seeding Sanity content'), false);
});
