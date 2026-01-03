<script lang="ts">
	import type { Snippet } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import { usePosition } from '$src/lib/helpers/use-position.svelte.js';
	import type { Placement } from '$src/lib/helpers/positioning.js';

	type TriggerMode = 'hover' | 'focus' | 'click' | 'manual';

	let {
		// Content
		title = undefined as string | undefined,
		text = undefined as string | undefined,
		content = undefined as Snippet | undefined,

		// Positioning
		placement = 'top' as Placement,
		offset = 8,
		arrow = true,

		// Trigger behavior
		trigger = 'hover' as TriggerMode,
		openDelay = 0,
		closeDelay = 0,

		// Controlled state
		open = $bindable(false),

		// Disabled state
		disabled = false,

		// Styling
		class: className = '',

		// Trigger element
		children
	}: {
		title?: string;
		text?: string;
		content?: Snippet;
		placement?: Placement;
		offset?: number;
		arrow?: boolean;
		trigger?: TriggerMode;
		openDelay?: number;
		closeDelay?: number;
		open?: boolean;
		disabled?: boolean;
		class?: string;
		children: Snippet;
	} = $props();

	const tooltipId = uniqueId();
	let triggerRef = $state<HTMLElement | null>(null);
	let tooltipRef = $state<HTMLElement | null>(null);
	let openTimeoutId: ReturnType<typeof setTimeout> | null = null;
	let closeTimeoutId: ReturnType<typeof setTimeout> | null = null;

	// Check if tooltip has content to show
	const hasContent = $derived(
		(typeof title === 'string' && title.trim().length > 0) ||
			(typeof text === 'string' && text.trim().length > 0) ||
			content !== undefined
	);

	// Position manager - always enabled since we control via open state
	let positionManager = $derived(
		usePosition(
			() => triggerRef,
			() => tooltipRef,
			{
				placement,
				offset,
				arrow,
				arrowSize: 8,
				enabled: open
			}
		)
	);

	// Clear any pending timeouts
	function clearTimeouts() {
		if (openTimeoutId) {
			clearTimeout(openTimeoutId);
			openTimeoutId = null;
		}
		if (closeTimeoutId) {
			clearTimeout(closeTimeoutId);
			closeTimeoutId = null;
		}
	}

	// Show tooltip with optional delay
	function show() {
		if (disabled || !hasContent) return;
		clearTimeouts();

		if (openDelay > 0) {
			openTimeoutId = setTimeout(() => {
				open = true;
				openTimeoutId = null;
			}, openDelay);
		} else {
			open = true;
		}
	}

	// Hide tooltip with optional delay
	function hide() {
		clearTimeouts();

		if (closeDelay > 0) {
			closeTimeoutId = setTimeout(() => {
				open = false;
				closeTimeoutId = null;
			}, closeDelay);
		} else {
			open = false;
		}
	}

	// Toggle tooltip (for click mode)
	function toggle() {
		if (disabled || !hasContent) return;
		clearTimeouts();
		open = !open;
	}

	// Event handlers based on trigger mode
	const handlers = $derived.by(() => {
		if (disabled || trigger === 'manual') {
			return {};
		}

		const baseHandlers: Record<string, (e: Event) => void> = {};

		if (trigger === 'hover' || trigger === 'focus') {
			// Hover triggers
			if (trigger === 'hover') {
				baseHandlers.onmouseenter = show;
				baseHandlers.onmouseleave = hide;
			}

			// Focus triggers
			if (trigger === 'focus') {
				baseHandlers.onfocus = show;
				baseHandlers.onblur = hide;
			}

			// Keyboard support (Escape to close)
			baseHandlers.onkeydown = (e: Event) => {
				const keyEvent = e as KeyboardEvent;
				if (keyEvent.key === 'Escape' && open) {
					hide();
					e.preventDefault();
				}
			};
		} else if (trigger === 'click') {
			// Click mode
			baseHandlers.onclick = (e: Event) => {
				toggle();
				e.stopPropagation();
			};

			// Close on Escape
			baseHandlers.onkeydown = (e: Event) => {
				const keyEvent = e as KeyboardEvent;
				if (keyEvent.key === 'Escape' && open) {
					hide();
					e.preventDefault();
				} else if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
					toggle();
					e.preventDefault();
				}
			};
		}

		return baseHandlers;
	});

	// Click outside to close (for click mode)
	$effect(() => {
		if (trigger === 'click' && open) {
			const handleClickOutside = (e: MouseEvent) => {
				if (
					triggerRef &&
					tooltipRef &&
					!triggerRef.contains(e.target as Node) &&
					!tooltipRef.contains(e.target as Node)
				) {
					hide();
				}
			};

			// Small delay to avoid closing immediately
			setTimeout(() => {
				document.addEventListener('click', handleClickOutside);
			}, 0);

			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});

	// Update position when open changes
	$effect(() => {
		if (open && positionManager) {
			positionManager.update();
		}
	});

	// Cleanup timeouts on unmount
	$effect(() => {
		return () => {
			clearTimeouts();
		};
	});

	// Determine if trigger needs to be interactive
	const needsInteraction = $derived(trigger !== 'manual');
	const ariaAttributes = $derived.by(() => {
		const attrs: Record<string, string | boolean | undefined> = {
			'aria-describedby': open ? tooltipId : undefined
		};

		// Add appropriate ARIA for click/manual modes
		if (trigger === 'click') {
			attrs['aria-expanded'] = open;
		}

		return attrs;
	});
</script>

<!-- Trigger wrapper -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<span
	bind:this={triggerRef}
	class="tooltip-trigger {className}"
	class:disabled
	role={trigger === 'click' ? 'button' : undefined}
	tabindex={trigger === 'focus' || trigger === 'click' ? 0 : undefined}
	{...handlers}
	{...ariaAttributes}
>
	{@render children()}
</span>

<!-- Tooltip content portal -->
{#if open && !disabled && hasContent}
	<div
		bind:this={tooltipRef}
		class="tooltip"
		class:with-arrow={arrow}
		role="tooltip"
		id={tooltipId}
		aria-live="polite"
		style="position: fixed; top: {positionManager.top}px; left: {positionManager.left}px; z-index: 9999;"
		onmouseenter={() => {
			// Keep tooltip open when hovering over it (for hover mode)
			if (trigger === 'hover') {
				clearTimeouts();
			}
		}}
		onmouseleave={() => {
			// Close when leaving tooltip (for hover mode)
			if (trigger === 'hover') {
				hide();
			}
		}}
	>
		<div class="tooltip-content">
			{#if title}
				<div class="tooltip-title">{title}</div>
			{/if}
			{#if content}
				{@render content()}
			{:else if text}
				<div class="tooltip-text">{text}</div>
			{/if}
		</div>

		{#if arrow}
			<div
				class="tooltip-arrow {positionManager.arrowSide}"
				style={positionManager.arrowStyle}
			></div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.tooltip-trigger {
		display: inline-block;

		&.disabled {
			cursor: not-allowed;
			opacity: 0.6;
		}

		&:not(.disabled):focus-visible {
			outline: 2px solid var(--primary, #0066cc);
			outline-offset: 2px;
			border-radius: var(--radius-sm, 0.125rem);
		}
	}

	.tooltip {
		padding: 0.5rem 0.75rem;
		background-color: var(--tooltip-bg, #1a1a1a);
		color: var(--tooltip-fg, #ffffff);
		border-radius: var(--radius-md, 0.375rem);
		font-size: var(--font-sm, 0.875rem);
		line-height: 1.4;
		max-width: min(320px, 90vw);
		word-wrap: break-word;
		pointer-events: auto;
		box-shadow: var(
			--shadow-lg,
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06)
		);
		animation: tooltip-fade-in 0.15s ease-out;

		/* Ensure tooltip stays above other content */
		position: fixed;
	}

	.tooltip-content {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.tooltip-title {
		font-weight: 600;
		font-size: 0.9375rem; /* Slightly larger than body text */
		line-height: 1.3;
		color: var(--tooltip-title-fg, var(--tooltip-fg, #ffffff));
	}

	.tooltip-text {
		font-size: var(--font-sm, 0.875rem);
		line-height: 1.4;
	}

	.tooltip-arrow {
		position: absolute;
		width: 0;
		height: 0;
		border-style: solid;

		/* Arrow on top of tooltip, pointing up */
		&.top {
			border-width: 0 8px 8px 8px;
			border-color: transparent transparent var(--tooltip-bg, #1a1a1a) transparent;
		}

		/* Arrow on bottom of tooltip, pointing down */
		&.bottom {
			border-width: 8px 8px 0 8px;
			border-color: var(--tooltip-bg, #1a1a1a) transparent transparent transparent;
		}

		/* Arrow on left of tooltip, pointing left */
		&.left {
			border-width: 8px 8px 8px 0;
			border-color: transparent var(--tooltip-bg, #1a1a1a) transparent transparent;
		}

		/* Arrow on right of tooltip, pointing right */
		&.right {
			border-width: 8px 0 8px 8px;
			border-color: transparent transparent transparent var(--tooltip-bg, #1a1a1a);
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

	/* Mobile responsiveness considerations */
	@media (hover: none) {
		/* On touch devices, tooltips with hover trigger might not work well */
		/* Consider showing a visual indicator that tap is needed */
		.tooltip-trigger:not(.disabled) {
			cursor: pointer;
		}
	}
</style>
