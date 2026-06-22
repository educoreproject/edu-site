<script lang="ts">
	import Button from '$lib/components/site/Button.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PageCtas from '$lib/components/site/PageCtas.svelte';
	import SectionChrome from '$lib/components/site/SectionChrome.svelte';
	import type { ContactPage, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: ContactPage;
			chrome: SiteChrome;
		};
	};

	let { data }: Props = $props();
	let page = $derived(data.page);
	let chrome = $derived(data.chrome);
	let selectedRecipientEmail = $state('');
	let selectedRecipient = $derived(
		page.recipientOptions.find((recipient) => recipient.email === selectedRecipientEmail) ??
			page.recipientOptions[0]
	);
	let contactAction = $derived(
		selectedRecipient
			? `mailto:${selectedRecipient.email}?subject=${encodeURIComponent(
					`Contact request for ${selectedRecipient.label}`
				)}`
			: '#'
	);

	$effect(() => {
		if (page.recipientOptions.some((recipient) => recipient.email === selectedRecipientEmail)) {
			return;
		}

		selectedRecipientEmail = page.recipientOptions[0]?.email ?? '';
	});

	function getInputType(type: string | undefined) {
		return type === 'email' ? 'email' : 'text';
	}
</script>

<svelte:head>
	<title>{page.hero.title}</title>
	<meta
		name="description"
		content={page.hero.description ?? 'Contact Data Standards United.'}
	/>
</svelte:head>

<SectionChrome {chrome} routeKey="contact" />

<main>
	<Hero content={page.hero} icon="mail" />

	<section class="section section-padded" aria-labelledby="contact-heading">
		<Container>
			<div class="contact-layout">
				<form
					aria-labelledby="contact-heading"
					action={contactAction}
					method="post"
					enctype="text/plain"
				>
					<div class="form-header">
						<p class="eyebrow">{page.hero.chip}</p>
						<h2 id="contact-heading">{page.hero.title}</h2>
					</div>

					<div class="field-grid">
						<div class="field full">
							<label for="contact-recipient">Organization</label>
							<select
								id="contact-recipient"
								name="recipient"
								bind:value={selectedRecipientEmail}
								required
							>
								{#each page.recipientOptions as recipient}
									<option value={recipient.email}>{recipient.label}</option>
								{/each}
							</select>
						</div>

						{#each page.fields as field}
							<div class="field" class:full={field.full || field.type === 'textarea'}>
								<label for={`contact-${field.name}`}>{field.label}</label>
								{#if field.type === 'textarea'}
									<textarea
										id={`contact-${field.name}`}
										name={field.name}
										placeholder={field.placeholder}
										required={field.required}
									></textarea>
								{:else}
									<input
										id={`contact-${field.name}`}
										name={field.name}
										type={getInputType(field.type)}
										placeholder={field.placeholder}
										required={field.required}
									/>
								{/if}
							</div>
						{/each}
					</div>

					<Button
						type="submit"
						label="Send message"
						variant="primary"
						disabled={!page.recipientOptions.length}
					/>
				</form>

				<aside class="side-panel" aria-label="Contact options">
					<article class="info-card">
						{#if page.directCard.eyebrow}
							<p class="eyebrow">{page.directCard.eyebrow}</p>
						{/if}
						<h3>{page.directCard.heading}</h3>
						{#if page.directCard.text}
							<p>{page.directCard.text}</p>
						{/if}
						{#if page.directCard.email}
							<a href={`mailto:${page.directCard.email}`}>{page.directCard.email}</a>
						{/if}
						{#if page.directCard.cta}
							<Button
								href={page.directCard.cta.href}
								target={page.directCard.cta.target}
								rel={page.directCard.cta.rel}
								download={page.directCard.cta.download}
								label={page.directCard.cta.label}
								variant={page.directCard.cta.variant}
							/>
						{/if}
					</article>

					<article class="info-card">
						{#if page.collaborativeCard.eyebrow}
							<p class="eyebrow">{page.collaborativeCard.eyebrow}</p>
						{/if}
						<h3>{page.collaborativeCard.heading}</h3>
						{#if page.collaborativeCard.text}
							<p>{page.collaborativeCard.text}</p>
						{/if}
						{#if page.collaborativeCard.email}
							<a href={`mailto:${page.collaborativeCard.email}`}>{page.collaborativeCard.email}</a>
						{/if}
						{#if page.collaborativeCard.cta}
							<Button
								href={page.collaborativeCard.cta.href}
								target={page.collaborativeCard.cta.target}
								rel={page.collaborativeCard.cta.rel}
								download={page.collaborativeCard.cta.download}
								label={page.collaborativeCard.cta.label}
								variant={page.collaborativeCard.cta.variant}
							/>
						{/if}
					</article>
				</aside>
			</div>
		</Container>
	</section>

	<PageCtas ctas={page.ctas} />
</main>

<PageFooter {chrome} />

<style>
	.contact-layout {
		align-items: start;
		display: grid;
		gap: 1.5rem;
		grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.42fr);
	}

	form,
	.info-card {
		background: var(--ec-white);
		border: 1px solid var(--ec-border-soft);
		border-radius: 8px;
		min-width: 0;
		padding: 1.5rem;
	}

	form {
		display: grid;
		gap: 1.5rem;
	}

	.form-header {
		max-width: 42rem;
	}

	h3,
	a,
	label,
	input,
	select,
	textarea {
		font-family: var(--ec-font-sans);
	}

	h3 {
		color: var(--ec-navy);
		font-size: 1.125rem;
		line-height: 1.3;
		margin: 0;
		text-wrap: pretty;
	}

	.field-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.field {
		display: grid;
		gap: 0.5rem;
		min-width: 0;
	}

	.field.full {
		grid-column: 1 / -1;
	}

	label {
		color: var(--ec-navy);
		font-size: 0.9375rem;
		font-weight: 700;
		line-height: 1.3;
	}

	input,
	select,
	textarea {
		background: var(--ec-white);
		border: 1px solid var(--ec-border);
		border-radius: 4px;
		color: var(--ec-ink);
		font-size: 1rem;
		line-height: 1.4;
		min-width: 0;
		padding: 0.75rem 0.875rem;
		width: 100%;
	}

	textarea {
		min-height: 10rem;
		resize: vertical;
	}

	input::placeholder,
	textarea::placeholder {
		color: var(--ec-ink-soft);
		opacity: 0.72;
	}

	select {
		cursor: pointer;
	}

	.side-panel {
		display: grid;
		gap: 1rem;
		min-width: 0;
	}

	.info-card {
		display: grid;
		gap: 0.875rem;
	}

	.info-card a {
		overflow-wrap: anywhere;
		text-decoration: none;
	}

	.info-card a:hover {
		text-decoration: underline;
		text-underline-offset: 0.1875rem;
	}

	.info-card :global(a) {
		justify-self: start;
	}

	@media (max-width: 760px) {
		.contact-layout,
		.field-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 420px) {
		form,
		.info-card {
			padding: 1.125rem;
		}
	}
</style>
