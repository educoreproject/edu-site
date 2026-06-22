import { getEduHistoryPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getEduHistoryPage(), getSiteChrome()]);

	return { page, chrome, routeKey: 'eduHistory' as const };
}
