<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Subtitle from './subtitle.svelte';

	const { Story } = defineMeta({
		component: Subtitle,
		title: 'Typography/Subtitle',
		tags: ['autodocs']
	});
</script>

<Story name="Default">Subtitle</Story>

<Story name="Level1" args={{ level: 1 }}>Subtitle 1</Story>

<Story name="Level2" args={{ level: 2 }}>Subtitle 2</Story>

<Story name="Level3" args={{ level: 3 }}>Subtitle 3</Story>

<Story name="Level4" args={{ level: 4 }}>Subtitle 4</Story>

<Story name="Level5" args={{ level: 5 }}>Subtitle 5</Story>

<Story name="Level6" args={{ level: 6 }}>Subtitle 6</Story>

<Story name="TransformUppercase" args={{ transform: 'uppercase' }}>Subtitle</Story>

<Story name="TransformCapitalize" args={{ transform: 'capitalize' }}>foo bar</Story>
