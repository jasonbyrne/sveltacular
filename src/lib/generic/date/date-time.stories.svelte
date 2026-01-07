<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DateTime from './date-time.svelte';

	const { Story } = defineMeta({
		component: DateTime,
		title: 'Generic/DateTime',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{}} />

<Story name="DateTimeLong" args={{ style: 'long', type: 'datetime' }} />

<Story name="DateTimeLongGB" args={{ style: 'long', type: 'datetime', lang: 'en-gb' }} />

<Story name="DateLong" args={{ style: 'long', type: 'date' }} />

<Story name="DateTimeShort" args={{ style: 'short', type: 'datetime' }} />

<Story name="DateShort" args={{ style: 'short', type: 'date' }} />

<Story name="YYYYMMDD" args={{ type: 'ymd' }} />

<Story name="YYYYMMDDHHMM" args={{ type: 'ymdhm' }} />

<Story name="YYYYMMDDHHMMSS" args={{ type: 'ymdhms' }} />

<Story name="YYYYMMDDHHMMTZ" args={{ type: 'ymdhmt' }} />

<Story name="TimeLong" args={{ style: 'long', type: 'time' }} />

<Story name="TimeMedium" args={{ style: 'medium', type: 'time' }} />

<Story name="TimeShort" args={{ style: 'short', type: 'time' }} />

<Story name="AgoShortNow" args={{ style: 'short', type: 'ago' }} />

<Story name="AgoShortPast" args={{ style: 'short', type: 'ago', value: '2023-08-13' }} />

<Story name="AgoShortFuture" args={{ style: 'short', type: 'ago', value: '2030-08-13' }} />

<Story name="AgoLongNow" args={{ style: 'long', type: 'ago' }} />

<Story name="AgoLongPast" args={{ style: 'long', type: 'ago', value: '2023-08-13' }} />

<Story name="AgoLongFuture" args={{ style: 'long', type: 'ago', value: '2030-08-13' }} />
