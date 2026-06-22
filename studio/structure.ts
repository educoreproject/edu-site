import type {StructureBuilder, StructureResolver} from 'sanity/structure'

type ContentPage = {
	id: string
	title: string
}

type SitePageSection = {
	title: string
	items: ContentPage[]
	sitePage?: ContentPage
}

const sections: SitePageSection[] = [
	{
		title: 'EDU',
		sitePage: {id: 'sitePageEdu', title: 'EDU navigation'},
		items: [
			{id: 'eduOverview', title: 'Overview'},
			{id: 'eduBoard', title: 'Board'},
			{id: 'eduHistory', title: 'History'}
		]
	},
	{
		title: 'DSU',
		sitePage: {id: 'sitePageDsu', title: 'DSU navigation'},
		items: [
			{id: 'dsuHome', title: 'Home'},
			{id: 'dsuMembers', title: 'Members'},
			{id: 'dsuJoin', title: 'Joining DSU'},
			{id: 'dsuProjects', title: 'Projects'}
		]
	},
	{
		title: 'CEDS',
		sitePage: {id: 'sitePageCeds', title: 'CEDS navigation'},
		items: [{id: 'cedsOverview', title: 'Overview'}]
	},
	{
		title: 'EDUcore',
		sitePage: {id: 'sitePageEducore', title: 'EDUcore navigation'},
		items: [{id: 'educoreOverview', title: 'Overview'}]
	},
	{
		title: 'Resources',
		sitePage: {id: 'sitePageResources', title: 'Resources navigation'},
		items: [
			{id: 'resourcesHub', title: 'Hub'},
			{id: 'resourcesLibrary', title: 'Library'},
			{id: 'resourcesNewsletter', title: 'Newsletter'},
			{id: 'resourcesGlossary', title: 'Glossary'},
			{id: 'resourcesFaq', title: 'FAQ'},
			{id: 'resourcesPress', title: 'Press & charter'}
		]
	},
	{
		title: 'Events',
		sitePage: {id: 'sitePageEvents', title: 'Events navigation'},
		items: [
			{id: 'eventsUpcoming', title: 'Upcoming'},
			{id: 'eventsPast', title: 'Past events'}
		]
	},
	{
		title: 'Contact',
		sitePage: {id: 'sitePageContact', title: 'Contact navigation'},
		items: [{id: 'eduContact', title: 'Contact page'}]
	}
]

const curatedDocumentTypeIds = new Set([
	'sitePage',
	'siteChrome',
	...sections.flatMap((section) => section.items.map((item) => item.id))
])

function singleton(S: StructureBuilder, title: string, schemaType: string, documentId: string) {
	return S.listItem()
		.title(title)
		.id(documentId)
		.child(S.document().schemaType(schemaType).documentId(documentId).title(title))
}

function contentItem(S: StructureBuilder, page: ContentPage) {
	return singleton(S, page.title, page.id, page.id)
}

export const structure: StructureResolver = (S) =>
	S.list()
		.title('Site pages')
		.items([
			...sections.map((section) =>
				S.listItem()
					.title(section.title)
					.id(`${section.title.toLowerCase()}Pages`)
					.child(
						S.list()
							.title(section.title)
							.items([
								...(section.sitePage
									? [singleton(S, section.sitePage.title, 'sitePage', section.sitePage.id)]
									: []),
								...section.items.map((page) => contentItem(S, page))
							])
					)
			),
			S.divider(),
			...S.documentTypeListItems().filter((item) => {
				const id = item.getId()
				return !curatedDocumentTypeIds.has(id)
			})
		])
