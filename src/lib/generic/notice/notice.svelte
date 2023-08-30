<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type NoticeStyle = 'outline' | 'attention' | 'success' | 'error' | 'info';
	type NoticeSize = 'full' | 'sm' | 'md' | 'lg' | 'xl';

	const dispatch = createEventDispatcher<{ dismiss: void; hidden: void }>();

	export let title: string | undefined = undefined;
	export let style: NoticeStyle = 'info';
	export let size: NoticeSize = 'full';
	export let dismissable = false;

	let visible = true;
	let fading = false;

	const goodbye = () => {
		dispatch('dismiss');
		fading = true;
		setTimeout(() => {
			visible = false;
			dispatch('hidden');
		}, 500);
	};

	const onClick = (e: Event) => {
		e.preventDefault();
		e.stopPropagation();
		goodbye();
	};
</script>

<div class="notice {style} {size} {visible ? 'visible' : 'hidden'} {fading ? 'fading' : ''}">
	{#if $$slots.icon}
		<div class="icon">
			<slot name="icon" />
		</div>
	{/if}
	<div class="content">
		{#if title}
			<strong>{title}</strong>
		{/if}
		<div class="message">
			<slot />
		</div>
	</div>

	{#if dismissable}
		<div class="dismiss">
			<button type="button" on:click={onClick}>X</button>
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
		border: 2px solid var(--base-fg, black);
		background: var(--base-bg, white);
		color: var(--base-fg, black);
		position: relative;
		opacity: 1;
		transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;

		&.hidden {
			display: none;
		}

		&.fading {
			transform: translateY(-100%);
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
			width: 60rem;
		}

		&.lg {
			width: 40rem;

			.icon {
				width: 2.5rem;
				min-width: 2.5rem;
			}
			.content {
				font-size: 0.95rem;
			}
		}

		&.md {
			width: 25rem;
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
			width: 15rem;
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
