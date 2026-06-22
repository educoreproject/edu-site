<script lang="ts">
  import Container from "$lib/components/site/Container.svelte";
  import Hero from "$lib/components/site/Hero.svelte";
  import PageFooter from "$lib/components/site/PageFooter.svelte";
  import PageCtas from "$lib/components/site/PageCtas.svelte";
  import SectionChrome from "$lib/components/site/SectionChrome.svelte";
  import Card from "$lib/components/site/Card.svelte";
  import type {
    DsuHomePage,
    SectionHeader,
    SiteChrome,
  } from "$lib/content/types";

  type Props = {
    page: DsuHomePage;
    chrome: SiteChrome;
  };

  let { page, chrome }: Props = $props();
</script>

{#snippet richText(blocks: SectionHeader["body"])}
  {#each blocks ?? [] as block}
    {#if block._type === "block"}
      <p>
        {#each block.children ?? [] as span}
          {@const isStrong = span.marks?.includes("strong")}
          {@const isEm = span.marks?.includes("em")}
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
    {#if header.body}
      {@render richText(header.body)}
    {/if}
  </div>
{/snippet}

<svelte:head>
  <title>{page.hero.title}</title>
  <meta name="description" content={page.hero.description} />
</svelte:head>

<SectionChrome {chrome} routeKey="dsuHome" />

<main>
  <Hero content={page.hero} />

  <section
    class="section section-padded pillars"
    aria-labelledby={page.pillarsHeader.heading ? "pillars-heading" : undefined}
  >
    <Container width="wide">
      {@render sectionHeader(page.pillarsHeader, "pillars-heading")}

      <div class="pillar-grid">
        {#each page.pillars as pillar, index}
          <Card
            eyebrow={pillar.label}
            body={pillar.text}
            tone={index === 0 ? "teal" : index === 1 ? "gold" : "navy"}
          />
        {/each}
      </div>
    </Container>
  </section>

  <section
    class="section section-padded values bg-surface"
    aria-labelledby={page.valuesHeader.heading ? "values-heading" : undefined}
  >
    <Container width="wide">
      <div class="horizontal-layout">
        {@render sectionHeader(page.valuesHeader, "values-heading")}

        <ul
          class="value-list"
          aria-labelledby={page.valuesHeader.heading
            ? "values-heading"
            : undefined}
        >
          {#each page.values as value}
            <Card
              variant="count"
              as="li"
              tone="teal"
              title={value.title}
              body={value.description}
            />
          {/each}
        </ul>
      </div>
    </Container>
  </section>

  <section
    class="section initiative bg-surface"
    aria-labelledby={page.initiative.header.heading
      ? "initiative-heading"
      : undefined}
  >
    <Container width="wide">
      <div class="horizontal-layout">
        {@render sectionHeader(page.initiative.header, "initiative-heading")}

        <ul
          aria-labelledby={page.initiative.header.heading
            ? "initiative-heading"
            : undefined}
          class="initiative-list"
        >
          {#each page.initiative.items as item}
            <Card variant="count" as="li" body={item} />
          {/each}
        </ul>
      </div>
    </Container>
  </section>

  <section
    class="section section-padded voices"
    aria-labelledby={page.voicesHeader.heading ? "voices-heading" : undefined}
  >
    <Container width="wide">
      {@render sectionHeader(page.voicesHeader, "voices-heading")}

      <div class="voice-grid">
        {#each page.voices as voice}
          <Card
            variant="quote"
            as="figure"
            tone="teal"
            quote={voice.quote}
            attribution={voice.name}
            citation={voice.organization}
          />
        {/each}
      </div>
    </Container>
  </section>

  <PageCtas ctas={page.ctas} />
</main>

<PageFooter {chrome} />

<style>
  .pillar-grid {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .values {
    border-top: 1px solid var(--ec-border);
  }

  .value-list,
  .initiative-list {
    counter-reset: card-count;
    display: grid;
    gap: 1.25rem;
    margin: 0;
    list-style: none;
    padding: 0;
  }

  .initiative {
    padding-block-end: 4rem;
    border-bottom: 1px solid var(--ec-border);
  }

  .voice-grid {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 2rem;
  }

  @media (max-width: 1024px) {
    .pillar-grid,
    .voice-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 760px) {
    .pillar-grid,
    .voice-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
