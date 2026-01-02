<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Prompt from './prompt.svelte';

	const { Story } = defineMeta({
		component: Prompt,
		title: 'Modals/Prompt',
		tags: ['autodocs'],
		args: {
			onSubmit: fn(),
			onCancel: fn(),
			onClose: fn()
		}
	});
</script>

<Story name="Default" args={{ open: true, title: 'Rename File' }}>What would you like to rename this file to?</Story>


