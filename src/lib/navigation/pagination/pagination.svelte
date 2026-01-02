<script lang="ts">
	let {
		currentPage = $bindable(1),
		totalPages = 1,
		align = 'center' as 'center' | 'start' | 'end',
		style = 'default' as 'default' | 'flat',
		size = 'md' as 'sm' | 'md' | 'lg' | 'xl',
		onPage = undefined
	}: {
		currentPage?: number;
		totalPages?: number;
		align?: 'center' | 'start' | 'end';
		style?: 'default' | 'flat';
		size?: 'sm' | 'md' | 'lg' | 'xl';
		onPage?: ((page: number) => void) | undefined;
	} = $props();

	const changePage = (page: number) => {
		if (page < 1 || page > totalPages) return;
		currentPage = page;
		onPage?.(page);
	};

	let previousPages = $derived(
		currentPage > 1
			? (() => {
					const pages = [];
					for (let i = currentPage - 1; i > 0 && i >= currentPage - 3; i--) {
						pages.push(i);
					}
					return pages.reverse();
				})()
			: []
	);
	let nextPages = $derived(
		currentPage < totalPages
			? (() => {
					const pages = [];
					for (let i = currentPage + 1; i <= totalPages && i <= currentPage + 3; i++) {
						pages.push(i);
					}
					return pages;
				})()
			: []
	);
	let showFirst = $derived(currentPage > 4);
	let showLast = $derived(currentPage < totalPages - 3);
</script>

<nav class="{align} {style} {size}">
	{#if currentPage > 1}
		<button onclick={() => changePage(currentPage - 1)} class="previous page">Previous</button>
	{/if}
	{#if showFirst}
		<button onclick={() => changePage(1)} class="first page">1</button>
		<div class="ellipsis page">···</div>
	{/if}
	{#each previousPages as page}
		<button onclick={() => changePage(page)} class="pre page">{page}</button>
	{/each}
	<div class="current page">{currentPage}</div>
	{#each nextPages as page}
		<button onclick={() => changePage(page)} class="pro numbered page">{page}</button>
	{/each}
	{#if showLast}
		<div class="ellipsis page">···</div>
		<button onclick={() => changePage(totalPages)} class="last page">{totalPages}</button>
	{/if}
	{#if currentPage < totalPages}
		<button onclick={() => changePage(currentPage + 1)} class="next page">Next</button>
	{/if}
</nav>

<style lang="scss">
	nav {
		display: flex;
		flex-direction: row;
		gap: 0.2rem;
		align-items: center;
		justify-content: center;

		.page {
			border: none;
			background: none;
			margin: 0;
			color: var(--base-fg, #000);
		}

		button {
			cursor: pointer;
		}

		.current {
			font-weight: 700;
		}

		&.start {
			justify-content: flex-start;
		}

		&.end {
			justify-content: flex-end;
		}

		&.sm {
			.page {
				font-size: 0.75rem;
				padding: 0.5rem 0.65rem 0.5rem 0.65rem;
			}

			.current {
				font-size: 0.95rem;
			}
		}

		&.md {
			.page {
				font-size: 0.85rem;
				padding: 0.5rem 0.65rem 0.5rem 0.65rem;
			}

			.current {
				font-size: 1.05rem;
			}
		}

		&.lg {
			.page {
				font-size: 0.95rem;
				padding: 0.5rem 0.65rem 0.5rem 0.65rem;
			}

			.current {
				font-size: 1.15rem;
			}
		}

		&.xl {
			.page {
				font-size: 1.05rem;
				padding: 0.5rem 0.65rem 0.5rem 0.65rem;
			}

			.current {
				font-size: 1.25rem;
			}
		}
	}

	nav.flat {
		button:hover {
			color: var(--form-input-bg, #fff);
			background: var(--form-input-fg, #000);
			border-radius: 0.5rem;
		}
	}

	@media (max-width: 600px) {
		nav {
			gap: 0rem;

			.pre,
			.pro {
				display: none;
			}
		}
	}
</style>
