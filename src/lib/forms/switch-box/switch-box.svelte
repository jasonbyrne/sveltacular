<script lang="ts">
	import type { Snippet } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import type { FormFieldSizeOptions } from '$src/lib/index.js';

	let {
		checked = $bindable(false),
		size = 'full' as FormFieldSizeOptions,
		onChange = undefined,
		children
	}: {
		checked?: boolean;
		size?: FormFieldSizeOptions;
		onChange?: ((checked: boolean) => void) | undefined;
		children?: Snippet;
	} = $props();

	const id = uniqueId();
</script>

<label class="switch-box {checked ? 'checked' : ''} {size}">
	<input type="checkbox" bind:checked onchange={() => onChange?.(checked)} {id} />
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<span class="switch">
		<span class="slider"></span>
	</span>
	{#if children}
		<div class="text">
			{@render children?.()}
		</div>
	{/if}
</label>

<style lang="scss">
	label {
		display: flex;
		align-items: center;
		cursor: pointer;

		input {
			width: 0;
			height: 0;
		}

		.switch {
			background-color: var(--form-switch-unchecked-bg);
			position: relative;
			cursor: pointer;
			transition: background-color var(--transition-base) var(--ease-in-out);
			vertical-align: middle;
		}

		.slider {
			border-radius: var(--radius-full);
			position: absolute;
			transition: left var(--transition-base) var(--ease-in-out);
			background-color: var(--form-switch-unchecked-fg);
		}

		&.checked {
			.switch {
				background-color: var(--form-switch-checked-bg, #3182ce);
			}
			.slider {
				background-color: var(--form-switch-checked-fg, white);
			}
		}

		/* Sizes */

		&.xl {
			.switch {
				width: 4rem;
				height: 2rem;
				border-radius: 1rem;
			}

			.slider {
				width: 1.6rem;
				height: 1.6rem;
				top: 0.2rem;
				left: 0.2rem;
			}

			&.checked .slider {
				left: 2.25rem;
			}

			.text {
				font-size: 1.5rem;
				margin-left: 1rem;
			}
		}

		&.lg {
			.switch {
				width: 3rem;
				height: 1.5rem;
				border-radius: 0.75rem;
			}

			.slider {
				width: 1.2rem;
				height: 1.2rem;
				top: 0.15rem;
				left: 0.15rem;
			}

			&.checked .slider {
				left: 1.65rem;
			}

			.text {
				font-size: 1.2rem;
				margin-left: 0.8rem;
			}
		}

		&.md {
			.switch {
				width: 2.5rem;
				height: 1.4rem;
				border-radius: 0.7rem;
			}

			.slider {
				width: 1.2rem;
				height: 1.2rem;
				top: 0.1rem;
				left: 0.1rem;
			}

			&.checked .slider {
				left: 1.2rem;
			}

			.text {
				font-size: 1rem;
				margin-left: 0.65rem;
			}
		}

		&.sm {
			.switch {
				width: 1.5rem;
				height: 0.75rem;
				border-radius: 0.375rem;
			}

			.slider {
				width: 0.6rem;
				height: 0.6rem;
				top: 0.075rem;
				left: 0.075rem;
			}

			&.checked .slider {
				left: 0.825rem;
			}

			.text {
				font-size: 0.8rem;
				margin-left: 0.5rem;
			}
		}

		&.full {
			width: 100%;

			.switch {
				width: 2.5rem;
				height: 1.4rem;
				border-radius: 0.7rem;
			}

			.slider {
				width: 1.2rem;
				height: 1.2rem;
				top: 0.1rem;
				left: 0.1rem;
			}

			&.checked .slider {
				left: 1.2rem;
			}

			.text {
				font-size: 1rem;
				margin-left: 0.65rem;
			}
		}
	}
</style>
