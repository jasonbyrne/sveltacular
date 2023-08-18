<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';

	type RadioValue = string | number | boolean | undefined;

	export let value: RadioValue = undefined;
	export let group: string | undefined = undefined;
	export let disabled = false;

	const id = uniqueId();
</script>

<div>
	<input type="radio" bind:group {value} {disabled} {id} />
	{#if $$slots.default}
		<label for={id}>
			<slot />
		</label>
	{/if}
</div>

<style lang="scss">
	div {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		line-height: 2rem;
		font-size: 1rem;

		input {
			cursor: pointer;
		}

		label {
			cursor: pointer;
		}
	}
</style>
