import assert from 'node:assert/strict';
import { test } from 'node:test';

const {
	createSearchIndex,
	filterSearchResultsByType,
	getSearchResultTypeOptions,
	searchContent,
	normalizeKeyword,
	getSearchResults
} = await import('../src/lib/content/search.ts');

function fixtureContent() {
	return {
		library: {
			items: [
				{
					category: 'Reports',
					title: 'Data Quality Toolkit',
					documentType: 'PDF',
					description: 'A guide for improving DSU data quality.',
					document: {
						url: 'https://cdn.example.org/data-quality.pdf',
						filename: 'data-quality.pdf'
					}
				}
			]
		},
		press: {
			items: [
				{
					category: 'Press releases',
					title: 'EDU announces new partners',
					documentType: 'PDF',
					description: 'Partner announcement.',
					document: {
						url: 'https://cdn.example.org/partners.pdf',
						filename: 'partners.pdf'
					}
				}
			]
		},
		newsletter: {
			items: [
				{
					category: 'January 2026',
					title: 'January newsletter',
					documentType: 'PDF',
					description: 'Updates on community events.',
					document: {
						url: 'https://cdn.example.org/january.pdf',
						filename: 'january.pdf'
					}
				}
			]
		},
		glossary: {
			terms: [
				{
					term: 'Interoperability',
					definition: 'Systems exchanging and using data.',
					category: 'Data systems'
				}
			]
		},
		faq: {
			items: [
				{
					question: 'How do members share data?',
					answer: 'Members use approved governance practices.',
					category: 'About DSU'
				}
			]
		},
		upcomingEvents: {
			events: [
				{
					tag: 'Webinar',
					date: 'July 15, 2026',
					title: 'Data Quality Webinar',
					description: 'A webinar about practical quality checks.',
					href: 'https://example.org/webinar'
				},
				{
					tag: 'Workshop',
					date: 'August 1, 2026',
					title: 'Governance workshop',
					description: 'Hands-on planning session.',
					href: '#'
				}
			]
		},
		pastEvents: {
			archive: [
				{
					year: '2025',
					events: [
						{
							tag: 'Convening',
							date: 'May 8, 2025',
							title: 'Past Data Convening',
							description: 'A recap of state data work.',
							href: 'https://example.org/past'
						}
					]
				}
			]
		}
	};
}

test('normalizeKeyword trims repeated whitespace', () => {
	assert.equal(normalizeKeyword('  data   quality  '), 'data quality');
});

test('createSearchIndex normalizes all Resources and Events result types', () => {
	const results = createSearchIndex(fixtureContent());

	assert.deepEqual(
		results.map((result) => result.type),
		[
			'Library resource',
			'Press & charter',
			'Newsletter',
			'Glossary',
			'FAQ',
			'Event',
			'Event',
			'Past event'
		]
	);
	assert.equal(results[0].href, 'https://cdn.example.org/data-quality.pdf');
	assert.equal(results[0].download, 'data-quality.pdf');
	assert.equal(results[3].href, '/resources/glossary');
	assert.equal(results[4].href, '/resources/faq');
	assert.equal(results[6].href, undefined);
	assert.equal(results[6].disabled, true);
});

test('createSearchIndex assigns unique ids when past event titles repeat in the same year', () => {
	const content = fixtureContent();
	content.pastEvents.archive[0].events.push({
		tag: 'Convening',
		date: 'June 12, 2025',
		title: 'Past Data Convening',
		description: 'A second event with the same public title.',
		href: 'https://example.org/past-duplicate'
	});

	const results = createSearchIndex(content);
	const ids = results.map((result) => result.id);

	assert.equal(new Set(ids).size, ids.length);
});

test('searchContent filters case-insensitively across titles, body, and metadata', () => {
	const index = createSearchIndex(fixtureContent());

	assert.deepEqual(
		searchContent(index, 'WEBINAR').map((result) => result.title),
		['Data Quality Webinar']
	);
	assert.deepEqual(
		searchContent(index, 'governance').map((result) => result.title),
		['Governance workshop', 'How do members share data?']
	);
	assert.deepEqual(
		searchContent(index, 'january 2026').map((result) => result.title),
		['January newsletter']
	);
});

test('searchContent ranks title matches before lower-strength metadata matches', () => {
	const index = createSearchIndex(fixtureContent());
	const results = searchContent(index, 'data');

	assert.equal(results[0].title, 'Data Quality Toolkit');
	assert.ok(results[0].score > results.at(-1).score);
});

test('searchContent returns no results for an empty keyword', () => {
	assert.deepEqual(searchContent(createSearchIndex(fixtureContent()), '   '), []);
});

test('getSearchResultTypeOptions derives available result types in stable type order', () => {
	const results = searchContent(createSearchIndex(fixtureContent()), 'data');

	assert.deepEqual(getSearchResultTypeOptions(results), [
		'Library resource',
		'Glossary',
		'FAQ',
		'Event',
		'Past event'
	]);
});

test('filterSearchResultsByType narrows results by selected type', () => {
	const results = searchContent(createSearchIndex(fixtureContent()), 'data');

	assert.deepEqual(
		filterSearchResultsByType(results, 'Event').map((result) => result.title),
		['Data Quality Webinar']
	);
	assert.deepEqual(filterSearchResultsByType(results, ''), results);
	assert.deepEqual(filterSearchResultsByType(results, 'Missing type'), []);
});

test('getSearchResults delegates to supplied content fetchers', async () => {
	const results = await getSearchResults('quality', {
		getResourcesLibraryPage: async () => fixtureContent().library,
		getResourcesPressPage: async () => fixtureContent().press,
		getResourcesNewsletterPage: async () => fixtureContent().newsletter,
		getResourcesGlossaryPage: async () => fixtureContent().glossary,
		getResourcesFaqPage: async () => fixtureContent().faq,
		getEventsUpcomingPage: async () => fixtureContent().upcomingEvents,
		getEventsPastPage: async () => fixtureContent().pastEvents
	});

	assert.deepEqual(
		results.map((result) => result.title),
		['Data Quality Toolkit', 'Data Quality Webinar']
	);
});
