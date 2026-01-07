<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import DateBox from './date-box.svelte';

	const { Story } = defineMeta({
		component: DateBox,
		title: 'Forms/Date Box',
		tags: ['autodocs'],
		args: {
			onChange: fn()
		}
	});
</script>

<Story name="Date" args={{ type: 'date', label: 'Birthdate' }} />

<Story name="DateTime" args={{ type: 'datetime-local', label: 'Deadline' }} />

<Story name="DateNullable" args={{ type: 'date', nullable: true, label: 'End Date' }} />

<Story
	name="DateSteps"
	args={{
		type: 'date',
		label: 'End Date',
		steps: [
			{ label: '1 Day', value: 1, unit: 'day' },
			{ label: '1 Month', value: 1, unit: 'month' },
			{ label: '1 Year', value: 1, unit: 'year' }
		]
	}}
/>
