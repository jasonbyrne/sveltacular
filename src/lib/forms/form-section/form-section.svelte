<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SectionLevel } from '../../types/generic.js';

	let {
		title = undefined,
		level = 4,
		children
	}: {
		title?: string | undefined;
		level?: SectionLevel;
		children: Snippet;
	} = $props();
</script>

<fieldset>
	{#if title}
		<legend aria-level={level}>{title}</legend>
	{/if}
	{@render children?.()}
</fieldset>

<style lang="scss">
	fieldset {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-base);
		border: var(--border-thin) solid var(--form-input-border);
		border-radius: var(--radius-md);
		padding: var(--spacing-base);

		legend {
			font-size: var(--font-lg);
			font-weight: 500;
			line-height: var(--line-height-base);
			color: var(--form-input-fg);
		}
	}
</style>
