<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let href: string | undefined = undefined;
	export let target: string | undefined = undefined;
	export let tabindex = 0;

	const dispatch = createEventDispatcher<{ click: void }>();

	const onClick = () => {
		dispatch('click');
	};
</script>

{#if !href}
	<span class="item" on:click={() => onClick()} on:keyup={() => onClick()} role="link" {tabindex}>
		<slot />
	</span>
{:else}
	<a {href} {target} class="item" on:click={() => onClick()} {tabindex}>
		<slot />
	</a>
{/if}

<style lang="scss">
	.item {
		display: block;
		cursor: pointer;
		padding: 0.5rem 1rem;
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.25rem;
		font-family: var(--base-font-family, sans-serif);
		white-space: nowrap;

		&:hover {
			background-color: var(--button-secondary-hover-bg, #333);
			color: var(--button-secondary-hover-fg, #fff);
		}
	}
</style>
