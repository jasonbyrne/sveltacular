<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Section from '../generic/section/section.svelte';
	import type { FormFieldSizeOptions } from '../index.js';

	export let method: 'get' | 'post' | 'put' | 'delete' = 'get';
	export let title: string | undefined = undefined;
	export let action: string | undefined = undefined;
	export let size: FormFieldSizeOptions = 'full';

	const dispatch = createEventDispatcher<{ submit: void }>();

	const onSubmit = (e: Event) => {
		e.preventDefault();
		dispatch('submit');
	};
</script>

<Section {title} {size}>
	<form {method} {action} on:submit={onSubmit}>
		<slot />
	</form>
</Section>
