<script lang="ts">
	import type { LinkItem } from '$lib/content/types';

	type Props = {
		links: LinkItem[];
		activeSection?: LinkItem['label'];
		logoHref?: string;
	};

	let { links, activeSection, logoHref = '/' }: Props = $props();
</script>

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
</nav>

<style>
	nav {
		align-items: stretch;
		background: var(--ec-white);
		border-bottom: 1px solid var(--ec-border-soft);
		display: flex;
		min-height: 3.8125rem;
		position: sticky;
		top: 0;
		z-index: 50;
	}

	.logo {
		align-items: center;
		background: var(--ec-navy);
		display: flex;
		flex: 0 0 3.8125rem;
		justify-content: center;
		min-height: 3.8125rem;
		width: 3.8125rem;
	}

	.logo img {
		filter: brightness(0) invert(1);
		height: 1.375rem;
		width: auto;
	}

	.links {
		align-items: center;
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: flex-end;
		padding: 0.5rem clamp(1.25rem, 10vw, 8rem) 0.5rem 1rem;
	}

	.links a,
	.links span {
		border: 1px solid transparent;
		border-radius: 4px;
		color: var(--ec-navy);
		display: inline-flex;
		font-family: var(--ec-font-sans);
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.2;
		padding: 0.4375rem 0.8125rem;
		text-decoration: none;
		transition:
			background-color 120ms ease,
			color 120ms ease,
			transform 120ms ease;
	}

	.links a {
		cursor: pointer;
	}

	.links a:hover {
		background: var(--ec-surface);
		color: var(--ec-navy);
		transform: translateY(-1px);
	}

	.links a:active {
		transform: translateY(1px);
	}

	.links .active {
		background: var(--ec-navy);
		border-color: var(--ec-navy);
		color: var(--ec-white);
		font-weight: 700;
	}

	.links .disabled {
		color: var(--ec-ink-soft);
		cursor: not-allowed;
		opacity: 0.58;
	}

	@media (max-width: 760px) {
		nav {
			position: static;
		}

		.links {
			justify-content: flex-start;
			overflow-x: auto;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.links a,
		.links span {
			transition: none;
		}
	}
</style>
