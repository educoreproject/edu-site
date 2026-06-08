import { getEduOverviewPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getEduOverviewPage(), getSiteChrome()]);

	return { page, chrome };
}
