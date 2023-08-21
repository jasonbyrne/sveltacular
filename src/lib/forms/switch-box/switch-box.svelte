<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import type { FormFieldSizeOptions } from '$src/lib/index.js';
	import { createEventDispatcher } from 'svelte';

	export let checked = false;
	export let unCheckedColor = '#ccc';
	export let checkedColor = '#007bff';
	export let size: FormFieldSizeOptions = 'full';

	const id = uniqueId();
	const dispatch = createEventDispatcher<{ change: boolean }>();
</script>

<label
	class="switch-box {checked ? 'checked' : ''} {size}"
	style={`--checked-color: ${checkedColor}; --unchecked-color: ${unCheckedColor};`}
>
	<input type="checkbox" bind:checked on:change={() => dispatch('change', checked)} {id} />
	<!-- svelte-ignore a11y-interactive-supports-focus -->
	<span class="switch">
		<span class="slider" />
	</span>
	{#if $$slots.default}
		<div class="text">
			<slot />
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
			background-color: var(--unchecked-color);
			position: relative;
			cursor: pointer;
			transition: background-color 0.2s ease-in-out;
			vertical-align: middle;
		}

		.slider {
			border-radius: 50%;
			position: absolute;
			transition: left 0.2s ease-in-out;
			background: #fff;
		}

		&.checked .switch {
			background-color: var(--checked-color);
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
				left: 1.4rem;
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
				left: 1.4rem;
			}

			.text {
				font-size: 1rem;
				margin-left: 0.65rem;
			}
		}
	}
</style>
