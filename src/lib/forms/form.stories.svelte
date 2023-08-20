<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Form from './form.svelte';
	import FormHeader from './form-header.svelte';
	import TextBox from './text-box/text-box.svelte';
	import FormFooter from './form-footer.svelte';
	import Button from './button/button.svelte';
</script>

<Meta title="Forms/Form" component={Form} />

<Story name="Default">
	<Form action="get">
		<FormHeader title="User" />
		<TextBox>First Name</TextBox>
		<TextBox>Last Name</TextBox>
		<FormFooter>
			<Button style="secondary" size="full">Cancel</Button>
			<Button style="primary" size="full">Save</Button>
		</FormFooter>
	</Form>
</Story>
