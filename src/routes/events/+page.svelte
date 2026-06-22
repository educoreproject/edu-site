<script lang="ts">
  import Container from "$lib/components/site/Container.svelte";
  import Hero from "$lib/components/site/Hero.svelte";
  import PageFooter from "$lib/components/site/PageFooter.svelte";
  import PageCtas from "$lib/components/site/PageCtas.svelte";
  import PrimaryNav from "$lib/components/site/PrimaryNav.svelte";
  import SubNav from "$lib/components/site/SubNav.svelte";
  import type { EventsUpcomingPage, SiteChrome } from "$lib/content/types";
  import Button from "$lib/components/site/Button.svelte";

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
    content={page.hero.description ??
      "Upcoming events from Education Data Unlimited and the DSU community."}
  />
</svelte:head>

<PrimaryNav
  links={chrome.primaryNav}
  footerColumns={chrome.footerColumns}
  activeSection={page.activeSection}
  activeSubSection="Upcoming"
/>
<SubNav crumb="Events" crumbHref="/events" links={page.subNav} active="Upcoming" />

<main>
  <Hero content={page.hero} background="teal" icon="event" layout="event">
    <div
      class="event-counter"
      aria-label="{page.events.length} {page.counterLabel}"
    >
      <strong>{page.events.length}</strong>
      <!-- Strip 's' from end of label if only one event -->
      <span
        >{page.events.length === 1
          ? page.counterLabel.slice(0, page.counterLabel.length - 1)
          : page.counterLabel}</span
      >
    </div>
  </Hero>

  <section
    class="section section-padded event-list-section"
    aria-labelledby="events-heading"
  >
    <Container>
      <div class="section-header">
        <p class="eyebrow">Upcoming</p>
        <h2 id="events-heading">Events</h2>
      </div>

      <div class="event-list">
        {#each page.events as event}
          {@const isLinkDisabled = !event.href || event.href === "#"}
          <article class="event-card" class:has-image={event.image?.url}>
            {#if event.image?.url}
              <div class="event-image">
                <img
                  src={event.image.url}
                  alt={event.image.alt ?? ''}
                  loading="lazy"
                />
              </div>
            {/if}

            <div class="event-content">
              <p class="event-tag">{event.tag}</p>
              <p class="event-date">{event.date}</p>
              <h3>{event.title}</h3>
              <p class="event-description">{event.description}</p>
              {#if isLinkDisabled}
                <span class="card-link disabled" aria-disabled="true"
                  ><span>Learn more</span><i class="ti ti-external-link" aria-hidden="true"></i></span
                >
              {:else}
                <a class="card-link" href={event.href} target="_blank" rel="noopener noreferrer"><span>Learn more</span><i class="ti ti-external-link" aria-hidden="true"></i></a>
              {/if}
            </div>
          </article>
        {/each}
      </div>
      <div style="margin-top: 2rem;">
        <Button
          href={"/events/past"}
          label={"View past events"}
          variant={"outline"}
        />
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
  a,
  span {
    font-family: var(--ec-font-sans);
  }

  .event-tag {
    color: var(--ec-teal-dark);
    font-size: 0.875rem;
    font-weight: 600;
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
    background: var(--ec-teal-darker);
    border: 1px solid var(--ec-teal);
    border-radius: 8px;
    display: grid;
    gap: 0.5rem;
    min-width: 6.25rem;
    padding: 0.875rem;
    text-align: center;
  }

  .event-counter strong {
    color: var(--ec-teal-soft);
    font-size: 2rem;
    line-height: 1;
  }

  .event-counter span {
    color: var(--ec-white);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25;
  }

  .event-list {
    display: grid;
    gap: 1.25rem;
    margin-top: 2rem;
  }

  .event-card {
    align-items: stretch;
    background: var(--ec-surface);
	 box-shadow: 0 10px 28px rgba(20, 43, 69, 0.06);
    border: 1px solid var(--ec-border-soft);
	border-left: 0.25rem solid var(--ec-teal);
    border-radius: 12px;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: minmax(0, 1fr);
    min-width: 0;
    padding: .875rem;
  }

  .event-card.has-image {
    align-items: start;
    gap: 1.75rem;
    grid-template-columns: minmax(18rem, 20.125rem) minmax(0, 1fr);
  }

  .event-image {
    aspect-ratio: 161 / 55;
    border-radius: 8px;
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
    padding: 0.25rem 0.75rem 0.25rem 0;
  }

  .event-tag,
  .event-date {
    margin: 0;
  }

  .event-card h3 {
	font-size: 1.5rem;
  }

  .event-date {
    color: var(--ec-ink-soft);
    font-size: 1rem;
    line-height: 1.35;
  }

  .event-description {
    color: var(--ec-ink);
    font-size: 0.9375rem;
    line-height: 1.55;
  }

  .card-link {
  align-self: flex-start;
    color: var(--ec-link);
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.4;
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 0.375rem;
	text-decoration: none;
  }

    .card-link > i {
	font-size: 1.125rem;
  }

  .card-link > span {
	text-decoration: underline;
  text-decoration-thickness: 0.125rem;
    text-underline-offset: 0.1875rem;
  }

  .card-link:hover {
    color: var(--ec-navy);
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
