/**
 * Spring animation composable using Svelte 5 runes
 * Provides smooth, physics-based animations with $state reactivity
 * @module spring
 */

import {
	stepSpring,
	isSpringSettled,
	springPresets,
	prefersReducedMotion,
	type SpringConfig,
	type SpringState
} from './animations.js';

/**
 * Options for creating a spring animation
 */
export interface UseSpringOptions extends SpringConfig {
	/** Initial value */
	initialValue?: number;
	/** Preset configuration name */
	preset?: keyof typeof springPresets;
}

/**
 * Spring animation composable with Svelte 5 $state
 *
 * @example
 * ```typescript
 * const scale = useSpring({ initialValue: 1, preset: 'wobbly' });
 *
 * // Set target value - spring will animate toward it
 * scale.set(1.5);
 *
 * // Use the current value in your template
 * console.log(scale.value); // Reactive value that updates during animation
 * ```
 */
export function useSpring(options: UseSpringOptions = {}) {
	const preset = options.preset ? springPresets[options.preset] : springPresets.default;
	const config = {
		stiffness: options.stiffness ?? preset.stiffness,
		damping: options.damping ?? preset.damping,
		precision: options.precision ?? preset.precision
	};

	let state = $state<SpringState>({
		value: options.initialValue ?? 0,
		velocity: 0
	});

	let target = $state(options.initialValue ?? 0);
	let animationFrameId: number | null = null;
	let lastTime: number | null = null;

	/**
	 * Animation loop using requestAnimationFrame
	 */
	function tick(currentTime: number) {
		// Initialize lastTime on first frame
		if (lastTime === null) {
			lastTime = currentTime;
			animationFrameId = requestAnimationFrame(tick);
			return;
		}

		// Calculate delta time in seconds
		const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1); // Cap at 100ms
		lastTime = currentTime;

		// Skip animation if user prefers reduced motion - snap to target
		if (prefersReducedMotion()) {
			state.value = target;
			state.velocity = 0;
			stopAnimation();
			return;
		}

		// Calculate next spring state
		const newState = stepSpring(state, target, config, deltaTime);
		state = newState;

		// Check if spring has settled
		if (isSpringSettled(state, target, config.precision)) {
			// Snap to target and stop
			state.value = target;
			state.velocity = 0;
			stopAnimation();
		} else {
			// Continue animation
			animationFrameId = requestAnimationFrame(tick);
		}
	}

	/**
	 * Start the animation loop
	 */
	function startAnimation() {
		if (animationFrameId !== null) return; // Already animating
		lastTime = null;
		animationFrameId = requestAnimationFrame(tick);
	}

	/**
	 * Stop the animation loop
	 */
	function stopAnimation() {
		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}
		lastTime = null;
	}

	return {
		/**
		 * Current animated value (reactive)
		 */
		get value() {
			return state.value;
		},

		/**
		 * Current velocity (reactive)
		 */
		get velocity() {
			return state.velocity;
		},

		/**
		 * Whether the spring is currently animating
		 */
		get isAnimating() {
			return animationFrameId !== null;
		},

		/**
		 * Set target value to animate toward
		 */
		set(newTarget: number, hard = false) {
			target = newTarget;

			if (hard || prefersReducedMotion()) {
				// Hard set - snap immediately without animation
				state.value = newTarget;
				state.velocity = 0;
				stopAnimation();
			} else {
				// Soft set - animate toward target
				startAnimation();
			}
		},

		/**
		 * Update spring configuration
		 */
		updateConfig(newConfig: Partial<SpringConfig>) {
			Object.assign(config, newConfig);
		},

		/**
		 * Stop animation and reset to value
		 */
		reset(value = 0) {
			target = value;
			state.value = value;
			state.velocity = 0;
			stopAnimation();
		},

		/**
		 * Cleanup - stop animation
		 */
		destroy() {
			stopAnimation();
		}
	};
}

/**
 * Spring animation for object with multiple properties
 *
 * @example
 * ```typescript
 * const transform = useSpringObject({ x: 0, y: 0, scale: 1 });
 *
 * transform.set({ x: 100, y: 50, scale: 1.5 });
 *
 * console.log(transform.values); // { x: 0-100, y: 0-50, scale: 1-1.5 } (animated)
 * ```
 */
export function useSpringObject<T extends Record<string, number>>(
	initialValues: T,
	options: UseSpringOptions = {}
) {
	// Create a spring for each property
	const springs = Object.fromEntries(
		Object.entries(initialValues).map(([key, value]) => [
			key,
			useSpring({ ...options, initialValue: value })
		])
	) as Record<keyof T, ReturnType<typeof useSpring>>;

	return {
		/**
		 * Current animated values (reactive)
		 */
		get values(): T {
			return Object.fromEntries(
				Object.entries(springs).map(([key, spring]) => [key, spring.value])
			) as T;
		},

		/**
		 * Whether any spring is currently animating
		 */
		get isAnimating() {
			return Object.values(springs).some((spring) => spring.isAnimating);
		},

		/**
		 * Set target values to animate toward
		 */
		set(newTargets: Partial<T>, hard = false) {
			for (const [key, value] of Object.entries(newTargets)) {
				if (key in springs && typeof value === 'number') {
					springs[key].set(value, hard);
				}
			}
		},

		/**
		 * Update spring configuration for all springs
		 */
		updateConfig(newConfig: Partial<SpringConfig>) {
			Object.values(springs).forEach((spring) => spring.updateConfig(newConfig));
		},

		/**
		 * Reset all springs to values
		 */
		reset(values?: Partial<T>) {
			if (values) {
				for (const [key, value] of Object.entries(values)) {
					if (key in springs && typeof value === 'number') {
						springs[key].reset(value);
					}
				}
			} else {
				Object.values(springs).forEach((spring) => spring.reset());
			}
		},

		/**
		 * Cleanup - stop all animations
		 */
		destroy() {
			Object.values(springs).forEach((spring) => spring.destroy());
		}
	};
}

