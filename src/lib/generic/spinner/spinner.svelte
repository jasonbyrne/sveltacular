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
		border: 2px solid var(--spinner-border, rgba(0, 0, 0, 0.1));
		border-top-color: var(--spinner-primary-color, #1e88e5);
		border-radius: 50%;
		animation: spin 0.6s linear infinite;

		&.sm {
			width: 1rem;
			height: 1rem;
			border-width: 1.5px;
		}

		&.md {
			width: 1.5rem;
			height: 1.5rem;
			border-width: 2px;
		}

		&.lg {
			width: 2rem;
			height: 2rem;
			border-width: 2.5px;
		}

		&.xl {
			width: 3rem;
			height: 3rem;
			border-width: 3px;
		}

		&.secondary {
			border-top-color: var(--spinner-secondary-color, #555);
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

