<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		size?: 'default' | 'narrow' | 'wide';
	};

	let { children, size = 'default' }: Props = $props();
</script>

<div class:narrow={size === 'narrow'} class:wide={size === 'wide'}>
	{@render children()}
</div>

<style>
	div {
		margin-inline: auto;
		max-width: 1180px;
		padding-inline: clamp(1.25rem, 4vw, 2.5rem);
		width: 100%;
	}

	.narrow {
		max-width: 880px;
	}

	.wide {
		max-width: 1320px;
	}
</style>
