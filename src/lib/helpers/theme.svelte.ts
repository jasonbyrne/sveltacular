/**
 * Theme Management Composable
 *
 * Provides reactive theme state and utilities for switching between light and dark modes.
 * The theme preference is persisted in localStorage and synced across tabs.
 *
 * @example
 * ```svelte
 * <script>
 *   import { useTheme } from '$lib/helpers/theme.svelte';
 *
 *   const theme = useTheme();
 * </script>
 *
 * <button onclick={() => theme.toggle()}>
 *   Current theme: {theme.current}
 * </button>
 * ```
 */

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'sveltacular-theme';
const MEDIA_QUERY = '(prefers-color-scheme: dark)';

class ThemeManager {
	current = $state<Theme>('system');
	resolved = $state<ResolvedTheme>('light');

	private mediaQuery: MediaQueryList | null = null;
	private initialized = false;

	constructor() {
		if (typeof window !== 'undefined') {
			this.initialize();
		}
	}

	private initialize() {
		if (this.initialized) return;
		this.initialized = true;

		// Load saved preference or default to 'system'
		const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
		this.current = saved || 'system';

		// Set up media query listener for system preference
		this.mediaQuery = window.matchMedia(MEDIA_QUERY);
		this.updateResolvedTheme();

		// Listen for system theme changes
		this.mediaQuery.addEventListener('change', () => {
			this.updateResolvedTheme();
		});

		// Listen for storage changes (sync across tabs)
		window.addEventListener('storage', (e) => {
			if (e.key === STORAGE_KEY && e.newValue) {
				this.current = e.newValue as Theme;
				this.updateResolvedTheme();
			}
		});

		// Apply theme immediately
		this.applyTheme();
	}

	private updateResolvedTheme() {
		if (this.current === 'system') {
			this.resolved = this.mediaQuery?.matches ? 'dark' : 'light';
		} else {
			this.resolved = this.current;
		}
	}

	private applyTheme() {
		if (typeof document === 'undefined') return;

		this.updateResolvedTheme();
		document.documentElement.setAttribute('data-theme', this.resolved);
	}

	/**
	 * Set the theme to a specific value
	 */
	set(theme: Theme) {
		this.current = theme;
		localStorage.setItem(STORAGE_KEY, theme);
		this.applyTheme();
	}

	/**
	 * Toggle between light and dark themes
	 * (skips 'system' mode for simple toggling)
	 */
	toggle() {
		const newTheme: Theme = this.resolved === 'dark' ? 'light' : 'dark';
		this.set(newTheme);
	}

	/**
	 * Reset to system preference
	 */
	resetToSystem() {
		this.set('system');
	}

	/**
	 * Check if dark mode is currently active
	 */
	get isDark(): boolean {
		return this.resolved === 'dark';
	}

	/**
	 * Check if light mode is currently active
	 */
	get isLight(): boolean {
		return this.resolved === 'light';
	}

	/**
	 * Check if system preference is being used
	 */
	get isSystem(): boolean {
		return this.current === 'system';
	}
}

// Singleton instance
let themeManager: ThemeManager | null = null;

/**
 * Get the theme manager instance
 *
 * @returns ThemeManager instance with reactive theme state
 */
export function useTheme(): ThemeManager {
	if (!themeManager) {
		themeManager = new ThemeManager();
	}
	return themeManager;
}
