import { getSearchResults, normalizeKeyword } from '$lib/content/search';
import { getSiteChrome } from '$lib/content/site';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const keyword = normalizeKeyword(url.searchParams.get('keyword') ?? '');
	const [chrome, results] = await Promise.all([getSiteChrome(), getSearchResults(keyword)]);

	return {
		chrome,
		keyword,
		results,
		hasSearched: Boolean(keyword)
	};
};
