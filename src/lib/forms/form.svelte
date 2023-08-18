<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let action: 'get' | 'post' | 'put' | 'delete' = 'get';

	const dispatch = createEventDispatcher<{ submit: void }>();

	const onSubmit = (e: Event) => {
		e.preventDefault();
		dispatch('submit');
	};
</script>

<form {action} on:submit={onSubmit}>
	<slot />
</form>
