<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Section from '../generic/section/section.svelte';

	export let method: 'get' | 'post' | 'put' | 'delete' = 'get';
	export let title: string | undefined = undefined;
	export let action: string | undefined = undefined;

	const dispatch = createEventDispatcher<{ submit: void }>();

	const onSubmit = (e: Event) => {
		e.preventDefault();
		dispatch('submit');
	};
</script>

<Section {title}>
	<form {method} {action} on:submit={onSubmit}>
		<slot />
	</form>
</Section>
