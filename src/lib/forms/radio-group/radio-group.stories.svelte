<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import RadioGroup from './radio-group.svelte';

	// Database types for field mapping examples
	type Status = { id: string; name: string; color: string };
	type Size = { sizeId: number; title: string };

	// Sample database objects
	const statuses: Status[] = [
		{ id: 'draft', name: 'Draft', color: 'gray' },
		{ id: 'review', name: 'In Review', color: 'blue' },
		{ id: 'published', name: 'Published', color: 'green' },
		{ id: 'archived', name: 'Archived', color: 'red' }
	];

	const sizes: Size[] = [
		{ sizeId: 1, title: 'Small' },
		{ sizeId: 2, title: 'Medium' },
		{ sizeId: 3, title: 'Large' },
		{ sizeId: 4, title: 'Extra Large' }
	];

	const { Story } = defineMeta({
		component: RadioGroup,
		title: 'Forms/RadioGroup',
		tags: ['autodocs'],
		args: {
			onChange: fn()
		}
	});
</script>

<Story
	name="Standard"
	args={{
		label: 'Choose one:',
		items: [
			{ label: 'Option 1', value: '1' },
			{ label: 'Option 2', value: '2' },
			{ label: 'Option 3', value: '3' }
		]
	}}
/>


<Story
	name="WithDatabaseObjects"
	args={{
		label: 'Status (Database Object)',
		items: statuses,
		fieldNames: { label: 'name', value: 'id' },
		group: 'review',
		helperText: 'Using fieldNames to map database objects - returns just the ID'
	}}
/>

<Story
	name="WithCustomFieldNames"
	args={{
		label: 'Select Size',
		items: sizes,
		fieldNames: { label: 'title', value: 'sizeId' },
		group: 2,
		helperText: 'Map custom field names like sizeId and title'
	}}
/>

<Story
	name="FieldMappingBackwardsCompatible"
	args={{
		label: 'Choose one (Traditional):',
		items: [
			{ label: 'Option 1', value: '1' },
			{ label: 'Option 2', value: '2' },
			{ label: 'Option 3', value: '3' }
		],
		group: '2',
		helperText: 'Without fieldNames, component works exactly as before'
	}}
/>
