<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Menu from './menu.svelte';
	import { US_StateCodes } from '$src/lib/data/united-states.js';

	const { Story } = defineMeta({
		component: Menu,
		title: 'Generic/Menu',
		tags: ['autodocs'],
		args: {
			onSelect: fn()
		}
	});
</script>

<Story name="Standard" args={{ items: US_StateCodes, open: true }}>Pick a state</Story>

<Story
	name="Filtered"
	args={{ items: US_StateCodes, open: true, closeAfterSelect: false, searchText: 'New' }}
>
	Pick a state
</Story>


