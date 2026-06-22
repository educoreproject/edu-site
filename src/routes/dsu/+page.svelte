<script lang="ts">
	import DsuOverviewPage from '$lib/components/pages/DsuOverviewPage.svelte';

	type Props = {
		data: {
			page: import('$lib/content/types').DsuHomePage;
			chrome: import('$lib/content/types').SiteChrome;
			routeKey: 'dsuHome';
		};
	};

	let { data }: Props = $props();
</script>

<DsuOverviewPage page={data.page} chrome={data.chrome} />
