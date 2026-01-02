<script lang="ts">
	import type { ComponentSize } from '$src/lib/types/size.js';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';

	const id = uniqueId();

	let {
		value = $bindable(0 as number),
		max = 5,
		size = 'md' as ComponentSize,
		readonly = false,
		onChange = undefined
	}: {
		value?: number;
		max?: number;
		size?: ComponentSize;
		readonly?: boolean;
		onChange?: ((value: number) => void) | undefined;
	} = $props();

	const setValue = (newValue: number) => {
		if (readonly) return;
		value = newValue;
		onChange?.(newValue);
	};
</script>

<div class="rating {size}" role="radiogroup" aria-label="Rating">
	{#each Array(max) as _, i}
		<button
			type="button"
			class="star {i < value ? 'filled' : 'empty'}"
			onclick={() => setValue(i + 1)}
			aria-label="Rate {i + 1} out of {max}"
			aria-checked={i < value}
			{readonly}
		>
			★
		</button>
	{/each}
</div>

<style lang="scss">
	.rating {
		display: inline-flex;
		gap: 0.25rem;
		align-items: center;

		.star {
			background: none;
			border: none;
			cursor: pointer;
			padding: 0;
			color: var(--rating-empty-color, #ccc);
			transition: color 0.2s ease-in-out;
			font-size: 1.5rem;
			line-height: 1;

			&.filled {
				color: var(--rating-filled-color, #ffc107);
			}

			&:hover:not([readonly]) {
				color: var(--rating-hover-color, #ffb300);
			}

			&[readonly] {
				cursor: default;
			}

			&:focus {
				outline: 2px solid var(--rating-focus-color, #3182ce);
				outline-offset: 2px;
				border-radius: 0.125rem;
			}
		}

		&.sm .star {
			font-size: 1rem;
		}

		&.md .star {
			font-size: 1.5rem;
		}

		&.lg .star {
			font-size: 2rem;
		}

		&.xl .star {
			font-size: 2.5rem;
		}
	}
</style>

