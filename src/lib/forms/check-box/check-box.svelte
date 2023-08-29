<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import CheckIcon from '$src/lib/icons/check-icon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let value: string = '';
	export let isChecked = false;
	export let disabled = false;
	export let name: string | undefined = undefined;

	const id = uniqueId();
	const dispatch = createEventDispatcher<{ change: { isChecked: boolean; value: string } }>();

	const onChecked = (event: Event) => {
		const target = event.target as HTMLInputElement;
		isChecked = target.checked;
		dispatch('change', { isChecked, value });
	};
</script>

<label>
	<input
		type="checkbox"
		{id}
		{disabled}
		{name}
		bind:value
		bind:checked={isChecked}
		on:change={onChecked}
	/>
	<span class="checkbox">
		<span class="checkmark"><CheckIcon /></span>
	</span>
	{#if $$slots.default}
		<div class="text">
			<slot />
		</div>
	{/if}
</label>

<style lang="scss">
	label {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		cursor: pointer;

		.text {
			display: block;
			margin-left: 0.5em;
			font-size: 1rem;
			line-height: 2rem;
		}

		.checkbox {
			position: relative;
			display: block;
			width: 1rem;
			height: 1rem;
			border: 1px solid var(--form-input-border, black);
			background-color: var(--form-input-bg, white);
			color: var(--form-input-fg, black);
			transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
				color 0.2s ease-in-out, fill 0.2s ease-in-out, stroke 0.2s ease-in-out;
			user-select: none;

			.checkmark {
				display: block;
				position: absolute;
				top: 0;
				left: 0;
				width: 0;
				height: 0;
				background-color: var(--form-input-selected-bg, #3182ce);
				color: var(--form-input-selected-fg, white);
				fill: var(--form-input-selected-bg, #3182ce);
				stroke: var(--form-input-selected-fg, white);
				transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
			}
		}

		input {
			width: 0;
			height: 0;

			&:checked + .checkbox {
				background-color: var(--form-input-bg, white);
				border-color: var(--form-input-border, black);

				.checkmark {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
