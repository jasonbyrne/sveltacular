<script lang="ts">
	import type { ComponentSize } from '$src/lib/types/size.js';

	let {
		count = 0,
		max = 99,
		size = 'md' as ComponentSize,
		variant = 'standard' as 'standard' | 'positive' | 'negative' | 'warning',
		showZero = false
	}: {
		count?: number;
		max?: number;
		size?: ComponentSize;
		variant?: 'standard' | 'positive' | 'negative' | 'warning';
		showZero?: boolean;
	} = $props();

	let displayCount = $derived(count > max ? `${max}+` : count.toString());
	let visible = $derived(showZero || count > 0);
</script>

{#if visible}
	<span class="badge {size} {variant}" aria-label="{count} notifications">
		{displayCount}
	</span>
{/if}

<style lang="scss">
	.badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-full);
		background-color: var(--badge-bg);
		color: var(--badge-fg);
		font-weight: 600;
		line-height: 1;
		min-width: 1.25rem;
		height: 1.25rem;
		padding: 0 var(--spacing-xs);
		font-size: var(--font-sm);

		&.sm {
			min-width: var(--spacing-base);
			height: var(--spacing-base);
			padding: 0 var(--spacing-xs);
			font-size: var(--font-xs);
		}

		&.md {
			min-width: 1.25rem;
			height: 1.25rem;
			padding: 0 var(--spacing-xs);
			font-size: var(--font-sm);
		}

		&.lg {
			min-width: var(--spacing-lg);
			height: var(--spacing-lg);
			padding: 0 var(--spacing-sm);
			font-size: var(--font-base);
		}

		&.xl {
			min-width: 1.75rem;
			height: 1.75rem;
			padding: 0 var(--spacing-md);
			font-size: var(--font-md);
		}

		&.standard {
			background-color: var(--badge-standard-bg);
			color: var(--badge-standard-fg);
		}

		&.positive {
			background-color: var(--badge-positive-bg);
			color: var(--badge-positive-fg);
		}

		&.negative {
			background-color: var(--badge-negative-bg);
			color: var(--badge-negative-fg);
		}

		&.warning {
			background-color: var(--badge-warning-bg);
			color: var(--badge-warning-fg);
		}
	}
</style>
