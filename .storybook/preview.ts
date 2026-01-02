import type { Preview } from '@storybook/sveltekit';
import '../src/styles/global.scss';
import '../src/styles/theme.scss';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		}
	}
};

export default preview;
