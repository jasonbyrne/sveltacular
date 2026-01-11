<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getContext, onMount, untrack } from 'svelte';
	import { tabContext, type TabContext } from './tab-context.js';
	import { navigateTo, uniqueId } from '$src/lib/index.js';
	import Loading from '$src/lib/placeholders/loading.svelte';

	let {
		label,
		href,
		id = undefined,
		disabled = false,
		onActivate = undefined,
		children = undefined
	}: {
		label: string;
		href?: string | undefined;
		id?: string | undefined;
		disabled?: boolean;
		onActivate?: ((id: string) => void) | undefined;
		children?: Snippet;
	} = $props();

	const ctx = getContext<TabContext>(tabContext);
	const tabStyle = ctx.variant || 'traditional';

	// Generate ID once - explicitly capture initial prop values for stable tab identity
	// Using untrack() to indicate we intentionally want non-reactive initial values
	const _id = untrack(
		() => id || label.trim().toLocaleLowerCase().replaceAll(' ', '_') || uniqueId()
	);

	// Register this tab once on mount (like wizard does)
	onMount(() => {
		ctx.register(_id, label, href, disabled);
	});

	// Access the $state object's properties directly - THIS creates reactive dependencies!
	const isActive = $derived(ctx.state.active === _id);

	// Handle activation side effects
	$effect(() => {
		if (isActive) {
			onActivate?.(_id);
			if (href) {
				navigateTo(href);
			}
		}
	});
</script>

<div
	role="tabpanel"
	id="tabpanel-{ctx.groupId}-{_id}"
	aria-labelledby="tab-{ctx.groupId}-{_id}"
	class:active={isActive}
	class={tabStyle}
	hidden={!isActive}
>
	{#if children}
		{@render children?.()}
	{:else}
		<Loading />
	{/if}
</div>

<style lang="scss">
	div[role='tabpanel'] {
		display: none;

		&.active,
		&:not([hidden]) {
			display: block;
		}
	}
</style>
