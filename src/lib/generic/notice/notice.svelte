<script lang="ts">
	import type { Snippet } from 'svelte';
	type NoticeVariant = 'outline' | 'attention' | 'success' | 'error' | 'info';
	type NoticeSize = 'sm' | 'md' | 'lg' | 'xl';

	let {
		title = undefined,
		variant = 'info' as NoticeVariant,
		size = 'md' as NoticeSize,
		dismissable = false,
		dismissMilliseconds = 0,
		onShow = undefined,
		onDismiss = undefined,
		onHidden = undefined,
		icon,
		children
	}: {
		title?: string | undefined;
		variant?: NoticeVariant;
		size?: NoticeSize;
		dismissable?: boolean;
		dismissMilliseconds?: number;
		onShow?: (() => void) | undefined;
		onDismiss?: (() => void) | undefined;
		onHidden?: (() => void) | undefined;
		icon?: Snippet;
		children?: Snippet;
	} = $props();

	let visible = $state(true);
	let going = $state(false);
	let coming = $state(false);

	const hello = () => {
		onShow?.();
		coming = true;
		setTimeout(() => {
			coming = false;
		}, 500);
	};

	const goodbye = () => {
		onDismiss?.();
		going = true;
		setTimeout(() => {
			visible = false;
			onHidden?.();
		}, 500);
	};

	const onClick = (e: Event) => {
		e.preventDefault();
		e.stopPropagation();
		goodbye();
	};

	$effect(() => {
		hello();
		return () => {
			// Cleanup if needed
		};
	});

	$effect(() => {
		if (dismissMilliseconds > 0) {
			const timeout = setTimeout(goodbye, dismissMilliseconds);
			return () => clearTimeout(timeout);
		}
	});
</script>

<div
	class="notice {variant} {size} {visible ? 'visible' : 'hidden'} {going ? 'going' : ''} {coming
		? 'coming'
		: ''}"
>
	{#if icon}
		<div class="icon">
			{@render icon?.()}
		</div>
	{/if}
	<div class="content">
		{#if title}
			<strong>{title}</strong>
		{/if}
		<div class="message">
			{@render children?.()}
		</div>
	</div>

	{#if dismissable}
		<div class="dismiss">
			<button type="button" onclick={onClick}>X</button>
		</div>
	{/if}
</div>

<style lang="scss">
	.notice {
		display: flex;
		flex-direction: row;
		gap: var(--spacing-base);
		align-items: center;
		justify-content: flex-start;
		position: relative;
		width: 100%;
		max-width: 100%;
		padding: var(--spacing-base);
		border-radius: var(--radius-md);
		border: var(--border-base) solid var(--gray-300);
		background: var(--base-color-bg);
		color: var(--base-color-fg);
		position: relative;
		opacity: 1;
		transition:
			opacity var(--transition-slow) var(--ease-in-out),
			transform var(--transition-slower) var(--ease-in-out);

		&.hidden {
			display: none;
		}

		&.going {
			transform: translateY(-100%);
			opacity: 0;
		}

		&.coming {
			opacity: 0;
		}

		.icon {
			position: relative;
			width: 3rem;
			min-width: 3rem;
			height: 100%;
		}

		.content {
			display: flex;
			flex-direction: column;
			gap: var(--spacing-sm);
			align-items: flex-start;
			justify-content: flex-start;
		}

		&.info {
			background-color: var(--gray-100);
			color: var(--gray-700);
			border-color: var(--gray-400);
		}

		&.attention {
			background-color: #fffaf0;
			color: #744210;
			border-color: var(--color-warning);
		}

		&.success {
			background-color: #f0fff4;
			color: #22543d;
			border-color: var(--color-success);
		}

		&.error {
			background-color: #fff5f5;
			color: #742a2a;
			border-color: var(--color-error);
		}

		&.xl {
			.icon {
				width: var(--spacing-2xl);
				min-width: var(--spacing-2xl);
			}
			.content {
				font-size: var(--font-lg);
			}
		}

		&.lg {
			.icon {
				width: 2.5rem;
				min-width: 2.5rem;
			}
			.content {
				font-size: var(--font-base);
			}
		}

		&.md {
			border-width: var(--border-thin);
			border-radius: var(--radius-sm);

			.icon {
				width: var(--spacing-xl);
				min-width: var(--spacing-xl);
			}
			.content {
				font-size: var(--font-base);
			}
		}

		&.sm {
			border-width: var(--border-thin);
			border-radius: var(--radius-xs);

			.icon {
				width: var(--spacing-lg);
				min-width: var(--spacing-lg);
			}
			.content {
				font-size: var(--font-sm);
			}
		}
	}

	button {
		appearance: none;
		border: none;
		background-color: transparent;
		font-size: var(--font-md);
		cursor: pointer;
		position: absolute;
		top: var(--spacing-xs);
		right: var(--spacing-xs);
		width: var(--spacing-base);
		height: var(--spacing-base);
		line-height: var(--spacing-base);
		text-align: center;
		border-radius: var(--radius-md);

		&:hover {
			font-weight: bold;
		}
	}
</style>
