<script lang="ts">
	export let gap = 1;
	export let layout: 'stretch' | 'center' | 'end' | 'start' = 'stretch';
	export let size: 'auto' | 'full' = 'full';
	export let wrap = false;
</script>

<div style={`gap: ${gap}rem`} class="{layout} {size} {wrap ? 'wrap' : 'nowrap'}">
	<slot />
</div>

<style lang="scss">
	div {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		flex-wrap: nowrap;

		*.auto {
			width: auto;
		}

		&.wrap {
			flex-wrap: wrap;
		}

		&.stretch {
			justify-content: space-between;
			align-items: stretch;
		}

		&.end {
			justify-content: flex-end;
			align-items: flex-end;
		}

		&.start {
			justify-content: flex-start;
			align-items: flex-start;
		}
	}
</style>
