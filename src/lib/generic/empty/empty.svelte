<script lang="ts">
	/**
	 * Empty state component for displaying messages when no data is available.
	 * Supports icons, messages, descriptions, and custom content.
	 * @component
	 */
	import type { Snippet } from 'svelte';
	import type { IconType } from '$src/lib/icons/types.js';
	import Icon from '$src/lib/icons/icon.svelte';

	let {
		/** Primary title/heading */
		title = undefined,
		/** Main message text (required if no title) */
		message = 'No data to display',
		/** Optional secondary description */
		description = undefined,
		/** Built-in icon type */
		icon = undefined,
		/** Icon size */
		iconSize = 'xl',
		/** Component size affects padding and text sizing */
		size = 'md',
		/** Custom content (buttons, links, etc.) */
		children = undefined
	}: {
		title?: string;
		message?: string;
		description?: string;
		icon?: IconType;
		iconSize?: 'sm' | 'md' | 'lg' | 'xl';
		size?: 'sm' | 'md' | 'lg' | 'xl';
		children?: Snippet;
	} = $props();
</script>

<div class="empty {size}">
	{#if icon}
		<div class="icon-wrapper">
			<Icon type={icon} size={iconSize} variant="secondary" />
		</div>
	{/if}

	<div class="content">
		{#if title}
			<h3 class="title">{title}</h3>
		{/if}

		{#if message}
			<p class="message">{message}</p>
		{/if}

		{#if description}
			<p class="description">{description}</p>
		{/if}
	</div>

	{#if children}
		<div class="actions">
			{@render children()}
		</div>
	{/if}
</div>

<style lang="scss">
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: var(--spacing-2xl);
		gap: var(--spacing-lg);
	}

	.icon-wrapper {
		color: var(--gray-400);
		opacity: 0.8;
		display: flex;
		align-items: center;
		justify-content: center;

		:global(svg) {
			width: 100%;
			height: 100%;
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		max-width: 32rem;
	}

	.title {
		color: var(--gray-700);
		font-size: var(--font-lg);
		font-weight: 600;
		line-height: 1.4;
		margin: 0;
	}

	.message {
		color: var(--gray-600);
		font-size: var(--font-md);
		font-weight: 500;
		line-height: 1.6;
		margin: 0;
	}

	.description {
		color: var(--gray-500);
		font-size: var(--font-base);
		line-height: 1.5;
		margin: 0;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		justify-content: center;
		align-items: center;
	}

	/* Size variants */
	.sm {
		padding: var(--spacing-lg);
		gap: var(--spacing-base);

		.icon-wrapper {
			font-size: 2rem;

			:global(.icon) {
				width: 2rem;
				height: 2rem;
			}
		}

		.title {
			font-size: var(--font-md);
		}

		.message {
			font-size: var(--font-base);
		}

		.description {
			font-size: var(--font-sm);
		}
	}

	.md {
		.icon-wrapper {
			font-size: 3rem;

			:global(.icon) {
				width: 3rem;
				height: 3rem;
			}
		}
	}

	.lg {
		padding: var(--spacing-2xl) var(--spacing-xl);
		gap: var(--spacing-xl);

		.icon-wrapper {
			font-size: 4rem;

			:global(.icon) {
				width: 4rem;
				height: 4rem;
			}
		}

		.title {
			font-size: var(--font-xl);
		}

		.message {
			font-size: var(--font-lg);
		}

		.description {
			font-size: var(--font-md);
		}
	}

	.xl {
		padding: 4rem var(--spacing-2xl);
		gap: var(--spacing-2xl);

		.icon-wrapper {
			font-size: 5rem;

			:global(.icon) {
				width: 5rem;
				height: 5rem;
			}
		}

		.title {
			font-size: var(--font-2xl);
		}

		.message {
			font-size: var(--font-xl);
		}

		.description {
			font-size: var(--font-lg);
		}

		.actions {
			gap: var(--spacing-base);
		}
	}
</style>
