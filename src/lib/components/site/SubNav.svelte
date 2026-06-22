<script lang="ts">
  import { isExternalLink } from "$lib/content/links";
  import type { LinkItem, SiteNavSection } from "$lib/content/types";
  import Container from "./Container.svelte";

  type LegacyProps = {
    crumb: string;
    crumbHref: string;
    links: LinkItem[];
    active?: LinkItem["label"];
  };

  type Props = {
    section?: SiteNavSection;
    activeHref?: string;
    activeLabel?: string;
  } & Partial<LegacyProps>;

  let {
    section,
    activeHref = "",
    activeLabel,
    crumb = "",
    crumbHref = "",
    links = [],
    active,
  }: Props = $props();

  let currentCrumb = $derived(section?.label ?? crumb);
  let currentCrumbHref = $derived(section?.href ?? crumbHref);
  let currentLabel = $derived(activeLabel ?? active);
  let navLinks = $derived(section ? section.children : links);
</script>

<nav aria-label="{currentCrumb} navigation">
  <Container width="wide">
    <div class="inner">
      <div class="crumb">
        <a class="crumb-link" href={currentCrumbHref}>{currentCrumb}</a>
        <i class="ti ti-chevron-right" aria-hidden="true"></i>
        {#if currentLabel}
          <span class="current">{currentLabel}</span>
        {/if}
      </div>

      <div class="links">
        {#each navLinks as link}
          {@const isActive = section
            ? link.href === activeHref || link.label === currentLabel
            : link.label === currentLabel}
          {@const isExternal = isExternalLink(link.href)}
          {@const target = link.target ?? (isExternal ? "_blank" : undefined)}
          {@const rel = link.rel ?? (isExternal ? "noopener noreferrer" : undefined)}
          {#if link.disabled || !link.href}
            <span class:active={isActive} class="disabled" aria-disabled="true"
              >{link.label}</span
            >
          {:else}
            <a
              class:active={isActive}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              {target}
              {rel}
              download={link.download}
            >
              <span>{link.label}</span>
              {#if isExternal}
                <i class="ti ti-external-link" aria-hidden="true"></i>
                <span class="sr-only">Opens in a new tab</span>
              {/if}
            </a>
          {/if}
        {/each}
      </div>
    </div>
  </Container>
</nav>

<style>
  nav {
    align-items: center;
    background: var(--ec-white);
    display: flex;
    position: sticky;
    top: 3.75rem;
    z-index: 40;
    min-height: 3rem;
    border-bottom: 1px solid var(--ec-border);
  }

  .inner {
    align-items: center;
    display: flex;
    gap: 1.5rem;
    justify-content: space-between;
    width: 100%;
    max-width: 1440px;
  }

  .crumb {
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    gap: 0.375rem;
  }

  .crumb-link,
  .current {
    color: var(--ec-teal-dark);
    font-family: var(--ec-font-sans);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.3;
    cursor: pointer;
  }

  .crumb-link {
    text-decoration: none;
  }

  .crumb-link:hover {
    color: var(--ec-navy);
  }

  .crumb-link:focus-visible {
    outline: 3px solid var(--ec-focus);
    outline-offset: 2px;
  }

  .ti.ti-chevron-right {
    color: var(--ec-border);
    font-weight: 900;
    font-size: 1.125rem;
    line-height: 1;
  }

  .current {
    color: var(--ec-ink-soft);
    cursor: default;
    font-weight: 400;
  }

  .links {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: clamp(1.5rem, 3vw, 2.5rem);
    justify-content: flex-end;
  }

  .links a {
    border-bottom: 2px solid transparent;
    color: var(--ec-teal-dark);
    font-family: var(--ec-font-sans);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.3;
    padding-block: 0.125rem;
    text-decoration: none;
  }

  .links a {
    align-items: center;
    cursor: pointer;
    display: inline-flex;
    gap: 0.25rem;
  }

  .links a i {
    font-size: 1rem;
    align-self: flex-start;
    margin-top: 0.05rem;
  }

  .links a:hover {
    color: var(--ec-navy);
  }

  .links .active {
    border-bottom-color: var(--ec-teal);
    color: var(--ec-ink);
  }

  .links .disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  @media (max-width: 760px) {
    .inner {
      align-items: center;
      flex-direction: row;
      gap: 0;
    }

    .links {
      display: none;
    }

    .crumb-link,
    .current {
      font-size: 1rem;
    }
  }
</style>
