<script lang="ts">
	import type { Snippet } from 'svelte';
	import Section from '../generic/section/section.svelte';
	import type { ComponentWidth } from '../index.js';

	let {
		method = 'get',
		title = undefined,
		action = undefined,
		size = 'full',
		onSubmit = undefined,
		children
	}: {
		method?: 'get' | 'post' | 'put' | 'delete';
		title?: string | undefined;
		action?: string | undefined;
		size?: ComponentWidth;
		onSubmit?: (() => void) | undefined;
		children: Snippet;
	} = $props();

	const handleSubmit = (e: Event) => {
		if (onSubmit) {
			e.preventDefault();
			onSubmit();
		}
	};

	// HTML forms only support "get" and "post", so convert "put"/"delete" to "post"
	const formMethod = $derived(method === 'put' || method === 'delete' ? 'post' : method);
</script>

<Section {title} {size}>
	<form method={formMethod} {action} onsubmit={handleSubmit}>
		{@render children()}
	</form>
</Section>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-base);
	}
</style>
