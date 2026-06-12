import { getResourcesGlossaryPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getResourcesGlossaryPage(), getSiteChrome()]);

	return { page, chrome };
}
