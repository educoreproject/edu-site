import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('CEDS page has a Sanity-backed content contract and route', () => {
	const schemaPath = 'studio/schemaTypes/cedsOverview.ts';
	const migrationPath = 'studio/migrations/seed-ceds-overview.ts';
	const loadPath = 'src/routes/ceds/+page.ts';
	const pagePath = 'src/routes/ceds/+page.svelte';

	assert.equal(existsSync(schemaPath), true);
	assert.equal(existsSync(migrationPath), true);
	assert.equal(existsSync(loadPath), true);
	assert.equal(existsSync(pagePath), true);

	const schemaSource = readFileSync(schemaPath, 'utf8');
	const indexSource = readFileSync('studio/schemaTypes/index.ts', 'utf8');
	const querySource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const typesSource = readFileSync('src/lib/content/types.ts', 'utf8');
	const siteSource = readFileSync('src/lib/content/site.ts', 'utf8');
	const loadSource = readFileSync(loadPath, 'utf8');
	const pageSource = readFileSync(pagePath, 'utf8');
	const migrationSource = readFileSync(migrationPath, 'utf8');

	assert.match(schemaSource, /name:\s*'cedsOverview'/);
	assert.match(schemaSource, /initialValue:\s*\{current:\s*'ceds'\}/);
	assert.match(schemaSource, /name:\s*'activeSection'[\s\S]*initialValue:\s*'CEDS'/);
	assert.match(schemaSource, /name:\s*'subNav'[\s\S]*type:\s*'linkItem'/);
	assert.match(schemaSource, /name:\s*'hero'[\s\S]*type:\s*'heroContent'/);
	assert.match(schemaSource, /name:\s*'logoImage'[\s\S]*type:\s*'image'/);
	assert.match(schemaSource, /name:\s*'overview'[\s\S]*type:\s*'sectionHeader'/);
	assert.match(schemaSource, /name:\s*'reasons'[\s\S]*type:\s*'textBlock'/);
	assert.match(schemaSource, /name:\s*'dataModels'[\s\S]*type:\s*'textBlock'/);
	assert.match(schemaSource, /name:\s*'learningLinks'[\s\S]*type:\s*'resourceCard'/);
	assert.doesNotMatch(schemaSource, /name:\s*'repositories'/);
	assert.match(schemaSource, /name:\s*'ctas'[\s\S]*type:\s*'array'/);
	assert.match(schemaSource, /of:\s*\[\{type:\s*'reference',\s*to:\s*\[\{type:\s*'sharedCta'\}\]\}\]/);
	assert.match(indexSource, /cedsOverview/);

	assert.match(querySource, /export const cedsOverviewQuery = `\*\[_type == "cedsOverview" && slug\.current == "ceds"\]\[0\]\{/);
	assert.match(querySource, /"logoImage":\s*select\(\s*defined\(logoImage\.asset\)\s*=>\s*\{/);
	assert.match(querySource, /"url":\s*logoImage\.asset->url/);
	assert.match(querySource, /"alt":\s*logoImage\.alt/);
	assert.match(querySource, /overview\$\{sectionHeaderProjection\}/);
	assert.match(querySource, /"reasons":\s*coalesce\(reasons\[\]\{/);
	assert.match(querySource, /"dataModels":\s*coalesce\(dataModels\[\]\{/);
	assert.match(querySource, /"learningLinks":\s*coalesce\(learningLinks\[\]\$\{resourceCardProjection\}, \[\]\)/);
	assert.doesNotMatch(querySource, /repositories/);

	assert.match(typesSource, /export type CedsOverviewPage = \{/);
	assert.match(typesSource, /logoImage\?:\s*ImageAsset;/);
	assert.match(typesSource, /overview:\s*SectionHeader;/);
	assert.match(typesSource, /reasons:\s*TextBlock\[\];/);
	assert.match(typesSource, /dataModels:\s*TextBlock\[\];/);
	assert.match(typesSource, /learningLinks:\s*ResourceCard\[\];/);
	assert.doesNotMatch(typesSource, /repositories:\s*ResourceCard\[\];/);

	assert.match(siteSource, /cedsOverviewQuery/);
	assert.match(siteSource, /CedsOverviewPage/);
	assert.match(siteSource, /export function getCedsOverviewPage\(\): Promise<CedsOverviewPage>/);

	assert.match(loadSource, /getCedsOverviewPage/);
	assert.match(loadSource, /getSiteChrome/);

	assert.match(pageSource, /import Hero from '\$lib\/components\/site\/Hero\.svelte';/);
	assert.match(pageSource, /import PageCtas from '\$lib\/components\/site\/PageCtas\.svelte';/);
	assert.match(pageSource, /<PrimaryNav[\s\S]*activeSection=\{page\.activeSection\}/);
	assert.match(
		pageSource,
		/<SubNav crumb=\{page\.activeSection\} crumbHref="\/ceds" links=\{page\.subNav\} active="Overview"/
	);
	assert.match(pageSource, /<Hero content=\{page\.hero\} background="teal"/);
	assert.match(pageSource, /page\.logoImage\?\.url/);
	assert.match(pageSource, /class="ceds-logo"/);
	assert.doesNotMatch(pageSource, /<p class="fact-kicker">Common Education Data Standards overview<\/p>/);
	assert.match(pageSource, /What CEDS makes possible/);
	assert.match(pageSource, /Data models/);
	assert.match(pageSource, /Webinars and resources/);
	assert.match(pageSource, /sectionHeader\(page\.community, 'community-heading'\)/);
	assert.match(pageSource, /sectionHeader\(page\.exchange, 'exchange-heading'\)/);
	assert.match(pageSource, /<PageCtas ctas=\{page\.ctas\}/);
	assert.doesNotMatch(pageSource, /page\.repositories/);
	assert.doesNotMatch(pageSource, /repository-grid/);
	assert.doesNotMatch(pageSource, /CEDS assets on GitHub/);

	assert.match(migrationSource, /_id:\s*'cedsOverview'/);
	assert.match(migrationSource, /_type:\s*'cedsOverview'/);
	assert.match(migrationSource, /CEDS_LOGO_PATH/);
	assert.match(migrationSource, /client\.assets\.upload\('image'/);
	assert.match(migrationSource, /logoImage:\s*cedsLogoImage/);
	assert.match(migrationSource, /alt:\s*'Common Education Data Standards'/);
	assert.match(migrationSource, /_id:\s*'sharedCtaCedsGithubAssets'/);
	assert.match(migrationSource, /_type:\s*'sharedCta'/);
	assert.match(migrationSource, /title:\s*'CEDS GitHub assets CTA'/);
	assert.match(migrationSource, /heading:\s*'Explore CEDS on GitHub'/);
	assert.match(migrationSource, /Common Education Data Standards/);
	assert.match(migrationSource, /https:\/\/cedstandards\.gitbook\.io\/ceds-gitbook/);
	assert.match(migrationSource, /_ref:\s*'sharedCtaCedsGithubAssets'/);
	assert.match(migrationSource, /Find the public CEDS repositories for elements, ontology, the Integrated Data Store, the Data Warehouse, Parquet models, and collaborative exchange resources\./);
	assert.doesNotMatch(migrationSource, /repositories:\s*\[/);
	assert.match(migrationSource, /function enableLinkByHref/);
	assert.match(migrationSource, /href:\s*nextLink\.href/);
	assert.match(migrationSource, /disabled:\s*false/);
	assert.match(migrationSource, /enableLinkByHref\(siteChrome\.primaryNav \?\? \[\], linkItem\('ceds', 'CEDS', '\/ceds'\)\)/);
});
