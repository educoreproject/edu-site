import { getResourcesHubPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getResourcesHubPage(), getSiteChrome()]);

	return { page, chrome, routeKey: 'resourcesHub' as const };
}
