<script lang="ts">
	import {
		FlexRow,
		ListBox,
		RadioBox,
		type DropdownOption,
		type FormFieldSizeOptions,
		TextBox
	} from '$src/lib/index.js';
	import FlexCol from '$src/lib/layout/flex-col.svelte';
	import type { SearchFunction } from '../list-box/list-box.js';

	export let mode: 'new' | 'existing' = 'existing';
	export let newValue = '';
	export let existingValue = '';
	export let items: DropdownOption[] = [];
	export let size: FormFieldSizeOptions = 'full';
	export let disabled = false;
	export let required = false;
	export let searchable = false;
	export let search: SearchFunction | undefined = undefined;
	export let searchPlaceholder = 'Search';
	export let newPlaceholder = 'New';
</script>

<div class="group">
	<FlexRow>
		<div class="labels">
			<FlexCol>
				<div class="radio">
					<RadioBox value="existing" bind:group={mode}>Existing:</RadioBox>
				</div>
				<div class="radio">
					<RadioBox value="new" bind:group={mode}>New:</RadioBox>
				</div>
			</FlexCol>
		</div>
		<div class="inputs">
			<FlexCol>
				<div class="input">
					<ListBox
						bind:value={existingValue}
						{searchable}
						{search}
						{required}
						{items}
						{size}
						placeholder={searchPlaceholder}
						disabled={disabled || mode == 'new'}
					/>
				</div>
				<div class="input">
					<TextBox
						bind:value={newValue}
						{size}
						placeholder={newPlaceholder}
						disabled={disabled || mode == 'existing'}
					/>
				</div>
			</FlexCol>
		</div>
	</FlexRow>
</div>

<style>
	.labels {
		flex-shrink: 1;
	}
	.inputs {
		flex-grow: 1;
	}
	.radio,
	.input {
		height: 2.5rem;
	}
	.radio {
		padding-top: 0.1rem;
	}
</style>
