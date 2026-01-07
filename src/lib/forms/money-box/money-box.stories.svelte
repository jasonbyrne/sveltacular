<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import MoneyBox from './money-box.svelte';

	const { Story } = defineMeta({
		component: MoneyBox,
		title: 'Forms/MoneyBox',
		tags: ['autodocs'],
		args: {
			onChange: fn()
		}
	});
</script>

<Story name="Default" args={{ value: 100, label: 'Per Dium' }} />

<Story
	name="Cents"
	args={{
		value: 2500,
		units: 'cents',
		allowCents: true,
		size: 'md',
		max: 10000,
		label: 'Membership Dues'
	}}
/>
