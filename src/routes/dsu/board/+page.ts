import { getDsuBoardPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getDsuBoardPage(), getSiteChrome()]);

	return { page, chrome, routeKey: 'dsuBoard' as const };
}
