import { dev } from '$app/environment';
import { hasSanityConfig, sanityClient } from '$lib/sanity/client';
import { fallbackChrome, fallbackDsuHome, fallbackDsuMembers } from './fallback';
import { chromeQuery, dsuHomeQuery, dsuMembersQuery } from './queries';
import type { DsuHomePage, DsuMembersPage, SiteChrome } from './types';

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
