import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-06-01'})

type LinkDestination = {
	_type: 'linkDestination'
	type: 'internalPage' | 'externalUrl' | 'anchor'
	pageKey?: string
	anchorId?: string
	href?: string
}

type NavItem = {
	_key: string
	_type: 'navItem'
	label: string
	disabled: boolean
	hidden: boolean
	destination: LinkDestination
}

type SitePageDocument = {
	_id: string
	_type: 'sitePage'
	title: string
	sectionKey: string
	routePageKey: string
	navLabel: string
	sortOrder: number
	disabled: boolean
	hidden: boolean
	navigationItems: NavItem[]
}

const routePageKeyByHref: Record<string, string> = {
	'/': 'eduHome',
	'/edu': 'eduHome',
	'/edu/board': 'eduBoard',
	'/edu/history': 'eduHistory',
	'/dsu': 'dsuHome',
	'/dsu/members': 'dsuMembers',
	'/dsu/joining': 'dsuJoin',
	'/dsu/projects': 'dsuProjects',
	'/ceds': 'cedsOverview',
	'/educore': 'educoreOverview',
	'/resources': 'resourcesHub',
	'/resources/library': 'resourcesLibrary',
	'/resources/newsletter': 'resourcesNewsletter',
	'/resources/glossary': 'resourcesGlossary',
	'/resources/faq': 'resourcesFaq',
	'/resources/press': 'resourcesPress',
	'/events': 'eventsUpcoming',
	'/events/past': 'eventsPast',
	'/contact': 'contact'
}

function splitHrefAnchor(href: string) {
	const anchorIndex = href.indexOf('#')

	if (anchorIndex === -1) {
		return {path: href}
	}

	return {
		path: href.slice(0, anchorIndex) || undefined,
		anchorId: href.slice(anchorIndex + 1)
	}
}

function destinationFromHref(href?: string): LinkDestination {
	if (!href) {
		return {
			_type: 'linkDestination',
			type: 'externalUrl',
			href: '#'
		}
	}

	if (href.startsWith('#')) {
		return {
			_type: 'linkDestination',
			type: 'anchor',
			anchorId: href.slice(1)
		}
	}

	const {path, anchorId} = splitHrefAnchor(href)
	const pageKey = path ? routePageKeyByHref[path] : undefined

	if (pageKey && anchorId) {
		return {
			_type: 'linkDestination',
			type: 'anchor',
			pageKey,
			anchorId
		}
	}

	if (pageKey) {
		return {
			_type: 'linkDestination',
			type: 'internalPage',
			pageKey
		}
	}

	return {
		_type: 'linkDestination',
		type: 'externalUrl',
		href
	}
}

function navItem(key: string, label: string, href: string, disabled = false): NavItem {
	return {
		_key: key,
		_type: 'navItem',
		label,
		disabled,
		hidden: false,
		destination: destinationFromHref(href)
	}
}

const sitePages: SitePageDocument[] = [
	{
		_id: 'sitePageEdu',
		_type: 'sitePage',
		title: 'EDU navigation',
		sectionKey: 'edu',
		routePageKey: 'eduHome',
		navLabel: 'EDU',
		sortOrder: 10,
		disabled: false,
		hidden: false,
		navigationItems: [
			navItem('overview', 'Overview', '/'),
			navItem('board', 'Board', '/edu/board'),
			navItem('history', 'History', '/edu/history')
		]
	},
	{
		_id: 'sitePageDsu',
		_type: 'sitePage',
		title: 'DSU navigation',
		sectionKey: 'dsu',
		routePageKey: 'dsuHome',
		navLabel: 'DSU',
		sortOrder: 20,
		disabled: false,
		hidden: false,
		navigationItems: [
			navItem('home', 'Home', '/dsu'),
			navItem('members', 'Members', '/dsu/members'),
			navItem('joining-dsu', 'Joining DSU', '/dsu/joining'),
			navItem('projects', 'Projects', '/dsu/projects')
		]
	},
	{
		_id: 'sitePageCeds',
		_type: 'sitePage',
		title: 'CEDS navigation',
		sectionKey: 'ceds',
		routePageKey: 'cedsOverview',
		navLabel: 'CEDS',
		sortOrder: 30,
		disabled: false,
		hidden: false,
		navigationItems: [
			navItem('overview', 'Overview', '/ceds'),
			navItem('ceds-gitbook', 'CEDS GitBook', 'https://cedstandards.gitbook.io/ceds-gitbook')
		]
	},
	{
		_id: 'sitePageEducore',
		_type: 'sitePage',
		title: 'EDUcore navigation',
		sectionKey: 'educore',
		routePageKey: 'educoreOverview',
		navLabel: 'EDUcore',
		sortOrder: 40,
		disabled: false,
		hidden: false,
		navigationItems: [
			navItem('overview', 'Overview', '/educore'),
			navItem('reference-library', 'Reference library', 'https://educore.dev/explore/use-cases'),
			navItem('ai-bakeoff', 'AI Bakeoff', '/educore#bakeoff')
		]
	},
	{
		_id: 'sitePageResources',
		_type: 'sitePage',
		title: 'Resources navigation',
		sectionKey: 'resources',
		routePageKey: 'resourcesHub',
		navLabel: 'Resources',
		sortOrder: 50,
		disabled: false,
		hidden: false,
		navigationItems: [
			navItem('hub', 'Hub', '/resources'),
			navItem('library', 'Library', '/resources/library'),
			navItem('newsletter', 'Newsletter', '/resources/newsletter'),
			navItem('glossary', 'Glossary', '/resources/glossary'),
			navItem('faq', 'FAQ', '/resources/faq'),
			navItem('press-charter', 'Press & charter', '/resources/press')
		]
	},
	{
		_id: 'sitePageEvents',
		_type: 'sitePage',
		title: 'Events navigation',
		sectionKey: 'events',
		routePageKey: 'eventsUpcoming',
		navLabel: 'Events',
		sortOrder: 60,
		disabled: false,
		hidden: false,
		navigationItems: [
			navItem('upcoming', 'Upcoming', '/events'),
			navItem('past-events', 'Past events', '/events/past')
		]
	},
	{
		_id: 'sitePageContact',
		_type: 'sitePage',
		title: 'Contact navigation',
		sectionKey: 'contact',
		routePageKey: 'contact',
		navLabel: 'Contact',
		sortOrder: 70,
		disabled: false,
		hidden: false,
		navigationItems: []
	}
]

const legacyContentDocumentIds = [
	'cedsOverview',
	'dsuHome',
	'dsuMembers',
	'dsuJoin',
	'dsuProjects',
	'eduOverview',
	'eduBoard',
	'eduHistory',
	'eduContact',
	'educoreOverview',
	'eventsUpcoming',
	'eventsPast',
	'resourcesHub',
	'resourcesLibrary',
	'resourcesNewsletter',
	'resourcesGlossary',
	'resourcesFaq',
	'resourcesPress'
]

for (const sitePage of sitePages) {
	await client.createIfNotExists(sitePage)
	await client
		.patch(sitePage._id)
		.setIfMissing({
			title: sitePage.title,
			sectionKey: sitePage.sectionKey,
			routePageKey: sitePage.routePageKey,
			navLabel: sitePage.navLabel,
			sortOrder: sitePage.sortOrder,
			disabled: sitePage.disabled,
			hidden: sitePage.hidden,
			navigationItems: sitePage.navigationItems
		})
		.commit()
}

for (const documentId of legacyContentDocumentIds) {
	const document = await client.getDocument(documentId)

	if (document) {
		await client.patch(documentId).unset(['slug', 'activeSection', 'subNav']).commit()
	}
}

console.log('Seeded site page navigation documents and removed legacy page navigation fields.')
