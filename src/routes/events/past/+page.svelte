<script lang="ts">
	import CategorySelector from '$lib/components/site/CategorySelector.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PageCtas from '$lib/components/site/PageCtas.svelte';
	import SectionChrome from '$lib/components/site/SectionChrome.svelte';
	import { eventMatchesCategory, getEventCategoryOptions } from '$lib/content/event-filters';
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
	let selectedCategory = $state('');
	let allEvents = $derived(page.archive.flatMap((group) => group.events));
	let eventCategoryOptions = $derived(getEventCategoryOptions(allEvents));
	let filteredArchive = $derived(
		page.archive
			.map((group) => ({
				...group,
				events: group.events.filter((event) => eventMatchesCategory(event, selectedCategory))
			}))
			.filter((group) => group.events.length)
	);

	const countLabel = (count: number) => `${count} ${count === 1 ? 'event' : 'events'}`;

	function handleCategoryChange(category: string) {
		selectedCategory = category;
	}
</script>

<svelte:head>
	<title>{page.hero.title}</title>
	<meta
		name="description"
		content={page.hero.description ?? 'Past events from Education Data Unlimited and the DSU community.'}
	/>
</svelte:head>

<SectionChrome {chrome} routeKey="eventsPast" />

<main>
	<Hero content={page.hero} background="teal" icon="event" />

	<section class="section section-padded archive-section" aria-labelledby="archive-heading">
		<Container>
			<div class="section-header">
				<p class="eyebrow">Archive</p>
				<h2 id="archive-heading">Past events</h2>
			</div>

			<div class="event-content-layout">
				<CategorySelector
					categories={eventCategoryOptions}
					allCategoryLabel="All events"
					bind:selectedCategory
					label="Event categories"
					onSelect={handleCategoryChange}
				/>

				<div class="event-results">
					{#if filteredArchive.length}
						<div class="archive-list">
							{#each filteredArchive as group}
								<section class="archive-group" aria-labelledby="archive-{group.year}">
									<div class="archive-heading">
										<h3 id="archive-{group.year}">{group.year}</h3>
										<span aria-hidden="true"></span>
										<p>{countLabel(group.events.length)}</p>
									</div>

									<div class="event-list">
										{#each group.events as event}
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
					{:else}
						<div class="empty-state" role="status">
							<h3>No past events available</h3>
							<p>There are no past events available{#if selectedCategory} for {selectedCategory}{/if} yet.</p>
						</div>
					{/if}
				</div>
			</div>
		</Container>
	</section>

	<PageCtas ctas={page.ctas} />
</main>

<PageFooter {chrome} />

<style>
	.event-tag,
	.event-date,
	h3,
	h4,
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

	.event-content-layout {
		align-items: start;
		display: grid;
		gap: 3.5rem;
		grid-template-columns: minmax(9rem, 11rem) minmax(0, 1fr);
		margin-top: 2rem;
	}

	.event-results {
		display: grid;
		gap: 2rem;
		min-width: 0;
	}

	.archive-list {
		display: grid;
		gap: 2.5rem;
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
		grid-template-columns: minmax(0, 1fr);
		min-width: 0;
		padding: 1rem;
	}

	.event-card.has-image {
		align-items: start;
		gap: 1.75rem;
		grid-template-columns: minmax(18rem, 20.125rem) minmax(0, 1fr);
	}

	.event-image {
		aspect-ratio: 161 / 55;
		border-radius: 4px;
		overflow: hidden;
		width: 100%;
	}

	.event-image img {
		display: block;
		height: 100%;
		object-fit: cover;
		object-position: center;
		width: 100%;
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

	.empty-state {
		border: 1px solid var(--ec-border-soft);
		border-left: 4px solid var(--ec-teal-dark);
		border-radius: 8px;
		display: grid;
		gap: 0.875rem;
		min-width: 0;
		padding: 1.25rem;
	}

	.empty-state h3,
	.empty-state p {
		margin: 0;
	}

	@media (max-width: 760px) {
		.event-content-layout {
			grid-template-columns: 1fr;
			margin-top: 1.5rem;
		}

		.archive-list {
			gap: 1.75rem;
		}

		.archive-heading {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.5rem;
		}

		.archive-heading span {
			display: none;
		}

		.event-card.has-image {
			grid-template-columns: 1fr;
		}
	}
</style>
