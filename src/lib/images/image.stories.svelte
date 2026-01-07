<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Image from './image.svelte';

	const sources = [{ url: '/assets/svelte.png' }];

	const { Story } = defineMeta({
		component: Image,
		title: 'Images/Image',
		tags: ['autodocs']
	});
</script>

<Story name="WithoutCaption" args={{ src: sources }} />

<Story name="WithCaption" args={{ src: sources }}>Svelte Logo</Story>
