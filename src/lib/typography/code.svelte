<script lang="ts">
	import type { Snippet } from 'svelte';
	import { copyToClipboard, useCopyState } from '../helpers/copy-to-clipboard.svelte';
	import CopyIcon from '../icons/copy-icon.svelte';

	let {
		children
	}: {
		children: Snippet;
	} = $props();

	const copyState = useCopyState();
	let codeElement: HTMLElement;

	async function handleCopy() {
		if (!codeElement) return;
		const text = codeElement.textContent || '';
		const success = await copyToClipboard(text);
		if (success) copyState.setCopied();
	}
</script>

<span class="inline-code-wrapper" class:copied={copyState.copied}>
	<code class="inline-code" bind:this={codeElement}>{@render children()}</code>
	<button class="copy-button" onclick={handleCopy} aria-label="Copy code to clipboard">
		<CopyIcon copied={copyState.copied} />
	</button>
</span>

<style lang="scss">
	.inline-code-wrapper {
		position: relative;
		display: inline-block;
		vertical-align: baseline;

		&:hover .copy-button {
			opacity: 1;
		}

		&.copied {
			.inline-code {
				background: var(--green-100);
				border-color: var(--green-300);
				color: var(--green-900);
			}

			.copy-button {
				background: var(--green-500);
				color: white;
			}
		}
	}

	.inline-code {
		background: var(--gray-100);
		color: var(--gray-900);
		padding: 2px 8px;
		border-radius: var(--radius-sm);
		font-family: var(--base-mono-font-family);
		font-size: 0.9em;
		border: 1px solid var(--gray-200);
		transition: all 0.2s ease;
	}

	.copy-button {
		position: absolute;
		top: 50%;
		right: -24px;
		transform: translateY(-50%);
		background: var(--gray-700);
		border: 1px solid var(--gray-600);
		color: var(--gray-300);
		border-radius: var(--radius-sm);
		padding: 4px;
		cursor: pointer;
		opacity: 0;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;

		&:hover {
			background: var(--gray-600);
			color: var(--gray-100);
		}

		&:active {
			transform: translateY(-50%) scale(0.95);
		}

		:global(.icon) {
			width: 12px;
			height: 12px;
		}
	}
</style>

