import { hasSanityConfig, sanityClient } from '$lib/sanity/client';
import {
	chromeQuery,
	cedsOverviewQuery,
	dsuHomeQuery,
	dsuJoinQuery,
	dsuMembersQuery,
	dsuProjectsQuery,
	eduBoardQuery,
	eduHistoryQuery,
	eduOverviewQuery,
	educoreOverviewQuery,
	eventsPastQuery,
	eventsUpcomingQuery,
	contactPageQuery,
	resourcesFaqQuery,
	resourcesGlossaryQuery,
	resourcesHubQuery,
	resourcesLibraryQuery,
	resourcesNewsletterQuery,
	resourcesPressQuery
} from './queries';
import { resolveDestination } from './destinations';
import { getRoutePage, getSiteSection } from './route-metadata';
import type { RoutePageKey, SiteSectionKey } from './route-metadata';
import type {
	Cta,
	DsuHomePage,
	DsuJoinPage,
	DsuMembersPage,
	DsuProjectsPage,
	EduBoardPage,
	EduHistoryPage,
	EduOverviewPage,
	EducoreOverviewPage,
	EventsPastPage,
	EventsUpcomingPage,
	ContactPage,
	CedsOverviewPage,
	HeroContent,
	InfoCard,
	MembershipType,
	ResourceCard,
	ResourcesFaqPage,
	ResourcesGlossaryPage,
	ResourcesHubPage,
	ResourcesLibraryPage,
	ResourcesNewsletterPage,
	ResourcesPressPage,
	SharedCtaContent,
	SiteChrome,
	SiteNavSection,
	LinkDestination,
	LinkItem
} from './types';

async function fetchFromSanity<T>(query: string, label: string): Promise<T> {
	if (!hasSanityConfig || !sanityClient) {
		throw new Error(
			`[content] Missing Sanity configuration for ${label}. Set PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET.`
		);
	}

	let result: T | null;

	try {
		result = await sanityClient.fetch<T | null>(query);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);

		throw new Error(`[content] Failed to fetch ${label} from Sanity: ${message}`);
	}

	if (!result) {
		throw new Error(`[content] Sanity returned no ${label}. Check that the required document exists.`);
	}

	return result;
}

type RawCta = Omit<Cta, keyof ReturnType<typeof resolveDestination>> & {
	destination?: Parameters<typeof resolveDestination>[0];
};

type RawHeroContent = Omit<HeroContent, 'ctas'> & {
	ctas?: RawCta[];
};

type RawResourceCard = Omit<ResourceCard, 'cta'> & {
	cta: RawCta;
};

type RawSharedCtaContent = Omit<SharedCtaContent, 'cta'> & {
	cta: RawCta;
};

type RawMembershipType = Omit<MembershipType, 'cta'> & {
	cta: RawCta;
};

type RawInfoCard = Omit<InfoCard, 'cta'> & {
	cta?: RawCta;
};

type RawNavItem = {
	label: string;
	disabled?: boolean;
	hidden?: boolean;
	destination?: LinkDestination;
};

type RawSitePage = {
	sectionKey: SiteSectionKey;
	routePageKey: RoutePageKey;
	navLabel?: string;
	disabled?: boolean;
	hidden?: boolean;
	sortOrder?: number;
	navigationItems?: RawNavItem[];
};

type RawPageContent<T extends { hero: HeroContent; ctas: SharedCtaContent[] }> = Omit<
	T,
	'hero' | 'ctas'
> & {
	hero: RawHeroContent;
	ctas: RawSharedCtaContent[];
};

function resolveCta(cta: RawCta): Cta {
	return {
		label: cta.label,
		variant: cta.variant,
		...resolveDestination(cta.destination)
	};
}

function resolveHero(hero: RawHeroContent): HeroContent {
	return {
		...hero,
		ctas: hero.ctas?.map(resolveCta) ?? []
	};
}

function resolveResourceCard(card: RawResourceCard): ResourceCard {
	return {
		...card,
		cta: resolveCta(card.cta)
	};
}

function resolveSharedCta(cta: RawSharedCtaContent): SharedCtaContent {
	return {
		...cta,
		cta: resolveCta(cta.cta)
	} as SharedCtaContent;
}

function resolveMembershipType(membershipType: RawMembershipType): MembershipType {
	return {
		...membershipType,
		cta: resolveCta(membershipType.cta)
	};
}

function resolveInfoCard(card: RawInfoCard): InfoCard {
	return {
		...card,
		cta: card.cta ? resolveCta(card.cta) : undefined
	};
}

function resolvePageContent<T extends { hero: HeroContent; ctas: SharedCtaContent[] }>(
	page: RawPageContent<T>
): T {
	return {
		...page,
		hero: resolveHero(page.hero),
		ctas: page.ctas.map(resolveSharedCta)
	} as T;
}

function normalizeNavItem(item: RawNavItem): LinkItem | null {
	if (item.hidden) {
		return null;
	}

	const resolved = resolveDestination(item.destination);

	if (!resolved.href && !item.disabled) {
		return null;
	}

	return {
		label: item.label,
		disabled: item.disabled,
		pageKey: item.destination?.pageKey,
		...resolved
	};
}

export function normalizeSiteChrome(rawPages: RawSitePage[]): SiteChrome {
	const sections = rawPages
		.filter((page) => !page.hidden)
		.map((page): SiteNavSection => {
			const route = getRoutePage(page.routePageKey);
			const section = getSiteSection(page.sectionKey);
			const children = (page.navigationItems ?? [])
				.map(normalizeNavItem)
				.filter((item): item is LinkItem => Boolean(item));

			return {
				key: page.sectionKey,
				pageKey: page.routePageKey,
				label: page.navLabel || section.label,
				disabled: page.disabled,
				href: route.path,
				children
			};
		});

	return {
		primaryNav: sections.map(({ children, key, pageKey, ...section }) => section),
		sections,
		footerColumns: sections.map((section) => ({
			heading: section.label,
			links: section.children
		}))
	};
}

export async function getSiteChrome(): Promise<SiteChrome> {
	const rawPages = await fetchFromSanity<RawSitePage[]>(chromeQuery, 'site pages navigation');

	if (!rawPages.length) {
		throw new Error('[content] Sanity returned no site page navigation documents.');
	}

	return normalizeSiteChrome(rawPages);
}

export async function getDsuHomePage(): Promise<DsuHomePage> {
	const page = await fetchFromSanity<RawPageContent<DsuHomePage>>(dsuHomeQuery, 'DSU home page');

	return resolvePageContent<DsuHomePage>(page);
}

export async function getDsuMembersPage(): Promise<DsuMembersPage> {
	const page = await fetchFromSanity<RawPageContent<DsuMembersPage>>(
		dsuMembersQuery,
		'DSU members page'
	);

	return resolvePageContent<DsuMembersPage>(page);
}

export async function getDsuJoinPage(): Promise<DsuJoinPage> {
	const page = await fetchFromSanity<
		RawPageContent<DsuJoinPage> & { membershipTypes: RawMembershipType[] }
	>(dsuJoinQuery, 'DSU join page');

	return {
		...resolvePageContent<DsuJoinPage>(page),
		membershipTypes: page.membershipTypes.map(resolveMembershipType)
	};
}

export async function getDsuProjectsPage(): Promise<DsuProjectsPage> {
	const page = await fetchFromSanity<RawPageContent<DsuProjectsPage>>(
		dsuProjectsQuery,
		'DSU projects page'
	);

	return resolvePageContent<DsuProjectsPage>(page);
}

export async function getCedsOverviewPage(): Promise<CedsOverviewPage> {
	const page = await fetchFromSanity<
		RawPageContent<CedsOverviewPage> & { learningLinks: RawResourceCard[] }
	>(cedsOverviewQuery, 'CEDS overview page');

	return {
		...resolvePageContent<CedsOverviewPage>(page),
		learningLinks: page.learningLinks.map(resolveResourceCard)
	};
}

export async function getResourcesHubPage(): Promise<ResourcesHubPage> {
	const page = await fetchFromSanity<
		RawPageContent<ResourcesHubPage> & { cards: RawResourceCard[] }
	>(resourcesHubQuery, 'Resources hub page');

	return {
		...resolvePageContent<ResourcesHubPage>(page),
		cards: page.cards.map(resolveResourceCard)
	};
}

export async function getResourcesLibraryPage(): Promise<ResourcesLibraryPage> {
	const page = await fetchFromSanity<RawPageContent<ResourcesLibraryPage>>(
		resourcesLibraryQuery,
		'Resources library page'
	);

	return resolvePageContent<ResourcesLibraryPage>(page);
}

export async function getResourcesPressPage(): Promise<ResourcesPressPage> {
	const page = await fetchFromSanity<RawPageContent<ResourcesPressPage>>(
		resourcesPressQuery,
		'Resources press page'
	);

	return resolvePageContent<ResourcesPressPage>(page);
}

export async function getResourcesNewsletterPage(): Promise<ResourcesNewsletterPage> {
	const page = await fetchFromSanity<RawPageContent<ResourcesNewsletterPage>>(
		resourcesNewsletterQuery,
		'Resources newsletter page'
	);

	return resolvePageContent<ResourcesNewsletterPage>(page);
}

export async function getResourcesGlossaryPage(): Promise<ResourcesGlossaryPage> {
	const page = await fetchFromSanity<RawPageContent<ResourcesGlossaryPage>>(
		resourcesGlossaryQuery,
		'Resources glossary page'
	);

	return resolvePageContent<ResourcesGlossaryPage>(page);
}

export async function getResourcesFaqPage(): Promise<ResourcesFaqPage> {
	const page = await fetchFromSanity<RawPageContent<ResourcesFaqPage>>(
		resourcesFaqQuery,
		'Resources FAQ page'
	);

	return resolvePageContent<ResourcesFaqPage>(page);
}

export async function getEventsUpcomingPage(): Promise<EventsUpcomingPage> {
	const page = await fetchFromSanity<RawPageContent<EventsUpcomingPage>>(
		eventsUpcomingQuery,
		'Events upcoming page'
	);

	return resolvePageContent<EventsUpcomingPage>(page);
}

export async function getEventsPastPage(): Promise<EventsPastPage> {
	const page = await fetchFromSanity<RawPageContent<EventsPastPage>>(
		eventsPastQuery,
		'Events past page'
	);

	return resolvePageContent<EventsPastPage>(page);
}

export async function getEduOverviewPage(): Promise<EduOverviewPage> {
	const page = await fetchFromSanity<RawPageContent<EduOverviewPage>>(
		eduOverviewQuery,
		'EDU overview page'
	);

	return resolvePageContent<EduOverviewPage>(page);
}

export async function getEduBoardPage(): Promise<EduBoardPage> {
	const page = await fetchFromSanity<RawPageContent<EduBoardPage>>(
		eduBoardQuery,
		'EDU board page'
	);

	return resolvePageContent<EduBoardPage>(page);
}

export async function getEduHistoryPage(): Promise<EduHistoryPage> {
	const page = await fetchFromSanity<RawPageContent<EduHistoryPage>>(
		eduHistoryQuery,
		'EDU history page'
	);

	return resolvePageContent<EduHistoryPage>(page);
}

export async function getContactPage(): Promise<ContactPage> {
	const page = await fetchFromSanity<
		RawPageContent<ContactPage> & {
			directCard: RawInfoCard;
			collaborativeCard: RawInfoCard;
		}
	>(contactPageQuery, 'contact page');

	return {
		...resolvePageContent<ContactPage>(page),
		directCard: resolveInfoCard(page.directCard),
		collaborativeCard: resolveInfoCard(page.collaborativeCard)
	};
}

export async function getEducoreOverviewPage(): Promise<EducoreOverviewPage> {
	const page = await fetchFromSanity<RawPageContent<EducoreOverviewPage>>(
		educoreOverviewQuery,
		'EDUcore overview page'
	);

	return resolvePageContent<EducoreOverviewPage>(page);
}
