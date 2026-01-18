import type { Preview } from '@storybook/sveltekit';
import '../src/styles/global.scss';
import '../src/styles/theme.scss';

// Function to get the current theme
function getTheme(): 'light' | 'dark' {
	if (typeof window === 'undefined') return 'light';
	
	try {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const savedTheme = localStorage.getItem('sveltacular-theme');
		
		if (savedTheme === 'dark') {
			return 'dark';
		} else if (savedTheme === 'light') {
			return 'light';
		} else if (prefersDark) {
			return 'dark';
		}
	} catch (e) {
		// Fallback to light if anything fails
	}
	
	return 'light';
}

// Initialize theme synchronously before Storybook renders
// This ensures the data-theme attribute is set before Docs page and stories render
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	const theme = getTheme();
	document.documentElement.setAttribute('data-theme', theme);
}

const preview: Preview = {
	decorators: [
		(Story, context) => {
			// This decorator runs in the preview iframe context (both Stories and Docs)
			// Apply theme to the iframe's document element immediately
			if (typeof document !== 'undefined') {
				const theme = getTheme();
				document.documentElement.setAttribute('data-theme', theme);
				
				// Set up a MutationObserver to reapply theme if document changes
				// This handles cases where Storybook recreates the iframe
				const observer = new MutationObserver(() => {
					const currentTheme = getTheme();
					if (document.documentElement.getAttribute('data-theme') !== currentTheme) {
						document.documentElement.setAttribute('data-theme', currentTheme);
					}
				});
				
				observer.observe(document.documentElement, {
					attributes: true,
					attributeFilter: ['data-theme']
				});
				
				// Also poll for theme changes from localStorage
				let lastTheme = theme;
				const checkTheme = () => {
					const currentTheme = getTheme();
					if (currentTheme !== lastTheme) {
						lastTheme = currentTheme;
						document.documentElement.setAttribute('data-theme', currentTheme);
					}
				};
				
				// Check immediately and then periodically
				checkTheme();
				const intervalId = setInterval(checkTheme, 200);
				
				// Listen for storage changes (cross-tab sync)
				const handleStorage = (e: StorageEvent) => {
					if (e.key === 'sveltacular-theme') {
						checkTheme();
					}
				};
				window.addEventListener('storage', handleStorage);
			}
			
			return Story();
		}
	],
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		},
		options: {
			storySort: {
				order: ['Introduction', 'Forms', 'Generic', 'Navigation', 'Modals', 'Tables', 'Typography', 'Layout', 'Placeholders', 'Timeline', 'Images & Icons', '*']
			}
		}
	}
};

export default preview;
