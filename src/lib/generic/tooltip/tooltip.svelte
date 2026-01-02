<script lang="ts">
	import type { Snippet } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import { usePosition } from '$src/lib/helpers/use-position.svelte.js';
	import type { Placement } from '$src/lib/helpers/positioning.js';

	let {
		text,
		position = 'top' as 'top' | 'bottom' | 'left' | 'right',
		placement = undefined as Placement | undefined,
		autoPosition = true,
		arrow = false,
		offset = 8,
		children
	}: {
		text: string;
		position?: 'top' | 'bottom' | 'left' | 'right';
		placement?: Placement;
		autoPosition?: boolean;
		arrow?: boolean;
		offset?: number;
		children: Snippet;
	} = $props();

	const tooltipId = uniqueId();
	let show = $state(false);
	let wrapperRef = $state<HTMLElement | null>(null);
	let tooltipRef = $state<HTMLElement | null>(null);

	// Use smart positioning if enabled
	let positionManager = $derived(autoPosition ? usePosition(
		() => wrapperRef,
		() => tooltipRef,
		{
			placement: placement || (position as Placement),
			offset,
			arrow,
			arrowSize: 6,
			enabled: show
		}
	) : null);

	// Update enabled state when show changes
	$effect(() => {
		if (positionManager) {
			positionManager.setOptions({ enabled: show });
			if (show) {
				positionManager.update();
			}
		}
	});
</script>

<div
	bind:this={wrapperRef}
	class="tooltip-wrapper"
	role="button"
	tabindex="0"
	onmouseenter={() => (show = true)}
	onmouseleave={() => (show = false)}
	onfocus={() => (show = true)}
	onblur={() => (show = false)}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			show = !show;
		}
	}}
	aria-describedby={show ? tooltipId : undefined}
>
	{@render children()}
	{#if show}
		{#if autoPosition && positionManager}
			<!-- Smart positioned tooltip (fixed positioning) -->
			<div 
				bind:this={tooltipRef}
				class="tooltip positioned"
				class:with-arrow={arrow}
				role="tooltip" 
				id={tooltipId} 
				aria-live="polite"
				style="position: fixed; top: {positionManager.top}px; left: {positionManager.left}px;"
			>
				{text}
				{#if arrow}
					<div 
						class="tooltip-arrow {positionManager.arrowSide}"
						style={positionManager.arrowStyle}
					></div>
				{/if}
			</div>
		{:else}
			<!-- Legacy positioned tooltip (relative positioning) -->
			<div 
				bind:this={tooltipRef}
				class="tooltip {position}" 
				role="tooltip" 
				id={tooltipId} 
				aria-live="polite"
			>
				{text}
			</div>
		{/if}
	{/if}
</div>

<style lang="scss">
	.tooltip-wrapper {
		position: relative;
		display: inline-block;
	}

	.tooltip {
		z-index: 1000;
		padding: 0.5rem 0.75rem;
		background-color: var(--tooltip-bg, #000);
		color: var(--tooltip-fg, #fff);
		border-radius: var(--radius-md, 0.25rem);
		font-size: var(--font-sm, 0.875rem);
		white-space: nowrap;
		pointer-events: none;
		box-shadow: var(--shadow-lg, 0 2px 8px rgba(0, 0, 0, 0.15));
		animation: tooltip-fade-in 0.15s ease-out;

		&.positioned {
			/* Fixed positioning handled by inline styles */
		}

		&.with-arrow {
			/* Add space for arrow */
		}

		/* Legacy relative positioning */
		&:not(.positioned) {
			position: absolute;

			&.top {
				bottom: 100%;
				left: 50%;
				transform: translateX(-50%);
				margin-bottom: 0.5rem;
			}

			&.bottom {
				top: 100%;
				left: 50%;
				transform: translateX(-50%);
				margin-top: 0.5rem;
			}

			&.left {
				right: 100%;
				top: 50%;
				transform: translateY(-50%);
				margin-right: 0.5rem;
			}

			&.right {
				left: 100%;
				top: 50%;
				transform: translateY(-50%);
				margin-left: 0.5rem;
			}
		}
	}

	.tooltip-arrow {
		position: absolute;
		width: 0;
		height: 0;
		border-style: solid;

		&.top {
			border-width: 6px 6px 0 6px;
			border-color: var(--tooltip-bg, #000) transparent transparent transparent;
		}

		&.bottom {
			border-width: 0 6px 6px 6px;
			border-color: transparent transparent var(--tooltip-bg, #000) transparent;
		}

		&.left {
			border-width: 6px 0 6px 6px;
			border-color: transparent transparent transparent var(--tooltip-bg, #000);
		}

		&.right {
			border-width: 6px 6px 6px 0;
			border-color: transparent var(--tooltip-bg, #000) transparent transparent;
		}
	}

	@keyframes tooltip-fade-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>

