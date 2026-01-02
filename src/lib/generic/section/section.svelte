<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import type { SectionLevel } from '$src/lib/types/generic.js';
	import Header from '../header/header.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/index.js';

	let {
		title = undefined,
		level = 2 as SectionLevel,
		size = 'full' as FormFieldSizeOptions,
		hidden = false,
		align = 'left' as 'left' | 'center' | 'right',
		children
	}: {
		title?: string;
		level?: SectionLevel;
		size?: FormFieldSizeOptions;
		hidden?: boolean;
		align?: 'left' | 'center' | 'right';
		children: Snippet;
	} = $props();

	setContext('section', { level, title });
</script>

<section class="level-{level} {size} {align}" class:hidden>
	{#if title}
		<Header {level} />
	{/if}
	{@render children?.()}
</section>

<style lang="scss">
	section {
		padding: 0;
		margin-top: 1rem;
		margin-bottom: 1rem;
		font-family: var(--base-font-family, sans-serif);

		&.center {
			text-align: center;
		}

		&.right {
			text-align: right;
		}

		&.hidden {
			display: none;
		}

		&.sm {
			max-width: 25rem;
		}

		&.md {
			max-width: 35rem;
		}

		&.lg {
			max-width: 50rem;
		}

		&.xl {
			max-width: 65rem;
		}

		&.full {
			width: 100%;
		}
	}
</style>
