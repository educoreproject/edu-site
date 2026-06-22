<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Cta } from '$lib/content/types';

	type ButtonVariant = Cta['variant'];

	type Props = {
		label?: Cta['label'];
		href?: Cta['href'];
		target?: Cta['target'];
		rel?: Cta['rel'];
		download?: Cta['download'];
		variant?: ButtonVariant;
		onDark?: boolean;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		children?: Snippet;
	};

	let {
		label,
		href,
		target,
		rel,
		download,
		variant = 'primary',
		onDark = false,
		disabled = false,
		type = 'button',
		children
	}: Props = $props();
</script>

{#if href && !disabled}
	<a class:primary={variant === 'primary'} class:outline={variant === 'outline'} class:teal={variant === 'teal'} class:gold={variant === 'gold'} class:on-dark={onDark} href={href} {target} {rel} {download}>
		{#if children}
			{@render children()}
		{:else}
			{label}
		{/if}
	</a>
{:else if href && disabled}
	<span class:primary={variant === 'primary'} class:outline={variant === 'outline'} class:teal={variant === 'teal'} class:gold={variant === 'gold'} class:on-dark={onDark} class="disabled" aria-disabled="true">
		{#if children}
			{@render children()}
		{:else}
			{label}
		{/if}
	</span>
{:else}
	<button class:primary={variant === 'primary'} class:outline={variant === 'outline'} class:teal={variant === 'teal'} class:gold={variant === 'gold'} class:on-dark={onDark} {disabled} {type}>
		{#if children}
			{@render children()}
		{:else}
			{label}
		{/if}
	</button>
{/if}

<style>
	a,
	button,
	span {
		align-items: center;
		border: 2px solid transparent;
		border-radius: .375rem;
		display: inline-flex;
		font-family: var(--ec-font-sans);
		font-size: 1rem;
		font-weight: 400;
		justify-content: center;
		line-height: 1.1;
		min-height: 2.875rem;
		padding: 0.75rem 1.25rem;
		text-align: center;
		text-decoration: none;
		transition:
			background-color 120ms ease,
			border-color 120ms ease,
			color 120ms ease,
			transform 120ms ease;
		white-space: nowrap;
	}

	a,
	button {
		cursor: pointer;
	}

	a:hover,
	button:hover {
		transform: translateY(-1px);
	}

	a:active,
	button:active {
		transform: translateY(1px);
	}

	.primary {
		background: var(--ec-link);
		color: var(--ec-white);
	}

	.primary:hover {
		background: var(--ec-violet-dark);
		color: var(--ec-white);
	}

	.outline {
		background: transparent;
		border-color: var(--ec-navy);
		color: var(--ec-navy);
	}

	.outline:hover {
		background: color-mix(in srgb, var(--ec-navy) 8%, transparent);
		color: var(--ec-navy-deep);
	}

	.teal {
		background: var(--ec-teal-dark);
		color: var(--ec-white);
	}

	.teal:hover {
		background: var(--ec-teal-darker);
		color: var(--ec-white);
	}

	.gold {
		background: var(--ec-gold);
		color: var(--ec-navy-deep);
	}

	.gold:hover {
		background: #ffd27c;
		color: var(--ec-navy-deep);
	}

	.outline.on-dark {
		border-color: rgba(255, 255, 255, 0.66);
		color: var(--ec-white);
	}

	.outline.on-dark:hover {
		background: rgba(0, 0, 0, 0.12);
		color: var(--ec-white);
	}

	.disabled,
	button:disabled {
		cursor: not-allowed;
		opacity: 0.48;
		transform: none;
	}

	@media (max-width: 420px) {
		a,
		button,
		span {
			white-space: normal;
			width: 100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		a,
		button,
		span {
			transition: none;
		}
	}
</style>
