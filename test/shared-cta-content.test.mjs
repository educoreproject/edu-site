import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const pageSchemaPaths = [
	'studio/schemaTypes/cedsOverview.ts',
	'studio/schemaTypes/dsuHome.ts',
	'studio/schemaTypes/dsuMembers.ts',
	'studio/schemaTypes/dsuJoin.ts',
	'studio/schemaTypes/dsuProjects.ts',
	'studio/schemaTypes/eduOverview.ts',
	'studio/schemaTypes/eduBoard.ts',
	'studio/schemaTypes/eduHistory.ts',
	'studio/schemaTypes/eduContact.ts',
	'studio/schemaTypes/educoreOverview.ts',
	'studio/schemaTypes/eventsUpcoming.ts',
	'studio/schemaTypes/eventsPast.ts',
	'studio/schemaTypes/resourcesHub.ts',
	'studio/schemaTypes/resourcesFaq.ts',
	'studio/schemaTypes/resourcesGlossary.ts'
];

const routePagePaths = [
	'src/routes/ceds/+page.svelte',
	'src/lib/components/pages/EduOverviewPage.svelte',
	'src/lib/components/pages/DsuOverviewPage.svelte',
	'src/routes/dsu/members/+page.svelte',
	'src/routes/dsu/joining/+page.svelte',
	'src/routes/dsu/projects/+page.svelte',
	'src/routes/edu/board/+page.svelte',
	'src/routes/edu/history/+page.svelte',
	'src/routes/contact/+page.svelte',
	'src/routes/educore/+page.svelte',
	'src/routes/events/+page.svelte',
	'src/routes/events/past/+page.svelte',
	'src/routes/resources/+page.svelte',
	'src/routes/resources/faq/+page.svelte',
	'src/routes/resources/glossary/+page.svelte',
	'src/routes/resources/library/+page.svelte',
	'src/routes/resources/newsletter/+page.svelte',
	'src/routes/resources/press/+page.svelte'
];

test('Sanity exposes reusable shared CTA documents', () => {
	const indexSource = readFileSync('studio/schemaTypes/index.ts', 'utf8');
	const objectsSource = readFileSync('studio/schemaTypes/objects.ts', 'utf8');

	assert.match(objectsSource, /function requireCtaValue/);
	assert.match(objectsSource, /document\?\._type === 'sharedCta' && document\.type !== 'generic'/);
	assert.match(objectsSource, /export const sharedCta = defineType\(\{/);
	assert.match(objectsSource, /name:\s*'sharedCta'/);
	assert.match(objectsSource, /type:\s*'document'/);
	assert.match(objectsSource, /name:\s*'type'[\s\S]*value:\s*'generic'[\s\S]*value:\s*'newsletter'/);
	assert.match(objectsSource, /name:\s*'signupMode'[\s\S]*value:\s*'externalLink'[\s\S]*value:\s*'directEmailSignup'/);
	assert.match(objectsSource, /name:\s*'background'[\s\S]*value:\s*'navy'[\s\S]*value:\s*'teal'/);
	assert.doesNotMatch(objectsSource, /name:\s*'background'[\s\S]*hidden:\s*\(\{parent\}\) => parent\?\.type !== 'newsletter'/);
	assert.match(objectsSource, /name:\s*'cta'[\s\S]*title:\s*'CTA'[\s\S]*type:\s*'cta'/);
	assert.doesNotMatch(objectsSource, /name:\s*'ctaLabel'/);
	assert.doesNotMatch(objectsSource, /name:\s*'ctaVariant'/);
	assert.doesNotMatch(objectsSource, /name:\s*'signupUrl'/);
	assert.match(indexSource, /sharedCta/);
});

test('all page schemas expose an ordered shared CTA reference list', () => {
	for (const schemaPath of pageSchemaPaths) {
		const source = readFileSync(schemaPath, 'utf8');

		assert.match(source, /name:\s*'ctas'[\s\S]*type:\s*'array'/, `${schemaPath} has ctas array`);
		assert.match(source, /of:\s*\[\{type:\s*'reference',\s*to:\s*\[\{type:\s*'sharedCta'\}\]\}\]/, `${schemaPath} references sharedCta`);
		assert.doesNotMatch(source, /filter:\s*'type == /, `${schemaPath} does not filter CTA type`);
		assert.doesNotMatch(source, /name:\s*'newsletter'/, `${schemaPath} no longer owns newsletter field`);
		assert.doesNotMatch(source, /name:\s*'joinCta'/, `${schemaPath} no longer owns joinCta field`);
		assert.doesNotMatch(source, /name:\s*'ctaBand'/, `${schemaPath} no longer owns ctaBand field`);
	}
});

test('page queries dereference shared CTAs into an ordered render list', () => {
	const queriesSource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const typesSource = readFileSync('src/lib/content/types.ts', 'utf8');

	assert.match(queriesSource, /const sharedCtaProjection = `->\{/);
	assert.match(queriesSource, /cta\$\{ctaProjection\}/);
	assert.match(queriesSource, /destination\$\{linkDestinationProjection\}/);
	assert.doesNotMatch(queriesSource, /href,\s*\n\s*variant/);
	assert.doesNotMatch(queriesSource, /\bctaLabel,/);
	assert.doesNotMatch(queriesSource, /\bctaVariant,/);
	assert.doesNotMatch(queriesSource, /\bsignupUrl,/);
	assert.match(queriesSource, /"ctas":\s*coalesce\(ctas\[\]\$\{sharedCtaProjection\}, \[\]\)/);
	assert.doesNotMatch(queriesSource, /newsletter\$\{newsletterCtaProjection\}/);
	assert.doesNotMatch(queriesSource, /joinCta\$\{genericCtaProjection\}/);
	assert.doesNotMatch(queriesSource, /ctaBand\$\{genericCtaProjection\}/);
	assert.match(typesSource, /export type SharedCtaKind = 'generic' \| 'newsletter';/);
	assert.match(typesSource, /export type SharedCtaContent = GenericSharedCtaContent \| NewsletterBandContent;/);
	assert.match(typesSource, /export type NewsletterSignupMode = 'externalLink' \| 'directEmailSignup';/);
	assert.match(typesSource, /type:\s*'newsletter';/);
	assert.match(typesSource, /cta:\s*Cta;/);
	assert.doesNotMatch(typesSource, /ctaLabel:\s*string;/);
	assert.doesNotMatch(typesSource, /ctaVariant\?:/);
	assert.doesNotMatch(typesSource, /signupUrl\?:/);
	assert.match(typesSource, /type:\s*'generic';/);
	assert.match(typesSource, /background\?:\s*'navy' \| 'teal';/);
	assert.match(typesSource, /ctas:\s*SharedCtaContent\[\];/);
});

test('routes render shared CTAs through a single dispatcher', () => {
	const pageCtasSource = readFileSync('src/lib/components/site/PageCtas.svelte', 'utf8');

	assert.match(pageCtasSource, /cta\.type === 'newsletter'/);
	assert.match(pageCtasSource, /<NewsletterSignup content=\{cta\}/);
	assert.match(pageCtasSource, /cta\.type === 'generic'/);
	assert.match(pageCtasSource, /<GenericCta content=\{cta\}/);

	for (const pagePath of routePagePaths) {
		const source = readFileSync(pagePath, 'utf8');

		assert.match(source, /import\s+PageCtas\s+from\s+['"]\$lib\/components\/site\/PageCtas\.svelte['"];/, `${pagePath} imports PageCtas`);
		assert.match(source, /<PageCtas ctas=\{page\.ctas\}/, `${pagePath} renders page.ctas`);
		assert.doesNotMatch(source, /<NewsletterSignup content=\{page\.newsletter\}/, `${pagePath} does not render newsletter directly`);
		assert.doesNotMatch(source, /<JoinCta content=\{page\.joinCta\}/, `${pagePath} does not render JoinCta directly`);
		assert.doesNotMatch(source, /page\.ctaBand/, `${pagePath} does not render bespoke ctaBand`);
	}
});
