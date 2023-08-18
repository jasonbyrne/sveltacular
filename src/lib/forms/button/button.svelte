<script lang="ts">
	import { navigateTo } from '$src/lib/helpers/navigate-to.js';
	import type { ButtonStyle, FormFieldSizeOptions } from '$src/lib/types/form.js';
	import { createEventDispatcher } from 'svelte';

	export let href: string | undefined = undefined;
	export let size: FormFieldSizeOptions = 'md';
	export let style: ButtonStyle = 'secondary';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let block = false;
	export let disabled = false;

	const dispatch = createEventDispatcher<{ click: void }>();

	const click = () => {
		dispatch('click');
		if (href) {
			navigateTo(href);
		}
	};
</script>

<button {type} on:click={click} class="{size} {style}" class:block {disabled}>
	<slot />
</button>

<style lang="scss">
	button {
		display: inline-block;
		min-width: 10rem;
		cursor: pointer;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		background-color: #5c5c5c;
		border: 1px solid #b7b7b7;
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
			color 0.2s ease-in-out, fill 0.2s ease-in-out, stroke 0.2s ease-in-out,
			box-shadow 0.2s ease-in-out;
		user-select: none;
		white-space: nowrap;

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
			background-color: #1e88e5;
			border-color: #1e88e5;
			color: #fff;

			&:hover {
				background-color: #1976d2;
				border-color: #1976d2;
			}
		}

		&.link,
		&.ghost {
			background-color: transparent;
			border-color: transparent;
			color: var(--sv-color-link);
			text-decoration: underline;

			&:hover {
				background-color: transparent;
				border-color: transparent;
				color: var(--sv-color-link-hover);
			}
		}

		&.positive {
			background-color: #43a047;
			border-color: #43a047;
			color: #fff;

			&:hover {
				background-color: #388e3c;
				border-color: #388e3c;
			}
		}

		&.danger {
			background-color: #8d0200;
			border-color: #8d0200;
			color: #fff;

			&:hover {
				background-color: #c62828;
				border-color: #c62828;
			}
		}

		&.negative {
			background-color: #e53935;
			border-color: #e53935;
			color: #fff;

			&:hover {
				background-color: #c62828;
				border-color: #c62828;
			}
		}

		&.tertiary {
			background-color: transparent;
			border-color: var(--sv-color-fg);
			color: var(--sv-color-fg);

			&:hover {
				background-color: var(--sv-color-fg);
				color: var(--sv-color-bg);
				border-color: var(--sv-color-bg);
			}
		}
	}
</style>
