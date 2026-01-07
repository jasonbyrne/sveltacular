<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import RadioGroup from './radio-group.svelte';

	const { Story } = defineMeta({
		component: RadioGroup,
		title: 'Forms/RadioGroup',
		tags: ['autodocs'],
		args: {
			onChange: fn()
		}
	});
</script>

<Story
	name="Standard"
	args={{
		label: 'Choose one:',
		items: [
			{ name: 'Option 1', value: '1' },
			{ name: 'Option 2', value: '2' },
			{ name: 'Option 3', value: '3' }
		]
	}}
/>
