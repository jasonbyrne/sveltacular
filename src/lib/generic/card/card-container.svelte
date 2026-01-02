<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import type { CardContainerContext } from './card-container.js';

	let {
		align = 'left' as 'left' | 'center' | 'right' | 'start' | 'end',
		spacing = 'space-around' as
			| 'none'
			| 'tight'
			| 'compact'
			| 'loose'
			| 'space-evenly'
			| 'space-around'
			| 'space-between',
		children
	}: {
		align?: 'left' | 'center' | 'right' | 'start' | 'end';
		spacing?:
			| 'none'
			| 'tight'
			| 'compact'
			| 'loose'
			| 'space-evenly'
			| 'space-around'
			| 'space-between';
		children: Snippet;
	} = $props();

	let cards = $state<string[]>([]);

	const register = (id: string) => {
		cards = [...cards, id];
	};

	setContext<CardContainerContext>('CardContainer', {
		register
	});

	let count = $derived(cards.length);
</script>

<ul data-count={count} class="{spacing} {align}">
	{@render children?.()}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		align-items: stretch;
		justify-content: space-between;
		align-content: stretch;
		row-gap: 1rem;
		column-gap: 1rem;

		&.left,
		&.start {
			justify-content: flex-start;
		}

		&.center {
			justify-content: center;
		}

		&.right {
			justify-content: flex-end;
		}

		&.none {
			gap: 0;
		}

		&.tight {
			gap: 0.5rem;
		}

		&.compact {
			gap: 1rem;
		}

		&.loose {
			gap: 2rem;
		}

		&.space-evenly {
			justify-content: space-evenly;
		}

		&.space-between {
			justify-content: space-between;
		}

		&.space-around {
			justify-content: space-around;
		}
	}
</style>
