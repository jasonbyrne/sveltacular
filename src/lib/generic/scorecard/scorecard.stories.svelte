<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Scorecard from './scorecard.svelte';

	const { Story } = defineMeta({
		component: Scorecard,
		title: 'Generic/Scorecard',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ value: 12334 }}>Page Views</Story>

<Story name="Above" args={{ value: 12334, caption: 'above' }}>Page Views</Story>

<Story name="Below" args={{ value: 12334, caption: 'below' }}>Page Views</Story>

<Story name="Left" args={{ value: 12334, caption: 'left' }}>Page Views</Story>

<Story name="Right" args={{ value: 12334, caption: 'right' }}>Page Views</Story>

<Story name="Link" args={{ value: 12334, caption: 'above', href: 'https://www.google.com' }}>Page Views</Story>


