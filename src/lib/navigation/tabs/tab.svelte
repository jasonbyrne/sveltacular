<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getContext, onDestroy } from 'svelte';
	import { tabContext, type TabContext } from './tab-context.js';
	import { navigateTo, uniqueId } from '$src/lib/index.js';
	import Loading from '$src/lib/placeholders/loading.svelte';

	let {
		title,
		href = undefined,
		active = $bindable(false),
		id = undefined,
		onSelected = undefined,
		children = undefined
	}: {
		title: string;
		href?: string | undefined;
		active?: boolean;
		id?: string | undefined;
		onSelected?: ((id: string) => void) | undefined;
		children?: Snippet;
	} = $props();

	const getId = () => id || title.trim().toLocaleLowerCase().replaceAll(' ', '_') || uniqueId();

	const ctx = getContext<TabContext>(tabContext);
	const tabStyle = ctx.style || 'traditional';
	const _id = getId();

	// Register this tab
	ctx.register(_id, title, active);

	// Subscribe to future tab changes
	const unsubscribe = ctx.active.subscribe((selectedId) => {
		active = selectedId === _id;
		if (active) {
			onSelected?.(_id);
			if (href) {
				console.log('Navigating to', href);
				navigateTo(href);
			}
		}
	});

	// Tear down
	onDestroy(() => unsubscribe());
</script>

<article class:active class={tabStyle}>
	{#if active}
		{#if children}
			{@render children?.()}
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
