<script lang="ts">
	import type { HeroContent, Seo, SiteChrome } from '$lib/content/types';

	type Props = {
		/** Per-page SEO overrides from Sanity. */
		seo?: Seo;
		/** Page hero, used for title/description fallbacks. */
		hero?: HeroContent;
		/** Site chrome, used for the default share image. */
		chrome?: SiteChrome;
	};

	let { seo, hero, chrome }: Props = $props();

	const SITE_NAME = 'Data Standards United';
	const SITE_DESCRIPTION =
		'The coordinating body for global education, employment, and training data standards.';
	const NAVY = '142b45';

	// Fallback chain: SEO override -> page hero -> site default.
	let title = $derived(seo?.metaTitle || hero?.title || SITE_NAME);
	let description = $derived(seo?.metaDescription || hero?.description || SITE_DESCRIPTION);

	// A page-set share image is cropped to 1200×630; the site-default logo is padded
	// onto a navy card so the whole mark shows.
	let ogImage = $derived.by(() => {
		if (seo?.ogImage?.url) {
			return `${seo.ogImage.url}?w=1200&h=630&fit=crop&auto=format`;
		}
		if (chrome?.defaultLogo?.url) {
			return `${chrome.defaultLogo.url}?w=1200&h=630&fit=fillmax&bg=${NAVY}&auto=format`;
		}
		return undefined;
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	{#if ogImage}
		<meta property="og:image" content={ogImage} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta name="twitter:image" content={ogImage} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	{#if seo?.noIndex}
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>
