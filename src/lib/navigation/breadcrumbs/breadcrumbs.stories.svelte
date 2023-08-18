<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Breadcrumbs from './breadcrumbs.svelte';
</script>

<Meta title="Navigation/Breadcrumbs" component={Breadcrumbs} />

<Story name="Standard">
	<Breadcrumbs
		homeUrl="https://www.google.com"
		crumbs={[
			{ label: 'Search', href: 'https://www.google.com' },
			{ label: 'Search Term', href: 'https://www.google.com' },
			'Results'
		]}
	/>
</Story>
