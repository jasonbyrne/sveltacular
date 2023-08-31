<script lang="ts">
	import { createEventDispatcher, getContext, onDestroy } from 'svelte';
	import { tabContext, type TabContext } from './tab-context.js';

	export let title: string;
	export let active = false;

	const dispatch = createEventDispatcher<{ selectTab: string }>();
	const ctx = getContext<TabContext>(tabContext);
	const tabStyle = ctx.style || 'traditional';

	const selectThisTab = () => {
		dispatch('selectTab', title);
		ctx.active.set(title);
	};

	// If this tab was initial set as active, make it active
	if (active) selectThisTab();

	// Subscribe to future tab changes
	const unsubscribe = ctx.active.subscribe((value) => {
		active = value === title;
	});

	// Tear down
	onDestroy(() => {
		unsubscribe();
	});

	$: classes = `${active ? 'active' : 'inactive'} ${tabStyle} ${
		ctx.squared ? 'squared' : 'rounded'
	}`;
</script>

<section class={classes}>
	<header class="tabTitle">
		<button type="button" on:click={selectThisTab}>
			{title}
		</button>
	</header>
	<div class="tabContent">
		{#if active}
			<slot />
		{/if}
	</div>
</section>

<style lang="scss">
	section {
		display: inline;
	}

	.tabTitle {
		display: inline-block;
		cursor: pointer;
		height: 2.2rem;
		overflow: hidden;
		position: relative;
		z-index: 2;

		button {
			appearance: none;
			background: transparent;
			border-style: solid;
			border-width: 0 0 0.2rem 0;
			border-color: transparent;
			border-radius: 0.5rem 0.5rem 0 0;
			color: inherit;
			cursor: pointer;
			width: 100%;
			height: 100%;
			font-size: 1rem;
			line-height: 1.8rem;
			height: 2.2rem;
			font-weight: 300;
			padding: 0 1rem;

			&:focus {
				outline: none;
			}
		}
	}

	.tabContent {
		display: none;
		width: 100%;
		position: absolute;
		top: 2rem;
		left: 0;
		border-top: solid 0.2rem var(--tab-content-border, rgb(220, 220, 230));
		padding-top: 1rem;
		font-size: 1rem;
	}

	.active button {
		font-weight: 700;
		cursor: default;
	}

	.inactive button {
		color: var(--tab-inactive-fg, #999);

		&:hover {
			color: var(--tab-hover-fg, #ccc);
		}
	}

	.active .tabContent {
		display: block;
	}

	.squared button {
		border-radius: 0.2rem 0.2rem 0 0;
	}

	.traditional {
		&.inactive button {
			background: var(--tab-traditional-inactive-bg, transparent);
			color: var(--tab-traditional-inactive-fg, rgb(100, 100, 100));
		}

		&.inactive button:hover {
			background: var(--tab-traditional-hover-bg, transparent);
			color: var(--tab-traditional-hover-fg, rgb(160, 160, 160));
		}

		&.active button {
			background: var(--tab-traditional-active-bg, rgb(220, 220, 230));
			color: var(--tab-traditional-active-fg, rgb(51, 51, 51));
		}
	}

	.underline {
		&.inactive button {
			background: var(--tab-underline-inactive-bg, transparent);
			color: var(--tab-underline-inactive-fg, rgb(100, 100, 100));
		}

		&.inactive button:hover {
			background: var(--tab-underline-hover-bg, transparent);
			color: var(--tab-underline-hover-fg, rgb(150, 150, 150));
		}

		&.active button {
			color: var(--tab-underline-active-fg, rgb(255, 134, 78));
			border-color: var(--tab-underline-active-fg, rgb(255, 134, 78));
		}
	}

	.outline {
		&.active button {
			border-width: 0.1rem 0.1rem 0 0.1rem;
			border-color: var(--tab-content-border, rgb(220, 220, 230));
		}
	}
</style>
