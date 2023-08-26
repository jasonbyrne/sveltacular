<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Timeline from './timeline.svelte';
	import TimelineItem from './timeline-item.svelte';

	const items: {
		title: string;
		summary: string;
		date: string | Date | number;
	}[] = [
		{
			date: new Date('2021-01-01'),
			title: 'Title 1',
			summary: 'Summary 1'
		},
		{
			date: new Date('2021-01-02'),
			title: 'Title 2',
			summary: 'Summary 2'
		},
		{
			date: new Date('2021-01-03'),
			title: 'Title 3',
			summary: 'Summary 3'
		}
	];
</script>

<Meta title="Timeline/Timeline" component={Timeline} />

<Story name="Small Icon">
	<Timeline>
		{#each items as item}
			<TimelineItem {...item} dateStyle="long" dateType="date" iconSize="sm" />
		{/each}
	</Timeline>
</Story>

<Story name="Medium Icon">
	<Timeline>
		{#each items as item}
			<TimelineItem {...item} dateStyle="long" dateType="date" iconSize="md" />
		{/each}
	</Timeline>
</Story>

<Story name="Large Icon">
	<Timeline>
		{#each items as item}
			<TimelineItem {...item} dateStyle="long" dateType="date" iconSize="lg" />
		{/each}
	</Timeline>
</Story>
