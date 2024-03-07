<script lang="ts">
	import { uniqueId, type FormFieldSizeOptions } from '$src/lib/index.js';
	import { createEventDispatcher } from 'svelte';
	import FormField from '../form-field.svelte';
	import FormLabel from '../form-label.svelte';
	import { get } from 'svelte/store';
	
	const id = uniqueId();
	const dipatch = createEventDispatcher<{ change: number | null; }>();

	export let value: number | null;
	export let prefix = '$';
	export let suffix = '';
	export let currency = 'USD';
	export let allowCents = true;
	export let placeholder = '';
	export let size: FormFieldSizeOptions = 'full';
	export let units: 'ones' | 'cents' = 'ones';
	export let min: number = 0;
	export let max: number | null = null;

	let isValueInCents = units === 'cents';

	$: if (value !== null && value >= 0) {
		dollars = getDollarsFromValue();
		cents = getCentsFromValue();
	}

	const getDollarsFromValue = () => {
		if (!value) return 0;
		if (isValueInCents) return Math.floor(value / 100);
		return Math.floor(value);
	}

	const getCentsFromValue = () => {
		if (!value) return 0;
		if (isValueInCents) return Math.round(value % 100);
		return Math.round((value - Math.floor(value)) * 100);
	}

	const fieldOrder = ['dollars', 'cents'];
	let dollars = getDollarsFromValue();
	let cents = getCentsFromValue();
	let lastState = [
		{ value: String(dollars), selectionStart: 0, selectionEnd: 0 },
		{ value: String(cents), selectionStart: 0, selectionEnd: 0 }
	];

	const getTargetProperties = (e: KeyboardEvent | Event) => {
		const target = e.target as HTMLInputElement;
		const name = target.getAttribute('name');
		const index = fieldOrder.indexOf(name ?? '') || 0;
		const nextName = index < fieldOrder.length - 1 ? fieldOrder[index + 1] : null;
		const prevName = index > 0 ? fieldOrder[index - 1] : null;
		const selection = [target.selectionStart ?? 0, target.selectionEnd ?? 0];
		const key = e instanceof KeyboardEvent ? e.key : '';
		const isNumber = !isNaN(Number(key));
		const isDecimal =key === '.';
		const isBackspace = key === 'Backspace';
		const isAllowed = isNumber || isDecimal || ['Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key);
		return {
			element: target,
			name,
			index,
			selectionStart: selection[0],
			selectionEnd: selection[1],
			isHighligted: selection[0] !== selection[1],
			key,
			isNumber,
			isDecimal,
			isBackspace,
			isAllowed,
			lastState: lastState[index],
			value: target.value,
			next: nextName ? document.getElementById(`${id}-${nextName}`) as HTMLInputElement : null,
			previous: prevName ? document.getElementById(`${id}-${prevName}`) as HTMLInputElement : null
		};
	};

	const focusAndHighlightText = (target: HTMLInputElement) => {
		target.focus();
		target.setSelectionRange(0, target.value.length);
	};

	const updateLastState = (e: Event) => {
		const target = getTargetProperties(e);
		lastState[target.index] = {
			value: target.value,
			selectionStart: target.selectionStart,
			selectionEnd: target.selectionEnd
		};
	};

	const isNumericString = (value: string) => {
		return !isNaN(Number(value));
	};

	const moveExtraCentsToDollars = (centsValue: string, append = true) => {
		if (centsValue.length > 2 && isNumericString(centsValue) && Number(centsValue) > 0) {
			console.log('move to dollars');
			const whole = centsValue.substring(0, centsValue.length -2);
			const decimal = centsValue.substring(centsValue.length -2);
			dollars = Number(append ? `${dollars}${whole}` : whole);
			cents = Number(decimal);
		}
	};

	const onKeyPress = (e: KeyboardEvent) => {
		const target = getTargetProperties(e);
		if (!target.isAllowed) return e.preventDefault();
		if (target.isDecimal) {
			e.preventDefault();
			if (target.next && allowCents) focusAndHighlightText(target.next);
			return;
		};
		if (target.name === 'cents' && target.value.length >= 2 && !target.isHighligted) {
			if (target.isNumber) moveExtraCentsToDollars(`${target.value}${e.key}`);
			return e.preventDefault();
		}
		updateLastState(e);
	};

	const onKeyUp = (e: KeyboardEvent) => {
		const target = getTargetProperties(e);
		// Back arrow
		if (target.key === 'ArrowLeft' && !target.isHighligted && target.previous && target.lastState.selectionStart === 0) {
			console.log(target);
			const preservedValue = String(target.previous.value);
			focusAndHighlightText(target.previous);
			target.previous.value = preservedValue;
			return e.preventDefault();
		}
		// Right arrow
		if (target.key === 'ArrowRight' && !target.isHighligted && target.next && target.lastState.selectionStart === target.value.length) {
			focusAndHighlightText(target.next);
			return e.preventDefault();
		}
		// Handle backspace
		if (target.isBackspace) {
			if (target.lastState.value.length === 0 && target.previous) {
				target.previous.focus();
				e.preventDefault();
			}
		}
		updateLastState(e);
	};

	const onInput = (e: Event) => {
		const target = getTargetProperties(e);
		// If they pasted in something non-numeric, revert to last state
		if (!isNumericString(target.value)) {
			target.element.value = target.lastState.value;
			return e.preventDefault();
		}
		// If the input contains a decimal, break it into two parts
		if (target.value.includes('.')) {
			const parts = target.value.split('.');
			dollars = Number(parts[0]);
			cents = Number(parts[1]);
			return e.preventDefault();
		}
		// If input is in cents and it's more than 2 digits, move the first digits to dollars
		if (target.name === 'cents' && target.value.length > 2) {
			moveExtraCentsToDollars(target.value, false);
			return e.preventDefault();
		}
	};

	const onSaveStateEvent = (e: Event) => {
		updateLastState(e);
	};

	const onChange = () => {
		if (isValueInCents) value = Math.round((dollars * 100) + cents);
		else value = dollars + Math.round(cents / 100);
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
			type="text"
			on:keypress={onKeyPress}
			on:keyup={onKeyUp}
			on:input={onInput}
			on:change={onChange}
			on:mouseup={onSaveStateEvent}
			on:focus={onSaveStateEvent}
			on:blur={onSaveStateEvent}
			name="dollars"
			id="{id}-dollars"
			inputmode="numeric"
		/>
		{#if allowCents}
			<span class="separator">.</span>
			<input
				{placeholder}
				bind:value={cents}
				type="text"
				class="cents"
				on:keypress={onKeyPress}
				on:keyup={onKeyUp}
				on:input={onInput}
				on:change={onChange}
				on:mouseup={onSaveStateEvent}
				on:focus={onSaveStateEvent}
				on:blur={onSaveStateEvent}
				name="cents"
				id="{id}-cents"
				inputmode="numeric"
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
