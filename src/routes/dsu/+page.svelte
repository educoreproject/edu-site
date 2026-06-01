<script lang="ts">
	import DsuHomePage from '../+page.svelte';
	import type { DsuHomePage as DsuHomePageContent, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: DsuHomePageContent;
			chrome: SiteChrome;
		};
	};

	let { data }: Props = $props();
</script>

<DsuHomePage {data} />
