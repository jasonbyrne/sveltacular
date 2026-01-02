<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ThemeProviderDemo from './theme-provider-demo.svelte';

	const { Story } = defineMeta({
		component: ThemeProviderDemo,
		title: 'Generic/Theme Provider',
		tags: ['autodocs']
	});
</script>

<Story name="Theme Controls" />

