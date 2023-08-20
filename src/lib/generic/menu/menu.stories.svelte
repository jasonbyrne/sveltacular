<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Menu from './menu.svelte';
	import type { DropdownOption } from '$src/lib/index.js';
	import { UnitedStates } from '$src/lib/data/united-states.js';

	// Name Value Pair of United States States and Territories
	const items: DropdownOption[] = [];
</script>

<Meta title="Generic/Menu" component={Menu} />

<Story name="Standard">
	<Menu items={UnitedStates} open>Pick a state</Menu>
</Story>

<Story name="Filtered">
	<Menu items={UnitedStates} open closeAfterSelect={false} searchText="New">Pick a state</Menu>
</Story>
