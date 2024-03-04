<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import PhoneBox from './phone-box.svelte';

	let changes: string[] = [];

	let value1 = '5551239876';
	let value2 = '1239876';

	const onChange = (event: CustomEvent<string>) => {
		changes = [event.detail, ...changes];
	};
</script>

<Meta title="Forms/PhoneBox" component={PhoneBox} />

<Story name="Default">
	<PhoneBox bind:value={value1}>Some Label</PhoneBox>
	<div>{value1}</div>
</Story>

<Story name="Seven Digits">
	<PhoneBox bind:value={value2}>Some Label</PhoneBox>
	<div>{value2}</div>
</Story>

<Story name="No Value">
	<PhoneBox on:change={onChange}>Some Label</PhoneBox>
	<ul>
		{#each changes as change}
			<li>{change}</li>
		{/each}
	</ul></Story
>

<Story name="Small">
	<PhoneBox value="5551239876" size="sm">Some Label</PhoneBox>
</Story>
