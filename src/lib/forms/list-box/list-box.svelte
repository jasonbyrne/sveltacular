<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { DropdownOption, FormFieldSizeOptions } from '$src/lib/types/form.js';
	import FormField from '$src/lib/forms//form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import Menu from '$src/lib/generic/menu/menu.svelte';
	import AngleUpIcon from '$src/lib/icons/angle-up-icon.svelte';

	export let value = '';
	export let items: DropdownOption[] = [];
	export let size: FormFieldSizeOptions = 'md';
	export let disabled = false;
	export let required = false;
	export let searchable = false;

	const getText = () => items.find((item) => item.value == value)?.name || '';
	const onSelect = (e: CustomEvent<DropdownOption>) => {
		value = e.detail.value;
		dispatch('change', value);
		text = getText();
		open = false;
	};
	const toggle = () => {
		open = !open;
		if (open) document.getElementById(id)?.focus();
	};

	const onInputKeyPress = (e: KeyboardEvent) => {
		if (e.key == 'Escape') {
			open = false;
			return;
		}
		if (e.key == 'Enter') {
			open = false;
			if (highlightIndex > -1) {
				onSelect(new CustomEvent('select', { detail: filteredItems[highlightIndex] }));
			}
			return;
		}
		if (e.key == 'ArrowDown') {
			highlightIndex = Math.min(highlightIndex + 1, filteredItems.length - 1);
			open = true;
			return;
		}
		if (e.key == 'ArrowUp') {
			highlightIndex = Math.max(highlightIndex - 1, -1);
			if (highlightIndex == -1) open = false;
			return;
		}
	};

	const dispatch = createEventDispatcher<{ change: string }>();
	const id = uniqueId();
	let text = getText();
	let open = false;
	let highlightIndex = -1;

	$: searchText = searchable ? text : '';
	$: filteredItems = searchText
		? items
				.map((item, index) => ({ ...item, index }))
				.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
		: items.map((item, index) => ({ ...item, index }));
</script>

<FormField {size}>
	<FormLabel {id} {required}><slot /></FormLabel>
	<div class:open>
		<input
			type="text"
			{id}
			bind:value={text}
			{required}
			{disabled}
			readonly={!searchable}
			on:focus={() => (open = true)}
			on:keyup={onInputKeyPress}
		/>
		<button class="icon" on:click={toggle} on:keydown={toggle}>
			<AngleUpIcon />
		</button>
		<div class="dropdown">
			<Menu
				items={filteredItems}
				{open}
				closeAfterSelect={false}
				{searchText}
				on:select={onSelect}
				size="full"
				bind:highlightIndex
				bind:value
			/>
		</div>
	</div>
</FormField>

<style lang="scss">
	div {
		position: relative;

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

		button.icon {
			border: 0;
			appearance: none;
			background: transparent;
			padding: 0;
			margin: 0;
			position: absolute;
			top: 0.65rem;
			right: 1rem;
			width: 1rem;
			height: 1rem;
			transition: transform 0.3s linear;
			z-index: 2;
			color: black;
			transform: rotate(180deg);
		}

		&.open .icon {
			transform: rotate(0deg);
		}

		.dropdown {
			position: absolute;
			top: 100%;
			left: 0;
			width: 100%;
			z-index: 1;
		}
	}
</style>
