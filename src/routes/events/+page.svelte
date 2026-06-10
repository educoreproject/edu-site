<script lang="ts">
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import NewsletterSignup from '$lib/components/site/NewsletterSignup.svelte';
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
	<Hero content={page.hero} background="teal" icon="event">
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
					<article class="event-card" class:has-image={event.image?.url}>
						{#if event.image?.url}
							<div class="event-image">
								<img src={event.image.url} alt={event.image.alt ?? ''} loading="lazy" />
							</div>
						{/if}

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

	<NewsletterSignup content={page.newsletter} emailId="events-newsletter-email" />
</main>

<PageFooter {chrome} />

<style>
	.event-tag,
	.event-date,
	h3,
	a,
	span {
		font-family: var(--ec-font-sans);
	}

	.event-tag {
		color: var(--ec-teal-dark);
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0;
		line-height: 1.2;
		margin: 0 0 0.625rem;
		text-transform: uppercase;
	}

	h3 {
		color: var(--ec-navy);
		font-size: 1.25rem;
		line-height: 1.3;
		margin: 0;
		text-wrap: pretty;
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
		grid-template-columns: minmax(0, 1fr);
		min-width: 0;
		padding: 1rem;
	}

	.event-card.has-image {
		grid-template-columns: minmax(12rem, 14.375rem) minmax(0, 1fr);
	}

	.event-image {
		aspect-ratio: 23 / 15;
		border-radius: 4px;
		min-height: 9.375rem;
		overflow: hidden;
	}

	.event-image img {
		display: block;
		height: 100%;
		object-fit: cover;
		width: 100%;
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

	@media (max-width: 760px) {
		.event-list {
			margin-top: 1.5rem;
		}

		.event-card.has-image {
			grid-template-columns: 1fr;
		}

		.event-content {
			padding: 0;
		}
	}
</style>
