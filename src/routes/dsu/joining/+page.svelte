<script lang="ts">
  import Button from "$lib/components/site/Button.svelte";
  import Container from "$lib/components/site/Container.svelte";
  import Hero from "$lib/components/site/Hero.svelte";
  import PageFooter from "$lib/components/site/PageFooter.svelte";
  import PageCtas from "$lib/components/site/PageCtas.svelte";
	import SectionChrome from '$lib/components/site/SectionChrome.svelte';
  import Card from "$lib/components/site/Card.svelte";
  import type {
    DsuJoinPage,
    SectionHeader,
    SiteChrome,
  } from "$lib/content/types";

  type Props = {
    data: {
      page: DsuJoinPage;
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

<SectionChrome {chrome} routeKey="dsuJoin" />

<main>
  <Hero content={page.hero} compact />

  <section
    class="section section-padded membership"
    aria-labelledby={page.membershipHeader.heading
      ? "membership-heading"
      : undefined}
  >
    <Container>
      {@render sectionHeader(page.membershipHeader, "membership-heading")}

      <div class="membership-grid">
        {#each page.membershipTypes as membership}
          <article
            class="membership-card"
            class:featured={membership.featured}
            style={`--kind-color: ${membership.kindColor ?? "var(--ec-teal-dark)"}`}
          >
            <div class="card-header">
              <span class="kind">
                {membership.kind}
              </span>
              <h3>{membership.title}</h3>
              <p>{membership.description}</p>
            </div>

            <ul>
              {#each membership.bullets as bullet}
                <li>
                  <i
                    class="ti"
                    aria-hidden="true"
                    class:ti-circle-check-filled={membership.featured}
                    class:ti-circle-check={!membership.featured}
                  ></i>
                  {bullet}
                </li>
              {/each}
            </ul>

            <Button
              href={membership.cta.href}
              target={membership.cta.target}
              rel={membership.cta.rel}
              download={membership.cta.download}
              label={membership.cta.label}
              variant={membership.cta.variant}
            />
          </article>
        {/each}
      </div>
    </Container>
  </section>

  <section
    class="section section-padded process bg-surface"
    aria-labelledby={page.process.header.heading
      ? "process-heading"
      : undefined}
  >
    <Container width="wide">
      <div class="horizontal-layout">
        {@render sectionHeader(page.process.header, "process-heading")}

        <ul
          class="process-list"
          aria-labelledby={page.process.header.heading
            ? "process-heading"
            : undefined}
        >
          {#each page.process.steps as value}
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
    class="section section-padded questions"
    aria-labelledby="questions-heading"
  >
    <Container>
      <div class="questions-layout">
        <div class="section-header">
          <p class="eyebrow">{page.contact.eyebrow}</p>
          <h2 id="questions-heading">{page.contact.heading}</h2>
          <p style="margin-bottom: 1.75rem;">{page.contact.description}</p>
          <Button
            href={`mailto:${page.contact.email}`}
            label={page.contact.email}
            variant="teal"
          >
			<span style="display:flex;align-items:center;gap:.375rem">
				<i class="ti ti-mail-filled" style="font-size: 1.5rem;" aria-hidden="true"></i>
				{page.contact.email}
			</span>  
		</Button>
        </div>

        <Card tone="navy" eyebrow={page.submissionChecklist.heading}>
          <ul class="checklist-card">
            {#each page.submissionChecklist.items as item}
              <li>
                {item}
              </li>
            {/each}
          </ul>
        </Card>
      </div>
    </Container>
  </section>

  <PageCtas ctas={page.ctas} />
</main>

<PageFooter {chrome} />

<style>
  h3,
  span {
    font-family: var(--ec-font-sans);
  }

  h3 {
    color: var(--ec-navy);
    font-size: 1.125rem;
    line-height: 1.3;
    margin: 0;
  }

  .membership-grid {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .membership-card {
    background: var(--ec-surface);
    border: 1px solid var(--ec-border-soft);
    border-radius: 12px;
    display: flex;
    flex-direction: column;

    gap: 1.5rem;
    min-width: 0;
    padding: 1.5rem;
    box-shadow: 0 1rem 2rem rgba(12, 23, 29, 0.08);
  }

  .membership-card.featured {
    background: var(--ec-white);
    border-color: var(--ec-teal-dark);
    box-shadow: none;
  }

  .card-header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .card-header h3 {
    color: var(--ec-ink);
    font-size: 1.5rem;
    line-height: 1.3;
    margin: 0;
    font-weight: 600;
    text-wrap: pretty;
  }

  .card-header p {
    color: var(--ec-ink);
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
  }

  .kind {
    align-self: start;
    background: var(--kind-color);
    border-radius: 4px;
    color: var(--ec-white);
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    line-height: 1.2;
    padding: 0.375rem 1.625rem;
  }

  ul {
    display: grid;
    gap: 0.75rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .membership-card ul {
    flex: 1;
  }

  li {
    color: var(--ec-ink);
    display: flex;
    font-size: 1rem;
    gap: 0.625rem;
    align-items: center;
    line-height: 1.45;
    min-width: 0;
  }

  li .ti {
    font-size: 1.5rem;
    color: var(--kind-color);
  }

  .process {
    border-top: 1px solid var(--ec-border);
    border-bottom: 1px solid var(--ec-border);
  }

  .process-list {
    counter-reset: card-count;
    display: grid;
    gap: 1.25rem;
    margin: 0;
    list-style: none;
    padding: 0;
  }

  .questions-layout {
    display: flex;
    gap: 5rem;
    align-items: center;
  }

   .questions-layout > * {
	flex: 1;
   }

  ul.checklist-card {
	margin-top:.375rem;
    padding-left:1.25rem;
	list-style: disc;
  }

  ul.checklist-card li {
	position: relative;
	color: var(--ec-ink);
	font-size: 1rem;
	line-height: 1.5;
	display: list-item;
  }

  @media (max-width: 1024px) {
	.questions-layout  {
		flex-direction: column;
		gap:1.75rem;
	}

	   .membership-grid {
      grid-template-columns: 1fr;
    }
  }

</style>
