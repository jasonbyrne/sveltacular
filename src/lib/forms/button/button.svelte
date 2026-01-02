<script lang="ts">
	import type { Snippet } from 'svelte';
	import { navigateTo } from '$src/lib/helpers/navigate-to.js';
	import type { ButtonStyle, FormFieldSizeOptions } from '$src/lib/types/form.js';

	let {
		href = undefined,
		size = 'md',
		style = 'secondary',
		type = 'button',
		block = false,
		flex = false,
		disabled = $bindable(false),
		noMargin = false,
		collapse = false,
		repeatSubmitDelay = 500,
		onClick = undefined,
		label
	}: {
		label?: string;
		href?: string | undefined;
		size?: FormFieldSizeOptions;
		style?: ButtonStyle;
		type?: 'button' | 'submit' | 'reset';
		block?: boolean;
		flex?: boolean;
		disabled?: boolean;
		noMargin?: boolean;
		collapse?: boolean;
		repeatSubmitDelay?: number | 'infinite';
		onClick?: (() => void) | undefined;
	} = $props();

	const click = (e: Event) => {
		if (disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		onClick?.();
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
	class="{size} {style} {flex ? 'flex' : ''}"
	class:block
	class:noMargin
	class:collapse
	{disabled}
>
	{#if label}
		<span class="label">{label}</span>
	{/if}
</button>

<style lang="scss">
	button {
		display: inline-block;
		min-width: 10rem;
		cursor: pointer;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		border-width: 1px;
		border-style: solid;
		border-radius: 0.25rem;
		color: #e2e2e2;
		cursor: pointer;
		display: inline-block;
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.25rem;
		padding: 0.5rem 1rem;
		text-align: center;
		text-decoration: none;
		transition:
			background-color 0.2s ease-in-out,
			border-color 0.2s ease-in-out,
			color 0.2s ease-in-out,
			fill 0.2s ease-in-out,
			stroke 0.2s ease-in-out;
		user-select: none;
		white-space: nowrap;
		font-family: var(--base-font-family, sans-serif);
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
			padding: 0.5rem;
		}

		&.flex {
			flex-grow: 1;
		}

		&.block {
			display: block;
			width: 100%;
		}

		&.sm {
			font-size: 0.75rem;
			line-height: 1rem;
			padding: 0.25rem 0.5rem;
		}

		&.lg {
			font-size: 1rem;
			line-height: 1.5rem;
			padding: 0.75rem 1.5rem;
		}

		&.xl {
			font-size: 1.25rem;
			line-height: 1.75rem;
			padding: 1rem 2rem;
		}

		&.full {
			width: 100%;
			padding: 0.5rem 0;
			display: block;
			min-width: auto;
			flex-grow: 1;
		}

		&:hover {
			background-color: #4c4c4c;
		}

		&.primary {
			background-color: var(--button-primary-bg, #1e88e5);
			border-color: var(--button-primary-border, #1e88e5);
			color: var(--button-primary-fg, #fff);

			&:hover {
				background-color: var(--button-primary-hover-bg, #0052a3);
				color: var(--button-primary-hover-fg, #fff);
			}
		}

		&.secondary {
			background-color: var(--button-secondary-bg, #555);
			border-color: var(--button-secondary-border, #aaa);
			color: var(--button-secondary-fg, #fff);

			&:hover {
				background-color: var(--button-secondary-hover-bg, #333);
				color: var(--button-secondary-hover-fg, #fff);
			}
		}

		&.positive {
			background-color: var(--button-positive-bg, #43a047);
			border-color: var(--button-positive-border, #43a047);
			color: var(--button-positive-fg, #fff);

			&:hover {
				background-color: var(--button-positive-hover-bg, #388e3c);
				color: var(--button-positive-hover-fg, #fff);
			}
		}

		&.danger {
			background-color: var(--button-danger-bg, #e53935);
			border-color: var(--button-danger-border, #e53935);
			color: var(--button-danger-fg, #fff);

			&:hover {
				background-color: var(--button-danger-hover-bg, #c62828);
				color: var(--button-danger-hover-fg, #fff);
			}
		}

		&.outline {
			background-color: var(--body-bg, #fff);
			border-color: var(--body-fg, #000);
			color: var(--body-fg, #000);
			text-shadow: none;
			font-weight: 400;

			&:hover {
				background-color: var(--body-fg, #000);
				color: var(--body-bg, #fff);
			}
		}

		&.link {
			background-color: transparent;
			border-color: transparent;
			color: var(--base-link-fg, #1e88e5);
			text-decoration: underline;

			&:hover {
				color: var(--base-link-hover-fg, #1e88e5);
			}
		}
	}
</style>
