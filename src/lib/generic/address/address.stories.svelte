<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Address from './address.svelte';
</script>

<Meta title="Generic/Address" component={Address} />

<Story name="Default">
	<Address
		streetAddress="123 Main St"
		city="Anytown"
		region="CA"
		postalCode="12345"
		country="USA"
	/>
</Story>

<Story name="Multiple Lines">
	<Address
		streetAddress="123 Main St
Suite 100"
		city="Anytown"
		region="CA"
		postalCode="12345"
		country="USA"
	/>
</Story>

<Story name="No Country">
	<Address streetAddress="123 Main St" city="Anytown" region="CA" postalCode="12345" />
</Story>

<Story name="No Postal Code">
	<Address streetAddress="123 Main St" city="Anytown" region="CA" country="USA" />
</Story>

<Story name="No Region">
	<Address streetAddress="123 Main St" city="Anytown" postalCode="12345" country="USA" />
</Story>

<Story name="No Street Address">
	<Address city="Anytown" region="CA" postalCode="12345" country="USA" />
</Story>

<Story name="No City">
	<Address streetAddress="123 Main St" region="CA" postalCode="12345" country="USA" />
</Story>
