<script lang="ts">
	import { navigateTo } from '$src/lib/index.js';
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let href: string | undefined = undefined;
	export let title: string;

	const dispatch = createEventDispatcher<{ click: void }>();
	const open: Writable<boolean> = getContext('app-nav-state');
	const click = () => {
		if (href) navigateTo(href);
		dispatch('click');
	};
</script>

<button type="button" class={$open ? 'open' : 'closed'} on:click={click}>
	{#if $$slots.default}
		<div class="icon">
			<slot />
		</div>
	{/if}
	<div class="title">
		{title}
	</div>
</button>

<style lang="scss">
	button {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		align-items: center;
		height: 100%;
		font-family: var(--nav-font-family, sans-serif);
		color: var(--nav-link, black);
		text-decoration: none;
		appearance: none;
		border: none;
		background-color: transparent;
		cursor: pointer;

		&:hover {
			color: var(--nav-link-hover, black);
			text-decoration: underline;
		}

		.icon {
			width: 100%;
			height: 1.5rem;
			fill: var(--nav-link, black);
			stroke: var(--nav-link, black);
		}
	}

	@media (max-width: 640px) {
		button.open {
			flex-direction: row;
			gap: 1rem;
			width: 100%;
			padding: 1rem;
			text-align: left;

			&:hover {
				text-decoration: none;
				background-color: var(--nav-menu-hover-bg, #ddd);
				color: var(--nav-menu-hover-fg, black);
			}

			.title {
				flex-grow: 1;
			}

			.icon {
				width: 1.5rem;
			}
		}
	}
</style>
