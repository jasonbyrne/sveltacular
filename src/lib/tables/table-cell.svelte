<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		colspan = 1,
		type = undefined,
		width = undefined,
		children
	}: {
		colspan?: number;
		type?: string;
		width?: number | string;
		children: Snippet;
	} = $props();

	let styleProperties = $derived([`width: ${width ? width : 'auto'}`]);
</script>

<td {colspan} class={type} style={styleProperties.join('; ')}>
	{@render children?.()}
</td>

<style lang="scss">
	td {
		padding-left: 0.5rem;
		font-size: 0.9rem;
		line-height: 1.5rem;

		&.currency,
		&.number {
			text-align: right;
		}

		&.check,
		&.boolean {
			text-align: center;
			text-transform: uppercase;
		}

		&.actions {
			text-align: right;
		}

		&:last-child {
			padding-right: 0.5rem;
		}
	}
</style>
