import { getDsuJoinPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getDsuJoinPage(), getSiteChrome()]);

	return { page, chrome, routeKey: 'dsuJoin' as const };
}
