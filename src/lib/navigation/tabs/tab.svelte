<script lang="ts">
	import { createEventDispatcher, getContext, onDestroy } from 'svelte';
	import { tabContext, type TabContext } from './tab-context.js';
	import { navigateTo, uniqueId } from '$src/lib/index.js';
	import Loading from '$src/lib/placeholders/loading.svelte';

	export let title: string;
	export let href: string | undefined = undefined;
	export let active = false;
	export let id: string | undefined = undefined;

	const getId = () => id || title.trim().toLocaleLowerCase().replaceAll(' ', '_') || uniqueId();

	const dispatch = createEventDispatcher<{ selected: string }>();
	const ctx = getContext<TabContext>(tabContext);
	const tabStyle = ctx.style || 'traditional';
	const _id = getId();

	// Register this tab
	ctx.register(_id, title, active);

	// Subscribe to future tab changes
	const unsubscribe = ctx.active.subscribe((selectedId) => {
		active = selectedId === _id;
		if (active) dispatch('selected', _id);
		if (active && href) {
			console.log('Navigating to', href);
			navigateTo(href);
		}
	});

	// Tear down
	onDestroy(() => unsubscribe());
</script>

<article class:active class={tabStyle}>
	{#if active}
		{#if $$slots.default}
			<slot />
		{:else}
			<Loading />
		{/if}
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
