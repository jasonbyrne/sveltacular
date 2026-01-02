<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		lang = 'js',
		children
	}: {
		lang?: string;
		children: Snippet;
	} = $props();
</script>

<pre class={lang}>
{@render children?.()}
</pre>

<style lang="scss">
	pre {
		background: #1e1e1e;
		color: #fff;
		padding: 1rem;
		border-radius: 0.25rem;
		font-family: var(--base-mono-font-family, monospace);
		font-size: 0.875rem;
		line-height: 1.5;
		overflow-x: auto;
		width: 100%;
		display: block;
	}
</style>
