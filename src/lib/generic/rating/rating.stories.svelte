<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Rating from './rating.svelte';

	const { Story } = defineMeta({
		component: Rating,
		title: 'Generic/Rating',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ value: 3, max: 5 }} />

<Story name="Readonly" args={{ value: 4, max: 5, readonly: true }} />

<Story name="Large" args={{ value: 2, max: 5, size: 'lg' }} />

<Story name="CustomMax" args={{ value: 7, max: 10 }} />












