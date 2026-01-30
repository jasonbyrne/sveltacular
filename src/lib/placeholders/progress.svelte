<script lang="ts">
	import type { ComponentSize } from '$src/lib/types/size.js';

	let {
		value = 0,
		size = 'md' as ComponentSize
	}: {
		value?: number;
		size?: ComponentSize;
	} = $props(); // Value between 0 and 100
</script>

<div class="progress-bar {size}" style="--progress-value: {value}%">
	<div class="progress">
		<div class="progress-value">{value}%</div>
	</div>
</div>

<style lang="scss">
	.progress-bar {
		background-color: var(--gray-200);
		margin-bottom: 1rem;

		&.xs {
			height: var(--spacing-base); /* 16px */
			border-radius: calc(var(--spacing-base) / 2);

			.progress {
				border-radius: calc(var(--spacing-base) / 2);
				min-width: 2rem;
			}

			.progress-value {
				font-size: var(--font-xs); /* 10px */
				padding: 0 var(--spacing-xs);
			}
		}

		&.sm {
			height: var(--spacing-lg); /* 24px */
			border-radius: calc(var(--spacing-lg) / 2);

			.progress {
				border-radius: calc(var(--spacing-lg) / 2);
				min-width: 2.5rem;
			}

			.progress-value {
				font-size: var(--font-sm); /* 12px */
				padding: 0 var(--spacing-sm);
			}
		}

		&.md {
			height: var(--spacing-xl); /* 32px */
			border-radius: calc(var(--spacing-xl) / 2);

			.progress {
				border-radius: calc(var(--spacing-xl) / 2);
				min-width: 3rem;
			}

			.progress-value {
				font-size: var(--font-base); /* 14px */
				padding: 0 var(--spacing-md);
			}
		}

		&.lg {
			height: var(--spacing-2xl); /* 48px */
			border-radius: calc(var(--spacing-2xl) / 2);

			.progress {
				border-radius: calc(var(--spacing-2xl) / 2);
				min-width: 3.5rem;
			}

			.progress-value {
				font-size: var(--font-lg); /* 18px */
				padding: 0 var(--spacing-base);
			}
		}

		&.xl {
			height: 4rem; /* 64px */
			border-radius: 2rem;

			.progress {
				border-radius: 2rem;
				min-width: 4rem;
			}

			.progress-value {
				font-size: var(--font-xl); /* 20px */
				padding: 0 var(--spacing-lg);
			}
		}

		.progress {
			height: 100%;
			background-color: var(--color-info);
			color: white;
			transition: width 0.5s ease-in-out;
			width: var(--progress-value, 0%);
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}

		.progress-value {
			color: #ffffff;
			font-family: var(--base-font-family, sans-serif);
			font-weight: 600;
			text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
			white-space: nowrap;
		}
	}
</style>
