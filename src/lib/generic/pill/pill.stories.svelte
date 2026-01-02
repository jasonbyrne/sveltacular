<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Pill from './pill.svelte';

	const { Story } = defineMeta({
		component: Pill,
		title: 'Generic/Pill',
		tags: ['autodocs']
	});
</script>

<Story name="Small" args={{ size: 'sm', label: 'Small' }} />

<Story name="Medium" args={{ size: 'md', label: 'Medium' }} />

<Story name="Large" args={{ size: 'lg', label: 'Large' }} />

<Story name="XLarge" args={{ size: 'xl', label: 'Extra Large' }} />

<Story name="Badge" args={{ size: 'lg', shape: 'badge', label: 'Badge' }} />

<Story name="Square" args={{ size: 'lg', shape: 'square', label: 'Square' }} />

<Story
	name="Positive"
	args={{ size: 'lg', shape: 'circular', style: 'positive', label: 'Positive' }}
/>

<Story
	name="Negative"
	args={{ size: 'lg', shape: 'circular', style: 'negative', label: 'Negative' }}
/>

<Story
	name="Outline"
	args={{ size: 'lg', shape: 'circular', style: 'outline', label: 'Outline' }}
/>

<Story name="Circular" args={{ size: 'lg', shape: 'circular', label: 'Circular' }} />

<Story name="Circle" args={{ size: 'lg', shape: 'circle', label: 'Circle' }} />

<Story name="Compact" args={{ size: 'lg', compact: true, label: 'Compact' }} />
