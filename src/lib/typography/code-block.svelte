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

<div class="code-block">
	{#if lang}
		<div class="lang-label">{lang}</div>
	{/if}
	<pre class={lang}>
{@render children()}
	</pre>
</div>

<style lang="scss">
	.code-block {
		position: relative;
		margin-bottom: 1rem;
		background: #1e1e1e;
		color: #fff;
		padding: 1rem;
		border-radius: 0.25rem;
	}

	.lang-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		position: absolute;
		top: 0;
		right: 0;
		padding: 0.5rem;
		border-radius: 0.25rem 0 0 0.25rem;
	}

	pre {
		font-family: var(--base-mono-font-family, monospace);
		font-size: 0.875rem;
		line-height: 1.5;
		overflow-x: auto;
		width: 100%;
		display: block;
	}
</style>
