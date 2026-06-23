import type {
	EventItem,
	EventsPastPage,
	EventsUpcomingPage,
	FaqItem,
	GlossaryTerm,
	NewsletterDocumentItem,
	PressDocumentItem,
	ResourceDocumentItem,
	ResourcesFaqPage,
	ResourcesGlossaryPage,
	ResourcesLibraryPage,
	ResourcesNewsletterPage,
	ResourcesPressPage
} from './types';

export type SearchResult = {
	id: string;
	type: string;
	title: string;
	description?: string;
	href?: string;
	linkLabel: string;
	metadata: string[];
	score: number;
	target?: '_blank';
	rel?: 'noopener noreferrer';
	download?: string | boolean;
	disabled?: boolean;
};

type SearchField = {
	value?: string;
	weight: number;
};

export type IndexedSearchResult = Omit<SearchResult, 'score'> & {
	fields: SearchField[];
};

const SEARCH_RESULT_TYPE_ORDER = [
	'Library resource',
	'Press & charter',
	'Newsletter',
	'Glossary',
	'FAQ',
	'Event',
	'Past event'
];

export type SearchContentSources = {
	library: Pick<ResourcesLibraryPage, 'items'>;
	press: Pick<ResourcesPressPage, 'items'>;
	newsletter: Pick<ResourcesNewsletterPage, 'items'>;
	glossary: Pick<ResourcesGlossaryPage, 'terms'>;
	faq: Pick<ResourcesFaqPage, 'items'>;
	upcomingEvents: Pick<EventsUpcomingPage, 'events'>;
	pastEvents: Pick<EventsPastPage, 'archive'>;
};

export type SearchFetchers = {
	getResourcesLibraryPage: () => Promise<Pick<ResourcesLibraryPage, 'items'>>;
	getResourcesPressPage: () => Promise<Pick<ResourcesPressPage, 'items'>>;
	getResourcesNewsletterPage: () => Promise<Pick<ResourcesNewsletterPage, 'items'>>;
	getResourcesGlossaryPage: () => Promise<Pick<ResourcesGlossaryPage, 'terms'>>;
	getResourcesFaqPage: () => Promise<Pick<ResourcesFaqPage, 'items'>>;
	getEventsUpcomingPage: () => Promise<Pick<EventsUpcomingPage, 'events'>>;
	getEventsPastPage: () => Promise<Pick<EventsPastPage, 'archive'>>;
};

async function getDefaultFetchers(): Promise<SearchFetchers> {
	const site = await import('./site');

	return {
		getResourcesLibraryPage: site.getResourcesLibraryPage,
		getResourcesPressPage: site.getResourcesPressPage,
		getResourcesNewsletterPage: site.getResourcesNewsletterPage,
		getResourcesGlossaryPage: site.getResourcesGlossaryPage,
		getResourcesFaqPage: site.getResourcesFaqPage,
		getEventsUpcomingPage: site.getEventsUpcomingPage,
		getEventsPastPage: site.getEventsPastPage
	};
}

export function normalizeKeyword(keyword: string) {
	return keyword.trim().replace(/\s+/g, ' ');
}

function cleanText(value?: string) {
	return normalizeKeyword(value ?? '');
}

function isUsableHref(href?: string) {
	return Boolean(href && href !== '#');
}

function isExternalHref(href?: string) {
	return Boolean(href && (/^https?:\/\//.test(href) || href.startsWith('//')));
}

function linkProps(href?: string) {
	if (!isUsableHref(href)) {
		return { disabled: true };
	}

	return isExternalHref(href)
		? { href, target: '_blank' as const, rel: 'noopener noreferrer' as const }
		: { href };
}

function documentResult(
	prefix: string,
	type: string,
	item: ResourceDocumentItem | PressDocumentItem | NewsletterDocumentItem,
	index: number
): IndexedSearchResult {
	const metadata = [item.category, item.documentType].filter(Boolean);

	return {
		id: `${prefix}-${index}-${item.title}`,
		type,
		title: item.title,
		description: item.description,
		linkLabel: 'Download file',
		metadata,
		href: item.document.url,
		target: '_blank',
		rel: 'noopener noreferrer',
		download: item.document.filename ?? true,
		fields: [
			{ value: item.title, weight: 24 },
			{ value: item.description, weight: 8 },
			{ value: metadata.join(' '), weight: 5 }
		]
	};
}

function glossaryResult(term: GlossaryTerm, index: number): IndexedSearchResult {
	return {
		id: `glossary-${index}-${term.term}`,
		type: 'Glossary',
		title: term.term,
		description: term.definition,
		href: '/resources/glossary',
		linkLabel: 'View glossary',
		metadata: [term.category].filter(Boolean),
		fields: [
			{ value: term.term, weight: 24 },
			{ value: term.definition, weight: 8 },
			{ value: term.category, weight: 5 }
		]
	};
}

function faqResult(item: FaqItem, index: number): IndexedSearchResult {
	return {
		id: `faq-${index}-${item.question}`,
		type: 'FAQ',
		title: item.question,
		description: item.answer,
		href: '/resources/faq',
		linkLabel: 'View FAQ',
		metadata: [item.category ?? 'FAQ'].filter(Boolean),
		fields: [
			{ value: item.question, weight: 24 },
			{ value: item.answer, weight: 8 },
			{ value: item.category, weight: 5 }
		]
	};
}

function eventResult(
	prefix: string,
	type: string,
	event: EventItem,
	index: number
): IndexedSearchResult {
	const metadata = [event.tag, event.date].filter(Boolean);

	return {
		id: `${prefix}-${index}-${event.title}`,
		type,
		title: event.title,
		description: event.description,
		linkLabel: 'Learn more',
		metadata,
		...linkProps(event.href),
		fields: [
			{ value: event.title, weight: 24 },
			{ value: event.description, weight: 8 },
			{ value: metadata.join(' '), weight: 5 }
		]
	};
}

export function createSearchIndex(content: SearchContentSources): IndexedSearchResult[] {
	return [
		...content.library.items.map((item, index) =>
			documentResult('library', 'Library resource', item, index)
		),
		...content.press.items.map((item, index) =>
			documentResult('press', 'Press & charter', item, index)
		),
		...content.newsletter.items.map((item, index) =>
			documentResult('newsletter', 'Newsletter', item, index)
		),
		...content.glossary.terms.map(glossaryResult),
		...content.faq.items.map(faqResult),
		...content.upcomingEvents.events.map((event, index) =>
			eventResult('event', 'Event', event, index)
		),
		...content.pastEvents.archive.flatMap((group, groupIndex) =>
			group.events.map((event, eventIndex) =>
				eventResult(`past-${groupIndex}-${group.year}`, 'Past event', event, eventIndex)
			)
		)
	];
}

function scoreResult(result: IndexedSearchResult, keyword: string) {
	const normalizedKeyword = keyword.toLowerCase();
	const terms = normalizedKeyword.split(' ').filter(Boolean);
	const aggregate = result.fields
		.map((field) => field.value ?? '')
		.join(' ')
		.toLowerCase();

	if (!terms.length || terms.some((term) => !aggregate.includes(term))) {
		return 0;
	}

	return result.fields.reduce((score, field) => {
		const value = cleanText(field.value).toLowerCase();

		if (!value) {
			return score;
		}

		if (value.includes(normalizedKeyword)) {
			return score + field.weight * 2;
		}

		const termMatches = terms.filter((term) => value.includes(term)).length;
		return score + termMatches * field.weight;
	}, 0);
}

export function searchContent(index: IndexedSearchResult[], keyword: string): SearchResult[] {
	const normalizedKeyword = normalizeKeyword(keyword);

	if (!normalizedKeyword) {
		return [];
	}

	return index
		.map((result) => ({ ...result, score: scoreResult(result, normalizedKeyword) }))
		.filter((result) => result.score > 0)
		.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
		.map(({ fields, ...result }) => result);
}

export function getSearchResultTypeOptions(results: SearchResult[]) {
	const resultTypes = new Set(results.map((result) => result.type));
	const knownTypes = SEARCH_RESULT_TYPE_ORDER.filter((type) => resultTypes.has(type));
	const customTypes = [...resultTypes]
		.filter((type) => !SEARCH_RESULT_TYPE_ORDER.includes(type))
		.sort((first, second) => first.localeCompare(second));

	return [...knownTypes, ...customTypes];
}

export function filterSearchResultsByType(results: SearchResult[], selectedType: string) {
	return selectedType ? results.filter((result) => result.type === selectedType) : results;
}

export async function getSearchResults(keyword: string, fetchers?: SearchFetchers) {
	const resolvedFetchers = fetchers ?? (await getDefaultFetchers());
	const [library, press, newsletter, glossary, faq, upcomingEvents, pastEvents] = await Promise.all([
		resolvedFetchers.getResourcesLibraryPage(),
		resolvedFetchers.getResourcesPressPage(),
		resolvedFetchers.getResourcesNewsletterPage(),
		resolvedFetchers.getResourcesGlossaryPage(),
		resolvedFetchers.getResourcesFaqPage(),
		resolvedFetchers.getEventsUpcomingPage(),
		resolvedFetchers.getEventsPastPage()
	]);

	return searchContent(
		createSearchIndex({ library, press, newsletter, glossary, faq, upcomingEvents, pastEvents }),
		keyword
	);
}
