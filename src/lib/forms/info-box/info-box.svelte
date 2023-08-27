<script lang="ts">
	import type { FormFieldSizeOptions } from '$src/lib/index.js';
	import FormField from '../form-field.svelte';
	import FormLabel from '../form-label.svelte';

	export let size: FormFieldSizeOptions = 'md';
	export let value: string;
</script>

<FormField {size}>
	{#if $$slots.default}
		<FormLabel><slot /></FormLabel>
	{/if}
	<div class="input">
		{value}
	</div>
</FormField>

<style>
	.input {
		background-color: transparent;
		line-height: 2rem;
		font-size: 1rem;
		width: 100%;
		padding-left: 1rem;
		border-bottom: solid 1px var(--form-input-border, black);
	}
</style>
