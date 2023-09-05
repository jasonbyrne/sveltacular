<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import PhoneBox from './phone-box.svelte';

	let changes: string[] = [];

	const onChange = (event: CustomEvent<string>) => {
		changes = [event.detail, ...changes];
	};
</script>

<Meta title="Forms/PhoneBox" component={PhoneBox} />

<Story name="Default">
	<PhoneBox value="5551239876">Some Label</PhoneBox>
</Story>

<Story name="Seven Digits">
	<PhoneBox value="1239876">Some Label</PhoneBox>
</Story>

<Story name="No Value">
	<PhoneBox value="" on:change={onChange}>Some Label</PhoneBox>
	<ul>
		{#each changes as change}
			<li>{change}</li>
		{/each}
	</ul></Story
>

<Story name="Small">
	<PhoneBox value="5551239876" size="sm">Some Label</PhoneBox>
</Story>
