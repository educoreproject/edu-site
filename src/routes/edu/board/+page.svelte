<script lang="ts">
	import Card from '$lib/components/site/Card.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
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
</main>

<PageFooter {chrome} />

<style>
	main {
		background: var(--ec-white);
		overflow-x: clip;
	}

	.section {
		position: relative;
	}

	.section-padded {
		padding-block: 4rem;
	}

	.section-header {
		max-width: 46rem;
	}

	.eyebrow,
	h2,
	p {
		font-family: var(--ec-font-sans);
	}

	.eyebrow {
		color: var(--ec-teal-dark);
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0;
		line-height: 1.2;
		margin: 0 0 0.625rem;
		text-transform: uppercase;
	}

	h2 {
		color: var(--ec-navy);
		font-size: clamp(1.875rem, 4vw, 2.5rem);
		line-height: 1.16;
		margin: 0;
		text-wrap: pretty;
	}

	p {
		color: var(--ec-ink-soft);
		font-size: 0.9375rem;
		line-height: 1.5;
		margin: 0;
	}

	.board-grid {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin-top: 2rem;
	}

	@media (max-width: 760px) {
		.section-padded {
			padding-block: 3rem;
		}

		.board-grid {
			grid-template-columns: 1fr;
			margin-top: 1.5rem;
		}
	}
</style>
