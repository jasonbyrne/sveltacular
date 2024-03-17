<script lang="ts">
	import { AngleUpIcon } from '$src/lib/index.js';
	import { hasContext } from 'svelte';

	export let open = false;
	export let text: string | undefined = undefined;
	export let style: 'standard' | 'ghost' = 'standard';
	export let icon: 'arrow' | 'none' = 'arrow';

	const onClick = () => {
		open = !open;
	};

	$: hasText = text && text.length > 0;
</script>

<div class="dropdown-button {style} icon-{icon}" class:open>
	<button on:click={onClick} class:hasText>
		{#if hasText}
			<div class="text">
				{text}
			</div>
		{/if}
		<div class="icon">
			<span>
				<AngleUpIcon />
			</span>
		</div>
	</button>
	{#if open}
		<div class="menu">
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	.dropdown-button {
		position: relative;
		display: inline-block;

		button {
			width: 100%;
			min-width: 7rem;
			position: relative;
			text-align: left;
			cursor: pointer;
			border-radius: 0.5rem 0.5rem 0 0;
			border-width: 1px;
			border-style: solid;
			user-select: none;
			white-space: nowrap;
			display: inline-block;
			font-size: 0.875rem;
			font-weight: 500;
			line-height: 1.25rem;
			padding: 0.5rem 1rem;
			font-family: var(--base-font-family, sans-serif);
			background-color: var(--button-secondary-bg, #555);
			border-color: var(--button-secondary-border, #aaa);
			color: var(--button-secondary-fg, #fff);

			&:hover {
				background-color: var(--button-secondary-hover-bg, #333);
				color: var(--button-secondary-hover-fg, #fff);
			}

			.icon {
				display: block;
				text-align: center;
				line-height: 1.5rem;

				span {
					display: inline-block;
					width: 1rem;
					height: 1rem;
				}
			}

			&.hasText {
				.text {
					padding-right: 2rem;
					min-height: 1.5rem;
					line-height: 1.5rem;
				}

				.icon {
					position: absolute;
					top: 0;
					right: 0;
					height: 100%;
					width: 2rem;
					padding: 0.5rem;
				}
			}
		}

		.menu {
			position: absolute;
			top: 100%;
			left: 0;
			min-width: 100%;
			background-color: #fff;
			color: #000;
			border-style: solid;
			border-width: 1px;
			border-color: var(--button-secondary-border, #aaa);
			z-index: 999;
			text-align: center;
		}

		&.open {
			.icon {
				transition: transform 0.3s linear;
				transform: rotate(180deg);
			}
		}

		&.icon-none {
			button {
				.text {
					padding-right: 0.5rem;
				}
				.icon {
					display: none;
				}
			}
		}

		&.ghost {
			button {
				background-color: inherit;
				border: none;
				color: inherit;

				&:hover {
					background-color: var(--button-ghost-hover-bg, #333);
					color: var(--button-ghost-hover-fg, #fff);
				}
			}
		}
	}
</style>
