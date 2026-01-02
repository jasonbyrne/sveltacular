<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SectionLevel } from '../types/generic.js';
	import Text from './text.svelte';

	let {
		transform = 'none' as 'uppercase' | 'lowercase' | 'capitalize' | 'none',
		level = 1 as SectionLevel,
		children
	}: {
		transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
		level?: SectionLevel;
		children: Snippet;
	} = $props();
</script>

<Text {transform}>
	{#if level === 1}
		<h1>{@render children?.()}</h1>
	{:else if level === 2}
		<h2>{@render children?.()}</h2>
	{:else if level === 3}
		<h3>{@render children?.()}</h3>
	{:else if level === 4}
		<h4>{@render children?.()}</h4>
	{:else if level === 5}
		<h5>{@render children?.()}</h5>
	{:else if level === 6}
		<h6>{@render children?.()}</h6>
	{/if}
</Text>

<style lang="scss">
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 0;
		font-family: var(--base-headline-font-family, sans-serif);
	}

	h1 {
		font-size: 2.5rem;
		line-height: 3rem;
		letter-spacing: 0.2rem;
		font-weight: 800;
	}

	h2 {
		font-size: 2rem;
		line-height: 2.5rem;
		letter-spacing: 0.15rem;
		font-weight: 700;
	}

	h3 {
		font-size: 1.5rem;
		line-height: 2rem;
		letter-spacing: 0.1rem;
		font-weight: 600;
	}

	h4 {
		font-size: 1.25rem;
		line-height: 1.5rem;
		font-weight: 600;
	}

	h5 {
		font-size: 1rem;
		line-height: 1.25rem;
		font-weight: 600;
	}

	h6 {
		font-size: 1rem;
		line-height: 1.25rem;
		font-weight: 500;
	}
</style>
