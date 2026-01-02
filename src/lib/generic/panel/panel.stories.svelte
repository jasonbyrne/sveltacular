<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Panel from './panel.svelte';

	const { Story } = defineMeta({
		component: Panel,
		title: 'Generic/Panel',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ title: 'This is the panel title' }}>
	Panel content would go here
</Story>


