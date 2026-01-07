/**
 * Accessibility testing helpers
 */

/**
 * Check if element has proper ARIA label
 */
export function hasAccessibleName(element: Element): boolean {
	const ariaLabel = element.getAttribute('aria-label');
	const ariaLabelledBy = element.getAttribute('aria-labelledby');
	const title = element.getAttribute('title');

	if (ariaLabel || title) return true;

	if (ariaLabelledBy) {
		const labelElement = document.getElementById(ariaLabelledBy);
		return !!labelElement?.textContent?.trim();
	}

	// Check for label element
	if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
		const id = element.id;
		if (id) {
			const label = document.querySelector(`label[for="${id}"]`);
			return !!label?.textContent?.trim();
		}
	}

	return false;
}

/**
 * Get accessible name of element
 */
export function getAccessibleName(element: Element): string {
	const ariaLabel = element.getAttribute('aria-label');
	if (ariaLabel) return ariaLabel;

	const ariaLabelledBy = element.getAttribute('aria-labelledby');
	if (ariaLabelledBy) {
		const labelElement = document.getElementById(ariaLabelledBy);
		return labelElement?.textContent?.trim() || '';
	}

	const title = element.getAttribute('title');
	if (title) return title;

	// Check for label element
	if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
		const id = element.id;
		if (id) {
			const label = document.querySelector(`label[for="${id}"]`);
			return label?.textContent?.trim() || '';
		}
	}

	return element.textContent?.trim() || '';
}

/**
 * Check if element is keyboard accessible
 */
export function isKeyboardAccessible(element: Element): boolean {
	const tabindex = element.getAttribute('tabindex');

	// Elements with tabindex="-1" are programmatically focusable but not keyboard accessible
	if (tabindex === '-1') return false;

	// Interactive elements are keyboard accessible by default
	const interactiveElements = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
	if (interactiveElements.includes(element.tagName)) {
		return !element.hasAttribute('disabled');
	}

	// Elements with positive or zero tabindex are keyboard accessible
	return tabindex !== null && parseInt(tabindex) >= 0;
}

/**
 * Check if element has proper role
 */
export function hasRole(element: Element, expectedRole: string): boolean {
	const role = element.getAttribute('role');
	return role === expectedRole;
}

/**
 * Check if element is properly described
 */
export function hasDescription(element: Element): boolean {
	const ariaDescribedBy = element.getAttribute('aria-describedby');
	if (!ariaDescribedBy) return false;

	const descriptionElement = document.getElementById(ariaDescribedBy);
	return !!descriptionElement?.textContent?.trim();
}

/**
 * Get description text
 */
export function getDescription(element: Element): string {
	const ariaDescribedBy = element.getAttribute('aria-describedby');
	if (!ariaDescribedBy) return '';

	const descriptionElement = document.getElementById(ariaDescribedBy);
	return descriptionElement?.textContent?.trim() || '';
}

/**
 * Check if element is marked as invalid
 */
export function isInvalid(element: Element): boolean {
	return element.getAttribute('aria-invalid') === 'true';
}

/**
 * Check if element is marked as required
 */
export function isRequired(element: Element): boolean {
	return element.hasAttribute('required') || element.getAttribute('aria-required') === 'true';
}

/**
 * Check if element is expanded (for collapsible elements)
 */
export function isExpanded(element: Element): boolean {
	return element.getAttribute('aria-expanded') === 'true';
}

/**
 * Check if element is pressed (for toggle buttons)
 */
export function isPressed(element: Element): boolean {
	return element.getAttribute('aria-pressed') === 'true';
}

/**
 * Check if element is checked (for checkboxes/radios)
 */
export function isChecked(element: Element): boolean {
	if (element instanceof HTMLInputElement) {
		return element.checked;
	}
	return element.getAttribute('aria-checked') === 'true';
}

/**
 * Check if element is selected (for options)
 */
export function isSelected(element: Element): boolean {
	if (element instanceof HTMLOptionElement) {
		return element.selected;
	}
	return element.getAttribute('aria-selected') === 'true';
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: Element = document.body): Element[] {
	const selector = [
		'a[href]',
		'button:not([disabled])',
		'input:not([disabled])',
		'select:not([disabled])',
		'textarea:not([disabled])',
		'[tabindex]:not([tabindex="-1"])'
	].join(',');

	return Array.from(container.querySelectorAll(selector));
}

/**
 * Check if focus is trapped within container
 */
export function isFocusTrapped(container: Element): boolean {
	const focusableElements = getFocusableElements(container);
	const activeElement = document.activeElement;

	if (!activeElement) return false;

	return focusableElements.some((el) => el === activeElement || el.contains(activeElement));
}

/**
 * Check if element has live region attributes
 */
export function hasLiveRegion(element: Element): boolean {
	return element.hasAttribute('aria-live');
}

/**
 * Get live region politeness level
 */
export function getLiveRegionPoliteness(element: Element): 'polite' | 'assertive' | 'off' | null {
	const value = element.getAttribute('aria-live');
	if (value === 'polite' || value === 'assertive' || value === 'off') {
		return value;
	}
	return null;
}

/**
 * Check contrast ratio (simplified check)
 * Note: This is a basic check. For comprehensive contrast testing, use axe-core
 */
export function hasGoodContrast(element: HTMLElement): boolean {
	const style = window.getComputedStyle(element);
	const color = style.color;
	const backgroundColor = style.backgroundColor;

	// If no background color is set, we can't determine contrast
	if (!backgroundColor || backgroundColor === 'rgba(0, 0, 0, 0)') {
		return true; // Assume parent has proper contrast
	}

	// This is a simplified check - real contrast calculation is complex
	// For production, use axe-core or similar tools
	return color !== backgroundColor;
}

/**
 * Check if element has sufficient size for touch targets (44x44px minimum)
 */
export function hasSufficientTouchTargetSize(element: HTMLElement): boolean {
	const rect = element.getBoundingClientRect();
	return rect.width >= 44 && rect.height >= 44;
}

/**
 * Verify keyboard navigation order
 */
export function getTabOrder(container: Element = document.body): Element[] {
	const focusableElements = getFocusableElements(container);

	return focusableElements.sort((a, b) => {
		const aTabIndex = parseInt(a.getAttribute('tabindex') || '0');
		const bTabIndex = parseInt(b.getAttribute('tabindex') || '0');

		// Elements with tabindex > 0 come first, in order
		if (aTabIndex > 0 && bTabIndex > 0) {
			return aTabIndex - bTabIndex;
		}
		if (aTabIndex > 0) return -1;
		if (bTabIndex > 0) return 1;

		// Otherwise, use DOM order
		return 0;
	});
}
