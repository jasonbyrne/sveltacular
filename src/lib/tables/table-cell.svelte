<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		colspan = 1,
		type = undefined,
		width = undefined,
		align = undefined,
		children
	}: {
		colspan?: number;
		type?: string;
		width?: number | string;
		align?: 'left' | 'center' | 'right';
		children?: Snippet;
	} = $props();

	let styleProperties = $derived([`width: ${width ? width : 'auto'}`]);

	// Determine alignment based on type or explicit align prop
	let textAlign = $derived(
		align ||
			(type === 'currency' || type === 'number'
				? 'right'
				: type === 'check' || type === 'boolean'
					? 'center'
					: type === 'actions'
						? 'right'
						: 'left')
	);
</script>

<td {colspan} class="{type} {textAlign}" style={styleProperties.join('; ')}>
	{#if children}
		{@render children?.()}
	{/if}
</td>

<style lang="scss">
	td {
		padding: 0.5rem;
		font-size: 0.9rem;
		line-height: 1.5rem;
		vertical-align: middle;

		&.left {
			text-align: left;
		}

		&.center {
			text-align: center;
		}

		&.right {
			text-align: right;
		}

		&.boolean,
		&.check {
			font-size: 1rem;
		}

		&.actions {
			white-space: nowrap;
		}
	}
</style>
