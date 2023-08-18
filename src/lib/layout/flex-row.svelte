<script lang="ts">
	export let marginY: number = 1;
	export let marginX: number = 0;
	export let gap = 1;
</script>

<div style={`margin: ${marginY}rem ${marginX}rem; gap: ${gap}rem`}>
	<slot />
</div>

<style lang="scss">
	div {
		display: flex;
		width: 100%;
	}
</style>
