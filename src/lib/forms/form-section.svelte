<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SectionLevel } from '../types/generic.js';
	import FormHeader from './form-header.svelte';

	let {
		title = undefined,
		level = 4,
		children
	}: {
		title?: string | undefined;
		level?: SectionLevel;
		children: Snippet;
	} = $props();
</script>

<section>
	{#if title}
		<FormHeader {level}>{title}</FormHeader>
	{/if}
	{@render children?.()}
</section>

<style>
	section {
		margin-bottom: 1rem;
	}
</style>
