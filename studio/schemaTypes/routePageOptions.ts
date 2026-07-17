export type StudioSectionKey = 'edu' | 'dsu' | 'ceds' | 'educore' | 'resources' | 'events' | 'contact'

export const routePageOptions = [
	{title: 'EDU home', value: 'eduHome', section: 'edu', path: '/'},
	{title: 'EDU board', value: 'eduBoard', section: 'edu', path: '/edu/board'},
	{title: 'EDU history', value: 'eduHistory', section: 'edu', path: '/edu/history'},
	{title: 'DSU overview', value: 'dsuHome', section: 'dsu', path: '/dsu'},
	{title: 'DSU members', value: 'dsuMembers', section: 'dsu', path: '/dsu/members'},
	{title: 'Joining DSU', value: 'dsuJoin', section: 'dsu', path: '/dsu/joining'},
	{title: 'DSU projects', value: 'dsuProjects', section: 'dsu', path: '/dsu/projects'},
	{title: 'DSU standards', value: 'dsuStandards', section: 'dsu', path: '/dsu/standards'},
	{title: 'CEDS overview', value: 'cedsOverview', section: 'ceds', path: '/ceds'},
	{title: 'EDUcore overview', value: 'educoreOverview', section: 'educore', path: '/educore'},
	{title: 'Milestones', value: 'educoreMilestones', section: 'educore', path: '/educore/milestones'},
	{title: 'Resources hub', value: 'resourcesHub', section: 'resources', path: '/resources'},
	{title: 'Resources library', value: 'resourcesLibrary', section: 'resources', path: '/resources/library'},
	{title: 'Newsletter', value: 'resourcesNewsletter', section: 'resources', path: '/resources/newsletter'},
	{title: 'Glossary', value: 'resourcesGlossary', section: 'resources', path: '/resources/glossary'},
	{title: 'FAQ', value: 'resourcesFaq', section: 'resources', path: '/resources/faq'},
	{title: 'Press & charter', value: 'resourcesPress', section: 'resources', path: '/resources/press'},
	{title: 'Upcoming events', value: 'eventsUpcoming', section: 'events', path: '/events'},
	{title: 'Past events', value: 'eventsPast', section: 'events', path: '/events/past'},
	{title: 'Contact', value: 'contact', section: 'contact', path: '/contact'}
] as const

export const sectionOptions = [
	{title: 'EDU', value: 'edu'},
	{title: 'DSU', value: 'dsu'},
	{title: 'CEDS', value: 'ceds'},
	{title: 'EDUcore', value: 'educore'},
	{title: 'Resources', value: 'resources'},
	{title: 'Events', value: 'events'},
	{title: 'Contact', value: 'contact'}
] as const

export function getRoutePageOptionsForSection(section: StudioSectionKey) {
	return routePageOptions.filter((option) => option.section === section)
}
