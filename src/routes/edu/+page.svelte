<script lang="ts">
	import EduOverviewPage from '$lib/components/pages/EduOverviewPage.svelte';

	type Props = {
		data: {
			page: import('$lib/content/types').EduOverviewPage;
			chrome: import('$lib/content/types').SiteChrome;
			routeKey: 'eduHome';
		};
	};

	let { data }: Props = $props();
</script>

<EduOverviewPage page={data.page} chrome={data.chrome} />
