<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Progress from './progress.svelte';

	const { Story } = defineMeta({
		component: Progress,
		title: 'Placeholders/Progress',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ value: 50 }} />


