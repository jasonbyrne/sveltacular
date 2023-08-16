<script lang="ts">
	import { uniqueId } from '$src/helpers/unique-id.js';
	import CheckInput from '$src/lib/atoms/check-input.svelte';
	import { createEventDispatcher } from 'svelte';

	export let value: string | number | boolean | undefined = undefined;
	export let isChecked = false;

	const id = uniqueId();
	const dispatch = createEventDispatcher<{ change: boolean }>();
</script>

<div>
	<CheckInput {id} bind:value bind:isChecked on:change={() => dispatch('change', isChecked)} />
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
	}
</style>
