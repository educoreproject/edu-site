export const RESOURCE_TYPE_OPTIONS = ['DSU', 'EDU', 'EDUcore'] as const;
export type ResourceType = (typeof RESOURCE_TYPE_OPTIONS)[number];

const DEFAULT_RESOURCE_TYPE = RESOURCE_TYPE_OPTIONS[0];
const DOCUMENT_FORMAT_ORDER = ['PDF', 'Word doc', 'Other'] as const;

type FilterableDocument = {
	category: string;
	resourceType?: string;
	documentType?: string;
};

export type DocumentFilterState = {
	category?: string;
	resourceType?: string;
	format?: string;
};

export function documentMatchesFilters(
	item: FilterableDocument,
	filters: DocumentFilterState
) {
	const resourceType = item.resourceType ?? DEFAULT_RESOURCE_TYPE;

	if (filters.category && item.category !== filters.category) {
		return false;
	}

	if (filters.resourceType && resourceType !== filters.resourceType) {
		return false;
	}

	if (filters.format && item.documentType !== filters.format) {
		return false;
	}

	return true;
}

export function getDocumentResourceType(item: Pick<FilterableDocument, 'resourceType'>) {
	return item.resourceType ?? DEFAULT_RESOURCE_TYPE;
}

export function getDocumentFormatOptions(items: FilterableDocument[]) {
	const discoveredFormats = new Set(
		items.map((item) => item.documentType).filter((format): format is string => Boolean(format))
	);
	const knownFormats = DOCUMENT_FORMAT_ORDER.filter((format) => discoveredFormats.has(format));
	const customFormats = [...discoveredFormats]
		.filter((format) => !DOCUMENT_FORMAT_ORDER.includes(format as (typeof DOCUMENT_FORMAT_ORDER)[number]))
		.sort((first, second) => first.localeCompare(second));

	return [...knownFormats, ...customFormats];
}
