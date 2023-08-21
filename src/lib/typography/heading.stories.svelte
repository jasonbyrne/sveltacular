<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Heading from './heading.svelte';
</script>

<Meta title="Typography/Heading" component={Heading} />

<Story name="Default">
	<Heading>Heading</Heading>
</Story>

<Story name="Level 1">
	<Heading level={1}>Heading 1</Heading>
</Story>

<Story name="Level 2">
	<Heading level={2}>Heading 2</Heading>
</Story>

<Story name="Level 3">
	<Heading level={3}>Heading 3</Heading>
</Story>

<Story name="Level 4">
	<Heading level={4}>Heading 4</Heading>
</Story>

<Story name="Level 5">
	<Heading level={5}>Heading 5</Heading>
</Story>

<Story name="Level 6">
	<Heading level={6}>Heading 6</Heading>
</Story>

<Story name="Transform">
	<Heading transform="uppercase">Heading</Heading>
</Story>
