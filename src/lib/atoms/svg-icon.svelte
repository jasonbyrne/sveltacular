<script lang="ts">
	export let fill: 'none' | 'currentColor' = 'none';
	export let width: number | string = 16;
	export let height: number | string = 16;
	export let x: number | string = 0;
	export let y: number | string = 0;
	export let aspectRatioBehavior: 'none' | 'meet' | 'slice' = 'meet';
	export let aspectRatioAlign:
		| 'none'
		| 'xMinYMin'
		| 'xMidYMin'
		| 'xMaxYMin'
		| 'xMinYMid'
		| 'xMidYMid'
		| 'xMaxYMid'
		| 'xMinYMax'
		| 'xMidYMax'
		| 'xMaxYMax' = 'xMidYMid';

	$: viewBox = `${x} ${y} ${width} ${height}`;
	$: preserveAspectRatio = `${aspectRatioAlign} ${aspectRatioBehavior}`;
</script>

<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" {fill} {viewBox} {preserveAspectRatio}>
	<slot />
</svg>
