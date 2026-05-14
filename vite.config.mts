import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), svelteTesting()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['./src/lib/test-utils/setup.ts'],
		globals: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html', 'lcov'],
			include: ['src/lib/**/*.{js,ts,svelte}'],
			exclude: [
				'**/*.stories.svelte',
				'**/*.test.{js,ts}',
				'**/*.spec.{js,ts}',
				'**/test-utils/**',
				'**/types/**',
				'**/index.ts'
			],
			thresholds: {
				lines: 23,
				functions: 19,
				branches: 20,
				statements: 21
			}
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler' // or "modern"
			}
		}
	}
});
