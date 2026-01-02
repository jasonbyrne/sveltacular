<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Address from './address.svelte';

	const { Story } = defineMeta({
		component: Address,
		title: 'Generic/Address',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ streetAddress: '123 Main St', city: 'Anytown', region: 'CA', postalCode: '12345', country: 'USA' }} />

<Story name="MultipleLines" args={{ streetAddress: '123 Main St\nSuite 100', city: 'Anytown', region: 'CA', postalCode: '12345', country: 'USA' }} />

<Story name="NoCountry" args={{ streetAddress: '123 Main St', city: 'Anytown', region: 'CA', postalCode: '12345' }} />

<Story name="NoPostalCode" args={{ streetAddress: '123 Main St', city: 'Anytown', region: 'CA', country: 'USA' }} />

<Story name="NoRegion" args={{ streetAddress: '123 Main St', city: 'Anytown', postalCode: '12345', country: 'USA' }} />

<Story name="NoStreetAddress" args={{ city: 'Anytown', region: 'CA', postalCode: '12345', country: 'USA' }} />

<Story name="NoCity" args={{ streetAddress: '123 Main St', region: 'CA', postalCode: '12345', country: 'USA' }} />


