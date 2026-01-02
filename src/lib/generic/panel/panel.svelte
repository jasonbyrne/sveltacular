<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		border = true,
		children
	}: {
		title?: string;
		border?: boolean;
		children?: Snippet;
	} = $props();
</script>

<fieldset class={border ? 'border' : 'no-border'}>
	{#if title}
		<legend>{title}</legend>
	{/if}
	{@render children?.()}
</fieldset>

<style lang="scss">
	fieldset {
		position: relative;
		margin-bottom: 1rem;
		padding: 1rem;
		border: solid 1px;
		border-radius: 0.5rem;
		border-color: var(--base-fg, #000);
		font-family: var(--base-font-family, sans-serif);

		&.no-border {
			border: none;
		}

		legend {
			font-size: 1rem;
			font-weight: 500;
			text-transform: uppercase;
			letter-spacing: 0.1rem;
			color: var(--base-fg, #000);
			font-family: var(--base-headline-font-family, sans-serif);
		}
	}
</style>
