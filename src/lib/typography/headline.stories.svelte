<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Headline from './headline.svelte';

	const { Story } = defineMeta({
		component: Headline,
		title: 'Typography/Headline',
		tags: ['autodocs']
	});
</script>

<Story name="Default">Headline</Story>

<Story name="Level1" args={{ level: 1 }}>Headline 1</Story>

<Story name="Level2" args={{ level: 2 }}>Headline 2</Story>

<Story name="Level3" args={{ level: 3 }}>Headline 3</Story>

<Story name="Level4" args={{ level: 4 }}>Headline 4</Story>

<Story name="Level5" args={{ level: 5 }}>Headline 5</Story>

<Story name="Level6" args={{ level: 6 }}>Headline 6</Story>

<Story name="Transform" args={{ transform: 'uppercase' }}>Headline Uppercase</Story>
