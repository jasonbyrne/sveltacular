<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let id: string | undefined = undefined;
	export let value: string | number | boolean | undefined = undefined;
	export let isChecked = false;

	const dispatch = createEventDispatcher<{ change: boolean }>();
</script>

<input
	type="checkbox"
	{id}
	bind:value
	bind:checked={isChecked}
	on:change={() => dispatch('change', isChecked)}
/>

<style lang="scss">
	input {
		display: inline-block;
		vertical-align: middle;
		margin: 0;
		padding: 0;
		width: 1em;
		height: 1em;
		border: 0.1em solid #000;
		border-radius: 0.2em;
		background-color: #fff;
		cursor: pointer;
		transition: background-color 0.3s ease-in-out;
	}

	input:checked {
		background-color: #000;
	}
</style>
