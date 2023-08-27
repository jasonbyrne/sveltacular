<script lang="ts">
	import { setContext } from 'svelte';
	import type { SectionLevel } from '$src/lib/types/generic.js';
	import Header from '../header/header.svelte';

	export let title: string | undefined = undefined;
	export let level: SectionLevel = 2;

	setContext('section', { level, title });
</script>

<section class="level-{level}">
	{#if title}
		<Header />
	{/if}
	<slot />
</section>

<style lang="scss">
	section {
		padding: 0;
		margin-top: 1rem;
		margin-bottom: 1rem;
		font-family: var(--base-font-family, sans-serif);
	}
</style>
