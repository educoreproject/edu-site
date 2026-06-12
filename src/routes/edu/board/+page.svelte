<script lang="ts">
	import Card from '$lib/components/site/Card.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PageCtas from '$lib/components/site/PageCtas.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { EduBoardPage, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: EduBoardPage;
			chrome: SiteChrome;
		};
	};

	let { data }: Props = $props();
	let page = $derived(data.page);
	let chrome = $derived(data.chrome);
</script>

<svelte:head>
	<title>{page.hero.title}</title>
	<meta
		name="description"
		content={page.hero.description ?? 'Education Data Unlimited board of directors.'}
	/>
</svelte:head>

<PrimaryNav links={chrome.primaryNav} footerColumns={chrome.footerColumns} activeSection={page.activeSection} activeSubSection="Board" />
<SubNav crumb="EDU" links={page.subNav} active="Board" />

<main>
	<Hero content={page.hero} compact />

	<section class="section section-padded" aria-labelledby="board-heading">
		<Container>
			<div class="section-header">
				<p class="eyebrow">{page.hero.chip}</p>
				<h2 id="board-heading">{page.hero.title}</h2>
			</div>

			<div class="board-grid">
				{#each page.members as member}
					<Card
						variant="person"
						tone="gold"
						eyebrow={member.role}
						title={member.name}
						body={member.organization}
						email={member.email}
					/>
				{/each}
			</div>
		</Container>
	</section>

	<PageCtas ctas={page.ctas} />
</main>

<PageFooter {chrome} />

<style>
	.board-grid {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin-top: 2rem;
	}

	@media (max-width: 760px) {
		.board-grid {
			grid-template-columns: 1fr;
			margin-top: 1.5rem;
		}
	}
</style>
