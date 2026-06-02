import { dev } from '$app/environment';
import { hasSanityConfig, sanityClient } from '$lib/sanity/client';
import {
	fallbackChrome,
	fallbackDsuHome,
	fallbackDsuJoin,
	fallbackDsuMembers,
	fallbackDsuProjects,
	fallbackEduBoard,
	fallbackEduContact,
	fallbackEduHistory,
	fallbackEduOverview
} from './fallback';
import {
	chromeQuery,
	dsuHomeQuery,
	dsuJoinQuery,
	dsuMembersQuery,
	dsuProjectsQuery,
	eduBoardQuery,
	eduContactQuery,
	eduHistoryQuery,
	eduOverviewQuery
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
	SiteChrome
} from './types';

async function fetchFromSanity<T>(query: string, fallback: T, label: string): Promise<T> {
	if (!hasSanityConfig || !sanityClient) {
		if (dev) {
			console.info(`[content] Missing Sanity configuration for ${label}; using fallback content.`);
		}

		return fallback;
	}

	try {
		const result = await sanityClient.fetch<T | null>(query);

		if (!result) {
			if (dev) {
				console.warn(`[content] Sanity returned no ${label}; using fallback content.`);
			}

			return fallback;
		}

		return result;
	} catch (error) {
		if (dev) {
			console.error(`[content] Failed to fetch ${label} from Sanity; using fallback content.`, error);
		}

		return fallback;
	}
}

export function getSiteChrome(): Promise<SiteChrome> {
	return fetchFromSanity<SiteChrome>(chromeQuery, fallbackChrome, 'site chrome');
}

export function getDsuHomePage(): Promise<DsuHomePage> {
	return fetchFromSanity<DsuHomePage>(dsuHomeQuery, fallbackDsuHome, 'DSU home page');
}

export function getDsuMembersPage(): Promise<DsuMembersPage> {
	return fetchFromSanity<DsuMembersPage>(
		dsuMembersQuery,
		fallbackDsuMembers,
		'DSU members page'
	);
}

export function getDsuJoinPage(): Promise<DsuJoinPage> {
	return fetchFromSanity<DsuJoinPage>(dsuJoinQuery, fallbackDsuJoin, 'DSU join page');
}

export function getDsuProjectsPage(): Promise<DsuProjectsPage> {
	return fetchFromSanity<DsuProjectsPage>(
		dsuProjectsQuery,
		fallbackDsuProjects,
		'DSU projects page'
	);
}

export function getEduOverviewPage(): Promise<EduOverviewPage> {
	return fetchFromSanity<EduOverviewPage>(
		eduOverviewQuery,
		fallbackEduOverview,
		'EDU overview page'
	);
}

export function getEduBoardPage(): Promise<EduBoardPage> {
	return fetchFromSanity<EduBoardPage>(eduBoardQuery, fallbackEduBoard, 'EDU board page');
}

export function getEduHistoryPage(): Promise<EduHistoryPage> {
	return fetchFromSanity<EduHistoryPage>(
		eduHistoryQuery,
		fallbackEduHistory,
		'EDU history page'
	);
}

export function getEduContactPage(): Promise<EduContactPage> {
	return fetchFromSanity<EduContactPage>(
		eduContactQuery,
		fallbackEduContact,
		'EDU contact page'
	);
}
