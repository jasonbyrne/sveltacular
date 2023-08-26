<script lang="ts">
	import Overlay from '$src/lib/generic/overlay.svelte';

	export let open = false;
</script>

<div class:open>
	<Overlay show={open} />
	<aside>
		<slot />
	</aside>
</div>

<style lang="scss">
	div {
		aside {
			width: 300px;
			padding: 0;
			margin: 0;
			box-sizing: border-box;
			position: fixed;
			top: 0;
			left: -300px;
			bottom: 0;
			background: var(--nav-bg, white);
			color: var(--nav-fg, black);
			z-index: 9999;
			transition: left 0.3s ease-in-out;
			border-right: solid 1px #e5e5e5;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
			display: flex;
			flex-direction: column;
			font-family: var(--nav-font-family, sans-serif);
		}

		&.open {
			display: block;

			aside {
				left: 0;
			}
		}
	}
</style>
