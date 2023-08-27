<script lang="ts">
	import type { SectionLevel } from '../types/generic.js';
	import FormHeader from './form-header.svelte';

	export let title: string | undefined = undefined;
	export let level: SectionLevel = 4;
</script>

<section>
	{#if title}
		<FormHeader {level}>{title}</FormHeader>
	{/if}
	<slot />
</section>

<style>
	section {
		margin-bottom: 1rem;
	}
</style>
