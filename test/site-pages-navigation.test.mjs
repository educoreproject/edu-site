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
	assert.match(siteNavigationSource, /externalUrl' && !value\.href\?\.trim\(\)/);
	assert.match(siteNavigationSource, /download' && !value\.file/);
	assert.match(siteNavigationSource, /anchor' && !value\.anchorId\?\.trim\(\)/);
	assert.match(siteNavigationSource, /value:\s*'internalPage'/);
	assert.match(siteNavigationSource, /value:\s*'externalUrl'/);
	assert.match(siteNavigationSource, /value:\s*'download'/);
	assert.match(siteNavigationSource, /value:\s*'anchor'/);
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
