import { getEduContactPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getEduContactPage(), getSiteChrome()]);

	return { page, chrome };
}
