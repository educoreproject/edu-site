import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('route metadata declares the fixed site tree and EDU root route', () => {
	const source = readFileSync('src/lib/content/route-metadata.ts', 'utf8');

	for (const key of [
		'eduHome',
		'eduBoard',
		'eduHistory',
		'dsuHome',
		'dsuMembers',
		'dsuJoin',
		'dsuProjects',
		'cedsOverview',
		'educoreOverview',
		'resourcesHub',
		'resourcesLibrary',
		'resourcesNewsletter',
		'resourcesGlossary',
		'resourcesFaq',
		'resourcesPress',
		'eventsUpcoming',
		'eventsPast',
		'contact'
	]) {
		assert.match(source, new RegExp(`${key}:\\s*\\{`), `${key} route page is registered`);
	}

	assert.match(source, /eduHome:[\s\S]*?path:\s*'\/'/);
	assert.match(source, /dsuHome:[\s\S]*?path:\s*'\/dsu'/);
	assert.match(source, /eduBoard:[\s\S]*?path:\s*'\/edu\/board'/);
	assert.match(source, /eduHistory:[\s\S]*?path:\s*'\/edu\/history'/);
	assert.match(source, /sectionKey:\s*'edu'/);
	assert.match(source, /sectionKey:\s*'dsu'/);
	assert.match(source, /homePageKey:\s*'eduHome'/);
	assert.match(source, /homePageKey:\s*'dsuHome'/);
	assert.match(source, /export function getRoutePage/);
	assert.match(source, /export function getSectionRoutePages/);
	assert.match(source, /export function getSiteSection/);
	assert.match(source, /export function getSectionHomeRoute/);
});

test('route metadata helpers resolve section homes and preserve registry coverage', () => {
	const script = `
		const metadata = await import('./src/lib/content/route-metadata.ts');

		console.log(JSON.stringify({
			routePageKeys: metadata.routePageKeys,
			routePagesKeys: Object.keys(metadata.routePages),
			eduHomePath: metadata.getSectionHomeRoute('edu').path,
			dsuHomePath: metadata.getSectionHomeRoute('dsu').path,
			eduPaths: metadata.getSectionRoutePages('edu').map((page) => page.path),
			dsuPaths: metadata.getSectionRoutePages('dsu').map((page) => page.path)
		}));
	`;
	const output = execFileSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', script], {
		encoding: 'utf8'
	});
	const result = JSON.parse(output);

	assert.deepEqual([...result.routePageKeys].sort(), [...result.routePagesKeys].sort());
	assert.equal(result.eduHomePath, '/');
	assert.equal(result.dsuHomePath, '/dsu');
	assert.deepEqual(result.eduPaths, ['/', '/edu/board', '/edu/history']);
	assert.deepEqual(result.dsuPaths, ['/dsu', '/dsu/members', '/dsu/joining', '/dsu/projects']);
});

test('Sanity exposes site page navigation and shared link destination schemas', () => {
	const indexSource = readFileSync('studio/schemaTypes/index.ts', 'utf8');
	const siteNavigationSource = readFileSync('studio/schemaTypes/siteNavigation.ts', 'utf8');
	const optionsSource = readFileSync('studio/schemaTypes/routePageOptions.ts', 'utf8');

	assert.match(siteNavigationSource, /export const linkDestination = defineType\(\{/);
	assert.match(siteNavigationSource, /name:\s*'linkDestination'/);
	assert.match(siteNavigationSource, /function validateLinkDestination/);
	assert.match(siteNavigationSource, /rule\.custom\(\(value\) => validateLinkDestination/);
	assert.match(siteNavigationSource, /internalPage' && !value\.pageKey/);
	assert.match(siteNavigationSource, /function isValidExternalHref/);
	assert.match(siteNavigationSource, /value === '#'/);
	assert.match(siteNavigationSource, /externalUrl' && !isValidExternalHref\(value\.href\)/);
	assert.match(siteNavigationSource, /download' && !value\.file/);
	assert.match(siteNavigationSource, /anchor' && !value\.anchorId\?\.trim\(\)/);
	assert.match(siteNavigationSource, /value:\s*'internalPage'/);
	assert.match(siteNavigationSource, /value:\s*'externalUrl'/);
	assert.match(siteNavigationSource, /value:\s*'download'/);
	assert.match(siteNavigationSource, /value:\s*'anchor'/);
	assert.match(siteNavigationSource, /name:\s*'href'[\s\S]*?title:\s*'External URL'[\s\S]*?type:\s*'string'/);
	assert.match(siteNavigationSource, /export const navItem = defineType\(\{/);
	assert.match(siteNavigationSource, /name:\s*'navItem'/);
	assert.match(siteNavigationSource, /name:\s*'hidden'/);
	assert.match(siteNavigationSource, /name:\s*'disabled'/);
	assert.match(siteNavigationSource, /export const sitePage = defineType\(\{/);
	assert.match(siteNavigationSource, /name:\s*'sitePage'/);
	assert.match(siteNavigationSource, /name:\s*'sectionKey'/);
	assert.match(siteNavigationSource, /name:\s*'routePageKey'/);
	assert.match(siteNavigationSource, /function validateRoutePageSection/);
	assert.match(siteNavigationSource, /option\?\.section === sectionKey/);
	assert.match(siteNavigationSource, /validateRoutePageSection\(value/);
	assert.match(siteNavigationSource, /name:\s*'navigationItems'/);
	assert.match(optionsSource, /export const routePageOptions/);
	assert.match(optionsSource, /value:\s*'eduHome'/);
	assert.match(optionsSource, /value:\s*'dsuHome'/);
	assert.match(optionsSource, /path:\s*'\//);
	assert.match(optionsSource, /path:\s*'\/dsu'/);
	assert.match(optionsSource, /export const sectionOptions/);
	assert.match(optionsSource, /export function getRoutePageOptionsForSection/);
	assert.match(indexSource, /linkDestination/);
	assert.match(indexSource, /navItem/);
	assert.match(indexSource, /sitePage/);
});

test('external href validation accepts only supported well-formed link values', () => {
	const script = `
		const { isValidExternalHref } = await import('./studio/schemaTypes/siteNavigation.ts');
		const valid = [
			'#',
			'https://example.com',
			'http://example.com/path',
			'//example.com/path',
			'mailto:hello@example.com',
			'tel:+15555550123'
		];
		const invalid = [
			'',
			'https://',
			'http://',
			'//',
			'mailto:',
			'tel:',
			'ftp://example.com',
			'example.com',
			'javascript:alert(1)',
			'https://example.com/bad path'
		];

		console.log(JSON.stringify({
			valid: valid.map((href) => [href, isValidExternalHref(href)]),
			invalid: invalid.map((href) => [href, isValidExternalHref(href)])
		}));
	`;
	const output = execFileSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', script], {
		encoding: 'utf8'
	});
	const result = JSON.parse(output);

	assert.deepEqual(
		result.valid.filter(([, isValid]) => !isValid),
		[],
		'all valid href examples pass'
	);
	assert.deepEqual(
		result.invalid.filter(([, isValid]) => isValid),
		[],
		'all invalid href examples fail'
	);
});

test('Sanity Studio exposes site pages structure and seed migration', () => {
	const configSource = readFileSync('studio/sanity.config.ts', 'utf8');
	const structureSource = readFileSync('studio/structure.ts', 'utf8');
	const migrationSource = readFileSync('studio/migrations/seed-site-pages-navigation.ts', 'utf8');
	const indexSource = readFileSync('studio/schemaTypes/index.ts', 'utf8');
	const schemaTypesList = indexSource.match(/schemaTypes\s*=\s*\[([\s\S]*?)\]/)?.[1] ?? '';

	assert.match(configSource, /import \{structure\} from '\.\/structure'/);
	assert.match(configSource, /structureTool\(\{structure\}\)/);
	assert.match(structureSource, /title\('Site pages'\)/);

	for (const documentId of ['sitePageEdu', 'sitePageDsu', 'eduOverview', 'dsuHome']) {
		assert.match(
			structureSource,
			new RegExp(`'${documentId}'`),
			`${documentId} appears in Studio structure`
		);
	}

	for (const schemaType of [
		'eduOverview',
		'eduBoard',
		'eduHistory',
		'dsuHome',
		'dsuMembers',
		'dsuJoin',
		'dsuProjects',
		'cedsOverview',
		'educoreOverview',
		'resourcesHub',
		'resourcesLibrary',
		'resourcesNewsletter',
		'resourcesGlossary',
		'resourcesFaq',
		'resourcesPress',
		'eventsUpcoming',
		'eventsPast',
		'eduContact',
		'sitePage',
		'siteChrome'
	]) {
		assert.match(
			structureSource,
			new RegExp(`id:\\s*'${schemaType}'|'${schemaType}'`),
			`${schemaType} is filtered from the generic Studio document list`
		);
	}
	assert.match(structureSource, /curatedDocumentTypeIds = new Set/);
	assert.match(structureSource, /sections\.flatMap\(\(section\) => section\.items\.map/);
	assert.match(structureSource, /!curatedDocumentTypeIds\.has\(id\)/);

	assert.match(migrationSource, /_id:\s*'sitePageEdu'/);
	assert.match(migrationSource, /routePageKey:\s*'eduHome'/);
	assert.match(migrationSource, /_id:\s*'sitePageDsu'/);
	assert.match(migrationSource, /routePageKey:\s*'dsuHome'/);
	assert.match(migrationSource, /function destinationFromHref/);
	assert.match(migrationSource, /if \(!href\) \{[\s\S]*?href:\s*'#'/);
	assert.doesNotMatch(migrationSource, /createOrReplace/);
	assert.match(migrationSource, /createIfNotExists\(sitePage\)/);
	assert.match(migrationSource, /setIfMissing/);
	assert.match(migrationSource, /unset\(\['slug', 'activeSection', 'subNav'\]\)/);
	assert.doesNotMatch(schemaTypesList, /\bsiteChrome\b/);
});

test('Studio route page options match the frontend route metadata registry', () => {
	const script = `
		const metadata = await import('./src/lib/content/route-metadata.ts');
		const options = await import('./studio/schemaTypes/routePageOptions.ts');

		console.log(JSON.stringify({
			routePageOptions: options.routePageOptions,
			sectionOptions: options.sectionOptions,
			eduOptions: options.getRoutePageOptionsForSection('edu'),
			dsuOptions: options.getRoutePageOptionsForSection('dsu'),
			routePageKeys: metadata.routePageKeys,
			routePages: metadata.routePages,
			siteSectionKeys: metadata.siteSectionKeys
		}));
	`;
	const output = execFileSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', script], {
		encoding: 'utf8'
	});
	const result = JSON.parse(output);

	assert.deepEqual(
		result.routePageOptions.map((option) => option.value),
		result.routePageKeys
	);
	assert.deepEqual(
		result.routePageOptions.map((option) => [option.value, option.section, option.path]),
		result.routePageKeys.map((key) => [
			key,
			result.routePages[key].sectionKey,
			result.routePages[key].path
		])
	);
	assert.deepEqual(
		result.sectionOptions.map((option) => option.value),
		result.siteSectionKeys
	);
	assert.deepEqual(
		result.eduOptions.map((option) => option.path),
		['/', '/edu/board', '/edu/history']
	);
	assert.deepEqual(
		result.dsuOptions.map((option) => option.path),
		['/dsu', '/dsu/members', '/dsu/joining', '/dsu/projects']
	);
});

test('site chrome query reads sitePage documents for normalized navigation', () => {
	const queriesSource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const siteSource = readFileSync('src/lib/content/site.ts', 'utf8');
	const typesSource = readFileSync('src/lib/content/types.ts', 'utf8');

	assert.match(queriesSource, /export const chromeQuery = `\*\[_type == "sitePage"\]/);
	assert.match(queriesSource, /order\(sortOrder asc\)/);
	assert.match(queriesSource, /sectionKey/);
	assert.match(queriesSource, /routePageKey/);
	assert.match(queriesSource, /navLabel/);
	assert.match(queriesSource, /navigationItems\[\]/);
	assert.match(queriesSource, /destination\$\{linkDestinationProjection\}/);
	assert.doesNotMatch(queriesSource, /_type == "siteChrome"/);
	assert.match(siteSource, /export function normalizeSiteChrome/);
	assert.match(siteSource, /if \(!rawPages\.length\)/);
	assert.match(siteSource, /Sanity returned no site page navigation documents/);
	assert.match(siteSource, /primaryNav:\s*sections\.map/);
	assert.match(siteSource, /footerColumns:\s*sections\.map/);
	assert.match(typesSource, /export type SiteNavSection/);
	assert.match(typesSource, /sections:\s*SiteNavSection\[\]/);
});

test('site chrome normalization resolves destinations and omits hidden items', () => {
	const script = `
		const { createServer } = await import('vite');
		const server = await createServer({
			appType: 'custom',
			logLevel: 'error',
			server: { middlewareMode: true }
		});

		try {
			const { normalizeSiteChrome } = await server.ssrLoadModule('/src/lib/content/site.ts');
			const chrome = normalizeSiteChrome([
				{
					sectionKey: 'resources',
					routePageKey: 'resourcesHub',
					navLabel: 'Resources',
					navigationItems: [
						{
							label: 'Library',
							destination: { type: 'internalPage', pageKey: 'resourcesLibrary' }
						},
						{
							label: 'External research',
							destination: { type: 'externalUrl', href: 'https://example.com/research' }
						},
						{
							label: 'Hidden',
							hidden: true,
							destination: { type: 'internalPage', pageKey: 'resourcesFaq' }
						},
						{
							label: 'Disabled placeholder',
							disabled: true
						},
						{
							label: 'Missing destination'
						}
					]
				},
				{
					sectionKey: 'events',
					routePageKey: 'eventsUpcoming',
					navLabel: 'Events',
					hidden: true,
					navigationItems: [
						{
							label: 'Past events',
							destination: { type: 'internalPage', pageKey: 'eventsPast' }
						}
					]
				}
			]);

			console.log(JSON.stringify(chrome));
		} finally {
			await server.close();
		}
	`;
	const output = execFileSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', script], {
		encoding: 'utf8'
	});
	const chrome = JSON.parse(output);

	assert.deepEqual(
		chrome.sections.map((section) => section.key),
		['resources']
	);
	assert.deepEqual(
		chrome.primaryNav.map((link) => [link.label, link.href]),
		[['Resources', '/resources']]
	);
	assert.deepEqual(
		chrome.footerColumns.map((column) => [
			column.heading,
			column.links.map((link) => [link.label, link.href, link.disabled ?? false, link.target])
		]),
		[
			[
				'Resources',
				[
					['Library', '/resources/library', false, undefined],
					['External research', 'https://example.com/research', false, '_blank'],
					['Disabled placeholder', undefined, true, undefined]
				]
			]
		]
	);
});

test('shared chrome components consume normalized SiteChrome sections', () => {
	const sectionChrome = readFileSync('src/lib/components/site/SectionChrome.svelte', 'utf8');
	const primaryNav = readFileSync('src/lib/components/site/PrimaryNav.svelte', 'utf8');
	const subNav = readFileSync('src/lib/components/site/SubNav.svelte', 'utf8');
	const footer = readFileSync('src/lib/components/site/PageFooter.svelte', 'utf8');

	assert.match(sectionChrome, /routeKey:\s*RoutePageKey/);
	assert.match(sectionChrome, /getRoutePage\(routeKey\)/);
	assert.match(sectionChrome, /activeSection = \$derived/);
	assert.match(sectionChrome, /<PrimaryNav[\s\S]*chrome=\{chrome\}/);
	assert.match(sectionChrome, /<SubNav[\s\S]*section=\{activeSection\}/);
	assert.match(primaryNav, /chrome\?:\s*SiteChrome/);
	assert.match(primaryNav, /chrome\.sections/);
	assert.match(primaryNav, /activeSectionKey\?:\s*SiteSectionKey/);
	assert.match(primaryNav, /activePageKey\?:\s*RoutePageKey/);
	assert.match(primaryNav, /section\.pageKey === activePageKey/);
	assert.match(primaryNav, /!activePageKey/);
	assert.match(subNav, /section\?:\s*SiteNavSection/);
	assert.match(subNav, /section\.children/);
	assert.match(footer, /chrome\.sections/);
	assert.doesNotMatch(footer, /chrome\.footerColumns/);
});

test('page schemas and content queries no longer expose legacy nav fields', () => {
	const pageSchemas = [
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
		'studio/schemaTypes/resourcesLibrary.ts',
		'studio/schemaTypes/resourcesNewsletter.ts',
		'studio/schemaTypes/resourcesGlossary.ts',
		'studio/schemaTypes/resourcesFaq.ts',
		'studio/schemaTypes/resourcesPress.ts'
	];

	for (const schemaPath of pageSchemas) {
		const source = readFileSync(schemaPath, 'utf8');
		assert.doesNotMatch(source, /name:\s*'slug'/, `${schemaPath} does not expose slug`);
		assert.doesNotMatch(
			source,
			/name:\s*'activeSection'/,
			`${schemaPath} does not expose activeSection`
		);
		assert.doesNotMatch(source, /name:\s*'subNav'/, `${schemaPath} does not expose subNav`);
	}

	const queriesSource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const typesSource = readFileSync('src/lib/content/types.ts', 'utf8');
	assert.doesNotMatch(queriesSource, /"slug":\s*slug\.current/);
	assert.doesNotMatch(queriesSource, /\bactiveSection,/);
	assert.doesNotMatch(queriesSource, /"subNav":\s*coalesce/);
	assert.doesNotMatch(typesSource, /slug:\s*'/);
	assert.doesNotMatch(typesSource, /activeSection:/);
	assert.doesNotMatch(typesSource, /subNav:\s*LinkItem\[\]/);
});
