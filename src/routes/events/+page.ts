import { getEventsUpcomingPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getEventsUpcomingPage(), getSiteChrome()]);

	return { page, chrome, routeKey: 'eventsUpcoming' as const };
}
