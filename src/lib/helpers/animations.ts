/**
 * Animation utilities and spring physics calculations
 * Zero dependencies - built from scratch for Sveltacular
 * @module animations
 */

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Spring physics configuration
 */
export interface SpringConfig {
	/** Stiffness of the spring (higher = faster) */
	stiffness?: number;
	/** Damping of the spring (higher = less oscillation) */
	damping?: number;
	/** Precision threshold for settling */
	precision?: number;
}

/**
 * Default spring presets for common use cases
 */
export const springPresets = {
	/** Gentle, smooth animation */
	gentle: { stiffness: 120, damping: 14, precision: 0.01 },
	/** Default balanced spring */
	default: { stiffness: 170, damping: 26, precision: 0.01 },
	/** Wobbly, bouncy spring */
	wobbly: { stiffness: 180, damping: 12, precision: 0.01 },
	/** Stiff, fast spring */
	stiff: { stiffness: 210, damping: 20, precision: 0.01 },
	/** Slow, smooth spring */
	slow: { stiffness: 280, damping: 60, precision: 0.01 },
	/** Molasses - very slow */
	molasses: { stiffness: 280, damping: 120, precision: 0.01 }
} as const;

/**
 * Spring state for physics calculations
 */
export interface SpringState {
	value: number;
	velocity: number;
}

/**
 * Calculate spring physics for one frame
 * Based on semi-implicit Euler integration
 *
 * @param current - Current spring state
 * @param target - Target value to spring toward
 * @param config - Spring configuration
 * @param deltaTime - Time elapsed since last frame (seconds)
 * @returns Updated spring state
 */
export function stepSpring(
	current: SpringState,
	target: number,
	config: Required<SpringConfig>,
	deltaTime: number
): SpringState {
	const { stiffness, damping } = config;

	// Spring force calculation
	const springForce = -stiffness * (current.value - target);
	const dampingForce = -damping * current.velocity;
	const acceleration = springForce + dampingForce;

	// Semi-implicit Euler integration
	const newVelocity = current.velocity + acceleration * deltaTime;
	const newValue = current.value + newVelocity * deltaTime;

	return {
		value: newValue,
		velocity: newVelocity
	};
}

/**
 * Check if spring has settled (stopped moving)
 */
export function isSpringSettled(current: SpringState, target: number, precision: number): boolean {
	const valueDiff = Math.abs(current.value - target);
	const velocityThreshold = precision;
	return valueDiff < precision && Math.abs(current.velocity) < velocityThreshold;
}

/**
 * Easing functions for CSS transitions
 */
export const easing = {
	// Standard easing
	linear: 'cubic-bezier(0, 0, 1, 1)',
	ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
	easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
	easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
	easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',

	// Custom easing (Material Design inspired)
	sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
	standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
	decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
	accelerate: 'cubic-bezier(0.4, 0, 1, 1)',

	// Bouncy easing
	bounceOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
	bounceIn: 'cubic-bezier(0.6, -0.28, 0.74, 0.05)',

	// Dramatic easing
	anticipate: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
	overshoot: 'cubic-bezier(0.17, 0.67, 0.16, 1.15)'
} as const;

/**
 * Animation duration presets (in milliseconds)
 */
export const duration = {
	instant: 0,
	fast: 150,
	base: 200,
	moderate: 300,
	slow: 400,
	slower: 600
} as const;

/**
 * Keyframe animation helper for shake effect
 */
export function createShakeKeyframes(intensity = 10): Keyframe[] {
	return [
		{ transform: 'translateX(0)' },
		{ transform: `translateX(-${intensity}px)` },
		{ transform: `translateX(${intensity}px)` },
		{ transform: `translateX(-${intensity}px)` },
		{ transform: `translateX(${intensity}px)` },
		{ transform: 'translateX(0)' }
	];
}

/**
 * Keyframe animation helper for bounce effect
 */
export function createBounceKeyframes(): Keyframe[] {
	return [
		{ transform: 'scale(1)', offset: 0 },
		{ transform: 'scale(1.05)', offset: 0.5 },
		{ transform: 'scale(1)', offset: 1 }
	];
}

/**
 * Keyframe animation helper for pulse effect
 */
export function createPulseKeyframes(): Keyframe[] {
	return [
		{ opacity: '1', transform: 'scale(1)' },
		{ opacity: '0.8', transform: 'scale(0.95)' },
		{ opacity: '1', transform: 'scale(1)' }
	];
}

/**
 * Keyframe animation helper for fade in
 */
export function createFadeInKeyframes(): Keyframe[] {
	return [{ opacity: '0' }, { opacity: '1' }];
}

/**
 * Keyframe animation helper for fade out
 */
export function createFadeOutKeyframes(): Keyframe[] {
	return [{ opacity: '1' }, { opacity: '0' }];
}

/**
 * Keyframe animation helper for slide in from top
 */
export function createSlideInTopKeyframes(distance = 20): Keyframe[] {
	return [
		{ opacity: '0', transform: `translateY(-${distance}px)` },
		{ opacity: '1', transform: 'translateY(0)' }
	];
}

/**
 * Keyframe animation helper for slide in from bottom
 */
export function createSlideInBottomKeyframes(distance = 20): Keyframe[] {
	return [
		{ opacity: '0', transform: `translateY(${distance}px)` },
		{ opacity: '1', transform: 'translateY(0)' }
	];
}

/**
 * Keyframe animation helper for scale in
 */
export function createScaleInKeyframes(): Keyframe[] {
	return [
		{ opacity: '0', transform: 'scale(0.9)' },
		{ opacity: '1', transform: 'scale(1)' }
	];
}

/**
 * Keyframe animation helper for scale out
 */
export function createScaleOutKeyframes(): Keyframe[] {
	return [
		{ opacity: '1', transform: 'scale(1)' },
		{ opacity: '0', transform: 'scale(0.9)' }
	];
}

/**
 * Run a Web Animations API animation with prefers-reduced-motion support
 */
export function animate(
	element: HTMLElement,
	keyframes: Keyframe[],
	options: KeyframeAnimationOptions
): Animation {
	// Respect prefers-reduced-motion
	if (prefersReducedMotion()) {
		// Disable animation by setting duration to 0
		options = { ...options, duration: 0 };
	}

	return element.animate(keyframes, options);
}

/**
 * Animation timing options
 */
export interface AnimationOptions {
	duration?: number;
	easing?: string;
	delay?: number;
	iterations?: number;
	fill?: FillMode;
}

/**
 * Animate element shake (for errors)
 */
export function animateShake(element: HTMLElement, options: AnimationOptions = {}): Animation {
	return animate(element, createShakeKeyframes(), {
		duration: options.duration ?? duration.base,
		easing: options.easing ?? easing.standard,
		iterations: options.iterations ?? 1,
		fill: options.fill ?? 'forwards'
	});
}

/**
 * Animate element bounce (for success)
 */
export function animateBounce(element: HTMLElement, options: AnimationOptions = {}): Animation {
	return animate(element, createBounceKeyframes(), {
		duration: options.duration ?? duration.base,
		easing: options.easing ?? easing.standard,
		iterations: options.iterations ?? 1,
		fill: options.fill ?? 'forwards'
	});
}

/**
 * Animate element pulse
 */
export function animatePulse(element: HTMLElement, options: AnimationOptions = {}): Animation {
	return animate(element, createPulseKeyframes(), {
		duration: options.duration ?? duration.moderate,
		easing: options.easing ?? easing.standard,
		iterations: options.iterations ?? 1,
		fill: options.fill ?? 'forwards'
	});
}

/**
 * Animate element fade in
 */
export function animateFadeIn(element: HTMLElement, options: AnimationOptions = {}): Animation {
	return animate(element, createFadeInKeyframes(), {
		duration: options.duration ?? duration.base,
		easing: options.easing ?? easing.standard,
		fill: options.fill ?? 'forwards'
	});
}

/**
 * Animate element fade out
 */
export function animateFadeOut(element: HTMLElement, options: AnimationOptions = {}): Animation {
	return animate(element, createFadeOutKeyframes(), {
		duration: options.duration ?? duration.base,
		easing: options.easing ?? easing.standard,
		fill: options.fill ?? 'forwards'
	});
}

/**
 * Animate element slide in from top
 */
export function animateSlideInTop(element: HTMLElement, options: AnimationOptions = {}): Animation {
	return animate(element, createSlideInTopKeyframes(), {
		duration: options.duration ?? duration.base,
		easing: options.easing ?? easing.decelerate,
		fill: options.fill ?? 'forwards'
	});
}

/**
 * Animate element slide in from bottom
 */
export function animateSlideInBottom(
	element: HTMLElement,
	options: AnimationOptions = {}
): Animation {
	return animate(element, createSlideInBottomKeyframes(), {
		duration: options.duration ?? duration.base,
		easing: options.easing ?? easing.decelerate,
		fill: options.fill ?? 'forwards'
	});
}

/**
 * Animate element scale in
 */
export function animateScaleIn(element: HTMLElement, options: AnimationOptions = {}): Animation {
	return animate(element, createScaleInKeyframes(), {
		duration: options.duration ?? duration.base,
		easing: options.easing ?? easing.decelerate,
		fill: options.fill ?? 'forwards'
	});
}

/**
 * Animate element scale out
 */
export function animateScaleOut(element: HTMLElement, options: AnimationOptions = {}): Animation {
	return animate(element, createScaleOutKeyframes(), {
		duration: options.duration ?? duration.base,
		easing: options.easing ?? easing.accelerate,
		fill: options.fill ?? 'forwards'
	});
}
