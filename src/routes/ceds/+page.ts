import { getCedsOverviewPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getCedsOverviewPage(), getSiteChrome()]);

	return { page, chrome };
}
