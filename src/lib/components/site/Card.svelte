<script lang="ts">
  import type { Snippet } from "svelte";
  import Button from "$lib/components/site/Button.svelte";
  import type { Cta } from "$lib/content/types";

  type CardVariant =
    | "plain"
    | "standard"
    | "resource"
    | "person"
    | "count"
    | "quote";
  type CardTone = "teal" | "gold" | "navy" | "violet";
  type CardPadding = "compact" | "default" | "spacious";
  type CardHeadingLevel = "h2" | "h3" | "h4";
  type CardElement =
    | "a"
    | "article"
    | "aside"
    | "div"
    | "figure"
    | "section"
    | "li";
  type CardImage = {
    src: string;
    alt?: string;
  };

  type Props = {
    variant?: CardVariant;
    tone?: CardTone;
    padding?: CardPadding;
    as?: CardElement;
    headingLevel?: CardHeadingLevel;
    eyebrow?: string;
    title?: string;
    body?: string;
    quote?: string;
    attribution?: string;
    citation?: string;
    image?: CardImage;
    imageFallbackLabel?: string;
    imageFallbackColor?: string;
    bulletListItem?: boolean;
    href?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
    rel?: string;
    email?: string;
    cta?: Cta;
    linkLabel?: string;
    linkHref?: string;
    children?: Snippet;
    prefix?: Snippet;
    actions?: Snippet;
  };

  let {
    variant = "standard",
    tone = "teal",
    padding = "default",
    as = "article",
    headingLevel = "h3",
    eyebrow,
    title,
    body,
    quote,
    attribution,
    citation,
    image,
    imageFallbackLabel,
    imageFallbackColor,
    href,
    target,
    rel,
    email,
    cta,
    linkLabel,
    linkHref,
    children,
    prefix,
    actions,
    bulletListItem,
  }: Props = $props();

  const cardClass = $derived(
    ["card", variant, `tone-${tone}`, padding !== "default" ? padding : ""]
      .filter(Boolean)
      .join(" "),
  );

  const hasLink = $derived(Boolean(linkLabel));
  const rootIsLink = $derived(as === "a" && Boolean(href));
  const isLinkDisabled = $derived(
    (!linkHref && !rootIsLink) || linkHref === "#",
  );
  const isCtaDisabled = $derived(
    Boolean(cta && (!cta.href || cta.href === "#")),
  );
</script>

<svelte:element this={as} class={cardClass} {href} {target} {rel}>
  {#if variant === "count" && !bulletListItem}
    <span class="count-number" aria-hidden="true"></span>
  {/if}
  {#if variant === "count" && bulletListItem}
    <span class="bullet" aria-hidden="true">•</span>
  {/if}

  <div class="card-main">
    {#if prefix}
      <div class="prefix">
        {@render prefix()}
      </div>
    {/if}

    {#if eyebrow}
      <p class="eyebrow">{eyebrow}</p>
    {/if}

    {#if title}
      <svelte:element this={headingLevel}>{title}</svelte:element>
    {/if}

    {#if body}
      <p class="body">{body}</p>
    {/if}

    {#if quote}
      <blockquote class="quote-block">
        <p class="quote-text">{quote}</p>
      </blockquote>
    {/if}

    {#if children}
      <div class="content">
        {@render children()}
      </div>
    {/if}

    {#if email}
      <a class="email" href={`mailto:${email}`}>{email}</a>
    {/if}

    {#if hasLink}
      {#if rootIsLink}
        <span class="card-link">
          <i class="ti ti-link" aria-hidden="true"></i>
          <span>{linkLabel}</span>
        </span>
      {:else if isLinkDisabled}
        <span class="card-link disabled" aria-disabled="true"
          ><i class="ti ti-link" aria-hidden="true"></i><span>{linkLabel}</span
          ></span
        >
      {:else}
        <a class="card-link" href={linkHref}
          ><i class="ti ti-link" aria-hidden="true"></i><span>{linkLabel}</span
          ></a
        >
      {/if}
    {/if}

    {#if image?.src || imageFallbackLabel}
      <div class="card-image">
        {#if image?.src}
          <img src={image.src} alt={image.alt ?? ""} loading="lazy" />
        {:else if imageFallbackLabel}
          <span
            class="image-fallback"
            style={`--fallback-color: ${imageFallbackColor ?? "var(--card-accent)"}`}
          >
            {imageFallbackLabel}
          </span>
        {/if}
      </div>
    {/if}

    {#if cta}
      <div class="cta">
        <Button
          href={cta.href}
          label={cta.label}
          variant={cta.variant}
          disabled={isCtaDisabled}
        />
      </div>
    {/if}

    {#if actions}
      <div class="actions">
        {@render actions()}
      </div>
    {/if}
  </div>

  {#if attribution || citation}
    <figcaption class="quote-footer">
      {#if attribution}
        <strong>{attribution}</strong>
      {/if}
      {#if citation}
        <span>{citation}</span>
      {/if}
    </figcaption>
  {/if}
</svelte:element>

<style>
  .card {
    --card-accent: var(--ec-teal);
    background: var(--ec-surface);
    border: 1px solid var(--ec-border-soft);
    border-radius: 8px;
    color: var(--ec-ink);
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    min-width: 0;
    padding: 1.5rem;
    position: relative;
  }

  a.card {
    text-decoration: none;
    transition:
      border-color 120ms ease,
      box-shadow 120ms ease,
      transform 120ms ease;
  }

  a.card:hover {
    border-color: var(--card-accent);
    box-shadow: 0 1rem 2rem rgba(12, 23, 29, 0.08);
    transform: translateY(-1px);
  }

  a.card:active {
    box-shadow: none;
    transform: translateY(1px);
  }

  .card-main {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 0.675rem;
    min-width: 0;
  }

  .standard,
  .resource,
  .plain {
    border-top: 0.375rem solid var(--card-accent);
    box-shadow: 0 10px 28px rgba(20, 43, 69, 0.06);
  }

  .plain {
    background: var(--ec-white);
  }

  .person {
    border-color: var(--ec-border-soft);
    border-left: 0.375rem solid var(--card-accent);
    box-shadow: 0 10px 28px rgba(20, 43, 69, 0.06);
  }

  .count {
    align-items: flex-start;
    background: var(--ec-white);
    border-color: var(--ec-border);
    box-shadow: 0 10px 28px rgba(20, 43, 69, 0.06);
    counter-increment: card-count;
    flex-direction: row;
    gap: 0.675rem;
    padding: 1.25rem 1.275rem;
  }

  .quote {
    background: var(--ec-surface);
    border-color: var(--ec-border);
    border-top: 0.25rem solid var(--card-accent);
    box-shadow: 0 10px 28px rgba(20, 43, 69, 0.06);
    margin: 0;
    gap: 1.5rem;
  }

  .quote .card-main {
    gap: 0;
    height: 100%;
  }

  .bullet {
    color: var(--card-accent);
    font-family: var(--ec-font-sans);
    font-size: 1.5rem;
    font-weight: 900;
    line-height: 1;
    text-align: left;
  }

  .count-number {
    color: var(--card-accent);
    flex: 0 0 2rem;
    font-family: var(--ec-font-sans);
    font-size: 1.25rem;
    font-weight: 900;
    line-height: 1.3;
    text-align: left;
  }

  .count-number::before {
    content: counter(card-count);
  }

  .tone-teal {
    --card-accent: var(--ec-teal-dark);
  }

  .tone-gold {
    --card-accent: var(--ec-gold);
  }

  .tone-navy {
    --card-accent: var(--ec-navy);
  }

  .tone-violet {
    --card-accent: var(--ec-violet);
  }

  .compact {
    padding: 1.25rem;
  }

  .spacious {
    padding: 2rem;
  }

  .prefix {
    margin-bottom: 0.25rem;
  }

  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .eyebrow,
  h2,
  h3,
  h4,
  .body,
  .quote-text,
  .quote-footer,
  .email,
  .card-link,
  .content :global(*) {
    font-family: var(--ec-font-sans);
  }

  .eyebrow {
    color: var(--card-accent);
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1.2;
    margin: 0;
    text-transform: uppercase;
  }

  .tone-gold .eyebrow {
    color: var(--ec-gold-dark);
  }

  h2,
  h3,
  h4 {
    color: var(--ec-navy);
    font-weight: 700;
    margin: 0;
    text-wrap: pretty;
  }

  h2 {
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    line-height: 1.16;
  }

  h3 {
    font-size: 1.25rem;
    line-height: 1.3;
  }

  .count h3 {
    font-size: 1.125rem;
    line-height: 1.3;
    padding-top: 0.0625rem;
  }

  h4 {
    font-size: 1.125rem;
    line-height: 1.32;
  }

  .body,
  .content :global(p) {
    color: var(--ec-ink-soft);
    font-size: 1rem;
    line-height: 1.58;
    margin: 0;
  }

  .count .body {
    color: var(--ec-ink);
  }

  .quote-block {
    margin: 0;
  }

  .quote-text {
    color: var(--ec-ink);
    font-size: 1rem;
    font-style: italic;
    line-height: 1.5;
    margin: 0;
    text-wrap: pretty;
  }

  .quote-text::before {
    content: open-quote;
  }

  .quote-text::after {
    content: close-quote;
  }

  .quote-footer {
    border-top: 1px solid var(--ec-border);
    display: flex;
    flex-direction: column;
    gap: 0.275rem;
    margin-top: auto;
    padding-top: 1.5rem;
  }

  .quote-footer strong {
    color: var(--ec-ink);
    font-size: 1.125rem;
    line-height: 1.25;
  }

  .quote-footer span {
    color: var(--ec-ink);
    font-size: 0.875rem;
    line-height: 1.45;
  }

  .content {
    display: grid;
    gap: 0.675rem;
    min-width: 0;
  }

  .email {
    font-size: 0.9375rem;
    line-height: 1.4;
    overflow-wrap: anywhere;
    text-decoration: none;
  }

  .email:hover {
    text-decoration: underline;
    text-underline-offset: 0.1875rem;
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

  .plain .card-link {
    margin-top: 0;
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

  .card-image {
    align-items: center;
    background: var(--ec-white);
    border-radius: 6px;
    display: flex;
    justify-content: center;
    margin-top: auto;
    max-height: 10rem;
    overflow: hidden;
    padding: 1rem;
    width: 100%;
  }

  .card-image img {
    display: block;
    height: auto;
    max-height: 100%;
    max-width: 100%;
    object-fit: cover;
  }

  .image-fallback {
    align-items: center;
    background: var(--fallback-color);
    border-radius: 6px;
    color: var(--ec-white);
    display: inline-flex;
    font-family: var(--ec-font-sans);
    font-size: clamp(1.75rem, 6vw, 3rem);
    font-weight: 700;
    justify-content: center;
    letter-spacing: 0;
    line-height: 1;
    min-height: 8rem;
    min-width: min(100%, 14rem);
    padding: 1.25rem;
    text-align: center;
  }

  .cta,
  .actions {
    margin-top: auto;
  }

  .cta :global(a),
  .cta :global(button),
  .cta :global(span) {
    justify-self: start;
  }

  @media (max-width: 420px) {
    .card {
      padding: 1.125rem;
    }

    .quote {
      padding: 2rem 1.375rem 1.5rem;
    }

    .count {
      gap: 1rem;
    }

    .count-number {
      flex-basis: 1.5rem;
      font-size: 1.125rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    a.card {
      transition: none;
    }
  }
</style>
