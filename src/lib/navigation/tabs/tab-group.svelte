<script lang="ts">
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import { tabContext, type TabContext } from './tab-context.js';
	import type { TabStyle } from '$src/lib/types/generic.js';

	export let style: TabStyle = 'traditional';
	export let squared = false;

	const ctx: TabContext = {
		active: writable(null),
		style,
		squared
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
