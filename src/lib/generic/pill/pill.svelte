<script lang="ts">
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';

	export let size: FormFieldSizeOptions = 'md';
	export let style: 'standard' | 'positive' | 'negative' = 'standard';
	export let shape: 'circular' | 'square' | 'rounded' | 'badge' = 'rounded';
	export let fill: 'solid' | 'outline' = 'solid';
</script>

<span class="pill {size} {style} {shape} {fill}">
	<slot />
</span>

<style lang="scss">
	.pill {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		border-radius: 1.5rem;
		background-color: #f1f5f9;
		font-size: 0.75rem;
		font-weight: 500;
		color: #4a5568;
		font-family: var(--base-font-family, sans-serif);

		&.sm {
			font-size: 0.625rem;
			padding: 0.125rem 0.25rem;
		}

		&.lg {
			font-size: 0.875rem;
			padding: 0.375rem 0.75rem;
		}

		&.xl {
			font-size: 1rem;
			padding: 0.5rem 1rem;
		}

		&.badge {
			border-radius: 0.5rem;
		}

		&.square {
			border-radius: 0;
		}

		&.outline {
			background-color: transparent;
			border: 1px solid #4a5568;
			color: #4a5568;
		}

		&.circular {
			border-radius: 50%;
		}

		&.positive {
			background-color: #0a5200;
			color: #fff;

			&.outline {
				background-color: transparent;
				border: 1px solid #0a5200;
				color: #0a5200;
			}
		}

		&.negative {
			background-color: #570000;
			color: #fff;

			&.outline {
				background-color: transparent;
				border: 1px solid #570000;
				color: #570000;
			}
		}

	}
</style>
