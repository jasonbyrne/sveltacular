<script lang="ts">
	export let gap = 1;
	export let layout: 'stretch' | 'center' | 'end' | 'start' = 'stretch';
	export let size: 'auto' | 'full' = 'full';
</script>

<div style={`gap: ${gap}rem`} class="{layout} {size}">
	<slot />
</div>

<style lang="scss">
	div {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;

		*.auto {
			width: auto;
		}

		&.stretch {
			justify-content: space-between;
			align-items: stretch;

			div {
				flex: 1;
			}
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
