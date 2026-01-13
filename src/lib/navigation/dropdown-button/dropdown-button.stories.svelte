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

<Story name="WithMenuItems" args={{ text: 'Actions' }}>
	{#snippet children()}
		<DropdownItem>Edit</DropdownItem>
		<DropdownItem>Delete</DropdownItem>
		<DropdownItem>Archive</DropdownItem>
	{/snippet}
</Story>

<Story name="MultipleDropdowns">
	{#snippet children()}
		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<DropdownButton text="Dropdown 1">
				<DropdownItem>Option 1A</DropdownItem>
				<DropdownItem>Option 1B</DropdownItem>
				<DropdownItem>Option 1C</DropdownItem>
			</DropdownButton>
			
			<DropdownButton text="Dropdown 2">
				<DropdownItem>Option 2A</DropdownItem>
				<DropdownItem>Option 2B</DropdownItem>
				<DropdownItem>Option 2C</DropdownItem>
			</DropdownButton>
			
			<DropdownButton text="Dropdown 3" variant="ghost">
				<DropdownItem>Option 3A</DropdownItem>
				<DropdownItem>Option 3B</DropdownItem>
				<DropdownItem>Option 3C</DropdownItem>
			</DropdownButton>
		</div>
		<p style="margin-top: 2rem; color: #666; font-size: 0.875rem;">
			Try opening multiple dropdowns - only one will stay open at a time.
			Click outside or press Escape to close.
		</p>
	{/snippet}
</Story>
