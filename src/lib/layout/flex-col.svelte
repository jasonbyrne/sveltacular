<script lang="ts">
	export let marginBottom: string | number = '1rem';
	export let marginTop: string | number = '1rem';
	export let gap: string | number = '1rem';
</script>

<div style={`margin: ${marginTop} ${marginBottom}; gap: ${gap}`}>
	<slot />
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
