<script lang="ts">
	import { navigateTo } from '$src/lib/helpers/navigate-to.js';
	import type { ButtonStyle, FormFieldSizeOptions } from '$src/lib/types/form.js';
	import { createEventDispatcher } from 'svelte';

	export let href: string | undefined = undefined;
	export let size: FormFieldSizeOptions = 'md';
	export let style: ButtonStyle = 'secondary';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let block = false;
	export let flex = false;
	export let disabled = false;
	export let noMargin = false;
	export let collapse = false;

	const dispatch = createEventDispatcher<{ click: void }>();

	const click = (e: Event) => {
		if (disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		dispatch('click');
		if (href) {
			navigateTo(href);
		}
	};
</script>

<button {type} on:click={click} class="{size} {style} {flex ? 'flex' : ''}" class:block class:noMargin class:collapse {disabled}>
	<slot />
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
		transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			color 0.2s ease-in-out, fill 0.2s ease-in-out, stroke 0.2s ease-in-out;
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

		&.ghost {
			background-color: transparent;
			border-color: transparent;
			color: var(--base-fg, #ccc);
			text-decoration: none;

			&:hover {
				background-color: var(--button-ghost-hover-bg, #e0e0e0);
				color: var(--button-ghost-hover-fg, #1e88e5);
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
			background-color: transparent;
			border-color: var(--button-outline-border, #e2e2e2);
			color: var(--button-outline-fg, #e2e2e2);

			&:hover {
				background-color: var(--button-outline-hover-bg, #e2e2e2);
				color: var(--button-outline-hover-fg, #000);
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
