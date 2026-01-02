<script lang="ts">
	import type { Snippet } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import CheckIcon from '$src/lib/icons/check-icon.svelte';

	type RadioValue = string | number | boolean | undefined | null;

	let {
		value = undefined as RadioValue,
		group = $bindable(undefined as string | undefined),
		disabled = false,
		children = undefined
	}: {
		value?: RadioValue;
		group?: string | undefined;
		disabled?: boolean;
		children?: Snippet;
	} = $props();

	const id = uniqueId();
</script>

<label>
	<input type="radio" bind:group {value} {disabled} {id} />
	<span class="checkbox">
		<span class="checkmark"><CheckIcon /></span>
	</span>
	{#if children}
		<div class="text">
			{@render children?.()}
		</div>
	{/if}
</label>

<style lang="scss">
	label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		line-height: 2rem;
		font-size: 1rem;
		cursor: pointer;

		.checkbox {
			position: relative;
			width: 1.2rem;
			height: 1.2rem;
			border-radius: 0.6rem;
			border: 1px solid var(--form-input-border, black);
			background-color: var(--form-input-bg, white);
			color: var(--form-input-fg, black);
			font-size: 0.875rem;
			font-weight: 500;
			line-height: 1.25rem;
			transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
				color 0.2s ease-in-out, fill 0.2s ease-in-out, stroke 0.2s ease-in-out;
			user-select: none;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 0.1rem;

			.checkmark {
				display: block;
				width: 0;
				height: 0;
				color: var(--form-input-selected-fg, white);
				fill: var(--form-input-selected-bg, #3182ce);
				stroke: var(--form-input-selected-fg, white);
				transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
			}
		}

		input {
			width: 0;
			height: 0;
			position: absolute;

			&:checked + .checkbox {
				background-color: var(--form-input-selected-bg, #3182ce);

				.checkmark {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
