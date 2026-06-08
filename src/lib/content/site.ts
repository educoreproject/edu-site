import { hasSanityConfig, sanityClient } from '$lib/sanity/client';
import {
	chromeQuery,
	dsuHomeQuery,
	dsuJoinQuery,
	dsuMembersQuery,
	dsuProjectsQuery,
	eduBoardQuery,
	eduContactQuery,
	eduHistoryQuery,
	eduOverviewQuery,
	educoreOverviewQuery,
	eventsPastQuery,
	eventsUpcomingQuery,
	resourcesFaqQuery,
	resourcesGlossaryQuery,
	resourcesHubQuery
} from './queries';
import type {
	DsuHomePage,
	DsuJoinPage,
	DsuMembersPage,
	DsuProjectsPage,
	EduBoardPage,
	EduContactPage,
	EduHistoryPage,
	EduOverviewPage,
	EducoreOverviewPage,
	EventsPastPage,
	EventsUpcomingPage,
	ResourcesFaqPage,
	ResourcesGlossaryPage,
	ResourcesHubPage,
	SiteChrome
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

export function getSiteChrome(): Promise<SiteChrome> {
	return fetchFromSanity<SiteChrome>(chromeQuery, 'site chrome');
}

export function getDsuHomePage(): Promise<DsuHomePage> {
	return fetchFromSanity<DsuHomePage>(dsuHomeQuery, 'DSU home page');
}

export function getDsuMembersPage(): Promise<DsuMembersPage> {
	return fetchFromSanity<DsuMembersPage>(dsuMembersQuery, 'DSU members page');
}

export function getDsuJoinPage(): Promise<DsuJoinPage> {
	return fetchFromSanity<DsuJoinPage>(dsuJoinQuery, 'DSU join page');
}

export function getDsuProjectsPage(): Promise<DsuProjectsPage> {
	return fetchFromSanity<DsuProjectsPage>(dsuProjectsQuery, 'DSU projects page');
}

export function getResourcesHubPage(): Promise<ResourcesHubPage> {
	return fetchFromSanity<ResourcesHubPage>(resourcesHubQuery, 'Resources hub page');
}

export function getResourcesGlossaryPage(): Promise<ResourcesGlossaryPage> {
	return fetchFromSanity<ResourcesGlossaryPage>(resourcesGlossaryQuery, 'Resources glossary page');
}

export function getResourcesFaqPage(): Promise<ResourcesFaqPage> {
	return fetchFromSanity<ResourcesFaqPage>(resourcesFaqQuery, 'Resources FAQ page');
}

export function getEventsUpcomingPage(): Promise<EventsUpcomingPage> {
	return fetchFromSanity<EventsUpcomingPage>(eventsUpcomingQuery, 'Events upcoming page');
}

export function getEventsPastPage(): Promise<EventsPastPage> {
	return fetchFromSanity<EventsPastPage>(eventsPastQuery, 'Events past page');
}

export function getEduOverviewPage(): Promise<EduOverviewPage> {
	return fetchFromSanity<EduOverviewPage>(eduOverviewQuery, 'EDU overview page');
}

export function getEduBoardPage(): Promise<EduBoardPage> {
	return fetchFromSanity<EduBoardPage>(eduBoardQuery, 'EDU board page');
}

export function getEduHistoryPage(): Promise<EduHistoryPage> {
	return fetchFromSanity<EduHistoryPage>(eduHistoryQuery, 'EDU history page');
}

export function getEduContactPage(): Promise<EduContactPage> {
	return fetchFromSanity<EduContactPage>(eduContactQuery, 'EDU contact page');
}

export function getEducoreOverviewPage(): Promise<EducoreOverviewPage> {
	return fetchFromSanity<EducoreOverviewPage>(educoreOverviewQuery, 'EDUcore overview page');
}
