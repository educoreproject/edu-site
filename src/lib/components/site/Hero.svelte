<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HeroContent } from "$lib/content/types";
  import Button from "./Button.svelte";
  import Container from "./Container.svelte";

  type Props = {
    content: HeroContent;
    background?: "navy" | "teal" | "violet";
    icon?: "world" | "affiliate" | "event" | "resource" | "mail";
    compact?: boolean;
    layout?: "default" | "event";
    titleId?: string;
    children?: Snippet;
  };

  const uid = $props.id();
  let {
    content,
    background = "navy",
    icon = "world",
    compact = false,
    layout = "default",
    titleId = `${uid}-title`,
    children,
  }: Props = $props();
</script>

<section
  class:compact
  class:teal={background === "teal"}
  class:violet={background === "violet"}
  class:eventHero={layout === "event"}
  aria-labelledby={titleId}
>
  <i class="background-icon ti" class:ti-world={icon === 'world'} class:ti-affiliate={icon === 'affiliate'} class:ti-calendar={icon === 'event'} class:ti-article={icon === 'resource'} class:ti-mail={icon === 'mail'} aria-hidden="true"></i>

  <Container>
    <div class="hero-content">
      {#if content.chip}
        <div class="chip">
          <span aria-hidden="true"></span>
          {content.chip}
        </div>
      {/if}

      <h1 id={titleId}>{content.title}</h1>

      {#if content.description}
        <p>{content.description}</p>
      {/if}

      {#if content.ctas?.length}
        <div class="actions" aria-label="Hero actions">
          {#each content.ctas as cta}
            <Button
              href={cta.href}
              target={cta.target}
              rel={cta.rel}
              download={cta.download}
              label={cta.label}
              variant={cta.variant}
              onDark
            />
          {/each}
        </div>
      {/if}

      {#if children}
        <div class="supplement">
          {@render children()}
        </div>
      {/if}
    </div>
  </Container>
</section>

<style>
  section {
    background-color: var(--ec-navy);
    background-image: linear-gradient(
    60deg,
    hsl(220deg 70% 26%) 0%,
    hsl(216deg 74% 28%) 26%,
    hsl(211deg 78% 29%) 39%,
    hsl(207deg 83% 30%) 50%,
    hsl(207deg 83% 30%) 61%,
    hsl(207deg 83% 30%) 74%,
    hsl(207deg 83% 30%) 100%
  );
    min-height: 18.75rem;
    overflow: hidden;
    position: relative;
  }

  section.teal {
    background-color: var(--ec-teal-darker);
        background-image: linear-gradient(
    60deg,
   hsl(180deg 100% 14%) 0%,
    hsl(180deg 100% 17%) 26%,
    hsl(181deg 100% 21%) 39%,
    hsl(180deg 100% 24%) 50%,
    hsl(181deg 100% 28%) 61%,
    hsl(180deg 100% 32%) 74%,
    hsl(181deg 100% 37%) 100%
  );
  }

  section.violet {
        background-color: var(--ec-violet-dark);
        background-image: linear-gradient(
    60deg,
   hsl(235deg 100% 37%) 0%,
    hsl(235deg 100% 32%) 26%,
    hsl(235deg 100% 28%) 39%,
    hsl(235deg 100% 24%) 50%,
    hsl(235deg 100% 21%) 61%,
    hsl(235deg 100% 17%) 74%,
    hsl(235deg 100% 14%) 100%
  );
  }

  section.compact {
    min-height: 10.4375rem;
  }

  section.eventHero {
    min-height: 13rem;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    min-height: 18.75rem;
    padding-block: 5rem;
    position: relative;
    z-index: 1;
  }

  .compact .hero-content {
    min-height: 10.4375rem;
  }

  .eventHero .hero-content {
    align-items: center;
    align-content: center;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    justify-items: start;
    min-height: auto;
  }

  .eventHero .chip,
  .eventHero h1,
  .eventHero p,
  .eventHero .actions {
    grid-column: 1;
  }

  .eventHero .chip {
    justify-self: start;
    margin-bottom: 0.125rem;
  }

  .eventHero .supplement {
    grid-column: 2;
    grid-row: 1 / span 3;
    justify-self: end;
  }

  .chip {
    align-items: center;
    align-self: flex-start;
    background: var(--ec-navy-deep);
    border-radius: 6px;
    color: var(--ec-teal-soft);
    display: inline-flex;
    font-family: var(--ec-font-sans);
    font-size: 0.825rem;
    font-weight: 400;
    gap: 0.375rem;
    line-height: 1.2;
    padding: 0.25rem 0.625rem;
    text-transform: uppercase;
  }

  .chip span {
    background: var(--ec-teal);
    border-radius: 999px;
    height: 0.5rem;
    width: 0.5rem;
  }

  h1 {
    color: var(--ec-white);
    font-family: var(--ec-font-sans);
    font-size: clamp(2.75rem, 5vw, 3.5rem);
    font-weight: 600;
    line-height: 1.25;
    margin: 0;
    max-width: 25ch;
    text-wrap: pretty;
  }

  p {
    color: var(--ec-white);
    font-family: var(--ec-font-sans);
    font-size: 1.125rem;
    line-height: 1.5;
    margin: 0;
	font-weight: 300;
    max-width: 64ch;
  }

  .actions,
  .supplement {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .actions {
	margin-top: 1.5rem;
  }

  .background-icon {
    right: 0;
    opacity: 0.12;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) rotate(30deg);
    color: var(--ec-navy);
    font-size: min(50rem, 90vh);
    font-weight: 100;
  }

  .teal .background-icon {
    color: var(--ec-teal-darker);
  }

  .violet .background-icon {
    color: var(--ec-violet);
  }

   @media (max-width: 1024px) {
    .hero-content {
      min-height: 16rem;
      padding-block-start: 2.5rem;
      padding-block-end: 4rem;
    }

    .eventHero .hero-content {
      grid-template-columns: minmax(0, 1fr) auto;
    }
  }

  @media (max-width: 640px) {
    .hero-content {
      min-height: 16rem;
      padding-block-start: 2.5rem;
      padding-block-end: 4rem;
    }

    .actions,
    .supplement {
      align-items: stretch;
      flex-direction: column;
      width: 100%;
    }

    .eventHero .hero-content {
      align-items: start;
      grid-template-columns: 1fr;
    }

    .eventHero .supplement {
      align-items: flex-start;
      grid-column: 1;
      grid-row: auto;
      justify-self: stretch;
      width: auto;
    }
  }
</style>
