import { getEduBoardPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getEduBoardPage(), getSiteChrome()]);

	return { page, chrome, routeKey: 'eduBoard' as const };
}
