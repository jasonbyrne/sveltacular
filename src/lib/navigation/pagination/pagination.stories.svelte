<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Pagination from './pagination.svelte';

	const { Story } = defineMeta({
		component: Pagination,
		title: 'Navigation/Pagination',
		tags: ['autodocs'],
		args: {
			onChange: fn()
		}
	});
</script>

<Story name="SinglePage" args={{}} />

<Story name="TwoPages" args={{ currentPage: 2, totalPages: 2 }} />

<Story name="ManyPages" args={{ currentPage: 10, totalPages: 50 }} />

<Story name="AlignStart" args={{ currentPage: 1, totalPages: 7, align: 'start' }} />

<Story name="FlatSmall" args={{ currentPage: 10, totalPages: 50, style: 'flat', size: 'sm' }} />

<Story name="FlatMedium" args={{ currentPage: 10, totalPages: 50, style: 'flat', size: 'md' }} />

<Story name="FlatLarge" args={{ currentPage: 10, totalPages: 50, style: 'flat', size: 'lg' }} />

<Story
	name="FlatExtraLarge"
	args={{ currentPage: 10, totalPages: 50, style: 'flat', size: 'xl' }}
/>
