<script lang="ts">
	import type { ComponentSize } from '$src/lib/types/size.js';

	let {
		size = 'md' as ComponentSize,
		variant = 'primary' as 'primary' | 'secondary'
	}: {
		size?: ComponentSize;
		variant?: 'primary' | 'secondary';
	} = $props();
</script>

<div class="spinner {size} {variant}" role="status" aria-label="Loading">
	<span class="sr-only">Loading...</span>
</div>

<style lang="scss">
	.spinner {
		display: inline-block;
		border: var(--border-base) solid var(--spinner-border);
		border-top-color: var(--spinner-primary-color);
		border-radius: var(--radius-full);
		animation: spin 0.6s linear infinite;

		&.sm {
			width: var(--spacing-base);
			height: var(--spacing-base);
			border-width: 1.5px;
		}

		&.md {
			width: var(--spacing-lg);
			height: var(--spacing-lg);
			border-width: var(--border-base);
		}

		&.lg {
			width: var(--spacing-xl);
			height: var(--spacing-xl);
			border-width: 2.5px;
		}

		&.xl {
			width: var(--spacing-2xl);
			height: var(--spacing-2xl);
			border-width: var(--border-thick);
		}

		&.secondary {
			border-top-color: var(--spinner-secondary-color);
		}

		.sr-only {
			position: absolute;
			width: 1px;
			height: 1px;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			border-width: 0;
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
