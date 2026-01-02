<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		marginBottom = 0,
		marginTop = 0,
		gap = '1rem',
		justifyContent = 'start' as
			| 'start'
			| 'center'
			| 'end'
			| 'between'
			| 'around'
			| 'evenly'
			| 'stretch'
			| 'baseline',
		alignItems = 'stretch' as 'start' | 'center' | 'end' | 'stretch' | 'auto',
		alignContent = 'stretch' as 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch',
		children
	}: {
		marginBottom?: string | number;
		marginTop?: string | number;
		gap?: string | number;
		justifyContent?:
			| 'start'
			| 'center'
			| 'end'
			| 'between'
			| 'around'
			| 'evenly'
			| 'stretch'
			| 'baseline';
		alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'auto';
		alignContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch';
		children: Snippet;
	} = $props();

	let _marginTop = $derived(typeof marginTop === 'number' ? `${marginTop}px` : marginTop);
	let _marginBottom = $derived(
		typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom
	);
	let _justifyContent = $derived(
		['start', 'end'].includes(justifyContent)
			? `flex-${justifyContent}`
			: ['between', 'around', 'evenly'].includes(justifyContent)
				? `space-${justifyContent}`
				: justifyContent
	);
	let _alignContent = $derived(
		['start', 'end'].includes(alignContent)
			? `flex-${alignContent}`
			: ['between', 'around'].includes(alignContent)
				? `space-${alignContent}`
				: alignContent
	);
	let _alignItems = $derived(
		['start', 'end'].includes(alignItems) ? `flex-${alignItems}` : alignItems
	);
	let _gap = $derived(typeof gap === 'number' ? `${gap}px` : gap);
</script>

<div
	style={`
	margin-top: ${_marginTop}; margin-bottom: ${_marginBottom}; 
	gap: ${_gap}; justify-content: ${_justifyContent}; align-items: ${_alignItems}; align-content: ${_alignContent}
`}
>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
