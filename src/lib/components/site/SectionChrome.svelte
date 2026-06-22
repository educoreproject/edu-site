<script lang="ts">
	import type { RoutePageKey } from '$lib/content/route-metadata';
	import { getRoutePage } from '$lib/content/route-metadata';
	import type { SiteChrome } from '$lib/content/types';
	import PrimaryNav from './PrimaryNav.svelte';
	import SubNav from './SubNav.svelte';

	type Props = {
		chrome: SiteChrome;
		routeKey: RoutePageKey;
		logoHref?: string;
	};

	let { chrome, routeKey, logoHref = '/' }: Props = $props();
	let route = $derived(getRoutePage(routeKey));
	let activeSection = $derived(chrome.sections.find((section) => section.key === route.sectionKey));
	let activeChild = $derived(
		activeSection?.children.find((link) => link.pageKey === routeKey || link.href === route.path)
	);
</script>

<PrimaryNav chrome={chrome} activeSectionKey={route.sectionKey} activePageKey={routeKey} {logoHref} />

{#if activeSection?.children.length}
	<SubNav section={activeSection} activeHref={route.path} activeLabel={activeChild?.label ?? route.label} />
{/if}
