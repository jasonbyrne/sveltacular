/**
 * Global dropdown manager to ensure only one dropdown is open at a time
 */

let openDropdownId: string | null = $state(null);

export function createDropdownManager() {
	return {
		/**
		 * Register a dropdown as open
		 * @param id - Unique identifier for the dropdown
		 * @returns true if this dropdown was opened, false if it was closed
		 */
		open(id: string): boolean {
			if (openDropdownId === id) {
				// Same dropdown clicked again - close it
				openDropdownId = null;
				return false;
			}
			// Close any other open dropdown and open this one
			openDropdownId = id;
			return true;
		},

		/**
		 * Close a specific dropdown
		 * @param id - Unique identifier for the dropdown
		 */
		close(id: string): void {
			if (openDropdownId === id) {
				openDropdownId = null;
			}
		},

		/**
		 * Check if a specific dropdown is currently open
		 * @param id - Unique identifier for the dropdown
		 */
		isOpen(id: string): boolean {
			return openDropdownId === id;
		},

		/**
		 * Close all dropdowns
		 */
		closeAll(): void {
			openDropdownId = null;
		}
	};
}

// Create singleton instance
export const dropdownManager = createDropdownManager();
