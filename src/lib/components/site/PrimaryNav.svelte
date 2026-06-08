<script lang="ts">
	import type { FooterColumn, LinkItem } from '$lib/content/types';

	type Props = {
		links: LinkItem[];
		activeSection?: LinkItem['label'];
		activeSubSection?: LinkItem['label'];
		footerColumns?: FooterColumn[];
		logoHref?: string;
	};

	const uid = $props.id();
	let {
		links,
		activeSection,
		activeSubSection,
		footerColumns = [],
		logoHref = '/'
	}: Props = $props();

	let menuOpen = $state(false);
	const panelId = `${uid}-mobile-menu`;

	const normalizeLabel = (value: string) => value.toLowerCase().replace(/^about\s+/, '').trim();

	const navSections = $derived(
		links.map((link) => {
			const column = footerColumns.find(
				(item) => normalizeLabel(item.heading) === normalizeLabel(link.label)
			);

			return {
				link,
				children: column?.links ?? []
			};
		})
	);

	function openMenu() {
		menuOpen = true;
	}

	function closeMenu() {
		menuOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeMenu();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<nav aria-label="Primary navigation">
	<a class="logo" href={logoHref} aria-label="EDUcore home">
		<img src="/assets/educore-logo.png" alt="EDU" />
	</a>

	<div class="links">
		{#each links as link}
			{@const active = link.label === activeSection}
			{#if link.disabled}
				<span class:active class="disabled" aria-disabled="true">{link.label}</span>
			{:else}
				<a class:active href={link.href} aria-current={active ? 'page' : undefined}>{link.label}</a>
			{/if}
		{/each}
	</div>

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

{#if menuOpen}
	<div class="drawer-layer">
		<button class="scrim" type="button" aria-label="Close menu" onclick={closeMenu}></button>

		<div id={panelId} class="drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
			<div class="drawer-header">
				<a class="drawer-logo" href={logoHref} aria-label="EDUcore home" onclick={closeMenu}>
					<img src="/assets/educore-logo.png" alt="EDU" />
				</a>

				<button class="close-toggle" type="button" aria-label="Close menu" onclick={closeMenu}>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</button>
			</div>

			<div class="drawer-links">
				{#each navSections as section}
					{@const sectionActive = section.link.label === activeSection}
					<section class:active-section={sectionActive}>
						{#if section.link.disabled}
							<span class="section-label disabled" aria-disabled="true">{section.link.label}</span>
						{:else}
							<a
								class="section-label"
								href={section.link.href}
								aria-current={sectionActive && !activeSubSection ? 'page' : undefined}
								onclick={closeMenu}>{section.link.label}</a
							>
						{/if}

						{#if section.children.length}
							<ul>
								{#each section.children as child}
									{@const childActive = sectionActive && child.label === activeSubSection}
									<li>
										{#if child.disabled}
											<span class:active={childActive} class="disabled" aria-disabled="true">{child.label}</span>
										{:else}
											<a
												class:active={childActive}
												href={child.href}
												aria-current={childActive ? 'page' : undefined}
												onclick={closeMenu}>{child.label}</a
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
		align-items: center;
		background: transparent;
		display: flex;
		flex: 0 0 auto;
		justify-content: flex-start;
		min-height: 2rem;
		padding-left: clamp(1.25rem, 12vw, 10.25rem);
		width: clamp(10rem, 32vw, 38rem);
	}

	.logo img {
		background: var(--ec-white);
		border: 1px solid rgba(255, 255, 255, 0.2);
		filter: none;
		height: 1.5rem;
		padding: 0.5rem 0.875rem;
		width: auto;
	}

	.links {
		align-items: center;
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		gap: clamp(1rem, 2vw, 2rem);
		justify-content: flex-end;
		padding: 1rem clamp(1.25rem, 10vw, 8.5rem) 1rem 1rem;
	}

	.links a,
	.links span {
		border-bottom: 3px solid transparent;
		color: rgba(255, 255, 255, 0.88);
		display: inline-flex;
		font-family: var(--ec-font-sans);
		font-size: .875rem;
		font-weight: 400;
		line-height: 1.2;
		padding: 0.25rem 0 0.5rem;
		text-decoration: none;
		transition:
			border-color 120ms ease,
			color 120ms ease,
			transform 120ms ease;
	}

	.links a {
		cursor: pointer;
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
		color: var(--ec-navy);
		display: inline-flex;
		font-family: var(--ec-font-sans);
		font-size: 1.125rem;
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
		color: var(--ec-ink);
		display: inline-flex;
		font-family: var(--ec-font-sans);
		font-size: 1rem;
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
			height: 4.5rem;
			justify-content: space-between;
		}

		.logo {
			min-height: 4.5rem;
			padding-left: 1rem;
			width: auto;
		}

		.logo img {
			height: 1.75rem;
		}

		.links {
			display: none;
		}

		.menu-toggle {
			display: flex;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.links a,
		.links span,
		.menu-toggle,
		.close-toggle,
		.drawer {
			animation: none;
			transition: none;
		}
	}
</style>
