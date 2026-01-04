/**
 * Live Region Announcer
 * 
 * Provides utilities for announcing dynamic content changes to screen readers
 * using ARIA live regions. Useful for:
 * - Form validation messages
 * - Loading states
 * - Toast/notification messages
 * - Dynamic content updates
 * - Status changes
 */

type AnnouncementPriority = 'polite' | 'assertive';

interface AnnouncerOptions {
	priority?: AnnouncementPriority;
	delay?: number;
	clearAfter?: number;
}

/**
 * Singleton announcer class
 */
class Announcer {
	private politeRegion: HTMLElement | null = null;
	private assertiveRegion: HTMLElement | null = null;
	private timeouts: Map<string, ReturnType<typeof setTimeout>> = new Map();

	constructor() {
		// Initialize on first use
		if (typeof window !== 'undefined') {
			this.initialize();
		}
	}

	/**
	 * Initialize the live regions in the DOM
	 */
	private initialize() {
		if (this.politeRegion && this.assertiveRegion) return;

		// Create polite live region
		this.politeRegion = document.createElement('div');
		this.politeRegion.setAttribute('role', 'status');
		this.politeRegion.setAttribute('aria-live', 'polite');
		this.politeRegion.setAttribute('aria-atomic', 'true');
		this.politeRegion.className = 'sr-only';
		this.politeRegion.style.cssText = `
			position: absolute;
			left: -10000px;
			width: 1px;
			height: 1px;
			overflow: hidden;
		`;

		// Create assertive live region
		this.assertiveRegion = document.createElement('div');
		this.assertiveRegion.setAttribute('role', 'alert');
		this.assertiveRegion.setAttribute('aria-live', 'assertive');
		this.assertiveRegion.setAttribute('aria-atomic', 'true');
		this.assertiveRegion.className = 'sr-only';
		this.assertiveRegion.style.cssText = `
			position: absolute;
			left: -10000px;
			width: 1px;
			height: 1px;
			overflow: hidden;
		`;

		// Add to document body
		if (document.body) {
			document.body.appendChild(this.politeRegion);
			document.body.appendChild(this.assertiveRegion);
		} else {
			// If body not ready, wait for DOMContentLoaded
			document.addEventListener('DOMContentLoaded', () => {
				document.body.appendChild(this.politeRegion!);
				document.body.appendChild(this.assertiveRegion!);
			});
		}
	}

	/**
	 * Announce a message to screen readers
	 * 
	 * @param message - The message to announce
	 * @param options - Announcement options
	 *   - priority: 'polite' (default) or 'assertive'
	 *   - delay: Delay in ms before announcing (useful for preventing announcement spam)
	 *   - clearAfter: Clear the message after N ms (default: 1000)
	 */
	announce(message: string, options: AnnouncerOptions = {}) {
		const {
			priority = 'polite',
			delay = 0,
			clearAfter = 1000
		} = options;

		// Ensure initialized
		this.initialize();

		const region = priority === 'assertive' ? this.assertiveRegion : this.politeRegion;
		if (!region) return;

		// Clear any existing timeout for this region
		const timeoutKey = priority;
		const existingTimeout = this.timeouts.get(timeoutKey);
		if (existingTimeout) {
			clearTimeout(existingTimeout);
		}

		// Announce with optional delay
		const announceTimeout = setTimeout(() => {
			// Set the message
			region.textContent = message;

			// Clear after specified time
			if (clearAfter > 0) {
				const clearTimeoutId = setTimeout(() => {
					region.textContent = '';
				}, clearAfter);
				this.timeouts.set(timeoutKey, clearTimeoutId);
			}
		}, delay);

		this.timeouts.set(timeoutKey, announceTimeout);
	}

	/**
	 * Announce with polite priority (default)
	 * Won't interrupt current screen reader announcements
	 */
	polite(message: string, options: Omit<AnnouncerOptions, 'priority'> = {}) {
		this.announce(message, { ...options, priority: 'polite' });
	}

	/**
	 * Announce with assertive priority
	 * Will interrupt current screen reader announcements
	 */
	assertive(message: string, options: Omit<AnnouncerOptions, 'priority'> = {}) {
		this.announce(message, { ...options, priority: 'assertive' });
	}

	/**
	 * Clear all announcements
	 */
	clear() {
		// Clear all timeouts
		this.timeouts.forEach((timeout) => clearTimeout(timeout));
		this.timeouts.clear();

		// Clear region content
		if (this.politeRegion) this.politeRegion.textContent = '';
		if (this.assertiveRegion) this.assertiveRegion.textContent = '';
	}

	/**
	 * Clean up and remove live regions from DOM
	 */
	destroy() {
		this.clear();
		this.politeRegion?.remove();
		this.assertiveRegion?.remove();
		this.politeRegion = null;
		this.assertiveRegion = null;
	}
}

// Export singleton instance
const announcer = new Announcer();
export default announcer;

/**
 * Convenience function for polite announcements
 */
export function announce(message: string, options?: AnnouncerOptions) {
	announcer.announce(message, options);
}

/**
 * Convenience function for polite announcements
 */
export function announcePolite(message: string, options?: Omit<AnnouncerOptions, 'priority'>) {
	announcer.polite(message, options);
}

/**
 * Convenience function for assertive announcements
 */
export function announceAssertive(message: string, options?: Omit<AnnouncerOptions, 'priority'>) {
	announcer.assertive(message, options);
}

/**
 * Svelte action for announcing element content changes
 * Usage: <div use:announceChange={{ priority: 'polite' }}>Content that changes</div>
 */
export function announceChange(
	node: HTMLElement,
	options: { priority?: AnnouncementPriority } = {}
) {
	let previousContent = node.textContent || '';

	const observer = new MutationObserver(() => {
		const currentContent = node.textContent || '';
		if (currentContent !== previousContent && currentContent.trim()) {
			announcer.announce(currentContent, { priority: options.priority });
			previousContent = currentContent;
		}
	});

	observer.observe(node, {
		childList: true,
		subtree: true,
		characterData: true
	});

	return {
		update(newOptions: typeof options) {
			options = newOptions;
		},
		destroy() {
			observer.disconnect();
		}
	};
}

/**
 * Announce form validation error
 */
export function announceError(fieldName: string, error: string) {
	announcer.assertive(`${fieldName}: ${error}`);
}

/**
 * Announce form validation success
 */
export function announceSuccess(message: string) {
	announcer.polite(message);
}

/**
 * Announce loading state
 */
export function announceLoading(message = 'Loading...') {
	announcer.polite(message);
}

/**
 * Announce loaded state
 */
export function announceLoaded(message = 'Content loaded') {
	announcer.polite(message);
}

/**
 * Announce navigation
 */
export function announceNavigation(destination: string) {
	announcer.polite(`Navigated to ${destination}`);
}

/**
 * Announce modal open
 */
export function announceModalOpen(title: string) {
	announcer.assertive(`${title} dialog opened`);
}

/**
 * Announce modal close
 */
export function announceModalClose() {
	announcer.polite('Dialog closed');
}

/**
 * Announce item count change (for lists, search results, etc.)
 */
export function announceItemCount(count: number, itemName = 'items') {
	const plural = count === 1 ? itemName : `${itemName}s`;
	announcer.polite(`${count} ${plural} available`);
}

/**
 * Announce selection change
 */
export function announceSelection(item: string, position?: number, total?: number) {
	let message = `${item} selected`;
	if (position !== undefined && total !== undefined) {
		message += `, ${position} of ${total}`;
	}
	announcer.polite(message);
}

