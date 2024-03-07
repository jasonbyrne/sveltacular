<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import MoneyBox from './money-box.svelte';

	let valueInCents = 2500;
	let valueInDollars = 100;
</script>

<Meta title="Forms/MoneyBox" component={MoneyBox} />


<Story name="Default">
	<MoneyBox bind:value={valueInDollars}>Per Dium</MoneyBox>
	{valueInDollars}
</Story>

<Story name="Cents">
	<MoneyBox bind:value={valueInCents} isCents allowCents>Membership Dues</MoneyBox>
	{valueInCents}
</Story>
