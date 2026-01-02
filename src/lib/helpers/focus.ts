/**
 * Focus management utilities for accessibility
 */

/**
 * Trap focus within a container element
 * @param container - The container element to trap focus within
 * @returns A function to remove the focus trap
 */
export const trapFocus = (container: HTMLElement): (() => void) => {
	const focusableElements = container.querySelectorAll<HTMLElement>(
		'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
	);

	const firstElement = focusableElements[0];
	const lastElement = focusableElements[focusableElements.length - 1];

	const handleTab = (e: KeyboardEvent) => {
		if (e.key !== 'Tab') return;

		if (e.shiftKey) {
			if (document.activeElement === firstElement) {
				e.preventDefault();
				lastElement?.focus();
			}
		} else {
			if (document.activeElement === lastElement) {
				e.preventDefault();
				firstElement?.focus();
			}
		}
	};

	container.addEventListener('keydown', handleTab);
	firstElement?.focus();

	return () => {
		container.removeEventListener('keydown', handleTab);
	};
};

/**
 * Restore focus to a previously focused element
 * @param element - The element to restore focus to
 */
export const restoreFocus = (element: HTMLElement | null): void => {
	if (element && document.contains(element)) {
		element.focus();
	}
};

/**
 * Store the currently focused element for later restoration
 * @returns The currently focused element
 */
export const storeFocus = (): HTMLElement | null => {
	return document.activeElement as HTMLElement | null;
};

