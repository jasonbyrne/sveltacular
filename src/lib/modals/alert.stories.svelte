<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Alert from './alert.svelte';

	const { Story } = defineMeta({
		component: Alert,
		title: 'Modals/Alert',
		tags: ['autodocs'],
		args: {
			onClose: fn()
		}
	});
</script>

<Story name="Default" args={{ title: 'Error', open: true }}>
	Something went wrong and we need to make sure you see this.
</Story>

<Story name="AlertNoTitle" args={{ open: true }}>
	Something went wrong and we need to make sure you see this.
</Story>

<Story name="AlertXLarge" args={{ title: 'Extra Large', open: true, size: 'xl' }}>
	Something went wrong and we need to make sure you see this.
</Story>


