/**
 * Position Composable
 *
 * Reactive positioning for floating elements (tooltips, popovers, dropdowns).
 * Automatically updates position on scroll and resize events.
 *
 * @example
 * ```svelte
 * <script>
 *   import { usePosition } from '$lib/helpers/use-position.svelte';
 *
 *   let buttonRef: HTMLElement;
 *   let tooltipRef: HTMLElement;
 *
 *   const position = usePosition(() => buttonRef, () => tooltipRef, {
 *     placement: 'top',
 *     arrow: true
 *   });
 * </script>
 *
 * <button bind:this={buttonRef}>Hover me</button>
 *
 * <div
 *   bind:this={tooltipRef}
 *   style="position: fixed; top: {position.top}px; left: {position.left}px;"
 * >
 *   Tooltip content
 * </div>
 * ```
 */

import {
	calculatePosition,
	calculateArrowPosition,
	type Position,
	type ArrowPosition,
	type PositionOptions
} from './positioning.js';
import { onMount } from 'svelte';

export interface UsePositionOptions extends PositionOptions {
	/**
	 * Whether positioning is enabled
	 * @default true
	 */
	enabled?: boolean;

	/**
	 * Update position on scroll
	 * @default true
	 */
	updateOnScroll?: boolean;

	/**
	 * Update position on resize
	 * @default true
	 */
	updateOnResize?: boolean;
}

export class PositionManager {
	// Position state
	top = $state(0);
	left = $state(0);
	side = $state<Position['side']>('bottom');
	alignment = $state<Position['alignment']>('center');

	// Arrow state
	arrowTop = $state<number | undefined>(undefined);
	arrowLeft = $state<number | undefined>(undefined);
	arrowSide = $state<ArrowPosition['side']>('bottom');

	// Element getters
	private getReferenceElement: () => Element | null;
	private getFloatingElement: () => Element | null;

	// Options
	private options: UsePositionOptions;

	// Cleanup
	private cleanup: (() => void) | null = null;
	private rafId: number | null = null;

	constructor(
		getReferenceElement: () => Element | null,
		getFloatingElement: () => Element | null,
		options: UsePositionOptions
	) {
		this.getReferenceElement = getReferenceElement;
		this.getFloatingElement = getFloatingElement;
		this.options = {
			enabled: true,
			updateOnScroll: true,
			updateOnResize: true,
			...options
		};
	}

	/**
	 * Update the position
	 */
	update() {
		// Cancel any pending update
		if (this.rafId !== null) {
			cancelAnimationFrame(this.rafId);
		}

		// Schedule update in next frame
		this.rafId = requestAnimationFrame(() => {
			this.rafId = null;

			if (!this.options.enabled) return;

			const reference = this.getReferenceElement();
			const floating = this.getFloatingElement();

			if (!reference || !floating) return;

			// Calculate position
			const position = calculatePosition(reference, floating, this.options);
			this.top = position.top;
			this.left = position.left;
			this.side = position.side;
			this.alignment = position.alignment;

			// Calculate arrow position if enabled
			if (this.options.arrow) {
				const arrow = calculateArrowPosition(
					reference,
					floating,
					position.side,
					this.options.arrowSize
				);
				this.arrowTop = arrow.top;
				this.arrowLeft = arrow.left;
				this.arrowSide = arrow.side;
			}
		});
	}

	/**
	 * Start listening for scroll and resize events
	 */
	start() {
		this.stop(); // Clean up any existing listeners

		// Initial update
		this.update();

		// Set up event listeners
		const listeners: Array<() => void> = [];

		if (this.options.updateOnScroll) {
			const scrollHandler = () => this.update();
			window.addEventListener('scroll', scrollHandler, { passive: true });
			listeners.push(() => window.removeEventListener('scroll', scrollHandler));
		}

		if (this.options.updateOnResize) {
			const resizeHandler = () => this.update();
			window.addEventListener('resize', resizeHandler, { passive: true });
			listeners.push(() => window.removeEventListener('resize', resizeHandler));
		}

		// Store cleanup function
		this.cleanup = () => {
			listeners.forEach((cleanup) => cleanup());
			if (this.rafId !== null) {
				cancelAnimationFrame(this.rafId);
				this.rafId = null;
			}
		};
	}

	/**
	 * Stop listening for events
	 */
	stop() {
		if (this.cleanup) {
			this.cleanup();
			this.cleanup = null;
		}
	}

	/**
	 * Update options
	 */
	setOptions(options: Partial<UsePositionOptions>) {
		this.options = { ...this.options, ...options };
		this.update();
	}

	/**
	 * Get current position as style object
	 */
	get style(): string {
		return `position: fixed; top: ${this.top}px; left: ${this.left}px;`;
	}

	/**
	 * Get arrow style object
	 */
	get arrowStyle(): string {
		const styles: string[] = ['position: absolute;'];

		if (this.arrowLeft !== undefined) {
			styles.push(`left: ${this.arrowLeft}px;`);
		}
		if (this.arrowTop !== undefined) {
			styles.push(`top: ${this.arrowTop}px;`);
		}

		// Position arrow on the correct side
		// Overlap by 1px to bridge gap created by border-radius
		switch (this.arrowSide) {
			case 'top':
				styles.push('bottom: calc(100% - 1px);');
				break;
			case 'bottom':
				styles.push('top: calc(100% - 1px);');
				break;
			case 'left':
				styles.push('right: calc(100% - 1px);');
				break;
			case 'right':
				styles.push('left: calc(100% - 1px);');
				break;
		}

		return styles.join(' ');
	}
}

/**
 * Create a position manager instance
 *
 * @param getReferenceElement - Function that returns the reference element
 * @param getFloatingElement - Function that returns the floating element
 * @param options - Positioning options
 * @returns PositionManager instance
 */
export function usePosition(
	getReferenceElement: () => Element | null,
	getFloatingElement: () => Element | null,
	options: UsePositionOptions
): PositionManager {
	const manager = new PositionManager(getReferenceElement, getFloatingElement, options);

	// Auto-start on mount
	onMount(() => {
		manager.start();
		return () => manager.stop();
	});

	return manager;
}
