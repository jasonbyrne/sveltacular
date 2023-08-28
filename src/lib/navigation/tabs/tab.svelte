<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { tabContext, type TabContext } from './tab-context.js';

	export let title: string;
	export let active = false;

	const dispatch = createEventDispatcher<{ selectTab: string }>();
	const ctx = getContext<TabContext>(tabContext);

	const selectThisTab = () => {
		dispatch('selectTab', title);
		ctx.active.set(title);
	};

	// If this tab was initial set as active, make it active
	if (active) selectThisTab();

	// Subscribe to future tab changes
	ctx.active.subscribe((value) => {
		active = value === title;
	});
</script>

<section class:active>
	<header>
		<button type="button" on:click={selectThisTab}>
			{title}
		</button>
	</header>
	<div>
		{#if active}
			<slot />
		{/if}
	</div>
</section>

<style lang="scss">
	section {
		display: inline;

		header {
			display: inline-block;
			cursor: pointer;
			height: 2rem;
			overflow: hidden;
			border-width: 0.1rem 0.1rem 0 0.1rem;
			border-style: solid;
			border-radius: 0.5rem 0.5rem 0 0;
			margin-right: 0.5rem;
			border-color: transparent;
			position: relative;
			z-index: 2;
			background: var(--tab-bg, transparent);
			color: var(--tab-fg, #fff);

			button {
				appearance: none;
				background: transparent;
				border: none;
				color: inherit;
				padding: 0;
				cursor: pointer;
				width: 100%;
				height: 100%;
				font-size: 1rem;
				line-height: 2rem;
				font-weight: 300;
				padding: 0 1rem;

				&:focus {
					outline: none;
				}
			}

			&:hover {
				background: var(--tab-hover-bg, transparent);
				color: var(--tab-hover-fg, #fbb);
			}
		}

		div {
			display: none;
			width: 100%;
			position: absolute;
			top: 2rem;
			left: 0;
			border-top: solid 0.2rem var(--tab-active-bg, #eee);
			padding-top: 1rem;
			z-index: 1;
			font-size: 1rem;
		}

		&.active {
			header {
				font-weight: 700;
				background: var(--tab-active-bg, #eee);
				color: var(--tab-active-fg, #000);
				cursor: default;
			}
			div {
				display: block;
			}
		}
	}
</style>
