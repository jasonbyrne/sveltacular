<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import ListBox from './list-box.svelte';
	import { Countries } from '$src/lib/data/countries.js';
	import { US_States } from '$src/lib/data/united-states.js';
	import type { DropdownOption } from '$src/lib/types/form.js';

	const items = [
		{ name: 'SvelteKit', value: 'svelte' },
		{ name: 'Angular', value: 'angular' },
		{ name: 'React', value: 'react=' },
		{ name: 'Vue', value: 'vue' }
	];

	const itemsWithNull = [
		{ name: 'SvelteKit', value: 'svelte' },
		{ name: 'Angular', value: 'angular' },
		{ name: 'React', value: 'react=' },
		{ name: 'Vue', value: 'vue' },
		{ name: 'None', value: null }
	];

	const createNewHandler = async (name: string): Promise<DropdownOption | null> => {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 500));
		return {
			value: name.toLowerCase().replace(/\s+/g, '-'),
			name: name
		} satisfies DropdownOption;
	};

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
