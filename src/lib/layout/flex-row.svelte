<script lang="ts">
	export let marginBottom: string | number = '1rem';
	export let marginTop: string | number = '1rem';
	export let gap: string | number = '1rem';
	export let layout: 'stretch' | 'center' | 'end' | 'start' = 'stretch';
	export let size: 'auto' | 'full' = 'full';
	export let wrap = false;
</script>

<div
	style={`margin: ${marginTop} ${marginBottom}; gap: ${gap}`}
	class="{layout} {size} {wrap ? 'wrap' : 'nowrap'}"
>
	<slot />
</div>

<style lang="scss">
	div {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		flex-wrap: nowrap;
		column-gap: 1rem;

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
