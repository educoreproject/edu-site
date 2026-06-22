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
