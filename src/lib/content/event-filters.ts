import { RESOURCE_TYPE_OPTIONS } from './document-filters';
import type { ResourceType } from './document-filters';

type FilterableEvent = {
	category?: string;
};

const DEFAULT_EVENT_CATEGORY = RESOURCE_TYPE_OPTIONS[0];

function isEventCategory(category?: string): category is ResourceType {
	return RESOURCE_TYPE_OPTIONS.includes(category as ResourceType);
}

export function getEventCategory(event: FilterableEvent) {
	return isEventCategory(event.category) ? event.category : DEFAULT_EVENT_CATEGORY;
}

export function eventMatchesCategory(event: FilterableEvent, selectedCategory: string) {
	return !selectedCategory || getEventCategory(event) === selectedCategory;
}

export function getEventCategoryOptions(events: FilterableEvent[]) {
	const discoveredCategories = new Set(events.map((event) => getEventCategory(event)));

	return RESOURCE_TYPE_OPTIONS.filter((category) => discoveredCategories.has(category));
}
