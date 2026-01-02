<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import TabGroup from './tab-group.svelte';

	const { Story } = defineMeta({
		component: TabGroup,
		title: 'Navigation/TabGroup',
		tags: ['autodocs'],
		args: {
			onChange: fn()
		}
	});
</script>

<Story name="Traditional">Tab content would be rendered here</Story>

<Story name="Underline" args={{ style: 'underline' }}>Tab content would be rendered here</Story>

<Story name="Outline" args={{ style: 'outline' }}>Tab content would be rendered here</Story>

<Story name="Overline" args={{ style: 'overline' }}>Tab content would be rendered here</Story>


