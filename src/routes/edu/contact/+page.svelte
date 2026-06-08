<script lang="ts">
	import Button from '$lib/components/site/Button.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { EduContactPage, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: EduContactPage;
			chrome: SiteChrome;
		};
	};

	let { data }: Props = $props();
	let page = $derived(data.page);
	let chrome = $derived(data.chrome);

	function getInputType(type: string | undefined) {
		return type === 'email' ? 'email' : 'text';
	}
</script>

<svelte:head>
	<title>{page.hero.title}</title>
	<meta
		name="description"
		content={page.hero.description ?? 'Contact Education Data Unlimited.'}
	/>
</svelte:head>

<PrimaryNav links={chrome.primaryNav} activeSection={page.activeSection} />
<SubNav crumb="EDU" links={page.subNav} active="Contact" />

<main>
	<Hero content={page.hero} compact />

	<section class="section section-padded" aria-labelledby="contact-heading">
		<Container>
			<div class="contact-layout">
				<form aria-labelledby="contact-heading" onsubmit={(event) => event.preventDefault()}>
					<div class="form-header">
						<p class="eyebrow">{page.hero.chip}</p>
						<h2 id="contact-heading">{page.hero.title}</h2>
					</div>

					<div class="field-grid">
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

					<Button type="submit" label="Send message" variant="primary" />
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
								label={page.collaborativeCard.cta.label}
								variant={page.collaborativeCard.cta.variant}
							/>
						{/if}
					</article>
				</aside>
			</div>
		</Container>
	</section>
</main>

<PageFooter {chrome} />

<style>
	main {
		background: var(--ec-white);
		overflow-x: clip;
	}

	.section {
		position: relative;
	}

	.section-padded {
		padding-block: 4rem;
	}

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

	.eyebrow,
	h2,
	h3,
	p,
	a,
	label,
	input,
	textarea {
		font-family: var(--ec-font-sans);
	}

	.eyebrow {
		color: var(--ec-teal-dark);
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0;
		line-height: 1.2;
		margin: 0 0 0.625rem;
		text-transform: uppercase;
	}

	h2 {
		color: var(--ec-navy);
		font-size: clamp(1.875rem, 4vw, 2.5rem);
		line-height: 1.16;
		margin: 0;
		text-wrap: pretty;
	}

	h3 {
		color: var(--ec-navy);
		font-size: 1.125rem;
		line-height: 1.3;
		margin: 0;
		text-wrap: pretty;
	}

	p {
		color: var(--ec-ink-soft);
		font-size: 1rem;
		line-height: 1.58;
		margin: 0;
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
		.section-padded {
			padding-block: 3rem;
		}

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
