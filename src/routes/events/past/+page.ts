import { getEventsPastPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getEventsPastPage(), getSiteChrome()]);

	return { page, chrome, routeKey: 'eventsPast' as const };
}
