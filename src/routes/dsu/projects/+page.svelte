<script lang="ts">
	import Card from '$lib/components/site/Card.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import JoinCta from '$lib/components/site/JoinCta.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { DsuProject, DsuProjectsPage, SectionHeader, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: DsuProjectsPage;
			chrome: SiteChrome;
		};
	};

	let { data }: Props = $props();
	let page = $derived(data.page);
	let chrome = $derived(data.chrome);

	function getLogoImage(project: DsuProject) {
		if (!project.logoImage?.url) {
			return undefined;
		}

		return {
			src: project.logoImage.url,
			alt: project.logoImage.alt || project.title
		};
	}
</script>

{#snippet richText(blocks: SectionHeader['body'])}
	{#each blocks ?? [] as block}
		{#if block._type === 'block'}
			<p>
				{#each block.children ?? [] as span}
					{@const isStrong = span.marks?.includes('strong')}
					{@const isEm = span.marks?.includes('em')}
					{#if isStrong && isEm}
						<strong><em>{span.text}</em></strong>
					{:else if isStrong}
						<strong>{span.text}</strong>
					{:else if isEm}
						<em>{span.text}</em>
					{:else}
						{span.text}
					{/if}
				{/each}
			</p>
		{/if}
	{/each}
{/snippet}

{#snippet sectionHeader(header: SectionHeader, headingId: string)}
	<div class="section-header">
		{#if header.eyebrow}
			<p class="eyebrow">{header.eyebrow}</p>
		{/if}
		{#if header.heading}
			<h2 id={headingId}>{header.heading}</h2>
		{/if}
		{@render richText(header.body)}
	</div>
{/snippet}

<svelte:head>
	<title>{page.hero.title}</title>
	<meta name="description" content={page.hero.description} />
</svelte:head>

<PrimaryNav links={chrome.primaryNav} footerColumns={chrome.footerColumns} activeSection={page.activeSection} activeSubSection="Projects" />
<SubNav crumb={page.activeSection} links={page.subNav} active="Projects" />

<main>
	<Hero content={page.hero} compact />

	<section class="section section-padded projects bg-surface" aria-labelledby={page.projectsHeader.heading ? 'projects-heading' : undefined}>
		<Container width="wide">
			{@render sectionHeader(page.projectsHeader, 'projects-heading')}

			<div class="card-grid">
				{#each page.projects as project}
					<Card
						as="a"
						href={project.href}
						variant="plain"
						tone="gold"
						title={project.title}
						body={project.category}
						linkLabel="Learn more"
						image={getLogoImage(project)}
					/>
				{/each}
			</div>
		</Container>
	</section>

	<JoinCta content={page.joinCta} />
</main>

<PageFooter {chrome} />


