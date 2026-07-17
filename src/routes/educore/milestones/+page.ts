import { getTimelinePage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getTimelinePage(), getSiteChrome()]);

	return { page, chrome, routeKey: 'educoreMilestones' as const };
}
