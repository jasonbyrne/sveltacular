<script lang="ts">
	import Icon from '$src/lib/icons/icon.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/index.js';
	import FormField from '../form-field/form-field.svelte';

	let {
		size = 'md' as FormFieldSizeOptions,
		value,
		href = undefined,
		label = undefined
	}: {
		size?: FormFieldSizeOptions;
		value: string | null;
		href?: string;
		label?: string;
	} = $props();
</script>

<FormField {size} {label}>
	<div class="input">
		{#if href}
			<span class="icon">
				<Icon type="link" size="sm" />
			</span>
			<a {href} class="text">{value}</a>
		{:else}
			<span class="text">{value}</span>
		{/if}
	</div>
</FormField>

<style lang="scss">
	.input {
		background-color: var(--form-input-disabled-bg);
		color: var(--form-input-fg);
		font-size: var(--font-md);
		width: 100%;
		height: 100%;
		padding-left: var(--spacing-base);
		border-radius: var(--radius-md);
		border: var(--border-thin) solid var(--form-input-border);
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: var(--spacing-sm);

		.icon {
			display: block;
			width: 1rem;
			height: 1rem;
			position: relative;
		}

		.text {
			line-height: 2rem;
			flex-grow: 1;
			font-size: var(--font-md);
		}

		a {
			color: var(--form-input-fg, #000);
			text-decoration: none;
			display: block;

			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>
