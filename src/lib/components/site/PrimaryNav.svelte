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
		background: var(--ec-chrome-navy);
		display: flex;
		min-height: 5.875rem;
		position: sticky;
		top: 0;
		z-index: 50;
	}

	.logo {
		align-items: center;
		background: transparent;
		display: flex;
		flex: 0 0 auto;
		justify-content: flex-start;
		min-height: 5.875rem;
		padding-left: clamp(1.25rem, 12vw, 10.25rem);
		width: clamp(10rem, 32vw, 38rem);
	}

	.logo img {
		background: var(--ec-white);
		border: 1px solid rgba(255, 255, 255, 0.2);
		filter: none;
		height: 2.5rem;
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
		font-size: 1.375rem;
		font-weight: 500;
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
		font-weight: 700;
	}

	.links .disabled {
		color: rgba(255, 255, 255, 0.5);
		cursor: not-allowed;
		opacity: 0.58;
	}

	@media (max-width: 760px) {
		nav {
			flex-direction: column;
			position: static;
		}

		.logo {
			min-height: 4.5rem;
			padding-left: 1rem;
			width: 100%;
		}

		.logo img {
			height: 2.25rem;
		}

		.links {
			justify-content: flex-start;
			overflow-x: auto;
			padding: 0 1rem 1rem;
			flex-wrap: nowrap;
		}

		.links a,
		.links span {
			font-size: 1rem;
			white-space: nowrap;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.links a,
		.links span {
			transition: none;
		}
	}
</style>
