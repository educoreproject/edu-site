<script lang="ts">
	import Button from '$lib/components/site/Button.svelte';
	import Card from '$lib/components/site/Card.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { DsuMembersPage, MemberOrganization, SectionHeader, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: DsuMembersPage;
			chrome: SiteChrome;
		};
	};

	let { data }: Props = $props();
	let page = $derived(data.page);
	let chrome = $derived(data.chrome);

	function getExternalHref(url: string) {
		return /^https?:\/\//i.test(url) ? url : `https://${url}`;
	}

	function getLogoLabel(member: MemberOrganization) {
		return member.logoLabel ?? member.name.slice(0, 2).toUpperCase();
	}

	function getLogoImage(member: MemberOrganization) {
		if (!member.logoImage?.url) {
			return undefined;
		}

		return {
			src: member.logoImage.url,
			alt: member.logoImage.alt || member.name
		};
	}

	function getVimeoEmbedSrc(value?: string) {
		if (!value) {
			return null;
		}

		const iframeSrc = value.match(/<iframe[^>]+src=["']([^"']+)["']/i)?.[1];
		const candidate = iframeSrc ?? value.trim();

		try {
			const url = new URL(candidate);

			if (url.hostname === 'player.vimeo.com' && url.pathname.startsWith('/video/')) {
				return url.toString();
			}

			if (url.hostname === 'vimeo.com') {
				const videoId = url.pathname.match(/^\/(\d+)/)?.[1];

				if (!videoId) {
					return null;
				}

				const embedUrl = new URL(`https://player.vimeo.com/video/${videoId}`);
				const hash = url.searchParams.get('h');

				if (hash) {
					embedUrl.searchParams.set('h', hash);
				}

				return embedUrl.toString();
			}
		} catch {
			return null;
		}

		return null;
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

{#snippet sectionHeader(header: SectionHeader, headingId: string, dark = false)}
	<div class="section-header" class:section-header-dark={dark}>
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
	<meta
		name="description"
		content={page.hero.description ?? 'DSU member organizations and testimonials.'}
	/>
</svelte:head>

<PrimaryNav links={chrome.primaryNav} footerColumns={chrome.footerColumns} activeSection={page.activeSection} activeSubSection="Members" />
<SubNav crumb={page.activeSection} links={page.subNav} active="Members" />

<main>
	<Hero content={page.hero} compact />

	<section class="section section-padded videos" aria-labelledby={page.videosHeader.heading ? 'video-testimonials-heading' : undefined}>
		<Container width="wide">
			{@render sectionHeader(page.videosHeader, 'video-testimonials-heading', true)}

			<div class="video-grid">
				{#each page.videos as video}
					{@const embedSrc = getVimeoEmbedSrc(video.url)}
					<article class="video-card">
						<div class="video-frame" class:empty={!embedSrc}>
							{#if embedSrc}
								<iframe
									title={`Video testimonial from ${video.name}`}
									src={embedSrc}
									loading="lazy"
									referrerpolicy="strict-origin-when-cross-origin"
									allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
									allowfullscreen
								></iframe>
							{:else}
								<span class="play" aria-hidden="true"></span>
								{#if video.provider}
									<span class="provider">{video.provider}</span>
								{/if}
							{/if}
						</div>

						<div class="video-body">
							<h3>{video.name}</h3>
							<p>{video.title}</p>
							<span>{video.organization}</span>
						</div>
					</article>
				{/each}
			</div>
		</Container>
	</section>

	<section class="section section-padded members bg-surface" aria-labelledby={page.signatoryMembersHeader.heading ? 'signatory-members-heading' : undefined}>
		<Container width="wide">
			{@render sectionHeader(page.signatoryMembersHeader, 'signatory-members-heading')}

			<div class="member-grid">
				{#each page.signatoryMembers as member}
					<Card
						as="a"
						href={getExternalHref(member.url)}
						target="_blank"
						rel="noreferrer"
						variant="plain"
						tone="gold"
						title={member.name}
						linkLabel={member.url}
						image={getLogoImage(member)}
						imageFallbackLabel={getLogoLabel(member)}
						imageFallbackColor={member.logoColor ?? 'var(--ec-navy)'}
					/>
				{/each}
			</div>
		</Container>
	</section>

	<section class="section section-padded members affiliates" aria-labelledby={page.affiliateMembersHeader.heading ? 'affiliate-members-heading' : undefined}>
		<Container width="wide">
			{@render sectionHeader(page.affiliateMembersHeader, 'affiliate-members-heading')}

			<div class="member-grid affiliate-grid">
				{#each page.affiliateMembers as member}
					<Card
						as="a"
						href={getExternalHref(member.url)}
						target="_blank"
						rel="noreferrer"
						variant="plain"
						tone="teal"
						title={member.name}
						linkLabel={member.url}
						image={getLogoImage(member)}
						imageFallbackLabel={getLogoLabel(member)}
						imageFallbackColor={member.logoColor ?? 'var(--ec-teal)'}
					/>
				{/each}
			</div>
		</Container>
	</section>

	<section class="join-cta" aria-labelledby="join-cta-heading">
		<Container>
			<div class="join-panel">
				<div>
					{#if page.joinCta.eyebrow}
						<p class="eyebrow">{page.joinCta.eyebrow}</p>
					{/if}
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
		max-width: 43rem;
	}

	.section-header p:not(.eyebrow) {
		margin-top: 1rem;
		max-width: 43rem;
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
    font-size: clamp(1.875rem, 4vw, 2.25rem);
    line-height: 1.16;
    margin: 0;
    text-wrap: pretty;
  }

	h3 {
		color: var(--ec-navy);
		font-size: 1.125rem;
		line-height: 1.3;
		margin: 0;
	}

  h2 + p {
    margin-top: 0.625rem;
  }

  p {
    color: var(--ec-ink-soft);
    font-size: 1rem;
    line-height: 1.58;
    margin: 0;
    text-wrap: pretty;
  }

	.videos {
		background: var(--ec-navy-deep);
	}

	.section-header-dark .eyebrow {
		color: var(--ec-teal-soft);
	}

	.section-header-dark h2 {
		color: var(--ec-white);
	}

	.video-grid,
	.member-grid {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin-top: 2rem;
	}

	.member-grid {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}

	.video-card {
		background: var(--ec-navy-dark);
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		min-width: 0;
		overflow: hidden;
	}

	.video-frame {
		align-items: center;
		aspect-ratio: 16 / 9;
		background:
			linear-gradient(135deg, rgba(0, 185, 187, 0.22), rgba(15, 98, 254, 0.16)),
			#132c3a;
		display: flex;
		justify-content: center;
		position: relative;
		width: 100%;
	}

	.video-frame iframe {
		border: 0;
		display: block;
		height: 100%;
		width: 100%;
	}

	.play {
		align-items: center;
		background: var(--ec-white);
		border-radius: 999px;
		box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.28);
		display: inline-flex;
		height: 4rem;
		justify-content: center;
		width: 4rem;
	}

	.play::before {
		border-bottom: 0.75rem solid transparent;
		border-left: 1.125rem solid var(--ec-navy);
		border-top: 0.75rem solid transparent;
		content: '';
		margin-left: 0.25rem;
	}

	.provider {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 4px;
		color: var(--ec-navy-deep);
		font-size: 0.75rem;
		font-weight: 700;
		line-height: 1.2;
		padding: 0.25rem 0.5rem;
		position: absolute;
		right: 1rem;
		top: 1rem;
	}

	.video-body {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		padding: 1.25rem;
	}

	.video-body h3 {
		color: var(--ec-white);
	}

	.video-body p {
		color: rgba(255, 255, 255, 0.78);
		font-size: 0.9375rem;
	}

	.video-body span {
		color: var(--ec-teal-soft);
		font-size: 0.8125rem;
		font-weight: 700;
		line-height: 1.4;
	}

	.affiliates {
		background: var(--ec-surface);
	}

	.join-cta {
		background: var(--ec-navy);
		padding-block: 3.5rem;
	}

	.join-panel {
		align-items: center;
		display: grid;
		padding-block: 2rem;
		gap: 5rem;
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


		.video-grid,
		.member-grid,
		.join-panel {
			grid-template-columns: 1fr;
		}

		.video-grid,
		.member-grid {
			margin-top: 1.5rem;
		}

		.join-panel {
			align-items: start;
			gap:2rem;
		}
	}

</style>
