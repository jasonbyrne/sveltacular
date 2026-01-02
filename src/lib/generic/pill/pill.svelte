<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';

	let {
		size = 'md' as FormFieldSizeOptions,
		variant = 'standard' as 'standard' | 'positive' | 'negative',
		shape = 'rounded' as 'circular' | 'square' | 'rounded' | 'badge' | 'circle',
		fill = 'solid' as 'solid' | 'outline',
		compact = false,
		label
	}: {
		size?: FormFieldSizeOptions;
		variant?: 'standard' | 'positive' | 'negative';
		shape?: 'circular' | 'square' | 'rounded' | 'badge' | 'circle';
		fill?: 'solid' | 'outline';
		compact?: boolean;
		label?: string;
	} = $props();
</script>

<div class="pill {size} {variant} {shape} {fill}" class:compact>
	<span>{label}</span>
</div>

<style lang="scss">
	.pill {
		display: inline-block;
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: var(--radius-pill);
		background-color: var(--base-color-fg);
		font-size: var(--font-sm);
		font-weight: 500;
		color: var(--base-color-bg);
		font-family: var(--base-font-family);

		&.compact {
			padding: var(--spacing-xs);
		}

		&.sm {
			font-size: var(--font-xs);
			padding: var(--spacing-xs) var(--spacing-xs);
		}

		&.lg {
			font-size: var(--font-base);
			padding: var(--spacing-xs) var(--spacing-md);
		}

		&.xl {
			font-size: var(--font-md);
			padding: var(--spacing-sm) var(--spacing-base);
		}

		&.badge {
			border-radius: var(--radius-lg);
		}

		&.square {
			border-radius: 0;
		}

		&.outline {
			background-color: transparent;
			border: var(--border-thin) solid var(--gray-600);
			color: var(--gray-600);
		}

		&.circular {
			border-radius: var(--radius-full);
		}

		&.circle {
			border-radius: var(--radius-full);
			width: 1.75rem;
			height: 1.75rem;
			position: relative;

			&.sm {
				width: 1.25rem;
				height: 1.25rem;
			}

			&.lg {
				width: 2.25rem;
				height: 2.25rem;
			}

			&.xl {
				width: var(--spacing-2xl);
				height: var(--spacing-2xl);
			}

			span {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
			}
		}

		&.positive {
			background-color: var(--color-success);
			color: #fff;

			&.outline {
				background-color: transparent;
				border: var(--border-thin) solid var(--color-success);
				color: var(--color-success);
			}
		}

		&.negative {
			background-color: var(--color-error);
			color: #fff;

			&.outline {
				background-color: transparent;
				border: var(--border-thin) solid var(--color-error);
				color: var(--color-error);
			}
		}
	}
</style>
