<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ComboBox from './combo-box.svelte';

	const { Story } = defineMeta({
		title: 'Forms/ComboBox',
		component: ComboBox,
		tags: ['autodocs'],
		args: {
			items: [
				{ value: 'apple', name: 'Apple' },
				{ value: 'banana', name: 'Banana' },
				{ value: 'cherry', name: 'Cherry' },
				{ value: 'date', name: 'Date' },
				{ value: 'elderberry', name: 'Elderberry' }
			],
			label: 'Select an option',
			placeholder: 'Choose...'
		}
	});
</script>

<Story name="Basic">Basic single-select combobox with static options.</Story>

<Story name="Searchable" args={{ searchable: true }}>
	ComboBox with search/filter functionality enabled.
</Story>

<Story name="MultiSelect" args={{ multiSelect: true, searchable: true }}>
	Select multiple options displayed as removable chips.
</Story>

<Story name="MultiSelectWithLimit" args={{ multiSelect: true, searchable: true, maxSelections: 3 }}>
	Multi-select with a maximum number of selections (3).
</Story>

<Story
	name="VirtualScrolling"
	args={{
		items: Array.from({ length: 10000 }, (_, i) => ({
			value: `item-${i}`,
			name: `Item ${i + 1}`
		})),
		searchable: true,
		virtualScroll: true,
		itemHeight: 40,
		label: 'Select from 10,000 items',
		placeholder: 'Search from 10,000 items...'
	}}
>
	Efficiently handles 10,000+ items with virtual scrolling.
</Story>

<Story name="Disabled" args={{ disabled: true, value: 'banana' }}>
	ComboBox in disabled state.
</Story>

<Story name="Error" args={{ required: true, errorText: 'Please select an option' }}>
	ComboBox with error message.
</Story>

<Story name="Success" args={{ value: 'apple', successText: 'Great choice!' }}>
	ComboBox with success message.
</Story>
