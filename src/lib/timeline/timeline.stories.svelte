<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Timeline from './timeline.svelte';

	const { Story } = defineMeta({
		component: Timeline,
		title: 'Timeline/Timeline',
		tags: ['autodocs']
	});
</script>

<Story name="SmallIcon">Timeline items would be rendered here</Story>

<Story name="MediumIcon">Timeline items would be rendered here</Story>

<Story name="LargeIcon">Timeline items would be rendered here</Story>


