<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';

	const maxWidthMap = {
		sm: '10rem',
		md: '20rem',
		lg: '30rem',
		xl: 'auto',
		full: '100%'
	};

	let {
		size = 'full',
		children
	}: {
		size?: FormFieldSizeOptions;
		children: Snippet;
	} = $props();

	let displayType = $derived(['xl', 'full'].includes(size) ? 'block' : 'inline-block');
	let maxWidth = $derived(maxWidthMap[size]);
</script>

<div style={`display: ${displayType}; width: 100%; min-width: 10rem; max-width: ${maxWidth}`}>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		margin-bottom: 1rem;
		margin-right: 1rem;
	}
</style>
