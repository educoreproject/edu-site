<script lang="ts">
	import type { LinkItem } from '$lib/content/types';
	import Container from './Container.svelte';

	type Props = {
		crumb: string;
		links: LinkItem[];
		active?: LinkItem['label'];
	};

	let { crumb, links, active }: Props = $props();
</script>

<nav aria-label="{crumb} navigation">
	<Container>
		<div class="inner">
			<div class="crumb" aria-hidden="true">
				<span>{crumb}</span>
				<span class="chevron">›</span>
			</div>

			<div class="links">
				{#each links as link}
					{@const isActive = link.label === active}
					{#if link.disabled}
						<span class:active={isActive} class="disabled" aria-disabled="true">{link.label}</span>
					{:else}
						<a class:active={isActive} href={link.href} aria-current={isActive ? 'page' : undefined}>{link.label}</a>
					{/if}
				{/each}
			</div>
		</div>
	</Container>
</nav>

<style>
	nav {
		align-items: center;
		background: var(--ec-subnav);
		display: flex;
		min-height: 3.0625rem;
	}

	.inner {
		align-items: center;
		display: flex;
		gap: 1.5rem;
		justify-content: space-between;
		width: 100%;
	}

	.crumb {
		align-items: center;
		display: flex;
		flex: 0 0 auto;
		gap: 0.375rem;
	}

	.crumb span:first-child {
		color: #6da2ff;
		font-family: var(--ec-font-sans);
		font-size: 0.875rem;
		font-weight: 700;
		line-height: 1.3;
	}

	.chevron {
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.8125rem;
	}

	.links {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
		justify-content: flex-end;
	}

	.links a,
	.links span {
		border-bottom: 2px solid transparent;
		color: rgba(255, 255, 255, 0.72);
		font-family: var(--ec-font-sans);
		font-size: 0.875rem;
		line-height: 1.3;
		padding-block: 0.125rem;
		text-decoration: none;
	}

	.links a {
		cursor: pointer;
	}

	.links a:hover {
		color: var(--ec-white);
	}

	.links .active {
		border-bottom-color: var(--ec-white);
		color: var(--ec-white);
		font-weight: 700;
	}

	.links .disabled {
		cursor: not-allowed;
		opacity: 0.55;
	}

	@media (max-width: 720px) {
		.inner {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.625rem;
			padding-block: 0.75rem;
		}

		.links {
			gap: 1rem;
			justify-content: flex-start;
		}
	}
</style>
