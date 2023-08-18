<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import { createEventDispatcher } from 'svelte';
	import type { RadioButtonValue } from '$src/lib/types/form.js';

	export let value: RadioButtonValue = undefined;
	export let group: RadioButtonValue[] = [];
	export let isChecked = false;
	export let disabled = false;
	export let name: string | undefined = undefined;

	const id = uniqueId();
	const dispatch = createEventDispatcher<{ change: boolean }>();
</script>

<div>
	<input
		type="checkbox"
		{id}
		{disabled}
		{name}
		bind:value
		bind:group
		bind:checked={isChecked}
		on:change={() => dispatch('change', isChecked)}
	/>
	{#if $$slots.default}
		<label for={id}>
			<slot />
		</label>
	{/if}
</div>

<style lang="scss">
	div {
		label {
			display: inline-block;
			vertical-align: middle;
			margin-left: 0.5em;
			cursor: pointer;
			font-size: 1rem;
			line-height: 2rem;
		}

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
	}
</style>
