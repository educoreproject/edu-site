import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('event category helper derives assignable event filters from event data', () => {
	const helperPath = 'src/lib/content/event-filters.ts';

	assert.equal(existsSync(helperPath), true);

	const source = readFileSync(helperPath, 'utf8');

	assert.match(source, /import \{ RESOURCE_TYPE_OPTIONS \} from '\.\/document-filters';/);
	assert.match(source, /const DEFAULT_EVENT_CATEGORY = RESOURCE_TYPE_OPTIONS\[0\];/);
	assert.match(source, /function isEventCategory/);
	assert.match(source, /RESOURCE_TYPE_OPTIONS\.includes\(category as/);
	assert.match(source, /export function getEventCategory/);
	assert.match(source, /return isEventCategory\(event\.category\) \? event\.category : DEFAULT_EVENT_CATEGORY;/);
	assert.match(source, /export function eventMatchesCategory/);
	assert.match(source, /return !selectedCategory \|\| getEventCategory\(event\) === selectedCategory;/);
	assert.match(source, /export function getEventCategoryOptions/);
	assert.match(source, /RESOURCE_TYPE_OPTIONS\.filter\(\(category\) => discoveredCategories\.has\(category\)\)/);
});

test('event item schema exposes DSU EDU and EDUcore category assignment', () => {
	const schemaSource = readFileSync('studio/schemaTypes/objects.ts', 'utf8');
	const eventItemSource = schemaSource.slice(
		schemaSource.indexOf('export const eventItem'),
		schemaSource.indexOf('export const eventArchiveGroup')
	);

	assert.match(eventItemSource, /name:\s*'category'/);
	assert.match(eventItemSource, /title:\s*'Category'/);
	assert.match(eventItemSource, /Controls whether this event appears under DSU, EDU, or EDUcore filters\./);
	assert.match(eventItemSource, /\{title:\s*'DSU',\s*value:\s*'DSU'\}/);
	assert.match(eventItemSource, /\{title:\s*'EDU',\s*value:\s*'EDU'\}/);
	assert.match(eventItemSource, /\{title:\s*'EDUcore',\s*value:\s*'EDUcore'\}/);
	assert.match(eventItemSource, /layout:\s*'radio'/);
	assert.match(eventItemSource, /initialValue:\s*'DSU'/);
	assert.match(eventItemSource, /validation:\s*\(rule\) => rule\.required\(\)/);
});

test('event content contract projects category metadata', () => {
	const querySource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const typesSource = readFileSync('src/lib/content/types.ts', 'utf8');

	assert.match(querySource, /const eventItemProjection = `\{/);
	assert.match(querySource, /tag,\s*category,\s*date,/);
	assert.match(typesSource, /export type EventItem = \{/);
	assert.match(typesSource, /category\?:\s*ResourceType/);
});

test('upcoming and past event routes filter by assigned event category', () => {
	const upcomingSource = readFileSync('src/routes/events/+page.svelte', 'utf8');
	const pastSource = readFileSync('src/routes/events/past/+page.svelte', 'utf8');

	for (const [pageName, source] of [
		['upcoming events', upcomingSource],
		['past events', pastSource]
	]) {
		assert.match(
			source,
			/import CategorySelector from '\$lib\/components\/site\/CategorySelector\.svelte';/,
			`${pageName} should render a left-side category selector`
		);
		assert.match(
			source,
			/import \{ eventMatchesCategory, getEventCategoryOptions \} from '\$lib\/content\/event-filters';/,
			`${pageName} should use shared event filter helpers`
		);
		assert.match(source, /let selectedCategory = \$state\(''\);/);
		assert.match(source, /let eventCategoryOptions = \$derived\(getEventCategoryOptions\(/);
		assert.match(source, /<CategorySelector[\s\S]*?categories=\{eventCategoryOptions\}[\s\S]*?allCategoryLabel="All events"[\s\S]*?bind:selectedCategory[\s\S]*?label="Event categories"/);
		assert.match(source, /function handleCategoryChange\(category: string\)/);
		assert.match(source, /class="event-content-layout"/);
		assert.match(source, /class="event-results"/);
		assert.match(source, /class="empty-state" role="status"/);
	}

	assert.match(upcomingSource, /let filteredEvents = \$derived\(\s*page\.events\.filter\(\(event\) => eventMatchesCategory\(event, selectedCategory\)\)\s*\);/);
	assert.match(upcomingSource, /\{#each filteredEvents as event\}/);
	assert.match(upcomingSource, /No events available/);

	assert.match(pastSource, /page\.archive\.flatMap\(\(group\) => group\.events\)/);
	assert.match(pastSource, /let filteredArchive = \$derived\(/);
	assert.match(pastSource, /events:\s*group\.events\.filter\(\(event\) => eventMatchesCategory\(event, selectedCategory\)\)/);
	assert.match(pastSource, /\.filter\(\(group\) => group\.events\.length\)/);
	assert.match(pastSource, /\{#each filteredArchive as group\}/);
	assert.match(pastSource, /No past events available/);
});
