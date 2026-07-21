export type SiteSectionKey =
	| 'edu'
	| 'dsu'
	| 'ceds'
	| 'educore'
	| 'resources'
	| 'events'
	| 'contact';

export type RoutePageKey =
	| 'eduHome'
	| 'eduBoard'
	| 'eduHistory'
	| 'dsuHome'
	| 'dsuBoard'
	| 'dsuMembers'
	| 'dsuJoin'
	| 'dsuProjects'
	| 'dsuStandards'
	| 'cedsOverview'
	| 'educoreOverview'
	| 'educoreMilestones'
	| 'resourcesHub'
	| 'resourcesLibrary'
	| 'resourcesNewsletter'
	| 'resourcesGlossary'
	| 'resourcesFaq'
	| 'resourcesPress'
	| 'eventsUpcoming'
	| 'eventsPast'
	| 'contact';

export type SiteSectionMeta = {
	key: SiteSectionKey;
	label: string;
	homePageKey: RoutePageKey;
	defaultOrder: number;
};

export type RoutePageMeta = {
	key: RoutePageKey;
	sectionKey: SiteSectionKey;
	label: string;
	path: string;
	parentPath: string;
	isSectionHome?: boolean;
};

export const siteSectionKeys = [
	'edu',
	'dsu',
	'ceds',
	'educore',
	'resources',
	'events',
	'contact'
] as const satisfies readonly SiteSectionKey[];

export const routePageKeys = [
	'eduHome',
	'eduBoard',
	'eduHistory',
	'dsuHome',
	'dsuBoard',
	'dsuMembers',
	'dsuJoin',
	'dsuProjects',
	'dsuStandards',
	'cedsOverview',
	'educoreOverview',
	'educoreMilestones',
	'resourcesHub',
	'resourcesLibrary',
	'resourcesNewsletter',
	'resourcesGlossary',
	'resourcesFaq',
	'resourcesPress',
	'eventsUpcoming',
	'eventsPast',
	'contact'
] as const satisfies readonly RoutePageKey[];

export const siteSections: Record<SiteSectionKey, SiteSectionMeta> = {
	edu: { key: 'edu', label: 'EDU', homePageKey: 'eduHome', defaultOrder: 10 },
	dsu: { key: 'dsu', label: 'DSU', homePageKey: 'dsuHome', defaultOrder: 20 },
	ceds: { key: 'ceds', label: 'CEDS', homePageKey: 'cedsOverview', defaultOrder: 30 },
	educore: { key: 'educore', label: 'EDUcore', homePageKey: 'educoreOverview', defaultOrder: 40 },
	resources: { key: 'resources', label: 'Resources', homePageKey: 'resourcesHub', defaultOrder: 50 },
	events: { key: 'events', label: 'Events', homePageKey: 'eventsUpcoming', defaultOrder: 60 },
	contact: { key: 'contact', label: 'Contact', homePageKey: 'contact', defaultOrder: 70 }
};

export const routePages: Record<RoutePageKey, RoutePageMeta> = {
	eduHome: {
		key: 'eduHome',
		sectionKey: 'edu',
		label: 'Overview',
		path: '/edu',
		parentPath: '/edu',
		isSectionHome: true
	},
	eduBoard: {
		key: 'eduBoard',
		sectionKey: 'edu',
		label: 'Board',
		path: '/edu/board',
		parentPath: '/edu'
	},
	eduHistory: {
		key: 'eduHistory',
		sectionKey: 'edu',
		label: 'History',
		path: '/edu/history',
		parentPath: '/edu'
	},
	dsuHome: {
		key: 'dsuHome',
		sectionKey: 'dsu',
		label: 'Home',
		path: '/dsu',
		parentPath: '/dsu',
		isSectionHome: true
	},
	dsuBoard: {
		key: 'dsuBoard',
		sectionKey: 'dsu',
		label: 'Board',
		path: '/dsu/board',
		parentPath: '/dsu'
	},
	dsuMembers: {
		key: 'dsuMembers',
		sectionKey: 'dsu',
		label: 'Members',
		path: '/dsu/members',
		parentPath: '/dsu'
	},
	dsuJoin: {
		key: 'dsuJoin',
		sectionKey: 'dsu',
		label: 'Joining DSU',
		path: '/dsu/joining',
		parentPath: '/dsu'
	},
	dsuProjects: {
		key: 'dsuProjects',
		sectionKey: 'dsu',
		label: 'Projects',
		path: '/dsu/projects',
		parentPath: '/dsu'
	},
	dsuStandards: {
		key: 'dsuStandards',
		sectionKey: 'dsu',
		label: 'Standards',
		path: '/dsu/standards',
		parentPath: '/dsu'
	},
	cedsOverview: {
		key: 'cedsOverview',
		sectionKey: 'ceds',
		label: 'Overview',
		path: '/ceds',
		parentPath: '/ceds',
		isSectionHome: true
	},
	educoreOverview: {
		key: 'educoreOverview',
		sectionKey: 'educore',
		label: 'Overview',
		path: '/educore',
		parentPath: '/educore',
		isSectionHome: true
	},
	educoreMilestones: {
		key: 'educoreMilestones',
		sectionKey: 'educore',
		label: 'Milestones',
		path: '/educore/milestones',
		parentPath: '/educore'
	},
	resourcesHub: {
		key: 'resourcesHub',
		sectionKey: 'resources',
		label: 'Hub',
		path: '/resources',
		parentPath: '/resources',
		isSectionHome: true
	},
	resourcesLibrary: {
		key: 'resourcesLibrary',
		sectionKey: 'resources',
		label: 'Library',
		path: '/resources/library',
		parentPath: '/resources'
	},
	resourcesNewsletter: {
		key: 'resourcesNewsletter',
		sectionKey: 'resources',
		label: 'Newsletter',
		path: '/resources/newsletter',
		parentPath: '/resources'
	},
	resourcesGlossary: {
		key: 'resourcesGlossary',
		sectionKey: 'resources',
		label: 'Glossary',
		path: '/resources/glossary',
		parentPath: '/resources'
	},
	resourcesFaq: {
		key: 'resourcesFaq',
		sectionKey: 'resources',
		label: 'FAQ',
		path: '/resources/faq',
		parentPath: '/resources'
	},
	resourcesPress: {
		key: 'resourcesPress',
		sectionKey: 'resources',
		label: 'Press & charter',
		path: '/resources/press',
		parentPath: '/resources'
	},
	eventsUpcoming: {
		key: 'eventsUpcoming',
		sectionKey: 'events',
		label: 'Upcoming',
		path: '/events',
		parentPath: '/events',
		isSectionHome: true
	},
	eventsPast: {
		key: 'eventsPast',
		sectionKey: 'events',
		label: 'Past events',
		path: '/events/past',
		parentPath: '/events'
	},
	contact: {
		key: 'contact',
		sectionKey: 'contact',
		label: 'Contact',
		path: '/contact',
		parentPath: '/contact',
		isSectionHome: true
	}
};

export const routePagesByPath: Record<string, RoutePageMeta> = Object.fromEntries(
	routePageKeys.map((key) => [routePages[key].path, routePages[key]])
);

export function getRoutePage(key: RoutePageKey) {
	return routePages[key];
}

export function getSiteSection(key: SiteSectionKey) {
	return siteSections[key];
}

export function getSectionRoutePages(sectionKey: SiteSectionKey) {
	return routePageKeys.map((key) => routePages[key]).filter((page) => page.sectionKey === sectionKey);
}

export function getSectionHomeRoute(sectionKey: SiteSectionKey) {
	return getRoutePage(getSiteSection(sectionKey).homePageKey);
}
