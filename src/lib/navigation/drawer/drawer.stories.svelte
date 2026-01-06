<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Drawer from './drawer.svelte';
	import Button from '$src/lib/forms/button/button.svelte';

	const { Story } = defineMeta({
		component: Drawer,
		title: 'Navigation/Drawer',
		tags: ['autodocs']
	});
</script>

<Story name="Left" args={{ position: 'left', open: true }}>
	<Drawer position="left" open={true}>
		<div style="padding: 2rem">
			<h2>Drawer Content</h2>
			<p>This is drawer content that slides in from the left.</p>
		</div>
	</Drawer>
</Story>

<Story name="Right" args={{ position: 'right', open: true }}>
	<Drawer position="right" open={true}>
		<div style="padding: 2rem">
			<h2>Drawer Content</h2>
			<p>This is drawer content that slides in from the right.</p>
		</div>
	</Drawer>
</Story>









