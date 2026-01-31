<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import ListBox from './list-box.svelte';
	import { Countries } from '$src/lib/data/countries.js';
	import { US_States } from '$src/lib/data/united-states.js';
	import type { ReferenceItem } from '$src/lib/types/form.js';

	const items: ReferenceItem[] = [
		{ label: 'SvelteKit', value: 'svelte' },
		{ label: 'Angular', value: 'angular' },
		{ label: 'React', value: 'react=' },
		{ label: 'Vue', value: 'vue' }
	];

	const itemsWithNull: ReferenceItem[] = [
		{ label: 'SvelteKit', value: 'svelte' },
		{ label: 'Angular', value: 'angular' },
		{ label: 'React', value: 'react=' },
		{ label: 'Vue', value: 'vue' },
		{ label: 'None', value: null }
	];

	const createNewHandler = async (name: string): Promise<ReferenceItem | null> => {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 500));
		return {
			value: name.toLowerCase().replace(/\s+/g, '-'),
			label: name
		} satisfies ReferenceItem;
	};

	// Database types for field mapping examples
	type Category = { id: number; name: string; slug: string };
	type Priority = { priorityId: string; title: string; sortOrder: number };

	// Sample database objects
	const categories: Category[] = [
		{ id: 1, name: 'Technology', slug: 'tech' },
		{ id: 2, name: 'Business', slug: 'business' },
		{ id: 3, name: 'Science', slug: 'science' },
		{ id: 4, name: 'Health', slug: 'health' }
	];

	const priorities: Priority[] = [
		{ priorityId: 'low', title: 'Low Priority', sortOrder: 1 },
		{ priorityId: 'medium', title: 'Medium Priority', sortOrder: 2 },
		{ priorityId: 'high', title: 'High Priority', sortOrder: 3 },
		{ priorityId: 'urgent', title: 'Urgent', sortOrder: 4 }
	];

	const { Story } = defineMeta({
		component: ListBox,
		title: 'Forms/ListBox',
		tags: ['autodocs'],
		args: {
			onChange: fn()
		}
	});
</script>

<Story name="Simple" args={{ items, label: 'Best JavaScript Framework' }} />

<Story name="SimpleWithNull" args={{ items: itemsWithNull, label: 'Best JavaScript Framework' }} />

<Story name="ValueSelected" args={{ items, value: 'svelte', label: 'Best JavaScript Framework' }} />

<Story
	name="Searchable"
	args={{ items: US_States, searchable: true, label: 'State or Territory' }}
/>

<Story
	name="SearchableDisabled"
	args={{
		items: Countries,
		searchable: true,
		disabled: true,
		value: 'USA',
		label: 'Countries'
	}}
/>

<Story
	name="WithCreateNew"
	args={{
		items,
		label: 'Framework (with Create)',
		createNew: createNewHandler,
		resourceName: 'Framework'
	}}
/>


<Story
	name="WithDatabaseObjects"
	args={{
		items: categories,
		fieldNames: { label: 'name', value: 'id' },
		value: 2,
		label: 'Category (Database Object)',
		helperText: 'Using fieldNames to map database objects - returns just the ID'
	}}
/>

<Story
	name="WithCustomFieldNames"
	args={{
		items: priorities,
		fieldNames: { label: 'title', value: 'priorityId' },
		value: 'high',
		label: 'Priority Level',
		helperText: 'Map custom field names like priorityId and title'
	}}
/>

<Story
	name="FieldMappingSearchable"
	args={{
		items: categories,
		fieldNames: { label: 'name', value: 'id' },
		searchable: true,
		label: 'Searchable Category',
		helperText: 'Field mapping works with searchable ListBox too'
	}}
/>

<Story
	name="FieldMappingBackwardsCompatible"
	args={{
		items,
		value: 'svelte',
		label: 'Framework (Traditional)',
		helperText: 'Without fieldNames, component works exactly as before'
	}}
/>
