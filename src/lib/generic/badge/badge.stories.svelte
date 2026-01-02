<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from './badge.svelte';

	const { Story } = defineMeta({
		component: Badge,
		title: 'Generic/Badge',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ count: 5 }} />

<Story name="Max" args={{ count: 150, max: 99 }} />

<Story name="Positive" args={{ count: 3, variant: 'positive' }} />

<Story name="Negative" args={{ count: 12, variant: 'negative' }} />

<Story name="Warning" args={{ count: 7, variant: 'warning' }} />

