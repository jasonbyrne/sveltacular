<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import CheckBoxGroup from './check-box-group.svelte';

	const { Story } = defineMeta({
		component: CheckBoxGroup,
		title: 'Forms/CheckBoxGroup',
		tags: ['autodocs'],
		args: {
			onChange: fn()
		}
	});
</script>

<Story
	name="Standard"
	args={{
		label: 'Choose one or more:',
		items: [
			{ name: 'Option 1', value: '1' },
			{ name: 'Option 2', value: '2' },
			{ name: 'Option 3', value: '3' }
		]
	}}
></Story>
