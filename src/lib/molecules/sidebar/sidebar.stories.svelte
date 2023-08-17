<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Sidebar from './sidebar.svelte';

	let open = true;
</script>

<Meta title="Sidebar" component={Sidebar} />

<Story name="Standard">
	<Sidebar {open}>
		<ul>
			<li>Item 1</li>
			<li>Item 2</li>
		</ul>
	</Sidebar>

	<div style="text-align: right; position: relative; z-index: 99999">
		<button on:click={() => (open = !open)}>Toggle</button>
	</div>
</Story>
