<script lang="ts">
	import Button from '$lib/components/site/Button.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import type { Cta } from '$lib/content/types';

	export type JoinCtaContent = {
		eyebrow?: string;
		heading: string;
		description: string;
		cta: Cta;
	};

	type Props = {
		content: JoinCtaContent;
		headingId?: string;
	};

	let { content, headingId = 'join-cta-heading' }: Props = $props();
</script>

<section class="join-cta" aria-labelledby={headingId}>
	<Container>
		<div class="join-panel">
			<div>
				{#if content.eyebrow}
					<p class="eyebrow">{content.eyebrow}</p>
				{/if}
				<h2 id={headingId}>{content.heading}</h2>
				<p>{content.description}</p>
			</div>

			<Button
				href={content.cta.href}
				label={content.cta.label}
				variant={content.cta.variant}
				onDark
			/>
		</div>
	</Container>
</section>

<style>
	.join-cta {
		background: var(--ec-navy);
		padding-block: 3.5rem;
	}

	.join-panel {
		align-items: center;
		display: grid;
		gap: 5rem;
		grid-template-columns: minmax(0, 1fr) auto;
		padding-block: 2rem;
	}

	.eyebrow {
		color: var(--ec-teal-soft);
		font-family: var(--ec-font-sans);
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0;
		line-height: 1.2;
		margin: 0 0 0.625rem;
		text-transform: uppercase;
	}

	h2,
	p {
		color: var(--ec-white);
		font-family: var(--ec-font-sans);
	}

	h2 {
		font-size: clamp(1.875rem, 4vw, 2.25rem);
		line-height: 1.16;
		margin: 0;
		text-wrap: pretty;
	}

	p {
		font-size: 1rem;
		line-height: 1.58;
		margin: 0;
		text-wrap: pretty;
	}

	p:not(.eyebrow) {
		color: rgba(255, 255, 255, 0.86);
		margin-top: 0.75rem;
		max-width: 43rem;
	}

	@media (max-width: 760px) {
		.join-cta {
			padding-block: 3rem;
		}

		.join-panel {
			align-items: start;
			gap: 2rem;
			grid-template-columns: 1fr;
		}
	}
</style>
