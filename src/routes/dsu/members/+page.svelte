<script lang="ts">
	import Button from '$lib/components/site/Button.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { DsuMembersPage, MemberOrganization, SiteChrome } from '$lib/content/types';

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
</script>

<svelte:head>
	<title>{page.hero.title}</title>
	<meta
		name="description"
		content={page.hero.description ?? 'DSU member organizations and testimonials.'}
	/>
</svelte:head>

<PrimaryNav links={chrome.primaryNav} activeSection={page.activeSection} />
<SubNav crumb={page.activeSection} links={page.subNav} active="Members" />

<main>
	<Hero content={page.hero} compact />

	<section class="section section-padded videos" aria-labelledby="video-testimonials-heading">
		<Container>
			<div class="section-header section-header-dark">
				<p class="eyebrow">Video Testimonials</p>
				<h2 id="video-testimonials-heading">Hear from DSU members</h2>
			</div>

			<div class="video-grid">
				{#each page.videos as video}
					<article class="video-card">
						<a
							class="video-link"
							class:disabled={!video.url}
							href={video.url ? getExternalHref(video.url) : undefined}
							target={video.url ? '_blank' : undefined}
							rel={video.url ? 'noreferrer' : undefined}
							aria-label={video.url ? `Watch testimonial from ${video.name}` : undefined}
						>
							<span class="play" aria-hidden="true"></span>
							{#if video.provider}
								<span class="provider">{video.provider}</span>
							{/if}
						</a>

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

	<section class="section section-padded members" aria-labelledby="signatory-members-heading">
		<Container>
			<div class="section-header">
				<p class="eyebrow">Signatory Members</p>
				<h2 id="signatory-members-heading">Organizations committed to DSU's core values</h2>
			</div>

			<div class="member-grid">
				{#each page.signatoryMembers as member}
					<a class="member-card" href={getExternalHref(member.url)} target="_blank" rel="noreferrer">
						<span
							class="logo-mark"
							style={`--logo-color: ${member.logoColor ?? 'var(--ec-navy)'}`}
							aria-hidden="true"
						>
							{getLogoLabel(member)}
						</span>
						<span class="member-name">{member.name}</span>
						<span class="member-url">{member.url}</span>
					</a>
				{/each}
			</div>
		</Container>
	</section>

	<section class="section section-padded members affiliates" aria-labelledby="affiliate-members-heading">
		<Container>
			<div class="section-header">
				<p class="eyebrow">Affiliate Members</p>
				<h2 id="affiliate-members-heading">Supporting organizations</h2>
				<p>{page.affiliateIntro}</p>
			</div>

			<div class="member-grid affiliate-grid">
				{#each page.affiliateMembers as member}
					<a class="member-card" href={getExternalHref(member.url)} target="_blank" rel="noreferrer">
						<span
							class="logo-mark"
							style={`--logo-color: ${member.logoColor ?? 'var(--ec-violet)'}`}
							aria-hidden="true"
						>
							{getLogoLabel(member)}
						</span>
						<span class="member-name">{member.name}</span>
						<span class="member-url">{member.url}</span>
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
	}

	p {
		color: var(--ec-ink-soft);
		font-size: 1rem;
		line-height: 1.58;
		margin: 0;
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

	.video-card {
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		min-width: 0;
		overflow: hidden;
	}

	.video-link {
		align-items: center;
		aspect-ratio: 16 / 9;
		background:
			linear-gradient(135deg, rgba(0, 185, 187, 0.22), rgba(15, 98, 254, 0.16)),
			#132c3a;
		cursor: pointer;
		display: flex;
		justify-content: center;
		position: relative;
		text-decoration: none;
		transition:
			background-color 120ms ease,
			transform 120ms ease;
	}

	.video-link:hover {
		transform: translateY(-1px);
	}

	.video-link:active {
		transform: translateY(1px);
	}

	.video-link.disabled {
		cursor: default;
		pointer-events: none;
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

	.member-card {
		background: var(--ec-white);
		border: 2px solid color-mix(in srgb, var(--ec-gold) 70%, var(--ec-border-soft));
		border-radius: 8px;
		color: inherit;
		display: grid;
		gap: 0.75rem;
		grid-template-columns: auto minmax(0, 1fr);
		min-width: 0;
		padding: 1.25rem;
		text-decoration: none;
		transition:
			border-color 120ms ease,
			box-shadow 120ms ease,
			transform 120ms ease;
	}

	.member-card:hover {
		border-color: var(--ec-gold);
		box-shadow: 0 1rem 2rem rgba(12, 23, 29, 0.08);
		transform: translateY(-1px);
	}

	.member-card:active {
		box-shadow: none;
		transform: translateY(1px);
	}

	.logo-mark {
		align-items: center;
		background: var(--logo-color);
		border-radius: 4px;
		color: var(--ec-white);
		display: inline-flex;
		font-size: 0.75rem;
		font-weight: 700;
		grid-row: span 2;
		height: 3rem;
		justify-content: center;
		letter-spacing: 0;
		line-height: 1;
		padding-inline: 0.25rem;
		width: 3rem;
	}

	.member-name {
		color: var(--ec-navy);
		font-size: 1rem;
		font-weight: 700;
		line-height: 1.35;
		min-width: 0;
		overflow-wrap: anywhere;
	}

	.member-url {
		color: var(--ec-ink-soft);
		font-size: 0.875rem;
		line-height: 1.4;
		min-width: 0;
		overflow-wrap: anywhere;
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
		}
	}

	@media (max-width: 420px) {
		.member-card {
			grid-template-columns: 1fr;
		}

		.logo-mark {
			grid-row: auto;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.video-link,
		.member-card {
			transition: none;
		}
	}
</style>
