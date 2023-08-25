<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let show = true;

	const dispatch = createEventDispatcher<{ click: void }>();

	const onClick = () => {
		dispatch('click');
	};

	const onKeyPress = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			onClick();
		}
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class:show on:click={onClick} on:keypress={onKeyPress}>
	<slot />
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
