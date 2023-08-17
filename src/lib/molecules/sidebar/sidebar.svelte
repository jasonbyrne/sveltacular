<script lang="ts">
	import Overlay from '$src/lib/atoms/overlay.svelte';

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
			padding: 0 1rem;
			margin: 0 auto;
			box-sizing: border-box;
			position: fixed;
			top: 0;
			left: -300px;
			bottom: 0;
			background: #fff;
			color: #000;
			z-index: 9999;
			transition: left 0.3s ease-in-out;
			border-right: solid 1px #e5e5e5;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
		}

		&.open {
			display: block;

			aside {
				left: 0;
			}
		}
	}
</style>
