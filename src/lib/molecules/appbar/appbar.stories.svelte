<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Appbar from './appbar.svelte';
</script>

<Meta title="Appbar" component={Appbar} />

<Story name="Top (Medium)">
	<Appbar size="md" positon="top">
		<strong>Site Header</strong>
	</Appbar>
</Story>

<Story name="Top (X-Large)">
	<Appbar size="xl" positon="top">
		<strong>Site Header</strong>
	</Appbar>
</Story>

<Story name="Bottom (Small)">
	<Appbar size="xs" position="bottom" isFixed={true}>This is the footer</Appbar>
</Story>
