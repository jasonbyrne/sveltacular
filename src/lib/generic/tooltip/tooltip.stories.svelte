<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tooltip from './tooltip.svelte';
	import Button from '$src/lib/forms/button/button.svelte';

	const { Story } = defineMeta({
		component: Tooltip,
		title: 'Generic/Tooltip',
		tags: ['autodocs']
	});
</script>

<Story name="Top" args={{ text: 'This is a tooltip', position: 'top' }}>
	<Tooltip text="This is a tooltip" position="top">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Bottom" args={{ text: 'This is a tooltip', position: 'bottom' }}>
	<Tooltip text="This is a tooltip" position="bottom">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Left" args={{ text: 'This is a tooltip', position: 'left' }}>
	<Tooltip text="This is a tooltip" position="left">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Right" args={{ text: 'This is a tooltip', position: 'right' }}>
	<Tooltip text="This is a tooltip" position="right">
		<Button label="Hover me" />
	</Tooltip>
</Story>

