<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import ListBox from './list-box.svelte';
	import type { DropdownOption } from '$src/lib/types/form.js';
	import { UnitedStates } from '$src/lib/data/united-states.js';

	const items: DropdownOption[] = [
		{ name: 'SvelteKit', value: 'svelte ' },
		{ name: 'Angular', value: 'angular ' },
		{ name: 'React', value: 'react ' },
		{ name: 'Vue', value: 'vue ' }
	];
</script>

<Meta title="Forms/ListBox" component={ListBox} />

<Story name="Simple">
	<div>
		<ListBox {items}>Best JavaScript Framework</ListBox>
	</div>
	<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</div>
</Story>

<Story name="Searchable">
	<div>
		<ListBox items={UnitedStates} searchable>State or Territory</ListBox>
	</div>
	<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</div>
</Story>
