<script lang="ts">
	import type { Snippet } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import { browser } from '$app/environment';
	import { usePosition } from '$src/lib/helpers/use-position.svelte.js';
	import type { Placement } from '$src/lib/helpers/positioning.js';

	let {
		open = $bindable(false),
		position = 'bottom' as 'top' | 'bottom' | 'left' | 'right',
		placement = undefined as Placement | undefined,
		autoPosition = true,
		arrow = false,
		offset = 8,
		trigger,
		children
	}: {
		open?: boolean;
		position?: 'top' | 'bottom' | 'left' | 'right';
		placement?: Placement;
		autoPosition?: boolean;
		arrow?: boolean;
		offset?: number;
		trigger?: Snippet;
		children?: Snippet;
	} = $props();

	const popoverId = uniqueId();
	let triggerElement: HTMLElement | null = $state(null);
	let popoverElement: HTMLElement | null = $state(null);

	// Use smart positioning if enabled
	let positionManager = $derived(
		autoPosition
			? usePosition(
					() => triggerElement,
					() => popoverElement,
					{
						placement: placement || (position as Placement),
						offset,
						arrow,
						arrowSize: 8,
						enabled: open
					}
				)
			: null
	);

	const handleClickOutside = (e: MouseEvent) => {
		if (
			browser &&
			popoverElement &&
			triggerElement &&
			!popoverElement.contains(e.target as Node) &&
			!triggerElement.contains(e.target as Node)
		) {
			open = false;
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			open = !open;
		}
	};

	$effect(() => {
		if (open && browser) {
			document.addEventListener('click', handleClickOutside);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});

	// Update position manager when open state changes
	$effect(() => {
		if (positionManager) {
			positionManager.setOptions({ enabled: open });
			if (open) {
				positionManager.update();
			}
		}
	});
</script>

<div class="popover-wrapper">
	<div
		bind:this={triggerElement}
		onclick={() => (open = !open)}
		onkeydown={handleKeyDown}
		role="button"
		tabindex="0"
		aria-expanded={open}
		aria-haspopup="true"
	>
		{@render trigger?.()}
	</div>
	{#if open}
		{#if autoPosition && positionManager}
			<!-- Smart positioned popover (fixed positioning) -->
			<div
				bind:this={popoverElement}
				class="popover positioned"
				class:with-arrow={arrow}
				role="dialog"
				id={popoverId}
				aria-modal="false"
				style="position: fixed; top: {positionManager.top}px; left: {positionManager.left}px;"
			>
				{@render children?.()}
				{#if arrow}
					<div
						class="popover-arrow {positionManager.arrowSide}"
						style={positionManager.arrowStyle}
					></div>
				{/if}
			</div>
		{:else}
			<!-- Legacy positioned popover (relative positioning) -->
			<div
				bind:this={popoverElement}
				class="popover {position}"
				role="dialog"
				id={popoverId}
				aria-modal="false"
			>
				{@render children?.()}
			</div>
		{/if}
	{/if}
</div>

<style lang="scss">
	.popover-wrapper {
		position: relative;
		display: inline-block;
	}

	.popover {
		z-index: 1000;
		padding: var(--spacing-md);
		background-color: var(--popover-bg);
		border: var(--border-thin) solid var(--popover-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);
		min-width: 12rem;
		max-width: 20rem;
		animation: popover-fade-in 0.2s ease-out;

		&.positioned {
			/* Fixed positioning handled by inline styles */
			position: fixed;
		}

		&.with-arrow {
			/* Add space for arrow if needed */
			position: relative;
		}

		/* Legacy relative positioning */
		&:not(.positioned) {
			position: absolute;

			&.top {
				bottom: 100%;
				left: 50%;
				transform: translateX(-50%);
				margin-bottom: var(--spacing-sm);
			}

			&.bottom {
				top: 100%;
				left: 50%;
				transform: translateX(-50%);
				margin-top: var(--spacing-sm);
			}

			&.left {
				right: 100%;
				top: 50%;
				transform: translateY(-50%);
				margin-right: var(--spacing-sm);
			}

			&.right {
				left: 100%;
				top: 50%;
				transform: translateY(-50%);
				margin-left: var(--spacing-sm);
			}
		}
	}

	.popover-arrow {
		position: absolute;
		width: 0;
		height: 0;
		border-style: solid;

		&.top {
			border-width: 8px 8px 0 8px;
			border-color: var(--popover-bg) transparent transparent transparent;
			filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));
		}

		&.bottom {
			border-width: 0 8px 8px 8px;
			border-color: transparent transparent var(--popover-bg) transparent;
			filter: drop-shadow(0 -2px 2px rgba(0, 0, 0, 0.1));
		}

		&.left {
			border-width: 8px 0 8px 8px;
			border-color: transparent transparent transparent var(--popover-bg);
			filter: drop-shadow(2px 0 2px rgba(0, 0, 0, 0.1));
		}

		&.right {
			border-width: 8px 8px 8px 0;
			border-color: transparent var(--popover-bg) transparent transparent;
			filter: drop-shadow(-2px 0 2px rgba(0, 0, 0, 0.1));
		}
	}

	@keyframes popover-fade-in {
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
