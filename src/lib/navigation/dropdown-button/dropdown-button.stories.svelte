<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import DropdownButton from './dropdown-button.svelte';
	import { DropdownItem } from '$src/lib/index.js';
</script>

<Meta title="Navigation/Dropdown Button" component={DropdownButton} />

<Story name="Default">
	<DropdownButton text="Click Me">Foo bar</DropdownButton>
</Story>

<Story name="Long Text and Menu">
	<DropdownButton text="Lorem ipsum verite lux impala">
		<DropdownItem>Foo</DropdownItem>
		<DropdownItem href="#">Bar</DropdownItem>
		<DropdownItem>Baz</DropdownItem>
	</DropdownButton>
</Story>

<Story name="Ghost">
	<DropdownButton text="Ghost Button" style="ghost">
		<DropdownItem>Foo</DropdownItem>
		<DropdownItem href="#">Bar</DropdownItem>
		<DropdownItem>Baz</DropdownItem>
	</DropdownButton>
</Story>
