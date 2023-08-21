<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ close: void }>();

	export let showCloseButton = true;
</script>

<header>
	<h1><slot /></h1>
	{#if showCloseButton}
		<div>
			<button on:click={() => dispatch('close')}>X</button>
		</div>
	{/if}
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 1.75rem;
		overflow: hidden;
		color: #000;

		h1 {
			margin: 0;
			flex-grow: 1;
			font-size: 1.25rem;
			line-height: 1.75rem;
		}

		div {
			text-align: right;

			button {
				appearance: none;
				border: none;
				background-color: transparent;
				font-size: 1.5rem;
				cursor: pointer;
			}
		}
	}
</style>
