<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import List from './list.svelte';
	import ListItem from './list-item.svelte';

	const { Story } = defineMeta({
		component: List,
		title: 'Generic/List',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ type: 'unordered' }}>
	<ListItem>List item one</ListItem>
	<ListItem>List item two</ListItem>
	<ListItem>List item three</ListItem>
</Story>

<Story name="Ordered" args={{ type: 'ordered' }}>
	<ListItem>List item one</ListItem>
	<ListItem>List item two</ListItem>
	<ListItem>List item three</ListItem>
</Story>

<Story name="Squares" args={{ type: 'unordered', variant: 'square' }}>
	<ListItem>List item one</ListItem>
	<ListItem>List item two</ListItem>
	<ListItem>List item three</ListItem>
</Story>

<Story name="Striped" args={{ type: 'unordered', variant: 'striped' }}>
	<ListItem>List item one</ListItem>
	<ListItem>List item two</ListItem>
	<ListItem>List item three</ListItem>
</Story>
