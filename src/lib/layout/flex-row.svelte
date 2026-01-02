<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		marginBottom = 0,
		marginTop = 0,
		gap = '1rem',
		size = 'full' as 'auto' | 'full',
		wrap = false,
		justifyContent = 'space-between' as 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'baseline',
		alignItems = 'stretch' as 'start' | 'center' | 'end' | 'stretch' | 'auto',
		alignContent = 'stretch' as 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'stretch',
		children
	}: {
		marginBottom?: string | number;
		marginTop?: string | number;
		gap?: string | number;
		size?: 'auto' | 'full';
		wrap?: boolean;
		justifyContent?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'baseline';
		alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'auto';
		alignContent?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'stretch';
		children: Snippet;
	} = $props();

	let _marginTop = $derived(typeof marginTop === 'number' ? `${marginTop}px` : marginTop);
	let _marginBottom = $derived(typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom);
	let _justifyContent = $derived(['start', 'end'].includes(justifyContent) ? `flex-${justifyContent}` : ['between', 'around', 'evenly'].includes(justifyContent) ? `space-${justifyContent}` : justifyContent);
	let _alignContent = $derived(['start', 'end'].includes(alignContent) ? `flex-${alignContent}` : ['between', 'around'].includes(alignContent) ? `space-${alignContent}` : alignContent);
	let _alignItems = $derived(['start', 'end'].includes(alignItems) ? `flex-${alignItems}` : alignItems);
	let _gap = $derived(typeof gap === 'number' ? `${gap}px` : gap);
</script>

<div
	style={`
		margin-top: ${_marginTop}; margin-bottom: ${_marginBottom}; gap: ${_gap}; 
		justify-content: ${_justifyContent}; align-items: ${_alignItems}; align-content: ${_alignContent};
	`}
	class="size-{size} {wrap ? 'wrap' : 'nowrap'}"
>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		display: flex;
		width: 100%;
		flex-wrap: nowrap;
		column-gap: 1rem;

		&.size-auto {
			width: auto;
		}

		&.wrap {
			flex-wrap: wrap;
		}
	}
</style>
