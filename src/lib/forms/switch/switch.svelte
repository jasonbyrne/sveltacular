<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import { createEventDispatcher } from 'svelte';

	export let isChecked = false;

	const id = uniqueId();
	const dispatch = createEventDispatcher<{ change: boolean }>();

	const onClick = () => {
		isChecked = !isChecked;
	};
</script>

<div class:isChecked>
	<input
		type="checkbox"
		bind:checked={isChecked}
		on:change={() => dispatch('change', isChecked)}
		{id}
	/>
	<!-- svelte-ignore a11y-interactive-supports-focus -->
	<span
		class="switch"
		on:click={onClick}
		on:keypress={onClick}
		role="checkbox"
		aria-checked={isChecked}
	>
		<span class="switch__toggle" />
	</span>
	{#if $$slots.default}
		<label for={id}>
			<slot />
		</label>
	{/if}
</div>

<style lang="scss">
	div {
		line-height: 2rem;
		font-size: 1rem;

		input {
			display: none;
		}

		.switch {
			display: inline-block;
			width: 40px;
			height: 20px;
			background-color: #ccc;
			border-radius: 10px;
			position: relative;
			cursor: pointer;
			transition: background-color 0.2s ease-in-out;
			vertical-align: middle;
		}

		.switch__toggle {
			display: inline-block;
			width: 16px;
			height: 16px;
			background-color: #fff;
			border-radius: 50%;
			position: absolute;
			top: 2px;
			left: 2px;
			transition: left 0.2s ease-in-out;
		}

		&.isChecked .switch {
			background-color: #55f;
		}

		&.isChecked .switch__toggle {
			left: 22px;
		}

		label {
			vertical-align: middle;
			margin-left: 0.5rem;
		}
	}
</style>
