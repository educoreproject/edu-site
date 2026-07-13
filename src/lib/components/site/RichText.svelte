<script lang="ts">
	import type { RichTextBlock } from '$lib/content/types';

	type Props = {
		blocks: RichTextBlock[];
	};

	let { blocks }: Props = $props();

	type Group = { type: 'paragraph'; block: RichTextBlock } | { type: 'list'; items: RichTextBlock[] };

	let groups = $derived(
		(blocks ?? []).reduce<Group[]>((acc, block) => {
			if (block.listItem === 'bullet') {
				const last = acc[acc.length - 1];
				if (last?.type === 'list') {
					last.items.push(block);
				} else {
					acc.push({ type: 'list', items: [block] });
				}
			} else {
				acc.push({ type: 'paragraph', block });
			}
			return acc;
		}, [])
	);
</script>

{#each groups as group}
	{#if group.type === 'list'}
		<ul>
			{#each group.items as item}
				<li>
					{#each item.children ?? [] as span}
						{@const isStrong = span.marks?.includes('strong')}
						{@const isEm = span.marks?.includes('em')}
						{#if isStrong && isEm}
							<strong><em>{span.text}</em></strong>
						{:else if isStrong}
							<strong>{span.text}</strong>
						{:else if isEm}
							<em>{span.text}</em>
						{:else}
							{span.text}
						{/if}
					{/each}
				</li>
			{/each}
		</ul>
	{:else}
		<p>
			{#each group.block.children ?? [] as span}
				{@const isStrong = span.marks?.includes('strong')}
				{@const isEm = span.marks?.includes('em')}
				{#if isStrong && isEm}
					<strong><em>{span.text}</em></strong>
				{:else if isStrong}
					<strong>{span.text}</strong>
				{:else if isEm}
					<em>{span.text}</em>
				{:else}
					{span.text}
				{/if}
			{/each}
		</p>
	{/if}
{/each}

<style>
	p:not(:last-child) {
		margin-bottom: 0.75rem;
	}

	ul {
		margin: 0 0 0.75rem;
		padding-left: 1.25rem;
	}

	ul:last-child {
		margin-bottom: 0;
	}

	li:not(:last-child) {
		margin-bottom: 0.5rem;
	}
</style>
