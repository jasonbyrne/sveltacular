<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SkeletonTable from './skeleton-table.svelte';

	const { Story } = defineMeta({
		component: SkeletonTable,
		title: 'Placeholders/SkeletonTable',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{}} />

<Story name="No Animation" args={{ animation: 'none' }} />

<Story name="Small Table" args={{ columns: 3, rows: 3 }} />

<Story name="Large Table" args={{ columns: 6, rows: 10 }} />

<Story name="Wide Table" args={{ columns: 8, rows: 5 }} />
