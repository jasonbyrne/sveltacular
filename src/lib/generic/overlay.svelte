<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		show = true,
		onClick = undefined,
		children
	}: {
		show?: boolean;
		onClick?: (() => void) | undefined;
		children: Snippet;
	} = $props();

	const handleClick = () => {
		onClick?.();
	};

	const onKeyPress = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			handleClick();
		}
	};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class:show onclick={handleClick} onkeypress={onKeyPress}>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9998;

		&.show {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
