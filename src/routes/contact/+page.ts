import { getContactPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getContactPage(), getSiteChrome()]);

	return { page, chrome, routeKey: 'contact' as const };
}
