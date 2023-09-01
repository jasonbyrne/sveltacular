<script lang="ts">
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import { tabContext, type TabContext, type TabDefinition, type TabStyle } from './tab-context.js';
	import { subscribable } from '$src/lib/index.js';

	export let style: TabStyle = 'traditional';

	// Keep track of tabs
	const tabs = writable<TabDefinition[]>([]);
	const register = (id: string, name: string, isActive: boolean) => {
		tabs.update((value) => [...value, { id, name }]);
		if (isActive) active.set(id);
	};

	// Active tab
	const active = writable<string | null>(null);
	const selectTab = (id: string) => {
		active.set(id);
	};

	// Tab Context
	const ctx: TabContext = {
		active: subscribable(active),
		style,
		register
	};
	setContext(tabContext, ctx);
</script>

<section class="tab-group {style}">
	<div class="tab-head">
		<nav>
			{#each $tabs as tab}
				<li class={$active == tab.id ? 'active' : 'inactive'}>
					<button on:click={() => selectTab(tab.id)}>
						{tab.name}
					</button>
				</li>
			{/each}
		</nav>
	</div>
	<div class="tab-content">
		<slot />
	</div>
</section>

<style lang="scss">
	.tab-head {
		height: 2rem;
		position: relative;

		nav {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			box-sizing: border-box;
			height: 2rem;
			overflow: hidden;
			width: 100%;
		}

		li {
			list-style: none;
			margin: 0;
			padding: 0;
		}

		li.active button {
			font-weight: 700;
			cursor: default;
		}

		button {
			appearance: none;
			border: none 0;
			background: transparent;
			line-height: 1.8rem;
			height: 2rem;
			padding-left: 1rem;
			padding-right: 1rem;
			cursor: pointer;
			position: relative;
			z-index: 2;

			&:focus {
				outline: none;
			}
		}
	}

	.tab-content {
		padding-top: 1rem;
		padding-bottom: 1rem;
	}

	.traditional {
		button {
			border-radius: 0.5rem 0.5rem 0 0;
		}

		.inactive button {
			background: var(--tab-traditional-inactive-bg, transparent);
			color: var(--tab-traditional-inactive-fg, rgb(120, 120, 120));
		}

		.inactive button:hover {
			background: var(--tab-traditional-hover-bg, transparent);
			color: var(--tab-traditional-hover-fg, rgb(180, 180, 180));
		}

		.active button {
			background: var(--tab-traditional-active-bg, rgb(220, 220, 230));
			color: var(--tab-traditional-active-fg, rgb(50, 50, 50));
		}

		.tab-head {
			border-bottom: solid 0.2rem var(--tab-traditional-border, rgb(220, 220, 230));
		}
	}

	.underline {
		button {
			border-bottom: solid 0.2rem var(--tab-underline-inactive-fg, rgb(100, 100, 100));
		}

		.tab-head {
			border-bottom: solid 0.2rem var(--tab-underline-inactive-fg, rgb(100, 100, 100));
		}

		.inactive button {
			background: var(--tab-underline-inactive-bg, transparent);
			color: var(--tab-underline-inactive-fg, rgb(100, 100, 100));
		}

		.inactive button:hover {
			background: var(--tab-underline-hover-bg, transparent);
			color: var(--tab-underline-hover-fg, rgb(150, 150, 150));
		}

		.active button {
			color: var(--tab-underline-active-fg, rgb(255, 134, 78));
			border-color: var(--tab-underline-active-fg, rgb(255, 134, 78));
			background: var(--tab-underline-active-bg, rgb(80, 80, 80));
		}
	}

	.outline {
		button {
			border-radius: 0.5rem 0.5rem 0 0;
		}

		.tab-head {
			border-bottom: solid 0.1rem var(--tab-outline-border, rgb(220, 220, 220));
		}

		.inactive button {
			color: var(--tab-outline-inactive-fg, rgb(120, 120, 120));
		}

		.active button {
			border-style: solid;
			border-width: 0.1rem 0.1rem 0.1rem 0.1rem;
			border-color: var(--tab-outline-border, rgb(220, 220, 220));
			color: var(--base-fg, rgb(220, 220, 220));
			border-bottom-color: var(--base-bg, rgb(50, 50, 50));
			line-height: 1.7rem;
		}
	}

	.overline {
		.tab-head {
			background: var(--tab-overline-bg, rgb(100, 100, 100));
		}

		button {
			border-top: solid 0.2rem;
		}

		.active button {
			color: var(--tab-overline-active-fg, rgb(255, 134, 78));
			border-color: var(--tab-overline-active-fg, rgb(255, 134, 78));
			background: var(--tab-overline-active-bg, rgb(50, 50, 50));
		}

		.inactive button {
			border-style: none;
			color: var(--tab-overline-fg, rgb(180, 180, 180));
		}
	}
</style>
