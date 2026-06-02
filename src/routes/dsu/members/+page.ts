import { getDsuMembersPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getDsuMembersPage(), getSiteChrome()]);

	return { page, chrome };
}
