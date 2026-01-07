/**
 * Render helpers for testing Svelte components
 */

import { render as testingLibraryRender, type RenderResult } from '@testing-library/svelte';
import type { ComponentProps, Component } from 'svelte';
import { tick } from 'svelte';

/**
 * Enhanced render function with common test setup
 */
export function render<T extends Component>(
	component: T,
	options?: ComponentProps<T> & { props?: ComponentProps<T> }
): RenderResult<T> {
	const { props, ...rest } = options || {};
	// @ts-expect-error - Testing library types are complex
	return testingLibraryRender(component, { props: props || rest } as any);
}

/**
 * Wait for Svelte to update the DOM
 */
export async function waitForSvelte(): Promise<void> {
	await tick();
}

/**
 * Wait for multiple ticks (useful for animations or complex updates)
 */
export async function waitForTicks(count: number = 2): Promise<void> {
	for (let i = 0; i < count; i++) {
		await tick();
	}
}

/**
 * Wait for an element to appear in the DOM
 */
export async function waitForElement(selector: string, timeout: number = 1000): Promise<Element> {
	const startTime = Date.now();

	while (Date.now() - startTime < timeout) {
		const element = document.querySelector(selector);
		if (element) {
			return element;
		}
		await new Promise((resolve) => setTimeout(resolve, 50));
	}

	throw new Error(`Element "${selector}" not found within ${timeout}ms`);
}

/**
 * Wait for an element to disappear from the DOM
 */
export async function waitForElementToBeRemoved(
	selector: string,
	timeout: number = 1000
): Promise<void> {
	const startTime = Date.now();

	while (Date.now() - startTime < timeout) {
		const element = document.querySelector(selector);
		if (!element) {
			return;
		}
		await new Promise((resolve) => setTimeout(resolve, 50));
	}

	throw new Error(`Element "${selector}" still present after ${timeout}ms`);
}

/**
 * Simulate keyboard event
 */
export function createKeyboardEvent(
	type: 'keydown' | 'keyup' | 'keypress',
	key: string,
	options?: KeyboardEventInit
): KeyboardEvent {
	return new KeyboardEvent(type, {
		key,
		bubbles: true,
		cancelable: true,
		...options
	});
}

/**
 * Simulate mouse event
 */
export function createMouseEvent(type: string, options?: MouseEventInit): MouseEvent {
	return new MouseEvent(type, {
		bubbles: true,
		cancelable: true,
		...options
	});
}

/**
 * Simulate focus event
 */
export function createFocusEvent(
	type: 'focus' | 'blur' | 'focusin' | 'focusout',
	options?: FocusEventInit
): FocusEvent {
	return new FocusEvent(type, {
		bubbles: true,
		cancelable: true,
		...options
	});
}

/**
 * Get computed styles for an element
 */
export function getComputedStyle(element: Element): CSSStyleDeclaration {
	return window.getComputedStyle(element);
}

/**
 * Check if element has class
 */
export function hasClass(element: Element, className: string): boolean {
	return element.classList.contains(className);
}

/**
 * Check if element is visible
 */
export function isVisible(element: HTMLElement): boolean {
	const style = window.getComputedStyle(element);
	return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

/**
 * Check if element is disabled
 */
export function isDisabled(element: HTMLElement): boolean {
	return element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true';
}
