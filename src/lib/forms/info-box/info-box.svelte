<script lang="ts">
	import LinkIcon from '$src/lib/icons/link-icon.svelte';
	import Icon from '$src/lib/images/icon.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/index.js';
	import FormField from '../form-field.svelte';
	import FormLabel from '../form-label.svelte';

	export let size: FormFieldSizeOptions = 'md';
	export let value: string;
	export let href: string | undefined = undefined;
</script>

<FormField {size}>
	{#if $$slots.default}
		<FormLabel><slot /></FormLabel>
	{/if}
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
