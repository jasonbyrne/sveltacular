<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Toaster from './toaster.svelte';

	const { Story } = defineMeta({
		component: Toaster,
		title: 'Generic/Toaster',
		tags: ['autodocs']
	});
</script>

<Story name="Default">Toaster content would go here</Story>
