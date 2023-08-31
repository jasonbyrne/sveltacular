<script lang="ts">
	import { setContext } from 'svelte';
	import type { SectionLevel } from '$src/lib/types/generic.js';
	import Header from '../header/header.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/index.js';

	export let title: string | undefined = undefined;
	export let level: SectionLevel = 2;
	export let size: FormFieldSizeOptions = 'full';

	setContext('section', { level, title });
</script>

<section class="level-{level} {size}">
	{#if title}
		<Header />
	{/if}
	<slot />
</section>

<style lang="scss">
	section {
		padding: 0;
		margin-top: 1rem;
		margin-bottom: 1rem;
		font-family: var(--base-font-family, sans-serif);

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
