import { getDsuHomePage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getDsuHomePage(), getSiteChrome()]);

	return { page, chrome, routeKey: 'dsuHome' as const };
}
