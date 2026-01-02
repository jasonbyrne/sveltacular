<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Accordian from './accordian.svelte';

	const { Story } = defineMeta({
		component: Accordian,
		title: 'Navigation/Accordian',
		tags: ['autodocs'],
		args: {
			onToggle: fn()
		}
	});
</script>

<Story name="Standard" args={{ title: 'Card title' }}>Navigation items would go here</Story>


