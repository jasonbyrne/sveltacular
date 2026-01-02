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
		border-radius: 50%;
		background-color: var(--badge-bg, #e53935);
		color: var(--badge-fg, #fff);
		font-weight: 600;
		line-height: 1;
		min-width: 1.25rem;
		height: 1.25rem;
		padding: 0 0.375rem;
		font-size: 0.75rem;

		&.sm {
			min-width: 1rem;
			height: 1rem;
			padding: 0 0.25rem;
			font-size: 0.625rem;
		}

		&.md {
			min-width: 1.25rem;
			height: 1.25rem;
			padding: 0 0.375rem;
			font-size: 0.75rem;
		}

		&.lg {
			min-width: 1.5rem;
			height: 1.5rem;
			padding: 0 0.5rem;
			font-size: 0.875rem;
		}

		&.xl {
			min-width: 1.75rem;
			height: 1.75rem;
			padding: 0 0.625rem;
			font-size: 1rem;
		}

		&.standard {
			background-color: var(--badge-standard-bg, #666);
			color: var(--badge-standard-fg, #fff);
		}

		&.positive {
			background-color: var(--badge-positive-bg, #43a047);
			color: var(--badge-positive-fg, #fff);
		}

		&.negative {
			background-color: var(--badge-negative-bg, #e53935);
			color: var(--badge-negative-fg, #fff);
		}

		&.warning {
			background-color: var(--badge-warning-bg, #ff9800);
			color: var(--badge-warning-fg, #fff);
		}
	}
</style>

