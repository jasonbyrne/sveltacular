<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Chip from './chip.svelte';

	const { Story } = defineMeta({
		component: Chip,
		title: 'Generic/Chip',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ label: 'Chip' }} />

<Story name="Removable" args={{ label: 'Removable Chip', removable: true }} />

<Story name="Positive" args={{ label: 'Success', variant: 'positive' }} />

<Story name="Negative" args={{ label: 'Error', variant: 'negative' }} />

