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

	// Configure base path for GitHub Pages deployment
	// Project Pages are served at username.github.io/repo-name/, so we need the base path
	...(process.env.GITHUB_ACTIONS && {
		// Only set base path when building in GitHub Actions
		// The base path matches the repository name
		base: '/sveltacular/'
	}),

	async viteFinal(config) {
		return mergeConfig(config, {
			base: process.env.GITHUB_ACTIONS ? '/sveltacular/' : '/',
			resolve: {
				alias: { $lib: path.resolve(__dirname, '../src/lib') }
			}
		});
	}
};
export default config;
