<script lang="ts">
	import LinkIcon from '$src/lib/icons/link-icon.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/index.js';
	import FormField from '../form-field.svelte';

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
				<LinkIcon />
			</span>
			<a {href} class="text">{value}</a>
		{:else}
			<span class="text">{value}</span>
		{/if}
	</div>
</FormField>

<style lang="scss">
	.input {
		background-color: var(--form-input-disabled-bg, #ccc);
		color: var(--form-input-fg, #000);
		font-size: 1rem;
		width: 100%;
		padding-left: 0.5rem;
		border: solid 1px var(--form-input-border, black);
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 0.5rem;

		.icon {
			display: block;
			width: 1rem;
			height: 1rem;
			position: relative;
		}

		.text {
			line-height: 2rem;
			flex-grow: 1;
			font-size: 1rem;
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
