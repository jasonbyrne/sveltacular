<script lang="ts">
	import HamburgerIcon from '$src/lib/icons/hamburger-icon.svelte';
	import { getContext, setContext } from 'svelte';
	import { get, writable } from 'svelte/store';

	export let align: 'left' | 'center' | 'right' | 'start' | 'end' = 'right';
	export let spacing:
		| 'none'
		| 'tight'
		| 'medium'
		| 'loose'
		| 'space-evenly'
		| 'space-around'
		| 'space-between' = 'medium';

	// Set initial opened context
	const open = writable(false);
	setContext('app-nav-state', open);

	const toggle = () => open.set(!get(open));
	const context: { position?: 'top' | 'bottom' } = getContext('app-bar');
	const collapse = context.position !== 'bottom' ? 'collapse' : '';
</script>

<div class="icon {$open ? 'open' : 'closed'} {collapse}">
	<button type="button" on:click={toggle}>
		<HamburgerIcon />
	</button>
</div>
<nav class="{align} {spacing} {collapse} {$open ? 'open' : 'closed'}">
	<slot />
</nav>

<style lang="scss">
	.icon {
		display: none;
	}

	nav {
		display: flex;
		flex-direction: row;
		flex-grow: 0;
		gap: 1rem;
		margin: 1rem;
		width: 100%;
		align-items: center;
		justify-content: center;
		font-family: var(--nav-font-family, sans-serif);

		&.left,
		&.start {
			justify-content: flex-start;
		}

		&.center {
			justify-content: center;
		}

		&.right {
			justify-content: flex-end;
		}

		&.none {
			gap: 0;
		}

		&.tight {
			gap: 0.5rem;
		}

		&.medium {
			gap: 1rem;
		}

		&.loose {
			gap: 2rem;
		}

		&.space-evenly {
			justify-content: space-evenly;
		}

		&.space-between {
			justify-content: space-between;
		}

		&.space-around {
			justify-content: space-around;
		}
	}

	/* Small screens */
	@media (max-width: 640px) {
		.icon.collapse {
			display: block;
			justify-content: flex-end;
			align-content: center;
			width: 30%;
			height: 100%;
			text-align: right;
			padding-right: 0.5rem;
			padding-left: 0.5rem;

			button {
				appearance: none;
				border: none;
				background-color: transparent;
				width: 100%;
				height: 100%;
				max-width: 2.5rem;
				cursor: pointer;
			}

			&.open {
				opacity: 0.3;
			}
		}

		nav.collapse {
			display: none;

			&.open {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				position: absolute;
				top: 100%;
				right: 0;
				width: auto;
				min-width: 50%;
				box-shadow: -2px 4px 3px 0px black;
				background: var(--nav-bg, #fff);
				color: var(--nav-fg, #000);
				margin: 0;
				padding: 0;
				gap: 0;
			}
		}
	}
</style>
