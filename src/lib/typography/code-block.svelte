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
		margin-bottom: var(--spacing-base);
		background: var(--gray-900);
		color: #fff;
		padding: var(--spacing-base);
		border-radius: var(--radius-md);
	}

	.lang-label {
		font-size: var(--font-base);
		font-weight: 500;
		color: var(--gray-500);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		position: absolute;
		top: 0;
		right: 0;
		padding: var(--spacing-sm);
		border-radius: var(--radius-md) 0 0 var(--radius-md);
	}

	pre {
		font-family: var(--base-mono-font-family);
		font-size: var(--font-base);
		line-height: 1.5;
		overflow-x: auto;
		width: 100%;
		display: block;
	}
</style>
