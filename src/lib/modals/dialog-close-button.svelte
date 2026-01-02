<script lang="ts">
	let {
		show = true,
		onClick = undefined
	}: {
		show?: boolean;
		onClick?: (() => void) | undefined;
	} = $props();

	const handleClick = (e: Event) => {
		e.preventDefault();
		e.stopPropagation();
		onClick?.();
	};
</script>

{#if show}
	<button type="button" onclick={handleClick}>X</button>
{/if}

<style lang="scss">
	button {
		appearance: none;
		border: none;
		background-color: transparent;
		font-size: 1rem;
		cursor: pointer;
		position: absolute;
		top: 0.7rem;
		right: 0.7rem;
		width: 2rem;
		height: 2rem;
		line-height: 2rem;
		text-align: center;
		border-radius: 0.5rem;

		&:hover {
			background-color: #eee;
		}
	}
</style>
