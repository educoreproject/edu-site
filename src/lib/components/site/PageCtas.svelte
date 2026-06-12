<script lang="ts">
	import GenericCta from '$lib/components/site/GenericCta.svelte';
	import NewsletterSignup from '$lib/components/site/NewsletterSignup.svelte';
	import type { SharedCtaContent } from '$lib/content/types';

	type Props = {
		ctas?: SharedCtaContent[];
	};

	let { ctas = [] }: Props = $props();
</script>

{#each ctas as cta, index}
	{#if cta.type === 'newsletter'}
		<NewsletterSignup content={cta} headingId={`newsletter-heading-${index}`} />
	{:else if cta.type === 'generic'}
		<GenericCta content={cta} headingId={`generic-cta-heading-${index}`} />
	{/if}
{/each}
