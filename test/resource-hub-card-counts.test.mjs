import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('resources hub query projects live counts for first-party resource cards', () => {
	const querySource = readFileSync('src/lib/content/queries.ts', 'utf8');

	assert.match(querySource, /"counts":\s*\{/);
	assert.match(
		querySource,
		/libraryDocuments":\s*count\(coalesce\(\*\[_id == "resourcesLibrary"\]\[0\]\.items,\s*\[\]\)\)/
	);
	assert.match(
		querySource,
		/pressDocuments":\s*count\(coalesce\(\*\[_id == "resourcesPress"\]\[0\]\.items,\s*\[\]\)\)/
	);
	assert.match(
		querySource,
		/newsletterItems":\s*count\(coalesce\(\*\[_id == "resourcesNewsletter"\]\[0\]\.items,\s*\[\]\)\)/
	);
	assert.match(
		querySource,
		/glossaryTerms":\s*count\(coalesce\(\*\[_id == "resourcesGlossary"\]\[0\]\.terms,\s*\[\]\)\)/
	);
	assert.match(
		querySource,
		/faqQuestions":\s*count\(coalesce\(\*\[_id == "resourcesFaq"\]\[0\]\.items,\s*\[\]\)\)/
	);
});

test('resources hub card meta is resolved from live counts by card destination', () => {
	const script = `
		const { createServer } = await import('vite');
		const server = await createServer({
			logLevel: 'silent',
			server: { middlewareMode: true },
			appType: 'custom'
		});

		try {
			const { resolveResourcesHubCardStats } = await server.ssrLoadModule('/src/lib/content/site.ts');
			const cards = [
				{ meta: '12 documents', title: 'Document library', description: '', cta: { label: 'Open', href: '/resources/library' } },
				{ meta: '30+ questions', title: 'FAQ', description: '', cta: { label: 'Open', href: '/resources/faq?source=hub' } },
				{ meta: '100 terms', title: 'Glossary', description: '', cta: { label: 'Open', href: '/resources/glossary#terms' } },
				{ meta: 'Newsletter archive', title: 'Newsletter', description: '', cta: { label: 'Open', href: '/resources/newsletter/' } },
				{ meta: '4 files', title: 'Press', description: '', cta: { label: 'Open', href: '/resources/press' } },
				{ meta: 'Custom stat', title: 'External', description: '', cta: { label: 'Open', href: 'https://example.org/resources' } }
			];
			const resolved = resolveResourcesHubCardStats(cards, {
				libraryDocuments: 14,
				pressDocuments: 2,
				newsletterItems: 1,
				glossaryTerms: 0,
				faqQuestions: 30
			});

			console.log(JSON.stringify(resolved.map((card) => card.meta)));
		} finally {
			await server.close();
		}
	`;

	const output = execFileSync(
		process.execPath,
		['--import', 'tsx', '--input-type=module', '-e', script],
		{
			cwd: process.cwd(),
			encoding: 'utf8'
		}
	);

	assert.deepEqual(JSON.parse(output), [
		'14 documents',
		'30 questions',
		'0 terms',
		'1 newsletter',
		'2 documents',
		'Custom stat'
	]);
});
