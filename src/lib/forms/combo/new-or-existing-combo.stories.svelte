<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import NewOrExistingCombo from './new-or-existing-combo.svelte';
	import { US_States } from '$src/lib/data/united-states.js';

	const { Story } = defineMeta({
		component: NewOrExistingCombo,
		title: 'Forms/New or Existing Combo',
		tags: ['autodocs'],
		args: {
			onChange: fn()
		}
	});
</script>

<Story name="Default" args={{ items: US_States }} />
