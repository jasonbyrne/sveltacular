<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import TextBox from './text-box.svelte';

	const { Story } = defineMeta({
		component: TextBox,
		title: 'Forms/TextBox',
		tags: ['autodocs'],
		args: {
			onChange: fn(),
			onInput: fn()
		}
	});
</script>

<Story
	name="Standard"
	args={{ type: 'text', placeholder: 'Placeholder text', helperText: 'Here is some additional requirements for the input.' }}
/>

<Story name="Units" args={{ type: 'text', suffix: 'cm', value: '10', placeholder: 'Placeholder text' }} />

<Story
	name="WithLabel"
	args={{
		type: 'text',
		placeholder: 'Placeholder text',
		helperText: 'Here is some additional requirements for the input.',
		label: 'Name'
	}}
/>

<Story
	name="LinkedIn"
	args={{ type: 'text', prefix: 'https://www.linkedin.com/in/', placeholder: 'UserName', allowSpaces: false }}
/>

<Story name="UserName" args={{ type: 'text', placeholder: 'User Name', allowSpaces: false, textCase: 'lower' }} />


