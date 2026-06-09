<script lang="ts">
	import '$lib/styles/global.css';
	import '@tabler/icons-webfont/dist/tabler-icons.min.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
