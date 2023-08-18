<script lang="ts">
	import { currentDateTime } from '$src/lib/helpers/date.js';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import CheckInput from '$src/lib/forms/check-box/check-input.svelte';
	import FormField from '$src/lib/forms/form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';

	const id = uniqueId();

	export let value = '';
	export let placeholder = '';
	export let nullable = false;
	export let enabled = true;
	export let type: 'date' | 'datetime-local' = 'date';
	export let required = false;

	const defaultValue = value || currentDateTime();

	const checkChanged = () => {
		if (nullable) {
			value = enabled ? defaultValue : '';
		}
	};

	$: disabled = !enabled;
</script>

<FormField>
	<FormLabel {id} {required}><slot /></FormLabel>
	<div class:nullable class:disabled>
		<span class="input">
			<input {...{ type }} {id} {placeholder} {disabled} bind:value {required} />
		</span>
		{#if nullable}
			<span class="toggle">
				<CheckInput bind:isChecked={enabled} on:change={checkChanged} />
			</span>
		{/if}
	</div>
</FormField>

<style lang="scss">
	input {
		width: 100%;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		border: 1px solid #b7b7b7;
		background-color: #fff;
		color: #5c5c5c;
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.25rem;
		transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			color 0.2s ease-in-out, fill 0.2s ease-in-out, stroke 0.2s ease-in-out,
			box-shadow 0.2s ease-in-out;
		user-select: none;
		white-space: nowrap;
	}

	div {
		display: block;
		position: relative;

		&.nullable {
			input {
				padding-left: 2.5rem;
			}

			.toggle {
				position: absolute;
				top: 0.55rem;
				left: 0.75rem;
			}
		}

		&.disabled {
			input {
				background-color: #f5f5f5;
				border-color: #e0e0e0;
				color: #a0a0a0;
			}
		}
	}
</style>
