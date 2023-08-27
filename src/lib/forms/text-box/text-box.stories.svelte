<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import TextBox from './text-box.svelte';
</script>

<Meta title="Forms/TextBox" component={TextBox} />

<Story name="Stanard">
	<TextBox
		type="text"
		placeholder="Placeholder text"
		helperText="Here is some additional requirements for the input."
	/>
</Story>

<Story name="Units">
	<TextBox type="text" suffix="cm" value="10" placeholder="Placeholder text" />
</Story>

<Story name="With Label">
	<TextBox
		type="text"
		placeholder="Placeholder text"
		helperText="Here is some additional requirements for the input.">Name</TextBox
	>
</Story>

<Story name="LinkedIn">
	<TextBox
		type="text"
		prefix="https://www.linkedin.com/in/"
		placeholder="UserName"
		allowSpaces={false}
	/>
</Story>

<Story name="User Name">
	<TextBox type="text" placeholder="User Name" allowSpaces={false} textCase="lower" />
</Story>
