<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import AppBar from './app-bar.svelte';
</script>

<Meta title="Navigation/AppBar" component={AppBar} />

<Story name="Top (Medium)">
	<AppBar size="md" position="top">
		<strong>Site Header</strong>
	</AppBar>
</Story>

<Story name="Top (X-Large)">
	<AppBar size="xl" position="top">
		<strong>Site Header</strong>
	</AppBar>
</Story>

<Story name="Bottom (Small)">
	<AppBar size="xs" position="bottom" isFixed={true}>This is the footer</AppBar>
</Story>
