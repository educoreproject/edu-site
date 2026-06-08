<script lang="ts">
	import Button from '$lib/components/site/Button.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { DsuProject, DsuProjectsPage, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: DsuProjectsPage;
			chrome: SiteChrome;
		};
	};

	let { data }: Props = $props();
	let page = $derived(data.page);
	let chrome = $derived(data.chrome);

	function getLogoLabel(project: DsuProject) {
		return project.logoLabel ?? project.tag.slice(0, 4).toUpperCase();
	}
</script>

<svelte:head>
	<title>{page.hero.title}</title>
	<meta name="description" content={page.hero.description} />
</svelte:head>

<PrimaryNav links={chrome.primaryNav} footerColumns={chrome.footerColumns} activeSection={page.activeSection} activeSubSection="Projects" />
<SubNav crumb={page.activeSection} links={page.subNav} active="Projects" />

<main>
	<Hero content={page.hero} compact />

	<section class="section section-padded projects" aria-labelledby="projects-heading">
		<Container>
			<div class="section-header">
				<p class="eyebrow">Projects</p>
				<h2 id="projects-heading">DSU supported initiatives</h2>
			</div>

			<div class="project-grid">
				{#each page.projects as project}
					<a class="project-card" href={project.href}>
						<div
							class="logo-mark"
							style={`--logo-color: ${project.logoColor ?? 'var(--ec-navy)'}`}
							aria-hidden="true"
						>
							{getLogoLabel(project)}
						</div>

						<div class="project-body">
							<span class="tag">{project.tag}</span>
							<h3>{project.title}</h3>
							<p>{project.category}</p>
						</div>

						<span class="arrow" aria-hidden="true">→</span>
					</a>
				{/each}
			</div>
		</Container>
	</section>

	<section class="join-cta" aria-labelledby="join-cta-heading">
		<Container>
			<div class="join-panel">
				<div>
					<p class="eyebrow">Join DSU</p>
					<h2 id="join-cta-heading">{page.joinCta.heading}</h2>
					<p>{page.joinCta.description}</p>
				</div>

				<Button
					href={page.joinCta.cta.href}
					label={page.joinCta.cta.label}
					variant={page.joinCta.cta.variant}
					onDark
				/>
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

	.eyebrow {
		color: var(--ec-teal-dark);
		font-family: var(--ec-font-sans);
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0;
		line-height: 1.2;
		margin: 0 0 0.625rem;
		text-transform: uppercase;
	}

	h2,
	h3,
	p,
	span {
		font-family: var(--ec-font-sans);
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
		font-size: 1rem;
		line-height: 1.58;
		margin: 0;
	}

	.project-grid {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin-top: 2rem;
	}

	.project-card {
		align-items: start;
		background: var(--ec-white);
		border: 2px solid color-mix(in srgb, var(--ec-gold) 70%, var(--ec-border-soft));
		border-radius: 8px;
		color: inherit;
		display: grid;
		gap: 1rem;
		grid-template-columns: auto minmax(0, 1fr) auto;
		min-width: 0;
		padding: 1.25rem;
		text-decoration: none;
		transition:
			border-color 120ms ease,
			box-shadow 120ms ease,
			transform 120ms ease;
	}

	.project-card:hover {
		border-color: var(--ec-gold);
		box-shadow: 0 1rem 2rem rgba(12, 23, 29, 0.08);
		transform: translateY(-1px);
	}

	.project-card:active {
		box-shadow: none;
		transform: translateY(1px);
	}

	.logo-mark {
		align-items: center;
		background: var(--logo-color);
		border-radius: 4px;
		color: var(--ec-white);
		display: inline-flex;
		font-size: 0.6875rem;
		font-weight: 700;
		height: 3.25rem;
		justify-content: center;
		letter-spacing: 0;
		line-height: 1;
		padding-inline: 0.25rem;
		text-align: center;
		width: 3.25rem;
	}

	.project-body {
		display: grid;
		gap: 0.375rem;
		min-width: 0;
	}

	.tag {
		color: var(--ec-teal-dark);
		font-size: 0.8125rem;
		font-weight: 700;
		line-height: 1.25;
		overflow-wrap: anywhere;
	}

	.project-body p {
		font-size: 0.875rem;
		line-height: 1.4;
		overflow-wrap: anywhere;
	}

	.arrow {
		color: var(--ec-navy);
		font-size: 1.125rem;
		font-weight: 700;
		line-height: 1;
		margin-top: 0.125rem;
	}

	.join-cta {
		background: var(--ec-navy);
		padding-block: 3.5rem;
	}

	.join-panel {
		align-items: center;
		display: grid;
		gap: 2rem;
		grid-template-columns: minmax(0, 1fr) auto;
	}

	.join-panel .eyebrow {
		color: var(--ec-teal-soft);
	}

	.join-panel h2,
	.join-panel p {
		color: var(--ec-white);
	}

	.join-panel p:not(.eyebrow) {
		color: rgba(255, 255, 255, 0.86);
		margin-top: 0.75rem;
		max-width: 43rem;
	}

	@media (max-width: 760px) {
		.section-padded,
		.join-cta {
			padding-block: 3rem;
		}

		.project-grid,
		.join-panel {
			grid-template-columns: 1fr;
		}

		.project-grid {
			margin-top: 1.5rem;
		}

		.join-panel {
			align-items: start;
		}
	}

	@media (max-width: 420px) {
		.project-card {
			grid-template-columns: 1fr auto;
			padding: 1.125rem;
		}

		.logo-mark {
			grid-column: 1;
		}

		.project-body {
			grid-column: 1 / -1;
			grid-row: 2;
		}

		.arrow {
			grid-column: 2;
			grid-row: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.project-card {
			transition: none;
		}
	}
</style>
