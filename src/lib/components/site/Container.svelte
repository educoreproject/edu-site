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
		max-width: 1280px;
		padding-inline: clamp(1.25rem, 10vw, 8rem);
		width: 100%;
	}

	.narrow {
		max-width: 1024px;
	}

	.wide {
		max-width: 1440px;
	}
</style>
