<script lang="ts">
	import {
		FlexRow,
		ListBox,
		RadioBox,
		type ReferenceItem,
		type ComponentSize,
		TextBox
	} from '$src/lib/index.js';
	import FlexCol from '$src/lib/layout/flex-col.svelte';
	import type { FieldNameMapping, SearchFunction } from '$src/lib/types/form.js';
	import type { FormFieldFeedback } from '../form-field/form-field.svelte';

	let {
		mode = $bindable('existing' as 'new' | 'existing'),
		newValue = $bindable('' as string | null),
		existingValue = $bindable('' as string | null),
		items = [] as ReferenceItem[],
		size = 'md' as ComponentSize,
		disabled = false,
		required = false,
		searchable = false,
		search = undefined,
		searchPlaceholder = 'Search',
		newPlaceholder = 'New',
		newLabel = 'New',
		existingLabel = 'Existing',
		fieldNames = undefined as FieldNameMapping | undefined,
		helperText = undefined,
		feedback = undefined,
		virtualScroll = false,
		itemHeight = 40
	}: {
		mode?: 'new' | 'existing';
		newValue?: string | null;
		existingValue?: string | null;
		items?: Record<string, unknown>[];
		size?: ComponentSize;
		disabled?: boolean;
		required?: boolean;
		searchable?: boolean;
		search?: SearchFunction | undefined;
		searchPlaceholder?: string;
		newPlaceholder?: string;
		newLabel?: string;
		existingLabel?: string;
		fieldNames?: FieldNameMapping | undefined;
		helperText?: string;
		feedback?: FormFieldFeedback;
		virtualScroll?: boolean;
		itemHeight?: number;
	} = $props();
</script>

<div class="group">
	<div class="labels">
		<div class="radio">
			<RadioBox value="existing" bind:group={mode}>{existingLabel}:</RadioBox>
		</div>
		<div class="radio">
			<RadioBox value="new" bind:group={mode}>{newLabel}:</RadioBox>
		</div>
	</div>
	<div class="inputs">
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
				{itemHeight}
				{virtualScroll}
				{fieldNames}
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
		{#if helperText}
			<div class="helper-text">{helperText}</div>
		{/if}
		{#if feedback}
			<div class="feedback">{feedback.text}</div>
		{/if}
	</div>
</div>

<style>
	.group {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
	}
	.labels {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.inputs {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex-grow: 1;
	}
	.input {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}
	.helper-text {
		font-size: var(--font-sm);
		line-height: 1.25rem;
		padding: var(--spacing-xs);
		color: var(--form-input-helper-text-fg, var(--body-fg-muted));
	}
	.feedback {
		font-size: var(--font-sm);
		line-height: 1.25rem;
		padding: var(--spacing-xs);
		color: var(--form-input-feedback-fg, var(--body-fg-muted));
	}
</style>
