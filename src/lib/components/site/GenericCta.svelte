<script lang="ts">
	import Button from '$lib/components/site/Button.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import type { GenericSharedCtaContent } from '$lib/content/types';

	type Props = {
		content: GenericSharedCtaContent;
		headingId?: string;
	};

	let { content, headingId = 'generic-cta-heading' }: Props = $props();
</script>

<section
	class:teal={content.background === 'teal'}
	class="generic-cta"
	aria-labelledby={headingId}
>
	<Container>
		<div class="generic-cta-panel">
			<div>
				{#if content.eyebrow}
					<p class="eyebrow">{content.eyebrow}</p>
				{/if}
				<h2 id={headingId}>{content.heading}</h2>
				<p>{content.description}</p>
			</div>

			<Button
				href={content.cta.href}
				target={content.cta.target}
				rel={content.cta.rel}
				download={content.cta.download}
				label={content.cta.label}
				variant={content.cta.variant}
				onDark
				disabled={!content.cta.href || content.cta.href === '#'}
			/>
		</div>
	</Container>
</section>

<style>
	.generic-cta {
		background: var(--ec-navy);
		padding-block: 3.5rem;
	}

	.generic-cta.teal {
		background: var(--ec-teal-darker);
	}

	.generic-cta-panel {
		align-items: center;
		display: grid;
		gap: 5rem;
		grid-template-columns: minmax(0, 1fr) auto;
		padding-block: 2rem;
	}

	.eyebrow {
		color: var(--ec-teal-soft);
	}

	h2,
	p {
		color: var(--ec-white);
		font-family: var(--ec-font-sans);
	}

	h2 {
		margin-bottom: 0.75rem;
	}

	p:not(.eyebrow) {
		color: rgba(255, 255, 255, 0.86);
		max-width: 43rem;
	}

	@media (max-width: 760px) {
		.generic-cta {
			padding-block: 3rem;
		}

		.generic-cta-panel {
			align-items: start;
			gap: 2rem;
			grid-template-columns: 1fr;
		}
	}
</style>
