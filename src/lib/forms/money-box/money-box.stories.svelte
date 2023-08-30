<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import MoneyBox from './money-box.svelte';
</script>

<Meta title="Forms/MoneyBox" component={MoneyBox} />

<Template let:args>
	<MoneyBox {...args}>Value</MoneyBox>
</Template>

<Story
	name="Salary"
	args={{
		placeholder: 'Enter a Number',
		type: 'number',
		min: 0,
		max: 1000000,
		decimals: 0,
		step: 10000
	}}
/>
