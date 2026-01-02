/**
 * Reusable Svelte actions for animations
 * Easy-to-use actions that can be applied to elements with `use:actionName`
 * @module animation-actions
 */

import {
	animateShake,
	animateBounce,
	animatePulse,
	animateFadeIn,
	animateFadeOut,
	animateSlideInTop,
	animateSlideInBottom,
	animateScaleIn,
	animateScaleOut,
	duration,
	easing,
	prefersReducedMotion,
	type AnimationOptions
} from './animations.js';
import type { Action } from 'svelte/action';

/**
 * Options for fade in action
 */
export interface FadeInOptions extends AnimationOptions {
	/** Delay before starting animation */
	delay?: number;
}

/**
 * Fade in element on mount
 *
 * @example
 * ```svelte
 * <div use:fadeIn={{ duration: 300 }}>
 *   Fades in when mounted
 * </div>
 * ```
 */
export const fadeIn: Action<HTMLElement, FadeInOptions | undefined> = (node, options = {}) => {
	// Set initial opacity
	node.style.opacity = '0';

	// Start animation after a brief delay to ensure the DOM is ready
	const timeoutId = setTimeout(() => {
		animateFadeIn(node, options);
	}, options.delay ?? 0);

	return {
		destroy() {
			clearTimeout(timeoutId);
		}
	};
};

/**
 * Slide in from top on mount
 *
 * @example
 * ```svelte
 * <div use:slideIn="top">
 *   Slides in from top
 * </div>
 * ```
 */
export const slideIn: Action<HTMLElement, 'top' | 'bottom' | undefined> = (
	node,
	direction = 'top'
) => {
	const animate = direction === 'top' ? animateSlideInTop : animateSlideInBottom;

	// Set initial state
	node.style.opacity = '0';

	// Start animation
	requestAnimationFrame(() => {
		animate(node);
	});
};

/**
 * Scale in on mount
 *
 * @example
 * ```svelte
 * <div use:scaleIn>
 *   Scales in when mounted
 * </div>
 * ```
 */
export const scaleIn: Action<HTMLElement, AnimationOptions | undefined> = (node, options = {}) => {
	// Set initial state
	node.style.opacity = '0';
	node.style.transform = 'scale(0.9)';

	// Start animation
	requestAnimationFrame(() => {
		animateScaleIn(node, options);
	});
};

/**
 * Button press effect (scale down on click)
 *
 * @example
 * ```svelte
 * <button use:pressEffect>
 *   Click me
 * </button>
 * ```
 */
export const pressEffect: Action<HTMLElement> = (node) => {
	let animation: Animation | null = null;

	const handlePointerDown = () => {
		if (prefersReducedMotion()) return;

		// Cancel any ongoing animation
		animation?.cancel();

		// Scale down
		animation = node.animate(
			[{ transform: 'scale(1)' }, { transform: 'scale(0.95)' }],
			{
				duration: duration.fast,
				easing: easing.decelerate,
				fill: 'forwards'
			}
		);
	};

	const handlePointerUp = () => {
		if (prefersReducedMotion()) return;

		// Cancel any ongoing animation
		animation?.cancel();

		// Scale back up with slight overshoot
		animation = node.animate(
			[
				{ transform: 'scale(0.95)' },
				{ transform: 'scale(1.02)', offset: 0.5 },
				{ transform: 'scale(1)' }
			],
			{
				duration: duration.base,
				easing: easing.decelerate,
				fill: 'forwards'
			}
		);
	};

	node.addEventListener('pointerdown', handlePointerDown);
	node.addEventListener('pointerup', handlePointerUp);
	node.addEventListener('pointerleave', handlePointerUp); // Reset if pointer leaves

	return {
		destroy() {
			animation?.cancel();
			node.removeEventListener('pointerdown', handlePointerDown);
			node.removeEventListener('pointerup', handlePointerUp);
			node.removeEventListener('pointerleave', handlePointerUp);
		}
	};
};

/**
 * Shake animation trigger
 *
 * @example
 * ```svelte
 * <script>
 *   let triggerShake = $state(false);
 * </script>
 * <div use:shake={triggerShake}>
 *   Shakes when triggerShake changes to true
 * </div>
 * ```
 */
export const shake: Action<HTMLElement, boolean> = (node, trigger) => {
	let currentTrigger = trigger;

	function update(newTrigger: boolean) {
		if (newTrigger && !currentTrigger) {
			// Trigger changed from false to true - shake it
			animateShake(node);
		}
		currentTrigger = newTrigger;
	}

	return {
		update
	};
};

/**
 * Bounce animation trigger
 *
 * @example
 * ```svelte
 * <script>
 *   let triggerBounce = $state(false);
 * </script>
 * <div use:bounce={triggerBounce}>
 *   Bounces when triggerBounce changes to true
 * </div>
 * ```
 */
export const bounce: Action<HTMLElement, boolean> = (node, trigger) => {
	let currentTrigger = trigger;

	function update(newTrigger: boolean) {
		if (newTrigger && !currentTrigger) {
			// Trigger changed from false to true - bounce it
			animateBounce(node);
		}
		currentTrigger = newTrigger;
	}

	return {
		update
	};
};

/**
 * Pulse animation trigger (for loading states)
 *
 * @example
 * ```svelte
 * <script>
 *   let isLoading = $state(false);
 * </script>
 * <div use:pulse={isLoading}>
 *   Pulses while loading
 * </div>
 * ```
 */
export const pulse: Action<HTMLElement, boolean> = (node, shouldPulse) => {
	let animation: Animation | null = null;

	function update(newShouldPulse: boolean) {
		if (newShouldPulse) {
			// Start pulsing
			if (!animation || animation.playState === 'finished') {
				animation = animatePulse(node, {
					duration: duration.moderate,
					iterations: Infinity
				});
			}
		} else {
			// Stop pulsing
			animation?.cancel();
			animation = null;
		}
	}

	// Initialize
	update(shouldPulse);

	return {
		update,
		destroy() {
			animation?.cancel();
		}
	};
};

/**
 * Ripple effect on click (Material Design inspired)
 *
 * @example
 * ```svelte
 * <button use:ripple>
 *   Click for ripple effect
 * </button>
 * ```
 */
export const ripple: Action<HTMLElement, { color?: string } | undefined> = (
	node,
	options = {}
) => {
	const handleClick = (e: MouseEvent) => {
		if (prefersReducedMotion()) return;

		const rect = node.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// Create ripple element
		const rippleEl = document.createElement('span');
		rippleEl.style.position = 'absolute';
		rippleEl.style.left = `${x}px`;
		rippleEl.style.top = `${y}px`;
		rippleEl.style.width = '0';
		rippleEl.style.height = '0';
		rippleEl.style.borderRadius = '50%';
		rippleEl.style.background = options.color ?? 'rgba(255, 255, 255, 0.5)';
		rippleEl.style.transform = 'translate(-50%, -50%)';
		rippleEl.style.pointerEvents = 'none';

		// Ensure parent has position relative
		const originalPosition = getComputedStyle(node).position;
		if (originalPosition === 'static') {
			node.style.position = 'relative';
		}

		// Ensure overflow is hidden
		node.style.overflow = 'hidden';

		// Add to DOM
		node.appendChild(rippleEl);

		// Calculate size for ripple to cover entire button
		const size = Math.max(rect.width, rect.height) * 2;

		// Animate ripple
		const animation = rippleEl.animate(
			[
				{ width: '0', height: '0', opacity: '1' },
				{ width: `${size}px`, height: `${size}px`, opacity: '0' }
			],
			{
				duration: duration.slow,
				easing: easing.decelerate
			}
		);

		// Remove ripple after animation
		animation.onfinish = () => {
			rippleEl.remove();
		};
	};

	node.addEventListener('click', handleClick);

	return {
		destroy() {
			node.removeEventListener('click', handleClick);
		}
	};
};

/**
 * Auto-focus element with smooth highlight
 *
 * @example
 * ```svelte
 * <input use:autoFocus />
 * ```
 */
export const autoFocus: Action<HTMLElement, { delay?: number } | undefined> = (
	node,
	options = {}
) => {
	const timeoutId = setTimeout(() => {
		node.focus();

		// Add subtle highlight animation
		if (!prefersReducedMotion()) {
			node.animate(
				[
					{ boxShadow: '0 0 0 2px transparent' },
					{ boxShadow: '0 0 0 2px var(--primary-500, #3b82f6)' },
					{ boxShadow: '0 0 0 2px transparent' }
				],
				{
					duration: duration.moderate,
					easing: easing.standard
				}
			);
		}
	}, options.delay ?? 0);

	return {
		destroy() {
			clearTimeout(timeoutId);
		}
	};
};

