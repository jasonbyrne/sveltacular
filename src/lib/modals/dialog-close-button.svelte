<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ click: void }>();

	export let show = true;

	const onClick = (e: Event) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch('click');
	};
</script>

{#if show}
	<button on:click={onClick}>X</button>
{/if}

<style lang="scss">
	button {
		appearance: none;
		border: none;
		background-color: transparent;
		font-size: 1rem;
		cursor: pointer;
		position: absolute;
		top: 0.7rem;
		right: 0.7rem;
		width: 2rem;
		height: 2rem;
		line-height: 2rem;
		text-align: center;
		border-radius: 0.5rem;

		&:hover {
			background-color: #eee;
		}
	}
</style>
