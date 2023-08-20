<script lang="ts">
	import Text from './text.svelte';

	export let transform: 'uppercase' | 'lowercase' | 'capitalize' | 'none' = 'none';
	export let level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
</script>

<Text {transform}>
	{#if level === 1}
		<h1><slot /></h1>
	{:else if level === 2}
		<h2><slot /></h2>
	{:else if level === 3}
		<h3><slot /></h3>
	{:else if level === 4}
		<h4><slot /></h4>
	{:else if level === 5}
		<h5><slot /></h5>
	{:else if level === 6}
		<h6><slot /></h6>
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
