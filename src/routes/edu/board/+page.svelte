<script lang="ts">
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
					<article class="member-card">
						<p class="role">{member.role}</p>
						<h3>{member.name}</h3>
						{#if member.organization}
							<p>{member.organization}</p>
						{/if}
						{#if member.email}
							<a href={`mailto:${member.email}`}>{member.email}</a>
						{/if}
					</article>
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
	.role,
	h2,
	h3,
	p,
	a {
		font-family: var(--ec-font-sans);
	}

	.eyebrow,
	.role {
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

	h3 {
		color: var(--ec-navy);
		font-size: 1.125rem;
		line-height: 1.3;
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

	.member-card {
		background: var(--ec-white);
		border: 1px solid var(--ec-border-soft);
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		min-width: 0;
		padding: 1.5rem;
	}

	.member-card a {
		font-size: 0.9375rem;
		line-height: 1.4;
		overflow-wrap: anywhere;
		text-decoration: none;
	}

	.member-card a:hover {
		text-decoration: underline;
		text-underline-offset: 0.1875rem;
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

	@media (max-width: 420px) {
		.member-card {
			padding: 1.125rem;
		}
	}
</style>
