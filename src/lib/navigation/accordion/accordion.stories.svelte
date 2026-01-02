<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Accordion from './accordion.svelte';

	const { Story } = defineMeta({
		component: Accordion,
		title: 'Navigation/Accordion',
		tags: ['autodocs'],
		args: {
			onToggle: fn()
		}
	});
</script>

<Story name="Standard" args={{ title: 'Card title' }}>Navigation items would go here</Story>


