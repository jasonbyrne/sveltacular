<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import PhoneNumber from './phone.svelte';
</script>

<Meta title="Generic/Phone" component={PhoneNumber} />

<Story name="Default">
	<PhoneNumber value="555-555-5555" />
</Story>

<Story name="Home Phone">
	<PhoneNumber type="home" value="555-555-5555" />
</Story>

<Story name="With Country Code">
	<PhoneNumber value="+1 555-555-5555" />
</Story>

<Story name="With Extension">
	<PhoneNumber value="555-555-5555 x123" />
</Story>

<Story name="Without Area Code">
	<PhoneNumber value="555-5555" />
</Story>
