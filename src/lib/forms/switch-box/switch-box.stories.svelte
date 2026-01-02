<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import SwitchBox from './switch-box.svelte';

	const { Story } = defineMeta({
		component: SwitchBox,
		title: 'Forms/SwitchBox',
		tags: ['autodocs'],
		args: {
			onChange: fn()
		}
	});
</script>

<Story name="Default" args={{ checked: true }}>Turn on sync</Story>

<Story name="Medium" args={{ checked: true, size: 'md' }}>Turn on sync</Story>

<Story name="Large" args={{ checked: true, size: 'lg' }}>Turn on sync</Story>

<Story name="XLarge" args={{ checked: true, size: 'xl' }}>Turn on sync</Story>

<Story name="Small" args={{ checked: true, size: 'sm' }}>Turn on sync</Story>

<Story name="NoLabel" args={{ checked: false }} />


