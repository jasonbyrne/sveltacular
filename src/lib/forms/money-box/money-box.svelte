<script lang="ts">
	import { uniqueId, type FormFieldSizeOptions } from '$src/lib/index.js';
	import { createEventDispatcher } from 'svelte';
	import FormField from '../form-field.svelte';
	import FormLabel from '../form-label.svelte';
	
	const id = uniqueId();
	const dipatch = createEventDispatcher<{ change: number | null; }>();

	export let value: number | null;
	export let prefix = '$';
	export let suffix = '';
	export let currency = 'USD';
	export let allowCents = false;
	export let placeholder = '';
	export let size: FormFieldSizeOptions = 'full';
	export let step = 1;
	export let min = 0;
	export let max = 1000000;
	export let isCents = false;

	const getDollarsFromValue = () => {
		if (!value) return 0;
		if (isCents) return Math.floor(value / 100);
		return Math.floor(value);
	}

	const getCentsFromValue = () => {
		if (!value) return 0;
		if (isCents) return Math.round(value % 100);
		return Math.round((value - Math.floor(value)) * 100);
	}

	let dollars = getDollarsFromValue();
	let cents = getCentsFromValue();

	$: {
		dollars = getDollarsFromValue();
		cents = getCentsFromValue();
	}

	const onKeyPress = (e: KeyboardEvent) => {
		const isNumber = !isNaN(Number(e.key));
		const isAllowed = isNumber || ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key);
		if (!isAllowed) return e.preventDefault();
	};

	const onInput = () => {
		// foobar
	};

	const onChange = () => {
		// foobar
		if (isCents) value = Math.round((dollars * 100) + cents);
		else value = dollars + Math.round(cents / 100);
		console.log(dollars, cents);
	};

</script>

<FormField {size}>
	{#if $$slots.default}
		<FormLabel {id}><slot /></FormLabel>
	{/if}
	<div class="input {currency}" class:allowCents {id}>
		{#if prefix}
			<span class="prefix">{prefix}</span>
		{/if}

		<input
			class="dollars"
			{placeholder}
			bind:value={dollars}
			type="number"
			step={step}
			{min}
			{max}
			on:keypress={onKeyPress}
			on:input={onInput}
			on:change={onChange}
		/>
		{#if isCents}
			<span class="separator">.</span>
			<input
				{placeholder}
				bind:value={cents}
				type="number"
				class="cents"
				step="1"
				min="0"
				max="99"
				on:keypress={onKeyPress}
				on:input={onInput}
				on:change={onChange}
			/>
		{/if}

		{#if suffix}
			<span class="suffix">{suffix}</span>
		{/if}
	</div>
</FormField>

<style lang="scss">
	.input {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 0.25rem;
		border: 1px solid var(--form-input-border, black);
		background-color: var(--form-input-bg, white);
		color: var(--form-input-fg, black);
		font-size: 1rem;
		font-weight: 500;
		line-height: 2rem;
		transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			color 0.2s ease-in-out, fill 0.2s ease-in-out, stroke 0.2s ease-in-out;
		user-select: none;
		white-space: nowrap;

		input {
			background-color: transparent;
			border: none;
			line-height: 2rem;
			font-size: 1rem;
			padding-left: 1rem;

			&:focus {
				outline: none;
			}
		}

		.dollars {
			flex-grow: 1;
		}

		.separator {
			width: 1rem;
			text-align: center;
		}

		.cents {
			width: 4rem;
		}

		.prefix,
		.suffix {
			font-size: 1rem;
			line-height: 2rem;
			padding-left: 1rem;
			padding-right: 1rem;
			background-color: var(--form-input-accent-bg, #ccc);
			color: var(--form-input-accent-fg, black);
		}

		.prefix {
			border-right: 1px solid var(--form-input-border, black);
		}

		.suffix {
			border-left: 1px solid var(--form-input-border, black);
		}
	}
</style>
