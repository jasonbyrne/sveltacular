<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Confirm from './confirm.svelte';
	import Form from '../forms/form.svelte';
	import TextBox from '../forms/text-box/text-box.svelte';
</script>

<Meta title="Modals/Confirm" component={Confirm} />

<Story name="Default">
	<Confirm title="Something Will Happen" open>Do you want to do this thing?</Confirm>
</Story>

<Story name="Confirm: Cancel or Save">
	<Confirm title="Edit User" open yesText="Save" noText="Cancel" size="lg">
		<TextBox size="full">First Name</TextBox>
		<TextBox size="full">Last Name</TextBox>
	</Confirm>
</Story>
