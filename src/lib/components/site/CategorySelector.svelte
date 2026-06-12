<script lang="ts">
	type Props = {
		categories: string[];
		selectedCategory?: string;
		title?: string;
		label?: string;
		allCategoryLabel?: string;
		onSelect?: (category: string) => void;
	};

	let {
		categories,
		selectedCategory = $bindable(''),
		title = 'Categories',
		label = 'Categories',
		allCategoryLabel = 'All items',
		onSelect
	}: Props = $props();

	let displayedCategories = $derived(
		categories.some((category) => isAllCategory(category))
			? categories
			: [allCategoryLabel, ...categories]
	);

	function isAllCategory(category: string) {
		return category.toLowerCase() === allCategoryLabel.toLowerCase();
	}

	function selectCategory(category: string) {
		selectedCategory = isAllCategory(category) ? '' : category;
		onSelect?.(selectedCategory);
	}

	function isSelectedCategory(category: string) {
		return selectedCategory === category || (!selectedCategory && isAllCategory(category));
	}
</script>

<aside class="category-list" aria-label={label}>
	<p class="category-list-title">{title}</p>
	{#each displayedCategories as category}
		<button
			type="button"
			class:current={isSelectedCategory(category)}
			aria-pressed={isSelectedCategory(category)}
			onclick={() => selectCategory(category)}
		>
			{category}
		</button>
	{/each}
</aside>

<style>
	button {
		font-family: var(--ec-font-sans);
	}

	.category-list-title {
		color: var(--ec-navy);
		font-family: var(--ec-font-sans);
		font-size: 0.8125rem;
		font-weight: 800;
		line-height: 1.2;
		margin: 0 0 0.75rem;
		text-transform: uppercase;
	}

	.category-list {
		display: grid;
		gap: 0.375rem;
		position: sticky;
		top: 2rem;
	}

	.category-list button {
		appearance: none;
		background: transparent;
		border: 0;
		color: var(--ec-ink);
		cursor: pointer;
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.3;
		padding: 0.125rem 0 0.125rem 0.625rem;
		text-align: left;
	}

	.category-list .current {
		border-left: 3px solid var(--ec-teal-dark);
		color: var(--ec-teal-dark);
		font-weight: 800;
		padding-left: calc(0.625rem - 3px);
	}

	@media (max-width: 760px) {
		.category-list {
			display: none;
		}
	}
</style>
