<script lang="ts">
	/**
	 * Button component with multiple variants and sizes
	 * @component
	 */
	import type { Snippet } from 'svelte';
	import { navigateTo } from '$src/lib/helpers/navigate-to.js';
	import type { ButtonVariant, FormFieldSizeOptions } from '$src/lib/types/form.js';

	let {
		/** Button label text */
		label,
		/** Optional href for navigation */
		href = undefined,
		/** Button size */
		size = 'md',
		/** Button variant/style */
		variant = 'secondary',
		/** HTML button type */
		type = 'button',
		/** Display as block (full width) */
		block = false,
		/** Allow flex growth */
		flex = false,
		/** Disabled state */
		disabled = $bindable(false),
		/** Loading state */
		loading = false,
		/** ARIA label override */
		ariaLabel = undefined,
		/** Remove margins */
		noMargin = false,
		/** Collapse padding */
		collapse = false,
		/** Delay before re-enabling after click (prevents double-clicks) */
		repeatSubmitDelay = 500,
		/** Click handler */
		onClick = undefined,
		/** Optional children snippet */
		children
	}: {
		label?: string;
		href?: string | undefined;
		size?: FormFieldSizeOptions;
		variant?: ButtonVariant;
		type?: 'button' | 'submit' | 'reset';
		block?: boolean;
		flex?: boolean;
		disabled?: boolean;
		loading?: boolean;
		ariaLabel?: string | undefined;
		noMargin?: boolean;
		collapse?: boolean;
		repeatSubmitDelay?: number | 'infinite';
		onClick?: ((e?: Event) => void) | undefined;
		children?: Snippet;
	} = $props();

	let isDisabled = $derived(disabled || loading);

	const click = (e: Event) => {
		if (isDisabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		onClick?.(e);
		if (repeatSubmitDelay) {
			disabled = true;
			if (repeatSubmitDelay !== 'infinite') {
				setTimeout(() => (disabled = false), repeatSubmitDelay);
			}
		}
		if (href) {
			navigateTo(href);
		}
	};
</script>

<button
	{type}
	onclick={click}
	class="{size} {variant} {flex ? 'flex' : ''}"
	class:block
	class:noMargin
	class:collapse
	class:loading
	disabled={isDisabled}
	aria-label={ariaLabel || label}
	aria-busy={loading}
	aria-disabled={isDisabled}
>
	{#if loading}
		<span class="loading-indicator" aria-hidden="true">⏳</span>
	{/if}
	{#if children}
		{@render children()}
	{:else if label}
		<span class="label">{label}</span>
	{/if}
</button>

<style lang="scss">
	button {
		display: inline-block;
		min-width: 10rem;
		cursor: pointer;
		margin-top: var(--spacing-sm);
		margin-bottom: var(--spacing-sm);
		border-width: var(--border-thin);
		border-style: solid;
		border-radius: var(--radius-md);
		color: var(--button-secondary-fg);
		font-size: var(--font-base);
		font-weight: 500;
		line-height: 1.25rem;
		padding: var(--spacing-sm) var(--spacing-base);
		text-align: center;
		text-decoration: none;
		transition:
			background-color var(--transition-base) var(--ease-in-out),
			border-color var(--transition-base) var(--ease-in-out),
			color var(--transition-base) var(--ease-in-out),
			fill var(--transition-base) var(--ease-in-out),
			stroke var(--transition-base) var(--ease-in-out);
		user-select: none;
		white-space: nowrap;
		font-family: var(--base-font-family);
		text-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.5);

		&[disabled] {
			opacity: 0.5;
			cursor: not-allowed;
		}

		&.noMargin {
			margin: 0;
		}

		&.collapse {
			min-width: auto;
			padding: var(--spacing-sm);
		}

		&.flex {
			flex-grow: 1;
		}

		&.block {
			display: block;
			width: 100%;
		}

		&.sm {
			font-size: var(--font-sm);
			line-height: 1rem;
			padding: var(--spacing-xs) var(--spacing-sm);
		}

		&.lg {
			font-size: var(--font-md);
			line-height: 1.5rem;
			padding: var(--spacing-md) var(--spacing-lg);
		}

		&.xl {
			font-size: var(--font-xl);
			line-height: 1.75rem;
			padding: var(--spacing-base) var(--spacing-xl);
		}

		&.full {
			width: 100%;
			padding: var(--spacing-sm) 0;
			display: block;
			min-width: auto;
			flex-grow: 1;
		}

		&:hover {
			background-color: var(--gray-600);
		}

		&:active:not([disabled]) {
			transform: scale(0.98);
		}

		@media (prefers-reduced-motion: no-preference) {
			transition:
				background-color var(--transition-base) var(--ease-in-out),
				border-color var(--transition-base) var(--ease-in-out),
				color var(--transition-base) var(--ease-in-out),
				fill var(--transition-base) var(--ease-in-out),
				stroke var(--transition-base) var(--ease-in-out),
				transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
		}

		&.primary {
			background-color: var(--button-primary-bg);
			border-color: var(--button-primary-border);
			color: var(--button-primary-fg);

			&:hover {
				background-color: var(--button-primary-hover-bg);
				color: var(--button-primary-hover-fg);
			}
		}

		&.secondary {
			background-color: var(--button-secondary-bg);
			border-color: var(--button-secondary-border);
			color: var(--button-secondary-fg);

			&:hover {
				background-color: var(--button-secondary-hover-bg);
				color: var(--button-secondary-hover-fg);
			}
		}

		&.positive {
			background-color: var(--button-positive-bg);
			border-color: var(--button-positive-border);
			color: var(--button-positive-fg);

			&:hover {
				background-color: var(--button-positive-hover-bg);
				color: var(--button-positive-hover-fg);
			}
		}

		&.danger {
			background-color: var(--button-danger-bg);
			border-color: var(--button-danger-border);
			color: var(--button-danger-fg);

			&:hover {
				background-color: var(--button-danger-hover-bg);
				color: var(--button-danger-hover-fg);
			}
		}

		&.outline {
			background-color: var(--body-bg);
			border-color: var(--gray-400);
			color: var(--body-fg);
			text-shadow: none;
			font-weight: 400;

			&:hover {
				background-color: var(--button-outline-hover-bg);
				color: var(--button-outline-hover-fg);
			}
		}

		&.link {
			background-color: transparent;
			border-color: transparent;
			color: var(--base-link-fg);
			text-decoration: underline;

			&:hover {
				color: var(--base-link-hover-fg);
			}
		}
	}
</style>
