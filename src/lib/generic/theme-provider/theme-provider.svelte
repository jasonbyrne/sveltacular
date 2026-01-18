<script lang="ts">
	/**
	 * Theme Provider Component
	 *
	 * Wraps your application to provide theme management functionality.
	 * Automatically applies the selected theme and syncs with system preferences.
	 *
	 * @component
	 * @example
	 * ```svelte
	 * <ThemeProvider>
	 *   <App />
	 * </ThemeProvider>
	 * ```
	 *
	 * Or with initial theme:
	 * ```svelte
	 * <ThemeProvider initialTheme="dark">
	 *   <App />
	 * </ThemeProvider>
	 * ```
	 */

	import { useTheme, type Theme } from '$lib/helpers/theme.svelte';

	interface Props {
		/**
		 * Initial theme to use (defaults to stored preference or 'system')
		 */
		initialTheme?: Theme;
		/**
		 * Child content to wrap
		 */
		children?: import('svelte').Snippet;
		/**
		 * Custom class name for the wrapper element
		 */
		class?: string;
		/**
		 * Whether to render as a wrapper div (default: false)
		 * When false, theme is applied directly to document without wrapper
		 */
		renderWrapper?: boolean;
	}

	let { initialTheme, children, class: className, renderWrapper = false }: Props = $props();

	const theme = useTheme();

	// Set initial theme and ensure theme attribute is set synchronously
	// This prevents FOUC (Flash of Unstyled Content) by ensuring CSS variables are available immediately
	$effect(() => {
		if (typeof document === 'undefined') return;

		// Set initial theme if provided (only on first run)
		if (initialTheme) {
			theme.set(initialTheme);
		}

		// Always ensure theme attribute is set on document element
		document.documentElement.setAttribute('data-theme', theme.resolved);
	});
</script>

{#if renderWrapper}
	<div class={className} data-theme={theme.resolved}>
		{@render children?.()}
	</div>
{:else}
	{@render children?.()}
{/if}
