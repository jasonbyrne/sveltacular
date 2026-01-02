<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		text = 'No data to display',
		size = 'md' as 'sm' | 'md' | 'lg' | 'xl',
		orientation = 'vertical' as 'horizontal' | 'vertical',
		reverse = false,
		align = 'center' as 'center' | 'start' | 'end',
		children = undefined
	}: {
		text?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		orientation?: 'horizontal' | 'vertical';
		reverse?: boolean;
		align?: 'center' | 'start' | 'end';
		children?: Snippet;
	} = $props();
</script>

<div class="empty {size} {orientation} {reverse ? 'reverse' : ''} {align}">
	{#if children}
		<div class="icon">
			{@render children?.()}
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
		color: var(--gray-500);
		font-weight: 500;
		padding: var(--spacing-2xl);
	}

	.start {
		justify-content: flex-start;
	}

	.end {
		justify-content: flex-end;
	}

	.horizontal {
		flex-direction: row;
		gap: var(--spacing-lg);

		&.reverse {
			flex-direction: row-reverse;
		}
	}

	.vertical.reverse {
		flex-direction: column-reverse;
	}

	.icon {
		margin-bottom: var(--spacing-base);
		color: var(--gray-400);
		opacity: 0.8;
	}

	.text {
		color: var(--gray-600);
		font-size: var(--font-md);
		line-height: 1.6;
	}

	.sm {
		padding: var(--spacing-lg);

		.text {
			font-size: var(--font-base);
		}

		.icon {
			height: 2rem;
			width: 2rem;
		}
	}

	.md {
		.text {
			font-size: var(--font-md);
		}

		.icon {
			height: 3rem;
			width: 3rem;
		}
	}

	.lg {
		padding: var(--spacing-2xl) var(--spacing-xl);

		.text {
			font-size: var(--font-lg);
		}

		.icon {
			height: 4rem;
			width: 4rem;
		}
	}

	.xl {
		padding: 4rem var(--spacing-2xl);

		.text {
			font-size: var(--font-xl);
		}

		.icon {
			height: 5rem;
			width: 5rem;
		}
	}
</style>
