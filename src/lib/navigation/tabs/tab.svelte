<script lang="ts">
	import { createEventDispatcher, getContext, onDestroy } from 'svelte';
	import { tabContext, type TabContext } from './tab-context.js';
	import { uniqueId } from '$src/lib/index.js';

	export let title: string;
	export let active = false;

	const dispatch = createEventDispatcher<{ selectTab: string }>();
	const ctx = getContext<TabContext>(tabContext);
	const tabStyle = ctx.style || 'traditional';
	const id = uniqueId();

	// Register this tab
	ctx.register(id, title, active);

	// Subscribe to future tab changes
	const unsubscribe = ctx.active.subscribe((selectedId) => {
		active = selectedId === id;
	});

	// Tear down
	onDestroy(() => unsubscribe());
</script>

<article class:active>
	{#if active}
		<slot />
	{/if}
</article>

<style lang="scss">
	article {
		display: none;

		&.active {
			display: block;
		}
	}
</style>
