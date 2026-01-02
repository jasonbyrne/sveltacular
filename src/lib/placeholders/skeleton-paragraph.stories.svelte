<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SkeletonParagraph from './skeleton-paragraph.svelte';

	const { Story } = defineMeta({
		component: SkeletonParagraph,
		title: 'Placeholders/SkeletonParagraph',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{}} />

<Story name="Pulse" args={{ animation: 'pulse' }} />

<Story name="Custom Lines" args={{ minLines: 2, maxLines: 4 }} />

<Story name="Many Lines" args={{ minLines: 5, maxLines: 8 }} />

