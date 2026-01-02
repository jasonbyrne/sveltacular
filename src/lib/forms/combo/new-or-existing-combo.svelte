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

	let {
		mode = $bindable('existing' as 'new' | 'existing'),
		newValue = $bindable('' as string | null),
		existingValue = $bindable('' as string | null),
		items = [] as DropdownOption[],
		size = 'full' as FormFieldSizeOptions,
		disabled = false,
		required = false,
		searchable = false,
		search = undefined as SearchFunction | undefined,
		searchPlaceholder = 'Search',
		newPlaceholder = 'New'
	}: {
		mode?: 'new' | 'existing';
		newValue?: string | null;
		existingValue?: string | null;
		items?: DropdownOption[];
		size?: FormFieldSizeOptions;
		disabled?: boolean;
		required?: boolean;
		searchable?: boolean;
		search?: SearchFunction | undefined;
		searchPlaceholder?: string;
		newPlaceholder?: string;
	} = $props();
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
