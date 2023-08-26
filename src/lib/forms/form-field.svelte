<script lang="ts">
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';

	const maxWidthMap = {
		sm: '10rem',
		md: '20rem',
		lg: '30rem',
		xl: 'auto',
		full: '100%'
	};

	export let size: FormFieldSizeOptions = 'full';

	$: displayType = ['xl', 'full'].includes(size) ? 'block' : 'inline-block';
	$: maxWidth = maxWidthMap[size];
</script>

<div style={`display: ${displayType}; width: 100%; min-width: 10rem; max-width: ${maxWidth}`}>
	<slot />
</div>

<style lang="scss">
	div {
		margin-bottom: 1rem;
		margin-right: 1rem;
		font-family: var(--base-font-family, sans-serif);
	}
</style>
