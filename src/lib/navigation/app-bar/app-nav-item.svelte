<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let href: string;
	export let title: string;

	const open: Writable<boolean> = getContext('app-nav-state');
</script>

<a {href} class={$open ? 'open' : 'closed'}>
	{#if $$slots.default}
		<div class="icon">
			<slot />
		</div>
	{/if}
	<div class="title">{title}</div>
</a>

<style lang="scss">
	a {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		align-items: center;
		height: 100%;
		color: var(--nav-link-color, black);
		text-decoration: none;

		&:hover {
			color: var(--nav-link-hover-color, black);
			text-decoration: underline;
		}

		.icon {
			width: 100%;
			height: 1.5rem;
		}
	}

	@media (max-width: 640px) {
		a.open {
			flex-direction: row;
			gap: 1rem;
			width: 100%;
			padding: 1rem;

			&:hover {
				text-decoration: none;
				background-color: #bbb;
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
