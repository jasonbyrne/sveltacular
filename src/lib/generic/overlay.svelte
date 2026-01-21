<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		show = true,
		onClick = undefined,
		onEscape = undefined,
		blur = false,
		children
	}: {
		show?: boolean;
		onClick?: (() => void) | undefined;
		onEscape?: (() => void) | undefined;
		blur?: boolean;
		children?: Snippet;
	} = $props();

	const handleClick = (event: MouseEvent) => {
		// Only close if clicking directly on the overlay background, not on child elements
		if (event.target === event.currentTarget) {
			onClick?.();
		}
	};

	const onKeyPress = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			onEscape?.();
		}
	};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class:show class:blur onclick={handleClick} onkeypress={onKeyPress}>
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
		transition: backdrop-filter var(--transition-base) var(--ease-out);

		&.show {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&.blur {
			backdrop-filter: blur(8px);
			-webkit-backdrop-filter: blur(8px); /* Safari support */
			background-color: rgba(0, 0, 0, 0.3);
		}
	}

	/* Fallback for browsers without backdrop-filter support */
	@supports not (backdrop-filter: blur(8px)) {
		div.blur {
			background-color: rgba(0, 0, 0, 0.6);
		}
	}
</style>
