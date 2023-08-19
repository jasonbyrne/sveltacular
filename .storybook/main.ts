import type { StorybookConfig } from '@storybook/sveltekit';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
	stories: ['../src/lib/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	staticDirs: [{ from: '../static', to: '/assets' }],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/preset-scss',
		'@storybook/addon-svelte-csf',
		'storybook-dark-mode'
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	docs: {
		autodocs: 'tag'
	},
	async viteFinal(config) {
		return mergeConfig(config, {
			resolve: {
				alias: { $lib: path.resolve(__dirname, '../src/lib') }
			}
		});
	}
};
export default config;
