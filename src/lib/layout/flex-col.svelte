<script lang="ts">
	export let marginBottom: string | number = 0;
	export let marginTop: string | number = 0;
	export let gap: string | number = '1rem';
</script>

<div style={`margin-top: ${marginTop}; margin-bottom: ${marginBottom}; gap: ${gap}`}>
	<slot />
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
