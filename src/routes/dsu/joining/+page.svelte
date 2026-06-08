<script lang="ts">
	import Button from '$lib/components/site/Button.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PrimaryNav from '$lib/components/site/PrimaryNav.svelte';
	import SubNav from '$lib/components/site/SubNav.svelte';
	import type { DsuJoinPage, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: DsuJoinPage;
			chrome: SiteChrome;
		};
	};

	let { data }: Props = $props();
	let page = $derived(data.page);
	let chrome = $derived(data.chrome);
</script>

<svelte:head>
	<title>{page.hero.title}</title>
	<meta name="description" content={page.hero.description} />
</svelte:head>

<PrimaryNav links={chrome.primaryNav} footerColumns={chrome.footerColumns} activeSection={page.activeSection} activeSubSection="Joining DSU" />
<SubNav crumb={page.activeSection} links={page.subNav} active="Joining DSU" />

<main>
	<Hero content={page.hero} compact />

	<section class="section section-padded membership" aria-labelledby="membership-heading">
		<Container>
			<div class="section-header">
				<p class="eyebrow">Membership Types</p>
				<h2 id="membership-heading">Two ways to join</h2>
			</div>

			<div class="membership-grid">
				{#each page.membershipTypes as membership}
					<article class="membership-card" class:featured={membership.featured}>
						<div class="card-header">
							<span
								class="kind"
								style={`--kind-color: ${membership.kindColor ?? 'var(--ec-teal-dark)'}`}
							>
								{membership.kind}
							</span>
							<h3>{membership.title}</h3>
							<p>{membership.description}</p>
						</div>

						<ul>
							{#each membership.bullets as bullet}
								<li>
									<span aria-hidden="true">✓</span>
									{bullet}
								</li>
							{/each}
						</ul>

						<Button
							href={membership.cta.href}
							label={membership.cta.label}
							variant={membership.cta.variant}
						/>
					</article>
				{/each}
			</div>
		</Container>
	</section>

	<section class="section section-padded process" aria-labelledby="process-heading">
		<Container>
			<div class="section-header">
				<p class="eyebrow">{page.process.eyebrow}</p>
				<h2 id="process-heading">{page.process.heading}</h2>
			</div>

			<div class="process-list">
				{#each page.process.steps as step, index}
					<article class="process-card">
						<div class="step-number" aria-hidden="true">{index + 1}</div>
						<div>
							<h3>{step.title}</h3>
							<p>{step.description}</p>
						</div>
					</article>
				{/each}
			</div>
		</Container>
	</section>

	<section class="section section-padded questions" aria-labelledby="questions-heading">
		<Container>
			<div class="questions-layout">
				<div class="contact-card">
					<p class="eyebrow">{page.contact.eyebrow}</p>
					<h2 id="questions-heading">{page.contact.heading}</h2>
					<p>{page.contact.description}</p>
					<Button href={`mailto:${page.contact.email}`} label={page.contact.email} variant="teal" />
				</div>

				<div class="checklist-card">
					<h3>{page.submissionChecklist.heading}</h3>
					<ul>
						{#each page.submissionChecklist.items as item}
							<li>
								<span aria-hidden="true">✓</span>
								{item}
							</li>
						{/each}
					</ul>
				</div>
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

	.section-header {
		max-width: 46rem;
	}

	.eyebrow {
		color: var(--ec-teal-dark);
		font-family: var(--ec-font-sans);
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0;
		line-height: 1.2;
		margin: 0 0 0.625rem;
		text-transform: uppercase;
	}

	h2,
	h3,
	p,
	span,
	li {
		font-family: var(--ec-font-sans);
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

	.membership-grid {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		margin-top: 2rem;
	}

	.membership-card {
		background: var(--ec-white);
		border: 2px solid var(--ec-border-soft);
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		min-width: 0;
		padding: 1.5rem;
	}

	.membership-card.featured {
		background: color-mix(in srgb, var(--ec-teal) 8%, var(--ec-white));
		border-color: var(--ec-teal-dark);
		box-shadow: 0 1rem 2rem rgba(12, 23, 29, 0.08);
	}

	.card-header {
		display: grid;
		gap: 0.75rem;
	}

	.kind {
		align-self: start;
		background: color-mix(in srgb, var(--kind-color) 12%, var(--ec-white));
		border-left: 4px solid var(--kind-color);
		border-radius: 4px;
		color: var(--kind-color);
		font-size: 0.8125rem;
		font-weight: 700;
		line-height: 1.2;
		padding: 0.375rem 0.625rem;
	}

	ul {
		display: grid;
		gap: 0.75rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.membership-card ul {
		flex: 1;
	}

	li {
		color: var(--ec-ink);
		display: grid;
		font-size: 0.9375rem;
		gap: 0.625rem;
		grid-template-columns: auto minmax(0, 1fr);
		line-height: 1.45;
		min-width: 0;
	}

	li span {
		align-items: center;
		background: var(--ec-teal);
		border-radius: 999px;
		color: var(--ec-navy-deep);
		display: inline-flex;
		font-size: 0.75rem;
		font-weight: 700;
		height: 1.25rem;
		justify-content: center;
		line-height: 1;
		margin-top: 0.125rem;
		width: 1.25rem;
	}

	.process {
		background: var(--ec-surface);
	}

	.process-list {
		display: grid;
		gap: 1rem;
		margin-top: 2rem;
	}

	.process-card {
		background: var(--ec-white);
		border: 1px solid var(--ec-border-soft);
		border-radius: 8px;
		display: grid;
		gap: 1rem;
		grid-template-columns: auto minmax(0, 1fr);
		min-width: 0;
		padding: 1.25rem;
	}

	.step-number {
		align-items: center;
		background: var(--ec-navy);
		border-radius: 999px;
		color: var(--ec-white);
		display: inline-flex;
		font-family: var(--ec-font-sans);
		font-size: 1rem;
		font-weight: 700;
		height: 2.75rem;
		justify-content: center;
		line-height: 1;
		width: 2.75rem;
	}

	.process-card p {
		margin-top: 0.5rem;
	}

	.questions-layout {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
	}

	.contact-card,
	.checklist-card {
		border-radius: 8px;
		min-width: 0;
		padding: 1.5rem;
	}

	.contact-card {
		background: var(--ec-navy);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.contact-card .eyebrow {
		color: var(--ec-teal-soft);
		margin-bottom: 0;
	}

	.contact-card h2,
	.contact-card p {
		color: var(--ec-white);
	}

	.contact-card p {
		color: rgba(255, 255, 255, 0.86);
	}

	.contact-card :global(a) {
		align-self: flex-start;
	}

	.checklist-card {
		background: var(--ec-surface);
		border: 1px solid var(--ec-border-soft);
	}

	.checklist-card ul {
		margin-top: 1.25rem;
	}

	@media (max-width: 760px) {
		.section-padded {
			padding-block: 3rem;
		}

		.membership-grid,
		.questions-layout {
			grid-template-columns: 1fr;
		}

		.membership-grid,
		.process-list {
			margin-top: 1.5rem;
		}
	}

	@media (max-width: 420px) {
		.membership-card,
		.process-card,
		.contact-card,
		.checklist-card {
			padding: 1.125rem;
		}

		.process-card {
			grid-template-columns: 1fr;
		}
	}
</style>
