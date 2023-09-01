<script lang="ts">
	export let text = 'No data to display';
</script>

<div class="empty">
	{#if $$slots.default}
		<div class="icon">
			<slot />
		</div>
	{/if}
	<div class="text">
		{text}
	</div>
</div>

<style lang="scss">
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: var(--color-text-secondary, rgba(150, 150, 150, 0.5));
		font-size: 1.5rem;
		font-weight: 500;
		line-height: 2rem;
		margin: 2rem 0;
	}

	.icon {
		height: 2rem;
		width: 2rem;
		margin-bottom: 1rem;
	}

	.text {
		font-size: 1.5rem;
		font-weight: 500;
		line-height: 2rem;
	}
</style>
