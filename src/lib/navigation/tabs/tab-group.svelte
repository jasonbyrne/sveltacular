<script lang="ts">
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import { tabContext, type TabContext } from './tab-context.js';

	const ctx: TabContext = {
		active: writable(null)
	};

	setContext(tabContext, ctx);
</script>

<div>
	<slot />
</div>

<style lang="scss">
	div {
		position: relative;
		display: block;
		width: 100%;
		font-family: var(--base-font-family, sans-serif);
	}
</style>
