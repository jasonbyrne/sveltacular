// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
	stories: ['../src/lib/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	staticDirs: [{ from: '../static', to: '/assets' }],

	addons: ['@storybook/addon-links', '@storybook/addon-docs', '@storybook/addon-svelte-csf'],

	framework: {
		name: '@storybook/sveltekit',
		options: {}
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
