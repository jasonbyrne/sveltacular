<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import AppBar from './app-bar.svelte';
	import AppLogo from './app-logo.svelte';
</script>

<Meta title="Navigation/AppBar" component={AppBar} />

<Story name="Top (Extra Small)">
	<AppBar size="xs" position="top">
		<strong>Site Header</strong>
	</AppBar>
</Story>

<Story name="Top (Small)">
	<AppBar size="sm" position="top">
		<AppLogo src="/assets/sveltacular.png" alt="Sveltacular" href="/" />
	</AppBar>
</Story>

<Story name="Top (Medium)">
	<AppBar size="md" position="top">
		<AppLogo src="/assets/sveltacular.png" alt="Sveltacular" href="/" />
	</AppBar>
</Story>

<Story name="Top (Large)">
	<AppBar size="lg" position="top">
		<AppLogo src="/assets/sveltacular.png" alt="Sveltacular" href="/" />
	</AppBar>
</Story>

<Story name="Top (X-Large)">
	<AppBar size="xl" position="top">
		<AppLogo src="/assets/sveltacular.png" alt="Sveltacular" href="/" />
	</AppBar>
</Story>

<Story name="Bottom (Small)">
	<AppBar size="xs" position="bottom" isFixed={true}>This is the footer</AppBar>
</Story>
