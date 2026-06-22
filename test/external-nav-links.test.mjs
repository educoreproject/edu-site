import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('shared nav links identify external destinations from hrefs', () => {
	const source = readFileSync('src/lib/content/links.ts', 'utf8');

	assert.match(source, /export function isExternalLink\(href\?: string\)/);
	assert.match(source, /https\?:/);
	assert.match(source, /mailto:/);
	assert.match(source, /tel:/);
	assert.match(source, /href\.startsWith\('\/\/'\)/);
});

test('subnav external links open in a new tab and show an icon', () => {
	const source = readFileSync('src/lib/components/site/SubNav.svelte', 'utf8');

	assert.match(source, /import \{ isExternalLink \} from ['"]\$lib\/content\/links['"];/);
	assert.match(source, /const isExternal = isExternalLink\(link\.href\)/);
	assert.match(source, /const target = link\.target \?\? \(isExternal \? ['"]_blank['"] : undefined\)/);
	assert.match(source, /const rel = link\.rel \?\? \(isExternal \? ['"]noopener noreferrer['"] : undefined\)/);
	assert.match(source, /download=\{link\.download\}/);
	assert.match(source, /ti ti-external-link/);
	assert.match(source, /<span class="sr-only">Opens in a new tab<\/span>/);
});

test('subnav parent breadcrumb is a real link', () => {
	const source = readFileSync('src/lib/components/site/SubNav.svelte', 'utf8');
	const sectionChromeSource = readFileSync('src/lib/components/site/SectionChrome.svelte', 'utf8');
	const routeSources = [
		['src/lib/components/pages/EduOverviewPage.svelte', 'eduHome'],
		['src/lib/components/pages/DsuOverviewPage.svelte', 'dsuHome'],
		['src/routes/ceds/+page.svelte', 'cedsOverview'],
		['src/routes/dsu/joining/+page.svelte', 'dsuJoin'],
		['src/routes/dsu/members/+page.svelte', 'dsuMembers'],
		['src/routes/dsu/projects/+page.svelte', 'dsuProjects'],
		['src/routes/edu/board/+page.svelte', 'eduBoard'],
		['src/routes/edu/history/+page.svelte', 'eduHistory'],
		['src/routes/educore/+page.svelte', 'educoreOverview'],
		['src/routes/events/+page.svelte', 'eventsUpcoming'],
		['src/routes/events/past/+page.svelte', 'eventsPast'],
		['src/routes/resources/+page.svelte', 'resourcesHub'],
		['src/routes/resources/faq/+page.svelte', 'resourcesFaq'],
		['src/routes/resources/glossary/+page.svelte', 'resourcesGlossary'],
		['src/routes/resources/library/+page.svelte', 'resourcesLibrary'],
		['src/routes/resources/newsletter/+page.svelte', 'resourcesNewsletter'],
		['src/routes/resources/press/+page.svelte', 'resourcesPress']
	].map(([path, routeKey]) => [path, routeKey, readFileSync(path, 'utf8')]);

	assert.match(source, /crumbHref: string/);
	assert.match(source, /currentCrumbHref = \$derived\(section\?\.href \?\? crumbHref\)/);
	assert.match(source, /<a class="crumb-link" href=\{currentCrumbHref\}>\s*\{currentCrumb\}\s*<\/a>/);
	assert.doesNotMatch(source, /<span>\{crumb\}<\/span>/);
	assert.match(sectionChromeSource, /let route = \$derived\(getRoutePage\(routeKey\)\)/);
	assert.match(sectionChromeSource, /section\.key === route\.sectionKey/);
	assert.match(sectionChromeSource, /link\.pageKey === routeKey \|\| link\.href === route\.path/);
	assert.match(
		sectionChromeSource,
		/<SubNav section=\{activeSection\} activeHref=\{route\.path\} activeLabel=\{activeChild\?\.label \?\? route\.label\} \/>/
	);

	for (const [path, routeKey, routeSource] of routeSources) {
		assert.match(
			routeSource,
			new RegExp(`<SectionChrome \\{chrome\\} routeKey="${routeKey}" />`),
			`${path} must use SectionChrome routeKey="${routeKey}"`
		);
	}
});

test('footer and mobile drawer use the same external-link behavior', () => {
	const footerSource = readFileSync('src/lib/components/site/PageFooter.svelte', 'utf8');
	const primaryNavSource = readFileSync('src/lib/components/site/PrimaryNav.svelte', 'utf8');

	assert.match(footerSource, /chrome\.sections/);
	assert.doesNotMatch(footerSource, /chrome\.footerColumns/);
	assert.match(primaryNavSource, /chrome\.sections/);
	assert.match(primaryNavSource, /section\.children/);

	for (const source of [footerSource, primaryNavSource]) {
		assert.match(source, /import \{ isExternalLink \} from ['"]\$lib\/content\/links['"];/);
		assert.match(source, /target = .*?\?\? \([^)]*\? ['"]_blank['"] : undefined\)/);
		assert.match(source, /rel = .*?\?\? \([^)]*\? ['"]noopener noreferrer['"] : undefined\)/);
		assert.match(source, /download=\{[^}]+\.download\}/);
		assert.match(source, /ti ti-external-link/);
		assert.match(source, /<span class="sr-only">Opens in a new tab<\/span>/);
	}
});

test('primary nav logo describes the EDU home destination', () => {
	const source = readFileSync('src/lib/components/site/PrimaryNav.svelte', 'utf8');

	assert.match(source, /aria-label="Education Data Unlimited home"/);
	assert.match(source, /alt="Education Data Unlimited"/);
	assert.doesNotMatch(source, /aria-label="DSU home"/);
	assert.doesNotMatch(source, /aria-label="EDUcore home"/);
	assert.doesNotMatch(source, /alt="DSU"/);
});

test('footer disabled styles only target disabled link placeholders', () => {
	const source = readFileSync('src/lib/components/site/PageFooter.svelte', 'utf8');

	assert.doesNotMatch(source, /\n\tli span\s*\{/);
	assert.match(source, /li > span\[aria-disabled="true"\]\s*\{/);
});

test('resources hub cards open external CTA destinations in a new tab', () => {
	const source = readFileSync('src/routes/resources/+page.svelte', 'utf8');

	assert.doesNotMatch(source, /import \{ isExternalLink \} from '\$lib\/content\/links';/);
	assert.doesNotMatch(source, /const isExternal = isExternalLink\(card\.cta\.href\)/);
	assert.match(source, /target=\{card\.cta\.target\}/);
	assert.match(source, /rel=\{card\.cta\.rel\}/);
	assert.match(source, /download=\{card\.cta\.download\}/);
});

test('resources demo seed preserves edited external EdMatrix links', () => {
	const source = readFileSync('studio/migrations/seed-resources-library-demo.ts', 'utf8');

	assert.match(source, /async function getResourcesSubNav\(\)/);
	assert.match(source, /findExistingResourcesLink\('standards-matrix'\)/);
	assert.match(source, /find\(\(link\) => link\._key === key && link\.disabled === false\)/);
	assert.match(source, /find\(\(link\) => link\._key === key && \/\^https\?:\//);
	assert.match(source, /label:\s*existingStandardsMatrix\?\.label \?\? 'EdMatrix'/);
	assert.match(source, /href:\s*existingStandardsMatrix\?\.href \?\? '\/resources\/standards-matrix'/);
	assert.match(source, /disabled:\s*existingStandardsMatrix\?\.disabled \?\? true/);
	assert.match(source, /const standardsMatrixLink = resourcesSubNav\.find/);
	assert.match(source, /card\.title\?\.toLowerCase\(\)\.includes\('standards matrix'\)/);
	assert.match(source, /function destinationFromHref\(href\?: string\)/);
	assert.match(source, /ctaWithDestination\(card\.cta, destinationFromHref\('\/resources\/library'\)\)/);
	assert.match(source, /destinationFromHref\(standardsMatrixLink\?\.href\) \?\? card\.cta\?\.destination/);
	assert.doesNotMatch(source, /card\.cta\?\.href/);
});
