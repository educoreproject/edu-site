import { getDsuStandardsPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getDsuStandardsPage(), getSiteChrome()]);

	return { page, chrome, routeKey: 'dsuStandards' as const };
}
