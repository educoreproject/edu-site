<script lang="ts">
  import Container from "$lib/components/site/Container.svelte";
  import Hero from "$lib/components/site/Hero.svelte";
  import PageFooter from "$lib/components/site/PageFooter.svelte";
  import PageCtas from "$lib/components/site/PageCtas.svelte";
  import PrimaryNav from "$lib/components/site/PrimaryNav.svelte";
  import SubNav from "$lib/components/site/SubNav.svelte";
  import Card from "$lib/components/site/Card.svelte";
  import type {
    EduOverviewPage,
    SectionHeader,
    SiteChrome,
  } from "$lib/content/types";

  type EduSectionHeader = SectionHeader & {
    paragraphs?: string[];
	description?: string;
  };

  type Props = {
    data: {
      page: EduOverviewPage;
      chrome: SiteChrome;
    };
  };

  let { data }: Props = $props();
  let page = $derived(data.page);
  let chrome = $derived(data.chrome);
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

{#snippet sectionHeader(header: EduSectionHeader, headingId: string)}
  <div class="section-header">
    {#if header.eyebrow}
      <p class="eyebrow">{header.eyebrow}</p>
    {/if}
    {#if header.heading}
      <h2 id={headingId}>{header.heading}</h2>
    {/if}
    {#if header.description}
      <p>{header.description}</p>
    {:else}
      {#each header.paragraphs ?? [] as paragraph}
        <p>{paragraph}</p>
      {/each}
    {/if}
  </div>
{/snippet}

<svelte:head>
  <title>{page.hero.title}</title>
  <meta
    name="description"
    content={page.hero.description ??
      "Education Data Unlimited overview and mission."}
  />
</svelte:head>

<PrimaryNav
  links={chrome.primaryNav}
  footerColumns={chrome.footerColumns}
  activeSection={page.activeSection}
  activeSubSection="Overview"
/>
<SubNav crumb="EDU" links={page.subNav} active="Overview" />

<main>
  <Hero content={page.hero} />

  <section class="section section-padded" aria-labelledby="mission-heading">
    <Container width="narrow">
      <article class="text-section">
        {@render sectionHeader(page.mission, "mission-heading")}
      </article>

      <article class="text-section" aria-labelledby="organization-heading">
        {@render sectionHeader(page.organization, "organization-heading")}
      </article>
    </Container>
  </section>

  <section
    class="section section-padded will-do bg-surface"
    aria-labelledby="scope-heading"
  >
    <Container width="wide">
      <div class="horizontal-layout">
        {@render sectionHeader(page.willDo, "scope-heading")}

        <ul class="item-list" aria-labelledby="scope-heading">
          {#each page.willDo.items as item}
            <Card
              variant="count"
              as="li"
              tone="teal"
              body={item}
			  bulletListItem={true}
            ></Card>
          {/each}
        </ul>
      </div>
    </Container>
  </section>
  <section
    class="section will-not-do bg-surface"
    aria-labelledby="scope-heading"
  >
    <Container width="wide">
      <div class="horizontal-layout">
        {@render sectionHeader(page.willNotDo, "scope-heading")}

        <ul class="item-list" aria-labelledby="scope-heading">
          {#each page.willNotDo.items as item}
            <Card
              variant="count"
              as="li"
              tone="teal"
              body={item}
			  bulletListItem={true}
            ></Card>
          {/each}
        </ul>
      </div>
    </Container>
  </section>
  <section
    class="section section-padded"
    aria-labelledby="unification-heading"
  >
    <Container width="narrow">
      <article class="text-section">
        {@render sectionHeader(page.unification, "unification-heading")}
      </article>

      <article class="text-section" aria-labelledby="incorporation-heading">
        {@render sectionHeader(page.incorporation, "incorporation-heading")}
      </article>
    </Container>
  </section>

  <PageCtas ctas={page.ctas} />
</main>

<PageFooter {chrome} />

<style>


  .text-section + .text-section {
    border-top: 1px solid var(--ec-border-soft);
    margin-top: 3rem;
    padding-top: 3rem;
  }

  .text-section .section-header>*:last-child {
	margin-bottom:0;
  }

  .will-do {
    border-top: 1px solid var(--ec-border);
  }

  .will-not-do {
	border-bottom: 1px solid var(--ec-border);
	padding-block-end: 4rem;
  }

  .item-list {
    counter-reset: card-count;
    display: grid;
    gap: 1.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 760px) {
    .text-section + .text-section {
      margin-top: 2.25rem;
      padding-top: 2.25rem;
    }
  }
</style>
