import { getDsuProjectsPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getDsuProjectsPage(), getSiteChrome()]);

	return { page, chrome, routeKey: 'dsuProjects' as const };
}
