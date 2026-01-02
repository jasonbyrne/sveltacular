<script lang="ts">
	import type { Snippet } from 'svelte';
	import { navigateTo } from '$src/lib/helpers/navigate-to.js';
	import { uniqueId, type FormFieldSizeOptions } from '$src/lib/index.js';
	import { getContext } from 'svelte';
	import type { CardContainerContext } from './card-container.js';

	let {
		title,
		href,
		size = 'md' as FormFieldSizeOptions,
		children
	}: {
		title?: string;
		href?: string;
		size?: FormFieldSizeOptions;
		children?: Snippet;
	} = $props();

	let role = $derived(href ? 'link' : 'listitem');

	const id = uniqueId();
	const onClick = () => {
		if (!href) return;
		navigateTo(href);
	};

	const container = getContext<CardContainerContext | undefined>('CardContainer');
	if (container) {
		container.register(id);
	}
</script>

<li {role} {id} onclick={onClick} class="{size} {role}">
	{#if title}
		<strong>{title}</strong>
	{/if}
	{@render children?.()}
</li>

<style lang="scss">
	li {
		display: inline-block;
		vertical-align: top;
		position: relative;
		width: 100%;
		margin-right: var(--spacing-base);
		margin-bottom: var(--spacing-base);
		padding: var(--spacing-base);
		border-radius: var(--radius-lg);
		border: solid var(--border-thin) var(--gray-400);
		box-shadow: var(--shadow-md);
		background-color: var(--card-bg);
		color: var(--card-fg);
		transition: transform var(--transition-base) var(--ease-in-out);

		strong {
			display: block;
		}

		&[role='link'] {
			cursor: pointer;

			&:hover {
				transform: translateY(-0.25rem);
			}
		}

		&.sm {
			max-width: 15rem;
		}

		&.md {
			max-width: 20rem;
		}

		&.lg {
			max-width: 25rem;
		}

		&.xl {
			max-width: 30rem;
		}
	}
</style>
