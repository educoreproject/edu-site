<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HeroContent } from '$lib/content/types';
	import Button from './Button.svelte';
	import Container from './Container.svelte';

	type Props = {
		content: HeroContent;
		background?: 'navy' | 'teal' | 'violet';
		compact?: boolean;
		titleId?: string;
		children?: Snippet;
	};

	const uid = $props.id();
	let { content, background = 'navy', compact = false, titleId = `${uid}-title`, children }: Props = $props();
</script>

<section class:compact class:teal={background === 'teal'} class:violet={background === 'violet'} aria-labelledby={titleId}>
	<div class="globe" aria-hidden="true">
		<span class="ring ring-one"></span>
		<span class="ring ring-two"></span>
		<span class="ring ring-three"></span>
		<span class="axis axis-vertical"></span>
		<span class="axis axis-horizontal"></span>
	</div>

	<Container>
		<div class="hero-content">
			{#if content.chip}
				<div class="chip">
					<span aria-hidden="true"></span>
					{content.chip}
				</div>
			{/if}

			<h1 id={titleId}>{content.title}</h1>

			{#if content.description}
				<p>{content.description}</p>
			{/if}

			{#if content.ctas?.length}
				<div class="actions" aria-label="Hero actions">
					{#each content.ctas as cta}
						<Button href={cta.href} label={cta.label} variant={cta.variant} onDark />
					{/each}
				</div>
			{/if}

			{#if children}
				<div class="supplement">
					{@render children()}
				</div>
			{/if}
		</div>
	</Container>
</section>

<style>
	section {
		background: var(--ec-navy);
		min-height: 18.75rem;
		overflow: hidden;
		position: relative;
	}

	section.teal {
		background: var(--ec-teal-darker);
	}

	section.violet {
		background: var(--ec-violet);
	}

	section.compact {
		min-height: 10.4375rem;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		justify-content: center;
		min-height: 18.75rem;
		padding-block: 2.25rem;
		position: relative;
		z-index: 1;
	}

	.compact .hero-content {
		min-height: 10.4375rem;
	}

	.chip {
		align-items: center;
		align-self: flex-start;
		background: var(--ec-navy-deep);
		border-radius: 6px;
		color: var(--ec-teal-soft);
		display: inline-flex;
		font-family: var(--ec-font-sans);
		font-size: 0.8125rem;
		font-weight: 600;
		gap: 0.375rem;
		line-height: 1.2;
		padding: 0.25rem 0.625rem;
	}

	.chip span {
		background: var(--ec-teal);
		border-radius: 999px;
		height: 0.5rem;
		width: 0.5rem;
	}

	h1 {
		color: var(--ec-white);
		font-family: var(--ec-font-sans);
		font-size: clamp(2.25rem, 5vw, 3rem);
		font-weight: 700;
		line-height: 1.15;
		margin: 0;
		max-width: 58rem;
		text-wrap: pretty;
	}

	p {
		color: rgba(255, 255, 255, 0.92);
		font-family: var(--ec-font-sans);
		font-size: 1rem;
		line-height: 1.5;
		margin: 0;
		max-width: 45rem;
	}

	.actions,
	.supplement {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.globe {
		aspect-ratio: 1;
		left: -5.625rem;
		opacity: 0.18;
		pointer-events: none;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: min(38.75rem, 90vw);
	}

	.ring,
	.axis {
		border-color: rgba(255, 255, 255, 0.72);
		position: absolute;
	}

	.ring {
		border-style: solid;
		border-width: 1.5px;
		border-radius: 999px;
		inset: 0;
	}

	.ring-two {
		left: 20%;
		right: 20%;
	}

	.ring-three {
		left: 36%;
		right: 36%;
	}

	.axis-vertical {
		border-left-style: solid;
		border-left-width: 1.5px;
		bottom: 0;
		left: 50%;
		top: 0;
	}

	.axis-horizontal {
		border-top-style: solid;
		border-top-width: 1.5px;
		left: 0;
		right: 0;
		top: 50%;
	}

	@media (max-width: 640px) {
		.hero-content {
			min-height: 16rem;
			padding-block: 2rem;
		}

		.actions,
		.supplement {
			align-items: stretch;
			flex-direction: column;
			width: 100%;
		}
	}
</style>
