<script lang="ts" context="module">
	import { Story } from '@storybook/addon-svelte-csf';
	import DateBox from './date-box.svelte';

	export const meta = {
		title: 'Forms/DateBox',
		component: DateBox,
	};
</script>

<Story name="Date">
	<DateBox type="date">Birthdate</DateBox>
</Story>

<Story name="Date + Time">
	<DateBox type="datetime-local">Deadline</DateBox>
</Story>

<Story name="Date (Nullable)">
	<DateBox type="date" nullable={true}>End Date</DateBox>
</Story>

<Story name="Date (Steps)">
	<DateBox type="date" steps={[
		{ label: '1 Day', value: 1, unit: 'day' },
		{ label: '1 Month', value: 1, unit: 'month' },
		{ label: '1 Year', value: 1, unit: 'year' }
	]}>End Date</DateBox>
</Story>
