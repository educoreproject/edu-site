import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('frontend destination resolver supports internal, external, download, and anchor links', () => {
	const script = `
		const { resolveDestination } = await import('./src/lib/content/destinations.ts');

		console.log(JSON.stringify({
			internal: resolveDestination({
				type: 'internalPage',
				pageKey: 'resourcesLibrary',
				anchorId: '#downloads'
			}),
			external: resolveDestination({
				type: 'externalUrl',
				href: 'https://example.com'
			}),
			download: resolveDestination({
				type: 'download',
				file: {
					url: 'https://cdn.example.com/reports/report.pdf',
					filename: 'report.pdf',
					mimeType: 'application/pdf',
					size: 1234
				}
			}),
			downloadWithoutFilename: resolveDestination({
				type: 'download',
				file: {
					url: 'https://cdn.example.com/reports/report.pdf'
				}
			}),
			currentPageAnchor: resolveDestination({
				type: 'anchor',
				anchorId: '#contact'
			}),
			spacedAnchor: resolveDestination({
				type: 'anchor',
				pageKey: 'resourcesFaq',
				anchorId: ' #questions '
			}),
			routeAnchor: resolveDestination({
				type: 'anchor',
				pageKey: 'eduBoard',
				anchorId: 'members'
			}),
			missingInternalPage: resolveDestination({
				type: 'internalPage'
			})
		}));
	`;
	const output = execFileSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', script], {
		encoding: 'utf8'
	});
	const result = JSON.parse(output);

	assert.deepEqual(result.internal, { href: '/resources/library#downloads' });
	assert.deepEqual(result.external, {
		href: 'https://example.com',
		target: '_blank',
		rel: 'noopener noreferrer'
	});
	assert.deepEqual(result.download, {
		href: 'https://cdn.example.com/reports/report.pdf',
		download: 'report.pdf',
		mimeType: 'application/pdf',
		size: 1234
	});
	assert.deepEqual(result.downloadWithoutFilename, {
		href: 'https://cdn.example.com/reports/report.pdf',
		download: true
	});
	assert.deepEqual(result.currentPageAnchor, { href: '#contact' });
	assert.deepEqual(result.spacedAnchor, { href: '/resources/faq#questions' });
	assert.deepEqual(result.routeAnchor, { href: '/edu/board#members' });
	assert.deepEqual(result.missingInternalPage, {});
});

test('shared frontend types expose destination-aware link contracts', () => {
	const types = readFileSync('src/lib/content/types.ts', 'utf8');

	assert.match(types, /import type \{ RoutePageKey/);
	assert.match(types, /export type LinkDestinationKind = 'internalPage' \| 'externalUrl' \| 'download' \| 'anchor';/);
	assert.match(types, /export type LinkDestination = \{/);
	assert.match(types, /pageKey\?:\s*RoutePageKey/);
	assert.match(types, /href\?:\s*string/);
	assert.match(types, /anchorId\?:\s*string/);
	assert.match(types, /filename\?:\s*string/);
	assert.match(types, /mimeType\?:\s*string/);
	assert.match(types, /size\?:\s*number/);
	assert.match(types, /export type ResolvedLink = \{/);
	assert.match(types, /target\?:\s*'_blank'/);
	assert.match(types, /rel\?:\s*'noopener noreferrer'/);
	assert.match(types, /download\?:\s*string \| boolean/);
	assert.match(types, /export type LinkItem = ResolvedLink & \{/);
	assert.match(types, /export type Cta = ResolvedLink & \{/);
	assert.match(types, /export type SiteNavSection = LinkItem & \{/);
	assert.match(types, /key:\s*SiteSectionKey/);
	assert.match(types, /pageKey:\s*RoutePageKey/);
	assert.match(types, /children:\s*LinkItem\[\]/);
	assert.match(types, /sections:\s*SiteNavSection\[\]/);
	assert.match(types, /footerColumns:\s*FooterColumn\[\]/);
});

test('CTA, hero, and resource card schemas use linkDestination instead of freeform href', () => {
	const objectsSource = readFileSync('studio/schemaTypes/objects.ts', 'utf8');
	const queriesSource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const siteSource = readFileSync('src/lib/content/site.ts', 'utf8');
	const ctaSchema = objectsSource.match(
		/export const cta = defineType\(\{[\s\S]*?\n\}\)\n\nexport const sharedCta/
	)?.[0];

	assert.ok(ctaSchema, 'CTA schema is present');
	assert.match(objectsSource, /name:\s*'destination'[\s\S]*type:\s*'linkDestination'/);
	assert.doesNotMatch(ctaSchema, /name:\s*'href'[\s\S]*title:\s*'Href'/);
	assert.match(queriesSource, /const linkDestinationProjection = `\{/);
	assert.match(queriesSource, /destination\$\{linkDestinationProjection\}/);
	assert.match(siteSource, /resolveCta/);
	assert.match(siteSource, /resolveHero/);
	assert.match(siteSource, /resolveResourceCard/);
	assert.match(siteSource, /resolveSharedCta/);
	assert.match(siteSource, /resolveMembershipType/);
	assert.match(siteSource, /resolveInfoCard/);
});

test('destination-backed CTAs and resource cards render resolved link metadata', () => {
	const buttonSource = readFileSync('src/lib/components/site/Button.svelte', 'utf8');
	const cardSource = readFileSync('src/lib/components/site/Card.svelte', 'utf8');
	const heroSource = readFileSync('src/lib/components/site/Hero.svelte', 'utf8');
	const genericCtaSource = readFileSync('src/lib/components/site/GenericCta.svelte', 'utf8');
	const newsletterSource = readFileSync('src/lib/components/site/NewsletterSignup.svelte', 'utf8');
	const resourcesSource = readFileSync('src/routes/resources/+page.svelte', 'utf8');
	const cedsSource = readFileSync('src/routes/ceds/+page.svelte', 'utf8');
	const joinSource = readFileSync('src/routes/dsu/joining/+page.svelte', 'utf8');
	const contactSource = readFileSync('src/routes/contact/+page.svelte', 'utf8');

	assert.match(buttonSource, /target\?: Cta\['target'\]/);
	assert.match(buttonSource, /rel\?: Cta\['rel'\]/);
	assert.match(buttonSource, /download\?: Cta\['download'\]/);
	assert.match(buttonSource, /href=\{href\} \{target\} \{rel\} \{download\}/);
	assert.match(cardSource, /download\?: string \| boolean/);
	assert.match(cardSource, /this=\{as\}[\s\S]*\{download\}/);
	assert.match(cardSource, /download=\{cta\.download\}/);

	for (const source of [heroSource, genericCtaSource, newsletterSource]) {
		assert.match(source, /target=\{(?:cta|[^}]+\.cta)\.target\}/);
		assert.match(source, /rel=\{(?:cta|[^}]+\.cta)\.rel\}/);
		assert.match(source, /download=\{(?:cta|[^}]+\.cta)\.download\}/);
	}

	for (const source of [resourcesSource, cedsSource]) {
		assert.match(source, /target=\{card\.cta\.target\}/);
		assert.match(source, /rel=\{card\.cta\.rel\}/);
		assert.match(source, /download=\{card\.cta\.download\}/);
		assert.doesNotMatch(source, /isExternalLink\(card\.cta\.href\)/);
		assert.doesNotMatch(source, /target="_blank"[\s\S]*rel="noopener noreferrer"[\s\S]*card\.cta/);
	}

	assert.match(joinSource, /target=\{membership\.cta\.target\}/);
	assert.match(joinSource, /rel=\{membership\.cta\.rel\}/);
	assert.match(joinSource, /download=\{membership\.cta\.download\}/);
	assert.match(contactSource, /target=\{page\.directCard\.cta\.target\}/);
	assert.match(contactSource, /download=\{page\.collaborativeCard\.cta\.download\}/);
});

test('CTA seed content writes linkDestination objects instead of legacy href fields', () => {
	const cedsSource = readFileSync('studio/migrations/seed-ceds-overview.ts', 'utf8');
	const resourcesSource = readFileSync('studio/migrations/seed-resources-library-demo.ts', 'utf8');
	const educoreSource = readFileSync('studio/migrations/seed-educore-overview.ts', 'utf8');

	assert.match(cedsSource, /function externalDestination\(href: string\)/);
	assert.match(cedsSource, /destination: externalDestination\('https:\/\/cedstandards\.gitbook\.io\/ceds-gitbook'\)/);
	assert.match(cedsSource, /destination: externalDestination\('https:\/\/github\.com\/CEDStandards'\)/);
	assert.doesNotMatch(cedsSource, /label: 'Open CEDS GitBook',\n\s*href:/);
	assert.doesNotMatch(cedsSource, /label: 'View GitHub assets',\n\s*href:/);
	assert.match(resourcesSource, /function destinationFromHref\(href\?: string\)/);
	assert.match(resourcesSource, /type: 'internalPage'/);
	assert.match(resourcesSource, /type: 'externalUrl'/);
	assert.match(resourcesSource, /ctaWithDestination\(card\.cta, destinationFromHref\('\/resources\/newsletter'\)\)/);
	assert.doesNotMatch(resourcesSource, /card\.cta\?\.href/);
	assert.match(educoreSource, /destination:\s*\{[\s\S]*?type:\s*'externalUrl'[\s\S]*?href:\s*'https:\/\/educore\.dev\/explore\/use-cases'/);
	assert.doesNotMatch(educoreSource, /label: 'Open reference library',\n\s*href:/);
});
