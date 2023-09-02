<script lang="ts">
	export let text = 'No data to display';
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let orientation: 'horizontal' | 'vertical' = 'vertical';
	export let reverse = false;
	export let align: 'center' | 'start' | 'end' = 'center';
</script>

<div class="empty {size} {orientation} {reverse ? 'reverse' : ''} {align}">
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
		font-weight: 500;
	}

	.start {
		justify-content: flex-start;
	}

	.end {
		justify-content: flex-end;
	}

	.horizontal {
		flex-direction: row;
		gap: 1rem;

		&.reverse {
			flex-direction: row-reverse;
		}
	}

	.vertical.reverse {
		flex-direction: column-reverse;
	}

	.sm {
		font-size: 1rem;
		line-height: 1.5rem;

		.icon {
			height: 1.5rem;
			width: 1.5rem;
		}
	}

	.md {
		font-size: 1.25rem;
		line-height: 1.75rem;

		.icon {
			height: 2rem;
			width: 2rem;
		}
	}

	.lg {
		font-size: 1.5rem;
		line-height: 2rem;

		.icon {
			height: 3rem;
			width: 3rem;
		}
	}

	.xl {
		font-size: 2rem;
		line-height: 2.5rem;

		.icon {
			height: 4rem;
			width: 4rem;
		}
	}
</style>
