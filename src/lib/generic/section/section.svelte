<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import type { SectionLevel } from '$src/lib/types/generic.js';
	import Header from '../header/header.svelte';
	import type { ComponentWidth } from '$src/lib/index.js';

	let {
		title = undefined,
		level = 2 as SectionLevel,
		size = 'full',
		hidden = false,
		align = 'left' as 'left' | 'center' | 'right',
		children
	}: {
		title?: string;
		level?: SectionLevel;
		size?: ComponentWidth;
		hidden?: boolean;
		align?: 'left' | 'center' | 'right';
		children: Snippet;
	} = $props();

	setContext('section', {
		get level() {
			return level;
		},
		get title() {
			return title;
		}
	});
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

		.auto {
			width: auto;
			flex-shrink: 1;
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
			max-width: 100%;
			flex: 1;
		}
	}
</style>
