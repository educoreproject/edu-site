<script lang="ts">
	type Props = {
		totalItems: number;
		currentPage?: number;
		itemsPerPage?: number;
		pageSizeOptions?: number[];
		label?: string;
	};

	let {
		totalItems,
		currentPage = $bindable(1),
		itemsPerPage = $bindable(25),
		pageSizeOptions = [10, 25, 50, 100],
		label = 'Pagination'
	}: Props = $props();

	let totalPages = $derived(Math.max(1, Math.ceil(totalItems / itemsPerPage)));
	let pages = $derived(Array.from({ length: totalPages }, (_, index) => index + 1));
	let firstVisibleItem = $derived(totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1);
	let lastVisibleItem = $derived(Math.min(currentPage * itemsPerPage, totalItems));

	$effect(() => {
		if (currentPage > totalPages) {
			currentPage = totalPages;
		}

		if (currentPage < 1) {
			currentPage = 1;
		}
	});

	function goToPage(page: number) {
		currentPage = Math.min(Math.max(page, 1), totalPages);
	}

	function updateItemsPerPage(event: Event) {
		itemsPerPage = Number((event.currentTarget as HTMLSelectElement).value);
		currentPage = 1;
	}
</script>

<nav class="pagination" aria-label={label}>
	<p class="pagination-summary">
		Showing {firstVisibleItem}-{lastVisibleItem} of {totalItems}
	</p>

	<label class="page-size">
		<span>Items per page</span>
		<select value={itemsPerPage} onchange={updateItemsPerPage}>
			{#each pageSizeOptions as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
	</label>

	<div class="page-controls">
		<button
			type="button"
			aria-label="First page"
			disabled={currentPage === 1}
			onclick={() => goToPage(1)}
		>
			<i class="ti ti-chevrons-left" aria-hidden="true"></i>
		</button>
		<button
			type="button"
			aria-label="Previous page"
			disabled={currentPage === 1}
			onclick={() => goToPage(currentPage - 1)}
		>
			<i class="ti ti-chevron-left" aria-hidden="true"></i>
		</button>

		<div class="page-numbers" aria-label="Pages">
			{#each pages as page}
				<button
					type="button"
					class:current={page === currentPage}
					aria-label={`Page ${page}`}
					aria-current={page === currentPage ? 'page' : undefined}
					onclick={() => goToPage(page)}
				>
					{page}
				</button>
			{/each}
		</div>

		<button
			type="button"
			aria-label="Next page"
			disabled={currentPage === totalPages}
			onclick={() => goToPage(currentPage + 1)}
		>
			<i class="ti ti-chevron-right" aria-hidden="true"></i>
		</button>
		<button
			type="button"
			aria-label="Last page"
			disabled={currentPage === totalPages}
			onclick={() => goToPage(totalPages)}
		>
			<i class="ti ti-chevrons-right" aria-hidden="true"></i>
		</button>
	</div>
</nav>

<style>
	.pagination {
		align-items: center;
		display: grid;
		gap: 1rem;
		grid-template-columns: minmax(0, 1fr) auto;
		margin-top: 1.5rem;
		min-width: 0;
	}

	.pagination-summary,
	.page-size,
	button,
	select {
		font-family: var(--ec-font-sans);
	}

	.pagination-summary {
		color: var(--ec-ink-soft);
		font-size: 0.9375rem;
		font-weight: 600;
		line-height: 1.35;
		margin: 0;
	}

	.page-size {
		align-items: center;
		color: var(--ec-ink);
		display: inline-flex;
		font-size: 0.9375rem;
		font-weight: 600;
		gap: 0.625rem;
		justify-self: end;
		line-height: 1.35;
	}

	select {
		background: var(--ec-white);
		border: 1px solid var(--ec-border);
		border-radius: 6px;
		color: var(--ec-ink);
		min-height: 2.375rem;
		padding: 0.375rem 2rem 0.375rem 0.625rem;
	}

	.page-controls {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		grid-column: 1 / -1;
		min-width: 0;
	}

	.page-numbers {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		min-width: 0;
	}

	button {
		align-items: center;
		appearance: none;
		background: var(--ec-white);
		border: 1px solid var(--ec-border);
		border-radius: 6px;
		color: var(--ec-navy);
		cursor: pointer;
		display: inline-flex;
		font-size: 0.9375rem;
		font-weight: 700;
		height: 2.375rem;
		justify-content: center;
		line-height: 1;
		min-width: 2.375rem;
		padding: 0 0.625rem;
	}

	button:hover {
		background: color-mix(in srgb, var(--ec-teal) 10%, var(--ec-white));
		border-color: var(--ec-teal-dark);
		color: var(--ec-teal-dark);
	}

	button.current {
		background: var(--ec-teal-dark);
		border-color: var(--ec-teal-dark);
		color: var(--ec-white);
	}

	button:disabled {
		background: var(--ec-surface);
		border-color: var(--ec-border-soft);
		color: var(--ec-ink-soft);
		cursor: not-allowed;
		opacity: 0.56;
	}

	button i {
		font-size: 1.125rem;
	}

	@media (max-width: 620px) {
		.pagination {
			grid-template-columns: 1fr;
		}

		.page-size {
			justify-self: start;
		}
	}
</style>
