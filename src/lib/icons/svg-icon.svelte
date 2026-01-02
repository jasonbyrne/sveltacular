<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		fill = 'none' as 'none' | 'currentColor',
		width = 16,
		height = 16,
		x = 0,
		y = 0,
		aspectRatioBehavior = 'meet' as 'none' | 'meet' | 'slice',
		aspectRatioAlign = 'xMidYMid' as
			| 'none'
			| 'xMinYMin'
			| 'xMidYMin'
			| 'xMaxYMin'
			| 'xMinYMid'
			| 'xMidYMid'
			| 'xMaxYMid'
			| 'xMinYMax'
			| 'xMidYMax'
			| 'xMaxYMax',
		children
	}: {
		fill?: 'none' | 'currentColor';
		width?: number | string;
		height?: number | string;
		x?: number | string;
		y?: number | string;
		aspectRatioBehavior?: 'none' | 'meet' | 'slice';
		aspectRatioAlign?:
			| 'none'
			| 'xMinYMin'
			| 'xMidYMin'
			| 'xMaxYMin'
			| 'xMinYMid'
			| 'xMidYMid'
			| 'xMaxYMid'
			| 'xMinYMax'
			| 'xMidYMax'
			| 'xMaxYMax';
		children: Snippet;
	} = $props();

	let viewBox = $derived(`${x} ${y} ${width} ${height}`);
	let preserveAspectRatio = $derived(`${aspectRatioAlign} ${aspectRatioBehavior}`);
</script>

<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" {fill} {viewBox} {preserveAspectRatio}>
	{@render children?.()}
</svg>
