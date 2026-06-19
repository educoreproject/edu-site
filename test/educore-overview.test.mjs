import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('EDUcore overview uses the homepage-style Sanity contract', () => {
	const schemaSource = readFileSync('studio/schemaTypes/educoreOverview.ts', 'utf8');
	const objectsSource = readFileSync('studio/schemaTypes/objects.ts', 'utf8');
	const indexSource = readFileSync('studio/schemaTypes/index.ts', 'utf8');
	const querySource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const typesSource = readFileSync('src/lib/content/types.ts', 'utf8');
	const pageSource = readFileSync('src/routes/educore/+page.svelte', 'utf8');

	assert.match(schemaSource, /name:\s*'educoreOverview'/);
	assert.match(schemaSource, /name:\s*'useCasesHeader'[\s\S]*type:\s*'sectionHeader'/);
	assert.match(schemaSource, /name:\s*'useCases'[\s\S]*type:\s*'educoreFeatureCard'/);
	assert.match(schemaSource, /name:\s*'why'[\s\S]*type:\s*'sectionHeader'/);
	assert.match(schemaSource, /name:\s*'workingTowardHeading'[\s\S]*type:\s*'string'/);
	assert.match(schemaSource, /name:\s*'workingTowardItems'[\s\S]*type:\s*'textBlock'/);
	assert.match(schemaSource, /name:\s*'phaseOneHeader'[\s\S]*type:\s*'sectionHeader'/);
	assert.match(schemaSource, /name:\s*'phaseOneDeliverables'[\s\S]*type:\s*'textBlock'/);
	assert.match(schemaSource, /name:\s*'standardsAlignment'[\s\S]*type:\s*'sectionHeader'/);
	assert.match(schemaSource, /name:\s*'aiBakeoffHeader'[\s\S]*type:\s*'sectionHeader'/);
	assert.match(schemaSource, /name:\s*'aiBakeoffDemos'[\s\S]*type:\s*'educoreDemo'/);
	assert.doesNotMatch(schemaSource, /name:\s*'platform'/);

	assert.match(objectsSource, /export const educoreFeatureCard = defineType\(\{/);
	assert.match(objectsSource, /name:\s*'educoreFeatureCard'/);
	assert.match(objectsSource, /name:\s*'icon'[\s\S]*value:\s*'robot'[\s\S]*value:\s*'building-community'/);
	assert.match(objectsSource, /export const educoreDemo = defineType\(\{/);
	assert.match(objectsSource, /name:\s*'educoreDemo'/);
	assert.match(objectsSource, /name:\s*'thumbnailImage'[\s\S]*type:\s*'image'/);
	assert.match(objectsSource, /name:\s*'videoUrl'[\s\S]*type:\s*'url'/);
	assert.doesNotMatch(objectsSource, /export const platformTool/);
	assert.match(indexSource, /educoreFeatureCard/);
	assert.match(indexSource, /educoreDemo/);
	assert.doesNotMatch(indexSource, /platformTool/);

	assert.match(querySource, /const educoreFeatureCardProjection = `\{/);
	assert.match(querySource, /const educoreDemoProjection = `\{/);
	assert.match(querySource, /"thumbnailImage":\s*select\(\s*defined\(thumbnailImage\.asset\)\s*=>\s*\{/);
	assert.match(querySource, /"useCases":\s*coalesce\(useCases\[\]\$\{educoreFeatureCardProjection\}, \[\]\)/);
	assert.match(querySource, /why\$\{sectionHeaderProjection\}/);
	assert.match(querySource, /workingTowardHeading/);
	assert.match(querySource, /"workingTowardItems":\s*coalesce\(workingTowardItems\[\]\{/);
	assert.match(querySource, /"phaseOneDeliverables":\s*coalesce\(phaseOneDeliverables\[\]\{/);
	assert.match(querySource, /standardsAlignment\$\{sectionHeaderProjection\}/);
	assert.match(querySource, /"aiBakeoffDemos":\s*coalesce\(aiBakeoffDemos\[\]\$\{educoreDemoProjection\}, \[\]\)/);
	assert.doesNotMatch(querySource, /platformToolProjection/);

	assert.match(typesSource, /export type EducoreFeatureCard = \{/);
	assert.match(typesSource, /icon:\s*string;/);
	assert.match(typesSource, /export type EducoreDemo = \{/);
	assert.match(typesSource, /thumbnailImage\?:\s*ImageAsset;/);
	assert.match(typesSource, /videoUrl:\s*string;/);
	assert.match(typesSource, /useCasesHeader:\s*SectionHeader;/);
	assert.match(typesSource, /useCases:\s*EducoreFeatureCard\[\];/);
	assert.match(typesSource, /why:\s*SectionHeader;/);
	assert.match(typesSource, /workingTowardItems:\s*TextBlock\[\];/);
	assert.match(typesSource, /phaseOneDeliverables:\s*TextBlock\[\];/);
	assert.match(typesSource, /aiBakeoffDemos:\s*EducoreDemo\[\];/);
	assert.doesNotMatch(typesSource, /platform:\s*\{/);
	assert.doesNotMatch(typesSource, /PlatformTool/);

	assert.match(pageSource, /import Card from '\$lib\/components\/site\/Card\.svelte';/);
	assert.match(pageSource, /page\.useCasesHeader/);
	assert.match(pageSource, /page\.useCases/);
	assert.match(pageSource, /page\.why/);
	assert.match(pageSource, /page\.workingTowardItems/);
	assert.match(pageSource, /page\.phaseOneDeliverables/);
	assert.match(pageSource, /page\.standardsAlignment/);
	assert.match(pageSource, /page\.aiBakeoffDemos/);
	assert.match(pageSource, /class="demo-card"/);
	assert.match(pageSource, /target=\{isExternalLink\(demo\.videoUrl\) \? '_blank' : undefined\}/);
	assert.match(pageSource, /<PageCtas ctas=\{page\.ctas\}/);
	assert.doesNotMatch(pageSource, /page\.platform/);
});

test('EDUcore overview balances use-case layout and explanatory copy', () => {
	const pageSource = readFileSync('src/routes/educore/+page.svelte', 'utf8');
	const seedSource = readFileSync('studio/migrations/seed-educore-overview.ts', 'utf8');

	assert.match(pageSource, /\.use-case-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
	assert.match(
		pageSource,
		/@media \(max-width: 860px\)\s*\{[\s\S]*\.use-case-grid[\s\S]*grid-template-columns:\s*1fr/
	);

	assert.match(seedSource, /why:\s*\{[\s\S]*body:\s*\[\s*paragraph\(\s*'why-1'/);
	assert.doesNotMatch(seedSource, /'why-2'/);
	assert.match(seedSource, /standardsAlignment:\s*\{[\s\S]*body:\s*\[/);
	assert.match(seedSource, /AI-ready "source of truth" for interoperability/);
	assert.match(seedSource, /We are not creating one new standard/);
});
