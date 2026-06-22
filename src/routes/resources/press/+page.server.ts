import { getResourcesPressPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getResourcesPressPage(), getSiteChrome()]);

	return { page, chrome, routeKey: 'resourcesPress' as const };
}
