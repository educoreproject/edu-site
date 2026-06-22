<script lang="ts">
	import { isExternalLink } from '$lib/content/links';
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
	<Container width="full-bleed">
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
				{#each chrome.sections as section}
					<section aria-labelledby={`footer-${section.key}`}>
						<h2 id={`footer-${section.key}`}>{section.label}</h2>

						<ul>
							{#each section.children as link}
								{@const isExternal = isExternalLink(link.href)}
								{@const target = link.target ?? (isExternal ? '_blank' : undefined)}
								{@const rel = link.rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
								<li>
									{#if link.disabled || !link.href}
										<span aria-disabled="true">{link.label}</span>
									{:else}
										<a
											href={link.href}
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
		background: var(--ec-footer-navy);
		padding-block: 5rem 1.25rem;
	}

	.footer-layout {
		display: flex;
		/* flex-wrap: wrap; */
		gap: 3rem;
		justify-content: space-between;
	}

	.brand {
		flex: 0 0 15rem;
	}

	.logo {
		align-items: center;
		background: var(--ec-white);
		border-radius: 4px;
		display: flex;
		height: 2.5rem;
		justify-content: center;
		margin-bottom: 1rem;
		width: 5.0625rem;
	}

	.logo img {
		filter: none;
		height: 1.375rem;
		width: auto;
	}

	p {
		color: rgba(255, 255, 255, 0.86);
		font-family: var(--ec-font-sans);
		font-size: .875rem;
		line-height: 1.55;
		margin: 0 0 2.25rem;
	}

	.legal {
		border-top: 1px solid rgba(255, 255, 255, 0.36);
		color: rgba(255, 255, 255, 0.86);
		font-family: var(--ec-font-sans);
		font-size: .875rem;
		line-height: 1.7;
		padding-top: 2.5rem;
	}

	.legal div {
		color: var(--ec-white);
		font-weight: 600;
	}

	.columns {
		display: flex;
		flex-wrap: wrap;
		gap: 2.5rem;
	}

	section {
		min-width: 7.5rem;
	}

	h2 {
		color: rgba(255, 255, 255, 0.74);
		font-family: var(--ec-font-sans);
		font-size: 1rem;
		font-weight: 600;
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
	li > span[aria-disabled="true"] {
		font-family: var(--ec-font-sans);
		font-size: .875rem;
		line-height: 1.35;
	}

	a {
		align-items: center;
		color: var(--ec-teal-muted);
		display: inline-flex;
		gap: 0.25rem;
		text-decoration: none;
	}

	a i {
		font-size: 0.875rem;
		color: currentColor;
	}

	a:hover {
		color: var(--ec-white);
		text-decoration: underline;
		text-underline-offset: 0.1875rem;
	}

	li > span[aria-disabled="true"] {
		color: rgba(255, 255, 255, 0.48);
		cursor: not-allowed;
		opacity: 0.65;
	}

	@media (max-width: 620px) {
		
		.columns {
			gap: 2rem;
			display:grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.footer-layout {
			flex-direction: column-reverse;
			gap:4rem;
		}

		.brand,
		.columns {
			flex-basis: 100%;
		}
	}
</style>
