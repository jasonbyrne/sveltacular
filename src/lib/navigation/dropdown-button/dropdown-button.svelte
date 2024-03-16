<script lang="ts">
	import { AngleUpIcon } from '$src/lib/index.js';

	export let open = false;
	export let text: string;
	export let style: 'standard' | 'ghost' = 'standard';

	const onClick = () => {
		open = !open;
	};
</script>

<div class="dropdown-button {style}" class:open>
	<button on:click={onClick}>
		<div class="text">
			{text}
		</div>
		<div class="icon">
			<AngleUpIcon />
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
			min-width: 10rem;
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
			text-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.5);
			background-color: var(--button-secondary-bg, #555);
			border-color: var(--button-secondary-border, #aaa);
			color: var(--button-secondary-fg, #fff);

			&:hover {
				background-color: var(--button-secondary-hover-bg, #333);
				color: var(--button-secondary-hover-fg, #fff);
			}

			.text {
				padding-right: 2rem;
			}

			.icon {
				display: block;
				position: absolute;
				top: 0;
				right: 0;
				height: 100%;
				width: 2rem;
				padding: 0.5rem;
			}
		}

		.menu {
			position: absolute;
			top: 100%;
			left: 0;
			min-width: 100%;
			background-color: #fff;
			color: #000;
			border: 1px solid #ccc;
			z-index: 999;
		}

		&.open {
			.icon {
				transition: transform 0.3s linear;
				transform: rotate(180deg);
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
