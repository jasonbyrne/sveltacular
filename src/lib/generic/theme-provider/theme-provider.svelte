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
	import { onMount } from 'svelte';

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

	onMount(() => {
		// Set initial theme if provided
		if (initialTheme) {
			theme.set(initialTheme);
		}

		// Apply theme to document
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', theme.resolved);
		}
	});

	// Watch for theme changes and update document
	$effect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', theme.resolved);
		}
	});
</script>

{#if renderWrapper}
	<div class={className} data-theme={theme.resolved}>
		{@render children?.()}
	</div>
{:else}
	{@render children?.()}
{/if}
