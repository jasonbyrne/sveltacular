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
			line-height: 2rem;
			font-size: 0.8rem;
			font-weight: 300;
			cursor: pointer;
			color: var(--sv-color-light);
			height: 2rem;
			overflow: hidden;
			padding: 0 1rem;
			border-width: 0.1rem 0.1rem 0 0.1rem;
			border-style: solid;
			border-radius: 0.5rem 0.5rem 0 0;
			margin-right: 0.5rem;
			border-color: transparent;
			position: relative;
			z-index: 2;

			button {
				appearance: none;
				background: transparent;
				border: none;
				color: inherit;
				font-size: 0.8rem;
				padding: 0;
				cursor: pointer;
				width: 100%;
				height: 100%;

				&:focus {
					outline: none;
				}
			}

			&:hover {
				color: #aaa;
			}
		}

		div {
			display: none;
			width: 100%;
			position: absolute;
			top: 2rem;
			left: 0;
			border-top: solid 0.2rem #ccc;
			padding-top: 1rem;
			z-index: 1;
			color: var(--sv-color-fg);
		}

		&.active {
			header {
				font-weight: 700;
				background: #ddd;
				color: #000;
			}
			div {
				display: block;
			}
		}
	}
</style>
