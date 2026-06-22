import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('contact page content exposes editable recipient options', () => {
	const schemaSource = readFileSync('studio/schemaTypes/eduContact.ts', 'utf8');
	const objectsSource = readFileSync('studio/schemaTypes/objects.ts', 'utf8');
	const indexSource = readFileSync('studio/schemaTypes/index.ts', 'utf8');
	const queriesSource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const typesSource = readFileSync('src/lib/content/types.ts', 'utf8');

	assert.match(objectsSource, /export const contactRecipient = defineType\(\{/);
	assert.match(objectsSource, /name:\s*'contactRecipient'/);
	assert.match(objectsSource, /name:\s*'email'[\s\S]*?type:\s*'email'/);
	assert.match(indexSource, /contactRecipient/);
	assert.match(schemaSource, /name:\s*'recipientOptions'/);
	assert.match(schemaSource, /of:\s*\[\{type:\s*'contactRecipient'\}\]/);
	assert.match(queriesSource, /"recipientOptions":\s*coalesce\(recipientOptions\[\]\{/);
	assert.match(queriesSource, /label,\s*\n\s*email/);
	assert.match(typesSource, /export type ContactRecipient = \{/);
	assert.match(typesSource, /recipientOptions:\s*ContactRecipient\[\];/);
});

test('contact page resolver uses explicit recipients and falls back to card emails', () => {
	const script = `
		import { createServer } from 'vite';

		const basePage = {
			hero: { chip: 'Contact', title: 'Contact us', ctas: [] },
			fields: [],
			directCard: {
				heading: 'Direct inquiries',
				text: 'Contact EDU directly.',
				email: 'direct@example.org'
			},
			collaborativeCard: {
				heading: 'Collaborative inquiries',
				text: 'Contact DSU.',
				email: 'collaborative@example.org'
			},
			ctas: []
		};

		const server = await createServer({
			logLevel: 'silent',
			server: { middlewareMode: true },
			appType: 'custom'
		});

		try {
			const { resolveContactPageContent } = await server.ssrLoadModule('/src/lib/content/site.ts');
			const explicit = resolveContactPageContent({
				...basePage,
				recipientOptions: [
					{ label: 'Education Data Unlimited', email: 'edu@example.org' },
					{ label: 'Data Standards United', email: 'dsu@example.org' }
				]
			});
			const fallback = resolveContactPageContent(basePage);

			console.log(JSON.stringify({
				explicit: explicit.recipientOptions,
				fallback: fallback.recipientOptions
			}));
		} finally {
			await server.close();
		}
	`;
	const output = execFileSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', script], {
		encoding: 'utf8'
	});
	const result = JSON.parse(output);

	assert.deepEqual(result.explicit, [
		{ label: 'Education Data Unlimited', email: 'edu@example.org' },
		{ label: 'Data Standards United', email: 'dsu@example.org' }
	]);
	assert.deepEqual(result.fallback, [
		{ label: 'Direct inquiries', email: 'direct@example.org' },
		{ label: 'Collaborative inquiries', email: 'collaborative@example.org' }
	]);
});

test('contact form routes submission to the selected recipient', () => {
	const source = readFileSync('src/routes/contact/+page.svelte', 'utf8');

	assert.match(source, /selectedRecipientEmail = \$state/);
	assert.match(source, /contactAction = \$derived/);
	assert.match(source, /<form[\s\S]*?action=\{contactAction\}/);
	assert.match(source, /<form[\s\S]*?method="post"/);
	assert.match(source, /<form[\s\S]*?enctype="text\/plain"/);
	assert.doesNotMatch(source, /onsubmit=\{\(event\) => event\.preventDefault\(\)\}/);
	assert.match(source, /<select[\s\S]*?bind:value=\{selectedRecipientEmail\}/);
	assert.match(source, /name="recipient"/);
});
