<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Dropdown from './dropdown.svelte';
	import type { DropdownOption } from '$src/types/form.js';

	const items: DropdownOption[] = [
		{ name: 'SvelteKit', value: 'svelte ' },
		{ name: 'Angular', value: 'angular ' },
		{ name: 'React', value: 'react ' },
		{ name: 'Vue', value: 'vue ' }
	];
</script>

<Meta title="Dropdowns" component={Dropdown} />

<Story name="Simple">
	<Dropdown {items}>Best JavaScript Framework</Dropdown>
</Story>
