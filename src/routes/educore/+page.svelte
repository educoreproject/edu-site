<script lang="ts">
	import Button from '$lib/components/site/Button.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { EducoreOverviewPage, PlatformTool, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: EducoreOverviewPage;
			chrome: SiteChrome;
		};
	};

	let { data }: Props = $props();
	let page = $derived(data.page);
	let chrome = $derived(data.chrome);

	function getToolInitial(tool: PlatformTool) {
		return tool.name.slice(0, 1).toUpperCase();
	}
</script>

<svelte:head>
	<title>{page.hero.title}</title>
	<meta
		name="description"
		content={page.hero.description ?? 'EDUcore tools for education data standards.'}
	/>
</svelte:head>

<PrimaryNav links={chrome.primaryNav} footerColumns={chrome.footerColumns} activeSection={page.activeSection} activeSubSection="Overview" />
<SubNav crumb="EDUcore" links={page.subNav} active="Overview" />

<main>
	<Hero content={page.hero} background="violet" />

	<section class="section platform" aria-labelledby="platform-heading">
		<Container>
			<div class="section-header">
				<p class="eyebrow">{page.platform.eyebrow}</p>
				<h2 id="platform-heading">{page.platform.heading}</h2>
				<p>{page.platform.description}</p>
			</div>

			<div class="tool-grid">
				{#each page.platform.tools as tool}
					{@const isExploreDisabled = !tool.href || tool.href === '#'}
					<article class="tool-card">
						<div class="icon-chip" aria-hidden="true">{getToolInitial(tool)}</div>
						<p class="tool-tag">{tool.tag}</p>
						<h3>{tool.name}</h3>
						<p>{tool.description}</p>
						{#if isExploreDisabled}
							<span class="tool-link disabled" aria-disabled="true">Explore {tool.name}</span>
						{:else}
							<a class="tool-link" href={tool.href}>Explore {tool.name}</a>
						{/if}
					</article>
				{/each}
			</div>
		</Container>
	</section>

	<section class="cta-band" aria-labelledby="educore-cta-heading">
		<Container>
			<div class="cta-inner">
				<div class="cta-copy">
					<h2 id="educore-cta-heading">{page.ctaBand.heading}</h2>
					<p>{page.ctaBand.description}</p>
				</div>

				<Button
					href={page.ctaBand.cta.href}
					label={page.ctaBand.cta.label}
					variant="teal"
					onDark
					disabled={!page.ctaBand.cta.href || page.ctaBand.cta.href === '#'}
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

	.platform {
		padding-block: 4.5rem;
	}

	.section-header {
		display: grid;
		gap: 0.875rem;
		max-width: 45rem;
	}

	.eyebrow,
	.tool-tag,
	h2,
	h3,
	p,
	a,
	span {
		font-family: var(--ec-font-sans);
	}

	.eyebrow,
	.tool-tag {
		color: var(--ec-violet);
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0;
		line-height: 1.2;
		margin: 0;
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
		font-size: 1.3125rem;
		line-height: 1.25;
		margin: 0;
		text-wrap: pretty;
	}

	p {
		color: var(--ec-ink-soft);
		font-size: 1rem;
		line-height: 1.6;
		margin: 0;
	}

	.tool-grid {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		margin-top: 2.75rem;
	}

	.tool-card {
		background: var(--ec-white);
		border: 1px solid var(--ec-border-soft);
		border-radius: 8px;
		box-shadow: 0 8px 28px rgba(43, 51, 181, 0.06);
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
		min-height: 18rem;
		min-width: 0;
		padding: 1.75rem;
	}

	.icon-chip {
		align-items: center;
		background: color-mix(in srgb, var(--ec-violet) 10%, transparent);
		border-radius: 8px;
		color: var(--ec-violet);
		display: inline-flex;
		font-size: 1.25rem;
		font-weight: 700;
		height: 2.75rem;
		justify-content: center;
		line-height: 1;
		margin-bottom: 0.25rem;
		width: 2.75rem;
	}

	.tool-link {
		align-self: flex-start;
		color: var(--ec-link);
		font-size: 0.9375rem;
		font-weight: 700;
		line-height: 1.4;
		margin-top: auto;
		text-decoration-thickness: 0.125rem;
		text-underline-offset: 0.1875rem;
	}

	.tool-link.disabled {
		color: var(--ec-ink-soft);
		cursor: not-allowed;
		opacity: 0.72;
		text-decoration: none;
	}

	.cta-band {
		background: var(--ec-violet);
		padding-block: 3.5rem;
	}

	.cta-inner {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		gap: 2.5rem;
		justify-content: space-between;
	}

	.cta-copy {
		display: grid;
		gap: 0.625rem;
		max-width: 40rem;
		min-width: 0;
	}

	.cta-band h2,
	.cta-band p {
		color: var(--ec-white);
	}

	.cta-band h2 {
		font-size: clamp(1.75rem, 3vw, 2rem);
	}

	.cta-band p {
		color: rgba(255, 255, 255, 0.86);
	}

	@media (max-width: 760px) {
		.platform {
			padding-block: 3rem;
		}

		.tool-grid {
			grid-template-columns: 1fr;
			margin-top: 2rem;
		}

		.cta-inner {
			align-items: stretch;
			flex-direction: column;
			gap: 1.5rem;
		}
	}

	@media (max-width: 420px) {
		.tool-card {
			padding: 1.125rem;
		}
	}
</style>
