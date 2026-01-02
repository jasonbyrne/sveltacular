<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import SideBar from './side-bar.svelte';

	const { Story } = defineMeta({
		component: SideBar,
		title: 'Navigation/SideBar',
		tags: ['autodocs'],
		args: {
			onToggle: fn()
		}
	});
</script>

<Story name="Standard" args={{ open: true }}>Sidebar content would go here</Story>


