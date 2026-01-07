<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SkeletonInput from './skeleton-input.svelte';

	const { Story } = defineMeta({
		component: SkeletonInput,
		title: 'Placeholders/SkeletonInput',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{}} />

<Story name="Pulse" args={{ animation: 'pulse' }} />
