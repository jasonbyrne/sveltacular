<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Breadcrumbs from './breadcrumbs.svelte';

	const crumbs = [
		{ label: 'Search', href: 'https://www.google.com' },
		{ label: 'Search Term', href: 'https://www.google.com' },
		'Results'
	];

	const { Story } = defineMeta({
		component: Breadcrumbs,
		title: 'Navigation/Breadcrumbs',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ homeUrl: 'https://www.google.com', crumbs }} />

<Story name="Small" args={{ homeUrl: 'https://www.google.com', crumbs, size: 'sm' }} />

<Story name="Large" args={{ homeUrl: 'https://www.google.com', crumbs, size: 'lg' }} />

<Story name="NoHomeLink" args={{ crumbs }} />


