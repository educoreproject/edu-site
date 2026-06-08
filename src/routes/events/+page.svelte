<script lang="ts">
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { EventsUpcomingPage, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: EventsUpcomingPage;
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
		content={page.hero.description ?? 'Upcoming events from Education Data Unlimited and the DSU community.'}
	/>
</svelte:head>

<PrimaryNav links={chrome.primaryNav} footerColumns={chrome.footerColumns} activeSection={page.activeSection} activeSubSection="Upcoming" />
<SubNav crumb="Events" links={page.subNav} active="Upcoming" />

<main>
	<Hero content={page.hero} background="teal">
		<div class="event-counter" aria-label="{page.events.length} {page.counterLabel}">
			<strong>{page.events.length}</strong>
			<span>{page.counterLabel}</span>
		</div>
	</Hero>

	<section class="section section-padded event-list-section" aria-labelledby="events-heading">
		<Container>
			<div class="section-header">
				<p class="eyebrow">Upcoming</p>
				<h2 id="events-heading">Events</h2>
			</div>

			<div class="event-list">
				{#each page.events as event}
					{@const isLinkDisabled = !event.href || event.href === '#'}
					<article class="event-card">
						<div class="poster" aria-hidden="true">
							<span>{event.poster}</span>
						</div>

						<div class="event-content">
							<p class="event-tag">{event.tag}</p>
							<p class="event-date">{event.date}</p>
							<h3>{event.title}</h3>
							<p class="event-description">{event.description}</p>
							{#if isLinkDisabled}
								<span class="card-link disabled" aria-disabled="true">Learn more</span>
							{:else}
								<a class="card-link" href={event.href}>Learn more</a>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</Container>
	</section>

	<section
		id="newsletter"
		class:teal={page.newsletter.background === 'teal'}
		class="newsletter"
		aria-labelledby="newsletter-heading"
	>
		<Container>
			<div class="newsletter-inner">
				<div>
					<p class="eyebrow">Newsletter</p>
					<h2 id="newsletter-heading">{page.newsletter.heading}</h2>
					<p>{page.newsletter.description}</p>
					{#if page.newsletter.note}
						<p class="newsletter-note">{page.newsletter.note}</p>
					{/if}
				</div>

				<form class="newsletter-form" onsubmit={(event) => event.preventDefault()}>
					<label for="events-newsletter-email">Email address</label>
					<div class="form-row">
						<input
							id="events-newsletter-email"
							name="email"
							type="email"
							autocomplete="email"
							placeholder={page.newsletter.emailPlaceholder}
						/>
						<button type="submit">{page.newsletter.ctaLabel}</button>
					</div>
				</form>
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
	.event-tag,
	.event-date,
	h2,
	h3,
	p,
	a,
	span,
	label,
	input,
	button {
		font-family: var(--ec-font-sans);
	}

	.eyebrow,
	.event-tag {
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
		font-size: 1.25rem;
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

	.event-counter {
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.24);
		border-radius: 8px;
		display: grid;
		gap: 0.375rem;
		min-width: 11rem;
		padding: 1rem 1.375rem;
		text-align: center;
	}

	.event-counter strong {
		color: var(--ec-white);
		font-size: 2.75rem;
		line-height: 1;
	}

	.event-counter span {
		color: rgba(255, 255, 255, 0.78);
		font-size: 0.75rem;
		font-weight: 700;
		line-height: 1.25;
		text-transform: uppercase;
	}

	.event-list {
		display: grid;
		gap: 1.25rem;
		margin-top: 2rem;
	}

	.event-card {
		align-items: stretch;
		background: var(--ec-white);
		border: 1px solid var(--ec-navy);
		border-radius: 8px;
		display: grid;
		gap: 1.5rem;
		grid-template-columns: minmax(12rem, 14.375rem) minmax(0, 1fr);
		min-width: 0;
		padding: 1rem;
	}

	.poster {
		aspect-ratio: 23 / 15;
		background:
			linear-gradient(180deg, transparent 58%, rgba(176, 84, 58, 0.55)),
			linear-gradient(160deg, #bfe3f5 0%, #cdd6e0 45%, #e8c9a0 100%);
		border-radius: 4px;
		display: flex;
		min-height: 9.375rem;
		overflow: hidden;
		padding: 1rem;
		position: relative;
	}

	.poster::before,
	.poster::after {
		background: rgba(176, 74, 48, 0.7);
		bottom: 0;
		content: '';
		position: absolute;
		width: 0.375rem;
	}

	.poster::before {
		height: 60%;
		right: 24%;
	}

	.poster::after {
		height: 48%;
		right: 46%;
	}

	.poster span {
		color: var(--ec-navy);
		font-size: 1.1875rem;
		font-weight: 700;
		line-height: 1.12;
		position: relative;
		text-wrap: balance;
		z-index: 1;
	}

	.event-content {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-width: 0;
		padding: 0.25rem 0.75rem 0.25rem 0;
	}

	.event-tag,
	.event-date {
		margin: 0;
	}

	.event-date {
		color: var(--ec-ink-soft);
		font-size: 0.875rem;
		line-height: 1.35;
	}

	.event-description {
		color: var(--ec-ink);
		font-size: 0.9375rem;
		line-height: 1.55;
	}

	.card-link {
		align-self: flex-start;
		font-size: 0.875rem;
		font-weight: 700;
		line-height: 1.4;
		margin-top: auto;
		text-decoration-thickness: 0.125rem;
		text-underline-offset: 0.1875rem;
	}

	.card-link.disabled {
		color: var(--ec-ink-soft);
		cursor: not-allowed;
		opacity: 0.72;
		text-decoration: none;
	}

	.newsletter {
		background: var(--ec-navy);
		padding-block: 3.5rem;
	}

	.newsletter.teal {
		background: var(--ec-teal-darker);
	}

	.newsletter-inner {
		align-items: center;
		display: grid;
		gap: 2rem;
		grid-template-columns: minmax(0, 1fr) minmax(18rem, 28rem);
	}

	.newsletter .eyebrow {
		color: var(--ec-teal-soft);
	}

	.newsletter h2,
	.newsletter p,
	.newsletter label {
		color: var(--ec-white);
	}

	.newsletter h2 {
		margin-bottom: 0.75rem;
	}

	.newsletter p {
		color: rgba(255, 255, 255, 0.86);
		max-width: 43rem;
	}

	.newsletter .newsletter-note {
		color: rgba(255, 255, 255, 0.72);
		font-size: 0.875rem;
		margin-top: 0.875rem;
	}

	.newsletter-form {
		display: grid;
		gap: 0.625rem;
		min-width: 0;
	}

	.newsletter-form label {
		font-size: 0.875rem;
		font-weight: 700;
		line-height: 1.3;
	}

	.form-row {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: minmax(0, 1fr) auto;
	}

	input {
		border: 1px solid transparent;
		border-radius: 6px;
		color: var(--ec-ink);
		min-width: 0;
		padding: 0.8125rem 0.875rem;
		width: 100%;
	}

	button {
		background: var(--ec-gold);
		border: 0;
		border-radius: 6px;
		color: var(--ec-navy-deep);
		cursor: pointer;
		font-weight: 700;
		line-height: 1.2;
		padding: 0.8125rem 1rem;
		white-space: nowrap;
	}

	@media (max-width: 760px) {
		.section-padded,
		.newsletter {
			padding-block: 3rem;
		}

		.event-list {
			margin-top: 1.5rem;
		}

		.event-card,
		.newsletter-inner,
		.form-row {
			grid-template-columns: 1fr;
		}

		.event-content {
			padding: 0;
		}

		button {
			width: 100%;
		}
	}
</style>
