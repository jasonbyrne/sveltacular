<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Header from './header.svelte';

	const { Story } = defineMeta({
		component: Header,
		title: 'Generic/Headline',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ title: 'Headline', subtitle: 'Subtitle' }}>Header content would go here</Story>

<Story name="Underline" args={{ title: 'Header', subtitle: 'Subtitle', underline: true }}>
	Header content would go here
</Story>

<Story name="Level1" args={{ title: 'Header', subtitle: 'Subtitle', level: 1 }}>Header content would go here</Story>

<Story name="Level2" args={{ title: 'Header', subtitle: 'Subtitle', level: 2 }}>Header content would go here</Story>

<Story name="Level3" args={{ title: 'Header', subtitle: 'Subtitle', level: 3 }}>Header content would go here</Story>

<Story name="Level4" args={{ title: 'Header', subtitle: 'Subtitle', level: 4 }}>Header content would go here</Story>

<Story name="Level5" args={{ title: 'Header', subtitle: 'Subtitle', level: 5 }}>Header content would go here</Story>

<Story name="Level6" args={{ title: 'Header', subtitle: 'Subtitle', level: 6 }}>Header content would go here</Story>


