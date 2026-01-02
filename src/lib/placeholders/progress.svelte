<script lang="ts">
	let { value = 0 }: { value?: number } = $props(); // Value between 0 and 100
</script>

<div class="progress-bar" style="--progress-value: {value}%">
	<div class="progress">
		<div class="progress-value">{value}%</div>
	</div>
</div>

<style lang="scss">
	.progress-bar {
		height: 2rem;
		background-color: var(--base-color-fg, #ccc);
		border-radius: 1rem;
		margin-bottom: 1rem;

		.progress {
			height: 100%;
			background-color: var(--primary-color, #00a);
			color: white;
			border-radius: 1rem;
			transition: width 0.5s ease-in-out;
			width: var(--progress-value, 0%);
			min-width: 3rem;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}

		.progress-value {
			color: var(--base-color-bg, #fff);
			font-size: 1rem;
			font-family: var(--base-font-family, sans-serif);
			font-weight: 500;
			line-height: 1.5rem;
			padding: 0 0.5rem;
			text-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
		}
	}
</style>
