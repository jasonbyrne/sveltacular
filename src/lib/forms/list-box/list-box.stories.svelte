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

	let searchLog: string[] = [];
	let value = 'svelte';
	const addToSearchLog = (e: CustomEvent<string>) => {
		searchLog = [...searchLog, e.detail];
	};

	const search = (e: CustomEvent<string>) => {
		searchedItems = countriesArray.filter((country) =>
			country.name.toLowerCase().includes(e.detail.toLowerCase())
		);
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
		<ListBox items={searchedItems} searchable on:search={search} bind:value={searchValue}
			>Countries</ListBox
		>
	</div>
</Story>
