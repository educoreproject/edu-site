import { getEducoreOverviewPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getEducoreOverviewPage(), getSiteChrome()]);

	return { page, chrome, routeKey: 'educoreOverview' as const };
}
