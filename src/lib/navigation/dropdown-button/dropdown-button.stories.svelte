<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DropdownButton from './dropdown-button.svelte';
	import { DropdownItem } from '$src/lib/index.js';

	const { Story } = defineMeta({
		component: DropdownButton,
		title: 'Navigation/Dropdown Button',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ text: 'Click Me' }}>Foo bar</Story>

<Story name="Ghost" args={{ text: 'Ghost Button', variant: 'ghost' }}
	>Menu items would go here</Story
>

<Story name="GhostNoIcon" args={{ text: 'Ghost Button', variant: 'ghost', icon: 'none' }}
	>Menu items would go here</Story
>
