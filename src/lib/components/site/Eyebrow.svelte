<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		onDark?: boolean;
	};

	let { children, onDark = false }: Props = $props();
</script>

<p class:on-dark={onDark}>
	{@render children()}
</p>

<style>
	p {
		color: var(--ec-navy);
		font-family: var(--ec-font-sans);
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		line-height: 1.25;
		margin: 0;
		text-transform: uppercase;
	}

	.on-dark {
		color: var(--ec-teal-soft);
	}
</style>
