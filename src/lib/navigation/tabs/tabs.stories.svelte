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

<Story name="Underline" args={{ variant: 'underline' }}>Tab content would be rendered here</Story>

<Story name="Outline" args={{ variant: 'outline' }}>Tab content would be rendered here</Story>

<Story name="Overline" args={{ variant: 'overline' }}>Tab content would be rendered here</Story>


