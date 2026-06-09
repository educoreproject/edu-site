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
			<div class="crumb">
				<span>{crumb}</span>
				<i class="ti ti-chevron-right" aria-hidden="true"></i>
				{#if active}
					<span class="current">{active}</span>
				{/if}
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
		max-width: 1280px;
	}

	.crumb {
		align-items: center;
		display: flex;
		flex: 0 0 auto;
		gap: 0.375rem;
	}

	.crumb span:first-child, .current {
		color: var(--ec-teal-dark);
		font-family: var(--ec-font-sans);
		font-size: .875rem;
		font-weight: 500;
		line-height: 1.3;
		cursor: pointer;
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

	.links a,
	.links span {
		border-bottom: 2px solid transparent;
		color: var(--ec-teal-dark);
		font-family: var(--ec-font-sans);
		font-size: .875rem;
		font-weight: 500;
		line-height: 1.3;
		padding-block: 0.125rem;
		text-decoration: none;
	}

	.links a {
		cursor: pointer;
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

		.crumb span:first-child,
		.current {
			font-size: 1rem;
		}
	}
</style>
