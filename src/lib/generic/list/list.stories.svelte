<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import List from './list.svelte';

	const { Story } = defineMeta({
		component: List,
		title: 'Generic/List',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ type: 'unordered' }}>List items would be rendered here</Story>

<Story name="Ordered" args={{ type: 'ordered' }}>List items would be rendered here</Story>

<Story name="Squares" args={{ type: 'unordered', variant: 'square' }}>List items would be rendered here</Story>

<Story name="Striped" args={{ type: 'unordered', variant: 'striped' }}>List items would be rendered here</Story>


