<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Breadcrumbs from './breadcrumbs.svelte';

	const crumbs = [
		{ label: 'Search', href: 'https://www.google.com' },
		{ label: 'Search Term', href: 'https://www.google.com' },
		'Results'
	];
</script>

<Meta title="Navigation/Breadcrumbs" component={Breadcrumbs} />

<Story name="Default">
	<Breadcrumbs homeUrl="https://www.google.com" {crumbs} />
</Story>

<Story name="Small">
	<Breadcrumbs homeUrl="https://www.google.com" {crumbs} size="sm" />
</Story>

<Story name="Large">
	<Breadcrumbs homeUrl="https://www.google.com" {crumbs} size="lg" />
</Story>

<Story name="No Home Link">
	<Breadcrumbs {crumbs} />
</Story>
