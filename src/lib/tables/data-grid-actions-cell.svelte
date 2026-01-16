<script lang="ts">
	import type { JsonObject } from '$src/lib/types/data.js';
	import type { ButtonVariant, FormFieldSizeOptions } from '$src/lib/types/form.js';
	import TableCell from './table-cell.svelte';
	import Button from '../forms/button/button.svelte';
	import DropdownButton from '../navigation/dropdown-button/dropdown-button.svelte';
	import DropdownItem from '../generic/dropdown-item/dropdown-item.svelte';

	interface Action {
		text: string;
		variant?: ButtonVariant;
		href?: (row: JsonObject) => string;
		onClick?: (row: JsonObject) => unknown;
	}

	interface Actions {
		text?: string;
		type?: 'buttons' | 'dropdown';
		variant?: ButtonVariant | 'default';
		size?: FormFieldSizeOptions;
		align?: 'left' | 'center' | 'right';
		items: Action[];
	}

	let {
		actions,
		row,
		actionButtonVariant = 'outline',
		actionButtonSize = 'sm',
		actionAlign = 'center'
	}: {
		actions: Actions;
		row: JsonObject;
		actionButtonVariant?: ButtonVariant;
		actionButtonSize?: FormFieldSizeOptions;
		actionAlign?: 'left' | 'center' | 'right';
	} = $props();
</script>

<TableCell type="actions" align={actionAlign}>
	{#if actions.type === 'dropdown'}
		<DropdownButton text={actions.text ?? ''} variant="ghost">
			{#each actions.items as action}
				<DropdownItem
					href={action.href ? action.href(row) : undefined}
					onClick={action.onClick ? () => action.onClick?.(row) : undefined}
					>{action.text}</DropdownItem
				>
			{/each}
		</DropdownButton>
	{:else}
		<div class="actions">
			{#each actions.items as action}
				{@const buttonVariant = action.variant ?? actionButtonVariant}
				<Button
					type="button"
					variant={buttonVariant}
					size={actionButtonSize}
					href={action.href ? action.href(row) : undefined}
					onClick={action.onClick ? () => action.onClick?.(row) : undefined}
				>
					{action.text}
				</Button>
			{/each}
		</div>
	{/if}
</TableCell>

<style lang="scss">
	.actions {
		display: flex;
		gap: 0.5rem;
	}
</style>
