<script lang="ts">
	import type { Snippet } from 'svelte';
	import { copyToClipboard, useCopyState } from '../helpers/copy-to-clipboard.svelte';
	import CopyIcon from '../icons/copy-icon.svelte';

	let {
		lang = 'js',
		children
	}: {
		lang?: string;
		children: Snippet;
	} = $props();

	const copyState = useCopyState();
	let preElement: HTMLPreElement;

	async function handleCopy() {
		if (!preElement) return;
		const text = preElement.textContent || '';
		const success = await copyToClipboard(text);
		if (success) copyState.setCopied();
	}
</script>

<div class="code-block">
	{#if lang}
		<div class="lang-label">{lang}</div>
	{/if}
	<button class="copy-button" onclick={handleCopy} aria-label="Copy code to clipboard">
		<CopyIcon copied={copyState.copied} />
	</button>
	<pre bind:this={preElement} class={lang}>{@render children()}</pre>
</div>

<style lang="scss">
	.code-block {
		position: relative;
		margin-bottom: var(--spacing-base);
		background: var(--gray-900);
		color: #fff;
		padding: var(--spacing-base);
		border-radius: var(--radius-md);

		&:hover .copy-button {
			opacity: 1;
		}
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

	.copy-button {
		position: absolute;
		top: var(--spacing-sm);
		right: var(--spacing-sm);
		background: var(--gray-700);
		border: 1px solid var(--gray-600);
		color: var(--gray-300);
		border-radius: var(--radius-sm);
		padding: var(--spacing-xs);
		cursor: pointer;
		opacity: 0;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;

		&:hover {
			background: var(--gray-600);
			color: var(--gray-100);
		}

		&:active {
			transform: scale(0.95);
		}

		:global(.icon) {
			width: 18px;
			height: 18px;
		}
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
