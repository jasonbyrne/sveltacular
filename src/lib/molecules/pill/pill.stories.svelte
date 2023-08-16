<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Pill from './pill.svelte';
</script>

<Meta title="Pill" component={Pill} />

<Story name="Small">
	<Pill size="sm">Small</Pill>
</Story>

<Story name="Medium">
	<Pill size="md">Medium</Pill>
</Story>

<Story name="Large">
	<Pill size="lg">Large</Pill>
</Story>

<Story name="X-Large">
	<Pill size="xl">Extra Large</Pill>
</Story>
