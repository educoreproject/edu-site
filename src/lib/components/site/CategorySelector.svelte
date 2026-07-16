<script lang="ts">
	type FilterGroup = {
		id: string;
		title: string;
		options: readonly string[];
		selectedValue?: string;
		allOptionLabel?: string;
		defaultOpen?: boolean;
		onSelect?: (value: string) => void;
	};

	type Props = {
		categories: string[];
		selectedCategory?: string;
		title?: string;
		label?: string;
		allCategoryLabel?: string;
		groups?: FilterGroup[];
		onSelect?: (category: string) => void;
	};

	let {
		categories = [],
		selectedCategory = $bindable(''),
		title = 'Categories',
		label = 'Available filters',
		allCategoryLabel = 'All items',
		groups = [],
		onSelect
	}: Props = $props();

	let groupSignature = $state('');
	let openGroupIds = $state<string[] | undefined>();
	let renderedGroups = $derived(groups);
	let displayedCategories = $derived(
		categories.some((category) => isAllCategory(category))
			? categories
			: [allCategoryLabel, ...categories]
	);

	$effect(() => {
		const nextGroupSignature = renderedGroups.map((group) => group.id).join('|');

		if (nextGroupSignature !== groupSignature) {
			groupSignature = nextGroupSignature;
			openGroupIds = defaultOpenGroupIds();
		}
	});

	function isAllCategory(category: string) {
		return category.toLowerCase() === allCategoryLabel.toLowerCase();
	}

	function isAllOption(option: string, allOptionLabel: string) {
		return option.toLowerCase() === allOptionLabel.toLowerCase();
	}

	function groupAllOptionLabel(group: FilterGroup) {
		return group.allOptionLabel ?? allCategoryLabel;
	}

	function displayedGroupOptions(group: FilterGroup) {
		const allOptionLabel = groupAllOptionLabel(group);

		return group.options.some((option) => isAllOption(option, allOptionLabel))
			? group.options
			: [allOptionLabel, ...group.options];
	}

	function defaultOpenGroupIds() {
		return renderedGroups
			.filter((group) => group.defaultOpen === true)
			.map((group) => group.id);
	}

	function toggleGroup(groupId: string) {
		const currentOpenGroupIds = openGroupIds ?? defaultOpenGroupIds();

		openGroupIds = currentOpenGroupIds.includes(groupId)
			? currentOpenGroupIds.filter((id) => id !== groupId)
			: [...currentOpenGroupIds, groupId];
	}

	function isGroupOpen(group: FilterGroup) {
		return openGroupIds ? openGroupIds.includes(group.id) : group.defaultOpen === true;
	}

	function filterGroupPanelId(group: FilterGroup) {
		return `filter-group-${group.id}`;
	}

	function selectOption(group: FilterGroup, option: string) {
		const nextValue = isAllOption(option, groupAllOptionLabel(group)) ? '' : option;

		if (renderedGroups.length) {
			group.onSelect?.(nextValue);
			return;
		}

		selectedCategory = nextValue;
		onSelect?.(selectedCategory);
	}

	function isSelectedOption(group: FilterGroup, option: string) {
		const selectedValue = group.selectedValue ?? '';

		return selectedValue === option || (!selectedValue && isAllOption(option, groupAllOptionLabel(group)));
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
	<!-- <p class="category-list-title">{title}</p> -->
	{#if renderedGroups.length}
		<div class="filter-groups">
			{#each renderedGroups as group (group.id)}
				<section class="filter-group">
					<button
						type="button"
						class="filter-group-trigger"
						aria-expanded={isGroupOpen(group)}
						aria-controls={filterGroupPanelId(group)}
						onclick={() => toggleGroup(group.id)}
					>
						<span>{group.title}</span>
						<i class="ti ti-chevron-up" aria-hidden="true"></i>
					</button>
					{#if isGroupOpen(group)}
						<div class="filter-group-options" id={filterGroupPanelId(group)}>
							{#each displayedGroupOptions(group) as option}
								<button
									type="button"
									class:current={isSelectedOption(group, option)}
									aria-pressed={isSelectedOption(group, option)}
									onclick={() => selectOption(group, option)}
								>
									{option}
								</button>
							{/each}
						</div>
					{/if}
				</section>
			{/each}
		</div>
	{:else}
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
	{/if}
</aside>

<style>
	button {
		font-family: var(--ec-font-sans);
	}

	.category-list {
		display: grid;
		gap: 0.625rem;
		position: sticky;
		top: 7.5rem;
		max-height: calc(100vh - 8.75rem); /* 7.5rem sticky offset + ~1.25rem breathing room */
		overflow-y: auto;
		padding-right: 0.5rem;
		scrollbar-gutter: stable;
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

	.filter-groups {
		display: grid;
		gap: 0.625rem;
	}

	.filter-group {
		border-bottom: 1px solid var(--ec-border-soft);
		display: grid;
		gap: 0.375rem;
		padding-bottom: 0.625rem;
	}

	.filter-group:last-child {
		border-bottom: 0;
		padding-bottom: 0;
	}

	.category-list .filter-group-trigger {
		align-items: center;
		color: var(--ec-navy);
		display: flex;
		font-size: 0.8125rem;
		font-weight: 800;
		gap: 0.5rem;
		justify-content: space-between;
		letter-spacing: 0;
		line-height: 1.2;
		padding: 0.125rem 0;
		text-transform: uppercase;
		width: 100%;
	}

	.filter-group-trigger i {
		color: var(--ec-teal-dark);
		font-size: 1rem;
		transition: transform 160ms ease;
	}

	.filter-group-trigger[aria-expanded='false'] i {
		transform: rotate(-180deg);
	}

	.filter-group-options {
		display: grid;
		gap: 0.375rem;
	}

	.category-list .current {
		border-left: 3px solid var(--ec-teal-dark);
		color: var(--ec-teal-dark);
		font-weight: 800;
		padding-left: calc(0.625rem - 3px);
	}

	.category-list button:focus-visible {
		outline: 3px solid var(--ec-focus);
		outline-offset: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		.filter-group-trigger i {
			transition: none;
		}
	}

	@media (max-width: 760px) {
		.category-list {
			display: none;
		}
	}
</style>
