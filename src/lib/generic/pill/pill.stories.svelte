<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Pill from './pill.svelte';
</script>

<Meta title="Generic/Pill" component={Pill} />

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

<Story name="Badge">
	<Pill size="lg" shape="badge">Badge</Pill>
</Story>

<Story name="Square">
	<Pill size="lg" shape="square">Square</Pill>
</Story>

<Story name="Positive">
	<Pill size="lg" shape="circular" style="positive">X</Pill>
</Story>
