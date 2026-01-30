<script lang="ts">
	/**
	 * Button component with multiple variants and sizes
	 * @component
	 */
	import type { Snippet } from 'svelte';
	import { navigateTo } from '$src/lib/helpers/navigate-to.js';
	import type { ButtonVariant, ComponentWidth, ComponentSize } from '$src/lib/types/form.js';
	import type { IconType } from '$src/lib/icons/types.js';
	import Spinner from '$src/lib/generic/spinner/spinner.svelte';
	import Icon from '$src/lib/icons/icon.svelte';

	let {
		/** Optional href for navigation */
		href = undefined,
		/** Button size (controls font size and padding) */
		size = 'md',
		/** Button width */
		width = 'md',
		/** Button variant/style */
		variant = 'secondary',
		/** HTML button type */
		type = 'button',
		/** Display as block (full width) - DEPRECATED: use width="full" instead */
		block = false,
		/** Allow flex growth */
		flex = false,
		/** Disabled state */
		disabled = $bindable(false),
		/** Loading state */
		loading = false,
		/** ARIA label for accessibility (required if button content is not text) */
		ariaLabel = undefined,
		/** Collapse padding */
		collapse = false,
		/** Delay before re-enabling after click (prevents double-clicks) */
		repeatSubmitDelay = 500,
		/** Icon to display */
		icon = undefined,
		/** Icon alignment */
		iconAlign = 'left',
		iconSize = 'default',
		/** Click handler */
		onClick = undefined,
		/** Margin around button */
		margin = 'sm',
		/** Button content */
		children
	}: {
		href?: string | undefined;
		size?: ComponentSize;
		width?: ComponentWidth;
		variant?: ButtonVariant;
		type?: 'button' | 'submit' | 'reset';
		block?: boolean;
		flex?: boolean;
		disabled?: boolean;
		loading?: boolean;
		ariaLabel?: string | undefined;
		collapse?: boolean;
		repeatSubmitDelay?: number | 'infinite';
		icon?: IconType | undefined;
		iconAlign?: 'left' | 'right' | 'above' | 'below';
		iconSize?: 'default' | ComponentSize;
		margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		onClick?: ((e?: Event) => void) | undefined;
		children?: Snippet;
	} = $props();

	let isDisabled = $derived(disabled || loading);

	const handleClick = (e: Event) => {
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

	const _iconSize = $derived<ComponentSize>(
		iconSize === 'default' ? (size as ComponentSize) : iconSize
	);
</script>

<button
	{type}
	onclick={handleClick}
	class="{size} w-{width} {variant} {flex ? 'flex' : ''} icon-{iconAlign} margin-{margin}"
	class:block
	class:collapse
	class:loading
	class:has-icon={!!icon}
	disabled={isDisabled}
	aria-label={ariaLabel}
	aria-busy={loading}
	aria-disabled={isDisabled}
>
	{#if loading}
		<span class="spinner-wrapper" aria-hidden="true">
			<Spinner {size} variant={variant === 'outline' ? 'secondary' : 'primary'} />
		</span>
	{/if}
	{#if icon && (iconAlign === 'above' || iconAlign === 'left')}
		<span class="icon-wrapper" aria-hidden="true">
			<Icon type={icon} size={_iconSize} fill="currentColor" />
		</span>
	{/if}
	{#if children}
		<span class="button-content">
			{@render children()}
		</span>
	{/if}
	{#if icon && (iconAlign === 'below' || iconAlign === 'right')}
		<span class="icon-wrapper" aria-hidden="true">
			<Icon type={icon} size={_iconSize} fill="currentColor" />
		</span>
	{/if}
</button>

<style lang="scss">
	button {
		display: inline-block;
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
		display: inline-flex;
		align-items: center;
		justify-content: center;

		&[disabled] {
			opacity: 0.5;
			cursor: not-allowed;
		}

		&.margin-none {
			margin: 0;
		}

		&.margin-xs {
			margin-top: var(--spacing-xs);
			margin-bottom: var(--spacing-xs);
		}
		&.margin-sm {
			margin-top: var(--spacing-sm);
			margin-bottom: var(--spacing-sm);
		}
		&.margin-md {
			margin-top: var(--spacing-md);
			margin-bottom: var(--spacing-md);
		}
		&.margin-lg {
			margin-top: var(--spacing-lg);
			margin-bottom: var(--spacing-lg);
		}
		&.margin-xl {
			margin-top: var(--spacing-xl);
			margin-bottom: var(--spacing-xl);
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

		// Size classes - control font size and padding only
		&.xs {
			font-size: var(--font-xs);
			line-height: 0.875rem;
			padding: var(--spacing-xs) var(--spacing-sm);
			gap: 0;
		}
		&.sm {
			font-size: var(--font-sm);
			line-height: 1rem;
			padding: var(--spacing-xs) var(--spacing-sm);
			gap: 0;
		}

		&.md {
			font-size: var(--font-base);
			line-height: 1.25rem;
			padding: var(--spacing-sm) var(--spacing-base);
			gap: var(--spacing-xs);
		}

		&.lg {
			font-size: var(--font-md);
			line-height: 1.5rem;
			padding: var(--spacing-md) var(--spacing-lg);
			gap: var(--spacing-sm);
		}

		&.xl {
			font-size: var(--font-xl);
			line-height: 1.75rem;
			padding: var(--spacing-base) var(--spacing-xl);
			gap: var(--spacing-md);
		}

		// Width classes - control horizontal space only
		&.w-auto {
			min-width: auto;
			width: auto;
		}

		&.w-sm {
			min-width: 5rem;
			display: inline-block;
		}

		&.w-md {
			min-width: 10rem;
			display: inline-block;
		}

		&.w-lg {
			min-width: 20rem;
			display: inline-block;
		}

		&.w-xl {
			min-width: 30rem;
			display: inline-block;
		}

		&.w-full {
			width: 100%;
			display: block;
			min-width: auto;
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

		&.ghost {
			background-color: transparent;
			border-color: transparent;
			color: var(--body-fg);
			text-shadow: none;

			&:hover {
				background-color: var(--button-secondary-bg);
				border-color: var(--button-secondary-border);
				color: var(--button-secondary-fg);
				text-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.5);
			}
		}

		.spinner-wrapper {
			display: inline-flex;
			align-items: center;
			margin-right: var(--spacing-xs);
			vertical-align: middle;
		}

		.button-content {
			display: inline;
		}

		.icon-wrapper {
			display: inline-flex;
			align-items: center;
			vertical-align: middle;
		}

		// Icon alignment layouts
		&.icon-left {
			.icon-wrapper {
				margin-right: var(--spacing-xs);
			}
		}

		&.icon-right {
			.icon-wrapper {
				margin-left: var(--spacing-xs);
			}
		}

		&.icon-above,
		&.icon-below {
			display: inline-flex;
			flex-direction: column;
			align-items: center;
			gap: var(--spacing-xs);
		}

		&.icon-above {
			.icon-wrapper {
				order: -1;
			}
		}
	}
</style>
