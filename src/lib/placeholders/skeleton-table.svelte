<script lang="ts">
	import { randomInt } from '../helpers/random.js';

	let {
		columns = 4,
		rows = 5,
		animation = 'pulse' as 'pulse' | 'none'
	}: {
		columns?: number;
		rows?: number;
		animation?: 'pulse' | 'none';
	} = $props();

	let columnArray = $derived(Array.from({ length: columns }, (_, i) => i));
	let rowArray = $derived(Array.from({ length: rows }, (_, i) => i));
</script>

<table class="skeleton-table">
	<thead>
		<tr>
			{#each columnArray as _}
				<th>
					<div class="skeleton-cell {animation}" style="width: {randomInt(60, 90)}%"></div>
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each rowArray as _}
			<tr>
				{#each columnArray as _}
					<td>
						<div class="skeleton-cell {animation}" style="width: {randomInt(70, 100)}%"></div>
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	table.skeleton-table {
		width: 100%;
		border-collapse: collapse;

		th,
		td {
			padding: 0.75rem;
			border-bottom: 1px solid var(--table-row-border, #ddd);
		}

		thead {
			th {
				border-bottom: 2px solid var(--table-header-border, #333);
			}
		}

		tbody {
			tr:nth-child(even) {
				background-color: var(--table-row-alt-bg, #f5f5f5);
			}
		}
	}

	.skeleton-cell {
		height: 1rem;
		background-color: var(--base-color-fg, #ccc);
		opacity: 0.5;
		border-radius: 1rem;

		&.pulse {
			animation: pulse 2s infinite;
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.2;
		}
		50% {
			opacity: 0.8;
		}
	}
</style>

