<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Empty from './empty.svelte';

	const { Story } = defineMeta({
		component: Empty,
		title: 'Generic/Empty',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{}} />

<Story name="WithMessage" args={{ text: 'No results found' }} />

<Story name="Horizontal" args={{ text: 'No results found', orientation: 'horizontal' }} />

<Story name="XLarge" args={{ text: 'No results found', size: 'xl' }} />

<Story name="Large" args={{ text: 'No results found', size: 'lg' }} />

<Story name="Medium" args={{ text: 'No results found', size: 'md' }} />

<Story name="Small" args={{ text: 'No results found', size: 'sm' }} />


