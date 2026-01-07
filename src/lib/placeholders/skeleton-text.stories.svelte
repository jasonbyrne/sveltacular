<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SkeletonText from './skeleton-text.svelte';

	const { Story } = defineMeta({
		component: SkeletonText,
		title: 'Placeholders/SkeletonText',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{}} />

<Story name="Pulse" args={{ animation: 'pulse' }} />
