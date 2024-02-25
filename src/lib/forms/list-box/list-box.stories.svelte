<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import ListBox from './list-box.svelte';
	import type { DropdownOption } from '$src/lib/types/form.js';
	import { UnitedStates } from '$src/lib/data/united-states.js';
	import { countriesArray } from '$src/lib/data/countries.js';

	const items: DropdownOption[] = [
		{ name: 'SvelteKit', value: 'svelte' },
		{ name: 'Angular', value: 'angular' },
		{ name: 'React', value: 'react=' },
		{ name: 'Vue', value: 'vue' }
	];

	const itemsWithNull: DropdownOption[] = [
		{ name: 'SvelteKit', value: 'svelte' },
		{ name: 'Angular', value: 'angular' },
		{ name: 'React', value: 'react=' },
		{ name: 'Vue', value: 'vue' },
		{ name: 'None', value: null }
	];

	let searchLog: string[] = [];
	let value = 'svelte';
	const addToSearchLog = (e: CustomEvent<string>) => {
		searchLog = [...searchLog, e.detail];
	};

	const search = async (searchText: string) => {
		const result = countriesArray.filter((country) =>
			country.name.toLowerCase().includes(searchText.toLowerCase().trim())
		);
		return result;
	};
	let searchedItems: { name: string; value: string }[] = [];
	let searchValue = 'USA';
</script>

<Meta title="Forms/ListBox" component={ListBox} />

<Story name="Simple">
	<div>
		<ListBox {items}>Best JavaScript Framework</ListBox>
	</div>
	<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</div>
</Story>

<Story name="Simple with Null">
	<div>
		<ListBox items={itemsWithNull}>Best JavaScript Framework</ListBox>
	</div>
	<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</div>
</Story>

<Story name="Value Selected">
	<div>
		<ListBox {items} bind:value>Best JavaScript Framework</ListBox>
	</div>
	<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</div>
</Story>

<Story name="Searchable">
	<div>
		<ListBox items={UnitedStates} searchable on:search={addToSearchLog}>State or Territory</ListBox>
	</div>
	<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</div>
	<ul>
		{#each searchLog as item}
			<li>{item}</li>
		{/each}
	</ul>
</Story>

<Story name="Searchable Pre-Selected">
	<div>
		<ListBox bind:items={searchedItems} searchable {search} bind:value={searchValue}
			>Countries</ListBox
		>
	</div>
</Story>

<Story name="Searchable Disabled">
	<div>
		<ListBox bind:items={searchedItems} searchable {search} bind:value={searchValue} disabled
			>Countries</ListBox
		>
	</div>
</Story>
