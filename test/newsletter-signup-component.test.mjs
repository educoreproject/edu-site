import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const newsletterComponentPath = 'src/lib/components/site/NewsletterSignup.svelte';
const newsletterPagePaths = [
	'src/routes/events/+page.svelte',
	'src/routes/events/past/+page.svelte',
	'src/routes/resources/+page.svelte',
	'src/routes/resources/faq/+page.svelte',
	'src/routes/resources/glossary/+page.svelte'
];

test('newsletter signup CTAs use the shared site component', () => {
	assert.equal(existsSync(newsletterComponentPath), true);

	const componentSource = readFileSync(newsletterComponentPath, 'utf8');
	assert.equal(componentSource.includes('class="newsletter"'), true);
	assert.equal(componentSource.includes('class="newsletter-form"'), true);

	for (const pagePath of newsletterPagePaths) {
		const pageSource = readFileSync(pagePath, 'utf8');

		assert.equal(
			pageSource.includes("import NewsletterSignup from '$lib/components/site/NewsletterSignup.svelte';"),
			true,
			`${pagePath} imports NewsletterSignup`
		);
		assert.equal(
			pageSource.includes('<NewsletterSignup content={page.newsletter}'),
			true,
			`${pagePath} renders NewsletterSignup`
		);
		assert.equal(pageSource.includes('class="newsletter"'), false, `${pagePath} still owns newsletter markup`);
		assert.equal(pageSource.includes('class="newsletter-form"'), false, `${pagePath} still owns newsletter form markup`);
		assert.equal(/(^|\n)\s*\.newsletter/.test(pageSource), false, `${pagePath} still owns newsletter styles`);
		assert.equal(/(^|\n)\s*\.form-row/.test(pageSource), false, `${pagePath} still owns newsletter form row styles`);
	}
});
