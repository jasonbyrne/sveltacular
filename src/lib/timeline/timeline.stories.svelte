<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Timeline from './timeline.svelte';
	import TimelineItem from './timeline-item.svelte';

	/**
	 * Timeline component for displaying chronological events or activities.
	 *
	 * **Accessibility**: Timeline uses semantic HTML (ul/li) for proper structure.
	 * Ensure timeline items have meaningful dates and titles for screen readers.
	 *
	 * **Usage**:
	 * ```svelte
	 * <Timeline>
	 *   <TimelineItem
	 *     date={new Date()}
	 *     title="Event Title"
	 *     summary="Event description"
	 *     iconSize="md"
	 *   />
	 * </Timeline>
	 * ```
	 */
	const { Story } = defineMeta({
		component: Timeline,
		title: 'Timeline/Timeline',
		tags: ['autodocs']
	});
</script>

<Story name="SmallIcon">
	<TimelineItem
		date={new Date('2024-01-15')}
		title="Project Started"
		summary="Initial planning and setup phase"
		iconSize="sm"
	/>
	<TimelineItem
		date={new Date('2024-02-20')}
		title="First Milestone"
		summary="Completed core functionality"
		iconSize="sm"
	/>
	<TimelineItem
		date={new Date('2024-03-10')}
		title="Beta Release"
		summary="Released to beta testers"
		iconSize="sm"
	/>
</Story>

<Story name="MediumIcon">
	<TimelineItem
		date={new Date('2024-01-15')}
		title="Project Started"
		summary="Initial planning and setup phase"
		iconSize="md"
	/>
	<TimelineItem
		date={new Date('2024-02-20')}
		title="First Milestone"
		summary="Completed core functionality"
		iconSize="md"
	/>
	<TimelineItem
		date={new Date('2024-03-10')}
		title="Beta Release"
		summary="Released to beta testers"
		iconSize="md"
	/>
</Story>

<Story name="LargeIcon">
	<TimelineItem
		date={new Date('2024-01-15')}
		title="Project Started"
		summary="Initial planning and setup phase"
		iconSize="lg"
	/>
	<TimelineItem
		date={new Date('2024-02-20')}
		title="First Milestone"
		summary="Completed core functionality"
		iconSize="lg"
	/>
	<TimelineItem
		date={new Date('2024-03-10')}
		title="Beta Release"
		summary="Released to beta testers"
		iconSize="lg"
	/>
</Story>
