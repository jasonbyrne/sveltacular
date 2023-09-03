<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let currentPage = 1;
	export let totalPages = 1;
	export let align: 'center' | 'start' | 'end' = 'center';

	const dispatch = createEventDispatcher<{ page: number }>();

	const changePage = (page: number) => {
		if (page < 1 || page > totalPages) return;
		currentPage = page;
		dispatch('page', page);
	};

	$: previousPages =
		currentPage > 1
			? (() => {
					const pages = [];
					for (let i = currentPage - 1; i > 0 && i >= currentPage - 3; i--) {
						pages.push(i);
					}
					return pages.reverse();
			  })()
			: [];
	$: nextPages =
		currentPage < totalPages
			? (() => {
					const pages = [];
					for (let i = currentPage + 1; i <= totalPages && i <= currentPage + 3; i++) {
						pages.push(i);
					}
					return pages;
			  })()
			: [];
	$: showFirst = currentPage > 4;
	$: showLast = currentPage < totalPages - 3;
</script>

<nav class={align}>
	{#if currentPage > 1}
		<button on:click={() => changePage(currentPage - 1)} class="previous">Previous</button>
	{/if}
	{#if showFirst}
		<button on:click={() => changePage(1)} class="first">1</button>
		<div class="ellipsis">...</div>
	{/if}
	{#each previousPages as page}
		<button on:click={() => changePage(page)}>{page}</button>
	{/each}
	<div class="current">{currentPage}</div>
	{#each nextPages as page}
		<button on:click={() => changePage(page)}>{page}</button>
	{/each}
	{#if showLast}
		<div class="ellipsis">...</div>
		<button on:click={() => changePage(totalPages)} class="last">{totalPages}</button>
	{/if}
	{#if currentPage < totalPages}
		<button on:click={() => changePage(currentPage + 1)} class="next">Next</button>
	{/if}
</nav>

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0rem;

		button {
			appearance: none;
			padding-left: 1rem;
			padding-right: 1rem;
			font-size: 1rem;
			line-height: 1.4rem;
			height: 1.5rem;
			border: none;
			cursor: pointer;
			background-color: var(--form-input-background, white);
			color: var(--form-input-text, black);

			&:hover {
				background-color: var(--form-input-border, black);
				color: var(--form-input-background, white);
			}

			&.previous {
				border-radius: 0.5rem 0 0 0.5rem;
				border-right: solid 1px var(--form-input-border, black);
			}

			&.next {
				border-radius: 0 0.5rem 0.5rem 0;
				border-left: solid 1px var(--form-input-border, black);
			}
		}

		.ellipsis {
			height: 1.5rem;
			font-size: 1rem;
			line-height: 1rem;
			padding-left: 0.1rem;
			padding-right: 0.1rem;
			background-color: var(--form-input-background, white);
			color: var(--form-input-text, black);
		}

		.current {
			padding: 0.5rem 1rem;
			border: 1px solid var(--form-input-border, black);
			border-radius: 0.5rem;
			background-color: var(--form-input-background, white);
			color: var(--form-input-text, black);
		}

		&.start {
			justify-content: flex-start;
		}

		&.end {
			justify-content: flex-end;
		}
	}
</style>
