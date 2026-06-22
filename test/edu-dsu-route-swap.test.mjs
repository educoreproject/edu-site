import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('root route loads EDU overview and renders EDU overview chrome', () => {
	const loaderSource = readFileSync('src/routes/+page.ts', 'utf8');
	const pageSource = readFileSync('src/routes/+page.svelte', 'utf8');
	const componentSource = readFileSync('src/lib/components/pages/EduOverviewPage.svelte', 'utf8');

	assert.match(loaderSource, /getEduOverviewPage/);
	assert.doesNotMatch(loaderSource, /getDsuHomePage/);
	assert.match(loaderSource, /routeKey:\s*'eduHome'\s+as const/);
	assert.match(pageSource, /EduOverviewPage/);
	assert.match(componentSource, /<SectionChrome\s+\{chrome\}\s+routeKey="eduHome"\s*\/>/);
});

test('/dsu route loads DSU overview and renders DSU overview chrome', () => {
	const loaderSource = readFileSync('src/routes/dsu/+page.ts', 'utf8');
	const pageSource = readFileSync('src/routes/dsu/+page.svelte', 'utf8');
	const componentSource = readFileSync('src/lib/components/pages/DsuOverviewPage.svelte', 'utf8');

	assert.match(loaderSource, /getDsuHomePage/);
	assert.doesNotMatch(loaderSource, /getEduOverviewPage/);
	assert.match(loaderSource, /routeKey:\s*'dsuHome'\s+as const/);
	assert.match(pageSource, /DsuOverviewPage/);
	assert.match(componentSource, /<SectionChrome\s+\{chrome\}\s+routeKey="dsuHome"\s*\/>/);
});

test('/edu redirects permanently to the EDU root', () => {
	const loaderSource = readFileSync('src/routes/edu/+page.ts', 'utf8');
	const pageSource = readFileSync('src/routes/edu/+page.svelte', 'utf8');

	assert.match(loaderSource, /import \{\s*redirect\s*\} from '@sveltejs\/kit'/);
	assert.match(loaderSource, /throw redirect\(308,\s*'\/'\)/);
	assert.doesNotMatch(pageSource, /EduOverviewPage|PrimaryNav|SubNav|SectionChrome/);
});

test('section subroutes return route keys and render SectionChrome', () => {
	const routes = [
		['src/routes/edu/board/+page.ts', 'src/routes/edu/board/+page.svelte', 'eduBoard'],
		['src/routes/edu/history/+page.ts', 'src/routes/edu/history/+page.svelte', 'eduHistory'],
		['src/routes/dsu/members/+page.ts', 'src/routes/dsu/members/+page.svelte', 'dsuMembers'],
		['src/routes/dsu/joining/+page.ts', 'src/routes/dsu/joining/+page.svelte', 'dsuJoin'],
		['src/routes/dsu/projects/+page.ts', 'src/routes/dsu/projects/+page.svelte', 'dsuProjects']
	];

	for (const [loaderPath, pagePath, routeKey] of routes) {
		const loaderSource = readFileSync(loaderPath, 'utf8');
		const pageSource = readFileSync(pagePath, 'utf8');

		assert.match(loaderSource, new RegExp(`routeKey:\\s*'${routeKey}'\\s+as const`));
		assert.match(pageSource, new RegExp(`<SectionChrome\\s+\\{chrome\\}\\s+routeKey="${routeKey}"\\s*/>`));
		assert.doesNotMatch(pageSource, /<PrimaryNav|<SubNav/);
	}
});
