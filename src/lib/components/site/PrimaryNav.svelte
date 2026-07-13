<script lang="ts">
  import { tick } from 'svelte';
  import { isExternalLink } from "$lib/content/links";
  import { getRoutePage } from "$lib/content/route-metadata";
  import type { RoutePageKey, SiteSectionKey } from "$lib/content/route-metadata";
  import type { FooterColumn, LinkItem, SiteChrome } from "$lib/content/types";
  import Container from "./Container.svelte";

  type NavSection = LinkItem & {
    key?: SiteSectionKey;
    pageKey?: RoutePageKey;
    children: LinkItem[];
  };

  type Props = {
    chrome?: SiteChrome;
    links?: LinkItem[];
    activeSection?: LinkItem["label"];
    activeSubSection?: LinkItem["label"];
    footerColumns?: FooterColumn[];
    activeSectionKey?: SiteSectionKey;
    activePageKey?: RoutePageKey;
    logoHref?: string;
  };

  const uid = $props.id();
  let {
    chrome,
    links,
    activeSection,
    activeSubSection,
    footerColumns = [],
    activeSectionKey,
    activePageKey,
    logoHref = "/",
  }: Props = $props();

  let menuOpen = $state(false);
  let searchOpen = $state(false);
  let searchInput: HTMLInputElement | undefined = $state();
  const panelId = `${uid}-mobile-menu`;
  const searchDialogId = `${uid}-search-dialog`;
  const searchTitleId = `${uid}-search-title`;
  const searchInputId = `${uid}-search-input`;
  let activePage = $derived(activePageKey ? getRoutePage(activePageKey) : undefined);

  const normalizeLabel = (value: string) =>
    value
      .toLowerCase()
      .replace(/^about\s+/, "")
      .trim();

  const navSections = $derived(
    (chrome
      ? chrome.sections
      : (links ?? []).map((link) => {
          const column = footerColumns.find(
            (item) => normalizeLabel(item.heading) === normalizeLabel(link.label),
          );

          return {
            ...link,
            children: column?.links ?? [],
          };
        })) as NavSection[],
  );

  function openMenu() {
    menuOpen = true;
  }

  function closeMenu() {
    menuOpen = false;
  }

  async function openSearch() {
    closeMenu();
    searchOpen = true;
    await tick();
    searchInput?.focus();
  }

  function closeSearch() {
    searchOpen = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      if (searchOpen) {
        closeSearch();
        return;
      }

      closeMenu();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<nav aria-label="Primary navigation">
  <Container flex={true} width="wide">
    <a class="logo" href={logoHref} aria-label="Education Data Unlimited home">
      <img src="/assets/educore-logo.png" alt="Education Data Unlimited" />
    </a>

    <div class="links">
      {#each navSections as section}
        {@const active =
          section.key === activeSectionKey ||
          section.pageKey === activePageKey ||
          section.label === activeSection}
        {@const isExternal = isExternalLink(section.href)}
        {@const target = section.target ?? (isExternal ? "_blank" : undefined)}
        {@const rel = section.rel ?? (isExternal ? "noopener noreferrer" : undefined)}
        {#if section.disabled || !section.href}
          <span class:active class="disabled" aria-disabled="true"
            >{section.label}</span
          >
        {:else}
          <a
            class:active
            href={section.href}
            aria-current={active ? "page" : undefined}
            {target}
            {rel}
            download={section.download}
            ><span>{section.label}</span>{#if isExternal}<i
                class="ti ti-external-link"
                aria-hidden="true"
              ></i><span class="sr-only">Opens in a new tab</span>{/if}</a
          >
        {/if}
      {/each}
    </div>

    <button
      class="search-toggle desktop-search"
      type="button"
      aria-label="Open search"
      aria-haspopup="dialog"
      onclick={openSearch}
    >
      <i class="ti ti-search" aria-hidden="true"></i>
    </button>
  </Container>
  <button
    class="search-toggle mobile-search"
    type="button"
    aria-label="Open search"
    aria-haspopup="dialog"
    onclick={openSearch}
  >
    <i class="ti ti-search" aria-hidden="true"></i>
  </button>
  <button
    class="menu-toggle"
    type="button"
    aria-controls={panelId}
    aria-expanded={menuOpen}
    aria-label="Open menu"
    onclick={openMenu}
  >
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </button>
</nav>

{#if searchOpen}
  <div class="search-layer">
    <button
      class="search-scrim"
      type="button"
      aria-label="Close search"
      onclick={closeSearch}
    ></button>

    <div
      id={searchDialogId}
      class="search-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby={searchTitleId}
    >
      <div class="search-dialog-header">
        <h2 id={searchTitleId}>Search</h2>
        <button
          class="search-close"
          type="button"
          aria-label="Close search"
          onclick={closeSearch}
        >
          <i class="ti ti-x" aria-hidden="true"></i>
        </button>
      </div>

      <form class="modal-search-form" action="/search" method="GET" role="search">
        <label for={searchInputId}>Search by keyword</label>
        <input
          id={searchInputId}
          bind:this={searchInput}
          name="keyword"
          type="search"
          placeholder="Search resources and events"
          autocomplete="off"
        />
        <button type="submit">
          <i class="ti ti-search" aria-hidden="true"></i>
          <span>Search</span>
        </button>
      </form>
    </div>
  </div>
{/if}

{#if menuOpen}
  <div class="drawer-layer">
    <button
      class="scrim"
      type="button"
      aria-label="Close menu"
      onclick={closeMenu}
    ></button>

    <div
      id={panelId}
      class="drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div class="drawer-header">
        <a
          class="drawer-logo"
          href={logoHref}
          aria-label="Education Data Unlimited home"
          onclick={closeMenu}
        >
          <img src="/assets/educore-logo.png" alt="Education Data Unlimited" />
        </a>

        <button
          class="close-toggle"
          type="button"
          aria-label="Close menu"
          onclick={closeMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div class="drawer-links">
        {#each navSections as section}
          {@const sectionActive =
            section.key === activeSectionKey ||
            section.pageKey === activePageKey ||
            section.label === activeSection}
          {@const sectionExternal = isExternalLink(section.href)}
          {@const sectionTarget = section.target ?? (sectionExternal ? "_blank" : undefined)}
          {@const sectionRel = section.rel ?? (sectionExternal ? "noopener noreferrer" : undefined)}
          <section class:active-section={sectionActive}>
            {#if section.disabled || !section.href}
              <span class="section-label disabled" aria-disabled="true"
                >{section.label}</span
              >
            {:else}
              <a
                class="section-label"
                href={section.href}
                aria-current={(section.pageKey === activePageKey ||
                  (sectionActive && !activeSubSection && !activePageKey))
                  ? "page"
                  : undefined}
                target={sectionTarget}
                rel={sectionRel}
                download={section.download}
                onclick={closeMenu}
                ><span>{section.label}</span>{#if sectionExternal}<i
                    class="ti ti-external-link"
                    aria-hidden="true"
                  ></i><span class="sr-only">Opens in a new tab</span>{/if}</a
              >
            {/if}

            {#if section.children.length}
              <ul>
                {#each section.children as child}
                  {@const childActive =
                    sectionActive &&
                    (child.pageKey === activePageKey ||
                      child.href === activePage?.path ||
                      child.label === activeSubSection)}
                  {@const childExternal = isExternalLink(child.href)}
                  {@const childTarget = child.target ?? (childExternal ? "_blank" : undefined)}
                  {@const childRel = child.rel ?? (childExternal ? "noopener noreferrer" : undefined)}
                  <li>
                    {#if child.disabled || !child.href}
                      <span
                        class:active={childActive}
                        class="disabled"
                        aria-disabled="true">{child.label}</span
                      >
                    {:else}
                      <a
                        class:active={childActive}
                        href={child.href}
                        aria-current={childActive ? "page" : undefined}
                        target={childTarget}
                        rel={childRel}
                        download={child.download}
                        onclick={closeMenu}
                        ><span>{child.label}</span>{#if childExternal}<i
                            class="ti ti-external-link"
                            aria-hidden="true"
                          ></i><span class="sr-only">Opens in a new tab</span>{/if}</a
                      >
                    {/if}
                  </li>
                {/each}
              </ul>
            {/if}
          </section>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  nav {
    align-items: stretch;
    background: var(--dsu-primary-base);
    display: flex;
    height: 3.75rem;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  button {
    cursor: pointer;
  }

  .logo {
    align-items: stretch;
    align-self: stretch;
    background: transparent;
    display: flex;
    flex: 0 0 auto;
    justify-content: flex-start;
  }

  .logo img {
    background: var(--ec-white);
    border: 1px solid rgba(255, 255, 255, 0.2);
    filter: none;
    height: 100%;
    padding: 0.625rem 1rem;
    width: auto;
  }

  .links {
    align-items: center;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    gap: clamp(1rem, 2vw, 2rem);
    justify-content: flex-end;
  }

  .links a,
  .links > span {
    border-bottom: 3px solid transparent;
    color: rgba(255, 255, 255, 0.88);
    display: inline-flex;
    font-family: var(--ec-font-sans);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.2;
    padding: 0.25rem 0 0.325rem;
    text-decoration: none;
    transition:
      border-color 120ms ease,
      color 120ms ease,
      transform 120ms ease;
  }

  .links a {
    align-items: center;
    cursor: pointer;
    gap: 0.25rem;
  }

  .links a i,
  .drawer a i {
    font-size: 0.875rem;
  }

  .links a:hover {
    color: var(--ec-white);
    transform: translateY(-1px);
  }

  .links a:active {
    transform: translateY(1px);
  }

  .links .active {
    border-bottom-color: var(--ec-teal-muted);
    color: var(--ec-white);
  }

  .links .disabled {
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
    opacity: 0.58;
  }

  .search-toggle {
    align-items: center;
    align-self: center;
    background: transparent;
    border: 0;
    color: var(--ec-white);
    display: inline-flex;
    flex: 0 0 auto;
    height: 2.75rem;
    justify-content: center;
    margin-left: 1rem;
    padding: 0;
    width: 2.75rem;
  }

  .search-toggle i {
    font-size: 1.375rem;
  }

  .search-toggle:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .search-toggle:active {
    transform: translateY(1px);
  }

  .mobile-search {
    display: none;
    margin-left: auto;
    margin-right: 0.25rem;
  }

  .menu-toggle {
    align-items: center;
    align-self: center;
    background: transparent;
    border: 0;
    display: none;
    flex-direction: column;
    gap: 0.3125rem;
    height: 2.75rem;
    justify-content: center;
    margin-right: 0.75rem;
    padding: 0;
    width: 2.75rem;
  }

  .menu-toggle span {
    background: var(--ec-white);
    border-radius: 999px;
    display: block;
    height: 0.1875rem;
    width: 1.5rem;
  }

  .menu-toggle:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .menu-toggle:active {
    transform: translateY(1px);
  }

  .search-layer {
    inset: 0;
    position: fixed;
    z-index: 100;
  }

  .search-scrim {
    background: rgba(12, 23, 29, 0.56);
    border: 0;
    inset: 0;
    position: absolute;
    width: 100%;
  }

  .search-dialog {
    background: var(--ec-white);
    border-radius: 8px;
    box-shadow: 0 1.5rem 4rem rgba(12, 23, 29, 0.28);
    display: grid;
    gap: 1.25rem;
    left: 50%;
    max-width: min(92vw, 34rem);
    padding: 1.25rem;
    position: absolute;
    top: 18vh;
    transform: translateX(-50%);
    width: 100%;
  }

  .search-dialog-header {
    align-items: center;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
  }

  .search-dialog h2 {
    color: var(--ec-navy);
    font-family: var(--ec-font-sans);
    font-size: 1.5rem;
    line-height: 1.2;
    margin: 0;
  }

  .search-close {
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: 6px;
    color: var(--ec-navy);
    display: inline-flex;
    height: 2.5rem;
    justify-content: center;
    width: 2.5rem;
  }

  .search-close:hover {
    background: var(--ec-surface);
  }

  .search-close:active {
    transform: translateY(1px);
  }

  .modal-search-form {
    display: grid;
    gap: 0.75rem;
  }

  .modal-search-form label {
    color: var(--ec-navy);
    font-family: var(--ec-font-sans);
    font-weight: 700;
  }

  .modal-search-form input {
    border: 1px solid var(--ec-border);
    border-radius: 6px;
    color: var(--ec-ink);
    min-height: 3rem;
    padding: 0.75rem 1rem;
    width: 100%;
  }

  .modal-search-form button {
    align-items: center;
    background: var(--ec-link);
    border: 2px solid transparent;
    border-radius: 6px;
    color: var(--ec-white);
    display: inline-flex;
    font-weight: 600;
    gap: 0.5rem;
    justify-content: center;
    justify-self: start;
    min-height: 2.875rem;
    padding: 0.75rem 1.125rem;
  }

  .modal-search-form button:hover {
    background: var(--ec-violet-dark);
  }

  .modal-search-form button:active {
    transform: translateY(1px);
  }

  .drawer-layer {
    inset: 0;
    position: fixed;
    z-index: 90;
  }

  .scrim {
    background: rgba(12, 23, 29, 0.5);
    border: 0;
    inset: 0;
    position: absolute;
    width: 100%;
  }

  .drawer {
    animation: slide-in 180ms ease-out;
    background: var(--ec-white);
    box-shadow: -1rem 0 2rem rgba(12, 23, 29, 0.2);
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-left: auto;
    max-width: 24rem;
    min-width: 18rem;
    overflow-y: auto;
    padding-bottom: 2rem;
    position: relative;
    width: min(88vw, 24rem);
  }

  @keyframes slide-in {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(0);
    }
  }

  .drawer-header {
    align-items: center;
    border-bottom: 1px solid var(--ec-border-soft);
    display: flex;
    justify-content: space-between;
    min-height: 4.5rem;
    padding: 1rem;
  }

  .drawer-logo {
    align-items: center;
    background: var(--ec-white);
    border: 1px solid var(--ec-border-soft);
    display: flex;
    min-height: 2.25rem;
    padding: 0.375rem 0.75rem;
  }

  .drawer-logo img {
    height: 1.5rem;
    width: auto;
  }

  .close-toggle {
    background: transparent;
    border: 0;
    height: 2.75rem;
    position: relative;
    width: 2.75rem;
  }

  .close-toggle span {
    background: var(--ec-navy);
    border-radius: 999px;
    display: block;
    height: 0.1875rem;
    left: 0.625rem;
    position: absolute;
    top: 1.3125rem;
    width: 1.5rem;
  }

  .close-toggle span:first-child {
    transform: rotate(45deg);
  }

  .close-toggle span:last-child {
    transform: rotate(-45deg);
  }

  .close-toggle:hover {
    background: var(--ec-surface);
  }

  .close-toggle:active {
    transform: translateY(1px);
  }

  .drawer-links {
    display: grid;
    gap: 0;
    padding: 0.5rem 0 1.5rem;
  }

  .drawer section {
    border-bottom: 1px solid var(--ec-border-soft);
    padding: 1rem;
  }

  .drawer section.active-section {
    border-left: 0.25rem solid var(--ec-teal-dark);
    padding-left: 0.75rem;
  }

  .section-label {
    align-items: center;
    color: var(--ec-navy);
    display: inline-flex;
    font-family: var(--ec-font-sans);
    font-size: 1.125rem;
    gap: 0.25rem;
    font-weight: 700;
    line-height: 1.3;
    text-decoration: none;
  }

  .drawer a:hover {
    color: var(--ec-teal-darker);
    text-decoration: underline;
    text-underline-offset: 0.1875rem;
  }

  .drawer ul {
    display: grid;
    gap: 0.625rem;
    list-style: none;
    margin: 0.75rem 0 0;
    padding: 0;
  }

  .drawer li a,
  .drawer li span {
    align-items: center;
    color: var(--ec-ink);
    display: inline-flex;
    font-family: var(--ec-font-sans);
    font-size: 1rem;
    gap: 0.25rem;
    line-height: 1.35;
    text-decoration: none;
  }

  .drawer li a.active,
  .drawer li span.active {
    color: var(--ec-teal-darker);
    font-weight: 700;
  }

  .drawer .disabled {
    color: var(--ec-ink-soft);
    cursor: not-allowed;
    opacity: 0.58;
  }

  @media (max-width: 760px) {
    nav {
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      width: auto;
    }

    .links {
      display: none;
    }

    .desktop-search {
      display: none;
    }

    .mobile-search {
      display: inline-flex;
    }

    .menu-toggle {
      display: flex;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .links a,
    .links span,
    .search-toggle,
    .search-close,
    .modal-search-form button,
    .menu-toggle,
    .close-toggle,
    .drawer {
      animation: none;
      transition: none;
    }
  }
</style>
