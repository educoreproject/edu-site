<script lang="ts">
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { EventsPastPage, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: EventsPastPage;
			chrome: SiteChrome;
		};
	};

	let { data }: Props = $props();
	let page = $derived(data.page);
	let chrome = $derived(data.chrome);

	const countLabel = (count: number) => `${count} ${count === 1 ? 'event' : 'events'}`;
</script>

<svelte:head>
	<title>{page.hero.title}</title>
	<meta
		name="description"
		content={page.hero.description ?? 'Past events from Education Data Unlimited and the DSU community.'}
	/>
</svelte:head>

<PrimaryNav links={chrome.primaryNav} activeSection={page.activeSection} />
<SubNav crumb="Events" links={page.subNav} active="Past events" />

<main>
	<Hero content={page.hero} background="teal" compact />

	<section class="section section-padded archive-section" aria-labelledby="archive-heading">
		<Container>
			<div class="section-header">
				<p class="eyebrow">Archive</p>
				<h2 id="archive-heading">Past events</h2>
			</div>

			<div class="archive-list">
				{#each page.archive as group}
					<section class="archive-group" aria-labelledby="archive-{group.year}">
						<div class="archive-heading">
							<h3 id="archive-{group.year}">{group.year}</h3>
							<span aria-hidden="true"></span>
							<p>{countLabel(group.events.length)}</p>
						</div>

						<div class="event-list">
							{#each group.events as event}
								{@const isLinkDisabled = !event.href || event.href === '#'}
								<article class="event-card">
									<div class="poster" aria-hidden="true">
										<span>{event.poster}</span>
									</div>

									<div class="event-content">
										<p class="event-tag">{event.tag}</p>
										<p class="event-date">{event.date}</p>
										<h4>{event.title}</h4>
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
					</section>
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
					<label for="events-past-newsletter-email">Email address</label>
					<div class="form-row">
						<input
							id="events-past-newsletter-email"
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
		padding-block: 3.5rem 4rem;
	}

	.section-header {
		max-width: 46rem;
	}

	.eyebrow,
	.event-tag,
	.event-date,
	h2,
	h3,
	h4,
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
		font-size: 1.5rem;
		line-height: 1.2;
		margin: 0;
		text-wrap: pretty;
	}

	h4 {
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

	.archive-list {
		display: grid;
		gap: 2.5rem;
		margin-top: 2rem;
	}

	.archive-heading {
		align-items: center;
		display: flex;
		gap: 1rem;
		margin-bottom: 1.125rem;
		min-width: 0;
	}

	.archive-heading span {
		background: var(--ec-border-soft);
		flex: 1 1 auto;
		height: 1px;
		min-width: 2rem;
	}

	.archive-heading p {
		color: var(--ec-ink-soft);
		flex: 0 0 auto;
		font-size: 0.75rem;
		font-weight: 700;
		line-height: 1.25;
		text-transform: uppercase;
	}

	.event-list {
		display: grid;
		gap: 1rem;
	}

	.event-card {
		align-items: stretch;
		background: var(--ec-white);
		border: 1px solid var(--ec-border-soft);
		border-left: 4px solid var(--ec-teal);
		border-radius: 8px;
		display: grid;
		gap: 1.25rem;
		grid-template-columns: minmax(10rem, 12.5rem) minmax(0, 1fr);
		min-width: 0;
		padding: 1rem;
	}

	.poster {
		aspect-ratio: 5 / 3;
		background:
			linear-gradient(180deg, transparent 58%, rgba(176, 84, 58, 0.55)),
			linear-gradient(160deg, #bfe3f5 0%, #cdd6e0 45%, #e8c9a0 100%);
		border-radius: 4px;
		display: flex;
		min-height: 7.5rem;
		overflow: hidden;
		padding: 0.875rem;
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
		font-size: 1rem;
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

		.archive-list {
			margin-top: 1.5rem;
		}

		.archive-heading {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.5rem;
		}

		.archive-heading span {
			display: none;
		}

		.event-card,
		.newsletter-inner,
		.form-row {
			grid-template-columns: 1fr;
		}

		button {
			width: 100%;
		}
	}
</style>
