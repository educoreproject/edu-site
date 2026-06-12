import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const newsletterComponentPath = 'src/lib/components/site/NewsletterSignup.svelte';

test('newsletter signup CTAs use the shared site component', () => {
	assert.equal(existsSync(newsletterComponentPath), true);

	const componentSource = readFileSync(newsletterComponentPath, 'utf8');
	assert.equal(componentSource.includes('class="newsletter"'), true);
	assert.equal(componentSource.includes('class="newsletter-form"'), true);
	assert.equal(
		componentSource.includes("import Button from '$lib/components/site/Button.svelte';"),
		true,
		'NewsletterSignup imports the shared Button component'
	);
	assert.equal(
		componentSource.includes('href={content.cta.href}'),
		true,
		'NewsletterSignup CTA links to the configured CTA href'
	);
	assert.equal(
		componentSource.includes('label={content.cta.label}'),
		true,
		'NewsletterSignup uses the configured CTA label'
	);
	assert.equal(
		componentSource.includes("variant={content.cta.variant ?? 'gold'}"),
		true,
		'NewsletterSignup uses the configured CTA button variant with a gold default'
	);
	assert.equal(
		componentSource.includes('<Button'),
		true,
		'NewsletterSignup renders the CTA through Button'
	);
	assert.equal(componentSource.includes('<button'), false, 'NewsletterSignup does not render a bespoke button');
	assert.equal(componentSource.includes('<input'), false, 'NewsletterSignup does not keep an email input');
});

test('newsletter signup content contract uses the shared CTA object', () => {
	const typesSource = readFileSync('src/lib/content/types.ts', 'utf8');
	const queriesSource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const schemaSource = readFileSync('studio/schemaTypes/objects.ts', 'utf8');

	assert.match(typesSource, /type:\s*'newsletter';[\s\S]*cta:\s*Cta;/);
	assert.match(queriesSource, /const sharedCtaProjection = `->\{[\s\S]*cta\$\{ctaProjection\}[\s\S]*\}`;/);
	assert.match(schemaSource, /name:\s*'cta'[\s\S]*type:\s*'cta'/);
	assert.doesNotMatch(schemaSource, /name:\s*'ctaLabel'/);
	assert.doesNotMatch(schemaSource, /name:\s*'signupUrl'/);
});
