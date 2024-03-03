<script lang="ts">
	export let marginBottom: string | number = 0;
	export let marginTop: string | number = 0;
	export let gap: string | number = '1rem';

	export let justifyContent: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'stretch' | 'baseline' = 'start';
	export let alignItems: 'start' | 'center' | 'end' | 'stretch' | 'auto' = 'stretch';
	export let alignContent: 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch' = 'stretch';

	$: _marginTop = typeof marginTop === 'number' ? `${marginTop}px` : marginTop;
	$: _marginBottom = typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom;
	$: _justifyContent = ['start', 'end'].includes(justifyContent) ? `flex-${justifyContent}` : ['between', 'around', 'evenly'].includes(justifyContent) ? `space-${justifyContent}` : justifyContent;
	$: _alignContent = ['start', 'end'].includes(alignContent) ? `flex-${alignContent}` : ['between', 'around'].includes(alignContent) ? `space-${alignContent}` : alignContent;
	$: _alignItems = ['start', 'end'].includes(alignItems) ? `flex-${alignItems}` : alignItems;
	$: _gap = typeof gap === 'number' ? `${gap}px` : gap;
</script>

<div style={`
	margin-top: ${_marginTop}; margin-bottom: ${_marginBottom}; 
	gap: ${_gap}; jusify-content: ${_justifyContent}; align-items: ${_alignItems}; align-content: ${_alignContent}
`}>
	<slot />
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
