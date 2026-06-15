import { getResourcesNewsletterPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getResourcesNewsletterPage(), getSiteChrome()]);

	return { page, chrome };
}
