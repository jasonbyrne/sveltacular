<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Form from './form.svelte';
	import FormHeader from './form-header.svelte';
	import TextBox from './text-box/text-box.svelte';
	import FormFooter from './form-footer.svelte';
	import Button from './button/button.svelte';
	import FlexRow from '../layout/flex-row.svelte';
	import FlexItem from '../layout/flex-item.svelte';
</script>

<Meta title="Forms/Form" component={Form} />

<Story name="Default">
	<Form action="get">
		<FormHeader title="User" />
		<FlexRow gap="1rem">
			<FlexItem grow>
				<TextBox size="full">First Name</TextBox>
			</FlexItem>
			<FlexItem grow>
				<TextBox size="full">Last Name</TextBox>
			</FlexItem>
		</FlexRow>
		<FormFooter>
			<Button style="secondary" size="full">Cancel</Button>
			<Button style="primary" size="full">Save</Button>
		</FormFooter>
	</Form>
</Story>
