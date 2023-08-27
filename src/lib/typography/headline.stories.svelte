<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Headline from './headline.svelte';
</script>

<Meta title="Typography/Headline" component={Headline} />

<Story name="Default">
	<Headline>Headline</Headline>
</Story>

<Story name="Level 1">
	<Headline level={1}>Headline 1</Headline>
</Story>

<Story name="Level 2">
	<Headline level={2}>Headline 2</Headline>
</Story>

<Story name="Level 3">
	<Headline level={3}>Headline 3</Headline>
</Story>

<Story name="Level 4">
	<Headline level={4}>Headline 4</Headline>
</Story>

<Story name="Level 5">
	<Headline level={5}>Headline 5</Headline>
</Story>

<Story name="Level 6">
	<Headline level={6}>Headline 6</Headline>
</Story>

<Story name="Transform">
	<Headline transform="uppercase">Headline Uppercase</Headline>
</Story>
