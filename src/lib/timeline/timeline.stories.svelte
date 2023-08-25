<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Timeline from './timeline.svelte';
	import type { TimelineItem } from '../types/timeline-item.js';

	const items: TimelineItem[] = [
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

<Story name="Default">
	<Timeline {items} />
</Story>
