<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import PhoneBox from './phone-box.svelte';

	const { Story } = defineMeta({
		component: PhoneBox,
		title: 'Forms/PhoneBox',
		tags: ['autodocs'],
		args: {
			onChange: fn()
		}
	});
</script>

<Story name="Default" args={{ value: '5551239876', label: 'Some Label' }} />

<Story name="SevenDigits" args={{ value: '1239876', label: 'Some Label' }} />

<Story name="NoValue" args={{ label: 'Some Label' }} />

<Story name="Small" args={{ value: '5551239876', size: 'sm', label: 'Some Label' }} />


