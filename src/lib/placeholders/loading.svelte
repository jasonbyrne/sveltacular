<script lang="ts">
	export let type: 'spinner' | 'block' = 'spinner';
</script>

<div class={type}>
	<span>
		<slot />
	</span>
</div>

<style lang="scss">
	div {
		text-align: center;

		span {
			display: block;
			width: 100%;
			padding: 1rem;
		}

		&.spinner {
			border: 4px solid rgba(0, 0, 0, 0.1);
			border-top: 4px solid #3498db;
			border-radius: 50%;
			width: 40px;
			height: 40px;
			animation: spin 1s linear infinite;
		}

		&.block {
			width: 100%;
			height: 100%;
			background-color: #ccc;
			color: #888;
			font-size: 1.5rem;
			font-family: var(--base-font-family, sans-serif);
			animation: pulse 2s infinite;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.5;
			transform: scale(0.95);
		}
		50% {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
