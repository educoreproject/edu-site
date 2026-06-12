import { getResourcesFaqPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getResourcesFaqPage(), getSiteChrome()]);

	return { page, chrome };
}
