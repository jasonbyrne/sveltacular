<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import PhoneNumber from './phone.svelte';
</script>

<Meta title="Generic/PhoneNumber" component={PhoneNumber} />

<Story name="Default">
	<PhoneNumber phoneNumber="555-555-5555" />
</Story>

<Story name="Home Phone">
	<PhoneNumber type="home" phoneNumber="555-555-5555" />
</Story>

<Story name="With Country Code">
	<PhoneNumber phoneNumber="+1 555-555-5555" />
</Story>

<Story name="With Extension">
	<PhoneNumber phoneNumber="555-555-5555 x123" />
</Story>

<Story name="Without Area Code">
	<PhoneNumber phoneNumber="555-5555" />
</Story>
