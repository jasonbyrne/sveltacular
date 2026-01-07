/**
 * Focus Management Utilities
 *
 * Provides utilities for managing focus in accessible components including:
 * - Roving tabindex for keyboard navigation
 * - Focus trapping for modals/dialogs
 * - Focus restoration
 * - Focusable element detection
 */

/**
 * Query selector for all focusable elements
 */
export const FOCUSABLE_SELECTOR = [
	'a[href]',
	'area[href]',
	'input:not([disabled]):not([type="hidden"])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'button:not([disabled])',
	'iframe',
	'object',
	'embed',
	'[tabindex]:not([tabindex="-1"])',
	'[contenteditable]',
	'audio[controls]',
	'video[controls]'
].join(',');

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
	return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter((el) => {
		// Filter out elements that are not visible
		return (
			el.offsetWidth > 0 &&
			el.offsetHeight > 0 &&
			window.getComputedStyle(el).visibility !== 'hidden'
		);
	});
}

/**
 * Get the first focusable element within a container
 */
export function getFirstFocusable(container: HTMLElement): HTMLElement | null {
	const elements = getFocusableElements(container);
	return elements[0] || null;
}

/**
 * Get the last focusable element within a container
 */
export function getLastFocusable(container: HTMLElement): HTMLElement | null {
	const elements = getFocusableElements(container);
	return elements[elements.length - 1] || null;
}

/**
 * Focus Trap - traps focus within a container (for modals, dialogs)
 * Returns a cleanup function to remove the trap
 */
export function createFocusTrap(container: HTMLElement | null): () => void {
	// Guard against invalid container
	if (!container || !(container instanceof HTMLElement) || !container.querySelectorAll) {
		console.warn('createFocusTrap: Invalid container provided', container);
		return () => {}; // Return no-op cleanup
	}

	const firstFocusable = getFirstFocusable(container);
	const lastFocusable = getLastFocusable(container);

	// Store the previously focused element to restore later
	const previouslyFocused = document.activeElement as HTMLElement;

	// Focus the first focusable element
	firstFocusable?.focus();

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key !== 'Tab') return;

		const focusableElements = getFocusableElements(container);
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		// Shift + Tab: wrap to last element
		if (event.shiftKey && document.activeElement === firstElement) {
			event.preventDefault();
			lastElement?.focus();
		}
		// Tab: wrap to first element
		else if (!event.shiftKey && document.activeElement === lastElement) {
			event.preventDefault();
			firstElement?.focus();
		}
	};

	container.addEventListener('keydown', handleKeyDown);

	// Return cleanup function
	return () => {
		container.removeEventListener('keydown', handleKeyDown);
		// Restore focus to previously focused element
		previouslyFocused?.focus();
	};
}

/**
 * Roving Tabindex Manager
 * Manages keyboard navigation in a list of items (for menus, lists, tabs, etc.)
 */
export class RovingTabindexManager {
	private items: HTMLElement[] = [];
	private currentIndex = 0;
	private orientation: 'horizontal' | 'vertical' | 'both' = 'vertical';
	private loop = true;

	constructor(
		items: HTMLElement[],
		options: {
			orientation?: 'horizontal' | 'vertical' | 'both';
			loop?: boolean;
			initialIndex?: number;
		} = {}
	) {
		this.items = items;
		this.orientation = options.orientation || 'vertical';
		this.loop = options.loop !== undefined ? options.loop : true;
		this.currentIndex = options.initialIndex || 0;

		// Set initial tabindex values
		this.updateTabindices();
	}

	/**
	 * Update tabindex attributes based on current index
	 */
	private updateTabindices() {
		this.items.forEach((item, index) => {
			if (index === this.currentIndex) {
				item.setAttribute('tabindex', '0');
			} else {
				item.setAttribute('tabindex', '-1');
			}
		});
	}

	/**
	 * Move focus to a specific index
	 */
	focusItem(index: number) {
		if (index < 0 || index >= this.items.length) return;
		this.currentIndex = index;
		this.updateTabindices();
		this.items[index]?.focus();
	}

	/**
	 * Move focus to the next item
	 */
	focusNext() {
		let nextIndex = this.currentIndex + 1;
		if (nextIndex >= this.items.length) {
			nextIndex = this.loop ? 0 : this.items.length - 1;
		}
		this.focusItem(nextIndex);
	}

	/**
	 * Move focus to the previous item
	 */
	focusPrevious() {
		let prevIndex = this.currentIndex - 1;
		if (prevIndex < 0) {
			prevIndex = this.loop ? this.items.length - 1 : 0;
		}
		this.focusItem(prevIndex);
	}

	/**
	 * Move focus to the first item
	 */
	focusFirst() {
		this.focusItem(0);
	}

	/**
	 * Move focus to the last item
	 */
	focusLast() {
		this.focusItem(this.items.length - 1);
	}

	/**
	 * Handle keyboard events for roving tabindex
	 */
	handleKeyDown(event: KeyboardEvent) {
		const { key } = event;

		// Vertical navigation
		if (this.orientation === 'vertical' || this.orientation === 'both') {
			if (key === 'ArrowDown') {
				event.preventDefault();
				this.focusNext();
				return;
			}
			if (key === 'ArrowUp') {
				event.preventDefault();
				this.focusPrevious();
				return;
			}
		}

		// Horizontal navigation
		if (this.orientation === 'horizontal' || this.orientation === 'both') {
			if (key === 'ArrowRight') {
				event.preventDefault();
				this.focusNext();
				return;
			}
			if (key === 'ArrowLeft') {
				event.preventDefault();
				this.focusPrevious();
				return;
			}
		}

		// Home/End
		if (key === 'Home') {
			event.preventDefault();
			this.focusFirst();
			return;
		}
		if (key === 'End') {
			event.preventDefault();
			this.focusLast();
			return;
		}
	}

	/**
	 * Update the items list (when items change dynamically)
	 */
	updateItems(items: HTMLElement[]) {
		this.items = items;
		this.currentIndex = Math.min(this.currentIndex, items.length - 1);
		this.updateTabindices();
	}

	/**
	 * Get the currently focused item index
	 */
	getCurrentIndex(): number {
		return this.currentIndex;
	}

	/**
	 * Get the currently focused item
	 */
	getCurrentItem(): HTMLElement | null {
		return this.items[this.currentIndex] || null;
	}
}

/**
 * Svelte action for roving tabindex
 * Usage: <div use:rovingTabindex={{ items, orientation: 'vertical' }}>
 */
export function rovingTabindex(
	node: HTMLElement,
	options: {
		itemSelector: string;
		orientation?: 'horizontal' | 'vertical' | 'both';
		loop?: boolean;
	}
) {
	let manager: RovingTabindexManager;

	function updateManager() {
		const items = Array.from(node.querySelectorAll<HTMLElement>(options.itemSelector));
		if (manager) {
			manager.updateItems(items);
		} else {
			manager = new RovingTabindexManager(items, {
				orientation: options.orientation,
				loop: options.loop
			});
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		manager?.handleKeyDown(event);
	}

	// Initialize
	updateManager();
	node.addEventListener('keydown', handleKeyDown);

	// Set up MutationObserver to watch for DOM changes
	const observer = new MutationObserver(updateManager);
	observer.observe(node, { childList: true, subtree: true });

	return {
		update(newOptions: typeof options) {
			options = newOptions;
			updateManager();
		},
		destroy() {
			node.removeEventListener('keydown', handleKeyDown);
			observer.disconnect();
		}
	};
}

/**
 * Store the currently focused element
 * Returns the element that had focus when this was called
 */
export function storeFocus(): HTMLElement | null {
	return document.activeElement as HTMLElement;
}

/**
 * Restore focus to a previously stored element
 */
export function restoreFocus(element: HTMLElement | null) {
	if (element && typeof element.focus === 'function') {
		element.focus();
	}
}

/**
 * Trap focus within a container (simplified alias for createFocusTrap)
 * Returns cleanup function
 */
export function trapFocus(container: HTMLElement | null): () => void {
	return createFocusTrap(container);
}

/**
 * Focus-visible polyfill check
 * Returns true if the browser supports :focus-visible
 */
export function supportsFocusVisible(): boolean {
	try {
		document.querySelector(':focus-visible');
		return true;
	} catch {
		return false;
	}
}

/**
 * Add focus-visible class management for older browsers
 * Usage: use:focusVisible on any focusable element
 */
export function focusVisible(node: HTMLElement) {
	let hadKeyboardEvent = false;

	function onKeyDown() {
		hadKeyboardEvent = true;
	}

	function onPointerDown() {
		hadKeyboardEvent = false;
	}

	function onFocus() {
		if (hadKeyboardEvent) {
			node.classList.add('focus-visible');
		}
	}

	function onBlur() {
		node.classList.remove('focus-visible');
	}

	document.addEventListener('keydown', onKeyDown);
	document.addEventListener('pointerdown', onPointerDown);
	node.addEventListener('focus', onFocus);
	node.addEventListener('blur', onBlur);

	return {
		destroy() {
			document.removeEventListener('keydown', onKeyDown);
			document.removeEventListener('pointerdown', onPointerDown);
			node.removeEventListener('focus', onFocus);
			node.removeEventListener('blur', onBlur);
		}
	};
}
