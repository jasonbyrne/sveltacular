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
		background-color: var(--gray-200);
		border-radius: 1rem;
		margin-bottom: 1rem;

		.progress {
			height: 100%;
			background-color: var(--color-info);
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
			color: #ffffff;
			font-size: 1rem;
			font-family: var(--base-font-family, sans-serif);
			font-weight: 600;
			line-height: 1.5rem;
			padding: 0 0.5rem;
			text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
		}
	}
</style>
