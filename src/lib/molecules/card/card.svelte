<script lang="ts">
	import { navigateTo } from '$src/helpers/navigate-to.js';

	export let title: string | undefined = undefined;
	export let href: string | undefined = undefined;

	$: role = href ? 'link' : 'listitem';

	const onClick = () => {
		if (!href) return;
		navigateTo(href);
	};
</script>

<li {role} on:click={onClick}>
	{#if title}
		<strong>{title}</strong>
	{/if}
	<slot />
</li>

<style lang="scss">
	li {
		display: inline-block;
		position: relative;
		width: 100%;
		max-width: 30rem;
		margin-right: 1rem;
		margin-bottom: 1rem;
		padding: 1rem;
		border-radius: 0.5rem;
		background-color: #fff;
		color: #555;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
		transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

		strong {
			display: block;
		}

		&[role='link'] {
			cursor: pointer;
		}
	}
</style>
