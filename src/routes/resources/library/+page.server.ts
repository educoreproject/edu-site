import { getResourcesLibraryPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getResourcesLibraryPage(), getSiteChrome()]);

	return { page, chrome };
}
