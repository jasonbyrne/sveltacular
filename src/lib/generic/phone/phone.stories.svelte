<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PhoneNumber from './phone.svelte';

	const { Story } = defineMeta({
		component: PhoneNumber,
		title: 'Generic/Phone',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ value: '555-555-5555' }} />

<Story name="HomePhone" args={{ type: 'home', value: '555-555-5555' }} />

<Story name="WithCountryCode" args={{ value: '+1 555-555-5555' }} />

<Story name="WithExtension" args={{ value: '555-555-5555 x123' }} />

<Story name="WithoutAreaCode" args={{ value: '555-5555' }} />
