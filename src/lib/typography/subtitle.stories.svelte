<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Subtitle from './subtitle.svelte';
</script>

<Meta title="Typography/Subtitle" component={Subtitle} />

<Story name="Default">
	<Subtitle>Subtitle</Subtitle>
</Story>

<Story name="Level 1">
	<Subtitle level={1}>Subtitle 1</Subtitle>
</Story>

<Story name="Level 2">
	<Subtitle level={2}>Subtitle 2</Subtitle>
</Story>

<Story name="Level 3">
	<Subtitle level={3}>Subtitle 3</Subtitle>
</Story>

<Story name="Level 4">
	<Subtitle level={4}>Subtitle 4</Subtitle>
</Story>

<Story name="Level 5">
	<Subtitle level={5}>Subtitle 5</Subtitle>
</Story>

<Story name="Level 6">
	<Subtitle level={6}>Subtitle 6</Subtitle>
</Story>

<Story name="Transform: Uppercase">
	<Subtitle transform="uppercase">Subtitle</Subtitle>
</Story>

<Story name="Transform: Capialize">
	<Subtitle transform="capitalize">foo bar</Subtitle>
</Story>
