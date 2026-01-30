<script lang="ts" generics="T extends PlainObject">
	import type { PlainObject, RowActions } from '$src/lib/types/data.js';
	import type { ButtonVariant, ComponentSize } from '$src/lib/types/form.js';
	import TableCell from './table-cell.svelte';
	import Button from '../forms/button/button.svelte';
	import DropdownButton from '../navigation/dropdown-button/dropdown-button.svelte';
	import DropdownItem from '../generic/dropdown-item/dropdown-item.svelte';

	let {
		actions,
		row,
		actionButtonVariant = 'outline',
		actionButtonSize = 'sm',
		actionAlign = 'center'
	}: {
		actions: RowActions<T>;
		row: T;
		actionButtonVariant?: ButtonVariant;
		actionButtonSize?: ComponentSize;
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
				<Button
					type="button"
					variant={(action.variant ?? actionButtonVariant) as ButtonVariant}
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
