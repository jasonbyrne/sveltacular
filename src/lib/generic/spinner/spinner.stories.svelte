<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Spinner from './spinner.svelte';

	const { Story } = defineMeta({
		component: Spinner,
		title: 'Generic/Spinner',
		tags: ['autodocs']
	});
</script>

<Story name="Small" args={{ size: 'sm' }} />

<Story name="Medium" args={{ size: 'md' }} />

<Story name="Large" args={{ size: 'lg' }} />

<Story name="ExtraLarge" args={{ size: 'xl' }} />

<Story name="Secondary" args={{ variant: 'secondary' }} />











