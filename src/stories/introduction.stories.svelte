<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Introduction from './introduction.svelte';

	/**
	 * Welcome to Sveltacular! This is the landing page that introduces the library.
	 * 
	 * Sveltacular is a comprehensive TypeScript and SASS based component library for Svelte 5, 
	 * with zero runtime dependencies.
	 */
	const { Story } = defineMeta({
		component: Introduction,
		title: 'Introduction',
		tags: ['autodocs']
	});
</script>

<Story name="Welcome">
	<Introduction />
</Story>

