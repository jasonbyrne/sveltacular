<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Confirm from './confirm.svelte';

	const { Story } = defineMeta({
		component: Confirm,
		title: 'Modals/Confirm',
		tags: ['autodocs'],
		args: {
			onYes: fn(),
			onNo: fn(),
			onClose: fn()
		}
	});
</script>

<Story name="Default" args={{ title: 'Something Will Happen', open: true }}
	>Do you want to do this thing?</Story
>

<Story
	name="ConfirmCancelOrSave"
	args={{
		title: 'Edit User',
		open: true,
		yesText: 'Save',
		noText: 'Cancel',
		size: 'lg'
	}}
>
	Form content would go here
</Story>
