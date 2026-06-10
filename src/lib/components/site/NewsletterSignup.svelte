<script lang="ts">
	import Container from '$lib/components/site/Container.svelte';
	import type { NewsletterBandContent } from '$lib/content/types';

	type Props = {
		content: NewsletterBandContent;
		emailId: string;
		headingId?: string;
		eyebrow?: string;
	};

	let {
		content,
		emailId,
		headingId = 'newsletter-heading',
		eyebrow = 'Newsletter'
	}: Props = $props();
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

			<form class="newsletter-form" onsubmit={(event) => event.preventDefault()}>
				<!-- <label for={emailId}>Email address</label> -->
				<div class="form-row">
					<!-- <input
						id={emailId}
						name="email"
						type="email"
						autocomplete="email"
						placeholder={content.emailPlaceholder}
					/> -->
					<button type="submit">{content.ctaLabel}</button>
				</div>
			</form>
		</div>
	</Container>
</section>

<style>
	label,
	input,
	button {
		font-family: var(--ec-font-sans);
	}

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
		gap: 2rem;
		grid-template-columns: minmax(0, 1fr) minmax(18rem, 28rem);
	}

	.newsletter .eyebrow {
		color: var(--ec-teal-soft);
	}

	.newsletter h2,
	.newsletter p,
	.newsletter label {
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
		min-width: 0;
	}

	.newsletter-form label {
		font-size: 0.875rem;
		font-weight: 700;
		line-height: 1.3;
	}

	.form-row {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: minmax(0, 1fr) auto;
	}

	input {
		border: 1px solid transparent;
		border-radius: 6px;
		color: var(--ec-ink);
		min-width: 0;
		padding: 0.8125rem 0.875rem;
		width: 100%;
	}

	button {
		background: var(--ec-gold);
		border: 0;
		border-radius: 6px;
		color: var(--ec-navy-deep);
		cursor: pointer;
		font-weight: 700;
		line-height: 1.2;
		padding: 0.8125rem 1rem;
		white-space: nowrap;
	}

	@media (max-width: 760px) {
		.newsletter {
			padding-block: 3rem;
		}

		.newsletter-inner,
		.form-row {
			grid-template-columns: 1fr;
		}

		button {
			width: 100%;
		}
	}
</style>
