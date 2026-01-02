<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Form from './form.svelte';
	import TextBox from './text-box/text-box.svelte';
	import Button from './button/button.svelte';

	const { Story } = defineMeta({
		component: Form,
		title: 'Forms/Form',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ action: 'get' }}>
	<TextBox type="text" placeholder="Enter your name" label="Name" />
	<Button style="primary" label="Submit" />
</Story>
