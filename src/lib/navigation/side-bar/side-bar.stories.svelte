<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import SideBar from './side-bar.svelte';

	let open = true;
</script>

<Meta title="Navigation/SideBar" component={SideBar} />

<Story name="Standard">
	<SideBar {open}>
		<ul>
			<li>Item 1</li>
			<li>Item 2</li>
		</ul>
	</SideBar>

	<div style="text-align: right; position: relative; z-index: 99999">
		<button on:click={() => (open = !open)}>Toggle</button>
	</div>
</Story>
