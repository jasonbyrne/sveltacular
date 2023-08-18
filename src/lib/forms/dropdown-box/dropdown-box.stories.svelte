<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import DropdownBox from './dropdown-box.svelte';
	import type { DropdownOption } from '$src/lib/types/form.js';

	const items: DropdownOption[] = [
		{ name: 'SvelteKit', value: 'svelte ' },
		{ name: 'Angular', value: 'angular ' },
		{ name: 'React', value: 'react ' },
		{ name: 'Vue', value: 'vue ' }
	];
</script>

<Meta title="Forms/DropdownBox" component={DropdownBox} />

<Story name="Simple">
	<DropdownBox {items}>Best JavaScript Framework</DropdownBox>
</Story>
