<script lang="ts">
	import type { ComponentSize } from '$src/lib/types/size.js';

	let {
		label,
		removable = false,
		size = 'md' as ComponentSize,
		variant = 'standard' as 'standard' | 'positive' | 'negative',
		onRemove = undefined
	}: {
		label: string;
		removable?: boolean;
		size?: ComponentSize;
		variant?: 'standard' | 'positive' | 'negative';
		onRemove?: (() => void) | undefined;
	} = $props();
</script>

<div class="chip {size} {variant}">
	<span class="label">{label}</span>
	{#if removable}
		<button type="button" class="remove" onclick={onRemove} aria-label="Remove {label}">
			×
		</button>
	{/if}
</div>

<style lang="scss">
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
		background-color: var(--chip-bg, #e0e0e0);
		color: var(--chip-fg, #000);
		font-size: 0.875rem;
		font-weight: 500;

		.label {
			line-height: 1.5;
		}

		.remove {
			background: none;
			border: none;
			cursor: pointer;
			padding: 0;
			margin-left: 0.25rem;
			font-size: 1.25rem;
			line-height: 1;
			color: inherit;
			opacity: 0.7;
			transition: opacity 0.2s ease-in-out;

			&:hover {
				opacity: 1;
			}

			&:focus {
				outline: 2px solid currentColor;
				outline-offset: 2px;
				border-radius: 0.125rem;
			}
		}

		&.sm {
			padding: 0.125rem 0.5rem;
			font-size: 0.75rem;
		}

		&.md {
			padding: 0.25rem 0.75rem;
			font-size: 0.875rem;
		}

		&.lg {
			padding: 0.375rem 1rem;
			font-size: 1rem;
		}

		&.standard {
			background-color: var(--chip-standard-bg, #e0e0e0);
			color: var(--chip-standard-fg, #000);
		}

		&.positive {
			background-color: var(--chip-positive-bg, #c8e6c9);
			color: var(--chip-positive-fg, #2e7d32);
		}

		&.negative {
			background-color: var(--chip-negative-bg, #ffcdd2);
			color: var(--chip-negative-fg, #c62828);
		}
	}
</style>






