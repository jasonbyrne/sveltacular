<script lang="ts">
	import type { Snippet } from 'svelte';
	type NoticeStyle = 'outline' | 'attention' | 'success' | 'error' | 'info';
	type NoticeSize = 'sm' | 'md' | 'lg' | 'xl';

	let {
		title = undefined,
		style = 'info' as NoticeStyle,
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
		style?: NoticeStyle;
		size?: NoticeSize;
		dismissable?: boolean;
		dismissMilliseconds?: number;
		onShow?: (() => void) | undefined;
		onDismiss?: (() => void) | undefined;
		onHidden?: (() => void) | undefined;
		icon?: Snippet;
		children: Snippet;
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
		if (dismissMilliseconds > 0) {
			setTimeout(goodbye, dismissMilliseconds);
		}
	});

	hello();
</script>

<div class="notice {style} {size} {visible ? 'visible' : 'hidden'} {going ? 'going' : ''} {coming ? 'coming' : ''}">
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
		gap: 1rem;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		width: 100%;
		max-width: 100%;
		padding: 1rem;
		border-radius: 0.2rem;
		border: 2px solid var(--base-bg, black);
		background: var(--base-fg, white);
		color: var(--base-bg, black);
		position: relative;
		opacity: 1;
		transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;

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
			gap: 0.5rem;
			align-items: flex-start;
			justify-content: flex-start;
		}

		&.info {
			background-color: rgb(225, 225, 225);
			color: rgb(78, 78, 78);
			border-color: rgb(144, 144, 144);
		}

		&.attention {
			background-color: rgb(255, 248, 219);
			color: rgb(117, 82, 0);
			border-color: rgb(181, 129, 5);
		}

		&.success {
			background-color: rgb(229, 248, 230);
			color: rgb(0, 100, 0);
			border-color: rgb(30, 188, 47);
		}

		&.error {
			background-color: rgb(255, 232, 230);
			color: rgb(100, 0, 0);
			border-color: rgb(218, 40, 40);
		}

		&.xl {
			.icon {
				width: 3rem;
				min-width: 3rem;
			}
			.content {
				font-size: 1.15rem;
			}
		}

		&.lg {
			.icon {
				width: 2.5rem;
				min-width: 2.5rem;
			}
			.content {
				font-size: 0.95rem;
			}
		}

		&.md {
			border-width: 1px;
			border-radius: 3px;

			.icon {
				width: 2rem;
				min-width: 2rem;
			}
			.content {
				font-size: 0.85rem;
			}
		}

		&.sm {
			border-width: 1px;
			border-radius: 2px;

			.icon {
				width: 1.5rem;
				min-width: 1.5rem;
			}
			.content {
				font-size: 0.75rem;
			}
		}
	}

	button {
		appearance: none;
		border: none;
		background-color: transparent;
		font-size: 1rem;
		cursor: pointer;
		position: absolute;
		top: 0.4rem;
		right: 0.4rem;
		width: 1rem;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		border-radius: 0.5rem;

		&:hover {
			font-weight: bold;
		}
	}
</style>
