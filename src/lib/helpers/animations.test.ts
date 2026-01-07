/**
 * Tests for animation utilities
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
	prefersReducedMotion,
	stepSpring,
	isSpringSettled,
	springPresets,
	duration,
	easing,
	createShakeKeyframes,
	createBounceKeyframes,
	createFadeInKeyframes,
	type SpringState
} from './animations';

describe('animations', () => {
	describe('prefersReducedMotion', () => {
		it('should return false in non-browser environment', () => {
			expect(prefersReducedMotion()).toBe(false);
		});
	});

	describe('spring physics', () => {
		it('should calculate spring step correctly', () => {
			const currentState: SpringState = { value: 0, velocity: 0 };
			const target = 100;
			const config = springPresets.default;
			const deltaTime = 1 / 60; // 60fps

			const newState = stepSpring(currentState, target, config, deltaTime);

			// After one frame, value should have moved toward target
			expect(newState.value).toBeGreaterThan(0);
			expect(newState.value).toBeLessThan(target);
			// Velocity should be positive (moving toward target)
			expect(newState.velocity).toBeGreaterThan(0);
		});

		it('should settle at target value', () => {
			let state: SpringState = { value: 0, velocity: 0 };
			const target = 100;
			const config = springPresets.stiff;
			const deltaTime = 1 / 60;

			// Simulate multiple frames until settled
			let frames = 0;
			const maxFrames = 300; // 5 seconds at 60fps

			while (!isSpringSettled(state, target, config.precision) && frames < maxFrames) {
				state = stepSpring(state, target, config, deltaTime);
				frames++;
			}

			// Should settle within reasonable time
			expect(frames).toBeLessThan(maxFrames);
			// Should be close to target
			expect(Math.abs(state.value - target)).toBeLessThan(config.precision);
			// Velocity should be near zero
			expect(Math.abs(state.velocity)).toBeLessThan(config.precision);
		});

		it('should have different behavior for different presets', () => {
			const deltaTime = 1 / 60;
			const target = 100;

			// Test gentle spring (should move slower)
			const gentleState = stepSpring(
				{ value: 0, velocity: 0 },
				target,
				springPresets.gentle,
				deltaTime
			);

			// Test stiff spring (should move faster)
			const stiffState = stepSpring(
				{ value: 0, velocity: 0 },
				target,
				springPresets.stiff,
				deltaTime
			);

			// Stiff should move further in same time
			expect(stiffState.value).toBeGreaterThan(gentleState.value);
		});
	});

	describe('isSpringSettled', () => {
		it('should return true when spring is settled', () => {
			const state: SpringState = { value: 100, velocity: 0.001 };
			const target = 100;
			const precision = 0.01;

			expect(isSpringSettled(state, target, precision)).toBe(true);
		});

		it('should return false when value is far from target', () => {
			const state: SpringState = { value: 50, velocity: 0 };
			const target = 100;
			const precision = 0.01;

			expect(isSpringSettled(state, target, precision)).toBe(false);
		});

		it('should return false when velocity is high', () => {
			const state: SpringState = { value: 100, velocity: 10 };
			const target = 100;
			const precision = 0.01;

			expect(isSpringSettled(state, target, precision)).toBe(false);
		});
	});

	describe('spring presets', () => {
		it('should have all expected presets', () => {
			expect(springPresets.gentle).toBeDefined();
			expect(springPresets.default).toBeDefined();
			expect(springPresets.wobbly).toBeDefined();
			expect(springPresets.stiff).toBeDefined();
			expect(springPresets.slow).toBeDefined();
			expect(springPresets.molasses).toBeDefined();
		});

		it('should have valid stiffness and damping values', () => {
			Object.values(springPresets).forEach((preset) => {
				expect(preset.stiffness).toBeGreaterThan(0);
				expect(preset.damping).toBeGreaterThan(0);
				expect(preset.precision).toBeGreaterThan(0);
			});
		});
	});

	describe('duration presets', () => {
		it('should have all expected durations', () => {
			expect(duration.instant).toBe(0);
			expect(duration.fast).toBe(150);
			expect(duration.base).toBe(200);
			expect(duration.moderate).toBe(300);
			expect(duration.slow).toBe(400);
			expect(duration.slower).toBe(600);
		});

		it('should be in ascending order', () => {
			expect(duration.instant).toBeLessThan(duration.fast);
			expect(duration.fast).toBeLessThan(duration.base);
			expect(duration.base).toBeLessThan(duration.moderate);
			expect(duration.moderate).toBeLessThan(duration.slow);
			expect(duration.slow).toBeLessThan(duration.slower);
		});
	});

	describe('easing functions', () => {
		it('should have all expected easing functions', () => {
			expect(easing.linear).toBeDefined();
			expect(easing.ease).toBeDefined();
			expect(easing.easeIn).toBeDefined();
			expect(easing.easeOut).toBeDefined();
			expect(easing.easeInOut).toBeDefined();
			expect(easing.sharp).toBeDefined();
			expect(easing.standard).toBeDefined();
			expect(easing.decelerate).toBeDefined();
			expect(easing.accelerate).toBeDefined();
			expect(easing.bounceOut).toBeDefined();
			expect(easing.bounceIn).toBeDefined();
			expect(easing.anticipate).toBeDefined();
			expect(easing.overshoot).toBeDefined();
		});

		it('should be valid cubic-bezier strings', () => {
			Object.values(easing).forEach((easingFn) => {
				expect(easingFn).toMatch(/^cubic-bezier\([^)]+\)$/);
			});
		});
	});

	describe('keyframe helpers', () => {
		it('should create shake keyframes', () => {
			const keyframes = createShakeKeyframes(10);
			expect(keyframes).toHaveLength(6);
			expect(keyframes[0].transform).toBe('translateX(0)');
			expect(keyframes[keyframes.length - 1].transform).toBe('translateX(0)');
		});

		it('should create bounce keyframes', () => {
			const keyframes = createBounceKeyframes();
			expect(keyframes.length).toBeGreaterThan(0);
			expect(keyframes[0].transform).toBe('scale(1)');
		});

		it('should create fade in keyframes', () => {
			const keyframes = createFadeInKeyframes();
			expect(keyframes).toHaveLength(2);
			expect(keyframes[0].opacity).toBe('0');
			expect(keyframes[1].opacity).toBe('1');
		});
	});
});
