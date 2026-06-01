<script lang="ts">
	import type { SiteChrome } from '$lib/content/types';
	import Container from './Container.svelte';

	type Props = {
		chrome: SiteChrome;
		blurb?: string;
		copyright?: string;
	};

	let {
		chrome,
		blurb = 'Connecting the ecosystem of education data standards.',
		copyright = 'All rights reserved · © 2026'
	}: Props = $props();
</script>

<footer>
	<Container>
		<div class="footer-layout">
			<div class="brand">
				<div class="logo" aria-hidden="true">
					<img src="/assets/educore-logo.png" alt="" />
				</div>

				<p>{blurb}</p>

				<div class="legal">
					<div>Data Standards United</div>
					<span>{copyright}</span>
				</div>
			</div>

			<div class="columns" aria-label="Footer navigation">
				{#each chrome.footerColumns as column}
					<section aria-labelledby={`footer-${column.heading.toLowerCase().replaceAll(' ', '-')}`}>
						<h2 id={`footer-${column.heading.toLowerCase().replaceAll(' ', '-')}`}>{column.heading}</h2>

						<ul>
							{#each column.links as link}
								<li>
									{#if link.disabled}
										<span aria-disabled="true">{link.label}</span>
									{:else}
										<a href={link.href}>{link.label}</a>
									{/if}
								</li>
							{/each}
						</ul>
					</section>
				{/each}
			</div>
		</div>
	</Container>
</footer>

<style>
	footer {
		background: var(--ec-white);
		border-top: 1px solid var(--ec-border);
		padding-block: 3rem 2.5rem;
	}

	.footer-layout {
		display: flex;
		flex-wrap: wrap;
		gap: 3rem;
	}

	.brand {
		flex: 0 0 15rem;
	}

	.logo {
		align-items: center;
		background: var(--ec-navy);
		border-radius: 4px;
		display: flex;
		height: 3rem;
		justify-content: center;
		margin-bottom: 0.875rem;
		width: 3rem;
	}

	.logo img {
		filter: brightness(0) invert(1);
		height: 1.125rem;
		width: auto;
	}

	p {
		color: var(--ec-ink-soft);
		font-family: var(--ec-font-sans);
		font-size: 0.8125rem;
		line-height: 1.55;
		margin: 0 0 1rem;
	}

	.legal {
		border-top: 1px solid var(--ec-border);
		color: var(--ec-ink-soft);
		font-family: var(--ec-font-sans);
		font-size: 0.75rem;
		line-height: 1.7;
		padding-top: 0.875rem;
	}

	.legal div {
		color: var(--ec-navy);
		font-weight: 600;
	}

	.columns {
		display: flex;
		flex: 1 1 34rem;
		flex-wrap: wrap;
		gap: 2.5rem;
	}

	section {
		min-width: 7.5rem;
	}

	h2 {
		color: var(--ec-border);
		font-family: var(--ec-font-sans);
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		line-height: 1.25;
		margin: 0 0 0.875rem;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5625rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	a,
	li span {
		font-family: var(--ec-font-sans);
		font-size: 0.875rem;
		line-height: 1.35;
	}

	a {
		color: var(--ec-link);
		text-decoration: none;
	}

	a:hover {
		color: var(--ec-navy);
		text-decoration: underline;
		text-underline-offset: 0.1875rem;
	}

	li span {
		color: var(--ec-ink-soft);
		cursor: not-allowed;
		opacity: 0.65;
	}

	@media (max-width: 620px) {
		.footer-layout,
		.columns {
			gap: 2rem;
		}

		.brand,
		.columns {
			flex-basis: 100%;
		}
	}
</style>
