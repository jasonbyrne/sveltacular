<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import MoneyBox from './money-box.svelte';
	import Button from '../button/button.svelte';

	let valueInCents = 2500;
	let valueInDollars = 100;
</script>

<Meta title="Forms/MoneyBox" component={MoneyBox} />


<Story name="Default">
	<MoneyBox bind:value={valueInDollars}>Per Dium</MoneyBox>
	{valueInDollars}
</Story>

<Story name="Cents">
	<MoneyBox bind:value={valueInCents} units="cents" allowCents size="md" max={10000}>Membership Dues</MoneyBox>
	<Button on:click={() => valueInCents = 0}>Reset</Button>
	<Button on:click={() => valueInCents = 2500}>Set to $25</Button>
	{valueInCents}
</Story>
