<script lang="ts">
	import Button from '$lib/components/site/Button.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import type { NewsletterBandContent } from '$lib/content/types';

	type Props = {
		content: NewsletterBandContent;
		headingId?: string;
		eyebrow?: string;
	};

	let {
		content,
		headingId = 'newsletter-heading',
		eyebrow = 'Newsletter'
	}: Props = $props();

	let isSignupDisabled = $derived(
		content.signupMode === 'directEmailSignup' || !content.cta.href || content.cta.href === '#'
	);
</script>

<section
	id="newsletter"
	class:teal={content.background === 'teal'}
	class="newsletter"
	aria-labelledby={headingId}
>
	<Container>
		<div class="newsletter-inner">
			<div>
				<p class="eyebrow">{eyebrow}</p>
				<h2 id={headingId}>{content.heading}</h2>
				<p>{content.description}</p>
				{#if content.note}
					<p class="newsletter-note">{content.note}</p>
				{/if}
			</div>

			<div class="newsletter-form">
				<Button
					href={content.cta.href}
					target={content.cta.target}
					rel={content.cta.rel}
					download={content.cta.download}
					label={content.cta.label}
					variant={content.cta.variant ?? 'gold'}
					disabled={isSignupDisabled}
				/>
			</div>
		</div>
	</Container>
</section>

<style>
	.newsletter {
		background: var(--ec-navy);
		padding-block: 3.5rem;
	}

	.newsletter.teal {
		background: var(--ec-teal-darker);
	}

	.newsletter-inner {
		align-items: center;
		display: grid;
		gap: 5rem;
		grid-template-columns: minmax(0, 1fr) auto;
		padding-block: 2rem;
	}

	.newsletter .eyebrow {
		color: var(--ec-teal-soft);
	}

	.newsletter h2,
	.newsletter p {
		color: var(--ec-white);
	}

	.newsletter h2 {
		margin-bottom: 0.75rem;
	}

	.newsletter p {
		color: rgba(255, 255, 255, 0.86);
		max-width: 43rem;
	}

	.newsletter .newsletter-note {
		color: rgba(255, 255, 255, 0.72);
		font-size: 0.875rem;
		margin-top: 0.875rem;
	}

	.newsletter-form {
		display: grid;
		gap: 0.625rem;
		justify-items: start;
		min-width: 0;
	}

	@media (max-width: 760px) {
		.newsletter {
			padding-block: 3rem;
		}

		.newsletter-inner {
			grid-template-columns: 1fr;
		}

		.newsletter-form {
			justify-items: stretch;
			width: 100%;
		}
	}
</style>
