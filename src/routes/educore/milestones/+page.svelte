<script lang="ts">
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import RichText from '$lib/components/site/RichText.svelte';
	import SectionChrome from '$lib/components/site/SectionChrome.svelte';
	import type { Milestone, SiteChrome, TimelinePage } from '$lib/content/types';

	type Props = {
		data: {
			page: TimelinePage;
			chrome: SiteChrome;
		};
	};

	let { data }: Props = $props();
	let page = $derived(data.page);
	let chrome = $derived(data.chrome);

	// Set true to open only the two most recent buckets on load (long timelines).
	const COLLAPSE_OLD = false;

	type Group = { label: string; items: Milestone[] };

	let sorted = $derived(
		[...(page.milestones ?? [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
	);

	// Ordered collapse buckets, preserving first-seen order of `group`.
	let groups = $derived.by(() => {
		const result: Group[] = [];
		const byLabel = new Map<string, Group>();
		for (const milestone of sorted) {
			const label = milestone.group || 'Other';
			let group = byLabel.get(label);
			if (!group) {
				group = { label, items: [] };
				byLabel.set(label, group);
				result.push(group);
			}
			group.items.push(milestone);
		}
		return result;
	});

	// Explicit user toggles win over the default open state.
	let overrides = $state<Record<string, boolean>>({});

	let open = $derived.by(() => {
		const map: Record<string, boolean> = {};
		groups.forEach((group, index) => {
			const openByDefault = COLLAPSE_OLD ? index >= groups.length - 2 : true;
			map[group.label] = overrides[group.label] ?? openByDefault;
		});
		return map;
	});

	function toggle(label: string) {
		overrides[label] = !open[label];
	}

	function expandAll() {
		for (const group of groups) overrides[group.label] = true;
	}

	function collapseAll() {
		for (const group of groups) overrides[group.label] = false;
	}
</script>

<svelte:head>
	<title>{page.hero.title}</title>
	<meta
		name="description"
		content={page.hero.description ?? 'EDUcore impact and milestones timeline.'}
	/>
</svelte:head>

<SectionChrome {chrome} routeKey="educoreMilestones" />

<main>
	<Hero content={page.hero} compact />

	<section class="section section-padded" aria-labelledby="milestones-heading">
		<Container width="narrow">
			<div class="section-header">
				<p class="eyebrow">{page.hero.chip}</p>
				<h2 id="milestones-heading">{page.hero.title}</h2>
			</div>

			{#if groups.length}
				<div class="tl-controls">
					<button type="button" onclick={expandAll}>Expand all</button>
					<button type="button" onclick={collapseAll}>Collapse all</button>
				</div>

				<div class="timeline">
					{#each groups as group, index (group.label)}
						{@const listId = `tl-group-${index}`}
						<div class="tl-group">
							<button
								type="button"
								class="tl-group-toggle"
								aria-expanded={open[group.label]}
								aria-controls={listId}
								onclick={() => toggle(group.label)}
							>
								<span class="tl-caret" class:open={open[group.label]} aria-hidden="true">▸</span>
								<span class="tl-group-label">{group.label}</span>
								<span class="tl-count">{group.items.length}</span>
							</button>

							{#if open[group.label]}
								<ol id={listId} class="tl-list">
									{#each group.items as milestone (milestone._key)}
										<li class="tl-item">
											{#if milestone.displayDate}
												<span class="tl-date">{milestone.displayDate}</span>
											{/if}
											<h3 class="tl-title">{milestone.heading}</h3>
											{#if milestone.body?.length}
												<div class="tl-body">
													<RichText blocks={milestone.body} />
												</div>
											{/if}
										</li>
									{/each}
								</ol>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</Container>
	</section>
</main>

<PageFooter {chrome} />

<style>
	.tl-controls {
		display: flex;
		gap: 0.5rem;
		margin: 2rem 0 1.5rem;
	}

	.tl-controls button {
		background: transparent;
		border: 1px solid var(--ec-border);
		border-radius: 6px;
		color: var(--ec-ink);
		cursor: pointer;
		font-family: var(--ec-font-sans);
		font-size: 0.8125rem;
		font-weight: 500;
		padding: 0.25rem 0.75rem;
	}

	.tl-controls button:hover {
		border-color: var(--ec-teal-dark);
		color: var(--ec-teal-dark);
	}

	.tl-controls button:focus-visible {
		outline: 3px solid var(--ec-focus);
		outline-offset: 2px;
	}

	.timeline {
		display: grid;
		gap: 0;
	}

	.tl-group {
		border-top: 1px solid var(--ec-border-soft);
	}

	.tl-group-toggle {
		align-items: center;
		background: none;
		border: 0;
		color: var(--ec-navy);
		cursor: pointer;
		display: flex;
		font-family: var(--ec-font-sans);
		font-size: 1.0625rem;
		font-weight: 700;
		gap: 0.625rem;
		padding: 0.875rem 0;
		text-align: left;
		width: 100%;
	}

	.tl-group-toggle:focus-visible {
		outline: 3px solid var(--ec-focus);
		outline-offset: 2px;
	}

	.tl-caret {
		color: var(--ec-teal-dark);
		display: inline-block;
		transition: transform 0.15s ease;
	}

	.tl-caret.open {
		transform: rotate(90deg);
	}

	.tl-count {
		color: var(--ec-ink-soft);
		font-size: 0.75rem;
		font-weight: 500;
		margin-left: auto;
	}

	.tl-list {
		list-style: none;
		margin: 0;
		padding: 0 0 1rem;
		position: relative;
	}

	.tl-item {
		border-left: 2px solid var(--ec-teal);
		padding: 0 0 1.5rem 1.75rem;
		position: relative;
	}

	.tl-item:last-child {
		border-left: 2px solid transparent;
	}

	.tl-item::before {
		background: var(--ec-teal);
		border: 2px solid var(--ec-white);
		border-radius: 999px;
		box-shadow: 0 0 0 1px var(--ec-border);
		content: '';
		height: 0.8125rem;
		left: -0.5rem;
		position: absolute;
		top: 0.25rem;
		width: 0.8125rem;
	}

	.tl-date {
		background: var(--ec-surface);
		border-radius: 6px;
		color: var(--ec-teal-dark);
		display: inline-block;
		font-size: 0.75rem;
		font-weight: 700;
		margin-bottom: 0.375rem;
		padding: 0.125rem 0.625rem;
	}

	.tl-title {
		color: var(--ec-navy);
		font-size: 1.0625rem;
		font-weight: 700;
		line-height: 1.3;
		margin: 0 0 0.25rem;
		text-wrap: pretty;
	}

	.tl-body {
		color: var(--ec-ink-soft);
		font-size: 0.9375rem;
		line-height: 1.6;
	}

	@media (prefers-reduced-motion: reduce) {
		.tl-caret {
			transition: none;
		}
	}

	@media (max-width: 420px) {
		.tl-item {
			padding-left: 1.5rem;
		}
	}
</style>
