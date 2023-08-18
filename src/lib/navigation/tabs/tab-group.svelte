<script context="module" lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { setContext } from 'svelte';

	export interface TabContext {
		active: Writable<string | null>;
	}
	export const tabContext = 'tabContext';
</script>

<script lang="ts">
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
	}
</style>
