import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('document filter helper defines type, format, and combined matching behavior', () => {
	const helperPath = 'src/lib/content/document-filters.ts';

	assert.equal(existsSync(helperPath), true);

	const source = readFileSync(helperPath, 'utf8');

	assert.match(source, /export const RESOURCE_TYPE_OPTIONS = \['DSU', 'EDU', 'EDUcore'\] as const;/);
	assert.match(source, /export type ResourceType = \(typeof RESOURCE_TYPE_OPTIONS\)\[number\];/);
	assert.match(source, /const DEFAULT_RESOURCE_TYPE = RESOURCE_TYPE_OPTIONS\[0\];/);
	assert.match(source, /const DOCUMENT_FORMAT_ORDER = \['PDF', 'Word doc', 'Other'\] as const;/);
	assert.match(source, /export type DocumentFilterState = \{/);
	assert.match(source, /category\?: string;/);
	assert.match(source, /resourceType\?: string;/);
	assert.match(source, /format\?: string;/);
	assert.match(source, /export function documentMatchesFilters/);
	assert.match(source, /if \(filters\.category && item\.category !== filters\.category\)/);
	assert.match(source, /const resourceType = item\.resourceType \?\? DEFAULT_RESOURCE_TYPE;/);
	assert.match(source, /if \(filters\.resourceType && resourceType !== filters\.resourceType\)/);
	assert.match(source, /if \(filters\.format && item\.documentType !== filters\.format\)/);
	assert.match(source, /export function getDocumentFormatOptions/);
	assert.match(source, /DOCUMENT_FORMAT_ORDER\.filter\(\(format\) => discoveredFormats\.has\(format\)\)/);
});

test('category selector supports accordion filter groups without losing legacy category filtering', () => {
	const selectorSource = readFileSync('src/lib/components/site/CategorySelector.svelte', 'utf8');

	assert.match(selectorSource, /type FilterGroup = \{/);
	assert.match(selectorSource, /groups\?: FilterGroup\[\]/);
	assert.match(selectorSource, /let renderedGroups = \$derived\(/);
	assert.match(selectorSource, /function toggleGroup\(groupId: string\)/);
	assert.match(selectorSource, /function isGroupOpen\(group: FilterGroup\)/);
	assert.match(selectorSource, /filter\(\(group\) => group\.defaultOpen === true\)/);
	assert.match(selectorSource, /return openGroupIds \? openGroupIds\.includes\(group\.id\) : group\.defaultOpen === true;/);
	assert.match(selectorSource, /function selectOption\(group: FilterGroup, option: string\)/);
	assert.match(selectorSource, /<button[\s\S]*?class="filter-group-trigger"[\s\S]*?aria-expanded=\{isGroupOpen\(group\)\}[\s\S]*?aria-controls=\{filterGroupPanelId\(group\)\}[\s\S]*?onclick=\{\(\) => toggleGroup\(group\.id\)\}/);
	assert.match(selectorSource, /<div class="filter-group-options" id=\{filterGroupPanelId\(group\)\}>/);
	assert.match(selectorSource, /aria-pressed=\{isSelectedOption\(group, option\)\}/);
	assert.match(selectorSource, /onclick=\{\(\) => selectOption\(group, option\)\}/);
	assert.match(selectorSource, /selectedCategory = nextValue;/);
	assert.match(selectorSource, /onSelect\?\.\(selectedCategory\);/);
});
