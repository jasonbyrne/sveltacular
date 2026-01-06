<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TimeBox from './time-box.svelte';

	const { Story } = defineMeta({
		component: TimeBox,
		title: 'Forms/TimeBox',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ label: 'Time' }} />

<Story name="WithValue" args={{ label: 'Time', value: '14:30' }} />

<Story name="Required" args={{ label: 'Time', required: true }} />







