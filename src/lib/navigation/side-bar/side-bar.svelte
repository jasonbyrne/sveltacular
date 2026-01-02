<script lang="ts">
	import type { Snippet } from 'svelte';
	import Overlay from '$src/lib/generic/overlay.svelte';

	let {
		open = $bindable(false),
		children
	}: {
		open?: boolean;
		children: Snippet;
	} = $props();
</script>

<div class:open>
	<Overlay show={open} />
	<aside>
		{@render children?.()}
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
			background: var(--nav-bg);
			color: var(--nav-fg);
			z-index: 9999;
			transition: left var(--transition-slow) var(--ease-in-out);
			border-right: solid var(--border-thin) var(--gray-300);
			box-shadow: var(--shadow-md);
			display: flex;
			flex-direction: column;
			font-family: var(--nav-font-family);
		}

		&.open {
			display: block;

			aside {
				left: 0;
			}
		}
	}
</style>
